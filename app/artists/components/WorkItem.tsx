import { Clock, Heart, Star } from "lucide-react";
import React, { useState } from "react";

interface WorkItemsProps {
  setSelectedWork: (item: any) => void; // Replace 'any' with the appropriate type if known
  workItems: Array<{
    id: number;
    image: string;
    title: string;
    artist: string;
    tags: string[];
    duration: string;
    difficulty: string;
    price: string;
    featured?: boolean;
    likes?: number;
  }>;
  getDifficultyColor: Function;
}

const WorkItems: React.FC<WorkItemsProps> = ({
  setSelectedWork,
  workItems,
  getDifficultyColor,
}) => {
  return (
    <div>
      {" "}
      <div className="p-8 overflow-y-auto max-h-[calc(100vh-400px)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {workItems.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer"
                onClick={() => setSelectedWork(item)}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:scale-[1.02] border border-stone-100">
                  {/* 圖片區域 */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* 漸層遮罩 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* 愛心按鈕 */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* 精選標籤 */}
                    {item.featured && (
                      <div className="absolute top-4 left-4">
                        <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          精選
                        </div>
                      </div>
                    )}

                    {/* 價格標籤 */}
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="bg-white/90 text-stone-800 px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        NT$ {item.price}
                      </div>
                    </div>
                  </div>

                  {/* 內容區域 */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-semibold text-lg text-stone-800 leading-tight">
                      {item.title}
                    </h3>

                    {/* 美甲師信息 */}
                    <div className="flex items-center gap-2 text-stone-600">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                        <span className="text-xs font-semibold text-white">
                          {item.artist[0]}
                        </span>
                      </div>
                      <span className="text-sm font-medium">{item.artist}</span>
                    </div>

                    {/* 標籤 */}
                    <div className="flex flex-wrap gap-2">
                      {item.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-stone-100/80 text-stone-600 text-xs rounded-full font-normal border border-stone-200/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* 底部信息 */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 text-stone-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{item.duration}</span>
                      </div>
                      <div
                        className="px-2 py-1 text-xs rounded-full border font-medium"
                        style={{
                          color: getDifficultyColor(item.difficulty),
                          borderColor:
                            getDifficultyColor(item.difficulty) + "40",
                        }}
                      >
                        {item.difficulty}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 載入更多按鈕 */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gradient-to-r from-stone-400 via-amber-400 to-yellow-500 text-white font-medium rounded-2xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 shadow-md">
              載入更多作品
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkItems;
