import React from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

const navItems = [
  {
    name: "Overview",
    link: "/",
    icon: "/overview.svg",
  },
  {
    name: "Proposals",
    link: "/proposals",
    icon: "/proposals.svg",
  },
  {
    name: "Automobile Insurance",
    link: "/auto-insurance",
    icon: "/calender.svg",
  },
  {
    name: "Property Insurance",
    link: "/property-insurance",
    icon: "/statistics.svg",
  },
  {
    name: "Claims",
    link: "/claim",
    icon: "/proposals.svg",
  },
];

const SideBar = () => {
  return (
    <div className="">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <div
        id="default-sidebar"
        className="fixed w-64 top-0 left-0 z-40  h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#ffffff] space-x-4">
          <Image
            alt="logo"
            width={100}
            height={100}
            src={"/images/logo.svg"}
            className="w-10 h-10 ml-5 mt-5"
          />

          <ul className="space-y-3  font-medium mt-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-10 group"
                >
                  <Image
                    width={20}
                    height={20}
                    src={`/icons/${item.icon}`}
                    alt="icon"
                    className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                  />
                  {/* <svg
                    className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg> */}
                  <span className="ms-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
