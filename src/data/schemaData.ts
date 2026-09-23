import { DatabaseTable } from '../types';

export const DATABASE_TABLES: DatabaseTable[] = [
  {
    name: 'users',
    description: 'الجدول الرئيسي لإدارة الحسابات وهوية الدخول (التلاميذ والأولياء، الأساتذة، مدراء المدارس، والمشرفين). يدعم الترميز العالمي UTF-8.',
    columns: [
      { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'المعرّف الفريد للمستخدم' },
      { name: 'phone_number', type: 'VARCHAR(20)', constraints: 'UNIQUE NOT NULL', description: 'رقم الهاتف الجزائري بالصيغة الدولية (+213...)' },
      { name: 'email', type: 'VARCHAR(255)', constraints: 'UNIQUE NULL', description: 'البريد الإلكتروني للإشعارات واستعادة الحساب' },
      { name: 'role', type: 'VARCHAR(20)', constraints: "CHECK (role IN ('student', 'teacher', 'school_manager', 'admin'))", description: 'نوع الحساب والصلاحيات في المنصة' },
      { name: 'full_name', type: 'VARCHAR(120)', constraints: 'NOT NULL', description: 'الاسم واللقب باللغة العربية أو اللاتينية' },
      { name: 'avatar_url', type: 'TEXT', constraints: 'NULL', description: 'رابط الصورة الشخصية (مخزنة في Supabase Storage)' },
      { name: 'is_active', type: 'BOOLEAN', constraints: 'DEFAULT true', description: 'حالة تفعيل الحساب' },
      { name: 'created_at', type: 'TIMESTAMPTZ', constraints: 'DEFAULT now()', description: 'تاريخ وتوقيت إنشاء الحساب' },
      { name: 'updated_at', type: 'TIMESTAMPTZ', constraints: 'DEFAULT now()', description: 'تاريخ آخر تحديث للملف' },
    ],
    relationships: [
      { type: '1-to-1', targetTable: 'teachers', description: 'حساب المستخدم برتبة أستاذ يرتبط بملف أستاذ مهني واحد' },
      { type: '1-to-Many', targetTable: 'schools', description: 'حساب مدير المدرسة يمكنه إدارة مدرسة واحدة أو عدة فروع' },
    ],
  },
  {
    name: 'wilayas',
    description: 'جدول الولايات الجزائرية الـ 58 مع الرموز الرسمية والأسماء المعتمدة باللغتين العربية والفرنسية.',
    columns: [
      { name: 'id', type: 'SMALLINT', constraints: 'PRIMARY KEY', description: 'رقم الولاية الرسمي (من 01 إلى 58)' },
      { name: 'code', type: 'VARCHAR(2)', constraints: 'UNIQUE NOT NULL', description: 'رمز الولاية (مثال: "16"، "31")' },
      { name: 'name_ar', type: 'VARCHAR(60)', constraints: 'NOT NULL', description: 'اسم الولاية بالعربية (مثال: "الجزائر"، "وهران")' },
      { name: 'name_fr', type: 'VARCHAR(60)', constraints: 'NOT NULL', description: 'اسم الولاية باللاتينية' },
    ],
    relationships: [
      { type: '1-to-Many', targetTable: 'communes', description: 'الولاية الواحدة تضم مجموعة من الدوائر والبلديات' },
    ],
  },
  {
    name: 'communes',
    description: 'جدول البلديات والدوائر التابعة لكل ولاية لتحديد النطاق الجغرافي الدقيق للبحث.',
    columns: [
      { name: 'id', type: 'INTEGER', constraints: 'PRIMARY KEY', description: 'معرف البلدية (رمز الديوان الوطني للإحصاء ONS)' },
      { name: 'wilaya_id', type: 'SMALLINT', constraints: 'REFERENCES wilayas(id) ON DELETE CASCADE', description: 'مفتاح أجنبي يربط البلدية بولايتها' },
      { name: 'name_ar', type: 'VARCHAR(80)', constraints: 'NOT NULL', description: 'اسم البلدية بالعربية (مثال: "باب الزوار")' },
      { name: 'name_fr', type: 'VARCHAR(80)', constraints: 'NOT NULL', description: 'اسم البلدية بالفرنسية' },
      { name: 'postal_code', type: 'VARCHAR(10)', constraints: 'NULL', description: 'الرمز البريدي للبلدية' },
    ],
    relationships: [
      { type: 'Many-to-1', targetTable: 'wilayas', description: 'كل بلدية تتبع لولاية واحدة فقط' },
      { type: '1-to-Many', targetTable: 'teachers', description: 'موقع سكن أو تدريس الأستاذ المستقل' },
      { type: '1-to-Many', targetTable: 'schools', description: 'الموقع الجغرافي لمقر مدرسة الدعم' },
    ],
  },
  {
    name: 'education_levels',
    description: 'الأطوار والمستويات التعليمية في المنظومة التربوية الجزائرية (الابتدائي، المتوسط BEM، الثانوي BAC).',
    columns: [
      { name: 'id', type: 'VARCHAR(20)', constraints: 'PRIMARY KEY', description: 'رمز المستوى (مثال: "3as", "4am", "5ap")' },
      { name: 'cycle', type: 'VARCHAR(20)', constraints: "CHECK (cycle IN ('primaire', 'moyen', 'secondaire'))", description: 'الطور التعليمي (ابتدائي، متوسط، ثانوي)' },
      { name: 'name_ar', type: 'VARCHAR(100)', constraints: 'NOT NULL', description: 'اسم المستوى بالعربية (مثال: "السنة الرابعة متوسط - شهادة BEM")' },
      { name: 'name_fr', type: 'VARCHAR(100)', constraints: 'NOT NULL', description: 'اسم المستوى بالفرنسية' },
      { name: 'has_streams', type: 'BOOLEAN', constraints: 'DEFAULT false', description: 'قيمة منطقية: صحيح إذا كان المستوى يتفرع إلى شعب تخصصية (2 ثانوي و 3 ثانوي)' },
      { name: 'sort_order', type: 'SMALLINT', constraints: 'NOT NULL', description: 'ترتيب المستوى في القوائم المنسدلة' },
    ],
    relationships: [
      { type: '1-to-Many', targetTable: 'education_streams', description: 'المستوى الثانوي يتفرع إلى عدة شعب تخصصية' },
      { type: '1-to-Many', targetTable: 'teacher_offerings', description: 'ربط المستويات التي يقدم فيها الأستاذ دروسه' },
    ],
  },
  {
    name: 'education_streams',
    description: 'شعب مرحلة التعليم الثانوي الجزائري (علوم تجريبية، رياضيات، تقني رياضي، تسيير واقتصاد، آداب وفلسفة، لغات).',
    columns: [
      { name: 'id', type: 'VARCHAR(30)', constraints: 'PRIMARY KEY', description: 'رمز الشعبة (مثال: "sci-exp", "maths", "gestion-eco")' },
      { name: 'level_id', type: 'VARCHAR(20)', constraints: 'REFERENCES education_levels(id) ON DELETE CASCADE', description: 'المستوى التابع له (2 ثانوي أو 3 ثانوي)' },
      { name: 'name_ar', type: 'VARCHAR(80)', constraints: 'NOT NULL', description: 'اسم الشعبة بالعربية (مثال: "شعبة علوم تجريبية")' },
      { name: 'name_fr', type: 'VARCHAR(80)', constraints: 'NOT NULL', description: 'اسم الشعبة بالفرنسية' },
    ],
    relationships: [
      { type: 'Many-to-1', targetTable: 'education_levels', description: 'الشعبة تابعة لمستوى دراسي ثانوي محدد' },
      { type: '1-to-Many', targetTable: 'teacher_offerings', description: 'تحديد الشعبة التي يدرسها الأستاذ لطلاب البكالوريا' },
    ],
  },
  {
    name: 'subjects',
    description: 'المواد والمقررات الدراسية الرسمية المعتمدة في امتحانات وزارتي التربية والتعليم الجزائرية.',
    columns: [
      { name: 'id', type: 'VARCHAR(30)', constraints: 'PRIMARY KEY', description: 'رمز المادة (مثال: "maths", "physique", "sciences", "philo")' },
      { name: 'name_ar', type: 'VARCHAR(60)', constraints: 'NOT NULL', description: 'اسم المادة بالعربية (مثال: "الرياضيات"، "العلوم الفيزيائية")' },
      { name: 'name_fr', type: 'VARCHAR(60)', constraints: 'NOT NULL', description: 'اسم المادة بالفرنسية' },
      { name: 'category', type: 'VARCHAR(30)', constraints: "DEFAULT 'general'", description: 'تصنيف المادة (علمية، لغات، أدبية، تقنية)' },
    ],
    relationships: [
      { type: '1-to-Many', targetTable: 'teacher_offerings', description: 'المادة ترتبط بعروض الأساتذة' },
      { type: '1-to-Many', targetTable: 'schedules', description: 'المادة المسندة للحصة في جدول التوقيت' },
    ],
  },
  {
    name: 'teachers',
    description: 'الملفات المهنية للأساتذة المستقلين المشتركين في المنصة ومميزاتهم وأسعارهم وأرقام التواصل المباشر.',
    columns: [
      { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'معرف الأستاذ الفريد' },
      { name: 'user_id', type: 'UUID', constraints: 'UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE', description: 'ربط مباشر بحساب المستخدم' },
      { name: 'headline', type: 'VARCHAR(160)', constraints: 'NOT NULL', description: 'العنوان التسويقي (مثال: "أستاذ مكون في مادة الرياضيات - تحضير البكالوريا بامتياز")' },
      { name: 'bio', type: 'TEXT', constraints: 'NULL', description: 'نبذة عن الخبرة والمنهجية المتبعة ونتائج الدفعات السابقة' },
      { name: 'wilaya_id', type: 'SMALLINT', constraints: 'NOT NULL REFERENCES wilayas(id)', description: 'الولاية التي ينشط فيها الأستاذ' },
      { name: 'commune_id', type: 'INTEGER', constraints: 'NOT NULL REFERENCES communes(id)', description: 'البلدية أو الدائرة الرئيسية' },
      { name: 'whatsapp_number', type: 'VARCHAR(20)', constraints: 'NOT NULL', description: 'رقم الواتساب بالصيغة الدولية لبدء محادثة مباشرة' },
      { name: 'phone_number', type: 'VARCHAR(20)', constraints: 'NOT NULL', description: 'رقم الهاتف للاتصال السريع' },
      { name: 'experience_years', type: 'SMALLINT', constraints: 'DEFAULT 0', description: 'عدد سنوات الخبرة في التعليم' },
      { name: 'modes', type: 'TEXT[]', constraints: 'NOT NULL DEFAULT \'{"support_school"}\'', description: 'صيغ تقديم الدروس: بمدرسة دعم، منزل الأستاذ، منزل التلميذ، أو عن بعد' },
      { name: 'hourly_rate_dzd', type: 'INTEGER', constraints: 'NULL', description: 'سعر الساعة الفردية بالدينار الجزائري (DZD)' },
      { name: 'monthly_group_rate_dzd', type: 'INTEGER', constraints: 'NULL', description: 'سعر الاشتراك الشهري للفوج بالدينار الجزائري' },
      { name: 'is_verified', type: 'BOOLEAN', constraints: 'DEFAULT false', description: 'شارة التوثيق والتحقق من الهوية المهنية' },
      { name: 'subscription_status', type: 'VARCHAR(20)', constraints: "DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'expired', 'canceled'))", description: 'حالة اشتراك الأستاذ (تجريبي 30 يوم، مفعل، منتهي)' },
      { name: 'subscription_expires_at', type: 'TIMESTAMPTZ', constraints: 'NULL', description: 'تاريخ انتهاء صلاحية الاشتراك الشهري/السنوي' },
    ],
    relationships: [
      { type: '1-to-1', targetTable: 'users', description: 'ملف الأستاذ مرتبط بحساب مستخدم وحيد' },
      { type: 'Many-to-1', targetTable: 'wilayas', description: 'ولاية النشاط' },
      { type: 'Many-to-1', targetTable: 'communes', description: 'بلدية النشاط' },
      { type: '1-to-Many', targetTable: 'teacher_offerings', description: 'قائمة المواد والمستويات المتعددة التي يقدمها الأستاذ' },
      { type: 'Many-to-Many', targetTable: 'schools', description: 'المدارس الخاصة التي يتعاقد معها الأستاذ عبر جدول school_teachers' },
      { type: '1-to-Many', targetTable: 'schedules', description: 'الحصص ومواعيد الأفواج الأسبوعية' },
    ],
  },
  {
    name: 'teacher_offerings',
    description: 'الجدول الوسيط الجوهري المسؤول عن ميزة "التحديد المتعدد" (Multi-selection)، حيث يتيح للأستاذ تدريس مواد ومستويات وشعب مختلفة في آن واحد.',
    columns: [
      { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'معرف السجل الفريد' },
      { name: 'teacher_id', type: 'UUID', constraints: 'NOT NULL REFERENCES teachers(id) ON DELETE CASCADE', description: 'معرف الأستاذ المعني' },
      { name: 'level_id', type: 'VARCHAR(20)', constraints: 'NOT NULL REFERENCES education_levels(id) ON DELETE CASCADE', description: 'المستوى الدراسي المحدد' },
      { name: 'stream_id', type: 'VARCHAR(30)', constraints: 'NULL REFERENCES education_streams(id) ON DELETE CASCADE', description: 'الشعبة الثانوية (فارغة في الابتدائي والمتوسط)' },
      { name: 'subject_id', type: 'VARCHAR(30)', constraints: 'NOT NULL REFERENCES subjects(id) ON DELETE CASCADE', description: 'المادة الدراسية المسندة' },
    ],
    relationships: [
      { type: 'Many-to-1', targetTable: 'teachers', description: 'ربط السجل بالأستاذ' },
      { type: 'Many-to-1', targetTable: 'education_levels', description: 'ربط السجل بالمستوى' },
      { type: 'Many-to-1', targetTable: 'education_streams', description: 'ربط السجل بالشعبة' },
      { type: 'Many-to-1', targetTable: 'subjects', description: 'ربط السجل بالمادة' },
    ],
  },
  {
    name: 'schools',
    description: 'مدارس ومراكز الدعم واللغات الخاصة المشتركة في الباقة المتميزة (VIP)، مع تفاصيل الفروع والتجهيزات والموقع الجغرافي.',
    columns: [
      { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'المعرف الفريد للمدرسة' },
      { name: 'manager_user_id', type: 'UUID', constraints: 'NOT NULL REFERENCES users(id) ON DELETE RESTRICT', description: 'معرف مدير المدرسة المسؤول' },
      { name: 'name', type: 'VARCHAR(140)', constraints: 'NOT NULL', description: 'الاسم التجاري للمدرسة (مثال: "مدرسة النجاح لدروس الدعم واللغات")' },
      { name: 'slug', type: 'VARCHAR(140)', constraints: 'UNIQUE NOT NULL', description: 'الرابط المخصص لصفحة المدرسة على المنصة' },
      { name: 'wilaya_id', type: 'SMALLINT', constraints: 'NOT NULL REFERENCES wilayas(id)', description: 'الولاية المتواجد بها المقر' },
      { name: 'commune_id', type: 'INTEGER', constraints: 'NOT NULL REFERENCES communes(id)', description: 'البلدية المتواجد بها المقر' },
      { name: 'address_line', type: 'TEXT', constraints: 'NOT NULL', description: 'العنوان التفصيلي للمقر ومكتب الاستقبال' },
      { name: 'latitude', type: 'DECIMAL(10, 8)', constraints: 'NULL', description: 'الإحداثيات الجغرافية على الخريطة (خط العرض)' },
      { name: 'longitude', type: 'DECIMAL(11, 8)', constraints: 'NULL', description: 'الإحداثيات الجغرافية على الخريطة (خط الطول)' },
      { name: 'phone_number', type: 'VARCHAR(30)', constraints: 'NOT NULL', description: 'هاتف الاستقبال والتسجيلات' },
      { name: 'whatsapp_number', type: 'VARCHAR(30)', constraints: 'NULL', description: 'رقم الواتساب الرسمي للمدرسة' },
      { name: 'logo_url', type: 'TEXT', constraints: 'NULL', description: 'شعار المدرسة' },
      { name: 'facilities', type: 'TEXT[]', constraints: "DEFAULT '{\"قاعات مكيفة\",\"أجهزة عرض\",\"أفواج نموذجية\"}'", description: 'المرافق والتجهيزات المتوفرة' },
      { name: 'is_verified', type: 'BOOLEAN', constraints: 'DEFAULT false', description: 'شارة التحقق من الاعتماد القانوني' },
      { name: 'subscription_tier', type: 'VARCHAR(20)', constraints: "DEFAULT 'vip' CHECK (subscription_tier IN ('standard', 'vip'))", description: 'درجة باقة الاشتراك للمدرسة' },
    ],
    relationships: [
      { type: 'Many-to-1', targetTable: 'users', description: 'مدير المؤسسة المشرف عليها' },
      { type: 'Many-to-1', targetTable: 'wilayas', description: 'ولاية التواجد' },
      { type: 'Many-to-1', targetTable: 'communes', description: 'بلدية التواجد' },
      { type: 'Many-to-Many', targetTable: 'teachers', description: 'الأساتذة التابعون للمدرسة عبر جدول school_teachers' },
      { type: '1-to-Many', targetTable: 'schedules', description: 'التوقيت الأسبوعي للقاعات والأفواج' },
    ],
  },
  {
    name: 'school_teachers',
    description: 'جدول ربط الأساتذة بالمدارس (علاقة متعدد لمتعدد Many-to-Many)؛ يتيح للمدرسة إضافة أساتذة تابعين لها.',
    columns: [
      { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'معرف الربط' },
      { name: 'school_id', type: 'UUID', constraints: 'NOT NULL REFERENCES schools(id) ON DELETE CASCADE', description: 'معرف المدرسة المستضيفة' },
      { name: 'teacher_id', type: 'UUID', constraints: 'NOT NULL REFERENCES teachers(id) ON DELETE CASCADE', description: 'معرف الأستاذ المتعاقد' },
      { name: 'status', type: 'VARCHAR(20)', constraints: "DEFAULT 'active' CHECK (status IN ('invited', 'active', 'declined', 'archived'))", description: 'حالة التعاقد والاعتماد في المدرسة' },
      { name: 'joined_at', type: 'TIMESTAMPTZ', constraints: 'DEFAULT now()', description: 'تاريخ انضمام الأستاذ للمؤسسة' },
    ],
    relationships: [
      { type: 'Many-to-1', targetTable: 'schools', description: 'المدرسة المعنية' },
      { type: 'Many-to-1', targetTable: 'teachers', description: 'الأستاذ المتعاقد' },
    ],
  },
  {
    name: 'schedules',
    description: 'جدول المواعيد والحصص الأسبوعية (أيام الجمعة، السبت وباقي الأسبوع) سواء للأستاذ المستقل أو داخل قاعات المدرسة.',
    columns: [
      { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'معرف الحصة الفريد' },
      { name: 'school_id', type: 'UUID', constraints: 'NULL REFERENCES schools(id) ON DELETE CASCADE', description: 'معرف المدرسة إذا كانت الحصة بمقرها، أو NULL إذا كان مستقلاً' },
      { name: 'teacher_id', type: 'UUID', constraints: 'NOT NULL REFERENCES teachers(id) ON DELETE CASCADE', description: 'معرف الأستاذ المؤطر للحصة' },
      { name: 'subject_id', type: 'VARCHAR(30)', constraints: 'NOT NULL REFERENCES subjects(id)', description: 'المادة المقررة' },
      { name: 'level_id', type: 'VARCHAR(20)', constraints: 'NOT NULL REFERENCES education_levels(id)', description: 'المستوى المستهدف' },
      { name: 'stream_id', type: 'VARCHAR(30)', constraints: 'NULL REFERENCES education_streams(id)', description: 'الشعبة الثانوية المستهدفة' },
      { name: 'day_of_week', type: 'SMALLINT', constraints: 'NOT NULL CHECK (day_of_week BETWEEN 0 AND 6)', description: 'يوم الأسبوع (5 للجمعة، 6 للسبت - أيام الذروة في الجزائر)' },
      { name: 'start_time', type: 'TIME', constraints: 'NOT NULL', description: 'توقيت انطلاق الحصة' },
      { name: 'end_time', type: 'TIME', constraints: 'NOT NULL', description: 'توقيت انتهاء الحصة' },
      { name: 'room_name', type: 'VARCHAR(60)', constraints: 'NULL', description: 'اسم أو رقم القاعة داخل المدرسة' },
      { name: 'session_type', type: 'VARCHAR(30)', constraints: "NOT NULL CHECK (session_type IN ('group', 'individual', 'intensive_bac'))", description: 'طبيعة الفوج (فوج عادي، فردي خاص، مراجعة مكثفة للبكالوريا)' },
      { name: 'monthly_price_dzd', type: 'INTEGER', constraints: 'NOT NULL', description: 'سعر الاشتراك الشهري للحصة بالدينار الجزائري (DZD)' },
      { name: 'is_active', type: 'BOOLEAN', constraints: 'DEFAULT true', description: 'حالة الحصة (متاحة للتسجيل أو مكتملة)' },
    ],
    relationships: [
      { type: 'Many-to-1', targetTable: 'teachers', description: 'أستاذ المادة' },
      { type: 'Many-to-1', targetTable: 'schools', description: 'المدرسة المستضيفة (اختياري)' },
      { type: 'Many-to-1', targetTable: 'subjects', description: 'المادة التعليمية' },
    ],
  },
];

