import React, { useState } from "react";
import {
  IoSearch,
  IoFilter,
  IoAdd,
  IoEllipsisVertical,
  IoCheckmarkDone,
} from "react-icons/io5";

const Chats = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const chats = [
    {
      id: 1,
      name: "Alice Johnson",
      lastMessage: "Hey, how's it going?",
      time: "2m ago",
      unread: 2,
      online: true,
      type: "individual",
    },
    {
      id: 2,
      name: "Bob Smith",
      lastMessage: "Did you see the new update?",
      time: "1h ago",
      unread: 0,
      online: false,
      type: "individual",
    },
    {
      id: 3,
      name: "Carol Davis",
      lastMessage: "Thanks for the help!",
      time: "3h ago",
      unread: 1,
      online: true,
      type: "individual",
    },
    {
      id: 4,
      name: "David Wilson",
      lastMessage: "Meeting at 3 PM",
      time: "5h ago",
      unread: 0,
      online: false,
      type: "individual",
    },
    {
      id: 5,
      name: "Team Alpha",
      lastMessage: "John: Great work everyone!",
      time: "1d ago",
      unread: 5,
      online: true,
      type: "group",
      members: 8,
    },
    {
      id: 6,
      name: "Project Beta",
      lastMessage: "Sarah: Deadline is tomorrow",
      time: "2d ago",
      unread: 0,
      online: false,
      type: "group",
      members: 12,
    },
    {
      id: 7,
      name: "Emma Thompson",
      lastMessage: "Can you review this?",
      time: "1d ago",
      unread: 0,
      online: false,
      type: "individual",
    },
    {
      id: 8,
      name: "Mike Chen",
      lastMessage: "Let's catch up soon",
      time: "3d ago",
      unread: 0,
      online: true,
      type: "individual",
    },
  ];

  const filteredChats = chats.filter((chat) => {
    const matchesSearch = chat.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || chat.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-full p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Chats</h1>
        <p className="text-gray-400">Manage your conversations and groups</p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <IoSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search chats..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Chats</option>
              <option value="individual">Individual</option>
              <option value="group">Groups</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center space-x-2 transition-colors">
              <IoAdd size={20} />
              <span>New Chat</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {filteredChats.map((chat) => (
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
                {chat.type === "group" && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-500 rounded-full border-2 border-gray-800 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {chat.members}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-white font-medium">{chat.name}</h3>
                    {chat.type === "group" && (
                      <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                        Group
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">{chat.time}</span>
                    <button className="p-1 hover:bg-gray-600 rounded transition-colors">
                      <IoEllipsisVertical className="text-gray-400" size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-gray-400 text-sm truncate flex-1">
                    {chat.lastMessage}
                  </p>
                  {chat.unread === 0 && (
                    <IoCheckmarkDone className="text-blue-500" size={16} />
                  )}
                </div>
              </div>

              {chat.unread > 0 && (
                <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredChats.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No chats found</p>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
              Start a new chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;
