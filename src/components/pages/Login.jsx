import React, { useState } from 'react';
import logo from '../../assets/img/logo.png';
import RegularInputs from '../UI/input/RegularInputs';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/authAction';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            result = await dispatch(login(formData));
            if (login.fulfilled.match(result)) {
                console.log('Успешный вход:', result.payload);
                navigate('/');
            } else {
                console.error('Ошибка входа:', result.payload || result.error);
            }
        } catch (error) {
            console.error('Ошибка авторизации:', error);
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#76C6FF] flex xl:flex-row flex-col justify-center items-center gap-[1vw] lg:gap-y-[1vh]">
            <div className="md:absolute top-9 2xl:left-9 md:left-[8vw] lg:left-9">
                <Link
                    to={'/'}
                    className="flex flex-row bg-white text-black gap-3 xl:text-[15px] 2xl:text-[20px] rounded-xl p-2 font-eastman_regular justify-center items-center"
                >
                    <div className="">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="xl:min-w-[23px] xl:min-h-[23px] 2xl:min-w-[30px] 2xl:min-h-[30px]"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                            />
                        </svg>
                    </div>
                    <div>На главную</div>
                </Link>
            </div>
            <div className="">
                <img
                    src={logo}
                    alt=""
                    className="2xl:max-w-[20vw] max-w-[50vw] md:max-w-[30vw] lg:max-w-[20vw]"
                />
            </div>
            <form
                onSubmit={handleLogin}
                className="rounded-[40px] 2xl:min-h-[40vh] min-h-[50vh] sm:w-[50vw] 2xl:w-[550px] w-[300px] md:w-[400px] bg-white p-[25px] px-[10vw] sm:px-[50px] flex justify-center flex-col shadow-container"
            >
                <div className="font-eastman_medium text-[25px] 2xl:text-[32px] 2xl:mx-5 text-[#0A0A0A] text-center leading-8">
                    Log in
                </div>
                <div className="flex flex-row justify-center gap-x-[3vw] my-[30px]">
                    <div className="flex justify-center items-center">
                        <button
                            type="button"
                            className="flex flex-row gap-x-[30px] bg-[#7583CA] rounded-[15px] p-2 min-w-[7vw] text-[14px] justify-center items-center font-thin text-[#FFFFFFBF] hover:bg-[#8593DA] hover:shadow-lg transition-all duration-200"
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
                            type="button"
                            className="flex flex-row gap-x-[30px] pl-2 border-[1px] border-[#232323BF] rounded-[15px] p-2 min-w-[7vw] h-[32px] text-[14px] items-center justify-center font-thin text-[#232323BF] hover:border-[#232323] hover:shadow-md hover:bg-gray-50 transition-all duration-200"
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
                <div className="flex flex-col gap-y-[20px]">
                    <div className="font-eastman_regular">
                        <RegularInputs
                            name="email"
                            placeholder="Enter email"
                            type="email"
                            borderColor="border-[#6A6A6A]"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="font-eastman_regular">
                        <RegularInputs
                            name="password"
                            placeholder="Enter password"
                            type="password"
                            borderColor="border-[#6A6A6A]"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-[15px]">
                    <div className="flex justify-center items-center mt-[30px]">
                        <button
                            type="submit"
                            className="bg-[#6A6A6A] rounded-[12px] w-[100px] p-2 flex justify-center items-center h-[31px] 2xl:h-[35px] text-white text-[15px] font-light hover:bg-[#7A7A7A] hover:shadow-md transition-all duration-200 2xl:text-[20px]"
                        >
                            Log in
                        </button>
                    </div>

                    <div className="flex justify-center items-center mt-[15px]">
                        <p className="text-[#0A0A0A] text-[12px] 2xl:text-[15px] font-eastman_regular">
                            <Link to="/register" className="text-[#FF0000] hover:underline">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;