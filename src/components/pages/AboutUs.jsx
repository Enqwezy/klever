import React from 'react';
import { motion } from 'framer-motion'; // Импортируем framer-motion
import BlackHeader from '../main/BlackHeader';
import Footer from '../main/Footer';
import bgAbout from '../../assets/img/bg-about.jpg';
import ab from '../../assets/img/fffff.avif';
import ava from '../../assets/img/ava-develop.png';

function AboutUs() {
    // Варианты анимации
    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    return (
        <div>
            <BlackHeader />
            <div className="flex justify-center flex-col items-center">
                <div className="mt-[5vh] relative">
                    <img
                        src={bgAbout}
                        alt=""
                        className="min-w-[100vw] blur-sm object-cover 2xl:h-[80vh] md:h-[60vh] lg:h-[70vh]"
                    />
                    <div className="absolute top-1/2 -translate-y-1/2 left-[25vw] text-[25px] md:text-[40px] 2xl:left-[20vw]  font-eastman_medium 2xl:text-[40px] text-white">
                        О нас
                    </div>
                </div>

                {/* Секция "Klever это..." с анимацией */}
                <motion.div
                    className="w-[80vw] my-[5vh] 2xl:my-[20vh] flex justify-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }} // Анимация срабатывает один раз, когда 30% элемента видно
                    variants={fadeInUp}
                >
                    <div className="flex flex-col-reverse sm:flex-row items-center md:gap-5 2xl:gap-10">
                        <div className="max-w-[80vw] sm:max-w-[90vw] text-center 2xl:max-w-[40vw]">
                            <div className="text-center md:text-[35px] 2xl:text-[50px] text-[25px] font-eastman_medium">
                                Klever это...
                            </div>
                            <div className="2xl:text-[20px] text-gray-800 2xl:mt-4 mt-2 leading-relaxed md:text-left md:text-[15px] lg:text-[17px] xl:text-[19px]">
                                Наша компания — это команда профессионалов, создающих инновационные решения для вашего бизнеса. Мы стремимся к совершенству, предлагая современные технологии и индивидуальный подход к каждому клиенту. С нами вы получаете не просто продукт, а надёжного партнёра, готового поддерживать ваш рост и успех на каждом этапе. Наша миссия — сделать сложное простым, а невозможное — реальным.
                            </div>
                        </div>
                        <div>
                            <img
                                src={ab}
                                alt=""
                                className="2xl:w-[400px] 2xl:h-[400px] w-[200px] h-[200px] sm:min-w-[200px] sm:min-h-[220px] lg:min-w-[300px] lg:min-h-[300px] object-cover rounded-lg md:shadow-md"
                            />
                        </div>
                    </div>
                </motion.div>

               
            </div>
            <Footer />
        </div>
    );
}

export default AboutUs;