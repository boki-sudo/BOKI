import React from 'react';
import { Sparkles, CheckCircle2, ArrowLeft, ArrowDown, Database, Cpu, Search, Check, Layers, Smartphone, RefreshCw } from 'lucide-react';
import { ROADMAP_STEPS } from '../data/techStackData';

export const RoadmapView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* بطاقة التقديم */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
            <Sparkles className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900">
              خارطة طريق تنفيذ الفلتر المتسلسل المعقد (Cascading Implementation Roadmap)
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              الخطوات الهندسية الدقيقة لربط العلاقات: ولاية ← بلدية، وطور ← مستوى ← شعبة ثانوية، مع ميزة التحديد المتعدد للأستاذ وسرعة استجابة فائقة.
            </p>
          </div>
        </div>
      </div>

      {/* الخطوات التسلسلية التفصيلية */}
      <div className="space-y-4">
        {ROADMAP_STEPS.map((step) => (
          <div
            key={step.step}
            className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white font-black flex items-center justify-center text-base shrink-0 shadow-sm shadow-emerald-700/20">
                {step.step}
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-stone-900 text-base">
                    {step.title}
                  </h3>
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 font-bold px-2.5 py-0.5 rounded-full">
                    مرحلة {step.step} من 5
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {step.description}
                </p>

                <div className="space-y-1.5 pt-2">
                  {step.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-stone-700 bg-stone-50 border border-stone-200/80 rounded-xl p-3 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* نصائح أداء لشبكات الهاتف الجزائري */}
      <div className="bg-emerald-900 text-emerald-100 rounded-2xl p-6 space-y-3">
        <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-emerald-300" />
          <span>توصيات الأداء لشبكات الهاتف 4G في الجزائر</span>
        </h4>
        <p className="text-xs sm:text-sm leading-relaxed text-emerald-200">
          لتحقيق تجربة مستخدم سلسة وفورية، احرص على تخزين مصفوفات الولايات الـ 58 والبلديات كملفات JSON محلية مدمجة في حزمة التطبيق الأمامية (Client-side bundle). يمنع هذا إجراء طلبات شبكة بطيئة عند كل نقرة لتغيير الولاية، ويضمن استجابة فورية (0ms Latency) حتى لو كان هاتف التلميذ أو الولي متصلاً بشبكة جيل ثالث 3G ضعيفة.
        </p>
      </div>
    </div>
  );
};
