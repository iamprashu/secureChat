import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { useAuth } from "@clerk/clerk-react";
import { formatMessageTime } from "../lib/utils";

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
    getMessages(selectedUser._id, getToken);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    getToken,
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
        <div className="h-full overflow-y-auto overflow-x-hidden p-6 space-y-4 no-scrollbar">
          {messages && messages.length > 0 ? (
            messages.map((message) => {
              return (
                <div
                  key={message._id}
                  className={`flex min-w-0 ${
                    message.senderId === authUser._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] sm:max-w-[70%] md:max-w-[65%] lg:max-w-[55%] break-words whitespace-pre-wrap overflow-hidden min-w-0 ${
                      message.senderId === authUser._id
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "bg-white/10 backdrop-blur-sm text-white border border-white/20"
                    } rounded-bl-2xl rounded-tr-2xl p-3 sm:p-3 shadow-lg ${
                      message.isOptimistic ? "opacity-80" : ""
                    }`}
                    style={{ wordBreak: "break-word" }}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="rounded-xl mb-3 max-w-full h-auto"
                      />
                    )}

                    {message.text && (
                      <p
                        className="break-words whitespace-pre-wrap text-sm md:text-xl leading-relaxed overflow-hidden"
                        style={{ wordBreak: "break-word" }}
                      >
                        {message.text}
                      </p>
                    )}
                    <div
                      className={`text-xs mt-2 ${
                        message.senderId === authUser._id
                          ? "text-white/70"
                          : "text-white/50"
                      }`}
                    >
                      {formatMessageTime(message.createdAt)}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center h-full text-white/50">
              No messages yet
            </div>
          )}
          <div ref={messageEndRef} />
        </div>
      </div>

      <div className="flex-shrink-0">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
