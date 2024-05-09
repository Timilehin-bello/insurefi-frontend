"use client";

import Button from "@/components/Button/Button";
import DropZone from "@/components/DropZone/DropZone";
import Input from "@/components/Input/Input";
import { LoaderSpinner } from "@/components/LoaderSpinner/LoaderSpinner";
import { InsureFiContext } from "@/context/InsureFiContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const PropertyInsurance = () => {
  const [claimAmount, setClaimAmount] = useState("");
  const [claimDetails, setClaimDetails] = useState("");
  const [claimPolicyId, setClaimPolicyId] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const router = useRouter();

  const { uploadToIPFS, fileAutomobileClaim } = useContext(InsureFiContext);

  return (
    <div className="px-4">
      <LoaderSpinner />
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
                      value={claimPolicyId}
                      name="Policy ID"
                      placeholder="Enter Policy ID"
                      type="number"
                      handleChange={(e) => setClaimPolicyId(e.target.value)}
                      handleClear={() => setClaimPolicyId("")}
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
                      value={claimAmount}
                      name="Claim Amount"
                      placeholder="Enter Claim Amount"
                      type="number"
                      handleChange={(e) => setClaimAmount(e.target.value)}
                      handleClear={() => setClaimAmount("")}
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
                      value={claimDetails}
                      id="1"
                      cols="30"
                      rows="6"
                      placeholder="Claim Details "
                      className="w-full h-36 rounded-md border border-[#D9D9D9] p-2"
                      onChange={(e) => setClaimDetails(e.target.value)}
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
          uploadToIPFS={uploadToIPFS}
          setImageUrl={setImageUrl}
        />
      </div>

      <div>
        <Button
          btnName="Submit Claim"
          handleClick={() =>
            fileAutomobileClaim(
              claimPolicyId,
              claimAmount,
              claimDetails,
              imageUrl,
              router
            )
          }
        />
      </div>
    </div>
  );
};

export default PropertyInsurance;
