import React from 'react'
import { Link } from 'react-router-dom'
import logoMini from '../../assets/img/logo-mini.png'


function Header() {
  return (
    <div>
      <div className='flex flex-col gap-y-4'>
        <img src={logoMini} alt="" className='w-[100px]' />
        <div className='flex flex-col gap-y-2 cursor-pointer'>
          <svg width="40" height="2" viewBox="0 0 40 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="1" x2="40" y2="1" stroke="white" stroke-width="2" />
          </svg>
          <svg width="40" height="2" viewBox="0 0 40 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="1" x2="40" y2="1" stroke="white" stroke-width="2" />
          </svg>
          <svg width="40" height="2" viewBox="0 0 40 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="1" x2="40" y2="1" stroke="white" stroke-width="2" />
          </svg>

        </div>
      </div>
      <div className='flex flex-row gap-10 absolute right-0 top-0 items-center'>
        <div className=''>
          <svg className='w-[40px] h-[40px]' viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="28.5" cy="28.5" r="28.5" fill="#F8F8F8" />
            <path d="M27.0117 35.0234C28.9688 35.0234 30.7734 34.3906 32.25 33.3359L37.8047 38.8906C38.0625 39.1484 38.4023 39.2773 38.7656 39.2773C39.5273 39.2773 40.0664 38.6914 40.0664 37.9414C40.0664 37.5898 39.9492 37.25 39.6914 37.0039L34.1719 31.4727C35.332 29.9492 36.0234 28.0625 36.0234 26.0117C36.0234 21.0547 31.9688 17 27.0117 17C22.0664 17 18 21.043 18 26.0117C18 30.9688 22.0547 35.0234 27.0117 35.0234ZM27.0117 33.0781C23.1445 33.0781 19.9453 29.8789 19.9453 26.0117C19.9453 22.1445 23.1445 18.9453 27.0117 18.9453C30.8789 18.9453 34.0781 22.1445 34.0781 26.0117C34.0781 29.8789 30.8789 33.0781 27.0117 33.0781Z" fill="#141414" />
          </svg>


        </div>
        <div>

          <svg className='w-[40px] h-[40px]' viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="28.5" cy="28.5" r="28.5" fill="#F8F8F8" />
            <path d="M28.6667 30.0416C31.083 30.0416 33.0417 28.0829 33.0417 25.6666C33.0417 23.2504 31.083 21.2916 28.6667 21.2916C26.2505 21.2916 24.2917 23.2504 24.2917 25.6666C24.2917 28.0829 26.2505 30.0416 28.6667 30.0416Z" stroke="#141414" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M28.6667 14C25.5725 14 22.605 15.2292 20.4171 17.4171C18.2292 19.605 17 22.5725 17 25.6667C17 28.4258 17.5862 30.2312 19.1875 32.2292L28.6667 43.1667L38.1458 32.2292C39.7471 30.2312 40.3333 28.4258 40.3333 25.6667C40.3333 22.5725 39.1042 19.605 36.9162 17.4171C34.7283 15.2292 31.7609 14 28.6667 14V14Z" stroke="#141414" stroke-width="2.08333" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

        </div>
        <div>

          <select name="select" className='bg-transparent text-white'>
            <option className='bg-' value="value1">Ру</option>
            <option className='bg-' value="value2" selected>Қз</option>
            <option className='bg-' value="value3">En</option>
          </select>
        </div>
  
        <Link to={'/login'} className='flex flex-row text-white'>
          <button className='flex flex-row gap-2'>
            <div>
              Вход
            </div>
            <div><svg width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5439 13.3799C15.752 13.3799 18.1982 10.6406 18.1982 7.06641C18.1982 3.72656 15.6934 0.884766 12.5439 0.884766C9.37988 0.884766 6.8457 3.72656 6.875 7.06641C6.875 10.6406 9.32129 13.3799 12.5439 13.3799ZM2.53906 26.5488H22.4609C23.8232 26.5488 24.6289 26.1387 24.6289 24.8789C24.6289 21.1582 19.9854 16.0166 12.5 16.0166C5.0293 16.0166 0.371094 21.1582 0.371094 24.8789C0.371094 26.1387 1.17676 26.5488 2.53906 26.5488Z" fill="white" />
            </svg>
            </div>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Header