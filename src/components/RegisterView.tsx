import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { CountryCode, Language } from '../types';
import { COUNTRIES } from '../data/countries';

interface RegisterViewProps {
  lang: Language;
  onSwitchToLogin: () => void;
  onRegisterSuccess: (phone: string) => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({
  lang,
  onSwitchToLogin,
  onRegisterSuccess,
}) => {
  const isRtl = lang === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  // Selected Country: defaults strictly to SA
  const [selectedCountryCode, setSelectedCountryCode] = useState('SA');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form submission & error states
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCountry = COUNTRIES.find((c) => c.code === selectedCountryCode) || COUNTRIES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    const cleanPhone = phone.trim();
    if (!cleanPhone) {
      setError(isRtl ? 'يرجى إدخال رقم الجوال' : 'Please enter your phone number');
      return;
    }

    if (!password) {
      setError(isRtl ? 'يرجى إدخال كلمة المرور' : 'Please enter a password');
      return;
    }

    if (password.length < 6) {
      setError(isRtl ? 'كلمة المرور يجب أن تكون 6 خانات على الأقل' : 'Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError(isRtl ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onRegisterSuccess(cleanPhone);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full flex flex-col"
    >
      {/* Top Bar with Back to Login button */}
      <div className="flex items-center justify-between mb-4">
        <button
          id="back-to-login-btn"
          type="button"
          onClick={onSwitchToLogin}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#576475] hover:text-[#18212D] transition-colors cursor-pointer"
        >
          <BackIcon className="w-4 h-4" />
          <span>{isRtl ? 'العودة لتسجيل الدخول' : 'Back to Login'}</span>
        </button>
      </div>

      {/* Headings */}
      <div className="text-center mb-5 space-y-1">
        <h2 className="text-2xl sm:text-[25px] font-bold text-[#17202C] tracking-tight">
          {isRtl ? 'إنشاء حساب جديد' : 'Create an Account'}
        </h2>
        <p className="text-xs text-[#6B7788] leading-relaxed max-w-[310px] mx-auto">
          {isRtl
            ? 'سجّل الآن للوصول إلى لوحة متابعة تعلّم وسلامة أبنائك'
            : 'Register now to access your children’s learning & safety dashboard'}
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-3 p-2.5 rounded-xl bg-[#FDF2F2] border border-[#F8D7DA] text-[#A9252B] text-xs flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Country & Phone Row */}
        <div className="space-y-3.5">
          {/* Country Field: الدولة * */}
          <div>
            <label
              htmlFor="country-select"
              className="block text-xs font-bold text-[#2A3442] mb-1.5"
            >
              {isRtl ? 'الدولة' : 'Country'} <span className="text-[#C0392B]">*</span>
            </label>
            <div className="relative">
              <select
                id="country-select"
                value={selectedCountryCode}
                onChange={(e) => setSelectedCountryCode(e.target.value)}
                className="w-full py-3 px-3.5 rounded-2xl bg-white border border-[#E3DDD4] text-[#1E2734] text-xs sm:text-sm font-medium focus:outline-hidden focus:border-[#A58252] focus:ring-2 focus:ring-[#A58252]/15 shadow-2xs transition-all cursor-pointer appearance-none"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} {isRtl ? c.nameAr : c.nameEn}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center px-3.5 text-[#7C8797]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile Number Field: رقم الجوال * */}
          <div>
            <label
              htmlFor="register-phone"
              className="block text-xs font-bold text-[#2A3442] mb-1.5"
            >
              {isRtl ? 'رقم الجوال' : 'Mobile Number'} <span className="text-[#C0392B]">*</span>
            </label>
            <div className="relative flex items-center rounded-2xl bg-white border border-[#E3DDD4] focus-within:border-[#A58252] focus-within:ring-2 focus-within:ring-[#A58252]/15 shadow-2xs transition-all overflow-hidden">
              <div className="px-3.5 py-3 bg-[#FAF7F2] border-e border-[#E8E2D8] flex items-center gap-1 text-xs font-semibold text-[#445060] select-none shrink-0 dir-ltr">
                <span>{selectedCountry.flag}</span>
                <span>{selectedCountry.dialCode}</span>
              </div>
              <input
                id="register-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="05XXXXXXXX"
                dir="ltr"
                className="w-full py-3 px-3.5 text-xs sm:text-sm text-[#1E2734] placeholder:text-[#A1ADB9] focus:outline-hidden bg-transparent tracking-wide font-mono"
              />
            </div>
          </div>
        </div>

        {/* Email Field: البريد الإلكتروني (Optional) */}
        <div>
          <label
            htmlFor="register-email"
            className="block text-xs font-bold text-[#2A3442] mb-1.5"
          >
            {isRtl ? 'البريد الإلكتروني' : 'Email Address'}
          </label>
          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            dir="ltr"
            className="w-full py-3 px-3.5 rounded-2xl bg-white border border-[#E3DDD4] text-[#1E2734] text-xs sm:text-sm placeholder:text-[#A1ADB9] focus:outline-hidden focus:border-[#A58252] focus:ring-2 focus:ring-[#A58252]/15 shadow-2xs transition-all"
          />
        </div>

        {/* Password & Confirm Password Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Password Field: كلمة المرور * */}
          <div>
            <label
              htmlFor="register-password"
              className="block text-xs font-bold text-[#2A3442] mb-1.5"
            >
              {isRtl ? 'كلمة المرور' : 'Password'} <span className="text-[#C0392B]">*</span>
            </label>
            <div className="relative flex items-center rounded-2xl bg-white border border-[#E3DDD4] focus-within:border-[#A58252] focus-within:ring-2 focus-within:ring-[#A58252]/15 shadow-2xs transition-all">
              <input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                dir={isRtl ? 'rtl' : 'ltr'}
                className="w-full py-3 ps-3.5 pe-9 text-xs sm:text-sm text-[#1E2734] placeholder:text-[#9DA9B7] focus:outline-hidden bg-transparent tracking-widest text-right"
              />
              <button
                id="toggle-password-btn"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute end-2.5 text-[#7C8797] hover:text-[#252E3B] transition-colors p-1 cursor-pointer"
                title={showPassword ? (isRtl ? 'إخفاء كلمة المرور' : 'Hide password') : (isRtl ? 'إظهار كلمة المرور' : 'Show password')}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field: تأكيد كلمة المرور * */}
          <div>
            <label
              htmlFor="register-confirm-password"
              className="block text-xs font-bold text-[#2A3442] mb-1.5"
            >
              {isRtl ? 'تأكيد كلمة المرور' : 'Confirm Password'} <span className="text-[#C0392B]">*</span>
            </label>
            <div className="relative flex items-center rounded-2xl bg-white border border-[#E3DDD4] focus-within:border-[#A58252] focus-within:ring-2 focus-within:ring-[#A58252]/15 shadow-2xs transition-all">
              <input
                id="register-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                dir={isRtl ? 'rtl' : 'ltr'}
                className="w-full py-3 ps-3.5 pe-9 text-xs sm:text-sm text-[#1E2734] placeholder:text-[#9DA9B7] focus:outline-hidden bg-transparent tracking-widest text-right"
              />
              <button
                id="toggle-confirm-password-btn"
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute end-2.5 text-[#7C8797] hover:text-[#252E3B] transition-colors p-1 cursor-pointer"
                title={showConfirmPassword ? (isRtl ? 'إخفاء تأكيد كلمة المرور' : 'Hide password confirmation') : (isRtl ? 'إظهار تأكيد كلمة المرور' : 'Show password confirmation')}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-2">
          <motion.button
            id="register-submit-btn"
            type="submit"
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#17202B] via-[#222E3E] to-[#17202B] hover:opacity-95 text-white text-xs sm:text-sm font-semibold shadow-[0_3px_12px_rgba(23,32,43,0.22)] border border-white/10 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>{isRtl ? 'إنشاء الحساب' : 'Create Account'}</span>
              </>
            )}
          </motion.button>
        </div>
      </form>

      {/* Switch back to Login */}
      <div className="text-center mt-5 pt-1">
        <p className="text-xs text-[#6B7788]">
          {isRtl ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
          <button
            id="switch-to-login-link"
            type="button"
            onClick={onSwitchToLogin}
            className="font-bold text-[#1E2530] underline underline-offset-4 decoration-[#CBB393] hover:text-[#B89360] transition-colors cursor-pointer"
          >
            {isRtl ? 'تسجيل الدخول' : 'Sign In'}
          </button>
        </p>
      </div>
    </motion.div>
  );
};
