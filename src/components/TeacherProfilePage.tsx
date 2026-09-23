import React, { useState } from 'react';
import { 
  ArrowRight, 
  Share2, 
  Heart, 
  Star, 
  MapPin, 
  Clock, 
  Award, 
  BookOpen, 
  MessageSquare, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  X
} from 'lucide-react';

export interface ProfileReview {
  id: string;
  studentName: string;
  cycle: string;
  date: string;
  rating: number;
  comment: string;
  bacMention?: string;
}

export interface TeacherProfileData {
  id: string;
  name: string;
  title: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  studentsTaughtCount: number;
  experienceYears: number;
  wilaya: string;
  commune: string;
  avatar: string;
  coverImage?: string;
  bio: string;
  phone: string;
  whatsapp: string;
  monthlyGroupDZD: number;
  hourlyPrivateDZD: number;
  modes: string[];
  subjects: {
    name: string;
    levels: string[];
    color?: string;
  }[];
  schedules?: {
    day: string;
    time: string;
    level: string;
    roomOrLocation: string;
  }[];
  reviews: ProfileReview[];
}

interface TeacherProfilePageProps {
  onBack?: () => void;
  profile?: TeacherProfileData;
}

const DEFAULT_PROFILE: TeacherProfileData = {
  id: 't-profile-1',
  name: 'الأستاذ أحمد كريم',
  title: 'أستاذ رئيسي - مادة الرياضيات',
  specialty: 'تحضير شهادة البكالوريا',
  rating: 4.8,
  reviewsCount: 124,
  studentsTaughtCount: 1250,
  experienceYears: 15,
  wilaya: 'الجزائر العاصمة',
  commune: 'باب الزوار',
  avatar: 'https://ui-avatars.com/api/?name=أحمد+كريم&background=0D8ABC&color=fff&size=160',
  bio: 'أستاذ بخبرة 15 سنة في تحضير طلبة البكالوريا. مصحح معتمد في الامتحانات الوطنية. أعتمد على طرق تبسيط المفاهيم المعقدة وحل المواضيع السابقة بشكل مكثف.',
  phone: '+213 555 12 34 56',
  whatsapp: '213555123456',
  monthlyGroupDZD: 3500,
  hourlyPrivateDZD: 2000,
  modes: ['في مدرسة دعم معتمدة', 'أفواج مصغرة', 'متابعة فردية مكثفة'],
  subjects: [
    {
      name: 'الرياضيات',
      levels: ['3 ثانوي - علوم تجريبية', '3 ثانوي - تقني رياضي', '2 ثانوي - رياضيات'],
      color: 'bg-blue-50 text-blue-700 border-blue-100',
    },
    {
      name: 'العلوم الفيزيائية',
      levels: ['3 ثانوي - علوم تجريبية', '2 ثانوي - علوم'],
      color: 'bg-slate-100 text-slate-700 border-slate-200',
    },
  ],
  schedules: [
    { day: 'الجمعة', time: '08:30 - 11:30', level: '3 ثانوي علوم تجريبية', roomOrLocation: 'مدرسة النجاح (باب الزوار)' },
    { day: 'السبت', time: '14:00 - 17:00', level: '3 ثانوي تقني رياضي', roomOrLocation: 'مدرسة النجاح (باب الزوار)' },
  ],
  reviews: [
    {
      id: 'rev-1',
      studentName: 'محمد أمين',
      cycle: 'بكالوريا علوم تجريبية',
      date: 'منذ أسبوعين',
      rating: 5,
      bacMention: 'علامة 18 في البكالوريا',
      comment: 'بفضل الله ثم الأستاذ تحصلت على علامة 18 في البكالوريا. طريقة شرحه ممتازة جداً ولا يضيع الوقت، والتطبيقات كافية وشاملة.',
    },
    {
      id: 'rev-2',
      studentName: 'سارة مرابط',
      cycle: '3 ثانوي تقني رياضي',
      date: 'منذ شهر',
      rating: 5,
      comment: 'أفضل أستاذ رياضيات درّسني. التمارين متدرجة من الأساسيات إلى أصعب المسائل الشاملة، مع تصحيح منهجي دقيق لكل تلميذ.',
    },
  ],
};

