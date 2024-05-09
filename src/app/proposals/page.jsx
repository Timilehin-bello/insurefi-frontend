"use client";
import React, { useContext, useEffect, useState } from "react";
import DAOcard from "@/components/DAOcard/card";
import { InsureFiContext } from "@/context/InsureFiContext";
import ProposalCard from "@/components/ProposalCard/ProposalCard";
import Image from "next/image";
import WaveLoader from "@/components/WaveLoader/WaveLoader";
import { LoaderSpinner } from "@/components/LoaderSpinner/LoaderSpinner";

const Proposals = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [getAllClaims, setGetAllClaims] = useState([]);
  const { getAllAutomobileClaim, isConnected, voteOnAutomobileClaim } =
    useContext(InsureFiContext);

  const [getClaimId, setGetClaimId] = useState("");

  const handleClick = async (value) => {
    console.log(value);

    const result = await voteOnAutomobileClaim(getClaimId, value);
    if (result) {
      setTimeout(() => window.location.reload(), 2000);
    }
  };

  const openModal = (proposal) => {
    console.log("proposal", proposal);
    setModalContent(proposal);
    setImageUrl(proposal);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (!isConnected) return;
    getAllAutomobileClaim().then((res) => {
      setGetAllClaims(res);

      // const [...data] = res;
      console.log("res", res, typeof res);
      console.log("testres", res[0], typeof res[0][0], res[0][1]);
      // console.log("resLength", res.length);
      // res.forEach((item) => setGetAllClaims((prev) => [...prev, item]));

      // console.log("data", data);
    });
  }, [isConnected]);

  return (
    <>
      <LoaderSpinner />
      {!isConnected ? (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold">Please Connect Your Wallet</h1>
        </div>
      ) : getAllClaims && getAllClaims.length > 0 ? (
        <div className="px-4">
          <div>
            <h1 className="pt-3 leading-3 text-xl font-medium">Governance</h1>
          </div>
          <div className="max-w-5xl my-10">
            {/* {proposals.map((proposal, index) => (
          <DAOcard key={index} proposal={proposal} openModal={openModal} />
        ))} */}

            <ProposalCard
              getAllClaims={getAllClaims}
              setGetClaimId={setGetClaimId}
              openModal={openModal}
            />

            {/* {getAllClaims.map((item, index) => (
          <ProposalCard key={index} proposal={item} openModal={openModal} />
        ))} */}
          </div>
          {modalOpen && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <div className="bg-white flex justify-center  px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <Image
                      width={200}
                      height={200}
                      src={imageUrl[0]}
                      alt="Proposal"
                    />
                  </div>

                  <div className="flex justify-center">
                    <div className="flex flex-row items-center justify-end">
                      <button
                        onClick={() => handleClick(0)}
                        className="mr-2 p-2 text-white bg-yellow-500 rounded"
                      >
                        Suspend
                      </button>
                      <button
                        onClick={() => handleClick(1)}
                        className="mr-2 p-2 text-white bg-green-500 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleClick(2)}
                        className="p-2 text-white bg-red-500 rounded"
                      >
                        Reject
                      </button>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        onClick={closeModal}
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : getAllClaims.length === 0 && !getAllClaims ? (
        <div>No Proposals Found</div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <WaveLoader />
        </div>
      )}
    </>

  );
};

export default Proposals;
