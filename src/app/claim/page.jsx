"use client";

import Button from "@/components/Button/Button";
import DropZone from "@/components/DropZone/DropZone";
import Input from "@/components/Input/Input";
import { InsureFiContext } from "@/context/InsureFiContext";
import { useContext, useState } from "react";

const PropertyInsurance = () => {
  const { uploadToIPFS } = useContext(InsureFiContext);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  return (
    <div className="px-4">
      <div>
        <h2 className="pt-3 leading-3 text-xl font-bold">File A Claim</h2>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center ">
          <div className="max-w-5xl ">
            <div className="w-full">
              <div className="flex justify-between w-full">
                <div className="w-96">
                  <div className="pt-3">
                    {/*<h3 className="font-semibold text-lg">*/}
                    {/*    Policy ID*/}
                    {/*</h3>*/}
                    <Input
                      name="Policy ID"
                      placeholder="Enter Policy ID"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-5xl ">
            <div className="w-full">
              <div className="flex justify-between w-full">
                <div className="w-96">
                  <div className="pt-3">
                    <Input
                      name="Claim Amount"
                      placeholder="Enter Claim Amount"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-5xl ">
            <div className="w-full">
              <div className="flex justify-between w-full">
                <div className="w-96">
                  <div className="pt-3">
                    <label className=" text-base ">Claim Details</label>
                    <textarea
                      name="Claim Details"
                      id="1"
                      cols="30"
                      rows="6"
                      placeholder="Claim Details "
                      className="w-full h-36 rounded-md border border-[#D9D9D9] p-2"
                      //   onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full  ">
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

      <div>
        <Button
          btnName="Submit Claim"
          handleClick={() => console.log("Working")}
        />
      </div>
    </div>
  );
};

export default PropertyInsurance;
