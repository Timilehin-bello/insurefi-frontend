"use client";

import React, { useContext, useState } from "react";
import DropZone from "../DropZone/DropZone";
import { InsureFiContext } from "@/context/InsureFiContext";
import Input from "../Input/Input";
import Radio from "../Radio/Radio";
import PremiumPaymentTable from "@/components/PremiumPaymentTable/PremiumPaymentTable";
import {ConfirmIcon} from "../../../public/icons/confirm";
import Button from "@/components/Button/Button";
import Stepper from "../Stepper/Stepper";


const PropertyApplication = ({
      currentStep,
      complete,
      setComplete,
      steps,
      setCurrentStep,
    }
) => {
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [propertyAge, setPropertyAge] = useState();
  const [propertyType, setPropertyType] = useState();
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [priceAmount, setPriceAmount] = useState("");
  const [coverageType, setCoverageType] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const handleCoverageTypeChange = (event) => {
    console.log(event.target.value);
    setCoverageType(event.target.value);
  };



  const {
    uploadToIPFS,
    generatePropertyPremium,
    propertyPolicyId,
      propertyPriceValue,
    initiatePropertyPolicy,
    address,
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

  const handlePropertyInsuranceApplication = async (
      location,
      propertyType,
      age,
      priceAmount,
      protections,
      imageUrl
  ) => {
    let resultGenerated;

    console.log(location,
        propertyType,
        age,
        priceAmount,
        protections,
        imageUrl)

    if (currentStep === 1) {
      resultGenerated = await generatePropertyPremium(
          location,
          propertyType,
          age,
          priceAmount,
          protections,
          imageUrl
      );
    } else if (currentStep !== 1) {
      resultGenerated = await initiatePropertyPolicy();
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
        {currentStep === 1 && (
    <div>
      <div className="w-full">
        <div className="flex justify-between w-full">
          <div className="w-96">
            <div className="pt-3">
              <h3 className="font-semibold text-lg">Property Information</h3>
              <Input
                  value={propertyAge}
                  handleChange={(event) => setPropertyAge(event.target.value)}
                  handleClear={() => setPropertyAge("")}
                  name="Property Age"
                  placeholder="0"
                  type="number"
              />
              <Input
                  value={priceAmount}
                  handleChange={(event) => setPriceAmount(event.target.value)}
                  handleClear={() => setPriceAmount("")}
                  name="Property Value"
                  placeholder="0"
                  type="number"
              />
            </div>
          </div>
          <div className="pt-4">
            <div>
              <div className="flex gap-4">
                <h3 className="font-semibold text-lg">Property Location</h3>
                <h3 className="font-semibold text-lg">Property Type</h3>
              </div>
              <div className="flex justify-between">
                <Radio
                  options={["Urban", "Suburban", "Rural"]}
                  selectedOption={location}
                  setSelectedOption={setLocation}
                />
                <Radio
                  options={["Residential", "Commercial", "Industrial"]}
                  selectedOption={propertyType}
                  setSelectedOption={setPropertyType}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-lg ">Protection</h3>
      <div className="flex gap-8 items-center py-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <input
              id="default-checkbox-1"
              type="checkbox"
              value="p1"
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 checkbox"
            />
            <label
              htmlFor="default-checkbox-1"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Fire Alarm
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="default-checkbox-2"
              type="checkbox"
              value="p2"
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 checkbox"
            />
            <label
              htmlFor="default-checkbox-2"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Security System
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <input
              id="default-checkbox-3"
              type="checkbox"
              value="p3"
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 checkbox"
            />
            <label
              htmlFor="default-checkbox-3"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Storm Shutters
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="default-checkbox-4"
              type="checkbox"
              value="p4"
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 checkbox"
            />
            <label
              htmlFor="default-checkbox-4"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              ReinForced Construction
            </label>
          </div>
        </div>
      </div>
      <div className="w-full">
        <DropZone
          title="Supported htmlFormates: JPEG, PNG"
          heading="Drag & drop file or browse"
          subHeading="or Browse"
          name={name}
          description={description}
          setImageUrl={setImageUrl}
          uploadToIPFS={uploadToIPFS}
          price={price}
        />
      </div>
    </div>
        )}
      {currentStep === 2 && !complete && (
          <PremiumPaymentTable policyId={propertyPolicyId} price={propertyPriceValue} />
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
                    handlePropertyInsuranceApplication(
                        location,
                        propertyType,
                        propertyAge,
                        priceAmount,
                        selectedCheckboxes,
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

export default PropertyApplication;
