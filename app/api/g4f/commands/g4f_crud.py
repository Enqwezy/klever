from sqlalchemy.ext.asyncio import AsyncSession
import logging
from g4f.client import Client
from app.api.g4f.commands.tutor_crud import get_top_tutors

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

g4f_client = Client()

async def process_chat_message(message: str, db: AsyncSession):
    if message.lower().strip() in ["привет", "здравствуйте"]:
        return "Привет! Чем могу помочь?"

    # Извлекаем ключевое слово с помощью g4f
    try:
        response = g4f_client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "Ты — помощник для поиска услуг. Извлеки главное ключевое слово (существительное, связанное с услугой) из текста пользователя и верни только его без изменений. Если слова нет, верни пустую строку."},
                {"role": "user", "content": message}
            ]
        )
        keyword = response.choices[0].message.content.strip()
    except Exception as e:
        logger.error(f"Ошибка g4f при извлечении ключевого слова: {str(e)}")
        keyword = ""

    # Если ключевое слово не найдено, используем пустой запрос
    services_with_data = await get_top_tutors(db=db, limit=3, query=keyword if keyword else None)

    if not services_with_data:
        return "Нет\nК сожалению, по вашему запросу ничего не найдено. Попробуйте уточнить!"

    # Формируем информацию о сервисах
    services_info = [
        {
            "id": service["service"].id,
            "name": service["service"].name,
            "description": service["service"].description,
            "price": str(service["service"].price) if service["service"].price else None,
            "photo": service["service"].photo,
            "created_at": service["service"].created_at.isoformat(),
            "city": {
                "id": service["service"].city.id,
                "name": service["service"].city.name
            },
            "review_count": service["review_count"],
            "rating": service["service"].rating,
            "search_rank": service["service"].search_rank,
            "variant": {
                "id": service["service"].variant.id,
                "name": service["service"].variant.name
            } if service["service"].variant else None,
            "specialist": {
                "id": service["service"].specialist.id,
                "fullname": service["service"].specialist.fullname,
                "phone_number": service["service"].specialist.phone_number,
                "email": service["service"].specialist.email,
                "photo": service["service"].specialist.photo,
                "instagram_link": service["service"].specialist.instagram_link,
                "whatsapp_link": service["service"].specialist.whatsapp_link
            } if service["service"].specialist else None
        }
        for service in services_with_data
    ]

    # Формируем текстовый список для g4f
    services_text = "\n".join(
        f"- **ID {service['id']}**: {service['name']}  \n  {service['description']}  \n  Цена: {service['price'] or 'не указана'}  \n  Город: {service['city']['name']}  \n  Рейтинг: {service['rating'] or 'нет'}"
        for service in services_info
    )

    # Формируем ответ с учетом запроса
    try:
        response = g4f_client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "Ты — помощник для поиска услуг. Отвечай естественно и дружелюбно, предлагая услуги из списка на основе запроса пользователя."},
                {"role": "user", "content": f"Пользователь написал: '{message}'. Предложи ему эти услуги:\n{services_text}"}
            ]
        )
        bot_response = response.choices[0].message.content
        if not bot_response.startswith("Вот"):
            bot_response = f"Вот\n{bot_response}"
    except Exception as e:
        logger.error(f"Ошибка g4f при формировании ответа: {str(e)}")
        bot_response = f"Вот\nНайденные услуги по вашему запросу:\n{services_text}"

    # Возвращаем структурированный JSON с полем services
    return {
        "reply": bot_response,
        "services": services_info
    }