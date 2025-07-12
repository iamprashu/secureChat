import { X, Shield, Sparkles } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { motion } from "framer-motion";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-3 sm:p-6 border-b border-white/10 bg-white/5 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.1 }} className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="w-12 h-12 rounded-2xl border-2 border-white/20 object-cover"
            />
            {onlineUsers.includes(selectedUser._id) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-lg"
              />
            )}
          </motion.div>

          <div className="flex items-center gap-3">
            <div>
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg font-semibold text-white"
              >
                {selectedUser.fullName}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2"
              >
                {onlineUsers.includes(selectedUser._id) ? (
                  <span className="flex items-center gap-1 text-emerald-400 text-sm">
                    <Sparkles className="w-3 h-3" />
                    Online
                  </span>
                ) : (
                  <span className="text-white/60 text-sm">Offline</span>
                )}
                <Shield
                  className="w-4 h-4 text-emerald-500"
                  title="End-to-end encrypted"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSelectedUser(null)}
          className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300"
        >
          <X className="w-5 h-5 text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ChatHeader;
