import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Shield, Sparkles, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="h-full w-16 sm:w-20 lg:w-80 border-r border-white/10 flex flex-col transition-all duration-300 bg-white/5 backdrop-blur-sm relative"
    >
      <div className="lg:hidden p-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileExpanded(!isMobileExpanded)}
          className="w-full h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300"
        >
          <Menu className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isMobileExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl m-2 p-4"
          >
            <div className="space-y-2">
              {filteredUsers.map((user) => (
                <motion.button
                  key={user._id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedUser(user);
                    setIsMobileExpanded(false);
                  }}
                  className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                    selectedUser?._id === user._id
                      ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                      : "hover:bg-white/10 border border-transparent"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={user.profilePic || "/avatar.png"}
                      alt={user.fullName}
                      className="w-10 h-10 object-cover rounded-xl border-2 border-white/20"
                    />
                    {onlineUsers.includes(user._id) && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-lg" />
                    )}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-white text-sm truncate">
                      {user.fullName}
                    </h3>
                    <div className="text-xs text-white/60">
                      {onlineUsers.includes(user._id) ? (
                        <span className="flex items-center gap-1 text-emerald-400">
                          <Sparkles className="w-3 h-3" />
                          Online
                        </span>
                      ) : (
                        "Offline"
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="border-b border-white/10 w-full p-3 lg:p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Users className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
          </div>
          <span className="font-semibold text-white hidden lg:block">
            Contacts
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-3 mb-4">
          <motion.label
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm bg-white/10 border-white/20 checked:bg-purple-500"
            />
            <span className="text-sm">Show online only</span>
          </motion.label>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-xs text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full"
          >
            {onlineUsers.length - 1} online
          </motion.span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="hidden lg:block overflow-y-auto w-full p-3 space-y-2"
      >
        <AnimatePresence>
          {filteredUsers.map((user, index) => (
            <motion.button
              key={user._id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full p-4 rounded-2xl flex items-center gap-4
                transition-all duration-300 group
                ${
                  selectedUser?._id === user._id
                    ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 shadow-lg"
                    : "hover:bg-white/10 border border-transparent"
                }
              `}
            >
              <div className="relative">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="w-12 h-12 lg:w-14 lg:h-14 object-cover rounded-2xl border-2 border-white/20"
                />
                {onlineUsers.includes(user._id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-lg"
                  />
                )}
              </div>

              <div className="text-left min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white truncate">
                    {user.fullName}
                  </h3>
                  {onlineUsers.includes(user._id) && (
                    <Shield className="w-4 h-4 text-emerald-500" />
                  )}
                </div>
                <div className="text-sm text-white/60">
                  {onlineUsers.includes(user._id) ? (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Sparkles className="w-3 h-3" />
                      Online
                    </span>
                  ) : (
                    "Offline"
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>

        {filteredUsers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/50 py-8"
          >
            <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No users found</p>
          </motion.div>
        )}
      </motion.div>

      <div className="lg:hidden overflow-y-auto w-full p-2 space-y-2">
        <AnimatePresence>
          {filteredUsers.map((user, index) => (
            <motion.button
              key={user._id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full p-2 rounded-xl flex items-center justify-center
                transition-all duration-300 group
                ${
                  selectedUser?._id === user._id
                    ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 shadow-lg"
                    : "hover:bg-white/10 border border-transparent"
                }
              `}
              title={user.fullName}
            >
              <div className="relative">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="w-10 h-10 object-cover rounded-xl border-2 border-white/20"
                />
                {onlineUsers.includes(user._id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-lg"
                  />
                )}
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
