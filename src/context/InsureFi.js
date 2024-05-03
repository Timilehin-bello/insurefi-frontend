"use client";

import React from "react";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import config from "../config/config.json";
import insureFiAutomobileABI from "../config/InsureFiAutomobile.json";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { toast } from "react-toastify";

export const InsureFiContext = React.createContext();

export const InsureFiProvider = ({ children }) => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const fetchContract = async (signerOrProvider) => {
    const insureFiAutomobileConfig = config[chainId].insureFiAutomobile;
    const insureFiAutomobileContract = new Contract(
      insureFiAutomobileConfig.address,
      insureFiAutomobileABI,
      signerOrProvider
    );
    return insureFiAutomobileContract;
  };

  const generateAutomobilePremium = async (
    policyHolder,
    driverAge,
    accidents,
    vehicleCategory,
    vehicleAge,
    mileage,
    safetyFeatures,
    coverageType,
    vehicleValue,
    router
  ) => {
    if (
      !policyHolder ||
      !driverAge ||
      !accidents ||
      !vehicleCategory ||
      !vehicleAge ||
      !mileage ||
      !safetyFeatures ||
      !coverageType ||
      !vehicleValue
    )
      return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      policyHolder,
      driverAge,
      accidents,
      vehicleCategory,
      vehicleAge,
      mileage,
      safetyFeatures,
      coverageType,
      vehicleValue,
    });

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const contract = await fetchContract(signer);

      const transaction = await contract.generatePremium(
        policyHolder,
        driverAge,
        accidents,
        vehicleCategory,
        vehicleAge,
        mileage,
        safetyFeatures,
        coverageType,
        vehicleValue
      );

      if (await transaction.wait()) {
        toast.success("Automobile premium generated successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while generating automobile premium");
    }
  };

  return (
    <InsureFiContext.Provider
      value={{
        generateAutomobilePremium,
      }}
    >
      {children}
    </InsureFiContext.Provider>
  );
};