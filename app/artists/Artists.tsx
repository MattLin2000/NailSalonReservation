"use client";
import React, { useState } from "react";
import {
  Search,
  Filter,
  Star,
  MapPin,
  Calendar,
  MessageCircle,
  Heart,
  Award,
  Verified,
  Clock,
  Sparkles,
  Users,
  Eye,
} from "lucide-react";

const Artists = () => {
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  interface Artist {
    id: number;
    rank: number;
    name: string;
    avatar: string;
    rating: number;
    reviews: number;
    specialties: string[];
    location: string;
    experience: string;
    price: string;
    portfolio: number;
    followers: number;
    verified: boolean;

    bio: string;
    availableSlots: number;
    responseTime: string;
  }

  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const specialties = [
    "法式",
    "手繪",
    "光療",
    "水晶",
    "漸層",
    "貼鑽",
    "幾何",
    "花卉",
  ];
  const locations = ["台北", "新北", "桃園", "台中", "台南", "高雄"];

  const topArtists = [
    {
      id: 1,
      rank: 1,
      name: "雅雅美甲工作室",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616c25482b4?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      reviews: 1247,
      specialties: ["法式", "手繪", "光療"],
      location: "台北市信義區",
      experience: "5年",
      price: "800-2000",
      portfolio: 156,
      followers: 12500,
      verified: true,
      featured: true,
      bio: "專精法式美甲與精緻手繪，為每位客人打造獨一無二的指尖藝術",
      availableSlots: 3,
      responseTime: "通常在1小時內回覆",
    },
    {
      id: 2,
      rank: 2,
      name: "小美の指尖藝術",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      reviews: 892,
      specialties: ["漸層", "貼鑽", "水晶"],
      location: "新北市板橋區",
      experience: "3年",
      price: "600-1800",
      portfolio: 203,
      followers: 8900,
      verified: true,
      bio: "IG風格美甲專家，擅長打造夢幻漸層與奢華貼鑽設計",
      availableSlots: 5,
      responseTime: "通常在30分鐘內回覆",
    },
    {
      id: 3,
      rank: 3,
      name: "LUNA指甲沙龍",
      avatar:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      reviews: 756,
      specialties: ["幾何", "花卉", "光療"],
      location: "台中市西屯區",
      experience: "4年",
      price: "700-1600",
      portfolio: 189,
      followers: 15200,
      verified: true,
      featured: true,
      bio: "現代簡約風格專家，以幾何線條與花卉元素創造時尚美甲",
      availableSlots: 2,
      responseTime: "通常在2小時內回覆",
    },
    {
      id: 4,
      rank: 4,
      name: "蜜桃美甲屋",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      reviews: 643,
      specialties: ["法式", "漸層"],
      location: "桃園市中壢區",
      experience: "2年",
      price: "500-1200",
      portfolio: 124,
      followers: 6800,
      verified: false,
      bio: "溫柔甜美風格，專門打造適合日常的精緻美甲",
      availableSlots: 7,
      responseTime: "通常在4小時內回覆",
    },
    {
      id: 5,
      rank: 5,
      name: "星河美甲藝術",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      reviews: 521,
      specialties: ["手繪", "貼鑽", "水晶"],
      location: "台南市安平區",
      experience: "6年",
      price: "900-2500",
      portfolio: 267,
      followers: 18700,
      verified: true,
      featured: true,
      bio: "頂級手繪藝術家，每一款設計都是獨家創作",
      availableSlots: 1,
      responseTime: "通常在1小時內回覆",
    },
    {
      id: 6,
      rank: 6,
      name: "森林系美甲",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face",
      rating: 4.6,
      reviews: 478,
      specialties: ["花卉", "幾何"],
      location: "高雄市左營區",
      experience: "3年",
      price: "600-1400",
      portfolio: 145,
      followers: 9200,
      verified: true,
      bio: "自然系風格專家，擅長花卉與大自然元素設計",
      availableSlots: 4,
      responseTime: "通常在2小時內回覆",
    },
  ];

  // 生成剩餘15位美甲師
  const generateMoreArtists = () => {
    const names = [
      "優雅指尖",
      "夢幻美甲",
      "時尚工坊",
      "精品沙龍",
      "典雅美學",
      "潮流指彩",
      "藝術美甲",
      "奢華工作室",
      "甜美指尖",
      "現代美學",
      "浪漫美甲",
      "風格工坊",
      "創意沙龍",
      "美學空間",
      "指尖藝廊",
    ];

    return names.map((name, index) => ({
      id: 7 + index,
      rank: 7 + index,
      name: name,
      avatar: `https://images.unsplash.com/photo-${
        1494790108755 + index
      }?w=150&h=150&fit=crop&crop=face`,
      rating: 4.3 + Math.random() * 0.5,
      reviews: Math.floor(Math.random() * 400) + 100,
      specialties: specialties.slice(0, 2 + Math.floor(Math.random() * 2)),
      location: locations[Math.floor(Math.random() * locations.length)],
      experience: `${2 + Math.floor(Math.random() * 4)}年`,
      price: `${500 + Math.floor(Math.random() * 300)}-${
        1200 + Math.floor(Math.random() * 800)
      }`,
      portfolio: Math.floor(Math.random() * 150) + 50,
      followers: Math.floor(Math.random() * 10000) + 1000,
      verified: Math.random() > 0.3,
      featured: index < 3,
      bio: "專業美甲師，致力於為每位客人打造完美指尖造型",
      availableSlots: Math.floor(Math.random() * 8) + 1,
      responseTime: "通常在1-4小時內回覆",
    }));
  };

  const allArtists = [...topArtists, ...generateMoreArtists()];

  const getRankBadgeColor = (rank: number) => {
    if (rank <= 3) return "from-yellow-400 to-amber-500";
    if (rank <= 10) return "from-gray-300 to-gray-400";
    return "from-amber-200 to-stone-300";
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return "👑";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "⭐";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-25 to-rose-50">
      {/* CSS Variables */}
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

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-stone-50 to-amber-50 py-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-rose-200/30 to-amber-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-amber-200/30 to-stone-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-rose-400 rounded-full flex items-center justify-center shadow-2xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-tight text-stone-800">
            精選美甲師
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600">
              TOP21
            </span>
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed mb-8">
            嚴選全台最優秀的美甲藝術家，每一位都是指尖藝術的專家
          </p>

          <div className="flex items-center justify-center space-x-8 text-stone-500">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span className="font-medium">專業認證</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-amber-500" />
              <span className="font-medium">五星評價</span>
            </div>
            <div className="flex items-center space-x-2">
              <Verified className="w-5 h-5 text-blue-500" />
              <span className="font-medium">身份驗證</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white/80 backdrop-blur-sm px-8 py-6 border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜尋美甲師名稱或地區..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none text-stone-800 shadow-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 bg-white/90 backdrop-blur-sm border border-stone-200 rounded-2xl hover:bg-stone-50 transition-colors shadow-sm ml-4"
            >
              <Filter className="w-5 h-5 text-stone-500" />
              <span className="text-stone-700 font-medium">篩選器</span>
            </button>
          </div>

          {showFilters && (
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-stone-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-3 text-stone-600">
                    專長風格
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {specialties.map((specialty) => (
                      <button
                        key={specialty}
                        onClick={() => {
                          setSelectedSpecialties((prev) =>
                            prev.includes(specialty)
                              ? prev.filter((s) => s !== specialty)
                              : [...prev, specialty]
                          );
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          selectedSpecialties.includes(specialty)
                            ? "bg-gradient-to-r from-amber-400 to-rose-400 text-white shadow-lg transform scale-105"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200 hover:scale-105"
                        }`}
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3 text-stone-600">
                    服務地區
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {locations.map((location) => (
                      <button
                        key={location}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-stone-100 text-stone-600 hover:bg-stone-200 hover:scale-105 transition-all duration-200"
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Artists Grid */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {allArtists.map((artist, index) => (
            <div key={artist.id} className="group relative">
              {/* Rank Badge */}
              <div className="absolute -top-4 -left-4 z-20">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${getRankBadgeColor(
                    artist.rank
                  )} rounded-full flex items-center justify-center shadow-lg border-4 border-white`}
                >
                  <span className="text-white font-bold text-sm">
                    {artist.rank <= 10
                      ? `#${artist.rank}`
                      : getRankIcon(artist.rank)}
                  </span>
                </div>
              </div>

              {/* Artist Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:scale-[1.02] border border-stone-100 relative">
                {/* Featured Badge */}
                {artist.featured && (
                  <div className="absolute top-6 right-6 z-10">
                    <div className="bg-gradient-to-r from-rose-400 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      精選推薦
                    </div>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-8">
                  {/* Avatar and Basic Info */}
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      <img
                        src={artist.avatar}
                        alt={artist.name}
                        className="w-24 h-24 rounded-full border-4 border-stone-100 shadow-lg mx-auto mb-4 group-hover:scale-110 transition-transform duration-500"
                      />
                      {artist.verified && (
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-3 border-white shadow-lg">
                          <Verified className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-stone-800 mb-2">
                      {artist.name}
                    </h3>
                    <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                      {artist.bio}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(artist.rating)
                                ? "text-amber-400 fill-current"
                                : "text-stone-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-semibold text-stone-800">
                        {artist.rating.toFixed(1)}
                      </span>
                      <span className="text-sm text-stone-500">
                        ({artist.reviews}則評價)
                      </span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-6">
                    <div className="flex flex-wrap justify-center gap-2">
                      {artist.specialties.map((specialty, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gradient-to-r from-stone-100 to-amber-50 text-stone-600 text-xs rounded-full font-medium border border-stone-200/50"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                    <div className="bg-stone-50 rounded-2xl p-4">
                      <div className="flex items-center justify-center mb-2">
                        <Eye className="w-5 h-5 text-amber-500" />
                      </div>
                      <p className="text-sm font-medium text-stone-600">
                        作品集
                      </p>
                      <p className="text-xl font-bold text-stone-800">
                        {artist.portfolio}
                      </p>
                    </div>
                    <div className="bg-stone-50 rounded-2xl p-4">
                      <div className="flex items-center justify-center mb-2">
                        <Users className="w-5 h-5 text-rose-500" />
                      </div>
                      <p className="text-sm font-medium text-stone-600">粉絲</p>
                      <p className="text-xl font-bold text-stone-800">
                        {(artist.followers / 1000).toFixed(1)}K
                      </p>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-stone-600">
                        <MapPin className="w-4 h-4" />
                        <span>{artist.location}</span>
                      </div>
                      <span className="text-stone-800 font-medium">
                        {artist.experience}經驗
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-stone-600">
                        <Clock className="w-4 h-4" />
                        <span>NT$ {artist.price}</span>
                      </div>
                      <span className="text-green-600 font-medium">
                        還有{artist.availableSlots}個時段
                      </span>
                    </div>

                    <div className="text-xs text-stone-500 text-center">
                      {artist.responseTime}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => setSelectedArtist(artist)}
                      className="w-full py-3 bg-gradient-to-r from-amber-400 via-rose-400 to-pink-500 text-white font-semibold rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
                    >
                      <Calendar className="w-5 h-5 mr-2 inline" />
                      立即預約
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <button className="py-2 bg-stone-100 text-stone-600 rounded-xl hover:bg-stone-200 transition-colors text-sm font-medium">
                        <MessageCircle className="w-4 h-4 mr-1 inline" />
                        聯絡
                      </button>
                      <button className="py-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors text-sm font-medium">
                        <Heart className="w-4 h-4 mr-1 inline" />
                        收藏
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedArtist && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl">
            <div className="p-8 text-center">
              <img
                src={selectedArtist.avatar}
                alt={selectedArtist.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-stone-100 shadow-lg"
              />
              <h3 className="text-2xl font-bold text-stone-800 mb-2">
                {selectedArtist.name}
              </h3>
              <p className="text-stone-600 mb-6">
                準備好預約您的專屬美甲時光了嗎？
              </p>

              <div className="space-y-4">
                <button className="w-full py-4 bg-gradient-to-r from-amber-400 to-rose-400 text-white font-semibold rounded-2xl hover:shadow-xl transition-all duration-300 shadow-lg">
                  選擇預約時間
                </button>
                <button className="w-full py-3 bg-stone-100 text-stone-600 rounded-2xl hover:bg-stone-200 transition-colors">
                  查看作品集
                </button>
                <button
                  onClick={() => setSelectedArtist(null)}
                  className="w-full py-3 text-stone-500 hover:text-stone-700 transition-colors"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Artists;
