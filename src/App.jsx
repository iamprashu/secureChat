import "./App.css";

import { useContext, useState } from "react";
import { UiContext } from "./Contexts/UiContext";

function App() {
  const { mobileMenu, setMobileMenu, friendPanel, setFriendPanel } =
    useContext(UiContext);

  return (
    <div className="bg-gray-900 h-screen flex flex-col overflow-hidden"></div>
  );
}

export default App;
