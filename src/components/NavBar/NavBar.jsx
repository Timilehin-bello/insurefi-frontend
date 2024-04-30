import React from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const NavBar = () => {
  return (
    <nav className="bg-[#FAF8F8] p-6 mb-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* <div>
            <Link className="text-white no-underline hover:underline" href="/">
              InsureDex
            </Link>
          </div> */}
          <div className="flex text-sm">
            {/* <button className="bg-blue-500 p-2 rounded-md hover:bg-blue-600">
                Connect Wallet
              </button> */}

            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
