import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";
import { ClerkProvider, useUser, useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import Navbar from "./components/Navbar";

const VITE_CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const AppContent = () => {
  const { theme } = useThemeStore();
  const { user, isLoaded } = useUser();
  const { isSignedIn, getToken } = useAuth();
  const { syncClerkUser, authUser, isSyncing } = useAuthStore();

  useEffect(() => {
    const handleClerkSync = async () => {
      if (!isLoaded || !isSignedIn || !user) {
        return;
      }

      if (!authUser && !isSyncing) {
        try {
          await syncClerkUser(getToken);
        } catch (error) {
          console.error("Error syncing Clerk user:", error);
        }
      }
    };

    handleClerkSync();
  }, [isLoaded, isSignedIn, user, authUser]);

  if (!isLoaded || isSyncing || (isSignedIn && !authUser)) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex-col gap-5">
        {isSignedIn && <p className="text-center text-xl">This is a free cloud instance it may take time to connect backend <br/>i am sure that it won't take much time</p>}
        <div className="animate-spin">
          
          <Loader className="size-10 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={isSignedIn && authUser ? <HomePage /> : <LandingPage />}
        />
        <Route
          path="/signup"
          element={!isSignedIn ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!isSignedIn ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/login/sso-callback" element={<Navigate to="/" />} />

        <Route
          path="/profile"
          element={
            isSignedIn && authUser ? <ProfilePage /> : <Navigate to="/" />
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

const App = () => {
  return (
    <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY}>
      <AppContent />
    </ClerkProvider>
  );
};

export default App;
