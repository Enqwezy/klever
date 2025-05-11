import React from 'react';
import RestaurantHeader from '../../main/RestaurantHeader';
import Footer from '../../main/Footer';
// import restaurant1 from '../../../assets/img/restaurant/'; // Предполагаемые изображения
// import restaurant2 from '../../../assets/img/restaurant/restaurant2.png';
// import restaurant3 from '../../../assets/img/restaurant/restaurant3.png';

// Пример данных для ресторанов (в реальном проекте это может приходить с API)
const restaurants = [
    {
        id: 1,
        name: 'Farthings Central',
        description: 'Уютный ресторан в центре города с акцентом на стейки и барбекю. Идеально для семейных ужинов и встреч с друзьями.',
        image: '',
        location: 'Алматы, ул. Абая 123',
        rating: 4.8,
        priceRange: '₸₸₸',
    },
    {
        id: 2,
        name: 'Farthings Lounge',
        description: 'Стильный лаундж с широким выбором коктейлей и изысканных блюд. Атмосфера для особых случаев.',
        image: '',
        location: 'Астана, пр. Республики 45',
        rating: 4.6,
        priceRange: '₸₸₸₸',
    },
    {
        id: 3,
        name: 'Farthings Garden',
        description: 'Ресторан с открытой террасой и видом на сад. Лучшее место для летних вечеров и романтических ужинов.',
        image: '',
        location: 'Шымкент, ул. Зеленая 78',
        rating: 4.7,
        priceRange: '₸₸',
    },
];

function RestaurantsList() {
    return (
        <div className="min-h-screen bg-white">
            <RestaurantHeader />
            <div className="px-4 md:px-8 lg:px-16 xl:px-[300px] py-12">
                <div className="max-w-7xl mx-auto">
                    {/* Заголовок секции */}
                    <div className="flex flex-col gap-4 justify-center text-center items-center mb-12">
                        <h1 className="font-russo font-semibold text-3xl md:text-4xl text-black">
                            Наши Рестораны
                        </h1>
                        <p className="font-epilogue text-gray-600 text-base max-w-2xl">
                            Откройте для себя уникальные рестораны сети Klever, каждый из которых предлагает незабываемую атмосферу и изысканные блюда.
                        </p>
                        <div>
                            <svg
                                width="220"
                                height="11"
                                viewBox="0 0 271 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    x="0.979492"
                                    y="0.640137"
                                    width="270"
                                    height="10"
                                    rx="5"
                                    fill="#FFD40D"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Список ресторанов */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {restaurants.map((restaurant) => (
                            <div
                                key={restaurant.id}
                                className="relative bg-white rounded-2xl shadow-container hover:shadow-red-700 transition-all duration-300 overflow-hidden"
                            >
                                {/* Изображение ресторана */}
                                <div
                                    className="h-64 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${restaurant.image})` }}
                                ></div>
                                {/* Контент карточки */}
                                <div className="p-6 flex flex-col gap-4">
                                    <h2 className="font-russo font-bold text-2xl text-black">
                                        {restaurant.name}
                                    </h2>
                                    <p className="font-epilogue text-gray-600 text-sm leading-relaxed">
                                        {restaurant.description}
                                    </p>
                                    <div className="flex flex-col gap-2">
                                        <span className="font-epilogue text-gray-500 text-sm">
                                            <strong>Локация:</strong> {restaurant.location}
                                        </span>
                                        <div className="flex flex-row justify-between">
                                            <span className="font-epilogue text-gray-500 text-sm">
                                                <strong>Рейтинг:</strong> {restaurant.rating}/5
                                            </span>
                                            <span className="font-epilogue text-gray-500 text-sm">
                                                <strong>Цены:</strong> {restaurant.priceRange}
                                            </span>
                                        </div>
                                    </div>
                                    {/* Кнопка */}
                                    <div className="flex justify-center mt-4">
                                        <button className="flex justify-center items-center rounded-xl bg-[#F3274C] text-white font-russo font-bold text-base py-2 px-6 hover:scale-105 transition-all duration-300">
                                            Забронировать
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                className="ml-2"
                                            >
                                                <g
                                                    fill="none"
                                                    stroke="#fff"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2.5"
                                                >
                                                    <path
                                                        strokeDasharray="20"
                                                        strokeDashoffset="20"
                                                        d="M3 12h17.5"
                                                    >
                                                        <animate
                                                            fill="freeze"
                                                            attributeName="stroke-dashoffset"
                                                            dur="0.2s"
                                                            values="20;0"
                                                        />
                                                    </path>
                                                    <path
                                                        strokeDasharray="12"
                                                        strokeDashoffset="12"
                                                        d="M21 12l-7 7M21 12l-7 -7"
                                                    >
                                                        <animate
                                                            fill="freeze"
                                                            attributeName="stroke-dashoffset"
                                                            begin="0.2s"
                                                            dur="0.2s"
                                                            values="12;0"
                                                        />
                                                    </path>
                                                </g>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default RestaurantsList;