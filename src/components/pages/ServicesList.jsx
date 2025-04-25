import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlackHeader from '../main/BlackHeader';
import RequestCard from '../UI/cards/RequestCard';
import {
    setRegions,
    setSubcategories,
    setPriceRange,
    setRatingRange,
    fetchSubcategories,
    fetchRequests,
    setSortOption,
} from '../../store/actions/requestCardAction';

function ServicesList({ service_name }) {
    const dispatch = useDispatch();
    const {
        regions = [],
        subcategories = ['Маникюр', 'Педикюр', 'Массаж'], 
        priceRange = { min: '', max: '' },
        ratingRange = { min: '', max: '' },
        requests = [
            { id: 1, title: 'Маникюр', price: 5000, rating: 4.5 },
            { id: 2, title: 'Педикюр', price: 7000, rating: 4.8 },
        ], 
        sortOption = 'по соответствию',
    } = useSelector((state) => state || {});

    const [selectedRegions, setSelectedRegions] = useState([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [ratingMin, setRatingMin] = useState('');
    const [ratingMax, setRatingMax] = useState('');
    const [showSortOptions, setShowSortOptions] = useState(false);

    const regionsList = ['Алматы', 'Нур-Султан', 'Шымкент', 'Кызылорда', 'Караганда'];
    const sortOptions = ['по соответствию', 'популярные', 'с дешевых', 'с дорогих'];

    useEffect(() => {
        dispatch(fetchSubcategories()); 
        dispatch(setRegions(regionsList)); 
    }, [dispatch]);

    const handleCheckboxChange = (region) => {
        const updatedRegions = selectedRegions.includes(region)
            ? selectedRegions.filter((item) => item !== region)
            : [...selectedRegions, region];
        setSelectedRegions(updatedRegions);
        dispatch(setRegions(updatedRegions));
    };

    const handleSubcategoryChange = (subcategory) => {
        const updatedSubcategories = selectedSubcategories.includes(subcategory)
            ? selectedSubcategories.filter((item) => item !== subcategory)
            : [...selectedSubcategories, subcategory];
        setSelectedSubcategories(updatedSubcategories);
        dispatch(setSubcategories(updatedSubcategories));
    };

    const handleSortOptionChange = (option) => {
        dispatch(setSortOption(option));
        setShowSortOptions(false);
        handleFind(); 
    };

    const handleFind = () => {
        const filters = {
            regions: selectedRegions,
            subcategories: selectedSubcategories,
            priceMin: priceMin || null,
            priceMax: priceMax || null,
            ratingMin: ratingMin || null,
            ratingMax: ratingMax || null,
            sort: sortOption,
        };
        dispatch(fetchRequests(filters));
    };

    return (
        <div>
            <BlackHeader />
            <div className="flex justify-center items-center flex-col">
                <div className="font-eastman_regular 2xl:text-[3vw]">{service_name === 'beauty' ? 'Красота и здоровье' : service_name === 'cleaning' ? 'Клининг' : service_name === 'tutoring' ? 'Репетиторство' : service_name === 'building' ? 'Строительство' : service_name === 'med_service' ? 'Медицинские услуги' : ''}</div>
                <div className="flex flex-row gap-5 w-[80vw] border">
                    <div className="max-w-[30vw] flex flex-col gap-5">
                        <div>
                            <button
                                className="bg-[#1D217C] rounded-[10px] text-white font-eastman_regular flex flex-row gap-2 justify-center items-center 2xl:py-1 2xl:px-5"
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
                                <div className="absolute bg-white border rounded shadow-lg mt-2">
                                    {sortOptions.map((option, index) => (
                                        <div
                                            key={index}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleSortOptionChange(option)}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <h1 className="font-eastman_medium 2xl:text-[1vw]">Регион/Город</h1>
                            <div className="2xl:text-[1vw]">
                                {regionsList.map((region, index) => (
                                    <div key={index} className="checkbox-item">
                                        <input
                                            type="checkbox"
                                            id={`region-${index}`}
                                            checked={selectedRegions.includes(region)}
                                            onChange={() => handleCheckboxChange(region)}
                                        />
                                        <label htmlFor={`region-${index}`}> {region}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h1 className="font-eastman_medium 2xl:text-[1vw]">Подкатегории</h1>
                            <div className="2xl:text-[1vw]">
                                {subcategories.map((subcategory, index) => (
                                    <div key={index} className="checkbox-item">
                                        <input
                                            type="checkbox"
                                            id={`subcategory-${index}`}
                                            checked={selectedSubcategories.includes(subcategory)}
                                            onChange={() => handleSubcategoryChange(subcategory)}
                                        />
                                        <label htmlFor={`subcategory-${index}`}> {subcategory}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h1 className="font-eastman_medium 2xl:text-[1vw]">Стоимость</h1>
                            <div>
                                <input type="checkbox" /> Не имеет значения
                                от{' '}
                                <input
                                    type="text"
                                    value={priceMin}
                                    onChange={(e) => setPriceMin(e.target.value)}
                                />
                                до{' '}
                                <input
                                    type="text"
                                    value={priceMax}
                                    onChange={(e) => setPriceMax(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <h1 className="font-eastman_medium 2xl:text-[1vw]">Рейтинг</h1>
                            <div>
                                <input type="checkbox" /> Не имеет значения
                                от{' '}
                                <input
                                    type="text"
                                    value={ratingMin}
                                    onChange={(e) => setRatingMin(e.target.value)}
                                />
                                до{' '}
                                <input
                                    type="text"
                                    value={ratingMax}
                                    onChange={(e) => setRatingMax(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                className="bg-green-700 text-white p-5 rounded-2xl"
                                onClick={handleFind}
                            >
                                Найти
                            </button>
                        </div>
                    </div>
                    <div>
                        {requests.length > 0 ? (
                            requests.map((request) => (
                                <RequestCard key={request.id} data={request} />
                            ))
                        ) : (
                            <div>Нет доступных запросов</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServicesList;