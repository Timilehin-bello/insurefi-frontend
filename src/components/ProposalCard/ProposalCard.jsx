import React from "react";
import { formatEther } from "ethers";

const ProposalCard = ({ getAllClaims, setGetClaimId, openModal }) => {
  const convertWeiToEther = (wei) => {
    return formatEther(wei);
  };

  const handleClick = (value, id) => {
    setGetClaimId(id);
    openModal(value);
    console.log("id", id, "value", value);
  };

  return (
    <div className="">
      {/* overflow-x-auto */}
      <table className="w-full text-sm text-left rounded-xl shadow-lg bg-white">
        <thead className="text-xs text-gray-700 uppercase ">
          <tr className="">
            <th className="p-6" scope="col">
              Claim ID
            </th>
            {getAllClaims.length > 0 &&
              Object.keys(getAllClaims[0]).map((key, index) =>
                key === "0" ? (
                  <th key={key} className="p-6" scope="col">
                    Policy ID
                  </th>
                ) : (
                  <th key={key} className="p-6" scope="col">
                    {key === "1"
                      ? "Address"
                      : key === "2"
                      ? "Claim Amount"
                      : key === "3"
                      ? "Claim Details"
                      : key === "5"
                      ? "Status"
                      : "View Image"}
                  </th>
                )
              )}
          </tr>
        </thead>
        <tbody>
          {getAllClaims.map((item, key) => (
            <tr key={key} className="border-b">
              <td className="p-6">{key}</td>
              {Object.keys(item).map((innerKey) => {
                if (innerKey === "2") {
                  return (
                    <td key={innerKey} className="p-6">
                      {convertWeiToEther(item[innerKey])}
                    </td>
                  );
                } else if (innerKey === "5") {
                  return (
                    <td key={innerKey} className="p-6">
                      {item[innerKey].toString() === "0"
                        ? "Active"
                        : "Inactive"}
                    </td>
                  );
                } else if (innerKey === "4") {
                  return (
                    <td
                      key={innerKey}
                      className="p-6 cursor-pointer"
                      onClick={() => {
                        handleClick(item[innerKey], key);
                      }}
                    >
                      <button className="bg-[#FF7327] text-white  cursor-pointer rounded-md w-24  font-semibold text-sm  px-3 py-1 hover:animate-pulse transition-all duration-300">
                        View
                      </button>
                    </td>
                  );
                } else {
                  return (
                    <td key={innerKey} className="p-6">
                      {typeof item[innerKey] === "bigint"
                        ? item[innerKey].toString()
                        : item[innerKey]}
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProposalCard;
