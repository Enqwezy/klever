import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoMini from '../../assets/img/logo-mini.png';

function Header() {
  const accessToken = localStorage.getItem('access_token');
  const isAuthenticated = !!accessToken;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsSidebarOpen(false);
    navigate('/login');
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="flex flex-row gap-10 w-[80vw] justify-between">
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
          <div>
            <svg
              className="w-[40px] h-[40px] 2xl:w-[60px] 2xl:h-[60px]"
              viewBox="0 0 57 57"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="28.5" cy="28.5" r="28.5" fill="#F8F8F8" />
              <path
                d="M27.0117 35.0234C28.9688 35.0234 30.7734 34.3906 32.25 33.3359L37.8047 38.8906C38.0625 39.1484 38.4023 39.2773 38.7656 39.2773C39.5273 39.2773 40.0664 38.6914 40.0664 37.9414C40.0664 37.5898 39.9492 37.25 39.6914 37.0039L34.1719 31.4727C35.332 29.9492 36.0234 28.0625 36.0234 26.0117C36.0234 21.0547 31.9688 17 27.0117 17C22.0664 17 18 21.043 18 26.0117C18 30.9688 22.0547 35.0234 27.0117 35.0234ZM27.0117 33.0781C23.1445 33.0781 19.9453 29.8789 19.9453 26.0117C19.9453 22.1445 23.1445 18.9453 27.0117 18.9453C30.8789 18.9453 34.0781 22.1445 34.0781 26.0117C34.0781 29.8789 30.8789 33.0781 27.0117 33.0781Z"
                fill="#141414"
              />
            </svg>
          </div>
          <div>
            <select name="select" className="bg-transparent text-white 2xl:text-[1.3vw]">
              <option value="value1">Ру</option>
              <option value="value2" selected>
                Қз
              </option>
              <option value="value3">En</option>
            </select>
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
          {/* Close Button */}
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

          {/* Menu Items */}
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

      {/* Overlay */}
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