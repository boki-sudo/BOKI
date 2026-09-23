import React from 'react';
import { X, MapPin, Phone, MessageSquare, Star, CheckCircle, Calendar, Clock, DollarSign, School, User, Award, ShieldCheck, ChevronLeft } from 'lucide-react';
import { TeacherProfile, SchoolProfile } from '../types';
import { WILAYAS, COMMUNES, SUBJECTS, EDUCATION_LEVELS, EDUCATION_STREAMS } from '../data/algeriaData';

interface ProfileDetailModalProps {
  item: TeacherProfile | SchoolProfile | null;
  type: 'teacher' | 'school' | null;
  onClose: () => void;
}

export const ProfileDetailModal: React.FC<ProfileDetailModalProps> = ({
  item,
  type,
  onClose,
}) => {
  if (!item || !type) return null;

  const isTeacher = type === 'teacher';
  const teacher = isTeacher ? (item as TeacherProfile) : null;
  const school = !isTeacher ? (item as SchoolProfile) : null;

  const wilaya = WILAYAS.find((w) => w.id === item.wilayaId);
  const commune = COMMUNES.find((c) => c.id === item.communeId);

  // إعداد رابط الواتساب التلقائي مع رسالة عربية مجهزة مسبقاً
  const getWhatsAppLink = () => {
    const rawNumber = isTeacher ? teacher?.whatsapp : school?.whatsapp;
    if (!rawNumber) return '#';
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const subjectName = isTeacher
      ? SUBJECTS.find((s) => s.id === teacher?.subjectIds[0])?.name_ar || 'دروس الدعم'
      : 'التسجيلات المدرسية';
    const recipientName = isTeacher ? teacher?.fullName : school?.name;
    const text = encodeURIComponent(
      `السلام عليكم ${recipientName}، تواصلت معكم عبر منصة أستاذي بخصوص ${subjectName}. هل يمكن معرفة الأماكن الشاغرة وشروط التسجيل بارك الله فيكم؟`
    );
    return `https://wa.me/${cleanNumber}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        {/* رأس البطاقة التفاعلية */}
        <div className="relative bg-gradient-to-l from-emerald-800 to-teal-900 px-6 py-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white/80 bg-stone-100 shrink-0">
              <img
                src={isTeacher ? teacher?.avatarUrl : school?.logoUrl}
                alt={isTeacher ? teacher?.fullName : school?.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
                  {isTeacher ? 'أستاذ مستقل مشترك' : 'مدرسة دعم خاصة VIP'}
                </span>
                {item.isVerified && (
                  <span className="flex items-center gap-1 text-[11px] font-bold bg-emerald-500/80 px-2 py-0.5 rounded-md">
                    <ShieldCheck className="w-3 h-3" />
                    <span>موثق رسمياً</span>
                  </span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-black">
                {isTeacher ? teacher?.fullName : school?.name}
              </h3>

              <div className="flex items-center gap-2 text-xs text-emerald-100">
                <MapPin className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>
                  {commune?.name_ar}، {wilaya?.name_ar} (ولاية {wilaya?.code})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* محتوى التفاصيل والبيانات */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* نبذة تعريفية */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1.5">
              {isTeacher ? 'النبذة المهنية وطريقة العمل' : 'عن المدرسة والتجهيزات'}
            </h4>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {isTeacher ? teacher?.bio : school?.description}
            </p>
          </div>

          {/* المواد والمستويات الدراسية */}
          {isTeacher && teacher && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                المواد والمستويات التعليمية المغطاة (تحديد متعدد)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3">
                  <span className="font-bold text-stone-900 block mb-1.5">المواد المسندة :</span>
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjectIds.map((sid) => {
                      const s = SUBJECTS.find((sub) => sub.id === sid);
                      return (
                        <span
                          key={sid}
                          className="font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md"
                        >
                          {s?.name_ar}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3">
                  <span className="font-bold text-stone-900 block mb-1.5">المستويات والشعب :</span>
                  <div className="flex flex-wrap gap-1">
                    {teacher.levelIds.map((lid) => {
                      const l = EDUCATION_LEVELS.find((lvl) => lvl.id === lid);
                      return (
                        <span
                          key={lid}
                          className="font-medium text-stone-700 bg-stone-200/70 px-2 py-0.5 rounded-md"
                        >
                          {l?.name_ar}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* التجهيزات في المدرسة */}
          {!isTeacher && school && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                مرافق وتجهيزات المدرسة
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {school.facilities.map((f, i) => (
                  <div
                    key={i}
                    className="text-xs font-semibold text-stone-700 bg-stone-50 border border-stone-200 rounded-xl p-2.5 flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* جدول الحصص والأفواج الأسبوعية */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2 flex items-center justify-between">
              <span>برنامج الحصص الأسبوعية (يومي الجمعة والسبت)</span>
              <span className="text-[11px] text-emerald-700 font-semibold">توقيت دراسي معتمد</span>
            </h4>

            <div className="space-y-2">
              {isTeacher &&
                teacher?.schedule?.map((slot) => {
                  const s = SUBJECTS.find((sub) => sub.id === slot.subjectId);
                  const l = EDUCATION_LEVELS.find((lvl) => lvl.id === slot.levelId);
                  return (
                    <div
                      key={slot.id}
                      className="bg-stone-50 border border-stone-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white font-bold text-[11px]">
                          {slot.day}
                        </span>
                        <div>
                          <div className="font-bold text-stone-900">
                            {s?.name_ar} - {l?.name_ar}
                          </div>
                          <div className="text-[11px] text-stone-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-stone-400" />
                            <span>من {slot.startTime} إلى {slot.endTime}</span>
                            <span>•</span>
                            <span>{slot.sessionType}</span>
                          </div>
                        </div>
                      </div>

                      <div className="font-black text-stone-900 text-left sm:text-right">
                        {slot.priceDZD} دج <span className="text-[10px] text-stone-400 font-normal">/ شهر</span>
                      </div>
                    </div>
                  );
                })}

              {!isTeacher &&
                school?.weeklySchedule?.map((sch) => {
                  const s = SUBJECTS.find((sub) => sub.id === sch.subjectId);
                  const l = EDUCATION_LEVELS.find((lvl) => lvl.id === sch.levelId);
                  return (
                    <div
                      key={sch.id}
                      className="bg-stone-50 border border-stone-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white font-bold text-[11px]">
                          {sch.day}
                        </span>
                        <div>
                          <div className="font-bold text-stone-900">
                            {s?.name_ar} - {l?.name_ar} ({sch.teacherName})
                          </div>
                          <div className="text-[11px] text-stone-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-stone-400" />
                            <span>من {sch.startTime} إلى {sch.endTime}</span>
                            <span>•</span>
                            <span className="text-emerald-700 font-semibold">{sch.room}</span>
                          </div>
                        </div>
                      </div>

                      <div className="font-black text-stone-900 text-left sm:text-right">
                        {sch.monthlyPriceDZD} دج <span className="text-[10px] text-stone-400 font-normal">/ شهر</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* أزرار الاتصال السريع والتواصل المباشر عبر واتساب */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-600 text-center sm:text-right">
            <span className="font-bold text-stone-900 block">تواصل مباشر ومجاني 100%</span>
            <span>بدون أي عمولة أو وساطة مع الأستاذ أو المدرسة</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* زر الاتصال الهاتفي */}
            <a
              href={`tel:${isTeacher ? teacher?.phone : school?.phone}`}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-stone-600" />
              <span>اتصال هاتفي</span>
            </a>

            {/* زر محادثة واتساب المباشرة */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm shadow-emerald-700/20"
            >
              <MessageSquare className="w-4 h-4" />
              <span>محادثة واتساب فورية</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
