import React, { useState } from 'react';

function RegularInputs({ name, placeholder, type = 'text', borderColor = 'border-gray-300' }) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(null);

  const validateInput = (inputValue) => {
    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(inputValue);
    } else if (type === 'text') {
      return inputValue.trim().length > 0;
    } else if (type === 'tel') {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      return phoneRegex.test(inputValue);
    } else if (type === 'password') {
      return inputValue.length >= 8 && /[A-Za-z]/.test(inputValue) && /\d/.test(inputValue);
    } else {
      return inputValue.length > 0;
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    setIsValid(validateInput(newValue));
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (value) {
      setIsValid(validateInput(value));
    } else {
      setIsValid(null);
    }
  };

  let dynamicBorderColor = borderColor;
  if (isFocused) {
    dynamicBorderColor = 'border-blue-500 shadow-md';
  } else if (isValid === false) {
    dynamicBorderColor = 'border-red-500';
  } else if (isValid === true) {
    dynamicBorderColor = 'border-green-500';
  }

  return (
    <div className="flex flex-col gap-[7px]">
      <div className="ml-[7px] text-[14px] 2xl:text-[20px]">{name}</div>
      <input
        type={type}
        className={`border-[2px] ${dynamicBorderColor} h-[32px] text-[13px] p-2 2xl:text-[17px] 2xl:p-3 2xl:h-[40px] rounded-[10px] w-full focus:outline-none hover:border-blue-500 hover:shadow-md hover:bg-gray-100 transition-all duration-200`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
}

export default RegularInputs;