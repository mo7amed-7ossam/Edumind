import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  appName?: string;
  tagline?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ appName, tagline, size = 'md' }) => {
  const iconDimensions = {
    sm: { w: 46, h: 46 },
    md: { w: 64, h: 64 },
    lg: { w: 82, h: 82 },
  }[size];

  return (
    <div id="app-brand-container" className="flex flex-col items-center justify-center text-center">
      {/* Emblem with radiant subtle glow */}
      <motion.div
        id="logo-emblem"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative flex items-center justify-center"
      >
        {/* Soft luxury ambient aura */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#D4B996]/35 via-[#A2B4C7]/20 to-transparent blur-xl rounded-full scale-125 pointer-events-none" />

        <div className="relative p-2.5 rounded-2xl bg-white/70 shadow-[0_4px_24px_-4px_rgba(40,50,70,0.08)] backdrop-blur-xs border border-[#EAE3DA]">
          <svg
            width={iconDimensions.w}
            height={iconDimensions.h}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 hover:scale-105"
          >
            <defs>
              <linearGradient id="adultGrad" x1="20" y1="20" x2="80" y2="90" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1C2532" />
                <stop offset="1" stopColor="#303E50" />
              </linearGradient>
              <linearGradient id="childGrad" x1="40" y1="35" x2="75" y2="85" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C8A578" />
                <stop offset="1" stopColor="#A88352" />
              </linearGradient>
            </defs>

            {/* Parent Head */}
            <circle cx="43" cy="24" r="11" fill="url(#adultGrad)" />

            {/* Child Head */}
            <circle cx="63" cy="36" r="8" fill="url(#childGrad)" />

            {/* Parent Body (Protective embracing curve) */}
            <path
              d="M 28 65 C 26 48, 38 40, 52 42 C 43 47, 40 55, 42 70 C 37 73, 31 71, 28 65 Z"
              fill="url(#adultGrad)"
            />

            {/* Flowing protective outer sweep */}
            <path
              d="M 27 64 C 23 80, 42 88, 55 88 C 45 84, 38 78, 36 68 C 33 66, 30 65, 27 64 Z"
              fill="url(#adultGrad)"
              opacity="0.9"
            />

            {/* Child Body & Embrace */}
            <path
              d="M 64 48 C 72 49, 78 57, 76 68 C 74 77, 66 84, 56 86 C 62 82, 65 74, 63 66 C 62 58, 56 53, 50 51 C 55 49, 60 48, 64 48 Z"
              fill="url(#childGrad)"
            />

            {/* Heart-like bond center highlight */}
            <path
              d="M 50 54 C 54 59, 53 66, 49 71 C 46 64, 47 58, 50 54 Z"
              fill="#EFE7DA"
            />
          </svg>
        </div>
      </motion.div>

      {/* App Name with premium Arabic typography (if provided) */}
      {appName && (
        <motion.h1
          id="app-title"
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-[28px] font-bold tracking-tight text-[#18212D] flex items-center justify-center gap-1 leading-tight mt-3"
        >
          <span>{appName}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#B89360] inline-block mb-1" />
        </motion.h1>
      )}

      {/* Subtitle / Tagline (if provided) */}
      {tagline && (
        <motion.p
          id="app-tagline"
          initial={{ y: 6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-xs font-medium text-[#7C8797] tracking-wide mt-0.5"
        >
          {tagline}
        </motion.p>
      )}
    </div>
  );
};
