import React, { useState } from 'react';
import { Layers, CheckCircle2, XCircle, AlertTriangle, CreditCard, Smartphone, DollarSign, Zap, Server, Shield, Check } from 'lucide-react';
import { TECH_STACK_OPTIONS } from '../data/techStackData';

export const TechStackGuide: React.FC = () => {
  const [selectedStackId, setSelectedStackId] = useState<string>('code-supabase-react');
  const [teacherCount, setTeacherCount] = useState<number>(50);
  const [schoolCount, setSchoolCount] = useState<number>(10);

  const selectedStack =
    TECH_STACK_OPTIONS.find((s) => s.id === selectedStackId) || TECH_STACK_OPTIONS[0];

  // محاكاة تقريبية للدخل الشهري بالدينار الجزائري (DZD)
  // افتراض اشتراك الأستاذ = 2,500 دج شهرياً، واشتراك المدرسة VIP = 8,000 دج شهرياً
  const estimatedRevenueDZD = teacherCount * 2500 + schoolCount * 8000;

  return (
    <div className="space-y-6">
      {/* عنوان القسم */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
            <Layers className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900">
              التقييم المقارن للتقنيات البرمجية والـ No-Code في الجزائر
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              تحليل موضوعي يراعي سرعة الإطلاق، تكاليف العملة الصعبة، بوابات الدفع بالدينار (الذهبية / CIB)، وسرعة تحميل الـ PWA على الهاتف.
            </p>
          </div>
        </div>
      </div>

      {/* صندوق التنبيهات الخاصة بالسوق الجزائري */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs sm:text-sm text-amber-900">
            <h4 className="font-bold text-amber-950">
              حقائق وقيود واقعية مهمة في السوق الجزائري يجب الانتباه لها:
            </h4>
            <ul className="list-disc pr-4 space-y-1 text-xs text-amber-800">
              <li>
                <strong>الدفع بالعملة الأجنبية (USD / EUR):</strong> منصات مثل Bubble تفرض فواتير شهرية ($32 إلى $130) تتطلب بطاقة دولية وتواجه صعوبات شحن وتكلفة متزايدة مع زيادة الزيارات.
              </li>
              <li>
                <strong>تحصيل الأموال بالدينار الجزائري:</strong> لا يمكن استقبال الأموال عبر Stripe أو PayPal في البنوك الجزائرية. يجب الاعتماد على <strong>Chargily Pay (البطاقة الذهبية / بطاقة CIB)</strong> أو التحويل عبر <strong>بريدي موب (BaridiMob)</strong> مع رفع وصل التحويل.
              </li>
              <li>
                <strong>تصفح الهواتف وشبكات الجيل الرابع:</strong> أكثر من 85% من التلاميذ والأولياء يتصفحون عبر الهاتف الذكي. تطبيق PWA فائق الخفة والمبني بـ React يقلع في ثانية واحدة، بينما منصات مثل Bubble أو Flutter Web تكون أثقل بكثير في التحميل الأولي.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* بطاقات مقارنة الخيارات الأربعة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {TECH_STACK_OPTIONS.map((stack) => {
          const isSelected = stack.id === selectedStackId;
          return (
            <div
              key={stack.id}
              onClick={() => setSelectedStackId(stack.id)}
              className={`cursor-pointer rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/40 shadow-sm ring-2 ring-emerald-600/20'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      stack.type === 'code'
                        ? 'bg-emerald-100 text-emerald-800'
                        : stack.type === 'no-code'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {stack.type === 'code' ? 'برمجة فعلية' : stack.type === 'no-code' ? 'بدون كود No-Code' : 'هجين Low-Code'}
                  </span>
                  {stack.badge && (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                      {stack.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-sm text-stone-900 mb-1">
                  {stack.name}
                </h3>
                <p className="text-xs text-stone-500 line-clamp-2 mb-3">
                  {stack.headline}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-stone-400">مدة الإنجاز :</span>
                  <span className="font-semibold text-stone-700">{stack.timeToMVP}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">التكلفة الشهرية :</span>
                  <span className="font-bold text-emerald-800">{stack.monthlyCostDZD}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* تفاصيل الحزمة المختارة */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
        <div className="border-b border-stone-100 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-stone-900">
                {selectedStack.name}
              </h3>
              {selectedStack.badge && (
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  توصية استشاري النظم
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              {selectedStack.headline}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-xl">
              <span className="text-stone-400 block text-[10px]">مدة الإطلاق للـ MVP</span>
              <span className="font-bold text-stone-900">{selectedStack.timeToMVP}</span>
            </div>
            <div className="bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-xl">
              <span className="text-stone-400 block text-[10px]">تكلفة الاستضافة الشهرية</span>
              <span className="font-bold text-emerald-700">{selectedStack.monthlyCostDZD}</span>
            </div>
          </div>
        </div>

        {/* شبكة الإيجابيات والسلبيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>أبرز المزايا ونقاط القوة</span>
            </h4>
            <div className="space-y-2">
              {selectedStack.pros.map((pro, i) => (
                <div
                  key={i}
                  className="text-xs sm:text-sm text-stone-700 bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <span>{pro}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>السلبيات والمخاطر التقنية</span>
            </h4>
            <div className="space-y-2">
              {selectedStack.cons.map((con, i) => (
                <div
                  key={i}
                  className="text-xs sm:text-sm text-stone-700 bg-rose-50/50 border border-rose-100 rounded-xl p-3 flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-2 shrink-0" />
                  <span>{con}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* خلاصة رأي المهندس */}
        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
            رأي استشاري البنية البرمجية
          </span>
          <p className="text-xs sm:text-sm font-semibold text-stone-900 leading-relaxed">
            {selectedStack.verdict}
          </p>
        </div>
      </div>

      {/* معمارية الدفع والاشتراكات في الجزائر */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-stone-900 text-base">
            معمارية الاشتراكات والدفع الإلكتروني في الجزائر (الذهبية / CIB / بريدي موب)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-2">
            <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>1. بوابة Chargily Pay v2 (آلي بالكامل)</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              البوابة الرسمية الأولى في الجزائر لدعم بطاقات بريد الجزائر (الذهبية) والبطاقات البنكية المشتركة (CIB).
            </p>
            <div className="text-[11px] text-emerald-800 font-semibold">
              • تفعيل فوري ومباشر لاشتراك الأستاذ في Supabase عبر الـ Webhook.
            </div>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-2">
            <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>2. تحويل بريدي موب BaridiMob (شبه آلي)</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              يقوم الأستاذ أو المدرسة بتحويل قيمة الاشتراك لحسابك البريدي (RIP) عبر تطبيق بريدي موب المعتاد.
            </p>
            <div className="text-[11px] text-blue-800 font-semibold">
              • رفع لقطة شاشة لوصل التحويل وتأكيد الحساب من لوحة المشرف بنقرة واحدة.
            </div>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-2">
            <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>3. فترة تجربة مجانية (30 يوماً للتوسع)</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              امنح شهراً مجانياً لكل أستاذ أو مدرسة تسجل عند إطلاق المنصة في ولايتها لجمع أكبر عدد من الدروس.
            </p>
            <div className="text-[11px] text-amber-800 font-semibold">
              • يضمن دليلاً غنياً بالخيارات للأولياء قبل تفعيل الدفع الإجباري.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
