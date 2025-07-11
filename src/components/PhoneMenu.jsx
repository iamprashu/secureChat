import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { UiContext } from "../Contexts/UiContext";
import {
  IoHome,
  IoChatbubbles,
  IoPeople,
  IoPerson,
  IoSearch,
  IoSettings,
  IoLogOut,
  IoClose,
  IoNotifications,
  IoAdd,
} from "react-icons/io5";
import { useUser, useClerk } from "@clerk/clerk-react";

const PhoneMenu = () => {
  const { setOpenMobileMenu, mobileMenu, openMobileMenu } =
    useContext(UiContext);
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: IoHome, label: "Home", path: "/", count: null },
    { icon: IoChatbubbles, label: "Chats", path: "/chats", count: 3 },
    { icon: IoPeople, label: "Friends", path: "/friends", count: 12 },
    { icon: IoSearch, label: "Search", path: "/search", count: null },
    {
      icon: IoNotifications,
      label: "Notifications",
      path: "/notifications",
      count: 5,
    },
    { icon: IoSettings, label: "Settings", path: "/settings", count: null },
  ];

  const handleSignOut = () => {
    signOut();
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (mobileMenu) {
      setOpenMobileMenu(false);
    }
  };

  if (mobileMenu && !openMobileMenu) {
    return null;
  }

  if (!mobileMenu) {
    return (
      <div className="h-full bg-gray-900 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {user?.firstName?.charAt(0) ||
                  user?.emailAddresses[0]?.emailAddress?.charAt(0) ||
                  "U"}
              </span>
            </div>
            <div>
              <h3 className="text-white font-semibold">
                {user?.firstName || "User"}
              </h3>
              <p className="text-gray-400 text-sm">
                {user?.emailAddresses[0]?.emailAddress}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 py-4">
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-800 transition-colors ${
                    location.pathname === item.path
                      ? "bg-blue-600 text-white"
                      : "text-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.count && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  )}
                </button>
              </motion.div>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-700">
          <div className="space-y-2">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
              <IoAdd size={20} />
              <span>New Chat</span>
            </button>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
              <IoPerson size={20} />
              <span>Add Friend</span>
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center space-x-2 text-gray-400 hover:text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <IoLogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full absolute h-full bg-black/50 backdrop-blur-sm"
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 30,
        duration: 0.3,
      }}
      onClick={() => {
        setOpenMobileMenu(false);
      }}
    >
      <div
        className="w-4/5 h-full bg-gray-900 border-r border-gray-700 flex flex-col"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user?.firstName?.charAt(0) ||
                    user?.emailAddresses[0]?.emailAddress?.charAt(0) ||
                    "U"}
                </span>
              </div>
              <div>
                <h3 className="text-white font-semibold">
                  {user?.firstName || "User"}
                </h3>
                <p className="text-gray-400 text-sm">
                  {user?.emailAddresses[0]?.emailAddress}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpenMobileMenu(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <IoClose size={24} />
            </button>
          </div>
        </div>

        <div className="flex-1 py-4">
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-800 transition-colors ${
                    location.pathname === item.path
                      ? "bg-blue-600 text-white"
                      : "text-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.count && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  )}
                </button>
              </motion.div>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-700">
          <div className="space-y-2">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
              <IoAdd size={20} />
              <span>New Chat</span>
            </button>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
              <IoPerson size={20} />
              <span>Add Friend</span>
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center space-x-2 text-gray-400 hover:text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <IoLogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PhoneMenu;
