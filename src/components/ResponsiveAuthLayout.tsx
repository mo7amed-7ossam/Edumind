import React, { ReactNode } from 'react';
import { DesktopHeroPanel } from './DesktopHeroPanel';
import { Language } from '../types';

interface ResponsiveAuthLayoutProps {
  children: ReactNode;
  lang: Language;
}

export const ResponsiveAuthLayout: React.FC<ResponsiveAuthLayoutProps> = ({
  children,
  lang,
}) => {
  return (
    <main
      id="responsive-auth-container"
      className="min-h-screen w-full flex bg-[#F6F4EE] text-[#1E2530] relative overflow-x-hidden selection:bg-[#2B3545] selection:text-white"
    >
      {/* Subtle organic ambient color spots matching mobile screenshot */}
      <div className="fixed -top-24 -start-24 w-96 h-96 rounded-full bg-[#E8DFD3]/50 blur-3xl pointer-events-none" />
      <div className="fixed -bottom-28 -end-28 w-[460px] h-[460px] rounded-full bg-[#E5DCD0]/50 blur-3xl pointer-events-none" />

      {/* True full-screen 2-column grid on desktop, single-column full-bleed on mobile/tablet */}
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        {/* Left Desktop Showcase Panel (Visible on lg: screens and above) */}
        <div className="hidden lg:block lg:col-span-6 xl:col-span-7 h-full">
          <DesktopHeroPanel lang={lang} />
        </div>

        {/* Right Authentication Screen Panel */}
        <div className="col-span-1 lg:col-span-6 xl:col-span-5 bg-[#FAF8F5] px-6 py-10 sm:px-10 md:px-12 lg:px-14 flex items-center justify-center relative overflow-y-auto min-h-screen">
          {/* Form and Content container with optimal max-width and vertical centering */}
          <div className="relative z-10 w-full max-w-[390px] mx-auto my-auto py-2">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};
