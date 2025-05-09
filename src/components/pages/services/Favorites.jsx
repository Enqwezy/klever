import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlackHeader from '../../main/BlackHeader';
import Footer from '../../main/Footer';
import RequestCard from '../../UI/cards/RequestCard';
import Chat from '../../UI/chat/Chat';
import API from '../../../store/services/api';

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('access_token');
                const response = await API.get('/v1/favourites', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFavorites(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching favorites:', err);
                setError('Ошибка загрузки избранных. Попробуйте снова.');
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, []);


    return (
        <div className="min-h-screen flex flex-col">
            <BlackHeader />
            <div className="flex-1 px-4 py-8">
                <div className="max-w-[90vw] mx-auto">
                    <h1 className="font-eastman_medium text-[24px] sm:text-[32px] xl:text-[40px] text-[#0A0A0A] text-center mb-6">
                        Избранные услуги
                    </h1>
                    <div className="flex items-center mb-4 sm:mb-6 md:mb-8 ml-4">
                        <Link to="/" className="flex items-center gap-2 bg-black text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-gray-800 text-sm sm:text-base md:text-lg transition-colors duration-200">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 sm:w-6 sm:h-6"
                            >
                                <path
                                    d="M15 18L9 12L15 6"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Назад
                        </Link>
                    </div>
                    <div className="flex flex-col gap-6">
                        {loading ? (
                            <div className="text-center text-[18px] font-eastman_regular animate-pulse">
                                Загрузка...
                            </div>
                        ) : error ? (
                            <div className="text-center text-red-600 text-[18px] font-eastman_regular">
                                {error}
                            </div>
                        ) : favorites.length > 0 ? (
                            favorites.map(({ service }) => (
                                <RequestCard
                                    key={service.id}
                                    data={service}
                                    service_name="beauty" // Уточните, если нужна динамика
                                />
                            ))
                        ) : (
                            <div className="text-center text-[18px] font-eastman_regular">
                                Нет избранных услуг
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Chat serviceName="favorites" />
            <Footer />
        </div>
    );
}

export default Favorites;