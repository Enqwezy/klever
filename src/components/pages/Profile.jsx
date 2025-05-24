import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserProfile,
  fetchUserFavorites,
  updateProfile,
} from '../../store/actions/profileAction';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, favorites, loading, error } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    address: '',
  });
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    if (!user && !loading) {
      dispatch(fetchUserProfile(token));
    }

    if (favorites.length === 0 && !loading) {
      dispatch(fetchUserFavorites(token));
    }
  }, [dispatch ]);

  useEffect(() => {
    // Предзаполнение формы данными пользователя
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setUpdateError(null); // Сбрасываем ошибку при переключении
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      await dispatch(updateProfile({ token, data: formData })).unwrap();
      setIsEditing(false); // Возвращаемся к режиму просмотра
      setUpdateError(null);
    } catch (error) {
      setUpdateError(error.message || 'Ошибка обновления профиля');
    }
  };

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

        {/* Ошибка обновления */}
        {updateError && (
          <div className="text-red-600 text-[16px] font-eastman_regular text-center">
            Ошибка: {updateError}
          </div>
        )}

        {/* Информация о пользователе или форма редактирования */}
        {user ? (
          isEditing ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-eastman_regular text-[16px] sm:text-[18px]">
              <div className="flex flex-col gap-2">
                <label htmlFor="username" className="text-[#0A0A0A] font-bold">
                  Имя
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="border border-[#6A6A6A] rounded-[8px] p-2 text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#7583CA]"
                  placeholder="Введите имя"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[#0A0A0A] font-bold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-[#6A6A6A] rounded-[8px] p-2 text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#7583CA]"
                  placeholder="Введите email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone_number" className="text-[#0A0A0A] font-bold">
                  Телефон
                </label>
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="border border-[#6A6A6A] rounded-[8px] p-2 text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#7583CA]"
                  placeholder="Введите номер телефона"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="address" className="text-[#0A0A0A] font-bold">
                  Адрес
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border border-[#6A6A6A] rounded-[8px] p-2 text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#7583CA]"
                  placeholder="Введите адрес"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#7583CA] text-white rounded-[12px] w-[150px] h-[35px] font-eastman_regular text-[16px] hover:bg-[#8593DA] hover:shadow-md transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? 'Сохранение...' : 'Сохранить'}
                </button>
                <button
                  type="button"
                  onClick={handleEditToggle}
                  className="bg-[#6A6A6A] text-white rounded-[12px] w-[150px] h-[35px] font-eastman_regular text-[16px] hover:bg-[#7A7A7A] hover:shadow-md transition-all duration-200"
                >
                  Отмена
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-4 font-eastman_regular text-[16px] sm:text-[18px] xl:text-[20px] text-[#0A0A0A]">
              <p>
                <span className="font-bold">Имя:</span> {user.username || 'Не указано'}
              </p>
              <p>
                <span className="font-bold">Email:</span> {user.email || 'Не указано'}
              </p>
              <p>
                <span className="font-bold">Телефон:</span> {user.phone_number || 'Не указано'}
              </p>
              <p>
                <span className="font-bold">Адрес:</span> {user.address || 'Не указано'}
              </p>
            </div>
          )
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
                  <Link to={`/services/${item.id}`} className="hover:underline">
                    {item.title || 'Элемент избранного'}
                  </Link>
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
          {!isEditing && (
            <button
              onClick={handleEditToggle}
              className="bg-[#6A6A6A] text-white rounded-[12px] w-[150px] h-[35px] font-eastman_regular text-[16px] hover:bg-[#7A7A7A] hover:shadow-md transition-all duration-200"
            >
              Редактировать профиль
            </button>
          )}
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