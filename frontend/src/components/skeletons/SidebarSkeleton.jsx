import { motion } from "framer-motion";

const SidebarSkeleton = () => {
  const skeletonUsers = Array.from({ length: 8 }, (_, i) => i);

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="h-full w-20 lg:w-80 border-r border-white/10 flex flex-col transition-all duration-300 bg-white/5 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="border-b border-white/10 w-full p-3 lg:p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <div className="w-4 h-4 lg:w-6 lg:h-6 bg-white/20 rounded animate-pulse"></div>
          </div>
          <div className="hidden lg:block">
            <div className="h-4 bg-white/20 rounded animate-pulse w-16"></div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="overflow-y-auto w-full p-3 space-y-2"
      >
        {skeletonUsers.map((_, index) => (
          <motion.div
            key={index}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="w-full p-4 rounded-2xl flex items-center gap-4 transition-all duration-300"
          >
            <div className="relative">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white/20 rounded-2xl animate-pulse"></div>
            </div>

            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <div className="h-4 bg-white/20 rounded animate-pulse w-24"></div>
              </div>
              <div className="text-sm text-white/60">
                <div className="h-3 bg-white/10 rounded animate-pulse w-16 mt-1"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.aside>
  );
};

export default SidebarSkeleton;
