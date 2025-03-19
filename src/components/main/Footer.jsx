import React from 'react'
import logoMiniBlack from '../../assets/img/logo-mini-black.png'


function Footer() {
    return (
        <div className='bg-[#F4F4F4] w-full min-h-[25vw] p-[30px] lg:px-[50px] md:px-[35px] px-[70px] xl:px-[100px] xl:p-[50px] '>
            <div className='flex flex-col gap-7 md:gap-14 md:flex-row '>
                <div className='flex flex-col gap-y-3'>
                    <div>
                        <img src={logoMiniBlack} alt="" className='w-[30vw] md:w-[20vw] lg:w-[16vw] xl:w-[10vw] ' />
                    </div>
                    <div className='font-eastman_medium'>klever.kz@gmail.com</div>
                    <div className='font-eastman_medium'>+7(700) 707-7000</div>
                </div>
                <div className='grid grid-cols-1 gap-y-7 gap-0  sm:gap-y-7 md:grid-cols-2 lg:grid-cols-3'>

                <div className='font-eastman_regular flex flex-col gap-2 text-[17px] ml-0 xl:ml-[5vw]'>
                    <div>О нас</div>
                    <div>Блог</div>
                    <div>Безопасность</div>
                    <div>Контакты</div>
                </div>
                <div className='font-eastman_regular flex flex-col gap-2 text-[17px]'>
                    <div>Вакансии</div>
                    <div>Услуги</div>
                    <div>Курьеры</div>
                    <div>Трекинг</div>
                </div>
                <div className='font-eastman_medium flex flex-col gap-2 text-[17px]' >
                    <div>Политика конфиденциальности</div>
                    <div>Положения и условия</div>
                    <div>Подпишитесь на рассылку новостей</div>
                    <div className='flex flex-row gap-0 items-center '>
                        <div>
                            <input type="text" className='rounded-l-[10px] h-[6vh] w-[50vw] placeholder:font-eastman_regular pl-3 md:h-[5vh] md:w-[170px]' placeholder='e-mail' />
                        </div>
                        <div className='bg-[#FF0000] h-[6vh] flex items-center px-4 rounded-r-[10px] cursor-pointer md:h-[5vh]'>
                            <svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.65923 19.9999C1.87269 20.0006 2.0836 19.9535 2.27646 19.8621C2.46932 19.7706 2.63924 19.6371 2.77372 19.4714L9.67496 10.9008C9.88511 10.6452 10 10.3246 10 9.9937C10 9.66284 9.88511 9.34224 9.67496 9.08665L2.53082 0.516026C2.28829 0.224316 1.93978 0.0408693 1.56196 0.00604443C1.18414 -0.0287805 0.807958 0.0878684 0.516167 0.330329C0.224376 0.57279 0.0408802 0.921202 0.00604534 1.29892C-0.0287886 1.67663 0.0878916 2.05271 0.330419 2.34442L6.71728 10.0008L0.544744 17.6573C0.370022 17.8669 0.259035 18.1223 0.224916 18.393C0.190796 18.6638 0.23497 18.9386 0.352214 19.1851C0.469458 19.4315 0.654862 19.6392 0.886491 19.7836C1.11812 19.928 1.38628 20.0031 1.65923 19.9999Z" fill="white" />
                            </svg>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Footer