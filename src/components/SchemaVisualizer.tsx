import React, { useState } from 'react';
import { Database, Key, Table, Copy, Check, Info, ArrowLeft, Shield, Layers, FileCode, CheckCircle2 } from 'lucide-react';
import { DATABASE_TABLES, SQL_DDL_POSTGRES } from '../data/schemaData';

export const SchemaVisualizer: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<string>('teachers');
  const [copied, setCopied] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'tables' | 'sql' | 'erd'>('tables');

  const currentTable = DATABASE_TABLES.find((t) => t.name === selectedTable) || DATABASE_TABLES[0];

  const handleCopySQL = () => {
    navigator.clipboard.writeText(SQL_DDL_POSTGRES);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* بطاقة التقديم */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                <Database className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-stone-900">
                  مخطط قاعدة البيانات العلائقية (PostgreSQL / Supabase 3NF)
                </h2>
                <p className="text-xs sm:text-sm text-stone-500">
                  بنية معيارية مصممة للأساتذة المستقلين، مدارس الدعم، التقسيم الجغرافي الجزائري، وشعب البكالوريا مع دعم كامل لترميز UTF-8.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-stone-100 p-1 rounded-xl flex items-center text-xs border border-stone-200">
              <button
                onClick={() => setViewMode('tables')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  viewMode === 'tables'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                تفاصيل الجداول
              </button>
              <button
                onClick={() => setViewMode('erd')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  viewMode === 'erd'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                مخطط العلاقات (ERD)
              </button>
              <button
                onClick={() => setViewMode('sql')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  viewMode === 'sql'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                كود SQL DDL
              </button>
            </div>

            <button
              onClick={handleCopySQL}
              className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم النسخ!' : 'نسخ كود SQL'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* المنظر 1: تفاصيل الجداول والأعمدة */}
      {viewMode === 'tables' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* قائمة الجداول الجانبية */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 p-3 shadow-xs space-y-1">
            <span className="px-3 py-1 text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
              جداول قاعدة البيانات ({DATABASE_TABLES.length})
            </span>
            {DATABASE_TABLES.map((table) => {
              const isSelected = table.name === selectedTable;
              return (
                <button
                  key={table.name}
                  onClick={() => setSelectedTable(table.name)}
                  className={`w-full text-right p-3 rounded-xl transition-all flex items-center justify-between text-xs font-bold ${
                    isSelected
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 shadow-xs'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Table className={`w-4 h-4 ${isSelected ? 'text-emerald-700' : 'text-stone-400'}`} />
                    <span className="font-mono">{table.name}</span>
                  </div>
                  <span className="text-[10px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full font-sans">
                    {table.columns.length} أعمدة
                  </span>
                </button>
              );
            })}
          </div>

          {/* محتوى الجدول المختار */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
            <div className="border-b border-stone-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg font-bold text-stone-900 bg-stone-100 px-2.5 py-1 rounded-lg">
                  {currentTable.name}
                </span>
                <span className="text-xs text-stone-500">جدول علائقي في Supabase</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {currentTable.description}
              </p>
            </div>

            {/* جدول الأعمدة والقيود */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-600" />
                <span>الأعمدة والأنماط والقيود (Columns & Constraints)</span>
              </h4>

              <div className="overflow-x-auto border border-stone-200 rounded-xl">
                <table className="w-full text-right text-xs">
                  <thead className="bg-stone-50 text-stone-600 font-bold border-b border-stone-200">
                    <tr>
                      <th className="py-2.5 px-3">اسم العمود (Column)</th>
                      <th className="py-2.5 px-3">النوع (Type)</th>
                      <th className="py-2.5 px-3">القيود (Constraints)</th>
                      <th className="py-2.5 px-3">الوصف والدور الوظيفي</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-sans">
                    {currentTable.columns.map((col) => (
                      <tr key={col.name} className="hover:bg-stone-50/50">
                        <td className="py-2.5 px-3 font-mono font-bold text-stone-900 text-left sm:text-right" dir="ltr">
                          {col.name}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-emerald-800 text-[11px] font-semibold text-left sm:text-right" dir="ltr">
                          {col.type}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-stone-500 text-[10px] text-left sm:text-right" dir="ltr">
                          {col.constraints}
                        </td>
                        <td className="py-2.5 px-3 text-stone-600 text-xs">
                          {col.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* العلاقات والمفاتيح الخارجية */}
            {currentTable.relationships.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                  <span>الروابط والمفاتيح الخارجية (Relationships)</span>
                </h4>

                <div className="space-y-2">
                  {currentTable.relationships.map((rel, idx) => (
                    <div
                      key={idx}
                      className="text-xs bg-stone-50 border border-stone-200 rounded-xl p-3 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md font-mono text-[11px]">
                          {rel.type}
                        </span>
                        <span className="text-stone-500">مع الجدول :</span>
                        <span className="font-mono font-bold text-stone-900 bg-stone-200 px-2 py-0.5 rounded-md">
                          {rel.targetTable}
                        </span>
                      </div>
                      <span className="text-stone-600 text-[11px]">{rel.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* المنظر 2: مخطط العلاقات البصري (ERD) */}
      {viewMode === 'erd' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="font-bold text-base text-stone-900">
              المخطط المعماري للعلاقات (Entity-Relationship Diagram)
            </h3>
            <p className="text-xs text-stone-500">
              رسم بياني يوضح كيفية ترابط الأساتذة والمدارس مع المنظومة التربوية دون أي تكرار للمعلومات.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DATABASE_TABLES.map((tbl) => (
              <div
                key={tbl.name}
                className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <span className="font-mono font-bold text-sm text-stone-900">
                    {tbl.name}
                  </span>
                  <span className="text-[10px] text-stone-500">
                    {tbl.columns.length} حقول
                  </span>
                </div>

                <div className="space-y-1">
                  {tbl.columns.slice(0, 5).map((c) => (
                    <div key={c.name} className="flex justify-between text-[11px]">
                      <span className="font-mono text-stone-700">{c.name}</span>
                      <span className="font-mono text-stone-400 text-[10px]">{c.type}</span>
                    </div>
                  ))}
                  {tbl.columns.length > 5 && (
                    <div className="text-[10px] text-emerald-700 font-semibold pt-1">
                      + {tbl.columns.length - 5} حقول إضافية...
                    </div>
                  )}
                </div>

                {tbl.relationships.length > 0 && (
                  <div className="pt-2 border-t border-stone-200 text-[10px] space-y-1 text-stone-500">
                    {tbl.relationships.map((r, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <span className="text-emerald-700 font-bold font-mono">[{r.type}]</span>
                        <ArrowLeft className="w-3 h-3 text-stone-400" />
                        <span className="font-mono text-stone-800 font-semibold">{r.targetTable}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* المنظر 3: كود SQL DDL */}
      {viewMode === 'sql' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <FileCode className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-stone-900 text-base">
                ملف SQL DDL جاهز للتشغيل في Supabase SQL Editor
              </h3>
            </div>

            <button
              onClick={handleCopySQL}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم النسخ!' : 'نسخ الكود'}</span>
            </button>
          </div>

          <div className="bg-stone-900 rounded-xl p-4 text-emerald-400 font-mono text-xs overflow-x-auto text-left" dir="ltr">
            <pre className="leading-relaxed">{SQL_DDL_POSTGRES}</pre>
          </div>
        </div>
      )}
    </div>
  );
};
