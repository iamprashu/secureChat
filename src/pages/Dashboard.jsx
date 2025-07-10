import React, { useContext } from "react";
import { UiContext } from "../Contexts/UiContext";

const Dashboard = () => {
  const { mobileMenu } = useContext(UiContext);
  return (
    <div className="bg-gray-900 h-screen w-screen">
      {mobileMenu && <h1 className="text-white">je</h1>}
    </div>
  );
};

export default Dashboard;
