// premiumTable.jsx
import React from 'react';

function PremiumTable({ data }) {
    return (
        <tr className="flex flex-row w-full">
            <td className="p-2 border border-gray-300">{data.policyID}</td>
            <td className="p-2 border border-gray-300">{data.insuranceType}</td>
            <td className="p-2 border border-gray-300">{data.premium}</td>
            <td className="p-2 border border-gray-300">{data.expiryDate}</td>
        </tr>
    );
}

export default PremiumTable;


// // Table.jsx
// import React from 'react';
// import PremiumTable from './premiumTable';
//
// function Table() {
//     const data = [
//         { policyID: "1", insuranceType: "Auto", premium: "$100", expiryDate: "01/01/2024" },
//         { policyID: "2", insuranceType: "Health", premium: "$200", expiryDate: "01/01/2044" },
//         //...more data here
//     ];
//
//     return (
//         <table className="flex flex-row flex-wrap mb-10 mt-10 border-collapse border-2 border-gray-500 w-full">
//             <thead className="flex flex-row text-white p-3 bg-blue-500 w-full">
//             <th className="p-2 border border-gray-300">Policy ID</th>
//             <th className="p-2 border border-gray-300">Insurance Type</th>
//             <th className="p-2 border border-gray-300">Premium</th>
//             <th className="p-2 border border-gray-300">Expiry Date</th>
//             </thead>
//             <tbody className="flex flex-row flex-wrap w-full">
//             {data.map((d, index) => (
//                 <PremiumTable key={index} data={d} />
//             ))}
//             </tbody>
//         </table>
//     );
// }
//
// export default Table;