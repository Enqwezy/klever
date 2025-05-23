import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../store/services/api';

function RequestCard({ data }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState(null);

  // Проверка, есть ли услуга в избранном
  // useEffect(() => {
  //   const checkFavorite = async () => {
  //     try {
  //       const token = localStorage.getItem('access_token');
  //       const response = await API.get('/v1/favourites', {
  //         headers: { Authorization: `Bearer ${token}` }
  //       });
  //       const favoriteIds = response.data.map((fav) => fav.service.id);
  //       setIsFavorite(favoriteIds.includes(data.id));
  //     } catch (err) {
  //       console.error('Error checking favorite:', err);
  //     }
  //   };
  //   checkFavorite();
  // }, [data.id]);

  // // Добавление/удаление из избранного
  // const handleToggleFavorite = async () => {
  //   try {
  //     setError(null);
  //     if (isFavorite) {
  //       const token = localStorage.getItem('access_token');
  //       await API.delete(`/v1/favourites/${ data.id }`, {
  //         headers: { Authorization: `Bearer ${token}` }
  //       });
  //       setIsFavorite(false);
  //     } else {
  //       const token = localStorage.getItem('access_token');
  //       await API.post('/v1/add-favourites', { service_id: data.id }, {
  //         headers: { Authorization: `Bearer ${token}` }
  //       });
  //       setIsFavorite(true);
  //     }
  //   } catch (err) {
  //     console.error('Error toggling favorite:', err);
  //     setError('Ошибка при изменении избранного. Попробуйте снова.');
  //   }
  // };

  return (
    <div className="bg-white p-4 flex flex-col sm:flex-row gap-4">
      {data.photo && (
        <img
          src={'http://localhost:8000/' + data.photo}
          alt={data.name}
          className="w-full sm:w-32 h-32 object-cover rounded-[8px]"
        />
      )}
      <div className="flex-1">
        <Link to={`/${data.id}`}>
          <h3 className="font-eastman_medium text-[16px] sm:text-[18px] text-[#0A0A0A] hover:text-blue-600">
            {data.name}
          </h3>
        </Link >
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
    </div >
  );
}

export default RequestCard;