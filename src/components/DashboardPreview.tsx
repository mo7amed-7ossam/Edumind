import React from 'react';
import { motion } from 'motion/react';
import { LogOut, GraduationCap, Award, BookOpen, Clock, Calendar, ChevronLeft, ChevronRight, Bell } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface DashboardPreviewProps {
  userIdentifier: string;
  onLogout: () => void;
  lang: Language;
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({
  userIdentifier,
  onLogout,
  lang,
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';
  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <motion.div
      id="dashboard-preview-screen"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="w-full flex flex-col justify-between min-h-[580px] p-1"
    >
      {/* Top Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#EAE3DA]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1A2330] to-[#39495F] text-[#F3EFE9] flex items-center justify-center font-bold text-sm shadow-xs">
              أ
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#18212D]">{t.welcomeParent}</h3>
              <p className="text-[11px] text-[#7C8797] truncate max-w-[170px] font-mono dir-ltr text-start">{userIdentifier}</p>
            </div>
          </div>
          <button
            id="preview-logout-btn"
            type="button"
            onClick={onLogout}
            title={t.logout}
            className="p-2 rounded-xl text-[#7A8798] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Daily Banner */}
        <div className="bg-gradient-to-r from-[#1E2838] to-[#2B394E] rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
          <div className="absolute top-0 end-0 w-32 h-32 bg-[#B89360]/15 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-xs text-[10px] font-medium text-[#D8BC94] mb-1.5">
                <Bell className="w-2.5 h-2.5" />
                <span>{t.statusActive}</span>
              </span>
              <h4 className="font-bold text-sm">{isRtl ? 'جميع الأبناء حاضرون اليوم 🌟' : 'All children present today 🌟'}</h4>
              <p className="text-[11px] text-white/70 mt-0.5">{t.lastUpdate}</p>
            </div>
          </div>
        </div>

        {/* Children Cards List */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-[#556375] px-1">{t.childrenPreviewTitle}</h4>

          {/* Child 1 Card */}
          <div className="p-3.5 bg-white rounded-2xl border border-[#EBE4DB] shadow-xs hover:shadow-sm transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F4EFE7] text-[#9D7945] flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-[#1E2530]">{t.child1}</h5>
                  <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[#7C8797]">
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <Award className="w-3 h-3" />
                      {isRtl ? 'نسبة الإنجاز 98%' : 'Completion 98%'}
                    </span>
                    <span>•</span>
                    <span>{isRtl ? 'مدرسة المجد الدولية' : 'Al-Majd Academy'}</span>
                  </div>
                </div>
              </div>
              <ChevronIcon className="w-4 h-4 text-[#9CA7B5]" />
            </div>

            {/* Quick Chips */}
            <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-stone-100">
              <div className="flex items-center gap-1.5 text-[10px] text-[#4A5565] bg-[#FAF8F5] p-1.5 rounded-lg">
                <BookOpen className="w-3 h-3 text-[#B89360]" />
                <span>{isRtl ? 'واجب العلوم: تم التسليم' : 'Science: Submitted'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[#4A5565] bg-[#FAF8F5] p-1.5 rounded-lg">
                <Clock className="w-3 h-3 text-sky-600" />
                <span>{isRtl ? 'انصراف: 01:30 م' : 'Dismissal: 1:30 PM'}</span>
              </div>
            </div>
          </div>

          {/* Child 2 Card */}
          <div className="p-3.5 bg-white rounded-2xl border border-[#EBE4DB] shadow-xs hover:shadow-sm transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#EEF3F8] text-[#345173] flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-[#1E2530]">{t.child2}</h5>
                  <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[#7C8797]">
                    <span className="flex items-center gap-1 text-sky-600 font-semibold">
                      <Calendar className="w-3 h-3" />
                      {isRtl ? 'جدول الاختبارات الأسبوعي' : 'Weekly exam schedule'}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronIcon className="w-4 h-4 text-[#9CA7B5]" />
            </div>
          </div>
        </div>
      </div>

      {/* Return Action */}
      <div className="pt-4 mt-4 border-t border-[#EAE3DA]">
        <button
          id="back-to-auth-btn"
          type="button"
          onClick={onLogout}
          className="w-full py-2.5 px-4 rounded-xl border border-[#D9D0C5] text-[#364252] text-xs font-semibold hover:bg-[#F2ECE3] transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{t.logout}</span>
        </button>
      </div>
    </motion.div>
  );
};
