import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { motion } from "framer-motion";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center pt-20 px-4 h-full"
      >
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 w-full max-w-7xl h-[calc(100vh-8rem)] overflow-hidden">
          <div className="flex h-full rounded-3xl overflow-hidden">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Sidebar />
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex-1"
            >
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
