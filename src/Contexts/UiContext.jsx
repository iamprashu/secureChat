import { createContext, useState } from "react";

export const UiContext = createContext();

export default function ProviderFunction({ children }) {
  const [mobileMenu, setMobileMenu] = useState(window.innerWidth <= 793);
  const [friendPanel, setFriendPanel] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const values = {
    mobileMenu,
    setMobileMenu,
    friendPanel,
    setFriendPanel,
    openMobileMenu,
    setOpenMobileMenu,
  };

  return <UiContext.Provider value={values}>{children}</UiContext.Provider>;
}
