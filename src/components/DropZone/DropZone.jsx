"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const DropZone = ({
  title,
  heading,
  subHeading,
  name,
  description,
  uploadToIPFS,
  setImage,
  price,
}) => {
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback(async (acceptedFile) => {
    const url = await uploadToIPFS(acceptedFile[0]);
    setFileUrl(url);
    setImage(url);
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png", ".jpg"] },
    maxSize: 5000000,
  });
  return (
    <div className="grid grid-cols-3 gap-10 ">
      <div
        className="col-span-2 border-2 cursor-pointer border-dashed rounded-2xl h-52 border-[#FFC0CBE5] flex items-center justify-center p-4"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className=" flex flex-col text-center items-center justify-center">
          <div className="p-4">
            <Image
              src={"/images/upload.svg"}
              alt="upload"
              width={60}
              height={60}
              objectFit="contain"
              className="w-auto h-auto"
            />
          </div>
          <span className="text-base text-[#454545] font-bold">
            {heading} <span className="text-[#FFC0CB]">{subHeading}</span>
          </span>

          <p className="text-[#676767] text-xs">{title}</p>
        </div>
      </div>

      {fileUrl && (
        <aside className="">
          <div className="">
            <Image src={fileUrl} alt="nft image" width={200} height={200} />

            {/* <div className="">
              <div>
                <p>
                  <span>NFT Name:</span>
                  {name || ""}
                </p>
              </div>

              <div>
                <p>
                  <span>Description</span>
                  {description || ""}
                </p>
                <p>
                  <span>Price</span>
                  {price || ""}
                </p>
              </div>
            </div> */}
          </div>
        </aside>
      )}
    </div>
  );
};

export default DropZone;
