"use client";

import React, { useContext, useState } from "react";
import DropZone from "../DropZone/DropZone";
import { InsureFiContext } from "@/context/InsureFiContext";
import Input from "../Input/Input";
import Radio from "../Radio/Radio";

const PropertyApplication = () => {
  const { uploadToIPFS } = useContext(InsureFiContext);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  return (
    <div>
      <div className="w-full">
        <div className="flex justify-between w-full">
          <div className="w-96">
            <div className="pt-3">
              <h3 className="font-semibold text-lg">
                Personal InhtmlFormation
              </h3>
              <Input name="Name" placeholder="Full Name" type="text" />
            </div>
          </div>
          <div className="pt-4">
            <div>
              <div className="flex gap-4">
                <h3 className="font-semibold text-lg">Property Location</h3>
                <h3 className="font-semibold text-lg">Property Location</h3>
              </div>
              <div className="flex justify-between">
                <Radio options={["Urban", "Suburban", "Rural"]} />
                <Radio options={["Residential", "Commercial", "Industrial"]} />
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
              value=""
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
              value=""
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
              value=""
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
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 checkbox"
            />
            <label
              htmlFor="default-checkbox-4"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              ReinhtmlForced Construction
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
          setImage={setImage}
          uploadToIPFS={uploadToIPFS}
          price={price}
        />
      </div>
    </div>
  );
};

export default PropertyApplication;
