"use client";
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Star,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import NotificationModal from "@/app/components/Modal/NotificationModal";
import { useRouter } from "next/navigation";

// 定義所需的 TypeScript interfaces
interface Service {
  id: number;
  name: string;
  duration: number;
  price: number;
  description: string;
  popular?: boolean;
}

interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  notes: string;
}

interface BookingData {
  service: Service | null;
  date: string;
  time: string;
  customerInfo: CustomerInfo;
}

interface Technician {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  avatar: string;
}

const NailSalonBooking = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    title: "",
    message: "",
  });
  const [bookingData, setBookingData] = useState<BookingData>({
    service: null,
    date: "",
    time: "",
    customerInfo: {
      name: "",
      phone: "",
      email: "",
      notes: "",
    },
  });

  // 指定技師資訊（已選定）
  const selectedTechnician: Technician = {
    id: 1,
    name: "林美美",
    specialty: "法式美甲專家",
    experience: "5年專業經驗",
    rating: 4.9,
    avatar: "✨",
  };

  // 服務項目資料 - 法式美甲風格
  const services: Service[] = [
    {
      id: 1,
      name: "經典法式美甲",
      duration: 75,
      price: 1580,
      description: "優雅白尖設計，展現指尖經典魅力",
      popular: true,
    },
    {
      id: 2,
      name: "奶茶色系凝膠",
      duration: 90,
      price: 1880,
      description: "溫柔奶茶色調，打造知性優雅氣質",
    },
    {
      id: 3,
      name: "裸粉漸層設計",
      duration: 105,
      price: 2280,
      description: "細膩漸層技法，呈現自然光澤美感",
    },
    {
      id: 4,
      name: "珍珠光澤護理",
      duration: 120,
      price: 2680,
      description: "深層護理配合珍珠光澤，奢華保養體驗",
    },
    {
      id: 5,
      name: "法式延甲造型",
      duration: 135,
      price: 3280,
      description: "專業延甲技術，量身打造完美指型",
    },
  ];

  // 可預約時間
  const availableTimes: string[] = [
    "10:00",
    "11:30",
    "13:00",
    "14:30",
    "16:00",
    "17:30",
    "19:00",
  ];

  // 生成未來21天的日期（排除週日）
  const getAvailableDates = (): string[] => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0) {
        // 0 is Sunday
        dates.push(date.toISOString().split("T")[0]);
      }
      if (dates.length >= 21) break;
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  const handleServiceSelect = (serviceId: number): void => {
    const service = services.find((s) => s.id === serviceId);
    setBookingData((prev) => ({ ...prev, service: service || null }));
  };

  const handleCustomerInfoChange = (
    field: keyof CustomerInfo,
    value: string
  ): void => {
    setBookingData((prev) => ({
      ...prev,
      customerInfo: { ...prev.customerInfo, [field]: value },
    }));
  };

  const nextStep = (): void => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = (): void => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (): void => {
    // 在真實應用中，您會使用一個更美觀的彈窗組件來取代 alert
    setModalInfo({
      isOpen: true,
      title: "預約成功！",
      message: "我們會在24小時內與您確認預約詳情，期待為您提供最優質的服務。",
    });

    console.log("預約資料:", bookingData);
    // 送出後重置狀態
    setCurrentStep(1);
    setBookingData({
      service: null,
      date: "",
      time: "",
      customerInfo: { name: "", phone: "", email: "", notes: "" },
    });
  };

  const formatDate = (
    dateString: string
  ): { date: string; weekday: string } => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];
    return {
      date: `${month}.${day.toString().padStart(2, "0")}`,
      weekday: weekdays[date.getDay()],
    };
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return bookingData.service !== null;
      case 2:
        return bookingData.date !== "" && bookingData.time !== "";
      case 3:
        // 基本電話驗證 (例如：至少9位數字)
        const isPhoneValid = /^\d{9,}$/.test(
          bookingData.customerInfo.phone.replace(/[\s-]/g, "")
        );
        return bookingData.customerInfo.name.trim() !== "" && isPhoneValid;
      default:
        return false;
    }
  };
  const closeModalAndReset = () => {
    setModalInfo({ isOpen: false, title: "", message: "" });
    // 送出後重置狀態
    setCurrentStep(1);
    setBookingData({
      service: null,
      date: "",
      time: "",
      customerInfo: { name: "", phone: "", email: "", notes: "" },
    });
  };
  return (
    <>
      <NotificationModal
        isOpen={modalInfo.isOpen}
        onClose={closeModalAndReset}
        title={modalInfo.title}
        message={modalInfo.message}
        router={router}
      />{" "}
      <div className="min-h-screen w-full  bg-gradient-to-br from-amber-50 via-rose-50 to-stone-100 font-sans">
        <div className=" mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* 優雅的頁首 */}
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-rose-200 to-amber-200 rounded-full mb-5 shadow-lg">
              <span className="text-3xl sm:text-4xl">💅</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-light text-stone-800 mb-2 tracking-wide">
              Atelier <span className="font-medium text-rose-600">Belle</span>
            </h1>
            <p className="text-stone-600 text-base sm:text-lg font-light max-w-md mx-auto">
              法式美甲工藝 • 專屬於您的奢華體驗
            </p>

            {/* 已選定技師資訊 */}
            <div className="mt-8 inline-flex items-center bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-md">
              <span className="text-2xl mr-3">{selectedTechnician.avatar}</span>
              <div className="text-left">
                <p className="text-stone-800 font-medium">
                  {selectedTechnician.name}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-stone-600">
                  <span className="sm:mr-3">
                    {selectedTechnician.specialty}
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-amber-400 fill-current mr-1" />
                    <span>{selectedTechnician.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 精緻的進度條 */}
          <div className="mb-10 sm:mb-12">
            <div className="flex justify-center items-start mb-6">
              {["選擇服務", "預約時間", "確認資訊"].map((step, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-medium transition-all duration-300 ${
                        index + 1 <= currentStep
                          ? "bg-gradient-to-r from-rose-400 to-rose-500 text-white shadow-lg"
                          : "bg-white text-stone-400 border-2 border-stone-200"
                      }`}
                    >
                      {index + 1 <= currentStep ? "✓" : index + 1}
                    </div>
                    <span
                      className={`text-xs sm:text-sm mt-2 font-light transition-all duration-300 w-20 ${
                        index + 1 <= currentStep
                          ? "text-rose-600"
                          : "text-stone-400"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                  {index < 2 && (
                    <div
                      className={`w-12 sm:w-16 md:w-20 h-0.5 mt-5 sm:mt-6 mx-2 sm:mx-4 transition-all duration-300 ${
                        index + 1 < currentStep ? "bg-rose-400" : "bg-stone-200"
                      }`}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* 主要內容卡片 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-6 md:p-10 border border-white/50 min-h-[450px]">
            {/* 步驟 1: 選擇服務 */}
            {currentStep === 1 && (
              <div className="animate-fade-in space-y-6">
                <h2 className="text-2xl sm:text-3xl font-light text-stone-800 text-center mb-6">
                  選擇您的專屬服務
                </h2>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`group relative border-2 rounded-xl sm:rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                        bookingData.service?.id === service.id
                          ? "border-rose-300 bg-gradient-to-r from-rose-50 to-amber-50 shadow-lg"
                          : "border-stone-200 bg-white hover:border-rose-200"
                      }`}
                      onClick={() => handleServiceSelect(service.id)}
                    >
                      {service.popular && (
                        <div className="absolute -top-3 left-4 sm:left-6">
                          <span className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-md">
                            人氣推薦
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1 mb-4 sm:mb-0">
                          <h3 className="text-lg sm:text-xl font-medium text-stone-800 mb-2 group-hover:text-rose-700 transition-colors">
                            {service.name}
                          </h3>
                          <p className="text-stone-600 text-sm leading-relaxed mb-3 font-light">
                            {service.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="flex items-center text-stone-500">
                              <Clock className="w-4 h-4 mr-1.5" />
                              {service.duration} 分鐘
                            </span>
                          </div>
                        </div>
                        <div className="text-left sm:text-right sm:ml-6 flex sm:flex-col items-baseline sm:items-end justify-between">
                          <div className="text-xl sm:text-2xl font-light text-rose-600 sm:mb-1">
                            NT$ {service.price.toLocaleString()}
                          </div>
                          {bookingData.service?.id === service.id && (
                            <Heart className="w-5 h-5 text-rose-500 fill-current" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 步驟 2: 選擇日期時間 */}
            {currentStep === 2 && (
              <div className="animate-fade-in space-y-8">
                <h2 className="text-2xl sm:text-3xl font-light text-stone-800 text-center">
                  選擇您方便的時間
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-stone-700 mb-4 flex items-center justify-center">
                      <Calendar className="mr-2 text-rose-500" size={20} />
                      選擇日期
                    </h3>
                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2 sm:gap-3 ">
                      {availableDates.map((date) => {
                        const formatted = formatDate(date);
                        return (
                          <button
                            key={date}
                            className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 text-center border-2 hover:shadow-md disabled:opacity-50 ${
                              bookingData.date === date
                                ? "bg-gradient-to-b from-rose-400 to-rose-500 text-white border-rose-500 shadow-lg"
                                : "bg-white border-stone-200 hover:border-rose-200 hover:bg-rose-50"
                            }`}
                            onClick={() =>
                              setBookingData((prev) => ({ ...prev, date }))
                            }
                          >
                            <div className="text-xs sm:text-sm font-light">
                              {formatted.weekday}
                            </div>
                            <div className="text-sm sm:text-lg font-medium mt-1">
                              {formatted.date}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-stone-700 mb-4 flex items-center justify-center">
                      <Clock className="mr-2 text-rose-500" size={20} />
                      選擇時段
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          className={`p-3 sm:p-4 rounded-xl transition-all duration-300 border-2 font-medium ${
                            bookingData.time === time
                              ? "bg-gradient-to-b from-rose-400 to-rose-500 text-white border-rose-500 shadow-lg"
                              : "bg-white border-stone-200 hover:border-rose-200 hover:bg-rose-50 text-stone-700"
                          }`}
                          onClick={() =>
                            setBookingData((prev) => ({ ...prev, time }))
                          }
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 步驟 3: 填寫客戶資料 */}
            {currentStep === 3 && (
              <div className="animate-fade-in space-y-6">
                <h2 className="text-2xl sm:text-3xl font-light text-stone-800 text-center">
                  完成預約資訊
                </h2>
                <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl p-4 sm:p-6 border border-rose-200/50">
                  <h3 className="text-base sm:text-lg font-medium text-stone-800 mb-4 flex items-center">
                    <Star size={18} className="mr-2 text-rose-500" />
                    預約摘要
                  </h3>
                  <div className="grid md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-stone-600">服務項目</span>
                        <span className="font-medium text-stone-800 text-right">
                          {bookingData.service?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-600">指定技師</span>
                        <span className="font-medium text-stone-800">
                          {selectedTechnician.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-600">服務時長</span>
                        <span className="font-medium text-stone-800">
                          {bookingData.service?.duration} 分鐘
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-stone-600">預約日期</span>
                        <span className="font-medium text-stone-800">
                          {bookingData.date &&
                            formatDate(bookingData.date).date}{" "}
                          {bookingData.date &&
                            formatDate(bookingData.date).weekday}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-600">預約時間</span>
                        <span className="font-medium text-stone-800">
                          {bookingData.time}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-rose-200 pt-2 mt-2">
                        <span className="text-stone-600 font-medium">
                          服務費用
                        </span>
                        <span className="font-semibold text-rose-600 text-lg">
                          NT$ {bookingData.service?.price?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-stone-700 font-medium mb-1.5">
                        <User className="inline mr-2" size={16} />
                        姓名 *
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-rose-100 focus:border-rose-300 transition-all bg-white"
                        placeholder="請輸入您的姓名"
                        value={bookingData.customerInfo.name}
                        onChange={(e) =>
                          handleCustomerInfoChange("name", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-stone-700 font-medium mb-1.5">
                        <Phone className="inline mr-2" size={16} />
                        聯絡電話 *
                      </label>
                      <input
                        type="tel"
                        className="w-full p-3 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-rose-100 focus:border-rose-300 transition-all bg-white"
                        placeholder="0912-345-678"
                        value={bookingData.customerInfo.phone}
                        onChange={(e) =>
                          handleCustomerInfoChange("phone", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-stone-700 font-medium mb-1.5">
                      <Mail className="inline mr-2" size={16} />
                      電子信箱
                    </label>
                    <input
                      type="email"
                      className="w-full p-3 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-rose-100 focus:border-rose-300 transition-all bg-white"
                      placeholder="your@email.com (選填)"
                      value={bookingData.customerInfo.email}
                      onChange={(e) =>
                        handleCustomerInfoChange("email", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-stone-700 font-medium mb-1.5">
                      特殊需求或備註
                    </label>
                    <textarea
                      className="w-full p-3 border-2 border-stone-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-rose-100 focus:border-rose-300 transition-all bg-white h-28 resize-none"
                      placeholder="如有特殊需求、過敏狀況或其他備註，請在此告知我們 (選填)"
                      value={bookingData.customerInfo.notes}
                      onChange={(e) =>
                        handleCustomerInfoChange("notes", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 導覽按鈕 */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-stone-200/80">
              <button
                onClick={prevStep}
                className={`px-6 py-3 sm:px-8 sm:py-3.5 rounded-full font-medium transition-all duration-300 flex items-center justify-center ${
                  currentStep === 1
                    ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                    : "bg-white border-2 border-stone-300 text-stone-600 hover:bg-stone-50 hover:border-stone-400 shadow-sm"
                }`}
                disabled={currentStep === 1}
              >
                <ChevronLeft size={20} className="mr-1" />
                上一步
              </button>
              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  className={`px-6 py-3 sm:px-8 sm:py-3.5 rounded-full font-medium transition-all duration-300 shadow-lg flex items-center justify-center ${
                    canProceed()
                      ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 hover:shadow-xl"
                      : "bg-stone-200 text-stone-400 cursor-not-allowed shadow-inner"
                  }`}
                  disabled={!canProceed()}
                >
                  下一步
                  <ChevronRight size={20} className="ml-1" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className={`px-7 py-3 sm:px-10 sm:py-3.5 rounded-full font-medium transition-all duration-300 shadow-lg flex items-center justify-center ${
                    canProceed()
                      ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 hover:shadow-xl transform hover:scale-105"
                      : "bg-stone-200 text-stone-400 cursor-not-allowed shadow-inner"
                  }`}
                  disabled={!canProceed()}
                >
                  <span className="mr-2">✨</span>
                  確認預約
                </button>
              )}
            </div>
          </div>

          {/* 優雅的頁尾 */}
          <div className="text-center mt-10 sm:mt-12 space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-center text-stone-500 sm:space-x-6">
              <div className="flex items-center mb-2 sm:mb-0">
                <MapPin className="mr-2" size={16} />
                <span className="font-light text-sm">
                  台北市大安區敦化南路一段187巷
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2" size={16} />
                <span className="font-light text-sm">(02) 2731-5678</span>
              </div>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm font-light">
              營業時間：週二至週六 10:00-20:00 | 週日 10:00-18:00
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NailSalonBooking;
