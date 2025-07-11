import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UiContext } from "../Contexts/UiContext";
import MobileMenu from "../components/MobileMenu";
import PhoneMenu from "../components/PhoneMenu";

const Dashboard = () => {
  const { mobileMenu, openMobileMenu } = useContext(UiContext);

  return (
    <div className="bg-gray-900 h-screen w-screen flex flex-col relative overflow-hidden">
      {mobileMenu && <MobileMenu />}
      {openMobileMenu && <PhoneMenu />}

      <div className="flex-1 flex overflow-hidden">
        {!mobileMenu && (
          <div className="w-80 bg-gray-900 border-r border-gray-700 hidden lg:block">
            <PhoneMenu />
          </div>
        )}

        <div className="flex-1 bg-gray-900 overflow-hidden">
          <div className="h-full overflow-y-auto no-scrollbar">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
