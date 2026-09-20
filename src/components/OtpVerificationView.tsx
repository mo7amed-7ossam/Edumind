import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, RefreshCw, KeyRound } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface OtpVerificationViewProps {
  phoneNumber: string;
  countryDialCode: string;
  lang: Language;
  onVerify: (otp: string) => void;
  onBack: () => void;
  onResend: () => void;
  isVerifying: boolean;
}

export const OtpVerificationView: React.FC<OtpVerificationViewProps> = ({
  phoneNumber,
  countryDialCode,
  lang,
  onVerify,
  onBack,
  onResend,
  isVerifying,
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;
  const SubmitArrow = isRtl ? ArrowLeft : ArrowRight;

  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '']);
  const [countdown, setCountdown] = useState<number>(45);
  const [canResend, setCanResend] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only accept numbers
    const cleanVal = value.replace(/\D/g, '');
    if (!cleanVal) {
      const nextOtp = [...otpValues];
      nextOtp[index] = '';
      setOtpValues(nextOtp);
      return;
    }

    // Single digit input
    const char = cleanVal.slice(-1);
    const nextOtp = [...otpValues];
    nextOtp[index] = char;
    setOtpValues(nextOtp);

    // Auto advance to next box
    if (index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (!pastedData) return;

    const nextOtp = [...otpValues];
    pastedData.split('').forEach((char, i) => {
      if (i < 4) nextOtp[i] = char;
    });
    setOtpValues(nextOtp);

    // Focus last or next empty
    const focusIndex = Math.min(pastedData.length, 3);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResendClick = () => {
    if (!canResend) return;
    setCountdown(45);
    setCanResend(false);
    setOtpValues(['', '', '', '']);
    inputRefs.current[0]?.focus();
    onResend();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otpValues.join('');
    if (fullOtp.length === 4) {
      onVerify(fullOtp);
    }
  };

  const isComplete = otpValues.every((val) => val.trim() !== '');

  return (
    <motion.div
      id="otp-verification-step"
      initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
      className="w-full flex flex-col"
    >
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between mb-5">
        <button
          id="otp-back-to-phone-btn"
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#6B7788] hover:text-[#18212C] bg-white/80 hover:bg-white border border-[#E3DDD4] transition-all cursor-pointer shadow-2xs"
        >
          <BackArrow className="w-3.5 h-3.5" />
          <span>{t.changePhone}</span>
        </button>

        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#F5EFE6] text-[#9D7945] border border-[#EBE2D5]">
          الخطوة 2 من 2
        </span>
      </div>

      {/* Header & Graphic */}
      <div className="text-center mb-5 space-y-1.5">
        <div className="w-12 h-12 mx-auto rounded-xl bg-[#F6F1E9] border border-[#EAE1D3] text-[#A58252] flex items-center justify-center shadow-xs">
          <KeyRound className="w-6 h-6" />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-[#17202C] tracking-tight">
          {t.otpTitle}
        </h2>

        <p className="text-xs text-[#6B7788] leading-relaxed max-w-[310px] mx-auto">
          {t.otpSubtitle}{' '}
          <span className="font-bold text-[#1F2734] font-mono tracking-wider dir-ltr inline-block">
            {countryDialCode} {phoneNumber}
          </span>
        </p>
      </div>

      {/* OTP Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 4 Digit Boxes */}
        <div
          id="otp-digits-container"
          className="flex items-center justify-center gap-2.5 sm:gap-3 dir-ltr mb-3"
          onPaste={handlePaste}
        >
          {otpValues.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              id={`otp-digit-input-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className={`w-11 h-12 sm:w-12 sm:h-12 text-center text-lg sm:text-xl font-bold rounded-xl border transition-all ${
                digit
                  ? 'bg-white border-[#B89360] text-[#19222E] shadow-2xs ring-2 ring-[#B89360]/20'
                  : 'bg-white/90 border-[#E1D9CE] hover:border-[#CFBFA9] text-[#19222E] focus:bg-white focus:outline-hidden focus:border-[#B89360] focus:ring-2 focus:ring-[#B89360]/20'
              }`}
            />
          ))}
        </div>

        {/* Resend Countdown / Trigger */}
        <div className="text-center text-xs text-[#7B8797] pb-1">
          {canResend ? (
            <button
              id="resend-otp-btn"
              type="button"
              onClick={handleResendClick}
              className="inline-flex items-center gap-1.5 font-bold text-[#1B232F] hover:text-[#B89360] transition-colors cursor-pointer underline underline-offset-4 decoration-[#CBB393]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.resendOtpBtn}</span>
            </button>
          ) : (
            <p className="text-xs text-[#748294]">
              {t.resendOtpIn}{' '}
              <span className="font-mono font-bold text-[#18212D]">
                00:{countdown < 10 ? `0${countdown}` : countdown}
              </span>
            </p>
          )}
        </div>

        {/* Primary Submit Button */}
        <motion.button
          id="confirm-otp-btn"
          type="submit"
          whileHover={{ scale: 1.01, y: -1 }}
          whileTap={{ scale: 0.98 }}
          disabled={!isComplete || isVerifying}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#17202B] via-[#222E3E] to-[#17202B] hover:opacity-95 text-white text-xs sm:text-sm font-semibold shadow-[0_3px_12px_rgba(23,32,43,0.22)] border border-white/10 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isVerifying ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <SubmitArrow className="w-4 h-4" />
              <span>{t.verifyAndLoginBtn}</span>
            </>
          )}
        </motion.button>
      </form>

      {/* Security Note */}
      <div className="text-center mt-5">
        <p className="text-[11px] text-[#8C98A7]">
          رمز الدخول محمي ومخصص لاستخدام ولي الأمر فقط
        </p>
      </div>
    </motion.div>
  );
};
