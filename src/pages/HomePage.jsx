import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const shouldShowSidebar = !selectedUser || !isMobile;

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex flex-col">
      <div className="h-16"></div>

      <div className="flex-1 flex items-center justify-center px-2 sm:px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 w-full max-w-7xl h-full max-h-[calc(100vh-8rem)] overflow-hidden"
        >
          <div className="flex h-full rounded-2xl sm:rounded-3xl overflow-hidden relative">
            <AnimatePresence>
              {shouldShowSidebar && (
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sidebar />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex-1 min-w-0"
            >
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
