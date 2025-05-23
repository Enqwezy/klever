from sqlalchemy.ext.asyncio import AsyncSession
import logging
from g4f.client import Client
from app.api.g4f.commands.tutor_crud import get_top_tutors
from tenacity import retry, stop_after_attempt, wait_exponential
import asyncio

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

g4f_client = Client()

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=5))
async def call_g4f(messages, model="gpt-4o"):
    """Обертка для вызова g4f с повторными попытками."""
    return g4f_client.chat.completions.create(model=model, messages=messages)

async def process_chat_message(message: str, db: AsyncSession) -> dict:
    """Обрабатывает сообщение пользователя, извлекает ключевое слово и возвращает услуги."""
    # Простые приветствия
    if message.lower().strip() in ["привет", "здравствуйте"]:
        return {"reply": "Привет! Чем могу помочь?", "services": []}

    # Получение услуг (без ключевого слова для скорости, можно добавить позже)
    services_with_data = await get_top_tutors(db=db, limit=3, query=None)
    services_text = "\n".join(
        f"- **ID {s['service'].id}**: {s['service'].name}  \n  {s['service'].description}  \n  Цена: {s['service'].price or 'не указана'}  \n  Город: {s['service'].city.name}  \n  Рейтинг: {s['service'].rating or 'нет'}"
        for s in services_with_data
    ) if services_with_data else "Нет услуг по запросу."

    # Единый запрос к g4f
    try:
        response = await call_g4f(
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Ты — помощник для поиска услуг. Извлеки главное ключевое слово (существительное, связанное с услугой) "
                        "из текста пользователя и предложи услуги из списка естественным и дружелюбным образом. "
                        "Если ключевое слово не найдено, предложи услуги как общие рекомендации."
                        f"\nСписок услуг:\n{services_text}"
                    )
                },
                {"role": "user", "content": message}
            ]
        )
        bot_response = response.choices[0].message.content
        if not bot_response.startswith("Вот"):
            bot_response = f"Вот\n{bot_response}"
    except Exception as e:
        logger.error(f"Ошибка g4f: {str(e)}")
        bot_response = f"Вот\nНайденные услуги:\n{services_text}" if services_with_data else "Нет\nК сожалению, ничего не найдено."

    # Формирование services_info с учетом ожидаемой структуры
    services_info = [
        {
            "id": s["service"].id,
            "name": s["service"].name,
            "price": str(s["service"].price) if s["service"].price else "не указана",
            "city": {
                "id": s["service"].city.id,
                "name": s["service"].city.name
            },
            "rating": s["service"].rating or "нет",
            "review_count": s["review_count"],
            "created_at": s["service"].created_at.isoformat()  # Добавляем created_at
        }
        for s in services_with_data
    ]

    return {"reply": bot_response, "services": services_info}