"use client";
import PropertyApplication from "@/components/PropertyApplication/PropertyApplication";
import Stepper from "@/components/Stepper/Stepper";
import { useState } from "react";

const PropertyInsurance = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  return (
    <div className="px-4">
      <div>
        <h2 className="pt-3 leading-3 text-xl font-medium">
          Property Insurance Application
        </h2>
      </div>
      <div className="max-w-5xl my-5">
        <Stepper
          cuurrentStep={currentStep}
          complete={complete}
          setComplete={setComplete}
          setStep={setCurrentStep}
        >
          <PropertyApplication />
        </Stepper>
      </div>
    </div>
  );
};

export default PropertyInsurance;
