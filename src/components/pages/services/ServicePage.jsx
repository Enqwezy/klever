import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { serviceProfile } from '../../../store/actions/serviceProfileAction';
import BlackHeader from '../../main/BlackHeader';
import Footer from '../../main/Footer';
import inst from '../../../assets/img/inst-logo.png';
import whatsapp from '../../../assets/img/whatsapp-logo.png';
import Chat from '../../UI/chat/Chat';

function ServicePage({ service_name }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { serviceProfileData, loading, error } = useSelector((state) => state.serviceProfile);
  const [activeTab, setActiveTab] = React.useState('description');

  useEffect(() => {
    // Редирект на главную, если id отсутствует или service_name === 'undefined'
    if (!id || service_name === 'undefined' || !service_name) {
      navigate('/', { replace: true });
    } else {
      dispatch(serviceProfile(id));
    }
  }, [id, service_name, dispatch, navigate]);

  if (loading) {
    return (
      <div className="text-center font-eastman_regular py-10">
        Загрузка...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-eastman_regular py-10">
        Ошибка: {error}
      </div>
    );
  }

  if (!serviceProfileData) {
    return (
      <div className="text-center font-eastman_regular py-10">
        Услуга не найдена
      </div>
    );
  }

  const { name, description, price, photo, rate, city, specialist } = serviceProfileData;
  const specialistPhoto = specialist?.photo || '/media/default_ava.jpg';
  const specialistName = specialist?.fullname || 'Не указан';
  const phoneNumber = specialist?.phone_number || 'Не указан';
  const instagramLink = specialist?.instagram_link;
  const whatsappLink = specialist?.whatsapp_link;
  const cityName = city?.name || 'Не указан';

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen">
      <BlackHeader />
      <div className="flex justify-center items-center my-6 sm:my-8 md:my-10 font-eastman_regular">
        <div className="w-[90vw] sm:w-[85vw] md:w-[80vw] flex flex-col md:flex-row gap-6 md:gap-8 xl:gap-10">
          <div className="w-full md:w-1/2">
            <img
              src={`http://localhost:8000/${photo}`}
              alt={name}
              className="w-full max-w-[100%] md:max-w-[45vw] object-cover rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex justify-center items-center">
              <img
                src={`http://localhost:8000/${specialistPhoto}`}
                alt={specialistName}
                className="rounded-full h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 object-cover"
              />
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-eastman_regular text-center mt-4">
              {specialistName}
            </div>
            <div className="mt-4 sm:mt-6 md:mt-8 flex flex-col gap-3 sm:gap-4 md:gap-5">
              <div className="flex flex-row justify-between font-eastman_medium text-sm sm:text-base md:text-lg items-end">
                <div>Контакты:</div>
                <div className="flex flex-row gap-1 items-center">
                  <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">{rate || 'N/A'}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 40 40"
                    fill="none"
                    className="sm:w-5 sm:h-5 md:w-6 md:h-6"
                  >
                    <path
                      d="M38.7072 14.0851L26.7159 12.2602L21.3555 0.880338C21.2091 0.568764 20.9683 0.316538 20.6707 0.163224C19.9245 -0.222535 19.0177 0.0989307 18.6446 0.880338L13.2843 12.2602L1.29303 14.0851C0.962436 14.1346 0.660175 14.2978 0.428758 14.5451C0.148986 14.8462 -0.00518049 15.2513 0.000132928 15.6714C0.00544635 16.0915 0.169805 16.4922 0.457094 16.7854L9.1329 25.643L7.0832 38.1505C7.03514 38.4415 7.06588 38.7407 7.17195 39.0143C7.27802 39.2879 7.45518 39.5249 7.68332 39.6984C7.91147 39.8719 8.18148 39.975 8.46273 39.996C8.74399 40.017 9.02524 39.9551 9.27459 39.8172L20.0001 33.9121L30.7256 39.8172C31.0184 39.9804 31.3585 40.0348 31.6843 39.9754C32.5061 39.8271 33.0587 39.0111 32.917 38.1505L30.8673 25.643L39.5431 16.7854C39.7792 16.5431 39.9351 16.2266 39.9823 15.8804C40.1098 15.0149 39.5336 14.2137 38.7072 14.0851Z"
                      fill="#FFC700"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-sm sm:text-base md:text-lg">{phoneNumber}</div>
              <div className="flex flex-row gap-2 sm:gap-3">
                {instagramLink && (
                  <a href={instagramLink} target="_blank" rel="noopener noreferrer">
                    <img src={inst} alt="Instagram" className="w-8 h-8 sm:w-10 sm:h-10" />
                  </a>
                )}
                {whatsappLink && (
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <img src={whatsapp} alt="WhatsApp" className="w-8 h-8 sm:w-10 sm:h-10" />
                  </a>
                )}
              </div>
              <div className="flex flex-col gap-2 sm:gap-3">
                <div className="font-eastman_medium text-sm sm:text-base md:text-lg">Оцените:</div>
                <div className="flex flex-row gap-2 sm:gap-3 md:gap-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      width="24"
                      height="24"
                      viewBox="0 0 30 30"
                      fill="none"
                      className="sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                    >
                      <path
                        d="M19.1323 9.62129L19.3595 10.1036L19.8865 10.1838L28.8766 11.552C28.8769 11.552 28.8771 11.552 28.8773 11.5521C28.9259 11.5602 29.0172 11.63 28.9974 11.7645L28.9974 11.7645L28.9959 11.7751C28.9893 11.8234 28.9683 11.863 28.9416 11.8907C28.9414 11.8909 28.9413 11.891 28.9411 11.8912L22.4361 18.5325L22.0817 18.8943L22.1636 19.394L23.7009 28.7746L23.701 28.7753C23.7116 28.8395 23.6959 28.8962 23.668 28.9375C23.6405 28.9782 23.6096 28.9932 23.5856 28.9975L23.5841 28.9978C23.5651 29.0012 23.5459 28.9977 23.5311 28.9894L23.5265 28.9869L15.4824 24.5581L15.0001 24.2925L14.5178 24.5581L6.47364 28.9869L6.47207 28.9878C6.45348 28.998 6.43633 29.0009 6.42151 28.9998C6.40657 28.9987 6.38782 28.993 6.36786 28.9778C6.34741 28.9623 6.32578 28.9365 6.31134 28.8992C6.29681 28.8617 6.29199 28.8185 6.29903 28.7759L6.29924 28.7746L7.83651 19.394L7.9184 18.8943L7.56408 18.5325L1.05722 11.8893L1.05716 11.8893C1.02636 11.8578 1.00084 11.8054 1.00002 11.7409C0.999214 11.6772 1.02283 11.6239 1.05299 11.5908C1.07893 11.5636 1.10282 11.5551 1.11773 11.5529L1.12023 11.5525L10.1136 10.1838L10.6407 10.1036L10.8679 9.62129L14.8859 1.09113C14.8861 1.09065 14.8864 1.09016 14.8866 1.08968C14.9117 1.03801 14.9461 1.01493 14.9721 1.00571C14.9972 0.996832 15.0193 0.998063 15.0438 1.01074L15.045 1.01135C15.0662 1.02225 15.0927 1.04534 15.1116 1.08554L15.112 1.08639L19.1323 9.62129Z"
                        stroke="black"
                        strokeWidth="2"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10 sm:mb-12 md:mb-16 lg:mb-20 font-eastman_regular flex items-center justify-center">
        <div className="w-[90vw] sm:w-[85vw] md:w-[80vw]">
          <Link to={service_name ? `/${service_name}/all` : '/'} className="flex items-center mb-4 sm:mb-6 md:mb-8">
            <button className="flex items-center gap-2 bg-black text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-gray-800 text-sm sm:text-base md:text-lg transition-colors duration-200">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Назад
            </button>
          </Link>
          <div className="flex flex-col sm:flex-row justify-between text-2xl sm:text-3xl">
            <div>{name}</div>
            <div>от {price?.toLocaleString('ru-KZ')} ₸</div>
          </div>
          <div className="mt-4 sm:mt-6 md:mt-8 flex flex-col gap-4 sm:gap-6 md:gap-8">
            <div className="flex flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-10 text-lg sm:text-xl md:text-2xl">
              <div
                className={`cursor-pointer pb-1 ${activeTab === 'description' ? 'border-b-2 border-black' : ''}`}
                onClick={() => handleTabClick('description')}
              >
                Описание
              </div>
              <div
                className={`cursor-pointer pb-1 ${activeTab === 'reviews' ? 'border-b-2 border-black' : ''}`}
                onClick={() => handleTabClick('reviews')}
              >
                Отзывы
              </div>
              <div
                className={`cursor-pointer pb-1 ${activeTab === 'message' ? 'border-b-2 border-black' : ''}`}
                onClick={() => handleTabClick('message')}
              >
                Сообщение
              </div>
            </div>
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl mt-4 sm:mt-6 md:mt-8 transition-opacity duration-300">
              {activeTab === 'description' && (
                <div className={activeTab === 'description' ? 'opacity-100' : 'opacity-0'}>
                  {description}
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className={activeTab === 'reviews' ? 'opacity-100' : 'opacity-0'}>
                  <h3 className="font-eastman_medium text-lg sm:text-xl md:text-2xl">Отзывы</h3>
                  <ul className="mt-4 space-y-4">
                    <li className="border-b pb-2">
                      <p>
                        <strong>Айша, 15.04.2025:</strong> Отличный специалист, всё сделали быстро и качественно!
                      </p>
                    </li>
                    <li className="border-b pb-2">
                      <p>
                        <strong>Данияр, 10.04.2025:</strong> Очень доволен, рекомендую!
                      </p>
                    </li>
                    <li>Пока нет других отзывов.</li>
                  </ul>
                </div>
              )}
              {activeTab === 'message' && (
                <div className={activeTab === 'message' ? 'opacity-100' : 'opacity-0'}>
                  <h3 className="font-eastman_medium text-lg sm:text-xl md:text-2xl">Отправить сообщение</h3>
                  <form className="mt-4 flex flex-col gap-4">
                    <textarea
                      className="border rounded p-2 text-sm sm:text-base md:text-lg w-full"
                      rows="5"
                      placeholder="Ваше сообщение..."
                    ></textarea>
                    <button
                      type="submit"
                      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm sm:text-base md:text-lg"
                    >
                      Отправить
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-10">
            <div className="font-eastman_medium text-sm sm:text-base md:text-lg">Местоположение</div>
            <div className="text-sm sm:text-base md:text-lg">{cityName}</div>
          </div>
          <Chat />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ServicePage;