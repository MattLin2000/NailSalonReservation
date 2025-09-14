"use client";
import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginError {
  field?: string;
  message: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<LoginError[]>([]);
  const [rememberMe, setRememberMe] = useState(false);

  // 表單驗證
  const validateForm = (): LoginError[] => {
    const newErrors: LoginError[] = [];

    if (!formData.email) {
      newErrors.push({ field: "email", message: "請輸入電子信箱" });
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.push({ field: "email", message: "電子信箱格式不正確" });
    }

    if (!formData.password) {
      newErrors.push({ field: "password", message: "請輸入密碼" });
    } else if (formData.password.length < 6) {
      newErrors.push({ field: "password", message: "密碼至少需要 6 個字符" });
    }

    return newErrors;
  };

  // 處理輸入變更
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 清除該欄位的錯誤
    if (errors.some((error) => error.field === name)) {
      setErrors((prev) => prev.filter((error) => error.field !== name));
    }
  };

  // 處理登入提交
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors([]);

    try {
      // 模擬 API 呼叫
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 這裡可以加入實際的登入邏輯
      console.log("登入資料：", { ...formData, rememberMe });

      // 登入成功後的處理
      alert("登入成功！");
    } catch (error) {
      setErrors([{ message: "登入失敗，請檢查您的帳號密碼" }]);
    } finally {
      setIsLoading(false);
    }
  };

  // 處理 Enter 鍵提交
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e as any);
    }
  };

  // 獲取欄位錯誤訊息
  const getFieldError = (field: string) => {
    return errors.find((error) => error.field === field)?.message;
  };

  // 獲取一般錯誤訊息
  const getGeneralErrors = () => {
    return errors.filter((error) => !error.field);
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-yellow-100 flex items-center justify-center  w-screen ">
      <div className="w-full max-w-md">
        {/* Logo 區域 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-stone-300 via-amber-200 to-yellow-400 shadow-lg mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-stone-800 mb-2">NailStudio</h1>
          <p className="text-stone-600">歡迎回到精品美甲平台</p>
        </div>

        {/* 登入表單 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-stone-200 p-8">
          <div className="space-y-6" onKeyPress={handleKeyPress}>
            {/* 一般錯誤訊息 */}
            {getGeneralErrors().length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                {getGeneralErrors().map((error, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-red-600"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{error.message}</span>
                  </div>
                ))}
              </div>
            )}

            {/* 電子信箱 */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                電子信箱
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`text-black w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors outline-none ${
                    getFieldError("email")
                      ? "border-red-300 bg-red-50"
                      : "border-stone-300"
                  }`}
                  placeholder="請輸入您的電子信箱"
                />
              </div>
              {getFieldError("email") && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError("email")}
                </p>
              )}
            </div>

            {/* 密碼 */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                密碼
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`text-black w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors outline-none ${
                    getFieldError("password")
                      ? "border-red-300 bg-red-50"
                      : "border-stone-300"
                  }`}
                  placeholder="請輸入您的密碼"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {getFieldError("password") && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError("password")}
                </p>
              )}
            </div>

            {/* 記住我 & 忘記密碼 */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-amber-400 bg-stone-100 border-stone-300 rounded focus:ring-amber-400 focus:ring-2"
                />
                <span className="ml-2 text-sm text-stone-600">記住我</span>
              </label>
              <button
                type="button"
                className="text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                忘記密碼？
              </button>
            </div>

            {/* 登入按鈕 */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 transform ${
                isLoading
                  ? "bg-stone-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-stone-400 via-amber-400 to-yellow-500 hover:from-stone-500 hover:via-amber-500 hover:to-yellow-600 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>登入中...</span>
                </>
              ) : (
                <>
                  <span>登入</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* 註冊連結 */}
            <div className="text-center">
              <p className="text-sm text-stone-600">
                還沒有帳號？
                <button
                  type="button"
                  className="ml-1 text-amber-600 hover:text-amber-700 font-medium transition-colors"
                  onClick={handleRegister}
                >
                  立即註冊
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* 其他登入方式 */}
        <div className="mt-6 sm:mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-300"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-2 bg-gradient-to-br from-stone-50 via-amber-50 to-yellow-100 text-stone-500">
                或使用以下方式登入
              </span>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3">
            <button className="w-full inline-flex justify-center py-2.5 sm:py-3 px-4 border border-stone-300 rounded-lg shadow-sm bg-white text-xs sm:text-sm font-medium text-stone-500 hover:bg-stone-50 transition-colors">
              <span>Google</span>
            </button>
            <button className="w-full inline-flex justify-center py-2.5 sm:py-3 px-4 border border-stone-300 rounded-lg shadow-sm bg-white text-xs sm:text-sm font-medium text-stone-500 hover:bg-stone-50 transition-colors">
              <span>Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
