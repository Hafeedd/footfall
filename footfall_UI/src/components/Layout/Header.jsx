import React from "react";
import { RiFootprintFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";

export const Header = () => {
  return (
    <div className="w-full px-8 py-2 flex items-center justify-between border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        <RiFootprintFill className="text-2xl" />
        <span className="text-lg font-semibold">FOOTFALL MONITOR</span>
      </div>

      <div className="flex items-center gap-8 font-semibold">
        <span className="text-gray-600 text-sm">Sensors</span>
        <span className="text-gray-600 text-sm">Reports</span>
        <span className="text-gray-600 text-sm">Settings</span>
        <FaUserCircle className="text-3xl" />
      </div>
    </div>
  );
};
