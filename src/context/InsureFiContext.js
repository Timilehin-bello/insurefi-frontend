"use client";

import React, { useState } from "react";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import config from "../config/config.json";
import insureFiAutomobileABI from "../config/InsureFiAutomobile.json";
import insureFiPropertyABI from "../config/InsureFiProperty.json";

import {
  BrowserProvider,
  Contract,
  formatEther,
  parseEther,
  parseUnits,
} from "ethers";
import { toast } from "react-toastify";
import { subdomain, client } from "../config/ipfsConfig";

export const InsureFiContext = React.createContext();

export const InsureFiProvider = ({ children }) => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [policyId, setPolicyId] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [propertyPolicyId, setPropertyPolicyId] = useState("");
  const [propertyPriceValue, setPropertyPriceValue] = useState("");

  const [loading, setLoading] = useState(false);

  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });

      const url = `${subdomain}/ipfs/${added.path}`;

      console.log(url);

      return url;
    } catch (error) {
      console.log("Ipfs Error", error.message);

      toast.error("Error Uploading to IPFS");
    }
  };
  const fetchAutomobileContract = async (signerOrProvider) => {
    const insureFiAutomobileConfig = config[chainId].insureFiAutomobile;
    const insureFiAutomobileContract = new Contract(
      insureFiAutomobileConfig.address,
      insureFiAutomobileABI,
      signerOrProvider
    );
    return insureFiAutomobileContract;
  };

  const fetchPropertyContract = async (signerOrProvider) => {
    const insureFiPropertyConfig = config[chainId].insureFiProperty;
    const insureFiPropertyContract = new Contract(
      insureFiPropertyConfig.address,
      insureFiPropertyABI,
      signerOrProvider
    );
    return insureFiPropertyContract;
  };

  const generateAutomobilePremium = async (
    driverAge,
    accident,
    violation,
    vehicleCategory,
    vehicleAge,
    mileage,
    safetyFeatures,
    coverageType,
    vehicleValue,
    imageUrl
  ) => {
    if (
      !driverAge ||
      !accident ||
      !violation ||
      !vehicleCategory ||
      !vehicleAge ||
      !mileage ||
      !safetyFeatures ||
      !coverageType ||
      !vehicleValue ||
      !imageUrl
    ) {
      console.log(
        driverAge,
        accident,
        violation,
        vehicleCategory,
        vehicleAge,
        mileage,
        safetyFeatures,
        coverageType,
        vehicleValue,
        imageUrl
      );
      toast.error("Please fill all the fields");
      return false;
    }

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      setLoading(true);
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      console.log("signer", signer);

      const contract = await fetchAutomobileContract(signer);

      const priceValue = parseEther(vehicleValue).toString();
      console.log("priceValue", Number(priceValue.toString()));

      const transaction = await contract.generatePremium(
        driverAge,
        accident,
        violation,
        vehicleCategory,
        vehicleAge,
        mileage,
        safetyFeatures,
        coverageType,
        priceValue,
        imageUrl
      );

      console.log("transaction", transaction);

      const premium = await transaction.wait();

      if (premium) {
        console.log("premium wait", premium);
        // console.log("premium", BigInt(premium["logs"]));
        const _id = Number(`0x${premium.logs[0].data.slice(2, 66).toString()}`);

        const _value = formatEther(
          Number(`0x${premium.logs[0].data.slice(66, 128).toString()}`)
        ).toString();

        console.log("_value", _value);
        if (premium) {
          console.log("premium wait", premium);
          // console.log("premium", BigInt(premium["logs"]));
          const _id = Number(
            `0x${premium.logs[0].data.slice(2, 66).toString()}`
          );

          const _value = formatEther(
            Number(`0x${premium.logs[0].data.slice(66).toString()}`)
          ).toString();

          console.log(
            "id orginal",
            `0x${premium.logs[0].data.slice(2, 66).toString()}`
          );

          console.log(
            "value orginal",
            `0x${premium.logs[0].data.slice(66).toString()}`
          );
          console.log("_id", _id);

          console.log("_value", _value);

          setPolicyId(_id);
          setPriceValue(_value);
          setLoading(false);
          console.log(_id, _value);
          toast.success("Automobile premium generated successfully");

          return true;
        }
        // setPolicyId(_id);
        // setPriceValue(_value);
        // console.log(_id, _value);
        // toast.success("Automobile premium generated successfully");

        // return true;
      }
    } catch (error) {
      console.log("generatePremium error", error);

      setLoading(false);
      toast.error("Error while generating automobile premium");
      return false;
    }
  };

  const initiateAutomobilePolicy = async () => {
    if (!isConnected) {
      toast.error("Please connect to your wallet");
      return false;
    }

    try {
      setLoading(true);
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchAutomobileContract(signer);

      const amountToPay = parseUnits(priceValue, "ether");
      console.log("priceValue initiate", Number(amountToPay));
      console.log("initiateAutomobilePolicy", address, policyId, amountToPay);

      const transaction = await contract.initiatePolicy(address, policyId, {
        value: amountToPay.toString(),
      });

      if (await transaction.wait()) {
        setLoading(false);
        toast.success(" Policy Initiated successfully");
        return true;
      }
    } catch (error) {
      console.log("initiateAutomobilePolicy error", error);
      setLoading(false);
      toast.error("Error while Initiating Policy");
      return false;
    }
  };

  const checkAutomobilePolicyStatus = async (policyHolder, id) => {
    if (!policyHolder || !id) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);

      const contract = await fetchAutomobileContract(provider);

      const transaction = await contract.checkPolicyStatus(policyHolder, id);

      toast.promise(await transaction.wait(), {
        pending: "  generating...",
        success: "  generated successfully",
        error: "Error while generating  ",
      });

      if (await transaction.wait()) {
        toast.success("  generated successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while generating  ");
    }
  };

  const renewAutomobilePolicy = async (policyHolder, id) => {
    if (!policyHolder || !id) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchAutomobileContract(signer);

      const transaction = await contract.renewPolicy(policyHolder, id);

      toast.promise(await transaction.wait(), {
        pending: "Initiating Policy Renewal ...",
        success: "Policy Renewed successfully",
        error: "Error while Initiating Policy Renewal",
      });

      if (await transaction.wait()) {
        toast.success(" Policy Renewed successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while Initiating Policy Renewal");
    }
  };

  const terminateAutomobilePolicy = async (policyHolder, reason) => {
    if (!policyHolder || !reason) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchAutomobileContract(signer);

      const transaction = await contract.terminatePolicy(policyHolder, reason);

      toast.promise(await transaction.wait(), {
        pending: "Initiating Policy Termination ...",
        success: "Policy Terminated successfully",
        error: "Error while Terminating Policy",
      });

      if (await transaction.wait()) {
        toast.success(" Policy Terminated successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while Terminating Policy");
    }
  };

  const addAutomobileVoter = async (policyHolder) => {
    if (!policyHolder) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchAutomobileContract(signer);

      const transaction = await contract.removeVoter(policyHolder);

      toast.promise(await transaction.wait(), {
        pending: "Adding Voter...",
        success: "Voter Added successfully",
        error: "Error while adding Voter",
      });

      if (await transaction.wait()) {
        toast.success("Voter Added successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while adding Voter");
    }
  };

  const fileAutomobileClaim = async (
    policyId,
    claimAmount,
    claimDetails,
    imageUrl,
    router
  ) => {
    if (!policyId || !claimAmount || !claimDetails || !imageUrl)
      return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    setLoading(true);

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchAutomobileContract(signer);

      const claimAmountInWei = parseEther(claimAmount).toString();

      console.log("claimAmountInWei", claimAmountInWei);

      const transaction = await contract.fileClaim(
        policyId,
        claimAmountInWei,
        claimDetails,
        [imageUrl]
      );

      if (await transaction.wait()) {
        setLoading(false);
        toast.success("File Claim successfully");

        router.push("/");
      }
    } catch (error) {
      console.log("error", error);
      console.log("errorMessage", error.message);
      setLoading(false);
      const errorMessage = error.message.split(": ")[1];

      toast.error(
        errorMessage.split("(")[0].split('"')[1] || "Error while Filing Claim"
      );
    }
  };

  const checkAutomobilePolicy = async (policyHolder, id) => {
    if (!policyHolder || !id) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);

      const contract = await fetchAutomobileContract(provider);

      const transaction = await contract.checkPolicy(policyHolder, id);

      toast.promise(await transaction.wait(), {
        pending: " Checking Policy...",
        success: " Policy Returned successfully",
        error: "Error while Checking Policy",
      });

      if (await transaction.wait()) {
        toast.success(" Policy Returned successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while Checking Policy");
    }
  };

  const getAutomobileClaim = async (index) => {
    if (!index) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      index,
    });

    try {
      const provider = new BrowserProvider(walletProvider);

      const contract = await fetchAutomobileContract(provider);

      const transaction = await contract.getClaim(index);

      toast.promise(await transaction.wait(), {
        pending: " getting claim...",
        success: "Claim Returned successfully",
        error: "Error while returning Claim",
      });

      if (await transaction.wait()) {
        toast.success("Claim Returned successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while returning Claim");
    }
  };
  const getAllAutomobileClaim = async () => {
    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);

      const contract = await fetchAutomobileContract(provider);

      const transaction = await contract.getAllClaim();

      if (transaction) {
        console.log("transaction", transaction);
        return transaction;
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const voteOnAutomobileClaim = async (claimId, vote) => {
    console.log("claimId", claimId, "vote", vote);
    // if (!claimId || !vote) {
    //   toast.error("Data Is Missing");
    //   return false;
    // }
    console.log("claimId", claimId, "vote", vote);

    if (!isConnected) return toast.error("Please connect to your wallet");

    setLoading(true);

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchAutomobileContract(signer);

      const transaction = await contract.voteOnClaim(claimId, vote);

      if (await transaction.wait()) {
        setLoading(false);
        toast.success("Claimed successfully");
        return true;
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      const errorMessage = error.message.split(": ")[1];

      toast.error(
        errorMessage.split("(")[0].split('"')[1] || "Error while Claiming"
      );

      return false;
    }
  };

  const getAutomobileVoteCounts = async (claimId) => {
    if (!claimId) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      claimId,
    });

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchAutomobileContract(signer);

      const transaction = await contract.getVoteCounts(claimId);

      toast.promise(await transaction.wait(), {
        pending: "Tallying Votes...",
        success: "Votes tallied successfully",
        error: "Error Tallying Votes",
      });

      if (await transaction.wait()) {
        toast.success("Votes tallied successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error Tallying Votes");
    }
  };

  const drainAutomobileContract = async (amount) => {
    if (!amount) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      amount,
    });

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchAutomobileContract(signer);

      const transaction = await contract.drainContract(amount);

      toast.promise(await transaction.wait(), {
        pending: "Draining Contract...",
        success: "Contract Drained successfully",
        error: "Error Draining Contract",
      });

      if (await transaction.wait()) {
        toast.success("Contract Drained successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error Draining Contract");
    }
  };

  // PROPERTY INSURANCE FUNCTIONALITY

  const generatePropertyPremium = async (
    location,
    propertyType,
    propertyAge,
    priceAmount,
    protections,
    imageUrl
  ) => {
    console.log("testing", location, propertyType, propertyAge, priceAmount);
    if (
      !location ||
      !propertyType ||
      !propertyAge ||
      !priceAmount ||
      !protections ||
      !imageUrl
    ) {
      console.log(
        location,
        propertyType,
        propertyAge,
        priceAmount,
        protections,
        imageUrl
      );
      toast.error("Please fill all the fields");
      return false;
    }

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      console.log("signer", signer);

      const contract = await fetchPropertyContract(signer);

      const priceValue = parseEther(priceAmount).toString();
      console.log("priceValueNumber", Number(priceValue.toString()));
      console.log("priceValue", priceValue);
      console.log("priceAmount", priceAmount);
      console.log("protections", protections);

      const transaction = await contract.generatePremium(
        location,
        propertyType,
        propertyAge,
        protections,
        priceAmount,
        imageUrl
      );

      const premium = await transaction.wait();

      if (premium) {
        console.log("premium wait", premium);
        // console.log("premium", BigInt(premium["logs"]));
        const _id = Number(`0x${premium.logs[0].data.slice(2, 66).toString()}`);

        const _value = formatEther(
          Number(`0x${premium.logs[0].data.slice(66, 128).toString()}`)
        ).toString();

        console.log("_value", _value);
        if (premium) {
          console.log("premium wait", premium);
          // console.log("premium", BigInt(premium["logs"]));
          const _id = Number(
            `0x${premium.logs[0].data.slice(2, 66).toString()}`
          );

          const _value = formatEther(
            Number(`0x${premium.logs[0].data.slice(66).toString()}`)
          ).toString();

          console.log(
            "id orginal",
            `0x${premium.logs[0].data.slice(2, 66).toString()}`
          );

          console.log(
            "value orginal",
            `0x${premium.logs[0].data.slice(66).toString()}`
          );
          console.log("_id", _id);

          console.log("_value", _value);

          setPropertyPolicyId(_id);
          setPropertyPriceValue(_value);
          console.log(_id, _value);
          toast.success("Automobile premium generated successfully");

          return true;
        }
        setPolicyId(_id);
        setPriceValue(_value);
        console.log(_id, _value);
        toast.success("Automobile premium generated successfully");

        return true;
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Error while generating Property premium");
      return false;
    }
  };
  const initiatePropertyPolicy = async (policyHolder, id) => {
    if (!policyHolder || !id) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchPropertyContract(signer);

      const transaction = await contract.initiatePolicy(policyHolder, id);

      toast.promise(await transaction.wait(), {
        pending: " Initiating Property Policy...",
        success: "Property Policy Initiated successfully",
        error: "Error while Initiating Property Policy",
      });

      if (await transaction.wait()) {
        toast.success("Property Policy Initiated successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while Initiating Property Policy");
    }
  };
  const checkPropertyPolicyStatus = async (policyHolder, id) => {
    if (!policyHolder || !id) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);

      const contract = await fetchPropertyContract(provider);

      const transaction = await contract.checkPolicyStatus(policyHolder, id);

      toast.promise(await transaction.wait(), {
        pending: "generating...",
        success: "generated successfully",
        error: "Error while generating  ",
      });

      if (await transaction.wait()) {
        toast.success("generated successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while generating  ");
    }
  };
  const renewPropertyPolicy = async (policyHolder, id) => {
    if (!policyHolder || !id) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchPropertyContract(signer);

      const transaction = await contract.renewPolicy(policyHolder, id);

      toast.promise(await transaction.wait(), {
        pending: "Initiating Policy Renewal ...",
        success: "Policy Renewed successfully",
        error: "Error while Initiating Policy Renewal",
      });

      if (await transaction.wait()) {
        toast.success(" Policy Renewed successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while Initiating Policy Renewal");
    }
  };
  const terminatePropertyPolicy = async (policyHolder, reason) => {
    if (!policyHolder || !reason) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchPropertyContract(signer);

      const transaction = await contract.terminatePolicy(policyHolder, reason);

      toast.promise(await transaction.wait(), {
        pending: "Initiating Policy Termination ...",
        success: "Policy Terminated successfully",
        error: "Error while Terminating Policy",
      });

      if (await transaction.wait()) {
        toast.success(" Policy Terminated successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while Terminating Policy");
    }
  };
  const addPropertyVoter = async (voter) => {
    if (!voter) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchPropertyContract(signer);

      const transaction = await contract.removeVoter(voter);

      toast.promise(await transaction.wait(), {
        pending: "Adding Voter...",
        success: "Voter Added successfully",
        error: "Error while adding Voter",
      });

      if (await transaction.wait()) {
        toast.success("Voter Added successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while adding Voter");
    }
  };
  const filePropertyClaim = async (
    policyID,
    claimAmount,
    claimDetails,
    imageUrl
  ) => {
    if (!policyID || !claimAmount || !claimDetails || !imageUrl)
      return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchPropertyContract(signer);

      const added = await client.add(data);

      const url = `${subdomain}/ipfs/${added.path}`;

      const transaction = await contract.fileClaim(
        policyID,
        claimAmount,
        claimDetails,
        imageUrl
      );

      toast.promise(await transaction.wait(), {
        pending: "Filing Claim...",
        success: "Claim filed successfully",
        error: "Error while Filing Claim",
      });

      if (await transaction.wait()) {
        toast.success("Claim filed successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while Filing Claim");
    }
  };
  const checkPropertyPolicy = async (policyHolder, id) => {
    if (!policyHolder || !id) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchPropertyContract(signer);

      const transaction = await contract.checkPolicy(policyHolder, id);

      toast.promise(await transaction.wait(), {
        pending: " Checking Policy...",
        success: " Policy Returned successfully",
        error: "Error while Checking Policy",
      });

      if (await transaction.wait()) {
        toast.success(" Policy Returned successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while Checking Policy");
    }
  };
  const getPropertyClaim = async (index) => {
    if (!index) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);

      const contract = await fetchPropertyContract(provider);

      const transaction = await contract.getClaim(index);

      toast.promise(await transaction.wait(), {
        pending: " getting claim...",
        success: "Claim Returned successfully",
        error: "Error while returning Claim",
      });

      if (await transaction.wait()) {
        toast.success("Claim Returned successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while returning Claim");
    }
  };
  const getAllPropertyClaim = async () => {
    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);

      const contract = await fetchPropertyContract(provider);

      const transaction = await contract.getAllClaim();

      toast.promise(await transaction.wait(), {
        pending: " getting claims...",
        success: "Claims Returned successfully",
        error: "Error while returning Claims",
      });

      if (await transaction.wait()) {
        toast.success("Claims Returned successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while returning Claims");
    }
  };
  const voteOnPropertyClaim = async (claimId, vote) => {
    if (!claimId || !vote) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      claimId,
      vote,
    });

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchPropertyContract(signer);

      const transaction = await contract.voteOnClaim(claimId, vote);

      toast.promise(await transaction.wait(), {
        pending: "Initiating Claim...",
        success: "Claimed successfully",
        error: "Error while Claiming",
      });

      if (await transaction.wait()) {
        toast.success("Claimed successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while Claiming");
    }
  };
  const getPropertyVoteCounts = async (claimId) => {
    if (!claimId) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      claimId,
    });

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchPropertyContract(signer);

      const transaction = await contract.getVoteCounts(claimId);

      toast.promise(await transaction.wait(), {
        pending: "Tallying Votes...",
        success: "Votes tallied successfully",
        error: "Error Tallying Votes",
      });

      if (await transaction.wait()) {
        toast.success("Votes tallied successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error Tallying Votes");
    }
  };
  const drainPropertyContract = async (amount) => {
    if (!amount) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      amount,
    });

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchPropertyContract(signer);

      const transaction = await contract.drainContract(amount);

      toast.promise(await transaction.wait(), {
        pending: "Draining Contract...",
        success: "Contract Drained successfully",
        error: "Error Draining Contract",
      });

      if (await transaction.wait()) {
        toast.success("Contract Drained successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error Draining Contract");
    }
  };

  return (
    <InsureFiContext.Provider
      value={{
        generateAutomobilePremium,
        uploadToIPFS,
        generatePropertyPremium,
        initiateAutomobilePolicy,
        initiatePropertyPolicy,
        checkAutomobilePolicyStatus,
        checkPropertyPolicyStatus,
        renewAutomobilePolicy,
        renewPropertyPolicy,
        terminateAutomobilePolicy,
        terminatePropertyPolicy,
        addAutomobileVoter,
        addPropertyVoter,
        fileAutomobileClaim,
        filePropertyClaim,
        checkAutomobilePolicy,
        checkPropertyPolicy,
        getAutomobileClaim,
        getAllAutomobileClaim,
        getPropertyClaim,
        getAllPropertyClaim,
        voteOnAutomobileClaim,
        voteOnPropertyClaim,
        getAutomobileVoteCounts,
        getPropertyVoteCounts,
        drainPropertyContract,
        drainAutomobileContract,
        priceValue,
        policyId,
        propertyPolicyId,
        propertyPriceValue,

        address,
        isConnected,
        loading,
        setLoading,
      }}
    >
      {children}
    </InsureFiContext.Provider>
  );
};
