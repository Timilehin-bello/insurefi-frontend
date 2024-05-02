import React from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const NavBar = () => {
  return (
    <nav className="bg-[#FAF8F8] p-4 mb-1">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link className="text-black no-underline hover:underline" href="/">
            InsureDex
          </Link>

          {/* <button className="bg-blue-500 p-2 rounded-md hover:bg-blue-600">
                Connect Wallet
              </button> */}

          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
