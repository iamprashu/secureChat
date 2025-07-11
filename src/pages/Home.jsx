import React from "react";
import { IoAdd, IoSearch, IoFilter } from "react-icons/io5";

const Home = () => {
  const recentChats = [
    {
      id: 1,
      name: "Alice Johnson",
      lastMessage: "Hey, how's it going?",
      time: "2m ago",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Bob Smith",
      lastMessage: "Did you see the new update?",
      time: "1h ago",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Carol Davis",
      lastMessage: "Thanks for the help!",
      time: "3h ago",
      unread: 1,
      online: true,
    },
    {
      id: 4,
      name: "David Wilson",
      lastMessage: "Meeting at 3 PM",
      time: "5h ago",
      unread: 0,
      online: false,
    },
  ];

  const quickStats = [
    { label: "Total Chats", value: "24", color: "bg-blue-500" },
    { label: "Online Friends", value: "8", color: "bg-green-500" },
    { label: "Unread Messages", value: "12", color: "bg-red-500" },
    { label: "Groups", value: "5", color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-full p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back!</h1>
        <p className="text-gray-400">Here's what's happening with your chats</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <div
                className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
              >
                <span className="text-white font-semibold">{stat.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Chats</h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <IoSearch className="text-gray-400" size={20} />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <IoFilter className="text-gray-400" size={20} />
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <IoAdd size={20} />
              <span>New Chat</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {recentChats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center space-x-4 p-4 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {chat.name.charAt(0)}
                  </span>
                </div>
                {chat.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-medium">{chat.name}</h3>
                  <span className="text-gray-400 text-sm">{chat.time}</span>
                </div>
                <p className="text-gray-400 text-sm truncate">
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unread > 0 && (
                <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
