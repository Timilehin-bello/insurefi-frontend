"use client";
import { useState } from "react";

const Radio = ({ options, selectedOption, setSelectedOption }) => {
  return (
    <div className="pt-3 flex flex-col justify-start w-1/2">
      {options.map((option, index) => (
        <label key={index}>
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={() => setSelectedOption(option)}
            className="m-3"
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default Radio;
