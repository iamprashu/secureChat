import React, { useState } from "react";
import {
  IoSearch,
  IoFilter,
  IoPerson,
  IoChatbubbles,
  IoPeople,
} from "react-icons/io5";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const searchResults = [
    {
      id: 1,
      name: "Alice Johnson",
      type: "person",
      lastMessage: "Hey, how's it going?",
      avatar: "A",
      online: true,
    },
    {
      id: 2,
      name: "Team Alpha",
      type: "group",
      lastMessage: "John: Great work everyone!",
      avatar: "T",
      members: 8,
      online: true,
    },
    {
      id: 3,
      name: "Bob Smith",
      type: "person",
      lastMessage: "Did you see the new update?",
      avatar: "B",
      online: false,
    },
    {
      id: 4,
      name: "Project Beta",
      type: "group",
      lastMessage: "Sarah: Deadline is tomorrow",
      avatar: "P",
      members: 12,
      online: false,
    },
    {
      id: 5,
      name: "Carol Davis",
      type: "person",
      lastMessage: "Thanks for the help!",
      avatar: "C",
      online: true,
    },
    {
      id: 6,
      name: "David Wilson",
      type: "person",
      lastMessage: "Meeting at 3 PM",
      avatar: "D",
      online: false,
    },
    {
      id: 7,
      name: "Emma Thompson",
      type: "person",
      lastMessage: "Can you review this?",
      avatar: "E",
      online: false,
    },
    {
      id: 8,
      name: "Mike Chen",
      type: "person",
      lastMessage: "Let's catch up soon",
      avatar: "M",
      online: true,
    },
  ];

  const filteredResults = searchResults.filter((result) => {
    const matchesSearch = result.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || result.type === filter;
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case "person":
        return <IoPerson className="text-blue-500" size={16} />;
      case "group":
        return <IoPeople className="text-purple-500" size={16} />;
      default:
        return <IoChatbubbles className="text-gray-500" size={16} />;
    }
  };

  return (
    <div className="min-h-full p-6 max-w-6xl mx-auto ">
      <div className="mb-8 relative top-0 bg-gray-900 z-10">
        <h1 className="text-3xl font-bold text-white mb-2">Search</h1>
        <p className="text-gray-400">Find people, groups, and conversations</p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0  ">
          <div className="flex-1 max-w-md  ">
            <div className="relative">
              <IoSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search for people, groups, or messages..."
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
              <option value="all">All Results</option>
              <option value="person">People</option>
              <option value="group">Groups</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center space-x-2 transition-colors">
              <IoFilter size={20} />
              <span>Advanced</span>
            </button>
          </div>
        </div>

        {searchTerm && (
          <div className="mb-6">
            <p className="text-gray-400 text-sm">
              Found {filteredResults.length} result
              {filteredResults.length !== 1 ? "s" : ""} for "{searchTerm}"
            </p>
          </div>
        )}

        <div className="space-y-3">
          {filteredResults.map((result) => (
            <div
              key={result.id}
              className="flex items-center space-x-4 p-4 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {result.avatar}
                  </span>
                </div>
                {result.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                )}
                {result.type === "group" && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-500 rounded-full border-2 border-gray-800 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {result.members}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-white font-medium">{result.name}</h3>
                    {getTypeIcon(result.type)}
                    {result.type === "group" && (
                      <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                        Group
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">
                      {result.type === "group"
                        ? `${result.members} members`
                        : result.online
                        ? "Online"
                        : "Offline"}
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm truncate">
                  {result.lastMessage}
                </p>
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                {result.type === "group" ? "Join" : "Message"}
              </button>
            </div>
          ))}
        </div>

        {searchTerm && filteredResults.length === 0 && (
          <div className="text-center py-12">
            <IoSearch className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-400 mb-2">
              No results found for "{searchTerm}"
            </p>
            <p className="text-gray-500 text-sm">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}

        {!searchTerm && (
          <div className="text-center py-12">
            <IoSearch className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-400">
              Start typing to search for people, groups, or messages
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
