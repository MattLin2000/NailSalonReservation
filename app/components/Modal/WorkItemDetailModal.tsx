import { Calendar, Clock, Heart, MessageCircle, Share2 } from "lucide-react";
import React, { useState } from "react";
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
const WorkItemDetailModal = ({
  selectedWork,
  setSelectedWork,
}: {
  selectedWork: WorkItem | null;
  setSelectedWork: (work: WorkItem | null) => void;
}) => {
  return (
    <div>
      {" "}
      {selectedWork && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* 圖片區域 */}
              <div className="space-y-4">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <img
                    src={selectedWork.image}
                    alt={selectedWork.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 操作按鈕 */}
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors">
                    <Heart className="w-4 h-4" />
                    收藏 ({selectedWork.likes})
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                    <Share2 className="w-4 h-4" />
                    分享
                  </button>
                </div>
              </div>

              {/* 詳情區域 */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-stone-800 mb-3">
                    {selectedWork.title}
                  </h2>
                </div>

                {/* 美甲師信息 */}
                <div className="bg-gradient-to-r from-stone-50 to-amber-50 rounded-2xl p-6 border border-stone-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold">
                        {selectedWork.artist[0]}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-stone-800 mb-2">
                        {selectedWork.artist}
                      </h4>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-gradient-to-r from-stone-400 to-amber-400 text-white rounded-xl text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                          <Calendar className="w-4 h-4 mr-2 inline" />
                          立即預約
                        </button>
                        <button className="px-4 py-2 bg-stone-100 text-stone-600 rounded-xl text-sm font-medium hover:bg-stone-200 transition-colors">
                          <MessageCircle className="w-4 h-4 mr-2 inline" />
                          聯絡
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 作品詳情 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-stone-50 rounded-2xl border border-stone-100">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-amber-500" />
                    <p className="text-sm font-medium text-stone-600">
                      製作時間
                    </p>
                    <p className="text-lg font-bold text-stone-800">
                      {selectedWork.duration}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-stone-50 rounded-2xl border border-stone-100">
                    <span className="text-2xl text-amber-500">💰</span>
                    <p className="text-sm font-medium text-stone-600 mt-2">
                      參考價格
                    </p>
                    <p className="text-lg font-bold text-stone-800">
                      NT$ {selectedWork.price}
                    </p>
                  </div>
                </div>

                {/* 標籤 */}
                <div>
                  <h5 className="font-medium mb-3 text-stone-800">風格標籤</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedWork.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-2 bg-stone-100/80 text-stone-600 text-sm rounded-full font-normal border border-stone-200/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 關閉按鈕 */}
                <button
                  onClick={() => setSelectedWork(null)}
                  className="w-full py-3 bg-stone-200 text-stone-600 rounded-xl hover:bg-stone-300 transition-colors font-medium"
                >
                  關閉
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkItemDetailModal;
