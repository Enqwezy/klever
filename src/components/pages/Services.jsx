import React, { useEffect } from 'react'
import BlackHeader from '../main/BlackHeader'
import cosmeticCard from '../../assets/img/cosmetic-card.png'
import ServicesCard from '../UI/cards/ServicesCard'
import Footer from '../main/Footer'
import RequestCard from '../UI/cards/RequestCard'
import requestPhoto from '../../assets/img/request-card.png'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// import { serviceList } from '../../store/services/servicesListService'
// import { fetchRequestByID } from '../../store/services/requestCardService'
import { fetchRequestByID } from '../../store/actions/requestCardAction'
import { serviceList } from '../../store/actions/servicesListAction'

function Services({service_name}) {
    const dispatch = useDispatch()
    const { serviceListData } = useSelector((state) => state.serviceList)
    const { serviceData, loading, error } = useSelector((state) => state.serviceById);

    const categoryId = service_name === 'beauty' ? 1 : service_name === 'cleaning' ? 2 : service_name === 'tutoring' ? 3 : service_name === 'building' ? 4 : service_name === 'med_service' ? 5 : null

    useEffect (() => {
        const fetchData = async () => {
            try {
                await dispatch(serviceList(categoryId))
                await dispatch(fetchRequestByID(categoryId))
            } catch (error) {
                console.error('Error fetching service list:', error)
            }
        }
        fetchData()
    }, [])

    

    return (
        <div className=''>
            <BlackHeader />
            <div className='px-[10vw] flex justify-center flex-col text-center mt-5 gap-y-[3vh] '>
                <div className='font-eastman_regular text-[7vw] sm:text-[5vw] md:text-[4vw] lg:text-[3.5vw] xl:text-[2vw]'>{service_name === 'beauty' ? 'Красота и здоровье' : service_name === 'cleaning' ? 'Клининг' : service_name === 'tutoring' ? 'Репетиторство' : service_name === 'building' ? 'Строительство' : service_name === 'med_service' ? 'Медицинские услуги' : ''}</div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5 '>
                    <Link to={`/${service_name}/all`} className="relative w-full max-w-[320px] h-[250px] shadow-card bg-[#1D217C] cursor-pointer">
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

                    {serviceListData.map((data) =>
                        <ServicesCard name={data.name} description={data.description} photo={data.photo} />
                    )}
                </div>
            </div>

            <div className='px-[10vw] flex flex-col text-center mt-[5vh] gap-y-[1vh] pb-5 '>
                <div className='font-eastman_regular text-[7vw] sm:text-[5vw] md:text-[4vw] lg:text-[3.5vw] xl:text-[2vw] 2xl:text-[2.5vw]'>
                    Новые заявки
                </div>
                <div className='xl:grid xl:grid-cols-2 gap-3 '>
                    
                    {serviceData.map((request)=>
                    <RequestCard data={request} service_name={service_name} />
                    )}
                </div>
                {serviceData.length === 0 ? (
                    <div className='text-center text-[1.5vw] font-eastman_regular'>Заявок нет</div>
                ) : null}

            </div>
            <Footer/>
        </div>
    )
}

export default Services