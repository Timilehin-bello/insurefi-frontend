"use client";

import React, { useContext, useState } from "react";
import Input from "../Input/Input";
import Radio from "../Radio/Radio";
import DropZone from "../DropZone/DropZone";
import { InsureFiContext } from "@/context/InsureFiContext";

const AutomobileApplication = () => {
  const { uploadToIPFS } = useContext(InsureFiContext);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  return (
    <div className="w-full">
      <div className="flex justify-between w-full">
        <div className="w-96">
          <div className="pt-3">
            <h3 className="font-semibold text-lg">Personal InhtmlFormation</h3>
            <Input name="Name" placeholder="Full Name" type="text" />
            <div className="flex gap-4">
              <Input name="Age" placeholder="0" type="number" />
              <Input name="Drivers ID" placeholder="0" type="number" />
            </div>
          </div>
          <div className="pt-4">
            <h3 className="font-semibold text-lg">Driving History</h3>
            <div className="flex gap-4">
              <Input name="Accidents" placeholder="0" type="number" />
              <Input name="Violations" placeholder="0" type="number" />
            </div>
          </div>
        </div>
        <div className="pt-4">
          <div>
            <h3 className="font-semibold text-lg">Vehicle Category</h3>
            <div className="flex justify-between">
              <Radio options={["Commercial", "Economy", "Mid-Range"]} />
              <Radio options={["Luxery", "Sports", "SUV"]} />
            </div>
            <div className="flex gap-6 pl-4">
              <Input name="Car Age" placeholder="0" type="number" />
              <Input name="Millage" placeholder="0" type="number" />
            </div>
            <div className="flex  gap-6 pl-4">
              <Input name="Plate No." placeholder="0" type="number" />
              <Input name="Value($)" placeholder="0" type="number" />
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
                value="USA"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
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
                value="Germany"
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
                value="Spain"
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
                value="United Kingdom"
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
            value=""
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
            value=""
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
            value=""
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
            value=""
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
          name={name}
          description={description}
          setImage={setImage}
          uploadToIPFS={uploadToIPFS}
          price={price}
        />
      </div>
    </div>
  );
};

export default AutomobileApplication;
