import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
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
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
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
      <div className="flex-shrink-0">
        <ChatHeader />
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-full overflow-y-auto overflow-x-hidden p-6 space-y-4 no-scrollbar"
        >
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message._id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.3,
                  type: "spring",
                  stiffness: 100,
                }}
                className={`flex min-w-0 ${
                  message.senderId === authUser._id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`max-w-[75%] sm:max-w-[70%] md:max-w-[65%] lg:max-w-[55%] break-words whitespace-pre-wrap overflow-hidden min-w-0 ${
                    message.senderId === authUser._id
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-white/10 backdrop-blur-sm text-white border border-white/20"
                  } rounded-2xl p-3 sm:p-4 shadow-lg`}
                  style={{ wordBreak: "break-word" }}
                >
                  {message.image && (
                    <motion.img
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      src={message.image}
                      alt="Attachment"
                      className="rounded-xl mb-3 max-w-full h-auto"
                    />
                  )}
                  {message.text && (
                    <p
                      className="break-words whitespace-pre-wrap text-sm leading-relaxed overflow-hidden"
                      style={{ wordBreak: "break-word" }}
                    >
                      {message.text}
                    </p>
                  )}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className={`text-xs mt-2 ${
                      message.senderId === authUser._id
                        ? "text-white/70"
                        : "text-white/50"
                    }`}
                  >
                    {formatMessageTime(message.createdAt)}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messageEndRef} />
        </motion.div>
      </div>

      <div className="flex-shrink-0">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
