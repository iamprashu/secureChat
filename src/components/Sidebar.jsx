import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useAuth } from "@clerk/clerk-react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Circle, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const { getToken } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers(getToken);
  }, []);

  const filteredUsers = users
    .filter((user) => 
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) => !showOnlineOnly || onlineUsers.includes(user._id));

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="h-full w-16 sm:w-20 lg:w-80 border-r border-white/10 flex flex-col bg-white/5 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div className="hidden lg:block">
            <h2 className="font-semibold text-white">Contacts</h2>
            <p className="text-xs text-white/60">{onlineUsers.length} online</p>
          </div>
        </div>

        {/* Search - Desktop only */}
        <div className="hidden lg:block mb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>
        </div>

        {/* Filter - Desktop only */}
        <div className="hidden lg:flex items-center gap-2">
          <label className="flex items-center gap-2 text-white/70 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500"
            />
            Online only
          </label>
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {/* Desktop List */}
        <div className="hidden lg:block p-2 space-y-1">
          <AnimatePresence>
            {filteredUsers.map((user, index) => (
              <motion.button
                key={user._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedUser(user)}
                className={`w-full p-3 rounded-lg flex items-center gap-3 transition-all hover:bg-white/10 ${
                  selectedUser?._id === user._id
                    ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                    : ""
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                  />
                  {onlineUsers.includes(user._id) && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <h3 className="font-medium text-white text-sm truncate">
                    {user.fullName}
                  </h3>
                  <div className="flex items-center gap-1 text-xs">
                    <Circle
                      className={`w-2 h-2 ${
                        onlineUsers.includes(user._id)
                          ? "text-emerald-400 fill-current"
                          : "text-white/40"
                      }`}
                    />
                    <span
                      className={
                        onlineUsers.includes(user._id)
                          ? "text-emerald-400"
                          : "text-white/60"
                      }
                    >
                      {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-white/50">
              <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No contacts found</p>
            </div>
          )}
        </div>

        {/* Mobile List */}
        <div className="lg:hidden p-2 space-y-2">
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-2 rounded-lg flex items-center justify-center transition-all hover:bg-white/10 ${
                selectedUser?._id === user._id
                  ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                  : ""
              }`}
              title={user.fullName}
            >
              <div className="relative">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="w-8 h-8 rounded-full object-cover border border-white/20"
                />
                {onlineUsers.includes(user._id) && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
