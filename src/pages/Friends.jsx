import React, { useState } from "react";
import {
  IoSearch,
  IoAdd,
  IoPersonAdd,
  IoEllipsisVertical,
  IoCall,
  IoVideocam,
} from "react-icons/io5";

const Friends = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const friends = [
    {
      id: 1,
      name: "Alice Johnson",
      status: "online",
      lastSeen: "Now",
      mutualFriends: 5,
      avatar: "A",
    },
    {
      id: 2,
      name: "Bob Smith",
      status: "offline",
      lastSeen: "2h ago",
      mutualFriends: 3,
      avatar: "B",
    },
    {
      id: 3,
      name: "Carol Davis",
      status: "online",
      lastSeen: "Now",
      mutualFriends: 8,
      avatar: "C",
    },
    {
      id: 4,
      name: "David Wilson",
      status: "away",
      lastSeen: "30m ago",
      mutualFriends: 2,
      avatar: "D",
    },
    {
      id: 5,
      name: "Emma Thompson",
      status: "online",
      lastSeen: "Now",
      mutualFriends: 6,
      avatar: "E",
    },
    {
      id: 6,
      name: "Mike Chen",
      status: "offline",
      lastSeen: "1d ago",
      mutualFriends: 4,
      avatar: "M",
    },
    {
      id: 7,
      name: "Sarah Lee",
      status: "online",
      lastSeen: "Now",
      mutualFriends: 7,
      avatar: "S",
    },
    {
      id: 8,
      name: "Tom Anderson",
      status: "away",
      lastSeen: "1h ago",
      mutualFriends: 3,
      avatar: "T",
    },
  ];

  const filteredFriends = friends.filter((friend) => {
    const matchesSearch = friend.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || friend.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-full p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Friends</h1>
        <p className="text-gray-400">Connect with your friends and family</p>
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
                placeholder="Search friends..."
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
              <option value="all">All Friends</option>
              <option value="online">Online</option>
              <option value="away">Away</option>
              <option value="offline">Offline</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center space-x-2 transition-colors">
              <IoPersonAdd size={20} />
              <span>Add Friend</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFriends.map((friend) => (
            <div
              key={friend.id}
              className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {friend.avatar}
                    </span>
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(
                      friend.status
                    )} rounded-full border-2 border-gray-800`}
                  ></div>
                </div>

                <div className="flex-1">
                  <h3 className="text-white font-medium">{friend.name}</h3>
                  <p className="text-gray-400 text-sm">{friend.lastSeen}</p>
                  <p className="text-gray-400 text-sm">
                    {friend.mutualFriends} mutual friends
                  </p>
                </div>

                <div className="flex items-center space-x-1">
                  <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors">
                    <IoCall
                      className="text-gray-400 hover:text-green-500"
                      size={16}
                    />
                  </button>
                  <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors">
                    <IoVideocam
                      className="text-gray-400 hover:text-blue-500"
                      size={16}
                    />
                  </button>
                  <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors">
                    <IoEllipsisVertical className="text-gray-400" size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFriends.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No friends found</p>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
              Add your first friend
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
