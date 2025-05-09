import React from 'react'
import RestaurantHeader from '../../main/RestaurantHeader'
import meat from "../../../assets/img/restaurant/meat.png";
import juice from "../../../assets/img/restaurant/juice.png";
import booking from "../../../assets/img/restaurant/booking.png";
import critic from "../../../assets/img/restaurant/critik.png";
import Footer from '../../main/Footer'
import menu1 from '../../../assets/img/restaurant/menu-1.png'
import menu2 from '../../../assets/img/restaurant/menu-2.png'


function HomeRestaurant() {
    return (
        <div className=''>
            <RestaurantHeader />
            <div className='bg-main-restaurant w-full h-[550px] bg-cover bg-center px-[300px] pt-[150px]'>
                <div className='flex flex-col gap-3'>

                    <h1 className='flex flex-col gap-1 text-[50px] text-white font-fredoka font-bold'>
                        <span>Идеальное место, чтобы</span>
                        <span>Насладиться Фантастической едой</span>
                    </h1>
                    <h3 className='text-[18px] font-epilogue text-white/80 max-w-[40vw]'>
                        Праздничный ужин в Farthings, где мы твердо верим в использование самых лучших продуктов
                    </h3>
                    <div className='py-2 px-5 w-[10vw] border-[3px] rounded-lg border-[#F3274C] relative h-[50px]'>
                        <div className='absolute bg-[#F3274C] rounded-lg p-[6px] top-1 -left-4 px-6 text-white font-bold'>
                            Увидеть меню
                        </div>
                    </div>
                </div>

            </div>
            <div className="px-4 md:px-8 lg:px-16 xl:px-[300px] py-12  min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between gap-8">
                        <div className="flex flex-col gap-2 max-w-lg">
                            <span className="text-[#F3274C] text-lg md:text-xl font-russo tracking-wide">
                                О СЕТЕЙ РЕСТОРАНОВ KLEVER
                            </span>
                            <h1 className="font-russo text-black font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight">
                                Новые блюда, которыми можно насладиться
                            </h1>
                        </div>

                        <div className="flex flex-col gap-6 max-w-md">
                            <p className="text-gray-600 font-epilogue text-sm md:text-base leading-relaxed">
                                Мягкий вкус сочетается с уютом и тёплой атмосферой. Гармония
                                специй, яркие акценты и тонкие ароматы создают настоящее
                                удовольствие. Здесь каждая деталь продумана, чтобы удивить. Мягкий
                                свет, лёгкие ноты вкуса и уют в каждой ложке.
                            </p>
                            <div className="flex flex-row items-center gap-4">
                                <div className="w-16 md:w-20">
                                    <img
                                        src={critic}
                                        alt="Михаил Костин"
                                        className="w-full rounded-full object-cover shadow-md border-2 border-gray-200"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="font-epilogue font-semibold text-lg text-gray-800">
                                        Михаил Костин
                                    </span>
                                    <span className="font-epilogue text-sm text-gray-500">
                                        Директор и главный операционный директор
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div
                            className="h-96 bg-cover bg-center p-3 "
                            style={{ backgroundImage: `url(${meat})` }}
                        >
                            <div className="border-4 border-[#FFD40D] rounded-xl h-full relative">
                                <div className="bg-[#FFD40D] rounded-t-2xl absolute py-3 text-[20px] w-full bottom-0 flex justify-center font-russo">
                                    Блюдо
                                </div>
                            </div>
                        </div>
                        <div
                            className="h-96 bg-cover bg-center p-3 sm:mt-10"
                            style={{ backgroundImage: `url(${juice})` }}
                        >
                            <div className="border-4 border-[#FFD40D] rounded-xl h-full relative">
                                <div className="bg-[#FFD40D] rounded-t-2xl absolute py-3 text-[20px] w-full bottom-0 flex justify-center font-russo">
                                    Напитки
                                </div>
                            </div>
                        </div>
                        <div
                            className="h-96 bg-cover bg-center p-3"
                            style={{ backgroundImage: `url(${booking})` }}
                        >
                            <div className="border-4 border-[#FFD40D] rounded-xl h-full relative">
                                <div className="bg-[#FFD40D] rounded-t-2xl absolute py-3 text-[20px] w-full bottom-0 flex justify-center font-russo">
                                    Бронирование
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-20 w-full px-[300px]'>
                <div className='flex flex-col gap-2 justify-center text-center items-center'>

                    <h1 className='font-russo font-semibold text-3xl '>Популярное в Меню</h1>
                    <div>
                        <svg width="220" height="11" viewBox="0 0 271 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.979492" y="0.640137" width="270" height="10" rx="5" fill="#FFD40D" />
                        </svg>

                    </div>
                </div>
                <div className='mt-10 flex flex-row gap-5 w-full justify-center '>
                    <div className='pt-10 pl-7 pr-20 bg-cover bg-center w-full rounded-2xl h-[250px] relative' style={{ backgroundImage: `url(${menu1})` }}>
                        <h1 className='text-white font-russo font-bold text-[35px]'>Steaks & BBQ</h1>
                        <h2 className='font-epilogue text-[13px] text-white font-thin'>каноническая классика для малоизвестных тики-напитков</h2>
                        <div className='bg-[#FFD40D] size-28 rounded-full flex justify-center items-center flex-col gap-1 absolute -bottom-7  leading-3 '>
                            <span className='text-[20px] text-[#F3274C] font-russo font-bold'>1200 Тг</span>
                            <span className='text-[13px] font-russo font-semibold'>чел.</span>
                        </div>
                    </div>
                    <div className='pt-10 pl-7 pr-20 bg-cover bg-center w-full rounded-2xl h-[250px relative' style={{ backgroundImage: `url(${menu2})` }}>
                        <h1 className='text-white font-russo font-bold text-[35px]'>Коктейли</h1>
                        <h2 className='font-epilogue text-[13px] text-white font-thin'>каноническая классика для малоизвестных тики-напитков</h2>
                        <div className='bg-[#FFD40D] size-28  rounded-full flex justify-center items-center flex-col gap-1 absolute -bottom-7  leading-3 '>
                            <span className='text-[20px] text-[#F3274C] font-russo font-bold'>1200 Тг</span>
                            <span className='text-[13px] font-russo font-semibold'>чел.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center mt-10'>

                <div className='flex justify-center flex-row gap-2 items-center rounded-xl bg-[#F3274C] text-black font-russo font-bold text-[20px]  py-2 px-4 shadow-container shadow-red-700 hover:scale-110 transition-all duration-300 cursor-pointer '>
                    <span className=''>
                        Перейти к Ресторанам
                    </span>
                    <div>

                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"><path stroke-dasharray="20" stroke-dashoffset="20" d="M3 12h17.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="20;0" /></path><path stroke-dasharray="12" stroke-dashoffset="12" d="M21 12l-7 7M21 12l-7 -7"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="12;0" /></path></g></svg>
                    </div>
                </div>
            </div>
            <div className='mt-10'>
                <Footer />
            </div>
        </div>
    )
}

export default HomeRestaurant