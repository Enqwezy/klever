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

    tutor_keywords = ["репетитор", "репетитора", "репетиторов", "ищу репетитора", "найти репетитора", "поиск репетитора"]
    if any(keyword in message.lower() for keyword in tutor_keywords):
        tutors_with_data = await get_top_tutors(db=db, limit=3)

        if not tutors_with_data:
            return "Нет\nК сожалению, репетиторов не найдено."

        tutors_info = [
            {
                "id": tutor["service"].id,
                "name": tutor["service"].name,
                "description": tutor["service"].description,
                "price": str(tutor["service"].price) if tutor["service"].price else None,
                "photo": tutor["service"].photo,
                "created_at": tutor["service"].created_at.isoformat(),
                "city": {
                    "id": tutor["service"].city.id,
                    "name": tutor["service"].city.name
                },
                "review_count": tutor["review_count"],
                "rating": tutor["service"].rating
            }
            for tutor in tutors_with_data
        ]

        tutors_text = "\n".join(
            f"- **{tutor['name']}"
            for tutor in tutors_info
        )
        bot_response = f"Вот\nНайденные репетиторы:\n{tutors_text}"

        try:
            response = g4f_client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": "Ты — помощник для поиска репетиторов. Отвечай естественно и дружелюбно."},
                    {"role": "user", "content": f"Сформируй ответ с этим списком репетиторов:\n{tutors_text}"}
                ]
            )
            bot_response = response.choices[0].message.content
            if not bot_response.startswith("Вот"):
                bot_response = f"Вот\n{bot_response}"
        except Exception as e:
            logger.error(f"Ошибка g4f: {str(e)}")

        return {
            "reply": bot_response,
            "tutors": tutors_info
        }

    try:
        response = g4f_client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "Ты — помощник для поиска репетиторов. Отвечай естественно и дружелюбно."},
                {"role": "user", "content": message}
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        logger.error(f"Ошибка g4f: {str(e)}")
        return "Извините, я не понял ваш запрос. Чем могу помочь?"