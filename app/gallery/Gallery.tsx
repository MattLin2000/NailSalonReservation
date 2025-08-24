// 檔名: NailStudio.tsx
"use client"; // 如果在 Next.js App Router 中使用，需要標明為客戶端元件

import React, { useState, FC, ReactNode, ChangeEvent } from "react";
import SearchFilter from "../artists/components/SearchFilter";
import WorkItems from "../artists/components/WorkItem";
import WorkItemDetailModal from "../components/Modal/WorkItemDetailModal";
// 1. 定義資料結構的 TypeScript 介面
// ===================================

// 定義美甲作品物件的型別
interface WorkItem {
  id: number;
  title: string;
  artist: string;
  price: string;
  duration: string;
  tags: string[];
  likes: number;
  difficulty: "簡約" | "中等" | "複雜"; // 使用聯合型別來限制可能的值
  featured?: boolean; // '?' 表示這是可選屬性
  image: string;
}

interface WorkItemsProps {
  workItems: WorkItem[]; // 使用 NailStudio 定義的 WorkItem 型別
  setSelectedWork: (work: WorkItem | null) => void; // 傳入選擇的作品
}

// 2. 將元件定義為 React.FC (Functional Component)
// ==================================================
const Gallery: FC = () => {
  // 3. 為所有 useState hooks 加上明確的型別
  // ========================================

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null); // 型別可以是 WorkItem 或 null

  // 4. 為常數陣列加上型別

  const styleOptions: string[] = [
    "法式",
    "漸層",
    "光療",
    "水晶",
    "手繪",
    "貼鑽",
    "霧面",
    "珠光",
    "幾何",
    "花卉",
  ];

  const workItems: WorkItem[] = [
    {
      id: 1,
      title: "珍珠奶茶法式",
      artist: "小雅美甲師",
      price: "1200",
      duration: "90分鐘",
      tags: ["法式", "琥珀", "創意"],
      likes: 234,
      difficulty: "中等",
      featured: true,
      image:
        "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=500&fit=crop",
    },
    {
      id: 2,
      title: "夕陽漸層",
      artist: "美美工作室",
      price: "800",
      duration: "60分鐘",
      tags: ["暈染", "光療"],
      likes: 189,
      difficulty: "簡約",
      image:
        "https://images.unsplash.com/photo-1515688594390-b649af70d282?w=400&h=500&fit=crop",
    },
    {
      id: 3,
      title: "花園手繪",
      artist: "藝術美甲坊",
      price: "1500",
      duration: "120分鐘",
      tags: ["手繪", "花卉", "藝術"],
      likes: 456,
      difficulty: "複雜",
      featured: true,
      image:
        "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=500&fit=crop",
    },
    {
      id: 4,
      title: "極簡線條",
      artist: "現代美甲",
      price: "600",
      duration: "45分鐘",
      tags: ["幾何", "霧面"],
      likes: 123,
      difficulty: "簡約",
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=500&fit=crop",
    },
    {
      id: 5,
      title: "珠光漸變",
      artist: "星光美甲",
      price: "900",
      duration: "75分鐘",
      tags: ["珠光", "漸層"],
      likes: 278,
      difficulty: "中等",
      image:
        "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=500&fit=crop",
    },
    {
      id: 6,
      title: "水晶貼鑽",
      artist: "奢華美甲館",
      price: "2000",
      duration: "150分鐘",
      tags: ["貼鑽", "水晶", "奢華"],
      likes: 567,
      difficulty: "複雜",
      featured: true,
      image:
        "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=500&fit=crop",
    },
  ];

  // 5. 為函式參數加上型別
  // ======================
  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  // 使用我們在 WorkItem 中定義的 'difficulty' 型別
  const getDifficultyColor = (difficulty: WorkItem["difficulty"]): string => {
    switch (difficulty) {
      case "簡約":
        return "#10B981";
      case "中等":
        return "#F59E0B";
      case "複雜":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* CSS Variables (在 Next.js 中 <style jsx> 可以正常運作) */}
      <style jsx>{`
        :root {
          --nude-light: #f8f4f0;
          --nude-base: #e8ddd4;
          --nude-dark: #d4c4b0;
          --accent-gold: #c9a96e;
          --text-primary: #2c2c2c;
          --text-secondary: #6b6b6b;
        }
      `}</style>

      {/* 主內容區 */}
      <div className="flex-1 overflow-hidden">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-white via-stone-50 to-amber-50 px-8 py-16 text-center border-b border-stone-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-light text-stone-800 mb-4 tracking-tight">
              精品美甲
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">
                作品集
              </span>
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
              發現最新流行趨勢，尋找您的專屬美甲師
            </p>
          </div>
        </div>

        {/* 搜索和篩選 */}
        <SearchFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          selectedStyles={selectedStyles}
          setSelectedStyles={setSelectedStyles}
          styleOptions={styleOptions}
          toggleStyle={toggleStyle}
        />

        {/* 作品網格 */}
        <WorkItems
          setSelectedWork={setSelectedWork}
          workItems={workItems}
          getDifficultyColor={getDifficultyColor}
        />
      </div>

      {/* 作品詳情模態框 (Modal) */}
      <WorkItemDetailModal
        selectedWork={selectedWork}
        setSelectedWork={setSelectedWork}
      />
    </div>
  );
};

export default Gallery;
