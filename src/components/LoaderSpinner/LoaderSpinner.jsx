import { InsureFiContext } from "@/context/InsureFiContext";
import React, { useContext } from "react";

export const LoaderSpinner = () => {
  const { loading } = useContext(InsureFiContext);
  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="animate-spin h-20 w-20 border-t-8 border-green-500 rounded-full"></div>
        </div>
      )}
    </>
  );
};
