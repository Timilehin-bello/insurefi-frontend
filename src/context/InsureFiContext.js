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
import { subdomain, client } from "../config/ipfsConfig";

export const InsureFiContext = React.createContext();

export const InsureFiProvider = ({ children }) => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

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
    imageUrl
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
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

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
        vehicleValue,
        imageUrl
      );

      const premium = await transaction.wait();
      if (premium) {
        localStorage.setItem(address, JSON.stringify(premium));
        toast.success("Automobile premium generated successfully");
      }
    } catch (error) {
      toast.error("Error while generating automobile premium");
    }
  };
  const generatePropertyPremium = async (
    policyHolder,
    location,
    propertyType,
    age,
    protections,
    value
  ) => {
    if (
      !policyHolder ||
      !location ||
      !propertyType ||
      !age ||
      !protections ||
      !value
    )
      return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchContract(signer);

      const transaction = await contract.generatePremium(
        policyHolder,
        location,
        propertyType,
        age,
        protections,
        value
      );

      toast.promise(await transaction.wait(), {
        pending: "Property premium generating...",
        success: "Property premium generated successfully",
        error: "Error while generating Property premium",
      });

      if (await transaction.wait()) {
        toast.success("Property premium generated successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while generating Property premium");
    }
  };

  const initiateAutomobilePolicy = async (policyHolder, id) => {
    if (!policyHolder || !id) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      policyHolder,
      id,
    });

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchContract(signer);

      const transaction = await contract.initiatePolicy(policyHolder, id);

      toast.promise(await transaction.wait(), {
        pending: " Initiating Policy...",
        success: " Policy Initiated successfully",
        error: "Error while Initiating Policy",
      });

      if (await transaction.wait()) {
        toast.success(" Policy Initiated successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while Initiating Policy");
    }
  };
  const initiatePropertyPolicy = async (policyHolder, id) => {
    if (!policyHolder || !id) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchContract(signer);

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

  const checkAutomobilePolicyStatus = async (policyHolder, id) => {
    if (!policyHolder || !id) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);

      const contract = await fetchContract(provider);

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

  const checkPropertyPolicyStatus = async (policyHolder, id) => {
    if (!policyHolder || !id) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);

      const contract = await fetchContract(provider);

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

  const renewAutomobilePolicy = async (policyHolder, id) => {
    if (!policyHolder || !id) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchContract(signer);

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

  const renewPropertyPolicy = async (policyHolder, id) => {
    if (!policyHolder || !id) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchContract(signer);

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

      const contract = await fetchContract(signer);

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

  const terminatePropertyPolicy = async (policyHolder, reason) => {
    if (!policyHolder || !reason) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchContract(signer);

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

      const contract = await fetchContract(signer);

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
  const addPropertyVoter = async (voter) => {
    if (!voter) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchContract(signer);

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

  const fileAutomobileClaim = async (
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

      const contract = await fetchContract(signer);

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

      const contract = await fetchContract(signer);

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

  const checkAutomobilePolicy = async (policyHolder, id) => {
    if (!policyHolder || !id) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);

      const contract = await fetchContract(provider);

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
  const checkPropertyPolicy = async (policyHolder, id) => {
    if (!policyHolder || !id) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchContract(signer);

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

      const contract = await fetchContract(provider);

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

      const contract = await fetchContract(provider);

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
  const getPropertyClaim = async (index) => {
    if (!index) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const provider = new BrowserProvider(walletProvider);

      const contract = await fetchContract(provider);

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

      const contract = await fetchContract(provider);

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
  const voteOnAutomiblieClaim = async (claimId, vote) => {
    if (!claimId || !vote) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      claimId,
      vote,
    });

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchContract(signer);

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

      const contract = await fetchContract(signer);

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

  const getAutomobileVoteCounts = async (claimId) => {
    if (!claimId) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      claimId,
    });

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchContract(signer);

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

  const getPropertyVoteCounts = async (claimId) => {
    if (!claimId) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      claimId,
    });

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchContract(signer);

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

      const contract = await fetchContract(signer);

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
  const drainAutomobileContract = async (amount) => {
    if (!amount) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      amount,
    });

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      const contract = await fetchContract(signer);

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
        voteOnAutomiblieClaim,
        voteOnPropertyClaim,
        getAutomobileVoteCounts,
        getPropertyVoteCounts,
        drainPropertyContract,
        drainAutomobileContract,
      }}
    >
      {children}
    </InsureFiContext.Provider>
  );
};
