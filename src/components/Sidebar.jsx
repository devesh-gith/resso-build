import React from "react";
import { useState } from "react";
import { useDebugValue } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import resso from "../images/resso.png";
import { links } from "../assets/constants";
import { RiCloseLine } from "react-icons/ri";

const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className="flex flex-row justify-start items-center mt-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
        onClick={handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

function Sidebar() {
  // console.log(links);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <div className="md:flex hidden flex-col w-[200px] py-10 px-4 bg-black">
        <img src={resso} alt="logo" className="w-full h-10 object-contain" />
        <NavLinks />
      </div>

      {/* mobile devices */}
      <div className="absolute md:hidden block top-6 right-3">
        {!mobileMenuOpen ? (
          <HiOutlineMenu
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobileMenuOpen(true)}
          />
        ) : (
          <RiCloseLine
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img src={resso} alt="logo" className="w-full h-10 object-contain" />
        <NavLinks />
      </div>
    </>
  );
}

export default Sidebar;
