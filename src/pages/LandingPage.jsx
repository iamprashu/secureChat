import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const LandingPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex flex-col">
    <Navbar />
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 w-full max-w-xl p-8 flex flex-col items-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center"
        >
          Welcome to SecureChats
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg text-purple-200 mb-8 text-center"
        >
          Your privacy-first, end-to-end encrypted chat platform. Connect
          securely and chat freely.
        </motion.p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            to="/login"
            className="flex-1 text-center px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all text-lg shadow-lg"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="flex-1 text-center px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-purple-200 font-semibold transition-all text-lg border border-purple-400 shadow-lg"
          >
            Sign Up
          </Link>
        </div>
      </motion.div>
    </div>
  </div>
);

export default LandingPage;