export const SQL_DDL_POSTGRES = `-- =================================================================
-- منصة أستاذي (Ostadhi) - مخطط قاعدة البيانات الشامل (PostgreSQL 3NF)
-- متوافق بالكامل مع Supabase مع دعم الترميز العالمي UTF-8 للغة العربية
-- =================================================================

-- 1. تفعيل الملحقات الضرورية
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. جدول المستخدمين الموحد (Users)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'teacher', 'school_manager', 'admin')),
    full_name VARCHAR(120) NOT NULL,
    avatar_url TEXT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. الجداول المرجعية الجغرافية (58 ولاية والبلديات التابعة لها)
CREATE TABLE IF NOT EXISTS wilayas (
    id SMALLINT PRIMARY KEY,
    code VARCHAR(2) NOT NULL UNIQUE,
    name_ar VARCHAR(60) NOT NULL,
    name_fr VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS communes (
    id INTEGER PRIMARY KEY,
    wilaya_id SMALLINT NOT NULL REFERENCES wilayas(id) ON DELETE CASCADE,
    name_ar VARCHAR(80) NOT NULL,
    name_fr VARCHAR(80) NOT NULL,
    postal_code VARCHAR(10) NULL
);
CREATE INDEX IF NOT EXISTS idx_communes_wilaya ON communes(wilaya_id);

-- 4. جداول المنظومة التربوية (الأطوار، المستويات، الشعب، والمواد)
CREATE TABLE IF NOT EXISTS education_levels (
    id VARCHAR(20) PRIMARY KEY,
    cycle VARCHAR(20) NOT NULL CHECK (cycle IN ('primaire', 'moyen', 'secondaire')),
    order_index SMALLINT NOT NULL,
    name_ar VARCHAR(100) NOT NULL,
    name_fr VARCHAR(100) NOT NULL,
    has_streams BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS education_streams (
    id VARCHAR(30) PRIMARY KEY,
    level_id VARCHAR(20) NOT NULL REFERENCES education_levels(id) ON DELETE CASCADE,
    name_ar VARCHAR(80) NOT NULL,
    name_fr VARCHAR(80) NOT NULL
);

CREATE TABLE IF NOT EXISTS subjects (
    id VARCHAR(30) PRIMARY KEY,
    name_ar VARCHAR(60) NOT NULL,
    name_fr VARCHAR(60) NOT NULL,
    category VARCHAR(30) DEFAULT 'general'
);

-- 5. جدول الأساتذة المستقلين (Teachers)
CREATE TABLE IF NOT EXISTS teachers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    headline VARCHAR(160) NOT NULL,
    bio TEXT NULL,
    wilaya_id SMALLINT NOT NULL REFERENCES wilayas(id),
    commune_id INTEGER NOT NULL REFERENCES communes(id),
    whatsapp_number VARCHAR(20) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    experience_years SMALLINT DEFAULT 1,
    modes TEXT[] NOT NULL DEFAULT '{"support_school"}',
    hourly_rate_dzd INTEGER NULL,
    monthly_group_rate_dzd INTEGER NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    subscription_status VARCHAR(20) DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'expired', 'canceled')),
    subscription_expires_at TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_teachers_location ON teachers(wilaya_id, commune_id);
CREATE INDEX IF NOT EXISTS idx_teachers_modes ON teachers USING GIN(modes);

-- 6. جدول التحديد المتعدد للمواد والمستويات (Multi-Selection Offerings)
CREATE TABLE IF NOT EXISTS teacher_offerings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
    level_id VARCHAR(20) NOT NULL REFERENCES education_levels(id) ON DELETE CASCADE,
    stream_id VARCHAR(30) NULL REFERENCES education_streams(id) ON DELETE CASCADE,
    subject_id VARCHAR(30) NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uq_teacher_offering UNIQUE (teacher_id, level_id, stream_id, subject_id)
);
CREATE INDEX IF NOT EXISTS idx_offerings_lookup ON teacher_offerings(level_id, subject_id, stream_id);

-- 7. جدول مدارس الدعم الخاصة (Schools - باقة VIP)
CREATE TABLE IF NOT EXISTS schools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    manager_user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    name VARCHAR(140) NOT NULL,
    slug VARCHAR(140) UNIQUE NOT NULL,
    wilaya_id SMALLINT NOT NULL REFERENCES wilayas(id),
    commune_id INTEGER NOT NULL REFERENCES communes(id),
    address_line TEXT NOT NULL,
    latitude DECIMAL(10, 8) NULL,
    longitude DECIMAL(11, 8) NULL,
    phone_number VARCHAR(30) NOT NULL,
    whatsapp_number VARCHAR(30) NULL,
    logo_url TEXT NULL,
    facilities TEXT[] DEFAULT '{"قاعات مكيفة", "أفواج نموذجية", "أجهزة عرض"}',
    is_verified BOOLEAN DEFAULT FALSE,
    subscription_tier VARCHAR(20) DEFAULT 'vip' CHECK (subscription_tier IN ('standard', 'vip')),
    subscription_expires_at TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_schools_location ON schools(wilaya_id, commune_id);

-- 8. ربط الأساتذة بالمدارس (School Teachers - Many-to-Many)
CREATE TABLE IF NOT EXISTS school_teachers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('invited', 'active', 'declined', 'archived')),
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uq_school_teacher UNIQUE (school_id, teacher_id)
);

-- 9. جدول جدول التوقيت والحصص الأسبوعية (Schedules)
CREATE TABLE IF NOT EXISTS schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NULL REFERENCES schools(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
    subject_id VARCHAR(30) NOT NULL REFERENCES subjects(id),
    level_id VARCHAR(20) NOT NULL REFERENCES education_levels(id),
    stream_id VARCHAR(30) NULL REFERENCES education_streams(id),
    day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room_name VARCHAR(60) NULL,
    session_type VARCHAR(30) NOT NULL CHECK (session_type IN ('group', 'individual', 'intensive_bac')),
    monthly_price_dzd INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_schedules_lookup ON schedules(teacher_id, school_id, subject_id, level_id);
`;
