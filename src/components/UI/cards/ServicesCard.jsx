import React from 'react';

function ServicesCard({ photo, name, description, isHome=false }) {
    let pathPhoto = photo
    if (isHome){
        pathPhoto = photo
    }
    else {
        pathPhoto = 'http://localhost:8000/' + photo
    }

    return (
        <div>
            <div className="relative w-full max-w-[320px] h-[250px] shadow-card cursor-pointer">
                <img
                    src={pathPhoto}
                    alt="Service"
                    className="z-10 w-full max-w-[320px] h-[250px] object-cover"
                />
                <div className="absolute bottom-0 w-full z-20">
                    <svg
                        className="w-full h-[80px]"
                        viewBox="0 0 360 111"
                        preserveAspectRatio="none"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M360 38.9927V127.798H0V30.2454L2.1394 24.6456C8.0526 9.16822 26.1787 -1.75143 42.6252 0.255921L360 38.9927Z"
                            fill="white"
                        />
                    </svg>
                    <div className="absolute top-7 left-3 w-full h-full flex flex-col justify-start items-start text-[#141414] font-eastman_regular z-30">
                        <div className="text-[15px]">{name}</div>
                        <div className="text-[8px]">{description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServicesCard;