import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchUserProfile,
    fetchUserFavorites,
} from '../../store/actions/profileAction';

const Profile = () => {
    const dispatch = useDispatch();
    const { user, favorites, loading, error } = useSelector((state) => state.user);

    

    useEffect(() => {
        const navigate = (path) => {
            window.location.href = path;
        };
        const token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/login');
            return;
        }
        if (!user) {
            dispatch(fetchUserProfile(token));
        }
        if (!favorites.length) {
            dispatch(fetchUserFavorites(token));
        }
    }, []);


    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#76C6FF]">
                <div className="text-white text-[20px] font-eastman_regular animate-pulse">
                    Загрузка...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#76C6FF]">
                <div className="text-red-600 text-[20px] font-eastman_regular">
                    Ошибка: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#76C6FF] flex justify-center items-center p-4">
            <div className="w-full max-w-[90vw] sm:max-w-[70vw] md:max-w-[50vw] lg:max-w-[40vw] xl:max-w-[600px] bg-white rounded-[30px] p-6 sm:p-8 xl:p-10 shadow-container flex flex-col gap-6">
                {/* Заголовок */}
                <h1 className="font-eastman_medium text-[25px] sm:text-[30px] xl:text-[35px] text-[#0A0A0A] text-center">
                    Ваш профиль
                </h1>

                {/* Информация о пользователе */}
                {user ? (
                    <div className="flex flex-col gap-4 font-eastman_regular text-[16px] sm:text-[18px] xl:text-[20px] text-[#0A0A0A]">
                        <p>
                            <span className="font-bold">Имя:</span> {user.name || 'Не указано'}
                        </p>
                        <p>
                            <span className="font-bold">Email:</span> {user.email || 'Не указано'}
                        </p>
                        <p>
                            <span className="font-bold">Телефон:</span> {user.phone || 'Не указано'}
                        </p>
                        <p>
                            <span className="font-bold">Адрес:</span> {user.address || 'Не указано'}
                        </p>
                    </div>
                ) : (
                    <p className="text-[#0A0A0A] font-eastman_regular text-center">
                        Данные пользователя недоступны
                    </p>
                )}

                {/* Избранное */}
                <div className="flex flex-col gap-4">
                    <h2 className="font-eastman_medium text-[20px] sm:text-[24px] text-[#0A0A0A]">
                        Избранное
                    </h2>
                    {favorites.length > 0 ? (
                        <ul className="flex flex-col gap-2 font-eastman_regular text-[16px] sm:text-[18px] text-[#0A0A0A]">
                            {favorites.map((item) => (
                                <li key={item.id} className="border-b border-[#6A6A6A] pb-2">
                                    {item.title || 'Элемент избранного'}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-[#0A0A0A] font-eastman_regular">
                            У вас пока нет избранных элементов
                        </p>
                    )}
                </div>

                {/* Кнопки действий */}
                <div className="flex flex-col gap-4 items-center">
                    <Link to="/edit-profile">
                        <button className="bg-[#6A6A6A] text-white rounded-[12px] w-[150px] h-[35px] font-eastman_regular text-[16px] hover:bg-[#7A7A7A] hover:shadow-md transition-all duration-200">
                            Редактировать профиль
                        </button>
                    </Link>
                    <Link to="/">
                        <button className="bg-[#7583CA] text-white rounded-[12px] w-[150px] h-[35px] font-eastman_regular text-[16px] hover:bg-[#8593DA] hover:shadow-md transition-all duration-200">
                            На главную
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;