import React from "react";

const Button = ({ btnName, handleClick }) => {
  return (
    <div className="flex justify-center items-center py-5">
      <button
        className=" bg-[#ab374a] text-white  cursor-pointer   font-semibold text-sm uppercase w-96 rounded-sm h-9"
        onClick={() => handleClick()}
      >
        {btnName}
      </button>
    </div>
  );
};

export default Button;
