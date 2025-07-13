import { X, Shield, Sparkles } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-3 sm:p-6 border-b border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="w-12 h-12 rounded-2xl border-2 border-white/20 object-cover"
            />
            {onlineUsers.includes(selectedUser._id) && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-lg" />
            )}
          </div>

          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-lg font-semibold text-white">
                {selectedUser.fullName}
              </h3>
              <div className="flex items-center gap-2">
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
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setSelectedUser(null)}
          className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
