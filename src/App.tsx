import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { Language, LoginStep, CountryCode, AuthMode } from './types';
import { translations } from './data/translations';
import { COUNTRIES } from './data/countries';
import { Logo } from './components/Logo';
import { ResponsiveAuthLayout } from './components/ResponsiveAuthLayout';
import { PhoneInputField } from './components/PhoneInputField';
import { OtpVerificationView } from './components/OtpVerificationView';
import { RegisterView } from './components/RegisterView';
import { HomePage } from './components/HomePage';

export default function App() {
  const [lang] = useState<Language>('ar');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [step, setStep] = useState<LoginStep>('phone_input');
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(COUNTRIES[0]);
  const [phoneNumber, setPhoneNumber] = useState<string>('501234567');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const t = translations[lang];
  const isRtl = lang === 'ar';
  const SubmitArrow = isRtl ? ArrowLeft : ArrowRight;

  const showToast = (message: string) => {
    setFeedbackToast(message);
    setTimeout(() => {
      setFeedbackToast(null);
    }, 3200);
  };

  // Step 1: Submit Phone Number to request OTP
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (!cleanPhone) {
      showToast(t.invalidPhone);
      return;
    }

    if (selectedCountry.code === 'SA' && (!cleanPhone.startsWith('5') || cleanPhone.length !== 9)) {
      showToast(t.invalidPhone);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp_verification');
      showToast(`${t.otpSentSuccess} (رمز التجربة: 1234)`);
    }, 700);
  };

  // Step 2: Verify OTP
  const handleOtpVerify = (otp: string) => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      // Verify OTP (accept 1234 or any complete 4 digits in demo)
      if (otp === '1234' || otp.length === 4) {
        setIsLoggedIn(true);

        try {
          confetti({
            particleCount: 55,
            spread: 65,
            origin: { y: 0.7 },
            colors: ['#B89360', '#1C2532', '#64748B', '#E5D6C5'],
          });
        } catch (err) {
          // Safe fallback
        }
        showToast('أهلاً بك! تم تسجيل الدخول بنجاح');
      } else {
        showToast(t.invalidOtp);
      }
    }, 800);
  };

  // Resend OTP handler
  const handleResendOtp = () => {
    showToast(`${t.otpSentSuccess} (رمز التجربة: 1234)`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setStep('phone_input');
    showToast('تم تسجيل الخروج بنجاح');
  };

  return (
    <>
      {/* Toast Notification */}
      <AnimatePresence>
        {feedbackToast && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            className="fixed top-6 left-4 right-4 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-[#1C2532] text-white px-4 py-2.5 rounded-xl text-xs font-medium shadow-lg border border-white/10 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C8A578] shrink-0" />
              <span>{feedbackToast}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoggedIn ? (
        /* Empty Home Page */
        <HomePage
          userIdentifier={`${selectedCountry.dialCode} ${phoneNumber}`}
          onLogout={handleLogout}
          lang={lang}
        />
      ) : (
        <ResponsiveAuthLayout lang={lang}>
          {authMode === 'register' ? (
            /* Register View: New Account Fields */
            <RegisterView
              lang={lang}
              onSwitchToLogin={() => {
                setAuthMode('login');
                setStep('phone_input');
              }}
              onRegisterSuccess={(registeredPhone) => {
                setPhoneNumber(registeredPhone);
                setAuthMode('login');
                setStep('otp_verification');
                showToast('تم إنشاء الحساب بنجاح! تم إرسال رمز التحقق (1234)');
              }}
            />
          ) : step === 'otp_verification' ? (
            /* OTP Verification Step */
            <OtpVerificationView
              phoneNumber={phoneNumber}
              countryDialCode={selectedCountry.dialCode}
              lang={lang}
              onVerify={handleOtpVerify}
              onBack={() => setStep('phone_input')}
              onResend={handleResendOtp}
              isVerifying={isSubmitting}
            />
          ) : (
            /* Step 1: Phone Login Form */
            <div className="w-full flex flex-col">
              {/* Logo Emblem (Graphic only) */}
              <div className="mb-4 flex justify-center">
                <Logo size="md" />
              </div>

              {/* Headings */}
              <div className="text-center mb-5 space-y-1">
                <h2 className="text-2xl sm:text-[25px] font-bold text-[#17202C] tracking-tight">
                  {t.welcomeBack}
                </h2>
                <p className="text-xs sm:text-[13px] text-[#6B7788] leading-relaxed max-w-[310px] mx-auto">
                  {t.welcomeSubtitle}
                </p>
              </div>

              {/* Phone Form */}
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div>
                  <label htmlFor="input-phone-number" className="block text-xs font-semibold text-[#3C4A5B] mb-1.5">
                    {t.phoneLabel}
                  </label>

                  <PhoneInputField
                    phoneNumber={phoneNumber}
                    onPhoneNumberChange={setPhoneNumber}
                    selectedCountry={selectedCountry}
                    onSelectCountry={setSelectedCountry}
                    placeholder={selectedCountry.placeholder}
                    isRtl={isRtl}
                  />

                  <p className="text-[11px] text-[#8694A6] mt-1.5 ps-1">
                    {t.phoneHelper}
                  </p>
                </div>

                {/* Helper Row: Remember Me */}
                <div className="flex items-center justify-between px-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-[#526072] hover:text-[#1E2735] transition-colors">
                    <input
                      id="checkbox-remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded-md border-[#CFC5B8] text-[#1E2532] focus:ring-[#B89360] accent-[#202A37] cursor-pointer"
                    />
                    <span className="text-xs">{t.rememberMe}</span>
                  </label>
                </div>

                {/* Primary Action Button */}
                <div className="pt-1.5">
                  <motion.button
                    id="submit-phone-btn"
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
                        <SubmitArrow className="w-4 h-4" />
                        <span>{t.sendOtpBtn}</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>

              {/* Account Creation link */}
              <div className="text-center mt-6 pt-1">
                <p className="text-xs text-[#6B7788]">
                  {t.noAccount}{' '}
                  <button
                    id="switch-to-register-link"
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className="font-bold text-[#1E2530] underline underline-offset-4 decoration-[#CBB393] hover:text-[#B89360] transition-colors cursor-pointer"
                  >
                    {t.signUpLink}
                  </button>
                </p>
              </div>
            </div>
          )}
        </ResponsiveAuthLayout>
      )}
    </>
  );
}
