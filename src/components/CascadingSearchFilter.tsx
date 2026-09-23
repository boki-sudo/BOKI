import React, { useMemo } from 'react';
import { Search, MapPin, BookOpen, Layers, Award, RotateCcw, Filter, CheckCircle2, ChevronLeft, School, User, Sparkles } from 'lucide-react';
import { WILAYAS, COMMUNES, EDUCATION_LEVELS, EDUCATION_STREAMS, SUBJECTS } from '../data/algeriaData';
import { SearchFilterState, TeachingMode, EducationCycle } from '../types';

interface CascadingSearchFilterProps {
  filter: SearchFilterState;
  setFilter: React.Dispatch<React.SetStateAction<SearchFilterState>>;
  totalMatches: { teachers: number; schools: number };
}

export const CascadingSearchFilter: React.FC<CascadingSearchFilterProps> = ({
  filter,
  setFilter,
  totalMatches,
}) => {
  // 1. البلديات المتاحة بحسب الولاية المختارة
  const availableCommunes = useMemo(() => {
    if (!filter.wilayaId) return [];
    return COMMUNES.filter((c) => c.wilaya_id === filter.wilayaId);
  }, [filter.wilayaId]);

  // 2. المستويات المتاحة بحسب الطور المختار
  const availableLevels = useMemo(() => {
    if (!filter.cycle) return EDUCATION_LEVELS;
    return EDUCATION_LEVELS.filter((l) => l.cycle === filter.cycle);
  }, [filter.cycle]);

  // المستوى المختار حالياً
  const selectedLevelObj = useMemo(() => {
    if (!filter.levelId) return null;
    return EDUCATION_LEVELS.find((l) => l.id === filter.levelId) || null;
  }, [filter.levelId]);

  // 3. الشعب المتاحة (فقط للسنة 2 و 3 ثانوي)
  const availableStreams = useMemo(() => {
    if (!filter.levelId) return [];
    return EDUCATION_STREAMS.filter((s) => s.level_id === filter.levelId);
  }, [filter.levelId]);

  // 4. المواد المتاحة بحسب الطور المختار
  const availableSubjects = useMemo(() => {
    if (!filter.cycle) return SUBJECTS;
    return SUBJECTS.filter((s) => s.cycles.includes(filter.cycle as EducationCycle));
  }, [filter.cycle]);

  // عند تغيير الولاية: تصفير البلدية تلقائياً لمنع أي تضارب
  const handleWilayaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value ? Number(e.target.value) : null;
    setFilter((prev) => ({
      ...prev,
      wilayaId: val,
      communeId: null, // تصفير الابن
    }));
  };

  // عند تغيير الطور الدراسي: التحقق من توافق المستوى الحالي
  const handleCycleChange = (cycle: EducationCycle | null) => {
    setFilter((prev) => {
      let nextLevelId = prev.levelId;
      if (cycle && prev.levelId) {
        const lvl = EDUCATION_LEVELS.find((l) => l.id === prev.levelId);
        if (lvl && lvl.cycle !== cycle) {
          nextLevelId = null;
        }
      }
      return {
        ...prev,
        cycle: cycle,
        levelId: nextLevelId,
        streamId: null, // تصفير الشعبة دائماً
      };
    });
  };

  // عند تغيير المستوى: تصفير الشعبة لضمان التوافق
  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value || null;
    const lvlObj = EDUCATION_LEVELS.find((l) => l.id === val);
    setFilter((prev) => ({
      ...prev,
      levelId: val,
      cycle: lvlObj ? lvlObj.cycle : prev.cycle,
      streamId: null,
    }));
  };

  // إعادة ضبط كافة الفلاتر
  const handleReset = () => {
    setFilter({
      wilayaId: null,
      communeId: null,
      cycle: null,
      levelId: null,
      streamId: null,
      subjectId: null,
      mode: null,
      profileType: 'all',
      searchQuery: '',
    });
  };

  const hasActiveFilters = Boolean(
    filter.wilayaId ||
    filter.communeId ||
    filter.cycle ||
    filter.levelId ||
    filter.streamId ||
    filter.subjectId ||
    filter.mode ||
    filter.profileType !== 'all' ||
    filter.searchQuery
  );

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 sm:p-6 mb-6">
      {/* عنوان الفلتر والإحصائيات الحية */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <Filter className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900">
                فلتر البحث المتسلسل للدروس والمدارس في الجزائر
              </h2>
              <p className="text-xs text-stone-500">
                اختر الولاية والبلدية، ثم حدد الطور والشعبة والمادة لتظهر النتائج في الوقت الفعلي
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-stone-100 text-stone-700 font-semibold border border-stone-200">
              الأساتذة: <strong className="text-emerald-800">{totalMatches.teachers}</strong>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-stone-100 text-stone-700 font-semibold border border-stone-200">
              المدارس: <strong className="text-emerald-800">{totalMatches.schools}</strong>
            </span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="text-xs text-rose-700 hover:text-rose-800 font-bold flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة ضبط</span>
            </button>
          )}
        </div>
      </div>

      {/* شريط البحث النصي السريع ونوع الحساب */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
        {/* حقل البحث السريع بالاسم */}
        <div className="relative md:col-span-2">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={filter.searchQuery}
            onChange={(e) => setFilter((prev) => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="ابحث باسم الأستاذ، اسم المدرسة، أو الكلمات المفتاحية..."
            className="w-full pr-10 pl-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all placeholder:text-stone-400"
          />
        </div>

        {/* تصنيف النتائج: الكل / أساتذة / مدارس */}
        <div className="bg-stone-100 p-1 rounded-xl flex text-xs border border-stone-200">
          <button
            onClick={() => setFilter((prev) => ({ ...prev, profileType: 'all' }))}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all text-center ${
              filter.profileType === 'all'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => setFilter((prev) => ({ ...prev, profileType: 'teacher' }))}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1 ${
              filter.profileType === 'teacher'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>الأساتذة</span>
          </button>
          <button
            onClick={() => setFilter((prev) => ({ ...prev, profileType: 'school' }))}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1 ${
              filter.profileType === 'school'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <School className="w-3.5 h-3.5" />
            <span>مدارس الدعم</span>
          </button>
        </div>
      </div>

      {/* الفلتر المتسلسل المترابط (Cascading Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
        {/* 1. الولاية (58 ولاية) */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            <span>1. الولاية (الـ 58 ولاية)</span>
          </label>
          <select
            value={filter.wilayaId || ''}
            onChange={handleWilayaChange}
            className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
          >
            <option value="">جميع الولايات (الوطن كامل)</option>
            {WILAYAS.map((w) => (
              <option key={w.id} value={w.id}>
                {w.code} - {w.name_ar} ({w.name_fr})
              </option>
            ))}
          </select>
        </div>

        {/* 2. الدائرة / البلدية (تتحدث تلقائياً حسب الولاية) */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>2. الدائرة / البلدية</span>
          </label>
          <select
            value={filter.communeId || ''}
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                communeId: e.target.value ? Number(e.target.value) : null,
              }))
            }
            disabled={!filter.wilayaId}
            className={`w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
              !filter.wilayaId
                ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed'
                : 'bg-stone-50 border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700'
            }`}
          >
            <option value="">
              {!filter.wilayaId ? 'اختر الولاية أولاً' : 'جميع بلديات الولاية'}
            </option>
            {availableCommunes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name_ar} ({c.name_fr})
              </option>
            ))}
          </select>
        </div>

        {/* 3. المستوى الدراسي (ابتدائي، متوسط، ثانوي) */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            <span>3. المستوى الدراسي</span>
          </label>
          <select
            value={filter.levelId || ''}
            onChange={handleLevelChange}
            className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
          >
            <option value="">كافة المستويات الدراسية</option>
            {availableLevels.map((lvl) => (
              <option key={lvl.id} value={lvl.id}>
                {lvl.name_ar}
              </option>
            ))}
          </select>
        </div>

        {/* 4. الشعبة للثانوي (ديناميكية - تفتح فقط مع 2 ثانوي و 3 ثانوي) */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>4. الشعبة (خاصة بالثانوي)</span>
          </label>
          <select
            value={filter.streamId || ''}
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                streamId: e.target.value || null,
              }))
            }
            disabled={!selectedLevelObj?.has_streams}
            className={`w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
              !selectedLevelObj?.has_streams
                ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed'
                : 'bg-stone-50 border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700'
            }`}
          >
            <option value="">
              {!selectedLevelObj
                ? 'اختر المستوى أولاً'
                : !selectedLevelObj.has_streams
                ? 'لا توجد شعب (ابتدائي/متوسط/1ثانوي)'
                : 'جميع الشعب التعليمية'}
            </option>
            {availableStreams.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name_ar}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* أزرار اختيار الطور التعليمي السريع ومصفوفة المواد */}
      <div className="mt-4 pt-4 border-t border-stone-100 space-y-3">
        {/* أزرار الأطوار: الكل، ابتدائي، متوسط، ثانوي */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-stone-600 pl-2">الطور التعليمي:</span>
          <button
            onClick={() => handleCycleChange(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter.cycle === null
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            جميع الأطوار
          </button>
          <button
            onClick={() => handleCycleChange('primaire')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter.cycle === 'primaire'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60'
            }`}
          >
            الطور الابتدائي (1 إلى 5 ابتدائي)
          </button>
          <button
            onClick={() => handleCycleChange('moyen')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter.cycle === 'moyen'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60'
            }`}
          >
            الطور المتوسط (شهادة التعليم المتوسط BEM)
          </button>
          <button
            onClick={() => handleCycleChange('secondaire')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter.cycle === 'secondaire'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60'
            }`}
          >
            الطور الثانوي (شهادة البكالوريا BAC)
          </button>
        </div>

        {/* المواد الدراسية كأزرار وسوم سريعة (Chips) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-bold text-stone-600 pl-2">المادة:</span>
          <button
            onClick={() => setFilter((prev) => ({ ...prev, subjectId: null }))}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              filter.subjectId === null
                ? 'bg-stone-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            كل المواد
          </button>
          {availableSubjects.map((sub) => {
            const isSelected = filter.subjectId === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() =>
                  setFilter((prev) => ({
                    ...prev,
                    subjectId: isSelected ? null : sub.id,
                  }))
                }
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {sub.name_ar}
              </button>
            );
          })}
        </div>

        {/* صيغ تقديم الدروس */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="font-bold text-stone-600 pl-2">صيغة الدرس:</span>
          <button
            onClick={() => setFilter((prev) => ({ ...prev, mode: null }))}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              filter.mode === null
                ? 'bg-stone-800 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            كل الصيغ
          </button>
          <button
            onClick={() =>
              setFilter((prev) => ({
                ...prev,
                mode: prev.mode === 'support_school' ? null : 'support_school',
              }))
            }
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              filter.mode === 'support_school'
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            في مدرسة دعم
          </button>
          <button
            onClick={() =>
              setFilter((prev) => ({
                ...prev,
                mode: prev.mode === 'in_person_teacher' ? null : 'in_person_teacher',
              }))
            }
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              filter.mode === 'in_person_teacher'
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            في منزل الأستاذ
          </button>
          <button
            onClick={() =>
              setFilter((prev) => ({
                ...prev,
                mode: prev.mode === 'in_person_home' ? null : 'in_person_home',
              }))
            }
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              filter.mode === 'in_person_home'
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            تنقل لمنزل التلميذ
          </button>
          <button
            onClick={() =>
              setFilter((prev) => ({
                ...prev,
                mode: prev.mode === 'online' ? null : 'online',
              }))
            }
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              filter.mode === 'online'
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            عن بُعد (Online)
          </button>
        </div>
      </div>
    </div>
  );
};
