// Table.jsx
import React from "react";
import PremiumTable from "@/components/Table/premiumtable";

function PremiumPaymentTable({ policyId, price }) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Policy ID
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">{policyId}</td>
            <td className="px-6 py-4">{price}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PremiumPaymentTable;
