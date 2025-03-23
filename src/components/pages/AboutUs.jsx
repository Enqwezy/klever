import React from 'react'
import BlackHeader from '../main/BlackHeader'
import Footer from '../main/Footer'
import bgAbout from '../../assets/img/bg-about.jpg'
import ab from '../../assets/img/fffff.avif'
import ava from '../../assets/img/ava-develop.png'

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
                <div className='flex justify-center w-[60vw] 2xl:my-[10vh] flex-col'>
                    <div className='font-eastman_medium 2xl:text-[40px] text-center'>
                        Разработчики
                    </div>
                    <div className='2xl:mt-[5vw] flex flex-col gap-5'>
                        <div className='flex flex-row justify-center items-center gap-5'>
                            <div>
                                <img src={ava} alt="" className='rounded-xl 2xl:min-w-[200px] 2xl:min-h-[200px] 2xl:max-w-[250px] 2xl:max-h-[250px]' />
                            </div>
                            <div className='flex flex-col font-eastman_regular gap-y-5 2xl:text-[20px]'>
                                <div>Айжас</div>
                                <div className=''>Что нибудь об Айжасе, что он молодец решил все это сделать. Красавчик вообщем</div>
                            </div>
                        </div>
                        <div className='flex flex-row justify-center items-center gap-5'>
                            <div>
                                <img src={ava} alt="" className='rounded-xl 2xl:min-w-[200px] 2xl:min-h-[200px] 2xl:max-w-[250px] 2xl:max-h-[250px]' />
                            </div>
                            <div className='flex flex-col font-eastman_regular gap-y-5 2xl:text-[20px]'>
                                <div>Айжас</div>
                                <div className=''>Что нибудь об Айжасе, что он молодец решил все это сделать. Красавчик вообщем</div>
                            </div>
                        </div>
                        <div className='flex flex-row justify-center items-center gap-5'>
                            <div>
                                <img src={ava} alt="" className='rounded-xl 2xl:min-w-[200px] 2xl:min-h-[200px] 2xl:max-w-[250px] 2xl:max-h-[250px]' />
                            </div>
                            <div className='flex flex-col font-eastman_regular gap-y-5 2xl:text-[20px]'>
                                <div>Айжас</div>
                                <div className=''>Что нибудь об Айжасе, что он молодец решил все это сделать. Красавчик вообщем</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AboutUs