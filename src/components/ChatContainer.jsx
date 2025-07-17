import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { useAuth } from "@clerk/clerk-react";
import { formatMessageTime } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const { getToken } = useAuth();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id, getToken);
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id]);

  useEffect(() => {
    if (messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-gradient-to-br from-white/5 to-white/10">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-white/5 to-white/10">
      <ChatHeader />

      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full overflow-y-auto p-4 space-y-3 no-scrollbar">
          <AnimatePresence initial={false}>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <motion.div
                  key={`${message._id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    message.senderId === authUser._id ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] sm:max-w-[70%] rounded-2xl p-3 shadow-lg ${
                      message.senderId === authUser._id
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "bg-white/10 backdrop-blur-sm text-white border border-white/20"
                    } ${message.isOptimistic ? "opacity-70" : ""}`}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="rounded-xl mb-2 max-w-full h-auto"
                      />
                    )}

                    {message.text && (
                      <p className="text-sm leading-relaxed break-words">
                        {message.text}
                      </p>
                    )}

                    <div
                      className={`text-xs mt-1 ${
                        message.senderId === authUser._id
                          ? "text-white/70"
                          : "text-white/50"
                      }`}
                    >
                      {formatMessageTime(message.createdAt)}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-white/50">
                  <div className="text-4xl mb-2">💬</div>
                  <p>No messages yet</p>
                  <p className="text-sm">Start the conversation!</p>
                </div>
              </div>
            )}
          </AnimatePresence>
          <div ref={messageEndRef} />
        </div>
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
