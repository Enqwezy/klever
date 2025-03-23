import React from 'react'
import BlackHeader from '../main/BlackHeader'
import Footer from '../main/Footer'
import bgAbout from '../../assets/img/bg-about.jpg'
import ab from '../../assets/img/fffff.avif'

function AboutUs() {
    return (
        <div>
            <BlackHeader />
            <div className='flex justify-center flex-col items-center '>
                <div className='mt-[5vh] relative'>
                    <img src={bgAbout} alt="" className='min-w-[100vw] blur-sm object-cover 2xl:h-[80vh]' />
                    <div className='absolute top-1/2 2xl:left-[20vw] font-eastman_medium 2xl:text-[40px]'>О нас </div>
                </div>
                <div className='w-[80vw] 2xl:my-[20vh] flex justify-center '>
                    <div className='  flex flex-row items-center'>
                        <div className='max-w-[40vw]'>
                            <div className='text-center 2xl:text-[50px] font-eastman_medium'>Klever это...</div>
                            <div className='2xl:text-[20px]'>Наша компания — это команда профессионалов, создающих инновационные решения для вашего бизнеса. Мы стремимся к совершенству, предлагая современные технологии и индивидуальный подход к каждому клиенту.</div>
                        </div>
                        <div>
                            <img src={ab} alt="" className='2xl:w-[400px] 2xl:h-[400px] object-cover ' />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AboutUs