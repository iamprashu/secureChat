import React, { useState } from "react";
import {
  IoNotifications,
  IoCheckmark,
  IoClose,
  IoPersonAdd,
  IoChatbubbles,
  IoPeople,
} from "react-icons/io5";

const Notifications = () => {
  const [filter, setFilter] = useState("all");

  const notifications = [
    {
      id: 1,
      type: "friend_request",
      title: "New Friend Request",
      message: "Alice Johnson sent you a friend request",
      time: "2m ago",
      read: false,
      avatar: "A",
    },
    {
      id: 2,
      type: "message",
      title: "New Message",
      message: "Bob Smith sent you a message",
      time: "5m ago",
      read: false,
      avatar: "B",
    },
    {
      id: 3,
      type: "group_invite",
      title: "Group Invitation",
      message: "You've been invited to join Team Alpha",
      time: "1h ago",
      read: true,
      avatar: "T",
    },
    {
      id: 4,
      type: "mention",
      title: "You were mentioned",
      message: "Carol Davis mentioned you in Project Beta",
      time: "2h ago",
      read: true,
      avatar: "C",
    },
    {
      id: 5,
      type: "friend_request",
      title: "New Friend Request",
      message: "David Wilson sent you a friend request",
      time: "3h ago",
      read: false,
      avatar: "D",
    },
    {
      id: 6,
      type: "message",
      title: "New Message",
      message: "Emma Thompson sent you a message",
      time: "5h ago",
      read: true,
      avatar: "E",
    },
    {
      id: 7,
      type: "group_invite",
      title: "Group Invitation",
      message: "You've been invited to join Design Team",
      time: "1d ago",
      read: true,
      avatar: "D",
    },
    {
      id: 8,
      type: "mention",
      title: "You were mentioned",
      message: "Mike Chen mentioned you in General Chat",
      time: "2d ago",
      read: true,
      avatar: "M",
    },
  ];

  const filteredNotifications = notifications.filter((notification) => {
    return filter === "all" || notification.type === filter;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case "friend_request":
        return <IoPersonAdd className="text-blue-500" size={20} />;
      case "message":
        return <IoChatbubbles className="text-green-500" size={20} />;
      case "group_invite":
        return <IoPeople className="text-purple-500" size={20} />;
      case "mention":
        return <IoNotifications className="text-yellow-500" size={20} />;
      default:
        return <IoNotifications className="text-gray-500" size={20} />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "friend_request":
        return "border-blue-500";
      case "message":
        return "border-green-500";
      case "group_invite":
        return "border-purple-500";
      case "mention":
        return "border-yellow-500";
      default:
        return "border-gray-500";
    }
  };

  return (
    <div className="min-h-full p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
        <p className="text-gray-400">
          Stay updated with your latest activities
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Notifications</option>
              <option value="friend_request">Friend Requests</option>
              <option value="message">Messages</option>
              <option value="group_invite">Group Invites</option>
              <option value="mention">Mentions</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors">
              Mark all as read
            </button>
          </div>

          <div className="text-gray-400 text-sm">
            {filteredNotifications.filter((n) => !n.read).length} unread
          </div>
        </div>

        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start space-x-4 p-4 rounded-lg transition-colors cursor-pointer hover:bg-gray-700 ${
                !notification.read ? "bg-gray-700/50" : ""
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {notification.avatar}
                  </span>
                </div>
                <div
                  className={`absolute -bottom-1 -right-1 w-6 h-6 ${getTypeColor(
                    notification.type
                  )} bg-gray-800 rounded-full border-2 flex items-center justify-center`}
                >
                  {getTypeIcon(notification.type)}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-medium">
                      {notification.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {notification.message}
                    </p>
                    <span className="text-gray-500 text-xs mt-2 block">
                      {notification.time}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    )}
                    <button className="p-1 hover:bg-gray-600 rounded transition-colors">
                      <IoCheckmark className="text-green-500" size={16} />
                    </button>
                    <button className="p-1 hover:bg-gray-600 rounded transition-colors">
                      <IoClose className="text-red-500" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <IoNotifications className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-400">No notifications found</p>
            <p className="text-gray-500 text-sm mt-2">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
