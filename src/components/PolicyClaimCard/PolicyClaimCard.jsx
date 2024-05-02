"use client";

import Image from "next/image";
import React, { useState } from "react";
import { PropertyIcon } from "../../../public/icons/property";
import { CropIcon } from "../../../public/icons/crop";

const PolicyClaimCard = () => {
  const [isActive, setIsActive] = useState("policy");
  return (
    <div className="flex flex-col items-center justify-center  rounded-[21.09px] bg-white w-72">
      {/* <div className="relative overflow-x-auto"> */}
      <div className=" w-36 my-3">
        <div className="flex bg-[#D9D9D959] p-[0.5px] rounded-full ">
          <button
            className={`flex-1 rounded-full p-2 text-sm font-medium ${
              isActive === "policy" ? "bg-black text-white" : "text-black"
            }`}
            onClick={() => setIsActive("policy")}
          >
            Policy
          </button>
          <button
            className={`flex-1 rounded-full p-2 text-sm font-medium ${
              isActive === "claims" ? "bg-black text-white" : "text-black"
            }`}
            onClick={() => setIsActive("claims")}
          >
            Claims
          </button>
        </div>
      </div>
      {isActive === "policy" ? (
        <table className=" text-sm tept-left rtl:text-right text-black ">
          <thead className="text-xs text-[#929292]   ">
            <tr className="  border-y">
              <th scope="col" className="text-black font-bold py-4 ">
                Type
              </th>
              <th scope="col" className="px-8">
                Amount
              </th>
              <th scope="col" className="">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="  ">
            <tr className=" py-4 ">
              <th
                scope="row"
                className=" font-medium text-gray-900 whitespace-nowrap "
              >
                <div className="border-[0.84px] border-[#FF0B0B] h-9 w-9 flex justify-center  rounded-[5.06px] border-dashed">
                  <Image
                    alt="health icon"
                    src="/icons/health.svg"
                    width={20}
                    height={20}
                    className=""
                  />
                </div>
              </th>
              <td className="px-8">
                <span className="font-bold text-base">$65,500</span>
                <p className="text-[#929292] text-[11px]">premium</p>
              </td>
              <td className="">
                <button className="bg-[#FFFDCB] border-2 border-[#FFFDCB] w-24 px-2 py-1 rounded-full">
                  Paid
                </button>
              </td>
            </tr>
            <tr className="  ">
              <th className="py-4">
                <div className="border-[0.84px] border-[#7C74D4] h-9 w-9 flex justify-center   rounded-[5.06px] border-dashed p-2">
                  <Image
                    alt="vehicle icon"
                    src="/icons/vehicle.svg"
                    width={100}
                    height={100}
                  />
                </div>
              </th>
              <td className="px-8">
                <span className="font-bold text-base">$65,500</span>
                <p className="text-[#929292] text-[11px]">premium</p>
              </td>
              <td className="">
                <button className="bg-[#D3F3D4] border-2 border-[#D3F3D4] w-24 px-2 py-1 rounded-full">
                  Paid
                </button>
              </td>
            </tr>
            <tr className="">
              <th className="py-4">
                <div className="border-[0.84px] border-[#000000] h-9 w-9 flex justify-center   rounded-[5.06px] border-dashed p-[5px]">
                  <PropertyIcon />
                </div>
              </th>
              <td className="px-8">
                <span className="font-bold text-base">$65,500</span>
                <p className="text-[#929292] text-[11px]">premium</p>
              </td>
              <td className="">
                <button className="bg-[#FFFDCB] border-2 border-[#FFFDCB] w-24 px-2 py-1 rounded-full">
                  Pending
                </button>
              </td>
            </tr>
            <tr className="">
              <th className="py-4">
                <div className="border-[0.84px] border-[#008000] h-9 w-9   rounded-[5.06px] border-dashed p-1 flex justify-center">
                  <CropIcon />
                </div>
              </th>
              <td className="px-8">
                <span className="font-bold text-base">$65,500</span>
                <p className="text-[#929292] text-[11px]">premium</p>
              </td>
              <td className="">
                <button className="bg-[#D3F3D4] border-2 border-[#D3F3D4] w-24 px-2 py-1 rounded-full">
                  Paid
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table className=" text-sm tept-left rtl:text-right text-black ">
          <thead className="text-xs text-[#929292]   ">
            <tr className="  border-y">
              <th scope="col" className="text-black font-bold py-4 ">
                Type
              </th>
              <th scope="col" className="px-8">
                Amount
              </th>
              <th scope="col" className="">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="  ">
            <tr className=" py-4 ">
              <th
                scope="row"
                className=" font-medium text-gray-900 whitespace-nowrap "
              >
                <div className="border-[0.84px] border-[#FF0B0B] h-9 w-9 flex justify-center  rounded-[5.06px] border-dashed">
                  <Image
                    alt="health icon"
                    src="/icons/health.svg"
                    width={20}
                    height={20}
                    className=""
                  />
                </div>
              </th>
              <td className="px-8">
                <span className="font-bold text-base">$40,000</span>
                <p className="text-[#929292] text-[10px]">Claim Status</p>
              </td>
              <td className="">
                <button className="bg-[#FFFDCB] border-2 border-[#FFFDCB] w-24 px-2 py-1 rounded-full">
                  Paid
                </button>
              </td>
            </tr>
            <tr className="  ">
              <th className="py-4">
                <div className="border-[0.84px] border-[#7C74D4] h-9 w-9 flex justify-center   rounded-[5.06px] border-dashed p-2">
                  <Image
                    alt="vehicle icon"
                    src="/icons/vehicle.svg"
                    width={100}
                    height={100}
                  />
                </div>
              </th>
              <td className="px-8">
                <span className="font-bold text-base">$11,500</span>
                <p className="text-[#929292] text-[10px]">Claim Status</p>
              </td>
              <td className="">
                <button className="bg-[#D3F3D4] border-2 border-[#D3F3D4] w-24 px-2 py-1 rounded-full">
                  Approved
                </button>
              </td>
            </tr>
            <tr className="">
              <th className="py-4">
                <div className="border-[0.84px] border-[#000000] h-9 w-9 flex justify-center   rounded-[5.06px] border-dashed p-[5px]">
                  <PropertyIcon />
                </div>
              </th>
              <td className="px-8">
                <span className="font-bold text-base">$60,000</span>
                <p className="text-[#929292] text-[10px]">Claim Status</p>
              </td>
              <td className="">
                <button className="bg-[#FFFDCB] border-2 border-[#FFFDCB] w-24 px-2 py-1 rounded-full">
                  Pending
                </button>
              </td>
            </tr>
            <tr className="">
              <th className="py-4">
                <div className="border-[0.84px] border-[#008000] h-9 w-9   rounded-[5.06px] border-dashed p-1 flex justify-center">
                  <CropIcon />
                </div>
              </th>
              <td className="px-8">
                <span className="font-bold text-base">$70,400</span>
                <p className="text-[#929292] text-[10px]">Claim Status</p>
              </td>
              <td className="">
                <button className="bg-[#D3F3D4] border-2 border-[#D3F3D4] w-24 px-2 py-1 rounded-full">
                  Paid
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PolicyClaimCard;
