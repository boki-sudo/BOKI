import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Star, CheckCircle, ShieldCheck, Calendar, School, User, ArrowLeft, BookOpen, Clock, AlertCircle } from 'lucide-react';
import { TeacherProfile, SchoolProfile, SearchFilterState, TeachingMode } from '../types';
import { WILAYAS, COMMUNES, SUBJECTS, EDUCATION_LEVELS } from '../data/algeriaData';
import { ProfileDetailModal } from './ProfileDetailModal';

interface DirectoryViewProps {
  teachers: TeacherProfile[];
  schools: SchoolProfile[];
  filter: SearchFilterState;
  onClearFilter: () => void;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  teachers,
  schools,
  filter,
  onClearFilter,
}) => {
  const [selectedProfile, setSelectedProfile] = useState<{
    item: TeacherProfile | SchoolProfile;
    type: 'teacher' | 'school';
  } | null>(null);

  const getModeLabel = (mode: TeachingMode) => {
    switch (mode) {
      case 'support_school':
        return 'في مدرسة دعم';
      case 'in_person_teacher':
        return 'في مقر الأستاذ';
      case 'in_person_home':
        return 'تنقل لمنزل التلميذ';
      case 'online':
        return 'عن بُعد (Online)';
    }
  };

  const hasAnyResults = teachers.length > 0 || schools.length > 0;

  return (
    <div>
      {/* نافذة التفاصيل والمحادثة المباشرة */}
      {selectedProfile && (
        <ProfileDetailModal
          item={selectedProfile.item}
          type={selectedProfile.type}
          onClose={() => setSelectedProfile(null)}
        />
      )}

      {/* تنبيه عند عدم وجود نتائج للفلترة الحالية */}
      {!hasAnyResults && (
        <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center max-w-lg mx-auto my-8 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900 mb-1">
            لا توجد نتائج مطابقة لهذه التوليفة
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mb-4">
            جرب اختيار ولاية أخرى، أو توسيع البحث ليشمل كافة الشعب والمواد لإظهار الأساتذة المسجلين.
          </p>
          <button
            onClick={onClearFilter}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs"
          >
            إعادة تعيين الفلاتر
          </button>
        </div>
      )}

      {/* قسم الأساتذة المستقلين */}
      {(filter.profileType === 'all' || filter.profileType === 'teacher') && teachers.length > 0 && (
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <h3 className="font-extrabold text-base sm:text-lg text-stone-900">
                الأساتذة المستقلون المعتمدون ({teachers.length})
              </h3>
            </div>
            <span className="text-xs text-stone-500">
              مشتركون مؤكدون • تواصل مباشر بدون وسيط
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teachers.map((teacher) => {
              const wilaya = WILAYAS.find((w) => w.id === teacher.wilayaId);
              const commune = COMMUNES.find((c) => c.id === teacher.communeId);
              const teacherSubjects = SUBJECTS.filter((s) => teacher.subjectIds.includes(s.id));
              const teacherLevels = EDUCATION_LEVELS.filter((l) => teacher.levelIds.includes(l.id));

              return (
                <div
                  key={teacher.id}
                  className="bg-white rounded-2xl border border-stone-200 hover:border-emerald-600/40 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-4 sm:p-5 space-y-3">
                    {/* رأس بطاقة الأستاذ */}
                    <div className="flex items-start gap-3">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shrink-0">
                        <img
                          src={teacher.avatarUrl}
                          alt={teacher.fullName}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {teacher.isVerified && (
                          <div
                            title="أستاذ معتمد وموثق"
                            className="absolute bottom-0 right-0 p-0.5 bg-emerald-700 text-white rounded-tl-lg"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-extrabold text-sm sm:text-base text-stone-900 truncate">
                            {teacher.fullName}
                          </h4>
                          <div className="flex items-center gap-1 text-amber-600 shrink-0">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span className="text-xs font-bold text-stone-800">{teacher.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-stone-500 mt-0.5">
                          <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                          <span className="truncate">
                            {commune?.name_ar}، {wilaya?.name_ar} ({wilaya?.code})
                          </span>
                        </div>

                        <div className="text-[11px] text-emerald-800 font-semibold mt-1">
                          خبرة {teacher.experienceYears} سنة في التعليم
                        </div>
                      </div>
                    </div>

                    {/* العنوان الوصفي */}
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {teacher.headline}
                    </p>

                    {/* وسوم المواد والمستويات (Multi-Selection Tags) */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex flex-wrap gap-1">
                        {teacherSubjects.map((s) => (
                          <span
                            key={s.id}
                            className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md"
                          >
                            {s.name_ar}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {teacherLevels.map((lvl) => (
                          <span
                            key={lvl.id}
                            className="text-[10px] font-medium bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md"
                          >
                            {lvl.name_ar}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* صيغ الدروس */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {teacher.modes.map((m) => (
                        <span
                          key={m}
                          className="text-[10px] bg-stone-50 text-stone-600 border border-stone-200 px-2 py-0.5 rounded-md"
                        >
                          {getModeLabel(m)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* أسفل البطاقة: الأسعار وزر الحجز المباشر */}
                  <div className="px-4 py-3 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-stone-400 block">سعر الفوج الشهري</span>
                      <span className="font-black text-sm text-stone-900">
                        {teacher.monthlyGroupRateDZD ? `${teacher.monthlyGroupRateDZD} دج` : 'حسب الاتفاق'}
                        <span className="text-[10px] text-stone-500 font-normal"> / شهر</span>
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedProfile({ item: teacher, type: 'teacher' })}
                      className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                    >
                      <span>التفاصيل والتواصل</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* قسم مدارس الدعم الخاصة (باقة VIP) */}
      {(filter.profileType === 'all' || filter.profileType === 'school') && schools.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <h3 className="font-extrabold text-base sm:text-lg text-stone-900">
                مدارس ومراكز الدعم المعتمدة ({schools.length})
              </h3>
            </div>
            <span className="text-xs text-stone-500">
              باقة VIP • قاعات مكيفة وجداول أسبوعية شاملة
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schools.map((school) => {
              const wilaya = WILAYAS.find((w) => w.id === school.wilayaId);
              const commune = COMMUNES.find((c) => c.id === school.communeId);
              const schoolSubjects = SUBJECTS.filter((s) => school.subjectIds.includes(s.id));

              return (
                <div
                  key={school.id}
                  className="bg-white rounded-2xl border border-stone-200 hover:border-emerald-600/40 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
                >
                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shrink-0">
                        <img
                          src={school.logoUrl}
                          alt={school.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div
                          title="مدرسة معتمدة VIP"
                          className="absolute bottom-0 right-0 p-0.5 bg-emerald-700 text-white rounded-tl-lg"
                        >
                          <School className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-extrabold text-sm sm:text-base text-stone-900 truncate">
                            {school.name}
                          </h4>
                          <div className="flex items-center gap-1 text-amber-600 shrink-0">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            <span className="text-xs font-bold text-stone-800">{school.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-stone-500 mt-0.5">
                          <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                          <span className="truncate">
                            {commune?.name_ar}، {wilaya?.name_ar} ({wilaya?.code})
                          </span>
                        </div>

                        <span className="inline-block text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 font-bold px-2 py-0.5 rounded-full mt-1">
                          باقة VIP الرسمية
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {school.tagline}
                    </p>

                    {/* المواد المتاحة بالمدرسة */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex flex-wrap gap-1">
                        {schoolSubjects.slice(0, 4).map((s) => (
                          <span
                            key={s.id}
                            className="text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md"
                          >
                            {s.name_ar}
                          </span>
                        ))}
                        {schoolSubjects.length > 4 && (
                          <span className="text-[10px] text-stone-400 self-center">
                            +{schoolSubjects.length - 4} مواد أخرى
                          </span>
                        )}
                      </div>
                    </div>

                    {/* مميزات وتجهيزات المدرسة */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {school.facilities.slice(0, 3).map((f, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md"
                        >
                          ✓ {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between gap-2">
                    <div className="text-xs text-stone-600">
                      <span className="font-bold text-stone-900 block">
                        {(school.weeklySchedule || []).length} أفواج أسبوعية
                      </span>
                      <span className="text-[10px] text-stone-400">توقيت الجمعة والسبت</span>
                    </div>

                    <button
                      onClick={() => setSelectedProfile({ item: school, type: 'school' })}
                      className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                    >
                      <span>التوقيت والتسجيل</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
