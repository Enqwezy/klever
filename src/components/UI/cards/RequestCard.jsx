import React from 'react'


function RequestCard({ data }) {
    return (    
        <div className='bg-[#f8f8f8] font-eastman_regular flex flex-col gap-3 shadow-card rounded-[15px] mt-5 cursor-pointer md:flex-row-reverse md:min-h-[30vh] 2xl:max-h-[25vh] 2xl:pl-5 relative pb-3 md:pb-0 2xl:justify-between'>
            <div>
                <img src={data.photo} alt="" className='rounded-t-[15px] object-cover md:rounded-r-[15px] md:h-full md:w-[100vw] lg:max-w-[30vw] 2xl:max-w-[20vw]' />
            </div>
            <div className='md:p-3 md:text-left 2xl:justify-start'>

                <div className='font-eastman_medium text-[6vw] sm:text-[5vw] md:text-[4vw] lg:text-[2.3vw] 2xl:text-[1.5vw]'>
                    {data.name}
                </div>
                <div className='font-eastman_medium sm:text-[3vw] md:text-[2.5vw] lg:text-[1.9vw] 2xl:text-[1.1vw]'>
                    от {data.price}Тг
                </div>
                <div className='text-[3.5vw] md:text-[2vw] lg:text-[1.7vw] lg:mt-2 2xl:text-[0.9vw]'>
                    {data.description}
                </div>
                <div className='sm:text-[3vw] md:text-[2.3vw] md:mt-3 lg:text-[1.7vw] 2xl:text-[1.2vw] 2xl:mt-3'>
                    {data.address}
                </div>
                <div className='md:flex md:flex-row gap-x-5 2xl:mt-3'>

                    <div className='text-[5.5vw] md:text-[3vw] lg:text-[2vw] 2xl:text-[1.2vw]'>
                        {data.reviews} отзывов
                    </div>
                    <div className='flex flex-row justify-center sm:text-[3vw] items-center lg:text-[2vw] 2xl:text-[1.2vw]'>
                        {data.rate}<svg className='md:size-[30px] size-[20px]' viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.7137 7.04257L13.7181 6.1301L11.0379 0.440169C10.9647 0.284382 10.8442 0.158269 10.6955 0.0816118C10.3224 -0.111267 9.86898 0.0494654 9.68243 0.440169L7.00223 6.1301L1.00662 7.04257C0.841325 7.0673 0.690195 7.1489 0.574486 7.27254C0.434601 7.4231 0.357517 7.62566 0.360174 7.8357C0.362831 8.04575 0.44501 8.24609 0.588655 8.39272L4.92656 12.8215L3.90171 19.0753C3.87768 19.2207 3.89305 19.3703 3.94608 19.5071C3.99912 19.6439 4.0877 19.7624 4.20177 19.8492C4.31584 19.9359 4.45085 19.9875 4.59147 19.998C4.7321 20.0085 4.87273 19.9775 4.9974 19.9086L10.3602 16.9561L15.7229 19.9086C15.8693 19.9902 16.0393 20.0174 16.2023 19.9877C16.6132 19.9135 16.8894 19.5055 16.8186 19.0753L15.7938 12.8215L20.1317 8.39272C20.2497 8.27156 20.3277 8.1133 20.3513 7.9402C20.415 7.50746 20.1269 7.10686 19.7137 7.04257Z" fill="#FFC700" />
                        </svg>

                    </div>
                </div>
                <div className='sm:text-[3vw] md:text-[2vw] md:flex md:justify-end md:mt-2 2xl:text-[1.1vw] lg:text-[1.7vw]'>
                    Опубликовано {data.created_at}
                </div>
            </div>
        </div>
    )
}

export default RequestCard