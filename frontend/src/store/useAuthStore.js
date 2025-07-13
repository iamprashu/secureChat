import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? `http://${window.location.hostname}:3000`
    : window.location.origin;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSyncing: false,
  onlineUsers: [],
  socket: null,

  syncClerkUser: async (getToken) => {
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
      console.log("Sync response:", res.data);
      set({ authUser: res.data });
      get().connectSocket();
      toast.success("User synced successfully");
    } catch (error) {
      console.error("Error syncing Clerk user:", error);
      toast.error("Failed to sync user");
    } finally {
      set({ isSyncing: false });
    }
  },

  checkAuth: async (getToken) => {
    try {
      const token = await getToken({ template: "demoT" });

      const res = await axiosInstance.get("/auth/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    }
  },

  logout: () => {
    set({ authUser: null });
    get().disconnectSocket();
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
      console.log("error in update profile:", error);
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
}));
