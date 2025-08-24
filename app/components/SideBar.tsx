"use client";
import { Calendar, Play, ShoppingBag, Sparkles, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

// 定義導航菜單項目的型別
interface MenuItem {
  id: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
  path?: string; // 新增 path 屬性
}

interface SideBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  menuItems: MenuItem[];
}

const SideBar: React.FC<SideBarProps> = ({
  activeTab,
  setActiveTab,
  menuItems,
}) => {
  const Router = useRouter();
  const handleNavClick = (item: MenuItem) => {
    // 設定活躍標籤

    setActiveTab(item.label);
    Router.push(`/${item.path}`);
  };

  return (
    <div className="w-64 bg-white/90 backdrop-blur-sm border-r border-stone-200">
      {/* Logo 區域 */}
      <div className="p-6 border-b border-stone-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-stone-300 via-amber-200 to-yellow-400 shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-stone-800 tracking-tight">
              NailStudio
            </h1>
            <p className="text-sm text-stone-500 font-light">精品美甲平台</p>
          </div>
        </div>
      </div>

      {/* 導航菜單 */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item)}
            className={`w-full flex items-center space-x-4 p-3 rounded-xl text-left transition-all duration-300 group ${
              activeTab === item.label
                ? "bg-gradient-to-r from-stone-400 via-amber-400 to-yellow-500 text-white shadow-lg transform scale-[1.02]"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-800 hover:shadow-sm"
            }`}
          >
            <div
              className={`transition-transform duration-300 ${
                activeTab === item.label ? "scale-110" : "group-hover:scale-105"
              }`}
            >
              {item.icon}
            </div>
            <span className="font-medium tracking-wide">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* 底部裝飾 */}
      <div className="absolute bottom-8 left-6 right-6">
        <div className="h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent mb-4"></div>
        <div className="text-center">
          <p className="text-xs text-stone-400 font-light">© 2024 NailStudio</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
export type { MenuItem };
