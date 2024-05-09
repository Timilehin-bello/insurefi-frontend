"use client";

import React, { useContext, useState } from "react";
import Input from "../Input/Input";
import Radio from "../Radio/Radio";
import DropZone from "../DropZone/DropZone";
import { InsureFiContext } from "@/context/InsureFiContext";
import Button from "../Button/Button";
import Stepper from "../Stepper/Stepper";
import PremiumPaymentTable from "../PremiumPaymentTable/PremiumPaymentTable";
import { ConfirmIcon } from "../../../public/icons/confirm";
import { LoaderSpinner } from "../LoaderSpinner/LoaderSpinner";

const AutomobileApplication = ({
  currentStep,
  complete,
  setComplete,
  steps,
  setCurrentStep,
}) => {
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [value, setValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [driverAge, setDriverAge] = useState("");
  const [driverId, setDriverId] = useState("");
  const [accident, setAccident] = useState("");
  const [violation, setViolation] = useState("");
  const [carAge, setCarAge] = useState("");
  const [milleage, setMilleage] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [priceAmount, setPriceAmount] = useState("");
  const [coverageType, setCoverageType] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const handleCoverageTypeChange = (event) => {
    console.log(event.target.value);
    setCoverageType(event.target.value);
  };

  const {
    uploadToIPFS,
    generateAutomobilePremium,
    policyId,
    priceValue,
    initiateAutomobilePolicy,
  } = useContext(InsureFiContext);

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    const isChecked = selectedCheckboxes.includes(value);

    if (isChecked) {
      // If already checked, remove from selected checkboxes
      setSelectedCheckboxes(
        selectedCheckboxes.filter((checkbox) => checkbox !== value)
      );
    } else {
      // If not checked, add to selected checkboxes
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    }

    console.log("selected checkboxes", selectedCheckboxes);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClear = () => {
    setValue("");
  };

  const handleAutomobileInsuranceApplication = async (
    driverAge,
    accident,
    violation,
    selectedOption,
    carAge,
    milleage,
    selectedCheckboxes,
    coverageType,
    priceAmount,
    imageUrl
  ) => {
    let resultGenerated;

    if (currentStep === 1) {
      resultGenerated = await generateAutomobilePremium(
        driverAge,
        accident,
        violation,
        selectedOption,
        carAge,
        milleage,
        selectedCheckboxes,
        coverageType,
        priceAmount,
        imageUrl
      );
    } else if (currentStep !== 1) {
      resultGenerated = await initiateAutomobilePolicy();
    }

    console.log("resultGenerated", resultGenerated);
    if (resultGenerated) {
      console.log("current step: ", currentStep);
      if (currentStep === steps.length - 1) {
        setComplete(true);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      console.log("not working");
    }
  };

  return (
    <Stepper currentStep={currentStep} complete={complete} steps={steps}>
    <LoaderSpinner />
      {currentStep === 1 && (
        <div className="w-full">
          <div className="flex justify-between w-full">
            <div className="w-96">
              <div className="pt-3">
                <h3 className="font-semibold text-lg">Personal Information</h3>
                {/* <Input
                name="Name"
                placeholder="Full Name"
                type="text"
                value={value}
                handleChange={handleChange}
                handleClear={handleClear}
              /> */}
                <div className="flex gap-4">
                  <Input
                    value={driverAge}
                    handleChange={(event) => setDriverAge(event.target.value)}
                    handleClear={() => setDriverAge("")}
                    name="Drivers Age"
                    placeholder="0"
                    type="number"
                  />
                  <Input
                    value={driverId}
                    handleChange={(event) => setDriverId(event.target.value)}
                    handleClear={() => setDriverId("")}
                    name="Drivers ID"
                    placeholder="0"
                    type="number"
                  />
                </div>
              </div>
              <div className="pt-4">
                <h3 className="font-semibold text-lg">Driving History</h3>
                <div className="flex gap-4">
                  <Input
                    value={accident}
                    handleChange={(event) => setAccident(event.target.value)}
                    handleClear={() => setAccident("")}
                    name="Accidents"
                    placeholder="0"
                    type="number"
                  />
                  <Input
                    value={violation}
                    handleChange={(event) => setViolation(event.target.value)}
                    handleClear={() => setViolation("")}
                    name="Violations"
                    placeholder="0"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className="pt-4">
              <div>
                <h3 className="font-semibold text-lg">Vehicle Category</h3>
                <div className="flex justify-between">
                  <Radio
                    options={["Commercial", "Economy", "Mid-Range"]}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                  />
                  <Radio
                    options={["Luxury", "Sports", "SUV"]}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                  />
                </div>
                <div className="flex gap-6 pl-4">
                  <Input
                    value={carAge}
                    handleChange={(event) => setCarAge(event.target.value)}
                    handleClear={() => setCarAge("")}
                    name="Car Age"
                    placeholder="0"
                    type="number"
                  />
                  <Input
                    value={milleage}
                    handleChange={(event) => setMilleage(event.target.value)}
                    handleClear={() => setMilleage("")}
                    name="Milleage"
                    placeholder="0"
                    type="number"
                  />
                </div>
                <div className="flex  gap-6 pl-4">
                  <Input
                    value={plateNumber}
                    handleChange={(event) => setPlateNumber(event.target.value)}
                    handleClear={() => setPlateNumber("")}
                    name="Plate No."
                    placeholder="0"
                    type="number"
                  />
                  <Input
                    value={priceAmount}
                    handleChange={(event) => setPriceAmount(event.target.value)}
                    handleClear={() => setPriceAmount("")}
                    name="Price Amount"
                    placeholder="0"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <fieldset>
              <h3 className="font-semibold text-lg py-4">Coverage Type</h3>
              <legend className="sr-only">Coverage Type</legend>
              <div className="flex gap-8">
                <div className="flex items-center mb-4 cursor-pointer">
                  <input
                    id="coverage-type-1"
                    type="radio"
                    name="coverage-type"
                    value="ct1"
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleCoverageTypeChange}
                  />
                  <label
                    htmlFor="coverage-type-1"
                    className="block ms-2  text-base font-medium text-[#333333] cursor-pointer "
                  >
                    Comprehensive Insurance
                  </label>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    id="coverage-type-2"
                    type="radio"
                    name="coverage-type"
                    value="ct2"
                    onChange={handleCoverageTypeChange}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="coverage-type-2"
                    className="block ms-2 text-base font-medium text-[#333333] cursor-pointer"
                  >
                    Collision Insurance
                  </label>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    id="coverage-type-3"
                    type="radio"
                    name="coverage-type"
                    value="ct3"
                    onChange={handleCoverageTypeChange}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="coverage-type-3"
                    className="block ms-2 text-base font-medium text-[#333333] cursor-pointer "
                  >
                    Liability Insurance
                  </label>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    id="coverage-type-4"
                    type="radio"
                    name="coverage-type"
                    value="ct4"
                    onChange={handleCoverageTypeChange}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="coverage-type-4"
                    className="block ms-2 text-base font-medium text-[#333333] cursor-pointer "
                  >
                    Personal Injuries Protection
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
          <h3 className="font-semibold text-lg ">Safety Features</h3>
          <div className="flex gap-8 items-center py-4">
            <div className="flex items-center">
              <input
                id="default-checkbox-1"
                type="checkbox"
                value="sf1"
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 checkbox"
              />
              <label
                htmlFor="default-checkbox-1"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Advanced safety features
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="default-checkbox-2"
                type="checkbox"
                value="sf2"
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 checkbox"
              />
              <label
                htmlFor="default-checkbox-2"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Anti-theft system
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="default-checkbox-3"
                type="checkbox"
                value="sf3"
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 checkbox"
              />
              <label
                htmlFor="default-checkbox-3"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Parking sensors
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="default-checkbox-4"
                type="checkbox"
                value="sf4"
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 checkbox"
              />
              <label
                htmlFor="default-checkbox-4"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Blind spot monitoring
              </label>
            </div>
          </div>
          <div className="w-full">
            <DropZone
              title="Supported htmlFormates: JPEG, PNG"
              heading="Drag & drop file or browse"
              subHeading="or Browse"
              uploadToIPFS={uploadToIPFS}
              setImageUrl={setImageUrl}
            />
          </div>
        </div>
      )}
      {currentStep === 2 && !complete && (
        <PremiumPaymentTable policyId={policyId} price={priceValue} />
      )}

      {complete && (
        <div className="flex h-screen items-center justify-center">
          <ConfirmIcon />
        </div>
      )}

      <div className="flex justify-center py-5">
        {!complete && (
          <Button
            handleClick={() =>
              handleAutomobileInsuranceApplication(
                driverAge,
                accident,
                violation,
                selectedOption,
                carAge,
                milleage,
                selectedCheckboxes,
                coverageType,
                priceAmount,
                imageUrl
              )
            }
            btnName={
              currentStep === steps.length - 1
                ? "Proceed To Payment"
                : currentStep === 2
                ? "Proceed To Payment"
                : "Upload Files"
            }
          />
        )}
      </div>
    </Stepper>
  );
};

export default AutomobileApplication;
