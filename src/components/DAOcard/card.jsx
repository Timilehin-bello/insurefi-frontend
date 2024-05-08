import React from "react";

const DAOcard = ({ proposal, openModal }) => (
  <div className="p-4 m-2 bg-white rounded shadow-lg flex justify-between">
    <div className="flex justify-between">
      <h2 className="m-auto p-4 text-lg font-bold">{proposal.policyID}</h2>
      <div>
        <p>{proposal.claimID}</p>
        <p className="u-class-1">{proposal.details}</p>

        <button
          className="mt-2 p-1 text-white bg-blue-500 rounded"
          onClick={() => openModal(proposal)}
        >
          Read More &#x26A0;
        </button>
      </div>
    </div>
    <div className="flex flex-row items-center justify-end">
      <button className="mr-2 p-2 text-white bg-yellow-500 rounded">
        Suspend
      </button>
      <button className="mr-2 p-2 text-white bg-green-500 rounded">
        Approve
      </button>
      <button className="p-2 text-white bg-red-500 rounded">Reject</button>
    </div>
  </div>
);

export default DAOcard;
