import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect, useState } from "react";
import { ClerkProvider, useUser, useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { useAuthStore } from "./store/useAuthStore";

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const AppContent = () => {
  const { theme } = useThemeStore();
  const { user, isLoaded } = useUser();
  const { isSignedIn } = useAuth();
  const { syncClerkUser, authUser } = useAuthStore();
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleClerkSync = async () => {
      if (isLoaded && isSignedIn && user && !authUser) {
        setIsSyncing(true);
        try {
          await syncClerkUser({
            clerkUserId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            fullName: user.fullName,
            profilePic: user.imageUrl,
          });
        } catch (error) {
          console.error("Error syncing Clerk user:", error);
        } finally {
          setIsSyncing(false);
        }
      }
    };

    handleClerkSync();
  }, [isLoaded, isSignedIn, user, syncClerkUser, authUser]);

  if (!isLoaded || isSyncing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader className="size-10 text-white" />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={isSignedIn ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!isSignedIn ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!isSignedIn ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/settings"
          element={isSignedIn ? <SettingsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isSignedIn ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
};

const App = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <AppContent />
    </ClerkProvider>
  );
};

export default App;
