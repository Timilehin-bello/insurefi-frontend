"use client";

import InsuranceCard from "@/components/InsuranceCard/InsuranceCard";
import { GraphIcon } from "../../public/icons/graph";
import PolicyClaimCard from "@/components/PolicyClaimCard/PolicyClaimCard";
import SimpleLineChat from "@/components/SimpleLineChart/SimpleLineChart";
import Link from "next/link";
import { InsureFiContext } from "@/context/InsureFiContext";
import { useContext, useState } from "react";

export default function Home() {
  const [getAllClaims, setGetAllClaims] = useState([]);
  // const { getAllAutomobileClaim, isConnected } = useContext(InsureFiContext);

  // const getAllAutomobileClaims = async () => {

  // };
  // useEffect(() => {
  //   if (!isConnected) return;
  //   getAllAutomobileClaim().then((res) => {
  //     setGetAllClaims(res);

  //     // const [...data] = res;
  //     console.log("res", res, typeof res);
  //     console.log("testres", res[0], typeof res[0][0], res[0][1]);
  //     // console.log("resLength", res.length);
  //     // res.forEach((item) => setGetAllClaims((prev) => [...prev, item]));

  //     // console.log("data", data);
  //   });
  // }, [isConnected]);
  return (
    <div>
      <div className="p-4  border-gray-200  rounded-lg ">
        <div className="mb-4">
          <span className=" text-[20.24px] font-medium text-black">
            Available Insurances
          </span>

          <h1 className="text-green-500">{getAllClaims[0]}</h1>
          <h1 className="text-red-500">{getAllClaims[1]}</h1>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <Link href={"/auto-insurance"}>
            <InsuranceCard
              src="/icons/vehicle.svg"
              alt="vehicle"
              insuranceType={"Auto"}
              numberOfInsured={`2380 Cars`}
              totalAmount={`$45,789`}
              textColor="text-white"
              bgColor="bg-black"
            />
          </Link>
          <Link href={"/property-insurance"}>
            <InsuranceCard
              src="/icons/property.svg"
              alt="property"
              insuranceType={"Property"}
              numberOfInsured={`380 Properties`}
              totalAmount={`$109,789`}
              bgColor="bg-white"
              textColor="text-black"
            />
          </Link>

          <div
            className={` p-6 bg-white flex flex-col items-center w-72 rounded-[16.87px] shadow space-y-10`}
          >
            <div className="flex gap-2 items-center ">
              {/* <CarIcon /> */}

              {/* <Image
                src={src}
                width={20}
                height={20}
                alt={}
                className={` h-10    mb-6`}
              /> */}

              <div className="w-[115.55px]">
                <Link href={"/proposals"}>
                  <button className="bg-white w-full text-black border border-[#C9C5C5] p-2 rounded-full font-bold ">
                    Proposals
                  </button>
                </Link>
              </div>
            </div>

            <p
              className={`mb-2 text-[13.49px] text-center font-semibold tracking-tight text-[#2C2C2C]`}
            >
              View all active proposals and contribute to the DAO.
            </p>

            {/* <p className={`mb-3 font-normal text-black text-[12.65px]`}>
              {32} Claim Pool
            </p> */}
          </div>
        </div>
        <div className="mb-4">
          <span className=" text-[20.24px] font-medium text-black">
            InsureFI Statistics
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4 ">
          <div className="flex flex-col p-8 col-span-2  rounded-[21.09px] bg-white h-auto ">
            {/* <div className="flex gap-16 ">
              <div className="flex  gap-1    ">
                <span className="text-[16.87px] text-[#FF0B0B]">
                  <GraphIcon />
                </span>

                <span className="text-[16.87px] text-black ">Claims</span>
              </div>
              <div className="flex  gap-1  ">
                <span className="text-[16.87px] text-[#287D00]">
                  <GraphIcon />
                </span>

                <span className="text-[16.87px] text-black ">Policies</span>
              </div>
            </div> */}
            <div className="flex gap-20  px-10 py-4">
              <div className="flex gap-1">
                <span className="text-[#FF0B0B]">
                  <GraphIcon />
                </span>
                <span className="text-base">Claims</span>
              </div>
              <div className="flex gap-1">
                <span className="text-[16.87px] text-[#287D00]">
                  <GraphIcon />
                </span>
                <span className="text-base">Policies</span>
              </div>
            </div>
            <SimpleLineChat />
          </div>

          <PolicyClaimCard />
        </div>
      </div>
    </div>
  );
}
