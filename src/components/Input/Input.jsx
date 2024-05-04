"use client";
import { useState } from "react";
// import { FaTimes } from 'react-icons/fa';

const Input = ({ name, placeholder, type }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClear = () => {
    setValue("");
  };

  return (
    <div className="relative my-3">
      <h2 className="font-medium text-base pb-2">{name}</h2>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="outline-none pr-10 w-full rounded-md"
      />

      <button
        onClick={handleClear}
        className="absolute top-[72%] right-2 transform -translate-y-1/2 bg-slate-400 cursor-pointer rounded-full border-none font-normal py-1 px-3 text-white"
      >
        x
      </button>
    </div>
  );
};

export default Input;
