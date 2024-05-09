"use client";
import PropertyApplication from "@/components/PropertyApplication/PropertyApplication";
import Input from "@/components/Input/Input";
import PremiumPaymentTable from "@/components/PremiumPaymentTable/PremiumPaymentTable";
import Radio from "@/components/Radio/Radio";
import Stepper from "@/components/Stepper/Stepper";
import { useContext, useState } from "react";
import { InsureFiContext } from "@/context/InsureFiContext";

const PropertyInsurance = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
    const steps = ["Application", "Premium Payment", "Confirm"];
  return (
    <div className="px-4">
      <div>
        <h2 className="pt-3 leading-3 text-xl font-medium">
          Property Insurance Application
        </h2>
      </div>
      <div className="max-w-5xl my-5">
        <PropertyApplication
            currentStep={currentStep}
            complete={complete}
            setComplete={setComplete}
            steps={steps}
            setCurrentStep={setCurrentStep}
        />
      </div>
    </div>
  );
};

export default PropertyInsurance;
