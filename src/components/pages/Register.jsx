import React, { useState } from 'react';
import logo from '../../assets/img/logo.png';
import RegularInputs from '../UI/input/RegularInputs';
import { useDispatch } from 'react-redux';
import { register } from '../../store/actions/authAction';
import { Link, useNavigate } from 'react-router-dom'; // Добавляем useNavigate

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Хук для перенаправления

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Предполагаем, что register возвращает промис
            await dispatch(register(formData));
            // Если регистрация успешна, перенаправляем на главную страницу
            navigate('/');
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            // Здесь можно добавить обработку ошибки, например, показать уведомление
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#76C6FF] flex flex-col-reverse md:flex-row-reverse justify-center items-center gap-4 md:gap-8 lg:gap-[5vw] p-4">
            <div className="hidden md:block">
                <img
                    src={logo}
                    alt="Logo"
                    className="max-w-[50vw] sm:max-w-[40vw] md:max-w-[30vw] lg:max-w-[20vw] xl:max-w-[19vw] 2xl:max-w-[20vw]"
                />
            </div>

            <form
                onSubmit={handleRegister}
                className="w-full max-w-[90vw] sm:max-w-[70vw] md:max-w-[50vw] lg:max-w-[40vw] xl:max-w-[400px] 2xl:max-w-[450px]"
            >
                <div className="rounded-[20px] sm:rounded-[30px] xl:rounded-[40px] min-h-[60vh] sm:min-h-[70vh] xl:min-h-[80vh] bg-white p-4 sm:p-6 xl:p-[25px] flex justify-center flex-col shadow-container gap-4 sm:gap-5 xl:gap-6">
                    <div className="font-eastman_medium text-[20px] sm:text-[25px] xl:text-[30px] text-[#0A0A0A] text-center leading-tight sm:leading-8">
                        Create an account
                    </div>

                    <div className="flex flex-col gap-y-4 sm:gap-y-5 xl:gap-y-[20px] font-eastman_regular">
                        <RegularInputs
                            name="name"
                            placeholder="Your name"
                            type="text"
                            borderColor="border-[#6A6A6A]"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <RegularInputs
                            name="phone"
                            placeholder="Your phone"
                            type="tel"
                            borderColor="border-[#6A6A6A]"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        <RegularInputs
                            name="email"
                            placeholder="Your email"
                            type="email"
                            borderColor="border-[#6A6A6A]"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <RegularInputs
                            name="password"
                            placeholder="Your password"
                            type="password"
                            borderColor="border-[#6A6A6A]"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <RegularInputs
                            name="address"
                            placeholder="Your address"
                            type="text"
                            borderColor="border-[#6A6A6A]"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col gap-3 sm:gap-4 xl:gap-[15px] text-[13px] sm:text-[14px] xl:text-[17px] 2xl:text-[20px]">
                        <div className="flex justify-center items-center mt-4 sm:mt-6 xl:mt-[30px]">
                            <button
                                type="submit"
                                className="bg-[#6A6A6A] rounded-[12px] w-[90px] sm:w-[100px] xl:w-[120px] p-2 flex justify-center items-center h-[28px] sm:h-[31px] xl:h-[35px] text-white font-light hover:bg-[#7A7A7A] hover:shadow-md transition-all duration-200"
                            >
                                Register
                            </button>
                        </div>

                        {/* Social Buttons */}
                        <div className="flex justify-center items-center">
                            <button
                                type="button"
                                className="flex flex-row gap-x-4 sm:gap-x-6 xl:gap-x-[30px] pl-2 sm:pl-3 bg-[#7583CA] rounded-[12px] sm:rounded-[15px] p-1 sm:p-2 w-[180px] sm:w-[200px] xl:w-[240px] 2xl:w-[270px] h-[28px] sm:h-[32px] xl:h-[35px] items-center font-thin text-[#FFFFFFBF] hover:bg-[#8593DA] hover:shadow-lg transition-all duration-200"
                            >
                                <svg
                                    width="12"
                                    height="18"
                                    viewBox="0 0 13 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="shrink-0"
                                >
                                    <path
                                        d="M8.08794 24V13.0703H11.7752L12.3233 8.79094H8.08794V6.06518C8.08794 4.83032 8.43199 3.98485 10.2043 3.98485H12.45V0.169586C11.3573 0.0524886 10.259 -0.00405133 9.16011 0.00022559C5.90093 0.00022559 3.66324 1.98987 3.66324 5.64245V8.78294H0V13.0623H3.67124V24H8.08794Z"
                                        fill="white"
                                        fillOpacity="0.75"
                                    />
                                </svg>
                                Continue with Facebook
                            </button>
                        </div>

                        <div className="flex justify-center items-center">
                            <button
                                type="button"
                                className="flex flex-row gap-x-4 sm:gap-x-6 xl:gap-x-[30px] pl-2 border-[1px] border-[#232323BF] rounded-[12px] sm:rounded-[15px] p-1 sm:p-2 w-[180px] sm:w-[200px] xl:w-[220px] 2xl:w-[250px] h-[28px] sm:h-[32px] xl:h-[35px] items-center font-thin text-[#232323BF] hover:border-[#232323] hover:shadow-md hover:bg-gray-50 transition-all duration-200"
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="shrink-0"
                                >
                                    <path
                                        d="M23.7224 10.045H12.2783V14.7879H18.8641C18.2512 17.8018 15.6853 19.5334 12.2783 19.5334C11.325 19.5351 10.3807 19.3485 9.49968 18.9843C8.61863 18.6202 7.81812 18.0858 7.14408 17.4116C6.47004 16.7374 5.93573 15.9368 5.57178 15.0557C5.20784 14.1746 5.02143 13.2303 5.02324 12.277C5.02161 11.3237 5.20815 10.3796 5.57218 9.49862C5.9362 8.61766 6.47055 7.81721 7.14457 7.14319C7.81859 6.46917 8.61903 5.93483 9.5 5.5708C10.381 5.20678 11.3251 5.02023 12.2783 5.02186C14.0086 5.02186 15.5726 5.63618 16.7999 6.64082L20.3731 3.06893C18.1962 1.17098 15.4049 5.23044e-05 12.2783 5.23044e-05C10.6646 -0.00466464 9.06586 0.309703 7.57406 0.925073C6.08226 1.54044 4.72684 2.44467 3.58576 3.58576C2.44468 4.72684 1.54045 6.08226 0.925077 7.57406C0.309707 9.06586 -0.00466053 10.6646 5.64179e-05 12.2783C-0.00484293 13.8921 0.3094 15.4909 0.924705 16.9828C1.54001 18.4747 2.44423 19.8302 3.58535 20.9713C4.72647 22.1124 6.08197 23.0166 7.57385 23.632C9.06573 24.2473 10.6645 24.5615 12.2783 24.5566C18.4175 24.5566 24 20.0914 24 12.2783C24 11.5527 23.8887 10.7707 23.7224 10.045Z"
                                        fill="#232323"
                                        fillOpacity="0.75"
                                    />
                                </svg>
                                Continue with Google
                            </button>
                        </div>

                        <div className="flex justify-center items-center mt-3 sm:mt-4 xl:mt-[15px] text-[12px] sm:text-[14px] xl:text-[17px]">
                            <p className="text-[#0A0A0A] font-eastman_regular">
                                Do you have an account?{' '}
                                <Link to="/login" className="text-blue-600 hover:underline">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;