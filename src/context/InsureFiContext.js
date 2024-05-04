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

      return url;
    } catch (error) {
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
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const contract = await fetchContract(signer);

      const added = await client.add(data);

      const url = `${subdomain}/ipfs/${added.path}`;

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

      toast.promise(await transaction.wait(), {
        pending: "Automobile premium generating...",
        success: "Automobile premium generated successfully",
        error: "Error while generating automobile premium",
      });

      if (await transaction.wait()) {
        toast.success("Automobile premium generated successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while generating automobile premium");
    }
  };
  const generatePremium = async (policyHolder, id) => {
    if (!policyHolder || !id) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      policyHolder,
      id,
    });

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const contract = await fetchContract(signer);

      const added = await client.add(data);

      const transaction = await contract.getGeneratePremium(policyHolder, id);

      toast.promise(await transaction.wait(), {
        pending: " premium generating...",
        success: " premium generated successfully",
        error: "Error while generating  premium",
      });

      if (await transaction.wait()) {
        toast.success(" premium generated successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while generating  premium");
    }
  };

  const initiatePolicy = async (policyHolder, id) => {
    if (!policyHolder || !id) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      policyHolder,
      id,
    });

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const contract = await fetchContract(signer);

      const added = await client.add(data);

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
  const isVoter = async (voter) => {
    if (!voter) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      voter,
    });

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const contract = await fetchContract(signer);

      const added = await client.add(data);

      const transaction = await contract.isVoter(policyHolder, id);

      toast.promise(await transaction.wait(), {
        pending: " Initiating ...",
        success: "  Initiated successfully",
        error: "Error while Initiating ",
      });

      if (await transaction.wait()) {
        toast.success("  Initiated successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while Initiating ");
    }
  };

  const checkPolicyStatus = async (policyHolder, id) => {
    if (!policyHolder || !id) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      policyHolder,
      id,
    });

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const contract = await fetchContract(signer);

      const added = await client.add(data);

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

  const renewPolicy = async (policyHolder, id) => {
    if (!policyHolder || !id) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      policyHolder,
      id,
    });

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const contract = await fetchContract(signer);

      const added = await client.add(data);

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
  const terminatePolicy = async (policyHolder, reason) => {
    if (!policyHolder || !reason) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      policyHolder,
      reason,
    });

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const contract = await fetchContract(signer);

      const added = await client.add(data);

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

  const updateVoterStatus = async (policyHolder) => {
    if (!policyHolder) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      policyHolder,
    });

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const contract = await fetchContract(signer);

      const added = await client.add(data);

      const transaction = await contract.updateVoterStatus(policyHolder);

      toast.promise(await transaction.wait(), {
        pending: "Initiating Voters Status update ...",
        success: "Voters Status updated successfully",
        error: "Error while updating Voters Status",
      });

      if (await transaction.wait()) {
        toast.success("Voters Status updated successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while updating Voters Status");
    }
  };

  const addVoter = async (policyHolder) => {
    if (!policyHolder) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      policyHolder,
    });

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const contract = await fetchContract(signer);

      const added = await client.add(data);

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
  const removeVoter = async (policyHolder) => {
    if (!policyHolder) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      policyHolder,
    });

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const contract = await fetchContract(signer);

      const added = await client.add(data);

      const transaction = await contract.removeVoter(policyHolder);

      toast.promise(await transaction.wait(), {
        pending: "Initiating Voter removal ...",
        success: "Voters removed successfully",
        error: "Error while removing Voter",
      });

      if (await transaction.wait()) {
        toast.success("Voters removed successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while removing Voter");
    }
  };

  const fileClaim = async (policyID, claimAmount, claimDetails, imageUrl) => {
    if (!policyID || !claimAmount || !claimDetails || !imageUrl)
      return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      policyID,
      claimAmount,
      claimDetails,
      imageUrl,
    });

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

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

  const checkPolicy = async (policyHolder, id) => {
    if (!policyHolder || !id) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      policyHolder,
      id,
    });

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const contract = await fetchContract(signer);

      const added = await client.add(data);

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
  const getClaim = async (index) => {
    if (!index) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      index,
    });

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const contract = await fetchContract(signer);

      const added = await client.add(data);

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
  const getAllClaim = async () => {
    if (!isConnected) return toast.error("Please connect to your wallet");

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const contract = await fetchContract(signer);

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
  const voteOnClaim = async (claimId, vote) => {
    if (!claimId || !vote) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      claimId,
      vote,
    });

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const contract = await fetchContract(signer);

      const added = await client.add(data);

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
  const tallyVotes = async (claimId) => {
    if (!claimId) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      claimId,
    });

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const contract = await fetchContract(signer);

      const added = await client.add(data);

      const transaction = await contract.tallyVotes(claimId);

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

  const finalizeClaim = async (claimId, approved) => {
    if (!claimId || !approved) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      claimId,
      approved,
    });

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const contract = await fetchContract(signer);

      const added = await client.add(data);

      const transaction = await contract.finalizeClaim(claimId, approved);

      toast.promise(await transaction.wait(), {
        pending: "Finalizing claim...",
        success: "Claim Finalized successfully",
        error: "Error while Finalizing claim",
      });

      if (await transaction.wait()) {
        toast.success("Claim Finalized successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while Finalizing claim");
    }
  };

  const processPayment = async (claimant, amount) => {
    if (!claimant || !amount) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      claimant,
      amount,
    });

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const contract = await fetchContract(signer);

      const added = await client.add(data);

      const transaction = await contract.processPayment(claimant, amount);

      toast.promise(await transaction.wait(), {
        pending: "Processing Payment...",
        success: "Payment Processed successfully",
        error: "Error while Processing Payment",
      });

      if (await transaction.wait()) {
        toast.success("Payment Processed successfully");
      }

      router.push("/");
    } catch (error) {
      toast.error("Error while Processing Payment");
    }
  };

  const getVoteCounts = async (claimId) => {
    if (!claimId) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      claimId,
    });

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const contract = await fetchContract(signer);

      const added = await client.add(data);

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

  const drainContract = async (amount) => {
    if (!amount) return toast.error("Data Is Missing");

    if (!isConnected) return toast.error("Please connect to your wallet");

    const data = JSON.stringify({
      amount,
    });

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const contract = await fetchContract(signer);

      const added = await client.add(data);

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
        generatePremium,
        initiatePolicy,
        isVoter,
        checkPolicyStatus,
        renewPolicy,
        terminatePolicy,
        updateVoterStatus,
        addVoter,
        removeVoter,
        fileClaim,
        checkPolicy,
        getClaim,
        getAllClaim,
        voteOnClaim,
        tallyVotes,
        finalizeClaim,
        processPayment,
        getVoteCounts,
        drainContract,
      }}
    >
      {children}
    </InsureFiContext.Provider>
  );
};
