import { Filter, Search } from "lucide-react";
import React, { ChangeEvent, useState } from "react";

interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  selectedStyles: string[];
  setSelectedStyles: (styles: string[]) => void;
  styleOptions: string[];
  toggleStyle: (style: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  selectedStyles,
  setSelectedStyles,
  styleOptions,
  toggleStyle,
}) => {
  return (
    <div>
      {" "}
      {/* 搜索和篩選 */}
      <div className="bg-white/80 backdrop-blur-sm px-8 py-6 border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜尋作品、風格、美甲師..."
                value={searchQuery}
                // 6. 為事件處理器加上型別
                // ======================
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none text-stone-800 shadow-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 bg-white/90 backdrop-blur-sm border border-stone-200 rounded-2xl hover:bg-stone-50 transition-colors shadow-sm"
            >
              <Filter className="w-5 h-5 text-stone-500" />
              <span className="text-stone-700 font-medium">篩選器</span>
            </button>
          </div>

          {/* 篩選器面板 */}
          {showFilters && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-stone-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-stone-800">
                  篩選條件
                </h3>
                <button
                  onClick={() => setSelectedStyles([])}
                  className="text-sm text-stone-500 hover:text-stone-700"
                >
                  清除全部
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium mb-3 text-stone-600">
                  美甲風格
                </label>
                <div className="flex flex-wrap gap-3">
                  {styleOptions.map((style) => (
                    <button
                      key={style}
                      onClick={() => toggleStyle(style)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                        selectedStyles.includes(style)
                          ? "bg-gradient-to-r from-stone-400 to-amber-400 text-white border-transparent shadow-lg transform scale-105"
                          : "bg-white/60 text-stone-600 border-stone-200 hover:bg-stone-100 hover:scale-105 hover:shadow-md"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
