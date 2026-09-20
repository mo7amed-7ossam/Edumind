import React from 'react';
import { Language } from '../types';

interface HomePageProps {
  userIdentifier?: string;
  onLogout?: () => void;
  lang?: Language;
}

export const HomePage: React.FC<HomePageProps> = ({
  lang = 'ar',
}) => {
  const isRtl = lang === 'ar';

  return (
    <div
      id="home-page"
      className="min-h-screen w-full bg-[#FAF8F5] text-[#1E2530]"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Empty page body ready to be filled later */}
    </div>
  );
};
