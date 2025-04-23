import React from 'react'
import BlackHeader from '../main/BlackHeader'
import cosmeticCard from '../../assets/img/cosmetic-card.png'
import ServicesCard from '../UI/cards/ServicesCard'
import Footer from '../main/Footer'
import RequestCard from '../UI/cards/RequestCard'
import requestPhoto from '../../assets/img/request-card.png'
import { Link } from 'react-router-dom'

function Services() {
    const data = [
        {
            id: 1,
            photo: cosmeticCard,
            name: 'Макияж и визаж',
            description: 'wefwefwe'
        },
        {
            id: 2,
            photo: cosmeticCard,
            name: 'Макияж и визаж',
            description: 'wefwefwe'
        },
        {
            id: 3,
            photo: cosmeticCard,
            name: 'Макияж и визаж',
            description: 'wefwefwe'
        },
        {
            id: 3,
            photo: cosmeticCard,
            name: 'Макияж и визаж',
            description: 'wefwefwe'
        }, {
            id: 3,
            photo: cosmeticCard,
            name: 'Макияж и визаж',
            description: 'wefwefwe'
        }, {
            id: 3,
            photo: cosmeticCard,
            name: 'Макияж и визаж',
            description: 'wefwefwe'
        }, {
            id: 3,
            photo: cosmeticCard,
            name: 'Макияж и визаж',
            description: 'wefwefwe'
        },
    ]

    const request = [
        {
            id: 1,
            name: 'Макияж, прически',
            photo: requestPhoto,
            price: 6000,
            description: 'Макияж(образ), который понравится всем, только люкс материалы, прически любой сложности, в студии и на выезд',
            address: 'г. Нур-Султан Шевченко 20',
            reviews: 10,
            rate: 4.7,
            created_at: '22.06.2022',
        },
        {
            id: 1,
            name: 'Макияж, прически',
            photo: requestPhoto,
            price: 6000,
            description: 'Макияж(образ), который понравится всем, только люкс материалы, прически любой сложности, в студии и на выезд',
            address: 'г. Нур-Султан Шевченко 20',
            reviews: 10,
            rate: 4.7,
            created_at: '22.06.2022',
        },
        {
            id: 1,
            name: 'Макияж, прически',
            photo: requestPhoto,
            price: 6000,
            description: 'Макияж(образ), который понравится всем, только люкс материалы, прически любой сложности, в студии и на выезд',
            address: 'г. Нур-Султан Шевченко 20',
            reviews: 10,
            rate: 4.7,
            created_at: '22.06.2022',
        },
    ]

    return (
        <div className=''>
            <BlackHeader />
            <div className='px-[10vw] flex justify-center flex-col text-center mt-5 gap-y-[3vh] '>
                <div className='font-eastman_regular text-[7vw] sm:text-[5vw] md:text-[4vw] lg:text-[3.5vw] xl:text-[2vw]'>Красота и здоровье</div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5 '>
                    <Link to={'/beauty/all'} className="relative w-full max-w-[320px] h-[250px] shadow-card bg-[#1D217C] cursor-pointer">
                        <div className="absolute bottom-0 w-full z-20">
                            <svg
                                className="w-full h-[148px]"
                                viewBox="0 0 360 213"
                                preserveAspectRatio="none"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M360 101.068V213H0V104.267L35.3455 20.2425C41.7699 4.97016 59.6689 -3.01241 75.324 2.41292L360 101.068Z"
                                    fill="white"
                                />
                            </svg>

                            <div className="absolute top-20 left-10 w-full h-full flex flex-col justify-start items-start text-[#141414] font-eastman_regular z-30">
                                <div className="text-[23px]">Все варианты</div>
                            </div>
                        </div>
                    </Link>

                    {data.map((data) =>
                        <ServicesCard name={data.name} description={data.description} photo={data.photo} />
                    )}
                </div>
            </div>

            <div className='px-[10vw] flex flex-col text-center mt-[5vh] gap-y-[1vh] pb-5 '>
                <div className='font-eastman_regular text-[7vw] sm:text-[5vw] md:text-[4vw] lg:text-[3.5vw] xl:text-[2vw] 2xl:text-[2.5vw]'>
                    Новые заявки
                </div>
                <div className='xl:grid xl:grid-cols-2 gap-3 '>
                    {request.map((request)=>
                    <RequestCard data={request}/>
                    )}
                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default Services