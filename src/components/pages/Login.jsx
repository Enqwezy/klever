import React from 'react'
import logo from '../../assets/img/logo.png'
import RegularInputs from '../UI/input/RegularInputs'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <div className='w-full min-h-screen bg-[#76C6FF] flex flex-row justify-center items-center gap-[5vw] '>
            <div className='max-w-[50vh]'>
                <img src={logo} alt="" />
            </div>
            <div className=''>
                <div className='rounded-[40px] min-h-[70vh] w-[30vw] bg-white p-[25px] px-[50px] flex justify-center flex-col  shadow-container '>
                    <div className='font-eastman_medium text-[25px] px-[5vw] text-[#0A0A0A] text-center leading-8'>
                        Log in
                    </div>
                    <div className='flex flex-row justify-center gap-x-[3vw] my-[10px]'>
                        <div className="flex justify-center items-center">
                            <button
                                className="flex flex-row gap-x-[30px]   bg-[#7583CA] rounded-[15px] p-2 min-w-[7vw] text-[14px] justify-center items-center font-thin text-[#FFFFFFBF] hover:bg-[#8593DA] hover:shadow-lg transition-all duration-200"
                            >
                                <svg
                                    width="13"
                                    height="18"
                                    viewBox="0 0 13 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.08794 24V13.0703H11.7752L12.3233 8.79094H8.08794V6.06518C8.08794 4.83032 8.43199 3.98485 10.2043 3.98485H12.45V0.169586C11.3573 0.0524886 10.259 -0.00405133 9.16011 0.00022559C5.90093 0.00022559 3.66324 1.98987 3.66324 5.64245V8.78294H0V13.0623H3.67124V24H8.08794Z"
                                        fill="white"
                                        fillOpacity="0.75"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center items-center">
                            <button
                                className="flex flex-row gap-x-[30px] pl-2 border-[1px] border-[#232323BF] rounded-[15px] p-2 min-w-[7vw]  h-[32px] text-[14px] items-center justify-center font-thin text-[#232323BF] hover:border-[#232323] hover:shadow-md hover:bg-gray-50 transition-all duration-200"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M23.7224 10.045H12.2783V14.7879H18.8641C18.2512 17.8018 15.6853 19.5334 12.2783 19.5334C11.325 19.5351 10.3807 19.3485 9.49968 18.9843C8.61863 18.6202 7.81812 18.0858 7.14408 17.4116C6.47004 16.7374 5.93573 15.9368 5.57178 15.0557C5.20784 14.1746 5.02143 13.2303 5.02324 12.277C5.02161 11.3237 5.20815 10.3796 5.57218 9.49862C5.9362 8.61766 6.47055 7.81721 7.14457 7.14319C7.81859 6.46917 8.61903 5.93483 9.5 5.5708C10.381 5.20678 11.3251 5.02023 12.2783 5.02186C14.0086 5.02186 15.5726 5.63618 16.7999 6.64082L20.3731 3.06893C18.1962 1.17098 15.4049 5.23044e-05 12.2783 5.23044e-05C10.6646 -0.00466464 9.06586 0.309703 7.57406 0.925073C6.08226 1.54044 4.72684 2.44467 3.58576 3.58576C2.44468 4.72684 1.54045 6.08226 0.925077 7.57406C0.309707 9.06586 -0.00466053 10.6646 5.64179e-05 12.2783C-0.00484293 13.8921 0.3094 15.4909 0.924705 16.9828C1.54001 18.4747 2.44423 19.8302 3.58535 20.9713C4.72647 22.1124 6.08197 23.0166 7.57385 23.632C9.06573 24.2473 10.6645 24.5615 12.2783 24.5566C18.4175 24.5566 24 20.0914 24 12.2783C24 11.5527 23.8887 10.7707 23.7224 10.045Z"
                                        fill="#232323"
                                        fillOpacity="0.75"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-[20px]'>
                        <div className='font-eastman_regular'>
                            <RegularInputs name={'e-mail'} placeholder={'Enter message'} type='email' borderColor={'border-[#6A6A6A]'} />
                        </div>
                        <div className='font-eastman_regular'>
                            <RegularInputs name={'Password'} placeholder={'Enter message'} type='password' borderColor={'border-[#6A6A6A]'} />
                        </div>

                    </div>

                    <div className="flex flex-col gap-[15px]">
                        <div className="flex justify-center items-center mt-[30px]">
                            <button
                                className="bg-[#6A6A6A] rounded-[12px] w-[100px] p-2 flex justify-center items-center h-[31px] text-white text-[15px] font-light hover:bg-[#7A7A7A] hover:shadow-md transition-all duration-200"
                            >
                                Log in
                            </button>
                        </div>

                        <div className="flex justify-center items-center mt-[15px]">
                            <p className="text-[#0A0A0A] text-[12px] font-eastman_regular">
                                <Link to="/register" className="text-[#FF0000] hover:underline">
                                    Create an account
                                </Link>
                            </p>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default Login