import React from "react";

const WaveLoader = () => {
  return (
    <div className="flex justify-center pb-16">
      <span className="relative flex justify-center h-12 w-12">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7327] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-12 w-12 bg-[#FF7327]"></span>
      </span>
    </div>
  );
};

export default WaveLoader;
