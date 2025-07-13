import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async (getToken) => {
    set({ isUsersLoading: true });
    try {
      const token = await getToken({ template: "demoT" });

      const res = await axiosInstance.get("/messages/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId, getToken) => {
    set({ isMessagesLoading: true });
    try {
      const token = await getToken({ template: "demoT" });

      const res = await axiosInstance.get(`/messages/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData, getToken) => {
    const { selectedUser } = get();
    const { authUser } = useAuthStore.getState();

    console.log("Sending message:", messageData);

    const optimisticMessage = {
      _id: `temp_${Date.now()}`,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    console.log("Adding optimistic message:", optimisticMessage);

    set((state) => {
      console.log("Current messages before optimistic:", state.messages.length);
      return {
        messages: [...state.messages, optimisticMessage],
      };
    });

    try {
      const token = await getToken({ template: "demoT" });

      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Server response:", res.data);

      set((state) => {
        console.log("Replacing optimistic message");
        return {
          messages: state.messages.map((msg) =>
            msg.isOptimistic ? res.data : msg
          ),
        };
      });
    } catch (error) {
      console.error("Error sending message:", error);
      set((state) => ({
        messages: state.messages.filter((msg) => !msg.isOptimistic),
      }));
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      console.log("Received new message via socket:", newMessage);
      const { messages } = get();
      const { authUser } = useAuthStore.getState();

      const isMessageForCurrentChat =
        (newMessage.senderId === selectedUser._id &&
          newMessage.receiverId === authUser._id) ||
        (newMessage.senderId === authUser._id &&
          newMessage.receiverId === selectedUser._id);

      if (!isMessageForCurrentChat) {
        console.log("Message not for current chat, ignoring");
        return;
      }

      const messageExists = messages.some((msg) => msg._id === newMessage._id);
      if (messageExists) {
        console.log("Message already exists, ignoring");
        return;
      }

      const optimisticMessageExists = messages.some(
        (msg) =>
          msg.isOptimistic &&
          msg.senderId === newMessage.senderId &&
          msg.text === newMessage.text
      );

      if (optimisticMessageExists) {
        console.log("Replacing optimistic message with real message");
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.isOptimistic &&
            msg.senderId === newMessage.senderId &&
            msg.text === newMessage.text
              ? newMessage
              : msg
          ),
        }));
      } else {
        console.log("Adding new message to state");
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
