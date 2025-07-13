import { MessageSquare, Shield, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const NoChatSelected = () => {
  return (
    <div className="w-full h-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-br from-white/5 to-white/10">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md text-center space-y-8"
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <MessageSquare className="w-12 h-12 text-white" />
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
              className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center"
            >
              <Shield className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-bold text-white">
            Welcome to SecureChats!
          </h2>
          <p className="text-white/70 text-lg">
            Select a conversation from the sidebar to start secure messaging
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex items-center justify-center gap-2 text-purple-400"
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-sm font-medium">
            End-to-end encrypted messaging
          </span>
          <Sparkles className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NoChatSelected;
