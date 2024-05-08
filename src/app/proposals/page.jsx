"use client"
import React, { useState } from 'react';
import DAOcard from "@/components/DAOcard/card";

const proposals = [
    { policyID: '1', claimID: 'Claim ID: 1', details: 'I was involved in an accident along Lagos-Ibadan express way on Thursday 25th January, 2024. All evidence and documentation are attached.', img: 'image-source-path-here' },
    { policyID: '2', claimID: 'Claim ID: 2', details: 'I was involved in an accident along Lagos-Ibadan express way on Thursday 25th January, 2024. All evidence and documentation are attached.', img: 'image-source-path-here' },
    // more proposals here
];

const DAO = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});

    const openModal = (proposal) => {
        setModalContent(proposal);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="px-4">
            <div>
                <h1 className="pt-3 leading-3 text-xl font-medium">
                    Governance
                </h1>
            </div>
            <div className="max-w-5xl my-5">
                {proposals.map((proposal, index) => (
                    <DAOcard key={index} proposal={proposal} openModal={openModal}/>
                ))}
            </div>
            {modalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h2 className="text-lg font-bold">{modalContent.policyID}</h2>
                                <p>{modalContent.claimID}</p>
                                <p>{modalContent.details}</p>
                                <img src={modalContent.img} alt="Proposal"/>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={closeModal} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DAO;