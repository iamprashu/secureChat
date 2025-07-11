import React, { useContext } from "react";
import { IoMenu, IoSearch, IoNotifications } from "react-icons/io5";
import { UiContext } from "../Contexts/UiContext";

const MobileMenu = () => {
  const { openMobileMenu, setOpenMobileMenu } = useContext(UiContext);

  return (
    <div className="w-screen h-15 bg-gray-800 flex p-4 justify-between items-center text-white border-b border-gray-700">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setOpenMobileMenu(!openMobileMenu)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <IoMenu size={24} />
        </button>
        <h2 className="text-xl font-bold">SecureChat</h2>
      </div>

      <div className="flex items-center space-x-3">
        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <IoSearch size={20} />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors relative">
          <IoNotifications size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
