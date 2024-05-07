// Table.jsx
import React from 'react';
import PremiumTable from "@/components/Table/premiumtable";
import PremiumPayment from "@/components/PremiumPayment/PremiumPayment";

function Premium({policyId, price}) {
    const data = [
        { policyID: "1", insuranceType: "Auto", premium: "$100", expiryDate: "01/01/2024" },
        { policyID: "2", insuranceType: "Health", premium: "$200", expiryDate: "01/01/2044" },
        //...more data here
    ];

    return (


        <div className="relative overflow-x-auto">
            <PremiumPayment policyId={'1'} price={'$1000'}/>
        </div>

    );
}

export default Premium;