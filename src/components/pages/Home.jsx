import React, { useState } from 'react';
import klever from '../../assets/img/home-klever.png';
import ServicesCard from '../UI/cards/ServicesCard';
import cosmeticCard from '../../assets/img/cosmetic-card.png';
import someClever from '../../assets/img/some-klever.png';
import RegularInputs from '../UI/input/RegularInputs';
import { Link } from 'react-router-dom';
import endPhoto from '../../assets/img/home-end-photo.png';
import Header from '../main/Header';
import Footer from '../main/Footer';

function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const services = [
        { photo: cosmeticCard, name: 'Косметология', description: 'чистка лица, пилинг, уходовые процедуры...' },
        { photo: cosmeticCard, name: 'Косметология', description: 'чистка лица, пилинг, уходовые процедуры...' },
        { photo: cosmeticCard, name: 'Косметология', description: 'чистка лица, пилинг, уходовые процедуры...' },
    ];
    const totalSlides = services.length;

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    };

    const getVisibleSlides = () => {
        if (window.innerWidth < 640) return 1; 
        if (window.innerWidth < 1024) return 2; 
        return 3; һ
    };

    const visibleSlides = getVisibleSlides();

    return (
        <div>
            <div className="bg-[#1D217C] w-full h-[60vh] sm:h-[70vh] lg:h-[90vh] px-4 sm:px-6 lg:px-12 xl:px-[100px] pt-6 lg:pt-[40px] relative">
                <div className="flex flex-col w-full relative">
                    <Header />
                    <div className="flex flex-col lg:flex-row w-full items-center lg:items-start">
                        <div className="flex flex-col gap-y-3 sm:gap-y-4 xl:gap-y-5 items-center mt-[7vh] sm:mt-[5vh] lg:mt-[2vh] xl:mt-[2ch] lg:ml-[100px] xl:ml-[200px] text-[18px] sm:text-[22px] xl:text-[25px]">
                            <Link
                                to="/beauty"
                                className="bg-white px-4 sm:px-6 xl:px-8 text-[#141414] font-eastman_regular rounded-[15px] sm:rounded-[20px] flex justify-center w-[270px] sm:w-[300px] md:w-[320px] lg:w-[300px] xl:w-[350px] py-1 hover:bg-gray-100 transition-all duration-200"
                            >
                                Красота и здоровье
                            </Link>
                            <Link
                                to="/cleaning"
                                className="bg-white px-4 sm:px-6 xl:px-8 text-[#141414] font-eastman_regular rounded-[15px] sm:rounded-[25px] text-[18px] sm:text-[22px] xl:text-[25px] flex justify-center w-[180px] sm:w-[195px] xl:w-[220px] py-1 hover:bg-gray-100 transition-all duration-200"
                            >
                                Клининг
                            </Link>
                            <Link
                                to="/tutoring"
                                className="bg-white px-4 sm:px-6 xl:px-8 text-[#141414] font-eastman_regular rounded-[15px] sm:rounded-[25px] text-[18px] sm:text-[22px] xl:text-[25px] flex justify-center w-[240px] sm:w-[270px] xl:w-[300px] py-1 hover:bg-gray-100 transition-all duration-200"
                            >
                                Репетиторство
                            </Link>
                            <Link
                                to="/building"
                                className="bg-white px-4 sm:px-6 xl:px-8 text-[#141414] font-eastman_regular rounded-[15px] sm:rounded-[25px] text-[18px] sm:text-[22px] xl:text-[25px] flex justify-center w-[230px] sm:w-[260px] xl:w-[295px] py-1 hover:bg-gray-100 transition-all duration-200"
                            >
                                Строительство
                            </Link>
                            <Link
                                to="/med_service"
                                className="bg-white px-4 sm:px-6 xl:px-8 text-[#141414] font-eastman_regular rounded-[15px] sm:rounded-[25px] text-[18px] sm:text-[22px] xl:text-[25px] flex justify-center w-[200px] sm:w-[220px] xl:w-[240px] py-1 hover:bg-gray-100 transition-all duration-200"
                            >
                                Мед Услуги
                            </Link>
                        </div>
                        <div className="absolute right-0 top-10 lg:top-[120px] xl:top-[120px] 2xl:top-[150px] hidden lg:block">
                            <img src={klever} alt="Klever" className="w-[35vw]" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-[15vh] sm:mt-[20vh] lg:mt-[30vh] mx-4 sm:mx-8 lg:mx-[10vw] xl:mx-[23.6vw] relative ">
                <div className="flex flex-col sm:flex-row items-center mb-3 sm:mb-5">
                    <div className="text-[20px] sm:text-[22px] xl:text-[25px] font-eastman_medium">
                        Популярные услуги
                    </div>
                    <div className="flex flex-row gap-2 sm:gap-3 absolute right-0 mt-2 sm:mt-0 ">
                        <button onClick={handlePrev}>
                            <svg
                                className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] xl:w-[40px] xl:h-[40px]"
                                viewBox="0 0 60 60"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="30" cy="30" r="30" transform="rotate(180 30 30)" fill="#C4C4C4" fillOpacity="0.7" />
                                <path
                                    d="M31.5112 14.0002C31.191 13.999 30.8746 14.072 30.5853 14.2138C30.296 14.3556 30.0411 14.5625 29.8394 14.8194L19.4876 28.1038C19.1723 28.5 19 28.9969 19 29.5098C19 30.0226 19.1723 30.5195 19.4876 30.9157L30.2038 44.2002C30.5676 44.6523 31.0903 44.9367 31.6571 44.9906C32.2238 45.0446 32.7881 44.8638 33.2258 44.488C33.6634 44.1122 33.9387 43.5721 33.9909 42.9867C34.0432 42.4012 33.8682 41.8183 33.5044 41.3661L23.9241 29.4987L33.1829 17.6312C33.445 17.3062 33.6114 16.9105 33.6626 16.4908C33.7138 16.0711 33.6475 15.6451 33.4717 15.2631C33.2958 14.8811 33.0177 14.5592 32.6703 14.3354C32.3228 14.1115 31.9206 13.9952 31.5112 14.0002Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                        <button onClick={handleNext}>
                            <svg
                                className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] xl:w-[40px] xl:h-[40px]"
                                viewBox="0 0 60 60"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="30" cy="30" r="30" fill="#76C6FF" />
                                <path
                                    d="M28.4888 45.9998C28.809 46.001 29.1254 45.928 29.4147 45.7862C29.704 45.6444 29.9589 45.4375 30.1606 45.1806L40.5124 31.8962C40.8277 31.5 41 31.0031 41 30.4902C41 29.9774 40.8277 29.4805 40.5124 29.0843L29.7962 15.7998C29.4324 15.3477 28.9097 15.0633 28.3429 15.0094C27.7762 14.9554 27.2119 15.1362 26.7742 15.512C26.3366 15.8878 26.0613 16.4279 26.0091 17.0133C25.9568 17.5988 26.1318 18.1817 26.4956 18.6339L36.0759 30.5013L26.8171 42.3688C26.555 42.6938 26.3886 43.0895 26.3374 43.5092C26.2862 43.9289 26.3525 44.3549 26.5283 44.7369C26.7042 45.1189 26.9823 45.4408 27.3297 45.6646C27.6772 45.8885 28.0794 46.0048 28.4888 45.9998Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="overflow-hidden w-full ml-[20px] ">
                    <div
                        className="flex transition-transform duration-500 ease-in-out   "
                        style={{ transform: `translateX(-${currentSlide * (100 / visibleSlides)}%)` }}
                    >
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="min-w-[100%] sm:min-w-[50%] lg:min-w-[33.33%]  px-1 "
                            >
                                <ServicesCard
                                    photo={service.photo}
                                    name={service.name}
                                    description={service.description}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row mt-[10vh] sm:mt-[15vh] lg:mt-[20vh]  ">
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 xl:gap-10 w-full">
                    <img
                        src={someClever}
                        alt="Some Clever"
                        className="w-full sm:w-[50vw] lg:w-[40vw] xl:w-[35vw] object-cover"
                    />
                    <div className="flex flex-col mt-6 lg:mt-[20vh] px-4 sm:px-8 lg:px-12">
                        <div className="text-[20px] sm:text-[22px] xl:text-[25px] font-eastman_medium text-center ">
                            О нас
                        </div>
                        <div className="text-[13px] sm:text-[14px] xl:text-[15px] font-eastman_regular w-full sm:w-[50vw] lg:w-[40vw] mt-4 sm:mt-6 xl:mt-[5vh] leading-relaxed">
                            Профессиональный преподаватель, репетитор по скрипке. Обучаю игре на скрипке с нуля. Нотная грамота, сольфеджио. Развитие слуха, чувства ритма, формирование осанки у ребёнка также являются несомненными плюсами обучения игре на скрипке. Пишите и звоните! Что-нибудь надо написать, поэтому пишу. Все шикарно у меня, но пиздец как устала. И вот и все. Диля моя лучшая сестра. Вот так вот. Это рубрика обо мне.
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-6 sm:mb-8 xl:mb-10 px-4 sm:px-8 lg:px-12">
                <div className="text-[24px] sm:text-[30px] xl:text-[35px] flex justify-center font-eastman_medium">
                    Хочешь стать специалистом в Klever?
                </div>
                <div className="flex flex-col lg:flex-row justify-center mt-4 sm:mt-5 gap-4 sm:gap-6 xl:gap-10">
                    <div className="w-full max-w-[90vw] sm:max-w-[70vw] lg:max-w-[30vw] xl:max-w-[350px]">
                        <div className="rounded-[20px] sm:rounded-[30px] xl:rounded-[40px] min-h-[50vh] sm:min-h-[60vh] xl:min-h-[70vh] bg-[#F4F4F4] p-4 sm:p-6 xl:p-[25px] flex flex-col shadow-container gap-4 sm:gap-5">
                            <div className="font-eastman_regular text-[20px] sm:text-[22px] xl:text-[25px] text-[#0A0A0A] text-center leading-tight sm:leading-8">
                                Заявка
                            </div>
                            <div className="flex flex-col gap-y-4 sm:gap-y-5 xl:gap-y-[20px]">
                                <div className="font-eastman_regular">
                                    <RegularInputs
                                        name="Fullname"
                                        placeholder="Enter message"
                                        type="text"
                                        borderColor="border-[#6A6A6A]"
                                    />
                                </div>
                                <div className="font-eastman_regular">
                                    <RegularInputs
                                        name="Phone"
                                        placeholder="Enter message"
                                        type="tel"
                                        borderColor="border-[#6A6A6A]"
                                    />
                                </div>
                                <div className="font-eastman_regular">
                                    <RegularInputs
                                        name="Email"
                                        placeholder="Enter message"
                                        type="email"
                                        borderColor="border-[#6A6A6A]"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center items-center mt-4 sm:mt-6 xl:mt-[30px]">
                                <button className="bg-[#6A6A6A] rounded-[12px] w-[90px] sm:w-[100px] xl:w-[120px] p-2 flex justify-center items-center h-[28px] sm:h-[31px] xl:h-[35px] text-white text-[13px] sm:text-[14px] xl:text-[15px] font-light hover:bg-[#7A7A7A] hover:shadow-md transition-all duration-200">
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img
                            src={endPhoto}
                            alt="End Photo"
                            className="w-full sm:w-[50vw] lg:w-[30vw] xl:w-[25vw] object-cover"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;