export const TeacherProfilePage: React.FC<TeacherProfilePageProps> = ({
  onBack,
  profile = DEFAULT_PROFILE,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', cycle: '', rating: 5, comment: '' });
  const [reviewsList, setReviewsList] = useState<ProfileReview[]>(profile.reviews);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // رابط الواتساب بنص جاهز
  const whatsappUrl = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
    `السلام عليكم ${profile.name}، تواصلت معك عبر تطبيق "أستاذي". أود الاستفسار عن تفاصيل التسجيل والأفواج المتاحة في ${profile.subjects[0]?.name || 'دروس الدعم'}. شكراً.`
  )}`;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const createdReview: ProfileReview = {
      id: `rev-${Date.now()}`,
      studentName: newReview.name,
      cycle: newReview.cycle || 'تلميذ في الطور الثانوي',
      date: 'الآن',
      rating: newReview.rating,
      comment: newReview.comment,
    };

    setReviewsList([createdReview, ...reviewsList]);
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setShowReviewModal(false);
      setNewReview({ name: '', cycle: '', rating: 5, comment: '' });
    }, 1600);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 pb-28 select-none font-sans" dir="rtl" lang="ar">
      
      {/* شريط الملاحة العلوي المخصص للهاتف */}
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
            الملف الشخصي
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
                    title: profile.name,
                    text: profile.title,
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
      <div className="max-w-md mx-auto bg-slate-50 min-h-screen relative pt-2">
        
        {/* 1. البطاقة العلوية: الهوية والتقييم (Header Card) */}
        <div className="bg-white rounded-b-3xl shadow-sm p-6 mb-4 text-center">
          <div className="relative w-24 h-24 mx-auto mb-3">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-24 h-24 rounded-full mx-auto border-4 border-slate-50 shadow-md object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <h1 className="text-2xl font-bold text-slate-900 flex justify-center items-center gap-2">
            <span>{profile.name}</span>
            {/* شارة التوثيق */}
            <svg className="w-5 h-5 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </h1>

          <p className="text-slate-500 font-medium mb-3 text-sm">
            {profile.title}
          </p>
          
          {/* التقييم */}
          <div className="flex justify-center items-center gap-1 bg-amber-50 text-amber-700 w-max mx-auto px-3 py-1 rounded-full text-sm font-bold">
            <span>⭐ {profile.rating}</span>
            <span className="text-amber-600/70 font-normal">({profile.reviewsCount} تقييم)</span>
          </div>

          {/* تفاصيل إضافية مريحة */}
          <div className="flex items-center justify-center gap-3 text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{profile.commune}، {profile.wilaya}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-slate-400" />
              <span>خبرة {profile.experienceYears} سنة</span>
            </div>
          </div>
        </div>

        {/* 2. قسم النبذة التعريفية (About Section) */}
        <div className="px-4 mb-4">
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h2 className="font-bold text-lg text-slate-900 mb-2">نبذة عن الأستاذ</h2>
            <p className="text-slate-600 text-sm leading-relaxed text-justify">
              {profile.bio}
            </p>

            {/* صيغ التدريس المتاحة */}
            {profile.modes && profile.modes.length > 0 && (
              <div className="pt-3 mt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                {profile.modes.map((mode, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg"
                  >
                    ✓ {mode}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 3. قسم المواد والمستويات (Subjects Section) */}
        <div className="px-4 mb-4">
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h2 className="font-bold text-lg text-slate-900 mb-3">المستويات المتاحة</h2>
            <div className="flex flex-wrap gap-2">
              {profile.subjects.flatMap((sub, sIdx) =>
                sub.levels.map((lvl, lIdx) => (
                  <span
                    key={`${sIdx}-${lIdx}`}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${
                      sIdx === 0
                        ? 'bg-blue-50 text-blue-700 border-blue-100'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {lvl}
                  </span>
                ))
              )}
            </div>

            {/* سعر الفوج الشهري */}
            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">سعر الفوج الشهري:</span>
              <span className="font-bold text-slate-900 text-sm">
                {profile.monthlyGroupDZD.toLocaleString()} دج / شهر
              </span>
            </div>
          </div>
        </div>

        {/* 4. قسم التقييمات (Reviews Section) */}
        <div className="px-4 mb-4">
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg text-slate-900">آراء التلاميذ</h2>
              <button
                onClick={() => setShowReviewModal(true)}
                className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                أضف تقييمك
              </button>
            </div>
            
            {/* بطاقات المراجعات الفردية */}
            <div className="space-y-3">
              {reviewsList.map((rev) => (
                <div
                  key={rev.id}
                  className="border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm text-slate-900">{rev.studentName}</span>
                    <span className="text-xs text-slate-400">{rev.date}</span>
                  </div>
                  <div className="text-amber-400 text-xs mb-1">
                    {'⭐'.repeat(rev.rating)}
                  </div>
                  {rev.bacMention && (
                    <div className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 mb-1">
                      {rev.bacMention}
                    </div>
                  )}
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 5. شريط التواصل السفلي الثابت (Sticky Bottom Bar) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-md mx-auto flex gap-3">
          
          {/* زر واتساب */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex justify-center items-center gap-2 bg-green-500 hover:bg-green-600 active:scale-[0.99] text-white py-3 rounded-xl font-bold transition-all shadow-xs"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z"/>
            </svg>
            <span>واتساب</span>
          </a>

          {/* زر الاتصال */}
          <a
            href={`tel:${profile.phone}`}
            className="flex-1 flex justify-center items-center gap-2 bg-blue-900 hover:bg-blue-950 active:scale-[0.99] text-white py-3 rounded-xl font-bold transition-all shadow-xs"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span>اتصال</span>
          </a>

        </div>
      </div>

      {/* نافذة منبثقة لإضافة تقييم جديد */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-100 p-5 space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                أضف تقييمك للأستاذ
              </h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reviewSubmitted ? (
              <div className="py-6 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">شكراً لك! تم إضافة تقييمك بنجاح</h4>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">اسم التلميذ أو الولي</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: يونس بلقاسم"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">الطور أو الشعبة (اختياري)</label>
                  <input
                    type="text"
                    placeholder="مثال: 3 ثانوي علوم تجريبية"
                    value={newReview.cycle}
                    onChange={(e) => setNewReview({ ...newReview, cycle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">التقييم بالنجوم</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setNewReview({ ...newReview, rating: s })}
                        className="p-1 text-amber-400 focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${s <= newReview.rating ? 'fill-amber-400' : 'text-slate-300'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">تعليقك وانطباعك</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="اكتب رأيك الصادق في طريقة تدريس الأستاذ..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 font-medium leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs transition-colors"
                >
                  إرسال التقييم الآن
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

