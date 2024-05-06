"use client";
import { useState } from "react";
import { CloseIcon } from "../../../public/icons/close";
// import { FaTimes } from 'react-icons/fa';

const Input = ({
  name,
  placeholder,
  type,
  value,
  handleChange,
  handleClear,
}) => {
  return (
    <div className="relative my-3">
      <h2 className="font-medium text-base pb-2">{name}</h2>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="outline-none pr-10 w-full rounded-md border border-[#D9D9D9]"
      />

      <button
        onClick={handleClear}
        className="absolute top-[72%] right-2 transform -translate-y-1/2  cursor-pointer "
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default Input;
