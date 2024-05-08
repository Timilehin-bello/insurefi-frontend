"use client";
import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import Button from "../Button/Button";
const Stepper = ({ children, currentStep, complete, steps }) => {
  return (
    <>
      <div className="flex justify-center max-w-4xl  items-center py-4 px-2 m-auto">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-[#5E5E5E]">{step}</p>
          </div>
        ))}
      </div>

      {children}
      {/* <div className="flex justify-center py-5">
        {!complete && (
          <Button
            handleClick={() => {
              currentStep === steps.length - 1
                ? setComplete(true)
                : setCurrentStep((prev) => prev + 1);
            }}
            btnName={
              currentStep === steps.length - 1
                ? "Proceed To Payment"
                : "Upload Files"
            }
          />
        )}
      </div> */}
    </>
  );
};

export default Stepper;
