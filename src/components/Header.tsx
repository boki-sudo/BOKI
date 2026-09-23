import React from 'react';
import { GraduationCap, Database, Layers, Search, Sparkles, MapPin, BookOpen, Smartphone, ShieldCheck, School, UserCheck } from 'lucide-react';
import { UserRole } from '../types';

interface HeaderProps {
  activeTab: 'directory' | 'schema' | 'techstack' | 'roadmap';
  setActiveTab: (tab: 'directory' | 'schema' | 'techstack' | 'roadmap') => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentRole,
  setCurrentRole,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Top Banner Notice */}
      <div className="bg-emerald-800 text-emerald-50 px-4 py-1.5 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <strong className="font-bold text-white">منصة أستاذي (Ostadhi.dz)</strong>
            <span className="hidden sm:inline text-emerald-200">|</span>
            <span className="text-emerald-100 hidden sm:inline">
              دليل وهندسة حجز دروس الدعم والمدارس الخاصة عبر 58 ولاية في الجزائر
            </span>
          </div>
          <div className="flex items-center gap-3 text-emerald-200 text-[11px]">
            <span className="hidden md:inline">تغطية 58 ولاية</span>
            <span className="hidden md:inline">•</span>
            <span>دفع محلي: البطاقة الذهبية / CIB / بريدي موب</span>
            <span>•</span>
            <span className="text-emerald-300 font-semibold">تطبيق PWA خفيف وسريع</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-700/20 shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-stone-900">
                  أستاذي <span className="text-emerald-700 font-bold text-base">Ostadhi.dz</span>
                </span>
                <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  الجزائر
                </span>
              </div>
              <p className="text-[11px] text-stone-500 hidden sm:block">
                المنصة الوطنية للدروس الخصوصية ومدارس الدعم المعتمدة
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              id="tab-directory"
              onClick={() => setActiveTab('directory')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'directory'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>دليل البحث والفلتر</span>
            </button>

            <button
              id="tab-schema"
              onClick={() => setActiveTab('schema')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'schema'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>مخطط قاعدة البيانات</span>
            </button>

            <button
              id="tab-techstack"
              onClick={() => setActiveTab('techstack')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'techstack'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>التقنيات والتكاليف</span>
            </button>

            <button
              id="tab-roadmap"
              onClick={() => setActiveTab('roadmap')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'roadmap'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>خارطة تنفيذ الفلتر</span>
            </button>
          </nav>

          {/* Role Simulation Switcher */}
          <div className="hidden lg:flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl text-xs border border-stone-200">
            <span className="text-stone-500 pr-2 font-medium">محاكاة الصلاحية:</span>
            <button
              onClick={() => setCurrentRole('student')}
              className={`px-2.5 py-1 rounded-lg transition-all font-semibold ${
                currentRole === 'student'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              تلميذ / ولي
            </button>
            <button
              onClick={() => setCurrentRole('teacher')}
              className={`px-2.5 py-1 rounded-lg transition-all font-semibold ${
                currentRole === 'teacher'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              أستاذ مستقل
            </button>
            <button
              onClick={() => setCurrentRole('school_manager')}
              className={`px-2.5 py-1 rounded-lg transition-all font-semibold ${
                currentRole === 'school_manager'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              مدير مدرسة (VIP)
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
