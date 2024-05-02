import React from "react";
import { CarIcon } from "../../../public/icons/car";
import Image from "next/image";
import TinyLineChart from "../TinyLineChart/TinyLineChart";

const InsuranceCard = ({
  src,
  alt,
  insuranceType,
  totalAmount,
  numberOfInsured,
  bgColor,
  textColor,
}) => {
  return (
    <div
      className={`max-w-sm p-6 ${bgColor}   rounded-[16.87px] shadow space-y-10`}
    >
      <div className="flex gap-2 items-center">
        {/* <CarIcon /> */}

        <Image
          src={src}
          width={20}
          height={20}
          alt={alt}
          className={` h-10   ${textColor} mb-6`}
        />

        <div>
          <span className={`${textColor}`}>{insuranceType} Insurances</span>
          <p className="mb-3 font-normal text-[#676767] text-[12.65px]">
            {numberOfInsured}
          </p>
        </div>
      </div>

      <div className="flex gap-20">
        <h5
          className={`mb-2 text-2xl font-semibold tracking-tight ${textColor}`}
        >
          {totalAmount}
        </h5>
        <div className="w-full text-red-600">
          <TinyLineChart />
        </div>
      </div>

      <p className={`mb-3 font-normal ${textColor} text-[12.65px]`}>
        {insuranceType} Claim Pool
      </p>
    </div>
  );
};

export default InsuranceCard;
