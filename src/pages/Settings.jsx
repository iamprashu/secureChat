import React, { useState } from "react";
import {
  IoPerson,
  IoShield,
  IoNotifications,
  IoColorPalette,
  IoLanguage,
  IoHelpCircle,
} from "react-icons/io5";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    messages: true,
    friendRequests: true,
    groupInvites: true,
    mentions: true,
    sound: true,
    email: false,
  });

  const [privacy, setPrivacy] = useState({
    showOnline: true,
    showLastSeen: true,
    allowFriendRequests: true,
    allowGroupInvites: true,
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: IoPerson },
    { id: "privacy", label: "Privacy", icon: IoShield },
    { id: "notifications", label: "Notifications", icon: IoNotifications },
    { id: "appearance", label: "Appearance", icon: IoColorPalette },
    { id: "language", label: "Language", icon: IoLanguage },
    { id: "help", label: "Help", icon: IoHelpCircle },
  ];

  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePrivacyChange = (key) => {
    setPrivacy((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-full p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Customize your SecureChat experience</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4">
          <div className="bg-gray-800 rounded-lg p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <tab.icon size={20} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="lg:w-3/4">
          <div className="bg-gray-800 rounded-lg p-6">
            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-6">
                  Profile Settings
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xl">
                        U
                      </span>
                    </div>
                    <div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                        Change Avatar
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue="User"
                        className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Name"
                        className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue="user@example.com"
                        className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Bio
                      </label>
                      <textarea
                        rows="3"
                        defaultValue="Hello, I'm using SecureChat!"
                        className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-6">
                  Privacy Settings
                </h2>
                <div className="space-y-4">
                  {Object.entries(privacy).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
                    >
                      <div>
                        <h3 className="text-white font-medium capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {key === "showOnline" &&
                            "Allow others to see when you're online"}
                          {key === "showLastSeen" &&
                            "Show when you were last active"}
                          {key === "allowFriendRequests" &&
                            "Allow others to send you friend requests"}
                          {key === "allowGroupInvites" &&
                            "Allow others to invite you to groups"}
                        </p>
                      </div>
                      <button
                        onClick={() => handlePrivacyChange(key)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          value ? "bg-blue-600" : "bg-gray-600"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full transition-transform ${
                            value
                              ? "transform translate-x-6"
                              : "transform translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-6">
                  Notification Settings
                </h2>
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
                    >
                      <div>
                        <h3 className="text-white font-medium capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {key === "messages" &&
                            "Get notified for new messages"}
                          {key === "friendRequests" &&
                            "Get notified for friend requests"}
                          {key === "groupInvites" &&
                            "Get notified for group invitations"}
                          {key === "mentions" &&
                            "Get notified when someone mentions you"}
                          {key === "sound" && "Play sound for notifications"}
                          {key === "email" && "Send email notifications"}
                        </p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange(key)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          value ? "bg-blue-600" : "bg-gray-600"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full transition-transform ${
                            value
                              ? "transform translate-x-6"
                              : "transform translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-6">
                  Appearance Settings
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-medium mb-4">Theme</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button className="p-4 bg-gray-700 rounded-lg border-2 border-blue-500">
                        <div className="text-white font-medium">Dark</div>
                        <div className="text-gray-400 text-sm">Current</div>
                      </button>
                      <button className="p-4 bg-gray-700 rounded-lg border-2 border-transparent hover:border-gray-600">
                        <div className="text-white font-medium">Light</div>
                        <div className="text-gray-400 text-sm">Coming soon</div>
                      </button>
                      <button className="p-4 bg-gray-700 rounded-lg border-2 border-transparent hover:border-gray-600">
                        <div className="text-white font-medium">Auto</div>
                        <div className="text-gray-400 text-sm">Coming soon</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-medium mb-4">Font Size</h3>
                    <div className="flex items-center space-x-4">
                      <button className="px-4 py-2 bg-gray-700 rounded-lg text-white">
                        Small
                      </button>
                      <button className="px-4 py-2 bg-blue-600 rounded-lg text-white">
                        Medium
                      </button>
                      <button className="px-4 py-2 bg-gray-700 rounded-lg text-white">
                        Large
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "language" && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-6">
                  Language Settings
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Language
                    </label>
                    <select className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="it">Italian</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "help" && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-6">
                  Help & Support
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h3 className="text-white font-medium mb-2">FAQ</h3>
                    <p className="text-gray-400 text-sm">
                      Find answers to common questions
                    </p>
                  </div>
                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h3 className="text-white font-medium mb-2">
                      Contact Support
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Get help from our support team
                    </p>
                  </div>
                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h3 className="text-white font-medium mb-2">
                      Privacy Policy
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Read our privacy policy
                    </p>
                  </div>
                  <div className="p-4 bg-gray-700 rounded-lg">
                    <h3 className="text-white font-medium mb-2">
                      Terms of Service
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Read our terms of service
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
