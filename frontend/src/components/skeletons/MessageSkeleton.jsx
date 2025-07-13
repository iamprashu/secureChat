const MessageSkeleton = () => {
  const skeletonMessages = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {skeletonMessages.map((_, index) => (
        <div
          key={index}
          className={`flex ${
            index % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          <div
            className={`max-w-[70%] lg:max-w-[60%] rounded-2xl p-4 shadow-lg ${
              index % 2 === 0
                ? "bg-white/10 backdrop-blur-sm border border-white/20"
                : "bg-gradient-to-r from-purple-500/20 to-pink-500/20"
            }`}
          >
            <div className="space-y-3">
              <div className="h-4 bg-white/20 rounded animate-pulse"></div>
              <div className="h-4 bg-white/20 rounded animate-pulse w-3/4"></div>
              <div className="h-3 bg-white/10 rounded animate-pulse w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
