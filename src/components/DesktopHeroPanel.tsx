import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Brain, LayoutDashboard, ShieldCheck, Compass } from 'lucide-react';
import { Language } from '../types';

interface DesktopHeroPanelProps {
  lang: Language;
}

export const DesktopHeroPanel: React.FC<DesktopHeroPanelProps> = ({ lang }) => {
  const isRtl = lang === 'ar';

  const features = isRtl
    ? [
        {
          title: 'تقييم تشخيصي ذكي وخطة تعلّم يومية مخصصة',
          subtitle: 'تحديد دقيق لنقاط القوة والاحتياجات لبناء مسار دراسي يلائم وتيرة طفلك',
          icon: Brain,
        },
        {
          title: 'لوحة متابعة كاملة لأداء أبنائك',
          subtitle: 'تقارير فورية ومؤشرات واضحة عن التحصيل الدراسي والواجبات المنجزة',
          icon: LayoutDashboard,
        },
        {
          title: 'رصد سلامة رقمية وتنبيهات فورية',
          subtitle: 'بيئة استخدام آمنة وإشعارات استباقية لضمان راحة بالك واطمئنانك الدائم',
          icon: ShieldCheck,
        },
        {
          title: 'رفيق تعليمي يحفّز الطالب يومياً',
          subtitle: 'تجارب تفاعلية وتحديات محببة تغرس حب التعلم والاستمرار الذاتي',
          icon: Compass,
        },
      ]
    : [
        {
          title: 'Smart diagnostic assessment & personalized daily learning plan',
          subtitle: 'Tailored study tracks that match your child’s individual pace and potential',
          icon: Brain,
        },
        {
          title: 'Comprehensive dashboard tracking your children’s performance',
          subtitle: 'Real-time milestones, daily attendance, and detailed academic insights',
          icon: LayoutDashboard,
        },
        {
          title: 'Digital safety monitoring & real-time alerts',
          subtitle: 'A protected learning space with proactive notifications for peace of mind',
          icon: ShieldCheck,
        },
        {
          title: 'Educational companion inspiring students every day',
          subtitle: 'Interactive challenges and supportive guidance keeping curiosity alive',
          icon: Compass,
        },
      ];

  return (
    <div
      id="desktop-hero-showcase"
      className="hidden lg:flex flex-col justify-between w-full h-full p-10 xl:p-14 bg-[#F5F2EC] border-e border-[#E8E2D7] relative overflow-hidden text-[#222B38]"
    >
      {/* Soft warm ambient background circles - strictly adhering to the warm beige/sand palette */}
      <div className="absolute -top-32 -start-32 w-[540px] h-[540px] rounded-full bg-[#EAE2D5] blur-3xl pointer-events-none opacity-80" />
      <div className="absolute -bottom-36 -end-36 w-[580px] h-[580px] rounded-full bg-[#E5DCD0] blur-3xl pointer-events-none opacity-70" />

      {/* Decorative vector wave anchored seamlessly to the top-right edge */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-35 z-0">
        <svg width="360" height="260" viewBox="0 0 360 260" fill="none" className="w-72 sm:w-96 h-auto">
          {/* Secondary softer wave for visual depth */}
          <path
            d="M 360 0 L 140 0 C 195 30, 250 80, 360 170 Z"
            fill="url(#topWaveGrad2)"
          />
          {/* Primary organic flowing wave originating from top and right */}
          <path
            d="M 360 0 L 0 0 C 40 40, 120 95, 180 150 C 240 205, 300 230, 360 260 Z"
            fill="url(#topWaveGrad1)"
          />
          <defs>
            <linearGradient id="topWaveGrad1" x1="0" y1="0" x2="360" y2="260" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E2D7C8" stopOpacity="0.85" />
              <stop offset="1" stopColor="#D5C5B2" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="topWaveGrad2" x1="140" y1="0" x2="360" y2="170" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EBE1D4" stopOpacity="0.6" />
              <stop offset="1" stopColor="#DDCFC0" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Top Header Tag */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#E3DDD4] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#B89360]" />
          <span className="text-xs font-semibold text-[#4A5568]">
            {isRtl ? 'منصة التعلم الذكي' : 'Smart Learning Platform'}
          </span>
        </div>
      </div>

      {/* Center Hero Concept: Exact User Copy */}
      <div className="relative z-10 my-auto py-6 space-y-7 max-w-xl">
        <div className="space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl xl:text-3xl font-extrabold text-[#1B2330] tracking-tight leading-[1.4]"
          >
            {isRtl ? (
              <>
                تعلّم يتكيّف مع طفلك، <br />
                <span className="text-[#A58252]">ومتابعة تطمئنك أنت</span>
              </>
            ) : (
              <>
                Learning that adapts to your child, <br />
                <span className="text-[#A58252]">and progress that gives you peace of mind</span>
              </>
            )}
          </motion.h2>
        </div>

        {/* The 4 Core Requested Pillars */}
        <div className="space-y-2.5 pt-0.5">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.07 }}
                className="flex items-start gap-3 p-2.5 sm:p-3 rounded-xl bg-white/90 hover:bg-white border border-[#E6DFD4] shadow-2xs transition-all duration-200"
              >
                <div className="w-8.5 h-8.5 rounded-lg bg-[#F6F2EC] text-[#9D7945] flex items-center justify-center shrink-0 border border-[#EBE3D7] mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-[12.5px] font-bold text-[#1F2734] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#717F91] leading-relaxed mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer Quote */}
      <div className="relative z-10 pt-4 border-t border-[#E8E2D7] flex items-center justify-between text-xs text-[#7B8797]">
        <span className="font-medium text-[#5F6D7E]">
          {isRtl ? 'معك في كل خطوة لنموهم وسلامتهم' : 'With you at every step of their growth & safety'}
        </span>
        <span className="text-[11px] text-[#8C98A7]">
          {isRtl ? 'الإصدار 2.4' : 'v2.4'}
        </span>
      </div>
    </div>
  );
};
