// app/layout.tsx
"use client"; // 如果在 Next.js App Router 中使用，需要標明為客戶端元件

import { ReactNode, useState } from "react";
import SideBar from "./components/SideBar";
import "./globals.css";
import { Calendar, Play, ShoppingBag, User } from "lucide-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 定義導航菜單項目的型別
  interface MenuItem {
    id: string;
    label: string;
    icon: ReactNode; // ReactNode 可以是任何 React 可以渲染的東西，如 JSX、字串等
    active?: boolean;
    path: string;
  }
  const [activeTab, setActiveTab] = useState<string>("作品展示");
  const menuItems: MenuItem[] = [
    {
      id: "gallery",
      label: "作品展示",
      icon: <div className="w-2 h-2 bg-current rounded-full"></div>,
      active: true,
      path: "gallery",
    },
    {
      id: "artists",
      label: "美甲師",
      icon: <User className="w-4 h-4" />,
      path: "artists",
    },
    {
      id: "booking",
      label: "預約服務",
      icon: <Calendar className="w-4 h-4" />,
      path: "booking",
    },
    {
      id: "videos",
      label: "影片教學",
      icon: <Play className="w-4 h-4" />,
      path: "videos",
    },
    {
      id: "products",
      label: "商品合作",
      icon: <ShoppingBag className="w-4 h-4" />,
      path: "products",
    },
  ];
  return (
    <html lang="en">
      <body>
        <main className="bg-black">
          <div className="min-h-screen bg-stone-50 flex">
            <SideBar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              menuItems={menuItems}
            />

            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
