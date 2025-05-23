import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoMini from '../../assets/img/logo-mini.png';
import { useDispatch } from 'react-redux';
import { fetchSearchCard } from '../../store/actions/requestCardAction'

function Header() {
    const accessToken = localStorage.getItem('access_token');
    const isAuthenticated = !!accessToken;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef(null);
    const debounceTimeout = useRef(null);
    const dispatch = useDispatch()


    // Функция имитации поиска (замените на реальный API-запрос)
    const searchRequests = async (query) => {
        return dispatch(fetchSearchCard(query))

    };

    // Обработка поиска с debounce
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(async () => {
            try {
                const results = await searchRequests(searchQuery);
                setSearchResults(results.payload);
            } catch (error) {
                console.error('Ошибка поиска:', error);
                setSearchResults([]);
            } finally {
                setIsSearching(false);
            }
        }, 2000);

        return () => clearTimeout(debounceTimeout.current);
    }, [searchQuery]);

    // Закрытие поиска при клике вне области
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
                setSearchQuery('');
                setSearchResults([]);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isSearchOpen) {
            setSearchQuery('');
            setSearchResults([]);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setIsSidebarOpen(false);
        navigate('/login');
    };

    return (
        <div className="flex justify-center mt-5">
            <div className="flex flex-row gap-10 w-[80vw] justify-between items-center">
                <div className="flex flex-col gap-y-4">
                    <img src={logoMini} alt="" className="w-[80px] md:w-[100px] 2xl:w-[150px]" />
                    <div className="flex flex-col gap-y-[5px] cursor-pointer" onClick={toggleSidebar}>
                        <svg className="w-[30px] h-[2px]" viewBox="0 0 40 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="1" x2="40" y2="1" stroke="white" strokeWidth="2" />
                        </svg>
                        <svg className="w-[30px] h-[2px]" viewBox="0 0 40 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="1" x2="40" y2="1" stroke="white" strokeWidth="2" />
                        </svg>
                        <svg className="w-[30px] h-[2px]" viewBox="0 0 40 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="1" x2="40" y2="1" stroke="white" strokeWidth="2" />
                        </svg>
                    </div>
                </div>
                <div className="flex flex-row gap-5 md:gap-6 lg:gap-7 xl:gap-10 2xl:items-center">
                    <div className="relative" ref={searchRef}>
                        <div
                            className={`flex items-center bg-[#F8F8F8] rounded-[10px] transition-all duration-300 ease-in-out ${isSearchOpen ? 'w-[200px] sm:w-[250px] md:w-[270px] xl:w-[350px]  pl-2' : 'w-[40px] 2xl:w-[60px]'
                                } h-[40px] 2xl:h-[60px]`}
                        >
                            <svg
                                className="w-[40px] h-[40px] 2xl:w-[60px] 2xl:h-[60px] cursor-pointer"
                                viewBox="0 0 57 57"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={toggleSearch}
                            >
                                <circle cx="28.5" cy="28.5" r="28.5" fill="#F8F8F8" />
                                <path
                                    d="M27.0117 35.0234C28.9688 35.0234 30.7734 34.3906 32.25 33.3359L37.8047 38.8906C38.0625 39.1484 38.4023 39.2773 38.7656 39.2773C39.5273 39.2773 40.0664 38.6914 40.0664 37.9414C40.0664 37.5898 39.9492 37.25 39.6914 37.0039L34.1719 31.4727C35.332 29.9492 36.0234 28.0625 36.0234 26.0117C36.0234 21.0547 31.9688 17 27.0117 17C22.0664 17 18 21.043 18 26.0117C18 30.9688 22.0547 35.0234 27.0117 35.0234ZM27.0117 33.0781C23.1445 33.0781 19.9453 29.8789 19.9453 26.0117C19.9453 22.1445 23.1445 18.9453 27.0117 18.9453C30.8789 18.9453 34.0781 22.1445 34.0781 26.0117C34.0781 29.8789 30.8789 33.0781 27.0117 33.0781Z"
                                    fill="#141414"
                                />
                            </svg>
                            {isSearchOpen && (
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Поиск услуг..."
                                    className="flex-1 p-2 bg-transparent text-black font-eastman_regular text-[14px] outline-none"
                                    autoFocus
                                />
                            )}
                        </div>
                        {isSearchOpen && (
                            <div className="absolute top-full left-0 w-[200px] sm:w-full mt-1 z-20">
                                {isSearching && (
                                    <div className="bg-white rounded-[10px] shadow-lg p-2 text-black font-eastman_regular text-[14px]">
                                        Загрузка...
                                    </div>
                                )}
                                {searchResults.length > 0 && !isSearching && (
                                    <div className="bg-white rounded-[10px] shadow-lg max-h-[200px] overflow-y-auto ">
                                        {searchResults.map((result) => (
                                            <Link
                                                key={result.id}
                                                to={`/${result.id}`}
                                                className="block p-2 hover:bg-gray-100 text-black font-eastman_regular text-[14px] border-t-2 border-gray-500 cursor-pointer"
                                                onClick={() => {
                                                    setIsSearchOpen(false);
                                                    setSearchQuery('');
                                                    setSearchResults([]);
                                                }}
                                            >
                                                <div className='flex flex-row gap-2 items-center'>
                                                    <img src={"http://localhost:8000/" + result.photo} alt="" className='size-12' />
                                                    <div className='font-eastman_regular'>{result.name}</div>
                                                    <div className='text-gray-800 text-[12px]'>{result.price.split('.')[0]} Тг</div>

                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                                {!isSearching && searchResults.length === 0 && (
                                    <div className="bg-white rounded-[10px] shadow-lg p-2 text-black font-eastman_regular text-[14px]">
                                        Ничего не найдено
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div>
                        <Link to={'/favorites'} className='flex items-center justify-center bg-[#F8F8F8] rounded-[10px] w-[40px] h-[40px] 2xl:w-[60px] 2xl:h-[60px] cursor-pointer' >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="#000" d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v16.028c0 1.22-1.38 1.93-2.372 1.221L12 18.229l-5.628 4.02c-.993.71-2.372 0-2.372-1.22zm3-1a1 1 0 0 0-1 1v15.057l5.128-3.663a1.5 1.5 0 0 1 1.744 0L18 20.057V5a1 1 0 0 0-1-1z" /></g></svg>
                        </Link>
                    </div>
                    <Link
                        to={isAuthenticated ? '/profile' : '/login'}
                        className="flex flex-row text-white 2xl:text-[1.3vw]"
                    >
                        <button className="flex flex-row gap-2">
                            <div>{isAuthenticated ? 'Профиль' : 'Вход'}</div>
                            <div>
                                <svg
                                    className="w-[25px] h-[27px] 2xl:size-[30px]"
                                    viewBox="0 0 25 27"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12.5439 13.3799C15.752 13.3799 18.1982 10.6406 18.1982 7.06641C18.1982 3.72656 15.6934 0.884766 12.5439 0.884766C9.37988 0.884766 6.8457 3.72656 6.875 7.06641C6.875 10.6406 9.32129 13.3799 12.5439 13.3799ZM2.53906 26.5488H22.4609C23.8232 26.5488 24.6289 26.1387 24.6289 24.8789C24.6289 21.1582 19.9854 16.0166 12.5 16.0166C5.0293 16.0166 0.371094 21.1582 0.371094 24.8789C0.371094 26.1387 1.17676 26.5488 2.53906 26.5488Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                        </button>
                    </Link>
                </div>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-[250px] bg-[#76C6FF] transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out z-50 shadow-lg`}
            >
                <div className="flex flex-col h-full p-6">
                    <button className="self-end mb-6" onClick={toggleSidebar}>
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <nav className="flex flex-col gap-2 font-eastman_regular text-[18px] text-white">
                        <Link to="/" onClick={toggleSidebar} className="hover:text-gray-200">
                            Главная
                        </Link>
                        <Link to="/beauty" onClick={toggleSidebar} className="hover:text-gray-200 mt-3">
                            Красота и здоровье
                        </Link>
                        <Link to="/cleaning" onClick={toggleSidebar} className="hover:text-gray-200">
                            Клининг
                        </Link>
                        <Link to="/tutoring" onClick={toggleSidebar} className="hover:text-gray-200">
                            Репетиторство
                        </Link>
                        <Link to="/building" onClick={toggleSidebar} className="hover:text-gray-200">
                            Строительство
                        </Link>
                        <Link to="/med-service" onClick={toggleSidebar} className="hover:text-gray-200">
                            Медицинские услуги
                        </Link>
                        <Link to="/restaurant" onClick={toggleSidebar} className="hover:text-gray-200">
                            РЕСТОРАНЫ
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" onClick={toggleSidebar} className="hover:text-gray-200 mt-5">
                                    Профиль
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-left hover:text-gray-200 "
                                >
                                    Выйти
                                </button>
                            </>
                        ) : (
                            <Link to="/login" onClick={toggleSidebar} className="hover:text-gray-200">
                                Вход
                            </Link>
                        )}
                    </nav>
                </div>
            </div>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    );
}

export default Header;