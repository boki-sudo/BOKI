import React from 'react';
import { 
  ArrowRight, 
  Share2, 
  Heart, 
  MapPin, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Building2,
  Calendar,
  Users
} from 'lucide-react';

export interface SchoolTeacherItem {
  id: string;
  name: string;
  subject: string;
  subjectColor: string; // e.g., 'text-blue-600'
  avatar: string;
}

export interface SchoolProfileData {
  id: string;
  name: string;
  category: string;
  wilaya: string;
  commune: string;
  rating: number;
  reviewsCount: number;
  coverImage: string;
  logo: string;
  phone: string;
  whatsapp: string;
  teachersCount: number;
  teachers: SchoolTeacherItem[];
  scheduleWeekday: string;
  scheduleWeekend: string;
}

export const ELITE_SCHOOL_DATA: SchoolProfileData = {
  id: 'school-elite',
  name: 'مدرسة النخبة للدعم',
  category: 'مركز معتمد للدروس الخصوصية واللغات',
  wilaya: 'الجزائر العاصمة',
  commune: 'القبة',
  rating: 4.9,
  reviewsCount: 300,
  coverImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  logo: 'https://ui-avatars.com/api/?name=مدرسة+النخبة&background=1E3A8A&color=fff&size=120',
  phone: '+213 21 28 45 67',
  whatsapp: '213555123456',
  teachersCount: 12,
  teachers: [
    {
      id: 'st-1',
      name: 'أ. محمد رابح',
      subject: 'رياضيات',
      subjectColor: 'text-blue-600',
      avatar: 'https://ui-avatars.com/api/?name=أ+محمد&background=f1f5f9&color=334155',
    },
    {
      id: 'st-2',
      name: 'أ. سارة بن علي',
      subject: 'فيزياء',
      subjectColor: 'text-rose-600',
      avatar: 'https://ui-avatars.com/api/?name=أ+سارة&background=f1f5f9&color=334155',
    },
    {
      id: 'st-3',
      name: 'أ. كريم علوي',
      subject: 'علوم طبيعية',
      subjectColor: 'text-emerald-600',
      avatar: 'https://ui-avatars.com/api/?name=أ+كريم&background=f1f5f9&color=334155',
    },
    {
      id: 'st-4',
      name: 'أ. أمين بوجمعة',
      subject: 'لغة فرنسية',
      subjectColor: 'text-purple-600',
      avatar: 'https://ui-avatars.com/api/?name=أ+أمين&background=f1f5f9&color=334155',
    },
    {
      id: 'st-5',
      name: 'أستاذة إيمان طاهري',
      subject: 'لغة إنجليزية',
      subjectColor: 'text-amber-600',
      avatar: 'https://ui-avatars.com/api/?name=أ+إيمان&background=f1f5f9&color=334155',
    },
  ],
  scheduleWeekday: '08:00 - 18:00',
  scheduleWeekend: '08:00 - 20:00 (مكثف)',
};

interface SchoolProfilePageProps {
  school?: SchoolProfileData;
  onBack: () => void;
  onSelectTeacher?: (teacherName: string) => void;
}

