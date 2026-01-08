"use client";

import { Search, X } from "lucide-react";

type SearchInputProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
};

export function SearchInput({
  searchQuery,
  setSearchQuery,
  placeholder = "Search...",
}: SearchInputProps) {
  return (
    <div className="relative mb-8">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-full bg-white border border-gray-200 
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none
                 transition-all duration-200 shadow-sm hover:shadow-md"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute right-4 inset-y-0 flex items-center"
        >
          <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  );
}
