import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../store/services/api'; // Предполагаемый клиент API

function RequestCard({ data, service_name }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState(null);

  // Проверка, есть ли услуга в избранном
  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await API.get('/v1/favourites', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const favoriteIds = response.data.map((fav) => fav.service.id);
        setIsFavorite(favoriteIds.includes(data.id));
      } catch (err) {
        console.error('Error checking favorite:', err);
      }
    };
    checkFavorite();
  }, [data.id]);

  // Добавление/удаление из избранного
  const handleToggleFavorite = async () => {
    try {
      setError(null);
      if (isFavorite) {
        const token = localStorage.getItem('access_token');
        await API.delete(`/v1/favourites/${ data.id }`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsFavorite(false);
      } else {
        const token = localStorage.getItem('access_token');
        await API.post('/v1/add-favourites', { service_id: data.id }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsFavorite(true);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
      setError('Ошибка при изменении избранного. Попробуйте снова.');
    }
  };

  return (
    <div className="bg-white p-4 rounded-[12px] shadow-container flex flex-col sm:flex-row gap-4">
      {data.photo && (
        <img
          src={data.photo}
          alt={data.name}
          className="w-full sm:w-32 h-32 object-cover rounded-[8px]"
        />
      )}
      <div className="flex-1">
        <Link to={`/${ service_name }/${data.id}`}>
    <h3 className="font-eastman_medium text-[16px] sm:text-[18px] text-[#0A0A0A] hover:text-blue-600">
        {data.name}
    </h3>
        </Link >
        <p className="text-[14px] sm:text-[16px] text-gray-600 mt-1">
          {data.description}
        </p>
        <p className="text-[14px] sm:text-[16px] text-gray-600 mt-1">
          {data.city.name} • от {data.price.split('.')[0]} ₸
        </p>
        <p className="text-[14px] sm:text-[16px] text-gray-600 mt-1">
          Рейтинг: {data.rating || 'Нет оценок'}
        </p>
{
    error && (
        <p className="text-[14px] text-red-600 mt-2">{error}</p>
    )
}
      </div >
    <button
        onClick={handleToggleFavorite}
        className="self-start sm:self-end p-2 hover:bg-gray-100 rounded-full"
    >
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={isFavorite ? '#FF0000' : 'none'}
            stroke={isFavorite ? '#FF0000' : '#0A0A0A'}
            strokeWidth="2"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
        </svg>
    </button>
    </div >
  );
}

export default RequestCard;