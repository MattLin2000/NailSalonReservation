"use client";
import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Check,
} from "lucide-react";

interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface RegisterError {
  field?: string;
  message: string;
}

const RegisterPage = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterError[]>([]);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToMarketing, setAgreeToMarketing] = useState(false);

  // 密碼強度檢查
  const checkPasswordStrength = (password: string) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const score = Object.values(checks).filter(Boolean).length;
    return { checks, score };
  };

  const passwordStrength = checkPasswordStrength(formData.password);

  // 表單驗證
  const validateForm = (): RegisterError[] => {
    const newErrors: RegisterError[] = [];

    // 姓名驗證
    if (!formData.name.trim()) {
      newErrors.push({ field: "name", message: "請輸入您的姓名" });
    } else if (formData.name.trim().length < 2) {
      newErrors.push({ field: "name", message: "姓名至少需要 2 個字符" });
    }

    // 電子信箱驗證
    if (!formData.email) {
      newErrors.push({ field: "email", message: "請輸入電子信箱" });
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.push({ field: "email", message: "電子信箱格式不正確" });
    }

    // 手機號碼驗證
    if (!formData.phone) {
      newErrors.push({ field: "phone", message: "請輸入手機號碼" });
    } else if (!/^09\d{8}$/.test(formData.phone)) {
      newErrors.push({
        field: "phone",
        message: "請輸入有效的台灣手機號碼 (09xxxxxxxx)",
      });
    }

    // 密碼驗證
    if (!formData.password) {
      newErrors.push({ field: "password", message: "請輸入密碼" });
    } else if (passwordStrength.score < 3) {
      newErrors.push({
        field: "password",
        message: "密碼強度不足，請包含大小寫字母、數字或特殊符號",
      });
    }

    // 確認密碼驗證
    if (!formData.confirmPassword) {
      newErrors.push({ field: "confirmPassword", message: "請確認密碼" });
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.push({ field: "confirmPassword", message: "密碼不一致" });
    }

    // 服務條款驗證
    if (!agreeToTerms) {
      newErrors.push({ message: "請同意服務條款與隱私政策" });
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

  // 處理註冊提交
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
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 這裡可以加入實際的註冊邏輯
      console.log("註冊資料：", {
        ...formData,
        agreeToTerms,
        agreeToMarketing,
      });

      // 註冊成功後的處理
      alert("註冊成功！歡迎加入 NailStudio！");
    } catch (error) {
      setErrors([{ message: "註冊失敗，請稍後再試" }]);
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

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-stone-50 via-amber-50 to-yellow-100 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
        {/* Logo 區域 */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-stone-300 via-amber-200 to-yellow-400 shadow-lg mb-3 sm:mb-4">
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-800 mb-1 sm:mb-2">
            加入 NailStudio
          </h1>
          <p className="text-sm sm:text-base text-stone-600">
            開始您的精品美甲之旅
          </p>
        </div>

        {/* 註冊表單 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-stone-200 p-6 sm:p-8">
          <div className="space-y-5 sm:space-y-6" onKeyPress={handleKeyPress}>
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

            {/* 姓名 */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                姓名
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`text-black w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors outline-none ${
                    getFieldError("name")
                      ? "border-red-300 bg-red-50"
                      : "border-stone-300"
                  }`}
                  placeholder="請輸入您的姓名"
                />
              </div>
              {getFieldError("name") && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError("name")}
                </p>
              )}
            </div>

            {/* 電子信箱 */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                電子信箱
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`text-black w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors outline-none ${
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

            {/* 手機號碼 */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                手機號碼
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`text-black w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors outline-none ${
                    getFieldError("phone")
                      ? "border-red-300 bg-red-50"
                      : "border-stone-300"
                  }`}
                  placeholder="09xxxxxxxx"
                />
              </div>
              {getFieldError("phone") && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError("phone")}
                </p>
              )}
            </div>

            {/* 密碼 */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                密碼
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`text-black w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors outline-none ${
                    getFieldError("password")
                      ? "border-red-300 bg-red-50"
                      : "border-stone-300"
                  }`}
                  placeholder="請輸入密碼"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>

              {/* 密碼強度指示器 */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex space-x-1 mb-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded ${
                          level <= passwordStrength.score
                            ? passwordStrength.score <= 2
                              ? "bg-red-400"
                              : passwordStrength.score <= 3
                              ? "bg-yellow-400"
                              : "bg-green-400"
                            : "bg-stone-200"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div
                      className={`flex items-center space-x-1 ${
                        passwordStrength.checks.length
                          ? "text-green-600"
                          : "text-stone-400"
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>8+ 字符</span>
                    </div>
                    <div
                      className={`flex items-center space-x-1 ${
                        passwordStrength.checks.uppercase
                          ? "text-green-600"
                          : "text-stone-400"
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>大寫字母</span>
                    </div>
                    <div
                      className={`flex items-center space-x-1 ${
                        passwordStrength.checks.lowercase
                          ? "text-green-600"
                          : "text-stone-400"
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>小寫字母</span>
                    </div>
                    <div
                      className={`flex items-center space-x-1 ${
                        passwordStrength.checks.number
                          ? "text-green-600"
                          : "text-stone-400"
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>數字</span>
                    </div>
                  </div>
                </div>
              )}

              {getFieldError("password") && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError("password")}
                </p>
              )}
            </div>

            {/* 確認密碼 */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                確認密碼
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`text-black w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors outline-none ${
                    getFieldError("confirmPassword")
                      ? "border-red-300 bg-red-50"
                      : "border-stone-300"
                  }`}
                  placeholder="請再次輸入密碼"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors p-1"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
              {getFieldError("confirmPassword") && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError("confirmPassword")}
                </p>
              )}
            </div>

            {/* 同意條款 */}
            <div className="space-y-3">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="w-4 h-4 text-amber-400 bg-stone-100 border-stone-300 rounded focus:ring-amber-400 focus:ring-2 mt-1 flex-shrink-0"
                />
                <span className="ml-2 text-sm text-stone-600">
                  我同意{" "}
                  <button
                    type="button"
                    className="text-amber-600 hover:text-amber-700 font-medium"
                  >
                    服務條款
                  </button>{" "}
                  和{" "}
                  <button
                    type="button"
                    className="text-amber-600 hover:text-amber-700 font-medium"
                  >
                    隱私政策
                  </button>
                </span>
              </label>

              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeToMarketing}
                  onChange={(e) => setAgreeToMarketing(e.target.checked)}
                  className="w-4 h-4 text-amber-400 bg-stone-100 border-stone-300 rounded focus:ring-amber-400 focus:ring-2 mt-1 flex-shrink-0"
                />
                <span className="ml-2 text-sm text-stone-600">
                  我願意收到 NailStudio 的促銷資訊和最新消息 (可選)
                </span>
              </label>
            </div>

            {/* 註冊按鈕 */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full flex items-center justify-center space-x-2 py-2.5 sm:py-3 px-4 text-sm sm:text-base rounded-lg text-white font-medium transition-all duration-300 transform ${
                isLoading
                  ? "bg-stone-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-stone-400 via-amber-400 to-yellow-500 hover:from-stone-500 hover:via-amber-500 hover:to-yellow-600 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>註冊中...</span>
                </>
              ) : (
                <>
                  <span>註冊帳號</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </>
              )}
            </button>

            {/* 登入連結 */}
            <div className="text-center">
              <p className="text-sm text-stone-600">
                已經有帳號了？
                <button
                  type="button"
                  className="ml-1 text-amber-600 hover:text-amber-700 font-medium transition-colors"
                >
                  立即登入
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* 其他註冊方式 */}
        <div className="mt-6 sm:mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-300"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-2 bg-gradient-to-br from-stone-50 via-amber-50 to-yellow-100 text-stone-500">
                或使用以下方式註冊
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

export default RegisterPage;
