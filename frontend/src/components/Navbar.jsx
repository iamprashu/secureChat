import { Link } from "react-router-dom";
import {
  LogOut,
  MessageSquare,
  Settings,
  User,
  Shield,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useUser, useClerk } from "@clerk/clerk-react";

const Navbar = () => {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 backdrop-blur-xl border-b border-white/10 fixed w-full top-0 z-40"
    >
      <div className="container mx-auto px-6 h-16">
        <div className="flex items-center justify-between h-full">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-8"
          >
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-80 transition-all"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center"
                >
                  <Shield className="w-2 h-2 text-white" />
                </motion.div>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl font-bold text-white"
              >
                SecureChats
              </motion.h1>
            </Link>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-purple-400 text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">End-to-end encrypted</span>
              <Sparkles className="w-4 h-4" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300"
              >
                <Link to="/settings">
                  <Settings className="w-5 h-5 text-white" />
                </Link>
              </motion.button>

              {isSignedIn && user && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300"
                  >
                    <Link to="/profile">
                      <User className="w-5 h-5 text-white" />
                    </Link>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 rounded-xl flex items-center justify-center transition-all duration-300"
                  >
                    <LogOut className="w-5 h-5 text-red-400" />
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
