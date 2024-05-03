import React from "react";

import Image from "next/image";

const NavBar = () => {
  return (
    <nav className="bg-[#FAF8F8] px-6 mb-3">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex gap-10">
            <div className="flex gap-2 text-black items-center">
              <Image
                width={24}
                height={24}
                src={`/icons/calender2.svg`}
                alt="icon"
                className="w-6 h-6"
              />

              <h3 className="font-sans font-bold text-lg">2 September</h3>
            </div>

            <div className=" flex gap-4 text-black items-center px-5 py-2 bg-white rounded-full">
              <div className="bg-[#f86f0c] rounded-full w-12 h-12 flex items-center justify-center">
                <Image
                  width={32}
                  height={32}
                  src={`/icons/insure.svg`}
                  alt="icon"
                  className="w-8 h-8 text-gray-500 transition duration-75 group-hover:text-gray-900 "
                />
              </div>
              <h3 className="font-sans font-base textlg">
                Active Policies <br />
                <span className="font-extrabold">+120</span>
              </h3>
            </div>

            <div className=" flex gap-4 items-center">
              <div className="bg-[#7c74d4] rounded-full w-12 h-12 flex items-center justify-center">
                <Image
                  width={20}
                  height={20}
                  src={`/images/car.png`}
                  alt="icon"
                  className="w-5 h-5"
                />
              </div>
              <div className="bg-[#fe3a3a] rounded-full w-12 h-12 flex items-center justify-center">
                <Image
                  width={20}
                  height={20}
                  src={`/images/pill.png`}
                  alt="icon"
                  className="w-5 h-5"
                />
              </div>
              <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center">
                <Image
                  width={16}
                  height={16}
                  src={`/icons/plus.svg`}
                  alt="icon"
                  className="w-4 h-4"
                />
              </div>
              <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center">
                <Image
                  width={20}
                  height={20}
                  src={`/images/bell.png`}
                  alt="icon"
                  className="w-5 h-5"
                />
              </div>
            </div>
          </div>

          <div className="flex text-sm">
            <w3m-button />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
