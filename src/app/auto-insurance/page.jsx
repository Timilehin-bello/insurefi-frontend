"use client";

import AutomobileApplication from "@/components/AutomobileApplication/AutomobileApplication";
import Input from "@/components/Input/Input";
import Radio from "@/components/Radio/Radio";
import Stepper from "@/components/Stepper/Stepper";
import { useState } from "react";

const AutoInsurance = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const steps = ["Application", "Premium", "Payment", "Confirm"];

  return (
    <div className="px-4">
      <div>
        <h2 className="pt-3 leading-3 text-xl font-medium">
          Automobile Insurance Application
        </h2>
      </div>
      <div className="max-w-6xl my-5">
        {currentStep === 1 ? (
          <AutomobileApplication
            currentStep={currentStep}
            complete={complete}
            setComplete={setComplete}
            steps={steps}
            setCurrentStep={setCurrentStep}
          />
        ) : (
          <div>Testing</div>
        )}
      </div>
    </div>
  );
};

export default AutoInsurance;
