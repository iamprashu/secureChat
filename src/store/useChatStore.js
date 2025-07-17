import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import { encryptMessage, decryptMessage } from "../lib/utils";

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
      // Decrypt each message's text
      const decryptedMessages = res.data.map((msg) => ({
        ...msg,
        text: msg.text ? decryptMessage(msg.text) : msg.text,
      }));
      set({ messages: decryptedMessages });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData, getToken) => {
    const { selectedUser } = get();
    const { authUser } = useAuthStore.getState();

    // Encrypt the message text before sending
    const encryptedText = encryptMessage(messageData.text);
    const encryptedMessageData = { ...messageData, text: encryptedText };

    const optimisticMessage = {
      _id: `temp_${Date.now()}`,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text, // Show plaintext optimistically
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    set((state) => {
      return {
        messages: [...state.messages, optimisticMessage],
      };
    });

    try {
      const token = await getToken({ template: "demoT" });

      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        encryptedMessageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Decrypt the returned message
      const decryptedMessage = { ...res.data, text: decryptMessage(res.data.text) };

      set((state) => {
        return {
          messages: state.messages.map((msg) =>
            msg.isOptimistic ? decryptedMessage : msg
          ),
        };
      });
    } catch (error) {
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
      const { messages } = get();
      const { authUser } = useAuthStore.getState();

      const isMessageForCurrentChat =
        (newMessage.senderId === selectedUser._id &&
          newMessage.receiverId === authUser._id) ||
        (newMessage.senderId === authUser._id &&
          newMessage.receiverId === selectedUser._id);

      if (!isMessageForCurrentChat) {
        return;
      }

      // Decrypt the message text
      const decryptedNewMessage = { ...newMessage, text: newMessage.text ? decryptMessage(newMessage.text) : newMessage.text };

      const messageExists = messages.some((msg) => msg._id === newMessage._id);
      if (messageExists) {
        return;
      }

      const optimisticMessageExists = messages.some(
        (msg) =>
          msg.isOptimistic &&
          msg.senderId === newMessage.senderId &&
          msg.text === decryptedNewMessage.text
      );

      if (optimisticMessageExists) {
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.isOptimistic &&
            msg.senderId === newMessage.senderId &&
            msg.text === decryptedNewMessage.text
              ? decryptedNewMessage
              : msg
          ),
        }));
      } else {
        set((state) => ({
          messages: [...state.messages, decryptedNewMessage],
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