export const SchoolProfilePage: React.FC<SchoolProfilePageProps> = ({
  school = ELITE_SCHOOL_DATA,
  onBack,
  onSelectTeacher,
}) => {
  const [isSaved, setIsSaved] = React.useState(false);

  // إعداد رابط واتساب مع نص مسبق
  const whatsappUrl = `https://wa.me/${school.whatsapp}?text=${encodeURIComponent(
    `السلام عليكم مدرسة النخبة، تواصلت معكم عبر تطبيق "أستاذي" للاستفسار عن جدول الدروس الخصوصية والتسجيل في المقر.`
  )}`;

  return (
    <div className="bg-slate-100 min-h-screen text-slate-800 pb-28 font-sans select-none" dir="rtl" lang="ar">
      
      {/* شريط الملاحة العلوي الثابت */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 -mr-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold"
            aria-label="العودة"
          >
            <ArrowRight className="w-5 h-5 text-slate-800" />
            <span>العودة</span>
          </button>

          <span className="text-sm font-bold text-slate-900 truncate">
            {school.name}
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-full transition-colors ${
                isSaved ? 'bg-rose-50 text-rose-600' : 'text-slate-400 hover:text-slate-600'
              }`}
              aria-label="حفظ في المفضلة"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: school.name,
                    text: school.category,
                    url: window.location.href,
                  }).catch(() => {});
                }
              }}
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="مشاركة الملف"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* حاوية الهاتف (Mobile-First Container) */}
      <div className="max-w-md mx-auto bg-slate-50 min-h-screen relative shadow-sm">
        
        {/* صورة الغلاف (Cover Image) */}
        <div 
          className="h-40 w-full bg-cover bg-center relative" 
          style={{ backgroundImage: `url('${school.coverImage}')` }}
        >
          <div className="w-full h-full bg-black/40"></div>
        </div>

        {/* معلومات المدرسة والشعار */}
        <div className="px-4 relative -mt-12 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-5 text-center">
            <img 
              src={school.logo} 
              alt={school.name} 
              className="w-20 h-20 rounded-xl mx-auto mb-3 border-4 border-white shadow-sm -mt-12 bg-white object-cover"
            />
            <h1 className="text-2xl font-extrabold text-slate-900 flex justify-center items-center gap-1">
              <span>{school.name}</span>
              {/* شارة التوثيق الخضراء */}
              <svg className="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </h1>
            <p className="text-slate-500 text-sm font-medium mb-3 mt-1">
              {school.category}
            </p>
            
            {/* الموقع والتقييم */}
            <div className="flex justify-center items-center gap-4 text-sm mt-3 border-t border-slate-100 pt-3">
              <div className="flex items-center gap-1 text-slate-600">
                <svg className="w-4 h-4 text-rose-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>{school.wilaya}، {school.commune}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-600 font-bold">
                <span>⭐ {school.rating}</span>
                <span className="text-slate-400 font-normal">(+{school.reviewsCount} تقييم)</span>
              </div>
            </div>
          </div>
        </div>

        {/* قسم طاقم الأساتذة (تمرير أفقي) */}
        <div className="mb-6">
          <div className="flex justify-between items-center px-4 mb-3">
            <h2 className="font-bold text-lg text-slate-800 flex items-center gap-1.5">
              <span>طاقم الأساتذة</span>
              <span className="text-slate-400 font-normal text-sm">({school.teachersCount})</span>
            </h2>
            <button 
              onClick={() => {}}
              className="text-sm font-bold text-blue-600 hover:text-blue-700"
            >
              عرض الكل
            </button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-none">
            {school.teachers.map((teacher) => (
              <div 
                key={teacher.id}
                onClick={() => onSelectTeacher && onSelectTeacher(teacher.name)}
                className="min-w-[140px] bg-white p-3 rounded-2xl shadow-sm border border-slate-100 text-center cursor-pointer hover:border-slate-300 transition-colors"
              >
                <img 
                  src={teacher.avatar} 
                  alt={teacher.name}
                  className="w-14 h-14 rounded-full mx-auto mb-2 object-cover border border-slate-100"
                />
                <h3 className="font-bold text-sm text-slate-900 truncate">{teacher.name}</h3>
                <p className={`text-xs font-medium mt-1 ${teacher.subjectColor}`}>
                  {teacher.subject}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* قسم معلومات الاستقبال */}
        <div className="px-4 mb-4">
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-slate-100">
            <h2 className="font-bold text-lg mb-4 border-b border-slate-100 pb-2 text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-500" />
              <span>أوقات العمل والتسجيل</span>
            </h2>
            <ul className="text-sm text-slate-600 space-y-3">
              <li className="flex justify-between items-center">
                <span className="font-medium text-slate-800">أيام الأسبوع (الأحد - الخميس)</span>
                <span className="font-bold text-slate-700">{school.scheduleWeekday}</span>
              </li>
              <li className="flex justify-between items-center text-blue-700 font-bold bg-blue-50 p-2.5 rounded-xl -mx-2">
                <span>عطلة نهاية الأسبوع (الجمعة - السبت)</span>
                <span>{school.scheduleWeekend}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* خدمات ومميزات المدرسة */}
        <div className="px-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-slate-100 space-y-3">
            <h2 className="font-bold text-base text-slate-900">مميزات المدرسة</h2>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <span>قاعات مكيفة ومجهزة</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <span>أفواج مصغرة محدودة</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <span>متابعة دورية للأولياء</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <span>مطبوعات ملخصة مجانية</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* شريط التواصل السفلي الثابت (مخصص للمدرسة) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_15px_-3px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-md mx-auto flex gap-3">
          {/* زر واتساب للاستقبال */}
          <a 
            href={whatsappUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex justify-center items-center gap-2 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white py-3.5 rounded-xl font-bold transition-all shadow-md"
          >
            <svg className="w-5 h-5 fill-none stroke-current" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            <span>استفسار</span>
          </a>

          {/* زر الاتصال بالإدارة */}
          <a 
            href={`tel:${school.phone}`} 
            className="flex-[1.5] flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white py-3.5 rounded-xl font-bold transition-all shadow-md shadow-blue-200"
          >
            <svg className="w-5 h-5 fill-none stroke-current" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span>الاتصال بالإدارة</span>
          </a>
        </div>
      </div>

    </div>
  );
};
