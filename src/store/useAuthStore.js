import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import {
  generateRSAKeyPair,
  exportPublicKey,
  exportPrivateKey,
  storePrivateKey,
  getStoredPrivateKey,
  clearStoredKeys
} from "../lib/utils.js";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://securechat-backend-qgtd.onrender.com";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSyncing: false,
  onlineUsers: [],
  socket: null,
  privateKey: null,
  isInitializingE2EE: false,
  e2eeInitialized: false,

  syncClerkUser: async (getToken, clerkUserId) => {
    set({ isSyncing: true });
    try {
      const token = await getToken({ template: "demoT" });

      const res = await axiosInstance.post(
        "/auth/sync-clerk",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ authUser: res.data });

      await get().initializeE2EE(clerkUserId, getToken);
      get().connectSocket();
      toast.success("User synced successfully");
    } catch (error) {
      console.error("Error syncing Clerk user:", error);
      toast.error("Failed to sync user");
    } finally {
      set({ isSyncing: false });
    }
  },

  checkAuth: async (getToken, clerkUserId) => {
    try {
      const token = await getToken({ template: "demoT" });

      const res = await axiosInstance.get("/auth/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ authUser: res.data });

      if (clerkUserId) {
        await get().initializeE2EE(clerkUserId, getToken);
      }
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
    }
  },

  logout: () => {
    set({ 
      authUser: null, 
      privateKey: null, 
      isInitializingE2EE: false, 
      e2eeInitialized: false 
    });
    get().disconnectSocket();
    clearStoredKeys();
    toast.success("Logged out successfully");
  },

  updateProfile: async (data, getToken) => {
    try {
      const token = await getToken({ template: "demoT" });

      const res = await axiosInstance.put("/auth/update-profile", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  initializeE2EE: async (userId, getToken) => {
    const { isInitializingE2EE, e2eeInitialized } = get();
    
    if (isInitializingE2EE || e2eeInitialized) return;
    
    set({ isInitializingE2EE: true });
    
    try {
      let storedPrivateKey = getStoredPrivateKey();

      if (!storedPrivateKey) {
        const keyPair = await generateRSAKeyPair();
        const publicKeyString = await exportPublicKey(keyPair.publicKey);
        const privateKeyString = await exportPrivateKey(keyPair.privateKey);

        storePrivateKey(privateKeyString);

        const token = await getToken({ template: "demoT" });
        await axiosInstance.post("/auth/save-public-key", {
          publicKey: publicKeyString,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        set({ privateKey: keyPair.privateKey, e2eeInitialized: true });
      } else {
        const { importPrivateKey } = await import("../lib/utils.js");
        const privateKey = await importPrivateKey(storedPrivateKey);

        try {
          const token = await getToken({ template: "demoT" });
          const verifyResponse = await axiosInstance.get(`/auth/get-public-key/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!verifyResponse.data.publicKey) {
            const keyPair = await generateRSAKeyPair();
            const publicKeyString = await exportPublicKey(keyPair.publicKey);
            const privateKeyString = await exportPrivateKey(keyPair.privateKey);

            storePrivateKey(privateKeyString);

            await axiosInstance.post("/auth/save-public-key", {
              publicKey: publicKeyString,
            }, {
              headers: { Authorization: `Bearer ${token}` },
            });

            set({ privateKey: keyPair.privateKey, e2eeInitialized: true });
            return;
          }
        } catch (error) {
        }

        set({ privateKey, e2eeInitialized: true });
      }
    } catch (error) {
    } finally {
      set({ isInitializingE2EE: false });
    }
  },

  getPublicKey: async (userId) => {
    try {
      const res = await axiosInstance.get(`/auth/get-public-key/${userId}`);
      return res.data.publicKey;
    } catch (error) {
      return null;
    }
  },
}));
