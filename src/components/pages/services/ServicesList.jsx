import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlackHeader from '../../main/BlackHeader';
import RequestCard from '../../UI/cards/RequestCard';
import { fetchRequestByID } from '../../../store/actions/requestCardAction';
import { Link } from 'react-router-dom';
import Chat from '../../UI/chat/Chat';

const ServicesList = ({ service_name }) => {
  const dispatch = useDispatch();
  const { serviceData, loading, error } = useSelector((state) => state.serviceById);

  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [ratingMin, setRatingMin] = useState('');
  const [ratingMax, setRatingMax] = useState('');
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [sortOption, setSortOption] = useState('по соответствию');
  const [filteredData, setFilteredData] = useState([]);

  // Динамические списки регионов и подкатегорий
  const regionsList = [...new Set(serviceData?.map((item) => item.city?.name) || [])].filter(Boolean);
  const subcategories = [...new Set(serviceData?.map((item) => item.name) || [])].filter(Boolean);
  const sortOptions = ['по соответствию', 'популярные', 'с дешевых', 'с дорогих'];

  const serviceMap = {
    beauty: { id: 1, name: 'Красота и здоровье' },
    cleaning: { id: 2, name: 'Клининг' },
    tutoring: { id: 3, name: 'Репетиторство' },
    building: { id: 4, name: 'Строительство' },
    med_service: { id: 5, name: 'Медицинские услуги' },
  };

  // Загрузка данных при монтировании
  useEffect(() => {
    const category = serviceMap[service_name];
    if (category) {
      dispatch(fetchRequestByID(category.id));
    }
  }, [service_name, dispatch]);

  // Обновление отфильтрованных данных при изменении serviceData или фильтров
  useEffect(() => {
    if (!serviceData) return;

    let result = [...serviceData];

    // Фильтрация по регионам
    if (selectedRegions.length > 0) {
      result = result.filter((item) => selectedRegions.includes(item.city?.name));
    }

    // Фильтрация по подкатегориям (используем name)
    if (selectedSubcategories.length > 0) {
      result = result.filter((item) => selectedSubcategories.includes(item.name));
    }

    // Фильтрация по цене
    if (priceMin) {
      result = result.filter((item) => parseFloat(item.price) >= Number(priceMin));
    }
    if (priceMax) {
      result = result.filter((item) => parseFloat(item.price) <= Number(priceMax));
    }

    // Фильтрация по рейтингу
    if (ratingMin) {
      result = result.filter((item) => item.rating >= Number(ratingMin));
    }
    if (ratingMax) {
      result = result.filter((item) => item.rating <= Number(ratingMax));
    }

    // Сортировка
    if (sortOption === 'популярные') {
      result = result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortOption === 'с дешевых') {
      result = result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOption === 'с дорогих') {
      result = result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    // "по соответствию" — без сортировки, как с сервера

    setFilteredData(result);
  }, [
    serviceData,
    selectedRegions,
    selectedSubcategories,
    priceMin,
    priceMax,
    ratingMin,
    ratingMax,
    sortOption,
  ]);

  const handleCheckboxChange = (region) => {
    const updatedRegions = selectedRegions.includes(region)
      ? selectedRegions.filter((item) => item !== region)
      : [...selectedRegions, region];
    setSelectedRegions(updatedRegions);
  };

  const handleSubcategoryChange = (subcategory) => {
    const updatedSubcategories = selectedSubcategories.includes(subcategory)
      ? selectedSubcategories.filter((item) => item !== subcategory)
      : [...selectedSubcategories, subcategory];
    setSelectedSubcategories(updatedSubcategories);
  };

  const handleSortOptionChange = (option) => {
    setSortOption(option);
    setShowSortOptions(false);
  };

  const handlePriceIgnore = () => {
    setPriceMin('');
    setPriceMax('');
  };

  const handleRatingIgnore = () => {
    setRatingMin('');
    setRatingMax('');
  };

  return (
    <div className="min-h-screen">
      <BlackHeader />
      <div className="flex justify-center items-start flex-col px-4 py-8">
        <h1 className="font-eastman_medium text-[24px] sm:text-[32px] xl:text-[40px] text-[#0A0A0A] text-center w-full mb-6">
          {serviceMap[service_name]?.name || 'Услуги'}
        </h1>
        <Link to={`/ ${ service_name } `} className="flex items-center mb-4 sm:mb-6 md:mb-8 ml-12">
          <button className="flex items-center gap-2 bg-black text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-gray-800 text-sm sm:text-base md:text-lg transition-colors duration-200">
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
          </button>
        </Link>
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-[90vw] mx-auto">
          {/* Фильтры */}
          <div className="w-full md:w-[30%] flex flex-col gap-6 bg-white p-6 rounded-[20px] shadow-container">
            {/* Сортировка */}
            <div className="relative">
              <button
                className="bg-[#1D217C] rounded-[10px] text-white font-eastman_regular flex flex-row gap-2 justify-center items-center py-2 px-4 w-full"
                onClick={() => setShowSortOptions(!showSortOptions)}
              >
                {sortOption}
                <svg
                  className="w-[15px] h-[8px]"
                  viewBox="0 0 15 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.44612e-05 1.24442C-0.000470089 1.40452 0.034854 1.5627 0.10345 1.70735C0.172045 1.85199 0.27217 1.97943 0.396466 2.08029L6.82443 7.25622C7.01613 7.41383 7.25658 7.5 7.50472 7.5C7.75287 7.5 7.99332 7.41383 8.18502 7.25622L14.613 1.89811C14.8318 1.71622 14.9693 1.45484 14.9955 1.17147C15.0216 0.888106 14.9341 0.605968 14.7523 0.387125C14.5704 0.168282 14.3091 0.0306601 14.0258 0.00453423C13.7425 -0.0215917 13.4605 0.0659184 13.2417 0.247814L7.49937 5.03796L1.75705 0.408558C1.5998 0.277517 1.40831 0.194276 1.20524 0.168686C1.00217 0.143096 0.79602 0.176228 0.611186 0.26416C0.426353 0.352094 0.27057 0.491147 0.162269 0.664868C0.0539685 0.838589 -0.0023164 1.03971 7.44612e-05 1.24442Z"
                    fill="white"
                  />
                </svg>
              </button>
              {showSortOptions && (
                <div className="absolute z-10 bg-white border rounded shadow-lg mt-2 w-full">
                  {sortOptions.map((option, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer font-eastman_regular text-[14px]"
                      onClick={() => handleSortOptionChange(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Регионы */}
            <div>
              <h2 className="font-eastman_medium text-[16px] sm:text-[18px] mb-2">
                Регион/Город
              </h2>
              {regionsList.length > 0 ? (
                <div className="flex flex-col gap-2 text-[14px] sm:text-[16px]">
                  {regionsList.map((region, index) => (
                    <label key={index} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        id={`region - ${ index } `}
                        checked={selectedRegions.includes(region)}
                        onChange={() => handleCheckboxChange(region)}
                        className="w-4 h-4"
                      />
                      {region}
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-[14px] sm:text-[16px] text-gray-500">
                  Регионы не найдены
                </p>
              )}
            </div>

            {/* Подкатегории */}
            <div>
              <h2 className="font-eastman_medium text-[16px] sm:text-[18px] mb-2">
                Подкатегории
              </h2>
              {subcategories.length > 0 ? (
                <div className="flex flex-col gap-2 text-[14px] sm:text-[16px]">
                  {subcategories.map((subcategory, index) => (
                    <label key={index} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        id={`subcategory - ${ index } `}
                        checked={selectedSubcategories.includes(subcategory)}
                        onChange={() => handleSubcategoryChange(subcategory)}
                        className="w-4 h-4"
                      />
                      {subcategory}
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-[14px] sm:text-[16px] text-gray-500">
                  Подкатегории не найдены
                </p>
              )}
            </div>

            {/* Стоимость */}
            <div>
              <h2 className="font-eastman_medium text-[16px] sm:text-[18px] mb-2">
                Стоимость
              </h2>
              <label className="flex items-center gap-2 mb-2 text-[14px] sm:text-[16px]">
                <input
                  type="checkbox"
                  onChange={handlePriceIgnore}
                  checked={!priceMin && !priceMax}
                  className="w-4 h-4"
                />
                Не имеет значения
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  placeholder="От"
                  className="border border-[#6A6A6A] rounded-[8px] p-2 w-full text-[14px]"
                />
                <input
                  type="number"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  placeholder="До"
                  className="border border-[#6A6A6A] rounded-[8px] p-2 w-full text-[14px]"
                />
              </div>
            </div>

            {/* Рейтинг */}
            <div>
              <h2 className="font-eastman_medium text-[16px] sm:text-[18px] mb-2">
                Рейтинг
              </h2>
              <label className="flex items-center gap-2 mb-2 text-[14px] sm:text-[16px]">
                <input
                  type="checkbox"
                  onChange={handleRatingIgnore}
                  checked={!ratingMin && !ratingMax}
                  className="w-4 h-4"
                />
                Не имеет значения
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={ratingMin}
                  onChange={(e) => setRatingMin(e.target.value)}
                  placeholder="От"
                  className="border border-[#6A6A6A] rounded-[8px] p-2 w-full text-[14px]"
                />
                <input
                  type="number"
                  value={ratingMax}
                  onChange={(e) => setRatingMax(e.target.value)}
                  placeholder="До"
                  className="border border-[#6A6A6A] rounded-[8px] p-2 w-full text-[14px]"
                />
              </div>
            </div>
          </div>

          {/* Список услуг */}
          <div className="w-full md:w-[70%] flex flex-col gap-6">
            {loading ? (
              <div className="text-center text-[18px] font-eastman_regular animate-pulse">
                Загрузка...
              </div>
            ) : error ? (
              <div className="text-center text-red-600 text-[18px] font-eastman_regular">
                Ошибка: {error}
              </div>
            ) : filteredData.length > 0 ? (
              filteredData.map((request) => (
                <RequestCard
                  key={request.id}
                  data={request}
                  service_name={service_name}
                />
              ))
            ) : (
              <div className="text-center text-[18px] font-eastman_regular">
                Нет доступных запросов
              </div>
            )}
          </div>
          <Chat  />
        </div>
      </div>
    </div>
  );
};

export default ServicesList;