import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import {
  generateAESKey,
  encryptWithAES,
  decryptWithAES,
  encryptAESKeyWithRSA,
  decryptAESKeyWithRSA,
  importPublicKey
} from "../lib/utils";

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
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ users: res.data });
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId, getToken) => {
    set({ isMessagesLoading: true });
    try {
      const token = await getToken({ template: "demoT" });
      const res = await axiosInstance.get(`/messages/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { privateKey, authUser } = useAuthStore.getState();
      const decryptedMessages = await Promise.all(
        res.data.map(async (msg) => {
          if (msg.encryptedMessage?.encrypted && msg.encryptedMessage?.iv && msg.encryptedAESKeys && privateKey) {
            try {
              const encryptedAESKey = msg.encryptedAESKeys[authUser._id.toString()] || msg.encryptedAESKeys[authUser._id];
              if (encryptedAESKey) {
                const aesKey = await decryptAESKeyWithRSA(encryptedAESKey, privateKey);
                const decryptedText = await decryptWithAES(
                  msg.encryptedMessage.encrypted,
                  msg.encryptedMessage.iv,
                  aesKey
                );
                return { ...msg, text: decryptedText };
              }
            } catch (error) {
              return { ...msg, text: "[Encrypted message]" };
            }
          }
          return { ...msg, text: msg.text || "[Message]" };
        })
      );

      set({ messages: decryptedMessages });
    } catch (error) {
      toast.error("Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData, getToken) => {
    const { selectedUser } = get();
    const { authUser, getPublicKey } = useAuthStore.getState();

    if (!selectedUser || !messageData.text?.trim()) return;

    const optimisticMessage = {
      _id: `temp_${Date.now()}_${Math.random()}`,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    set((state) => ({
      messages: [...state.messages, optimisticMessage],
    }));

    try {
      const token = await getToken({ template: "demoT" });
      let encryptedMessageData = { ...messageData };

      if (messageData.text) {
        const recipientPublicKeyString = await getPublicKey(selectedUser._id);
        const senderPublicKeyString = await getPublicKey(authUser._id);

        if (recipientPublicKeyString && senderPublicKeyString) {
          try {
            const recipientPublicKey = await importPublicKey(recipientPublicKeyString);
            const senderPublicKey = await importPublicKey(senderPublicKeyString);
            const aesKey = await generateAESKey();
            const encryptedMessage = await encryptWithAES(messageData.text, aesKey);

            // Encrypt AES key for both users so both can decrypt
            const encryptedAESKeyForSender = await encryptAESKeyWithRSA(aesKey, senderPublicKey);
            const encryptedAESKeyForReceiver = await encryptAESKeyWithRSA(aesKey, recipientPublicKey);

            encryptedMessageData = {
              ...messageData,
              text: null,
              encryptedMessage,
              encryptedAESKeys: {
                [authUser._id.toString()]: encryptedAESKeyForSender,
                [selectedUser._id.toString()]: encryptedAESKeyForReceiver,
              },
            };
          } catch (encryptError) {
          }
        }
      }

      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        encryptedMessageData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const finalMessage = { ...res.data, text: messageData.text };

      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.isOptimistic && msg._id === optimisticMessage._id ? finalMessage : msg
        ),
      }));
    } catch (error) {
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== optimisticMessage._id),
      }));
      toast.error("Failed to send message");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", async (newMessage) => {
      const { messages } = get();
      const { authUser, privateKey } = useAuthStore.getState();

      const isMessageForCurrentChat =
        (newMessage.senderId === selectedUser._id && newMessage.receiverId === authUser._id) ||
        (newMessage.senderId === authUser._id && newMessage.receiverId === selectedUser._id);

      if (!isMessageForCurrentChat) return;

      let decryptedNewMessage = { ...newMessage };

      if (newMessage.encryptedMessage?.encrypted && newMessage.encryptedMessage?.iv && newMessage.encryptedAESKeys && privateKey) {
        try {
          const encryptedAESKey = newMessage.encryptedAESKeys[authUser._id.toString()] || newMessage.encryptedAESKeys[authUser._id];
          if (encryptedAESKey) {
            const aesKey = await decryptAESKeyWithRSA(encryptedAESKey, privateKey);
            const decryptedText = await decryptWithAES(
              newMessage.encryptedMessage.encrypted,
              newMessage.encryptedMessage.iv,
              aesKey
            );
            decryptedNewMessage.text = decryptedText;
          } else {
            decryptedNewMessage.text = "[Encrypted message]";
          }
        } catch (error) {
          decryptedNewMessage.text = "[Encrypted message]";
        }
      }

      const messageExists = messages.some((msg) => msg._id === newMessage._id);
      if (messageExists) return;

      const optimisticIndex = messages.findIndex(
        (msg) => msg.isOptimistic && msg.senderId === newMessage.senderId && msg.text === decryptedNewMessage.text
      );

      if (optimisticIndex !== -1) {
        set((state) => ({
          messages: state.messages.map((msg, index) =>
            index === optimisticIndex ? decryptedNewMessage : msg
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
    if (socket) {
      socket.off("newMessage");
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  clearMessages: () => set({ messages: [] }),
}));