"use client";
import {
  Calendar,
  Play,
  ShoppingBag,
  Sparkles,
  User,
  LogIn,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ReactNode, useState, useEffect } from "react";

// 定義導航菜單項目的型別
interface MenuItem {
  id: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
  path?: string;
}

// 定義使用者資料型別
interface UserData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface SideBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  menuItems: MenuItem[];
  user?: UserData | null; // 使用者資料，null 表示未登入
  onLogin?: () => void; // 登入處理函數
  onLogout?: () => void; // 登出處理函數
}

const SideBar: React.FC<SideBarProps> = ({
  activeTab,
  setActiveTab,
  menuItems,
  user = null,
  onLogin,
  onLogout,
}) => {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 檢測螢幕大小
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // 點擊遮罩關閉選單
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        !(event.target as Element).closest(".sidebar-container")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleNavClick = (item: MenuItem) => {
    // 設定活躍標籤
    setActiveTab(item.label);
    router.push(`/${item.path}`);
    // 手機版點擊後關閉選單
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleLoginClick = () => {
    if (onLogin) {
      onLogin();
    } else {
      // 預設行為：導航到登入頁面
      router.push("/login");
    }
    // 手機版點擊後關閉選單
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }

    setActiveTab(""); // 清除活躍標籤
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
    setShowUserMenu(false);
    // 手機版點擊後關閉選單
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  // 手機版漢堡選單按鈕
  const MobileMenuButton = () => (
    <button
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/90 backdrop-blur-sm border border-stone-200 shadow-lg hover:shadow-xl transition-all duration-300"
      aria-label="開啟選單"
    >
      {isMobileMenuOpen ? (
        <X className="w-6 h-6 text-stone-600" />
      ) : (
        <Menu className="w-6 h-6 text-stone-600" />
      )}
    </button>
  );

  // 手機版遮罩
  const MobileOverlay = () =>
    isMobileMenuOpen && (
      <div className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300" />
    );

  // 側邊欄內容
  const SidebarContent = () => (
    <div className="sidebar-container h-full flex flex-col bg-white/90 backdrop-blur-sm border-r border-stone-200">
      {/* Logo 區域 */}
      <div className="p-4 sm:p-6 border-b border-stone-100">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-stone-300 via-amber-200 to-yellow-400 shadow-lg">
            <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-stone-800 tracking-tight truncate">
              NailStudio
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 font-light truncate">
              精品美甲平台
            </p>
          </div>
        </div>
      </div>

      {/* 使用者區域 */}
      <div className="p-3 sm:p-4 border-b border-stone-100">
        {user ? (
          // 已登入狀態
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-full flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-xl hover:bg-stone-100 transition-all duration-300 group"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-stone-400 to-amber-400 flex items-center justify-center overflow-hidden flex-shrink-0">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-xs sm:text-sm font-medium text-stone-800 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-stone-500 truncate">{user.email}</p>
              </div>
            </button>

            {/* 使用者選單 */}
            {showUserMenu && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-stone-200 z-10">
                <button
                  onClick={handleLogoutClick}
                  className="w-full flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 text-left hover:bg-stone-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-3 h-3 sm:w-4 sm:h-4 text-stone-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-stone-700">
                    登出
                  </span>
                </button>
              </div>
            )}
          </div>
        ) : (
          // 未登入狀態
          <button
            onClick={handleLoginClick}
            className="w-full flex items-center justify-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-xl bg-gradient-to-r from-stone-400 via-amber-400 to-yellow-500 text-white hover:from-stone-500 hover:via-amber-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            <LogIn className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium">登入</span>
          </button>
        )}
      </div>

      {/* 導航菜單 */}
      <nav className="flex-1 p-3 sm:p-4 space-y-1 sm:space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item)}
            className={`w-full flex items-center space-x-3 sm:space-x-4 p-2 sm:p-3 rounded-xl text-left transition-all duration-300 group ${
              activeTab === item.label
                ? "bg-gradient-to-r from-stone-400 via-amber-400 to-yellow-500 text-white shadow-lg transform scale-[1.02]"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-800 hover:shadow-sm"
            }`}
          >
            <div
              className={`transition-transform duration-300 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 ${
                activeTab === item.label ? "scale-110" : "group-hover:scale-105"
              }`}
            >
              {item.icon}
            </div>
            <span className="text-xs sm:text-sm font-medium tracking-wide truncate">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* 底部裝飾 */}
      <div className="p-3 sm:p-6">
        <div className="h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent mb-3 sm:mb-4"></div>
        <div className="text-center">
          <p className="text-xs text-stone-400 font-light">© 2024 NailStudio</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* 手機版漢堡選單按鈕 */}
      <MobileMenuButton />

      {/* 手機版遮罩 */}
      <MobileOverlay />

      {/* 桌面版側邊欄 */}
      <div className="hidden md:block w-56 lg:w-64 xl:w-72 relative">
        <SidebarContent />
      </div>

      {/* 手機版側邊欄 */}
      <div
        className={`md:hidden fixed top-0 left-0 w-64 sm:w-72 h-full z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>
    </>
  );
};

export default SideBar;
export type { MenuItem, UserData };
