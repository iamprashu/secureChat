import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { Image, Send, X, Shield, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();
  const { getToken } = useAuth();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage(
        {
          text: text.trim(),
          image: imagePreview,
        },
        getToken
      );

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-3 sm:p-6 bg-white/5 backdrop-blur-sm border-t border-white/10 sticky bottom-0 w-full">
      {imagePreview && (
        <div className="mb-4 flex items-center gap-3">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-2xl border-2 border-white/20"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          </div>
          <span className="text-white/70 text-sm">Image ready to send</span>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Type a secure message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Shield
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-500"
            title="End-to-end encrypted"
          />
        </div>

        <button
          type="button"
          className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
          onClick={() => fileInputRef.current?.click()}
        >
          <Image className="w-5 h-5 text-white" />
        </button>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </form>

      <div className="flex items-center justify-center gap-2 mt-3 text-purple-400 text-xs">
        <Sparkles className="w-3 h-3" />
        <span>Messages are end-to-end encrypted</span>
        <Sparkles className="w-3 h-3" />
      </div>
    </div>
  );
};

export default MessageInput;
