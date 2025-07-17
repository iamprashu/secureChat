import { X, Shield, Circle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { motion } from "framer-motion";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="w-10 h-10 rounded-full border-2 border-white/20 object-cover"
            />
            {isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
            )}
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm">
              {selectedUser.fullName}
            </h3>
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1">
                <Circle
                  className={`w-2 h-2 ${
                    isOnline ? "text-emerald-400 fill-current" : "text-white/40"
                  }`}
                />
                <span className={isOnline ? "text-emerald-400" : "text-white/60"}>
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
              <div className="w-1 h-1 bg-white/30 rounded-full" />
              <div className="flex items-center gap-1 text-emerald-400">
                <Shield className="w-3 h-3" />
                <span>Encrypted</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setSelectedUser(null)}
          className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all hover:scale-105 lg:hidden"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>
    </motion.div>
  );
};

export default ChatHeader;
