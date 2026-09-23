import React, { useState } from 'react';
import { 
  Home, 
  Search, 
  CalendarCheck2, 
  User, 
  Star, 
  MapPin, 
  ShieldCheck, 
  GraduationCap, 
  SlidersHorizontal, 
  ChevronDown, 
  BookOpen, 
  Sparkles, 
  Phone, 
  MessageSquare, 
  X, 
  CheckCircle2, 
  Clock, 
  Heart, 
  Share2, 
  Filter,
  Check,
  Building2,
  BadgeCheck
} from 'lucide-react';
import { TeacherProfilePage, TeacherProfileData } from './components/TeacherProfilePage';
import { SchoolProfilePage, SchoolProfileData, ELITE_SCHOOL_DATA } from './components/SchoolProfilePage';

interface TeacherItem {
  id: string;
  name: string;
  subject: string;
  cycle: string;
  wilaya: string;
  commune: string;
  rating: number;
  reviewsCount: number;
  hourlyRateDZD: number;
  monthlyGroupDZD: number;
  experienceYears: number;
  avatar: string;
  badge?: string;
  modes: string[];
  scheduleDay: string;
  scheduleTime: string;
  whatsapp: string;
  phone: string;
  bio: string;
}

export function App() {
  // Navigation tabs
  const [activeBottomNav, setActiveBottomNav] = useState<'home' | 'search' | 'bookings' | 'account'>('home');

  // Teacher Profile View State
  const [selectedTeacherProfile, setSelectedTeacherProfile] = useState<TeacherProfileData | null>(null);
  // School Profile View State
  const [selectedSchoolProfile, setSelectedSchoolProfile] = useState<SchoolProfileData | null>(null);

  // Filter States
  const [selectedWilaya, setSelectedWilaya] = useState<string>('all');
  const [selectedCycle, setSelectedCycle] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

  // Booking Modal State
  const [bookingTeacher, setBookingTeacher] = useState<TeacherItem | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [bookingForm, setBookingForm] = useState({
    studentName: '',
    phone: '',
    sessionType: 'فوج شهري مصغر',
  });

  // Saved Favorites state
  const [savedTeachers, setSavedTeachers] = useState<string[]>(['t1']);

  // Teachers dataset with 3 rich curated profiles + additional options
  const teachers: TeacherItem[] = [
    {
      id: 't1',
      name: 'أ. مراد براهيمي',
      subject: 'الرياضيات والفيزياء',
      cycle: 'الطور الثانوي • تحضير البكالوريا',
      wilaya: 'الجزائر العاصمة',
      commune: 'باب الزوار',
      rating: 4.9,
      reviewsCount: 142,
      hourlyRateDZD: 2200,
      monthlyGroupDZD: 3500,
      experienceYears: 14,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=280&auto=format&fit=crop&q=80',
      badge: 'الأعلى تقييماً',
      modes: ['مدرسة دعم', 'عن بُعد'],
      scheduleDay: 'الجمعة والسبت',
      scheduleTime: '08:30 - 11:30',
      whatsapp: '213555123456',
      phone: '+213 555 12 34 56',
      bio: 'أستاذ مكون في مادة الرياضيات بشعبتي العلوم التجريبية والرياضيات. مرافقة دورية لحل مواضيع البكالوريا النموذجية وتدريب مكثف على منهجية التنقيط الرسمية.',
    },
    {
      id: 't2',
      name: 'أستاذة سارة بن علي',
      subject: 'علوم الطبيعة والحياة',
      cycle: 'الطورين المتوسط والثانوي',
      wilaya: 'الجزائر العاصمة',
      commune: 'حيدرة',
      rating: 4.8,
      reviewsCount: 98,
      hourlyRateDZD: 2000,
      monthlyGroupDZD: 3000,
      experienceYears: 9,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=280&auto=format&fit=crop&q=80',
      badge: 'موصى به',
      modes: ['مقر الأستاذة', 'عن بُعد'],
      scheduleDay: 'الجمعة',
      scheduleTime: '14:00 - 17:00',
      whatsapp: '213661987654',
      phone: '+213 661 98 76 54',
      bio: 'مهندسة بيولوجيا وأستاذة دعم متخصصة في تبسيط منهجية الاستدلال العلمي والمسعى التحقيقي لشهادة البكالوريا مع مطبوعات ملخصة ورسومات تفاعلية.',
    },
    {
      id: 't3',
      name: 'أ. عبد القادر منصوري',
      subject: 'العلوم الفيزيائية والتكنولوجيا',
      cycle: 'الطور المتوسط • شهادة BEM',
      wilaya: 'وهران',
      commune: 'وهران وسط',
      rating: 4.9,
      reviewsCount: 86,
      hourlyRateDZD: 1800,
      monthlyGroupDZD: 2800,
      experienceYears: 11,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=280&auto=format&fit=crop&q=80',
      badge: 'أستاذ مميز',
      modes: ['مدرسة دعم', 'تنقل للمنزل'],
      scheduleDay: 'السبت',
      scheduleTime: '09:00 - 12:00',
      whatsapp: '213770334455',
      phone: '+213 770 33 44 55',
      bio: 'خريج المدرسة العليا للأساتذة، تدريب مكثف على تمارين الميكانيك والمادة وتحولاتها لطلاب السنة الرابعة متوسط مع تجارب تطبيقية لشرح المفاهيم.',
    },
  ];

  const wilayasList = [
    { id: 'all', name: 'كل الولايات' },
    { id: '16', name: 'الجزائر العاصمة' },
    { id: '31', name: 'وهران' },
    { id: '25', name: 'قسنطينة' },
    { id: '19', name: 'سطيف' },
    { id: '09', name: 'البليدة' },
  ];

  const cyclesList = [
    { id: 'all', name: 'كل الأطوار' },
    { id: 'primaire', name: 'الابتدائي' },
    { id: 'moyen', name: 'المتوسط (BEM)' },
    { id: 'secondaire', name: 'الثانوي (BAC)' },
  ];

  const subjectsList = [
    { id: 'all', name: 'كل المواد' },
    { id: 'maths', name: 'الرياضيات' },
    { id: 'physique', name: 'الفيزياء' },
    { id: 'sciences', name: 'العلوم الطبيعية' },
    { id: 'philo', name: 'الفلسفة' },
    { id: 'langues', name: 'اللغات' },
  ];

  const toggleFavorite = (id: string) => {
    setSavedTeachers(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const openTeacherProfile = (teacher: TeacherItem) => {
    const profileData: TeacherProfileData = {
      id: teacher.id,
      name: teacher.name,
      title: `${teacher.cycle} • خبرة ${teacher.experienceYears} سنوات`,
      specialty: teacher.subject,
      rating: teacher.rating,
      reviewsCount: teacher.reviewsCount,
      studentsTaughtCount: 1200,
      experienceYears: teacher.experienceYears,
      wilaya: teacher.wilaya,
      commune: teacher.commune,
      avatar: teacher.avatar,
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
      bio: teacher.bio,
      phone: teacher.phone,
      whatsapp: teacher.whatsapp,
      monthlyGroupDZD: teacher.monthlyGroupDZD,
      hourlyPrivateDZD: teacher.hourlyRateDZD,
      modes: teacher.modes,
      subjects: [
        {
          name: teacher.subject.split(' و ')[0] || teacher.subject,
          levels: ['3 ثانوي (بكالوريا)', '2 ثانوي', '1 ثانوي جذع مشترك'],
          color: 'bg-blue-50 text-blue-800 border-blue-200',
        },
        {
          name: teacher.subject.split(' و ')[1] || 'دروس مراجعة مكثفة',
          levels: ['مراجعة شاملة للامتحانات الرسمية'],
          color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        },
      ],
      schedules: [
        {
          day: teacher.scheduleDay,
          time: teacher.scheduleTime,
          level: teacher.cycle,
          roomOrLocation: teacher.modes[0] || 'مقر التدريس',
        },
      ],
      reviews: [
        {
          id: `rev-${teacher.id}-1`,
          studentName: 'ريان بن خليفة',
          cycle: 'تلميذ بكالوريا 2025',
          date: 'منذ أسبوعين',
          rating: 5,
          bacMention: 'معدل 17.84 في شهادة البكالوريا',
          comment: 'شرح ممتاز وتبسيط دقيق لمنهجية حل التمارين النموذجية. مرافقة مستمرة وتصحيح دوري للأخطاء الشائعة.',
        },
        {
          id: `rev-${teacher.id}-2`,
          studentName: 'سيرين قواسمي',
          cycle: 'الطور الثانوي',
          date: 'منذ شهر',
          rating: 5,
          comment: 'أفواج مصغرة ومتابعة شخصية لكل تلميذ. التمارين المقترحة كانت مطابقة تماماً للاختبارات الفصلية.',
        },
      ],
    };
    setSelectedTeacherProfile(profileData);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setBookingTeacher(null);
      setBookingForm({ studentName: '', phone: '', sessionType: 'فوج شهري مصغر' });
    }, 2400);
  };

  if (selectedSchoolProfile) {
    return (
      <SchoolProfilePage
        school={selectedSchoolProfile}
        onBack={() => setSelectedSchoolProfile(null)}
      />
    );
  }

  if (selectedTeacherProfile) {
    return (
      <TeacherProfilePage
        profile={selectedTeacherProfile}
        onBack={() => setSelectedTeacherProfile(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-28 select-none" dir="rtl">
      
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center shadow-md shadow-slate-900/15">
              <GraduationCap className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl text-[#0F172A] tracking-tight">أستاذي</span>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  الجزائر
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block font-medium">
                دليلك الموثوق لحجز دروس الدعم والمدارس الخاصة
              </p>
            </div>
          </div>

          {/* User Quick Actions */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowFilterModal(true)}
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#0F172A] transition-all flex items-center gap-1 text-xs font-bold"
              aria-label="تصفية البحث"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">تصفية دقيقة</span>
            </button>
            <div className="w-9 h-9 rounded-2xl bg-slate-100 flex items-center justify-center text-[#0F172A] border border-slate-200/70">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Screen Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 space-y-6">

        {/* 2. Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white p-6 sm:p-8 shadow-xl shadow-slate-900/10">
          {/* Ambient Glows */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>تغطية 58 ولاية جزائرية • حجز فوري ومباشر</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
              تفوّق دراسي مع أفضل الأساتذة ومدارس الدعم
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              اختر ولايتك وطورك الدراسي وتواصل مباشرة مع الأستاذ لحجز مقعدك في أفواج التفوق والبكالوريا.
            </p>
          </div>
        </section>

        {/* 3. Modern Interactive Search & Filters */}
        <section className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-sm space-y-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <h2 className="text-sm font-extrabold text-[#0F172A]">بحث سريع وفلاتر فورية</h2>
            </div>
            {(selectedWilaya !== 'all' || selectedCycle !== 'all' || selectedSubject !== 'all') && (
              <button
                onClick={() => {
                  setSelectedWilaya('all');
                  setSelectedCycle('all');
                  setSelectedSubject('all');
                }}
                className="text-xs font-bold text-amber-600 hover:text-amber-700"
              >
                إعادة ضبط
              </button>
            )}
          </div>

          {/* Quick Selectors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Wilaya Selector Button */}
            <div className="relative">
              <label className="text-[11px] font-bold text-slate-400 block mb-1">الولاية (58 ولاية)</label>
              <div className="relative">
                <MapPin className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  value={selectedWilaya}
                  onChange={(e) => setSelectedWilaya(e.target.value)}
                  className="w-full appearance-none pr-10 pl-8 py-2.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 cursor-pointer"
                >
                  {wilayasList.map((w) => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Cycle Selector Button */}
            <div className="relative">
              <label className="text-[11px] font-bold text-slate-400 block mb-1">الطور التعليمي</label>
              <div className="relative">
                <BookOpen className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  value={selectedCycle}
                  onChange={(e) => setSelectedCycle(e.target.value)}
                  className="w-full appearance-none pr-10 pl-8 py-2.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 cursor-pointer"
                >
                  {cyclesList.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Subject Selector Button */}
            <div className="relative">
              <label className="text-[11px] font-bold text-slate-400 block mb-1">المادة المطلوبة</label>
              <div className="relative">
                <Sparkles className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full appearance-none pr-10 pl-8 py-2.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 cursor-pointer"
                >
                  {subjectsList.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Quick Pill Filter Chips */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 shrink-0">شائع الآن:</span>
            {['بكالوريا 2026', 'رياضيات علمي', 'فيزياء BEM', 'علوم طبيعية', 'دروس مكيفة'].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSubject('maths')}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-200 text-slate-600 transition-colors shrink-0 border border-transparent"
              >
                {chip}
              </button>
            ))}
          </div>
        </section>

        {/* 4. Featured Partner School Showcase Banner */}
        <section className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-900 text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
                <span>ن</span>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-extrabold text-slate-900">مدرسة النخبة للدعم</h3>
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                    <CheckCircle2 className="w-3 h-3 text-green-600" />
                    <span>مقر معتمد</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  مركز معتمد للدروس الخصوصية واللغات • القبة، الجزائر العاصمة
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                  <span className="text-amber-600 font-bold">⭐ 4.9 (+300 تقييم)</span>
                  <span>•</span>
                  <span>طاقم مكون من 12 أستاذ</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedSchoolProfile(ELITE_SCHOOL_DATA);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Building2 className="w-4 h-4" />
              <span>زيارة ملف المدرسة</span>
            </button>
          </div>
        </section>

        {/* 5. Teacher Cards Header */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <h2 className="text-lg font-black text-[#0F172A]">نخبة الأساتذة المتاحين</h2>
            <p className="text-xs text-slate-400 font-medium">أساتذة موثقون مع تقييمات حقيقية من التلاميذ والأولياء</p>
          </div>
          <span className="text-xs font-bold text-[#0F172A] bg-white px-3 py-1.5 rounded-2xl border border-slate-200/80 shadow-xs">
            {teachers.length} أستاذ متاح
          </span>
        </div>

        {/* 5. Teacher Cards List (Card-Based UI: Rounded-2xl, Soft Shadows, White Background) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {teachers.map((teacher) => {
            const isFav = savedTeachers.includes(teacher.id);

            return (
              <article
                key={teacher.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 flex flex-col justify-between overflow-hidden group relative"
              >
                {/* Top Badge & Favorite Button */}
                <div className="p-5 pb-3">
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    {/* Teacher Circular Avatar */}
                    <div 
                      onClick={() => openTeacherProfile(teacher)}
                      className="relative cursor-pointer"
                      title="عرض الملف الشخصي"
                    >
                      <div className="w-16 h-16 rounded-full overflow-hidden ring-3 ring-slate-100 shadow-sm bg-slate-50 shrink-0">
                        <img
                          src={teacher.avatar}
                          alt={teacher.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div 
                        title="أستاذ موثق"
                        className="absolute -bottom-1 -left-1 bg-[#0F172A] text-amber-400 p-1 rounded-full shadow-xs ring-2 ring-white"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Action icons & Badge */}
                    <div className="flex items-center gap-1.5">
                      {teacher.badge && (
                        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/80">
                          {teacher.badge}
                        </span>
                      )}
                      <button
                        onClick={() => toggleFavorite(teacher.id)}
                        className={`p-2 rounded-full transition-colors ${
                          isFav 
                            ? 'bg-rose-50 text-rose-600' 
                            : 'bg-slate-50 text-slate-400 hover:text-slate-600'
                        }`}
                        aria-label="إضافة للمفضلة"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Teacher Name & Specialty */}
                  <div 
                    onClick={() => openTeacherProfile(teacher)}
                    className="space-y-1 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-extrabold text-[#0F172A] group-hover:text-amber-600 transition-colors">
                        {teacher.name}
                      </h3>
                      {/* Rating with Stars */}
                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-slate-800">{teacher.rating}</span>
                        <span className="text-[10px] text-slate-400">({teacher.reviewsCount})</span>
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-slate-500">
                      {teacher.subject}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {teacher.cycle}
                    </p>
                  </div>

                  {/* Location & Experience */}
                  <div 
                    onClick={() => openTeacherProfile(teacher)}
                    className="flex items-center justify-between text-xs text-slate-500 pt-3 mt-3 border-t border-slate-100 cursor-pointer"
                  >
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{teacher.commune}، {teacher.wilaya}</span>
                    </div>
                    <span className="font-bold text-[#0F172A] text-[11px]">
                      خبرة {teacher.experienceYears} سنوات
                    </span>
                  </div>

                  {/* Price info & Schedule pill */}
                  <div 
                    onClick={() => openTeacherProfile(teacher)}
                    className="mt-3 p-2.5 rounded-xl bg-slate-50 flex items-center justify-between text-xs cursor-pointer hover:bg-slate-100/80 transition-colors"
                  >
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">سعر الفوج الشهري</span>
                      <div className="font-black text-[#0F172A] text-sm">
                        {teacher.monthlyGroupDZD.toLocaleString()} دج
                        <span className="text-[10px] text-slate-500 font-normal"> / شهر</span>
                      </div>
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] text-slate-400 block font-medium">توقيت الحصص</span>
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded-md">
                        {teacher.scheduleDay}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Action Buttons */}
                <div className="p-3 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => openTeacherProfile(teacher)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0F172A] font-bold text-xs transition-colors cursor-pointer text-center"
                  >
                    عرض الملف
                  </button>
                  <button
                    onClick={() => setBookingTeacher(teacher)}
                    className="flex-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-[0.99] text-[#0F172A] hover:text-white font-extrabold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>احجز الآن</span>
                    <span className="text-[10px] font-normal opacity-80 hidden sm:inline">• مقاعد محدودة</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* 6. Support School Highlight Section */}
        <section className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0F172A] flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#0F172A]">هل أنت مدير مدرسة دعم خاصة؟</h3>
              <p className="text-xs text-slate-400">انضم إلى باقة VIP لعرض قاعاتك وجداول أساتذتك واستقبال تسجيلات الأولياء.</p>
            </div>
          </div>
          <button 
            onClick={() => setActiveBottomNav('bookings')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold transition-colors whitespace-nowrap"
          >
            تسجيل مدرسة جديدة
          </button>
        </section>

      </main>

      {/* 7. Bottom Navigation Bar (Fixed for Mobile-First experience) */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-lg py-2 px-6">
        <div className="max-w-md mx-auto flex items-center justify-around">
          
          {/* 1. Home Button */}
          <button
            onClick={() => setActiveBottomNav('home')}
            className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-2xl ${
              activeBottomNav === 'home' 
                ? 'text-[#0F172A] font-extrabold scale-105' 
                : 'text-slate-400 hover:text-slate-600 font-medium'
            }`}
          >
            <div className={`p-1 rounded-xl ${activeBottomNav === 'home' ? 'bg-amber-100 text-amber-800' : ''}`}>
              <Home className="w-5 h-5" />
            </div>
            <span className="text-[10px]">الرئيسية</span>
          </button>

          {/* 2. Search Button */}
          <button
            onClick={() => {
              setActiveBottomNav('search');
              setShowFilterModal(true);
            }}
            className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-2xl ${
              activeBottomNav === 'search' 
                ? 'text-[#0F172A] font-extrabold scale-105' 
                : 'text-slate-400 hover:text-slate-600 font-medium'
            }`}
          >
            <div className={`p-1 rounded-xl ${activeBottomNav === 'search' ? 'bg-amber-100 text-amber-800' : ''}`}>
              <Search className="w-5 h-5" />
            </div>
            <span className="text-[10px]">البحث</span>
          </button>

          {/* 3. My Bookings Button */}
          <button
            onClick={() => setActiveBottomNav('bookings')}
            className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-2xl relative ${
              activeBottomNav === 'bookings' 
                ? 'text-[#0F172A] font-extrabold scale-105' 
                : 'text-slate-400 hover:text-slate-600 font-medium'
            }`}
          >
            <div className={`p-1 rounded-xl ${activeBottomNav === 'bookings' ? 'bg-amber-100 text-amber-800' : ''}`}>
              <CalendarCheck2 className="w-5 h-5" />
            </div>
            <span className="text-[10px]">حجوزاتي</span>
            {/* Notification badge */}
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
          </button>

          {/* 4. My Account Button */}
          <button
            onClick={() => setActiveBottomNav('account')}
            className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-2xl ${
              activeBottomNav === 'account' 
                ? 'text-[#0F172A] font-extrabold scale-105' 
                : 'text-slate-400 hover:text-slate-600 font-medium'
            }`}
          >
            <div className={`p-1 rounded-xl ${activeBottomNav === 'account' ? 'bg-amber-100 text-amber-800' : ''}`}>
              <User className="w-5 h-5" />
            </div>
            <span className="text-[10px]">حسابي</span>
          </button>

        </div>
      </nav>

      {/* 8. Booking Modal (Slide-up on Mobile, Modal on Desktop) */}
      {bookingTeacher && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom duration-200">
            
            {/* Header Modal */}
            <div className="bg-[#0F172A] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={bookingTeacher.avatar}
                  alt={bookingTeacher.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-400"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="font-black text-sm sm:text-base">{bookingTeacher.name}</h3>
                  <p className="text-xs text-amber-300 font-semibold">{bookingTeacher.subject} • {bookingTeacher.wilaya}</p>
                </div>
              </div>
              <button
                onClick={() => setBookingTeacher(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Confirmation */}
            {bookingConfirmed ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-[#0F172A]">تم تسجيل طلب الحجز بنجاح!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  سيتم التواصل معك عبر الواتساب لتأكيد موعد الحصة الأولى في الفوج المختار.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="p-5 space-y-4">
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">اسم التلميذ أو الولي</label>
                  <input
                    type="text"
                    required
                    value={bookingForm.studentName}
                    onChange={(e) => setBookingForm({ ...bookingForm, studentName: e.target.value })}
                    placeholder="مثال: يوسف بلقاسم"
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">رقم الهاتف (للاتصال والتأكيد عبر واتساب)</label>
                  <input
                    type="tel"
                    required
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    placeholder="05 / 06 / 07 XX XX XX"
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">نوع الحصة المطلوب</label>
                  <select
                    value={bookingForm.sessionType}
                    onChange={(e) => setBookingForm({ ...bookingForm, sessionType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  >
                    <option value="فوج شهري مصغر">فوج شهري مصغر ({bookingTeacher.monthlyGroupDZD} دج / شهر)</option>
                    <option value="حصة فردية خاصة">حصة فردية خاصة ({bookingTeacher.hourlyRateDZD} دج / ساعة)</option>
                    <option value="مراجعة مكثفة للبكالوريا">مراجعة مكثفة للبكالوريا</option>
                  </select>
                </div>

                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-amber-900 font-bold">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>توقيت الفوج: {bookingTeacher.scheduleDay} ({bookingTeacher.scheduleTime})</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <a
                    href={`https://wa.me/${bookingTeacher.whatsapp}?text=${encodeURIComponent(`السلام عليكم أستاذ، أريد حجز مقعد في مادة ${bookingTeacher.subject}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center shrink-0"
                    title="تواصل مباشر عبر واتساب"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </a>

                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-[#0F172A] font-extrabold text-xs sm:text-sm shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                  >
                    تأكيد حجز المقعد الآن
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

      {/* 9. Advanced Filter Sheet Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-amber-600" />
                <h3 className="font-extrabold text-sm sm:text-base text-[#0F172A]">فلاتر البحث الشاملة</h3>
              </div>
              <button
                onClick={() => setShowFilterModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">الطور الدراسي</label>
                <div className="grid grid-cols-2 gap-2">
                  {cyclesList.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCycle(c.id)}
                      className={`p-2.5 rounded-2xl text-xs font-bold border transition-all ${
                        selectedCycle === c.id 
                          ? 'bg-[#0F172A] text-white border-[#0F172A]' 
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">المادة التعليمية</label>
                <div className="grid grid-cols-3 gap-2">
                  {subjectsList.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSubject(s.id)}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedSubject === s.id 
                          ? 'bg-amber-500 text-[#0F172A] border-amber-500' 
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowFilterModal(false)}
              className="w-full py-3 bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs rounded-2xl transition-colors mt-2"
            >
              عرض النتائج ({teachers.length})
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
