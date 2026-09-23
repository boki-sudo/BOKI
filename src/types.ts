export type UserRole = 'student' | 'teacher' | 'school_manager' | 'admin';

export interface Wilaya {
  id: number;
  code: string;
  name_fr: string;
  name_ar: string;
}

export interface Commune {
  id: number;
  wilaya_id: number;
  name_fr: string;
  name_ar: string;
}

export type EducationCycle = 'primaire' | 'moyen' | 'secondaire';

export interface EducationLevel {
  id: string;
  cycle: EducationCycle;
  name_fr: string;
  name_ar: string;
  short_code: string;
  has_streams?: boolean;
}

export interface EducationStream {
  id: string;
  level_id: string;
  name_fr: string;
  name_ar: string;
}

export interface Subject {
  id: string;
  name_fr: string;
  name_ar: string;
  category: 'scientifique' | 'litteraire' | 'langue' | 'autre';
  cycles: EducationCycle[];
}

export type TeachingMode = 'in_person_teacher' | 'in_person_home' | 'support_school' | 'online';

export interface WeeklySlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subjectId: string;
  levelId: string;
  streamId?: string;
  sessionType?: string;
  priceDZD?: number;
  teacherName?: string;
  room?: string;
  monthlyPriceDZD?: number;
}

export interface TeacherProfile {
  id: string;
  fullName: string;
  headline: string;
  bio: string;
  avatarUrl: string;
  wilayaId: number;
  communeId: number;
  phone: string;
  whatsapp: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  modes: TeachingMode[];
  isVerified: boolean;
  isPaidSubscriber: boolean;
  subjectIds: string[];
  levelIds: string[];
  streamIds?: string[];
  hourlyRateDZD: number;
  monthlyGroupRateDZD: number;
  schedule: WeeklySlot[];
  affiliateSchoolId?: string;
}

export interface SchoolProfile {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logoUrl: string;
  coverUrl?: string;
  wilayaId: number;
  communeId: number;
  address: string;
  phone: string;
  whatsapp: string;
  rating?: number;
  reviewCount?: number;
  isVerified: boolean;
  isVipSubscriber?: boolean;
  subscriptionTier?: 'standard' | 'vip' | 'premium';
  facilities: string[];
  affiliatedTeacherIds?: string[];
  subjectIds: string[];
  levelIds: string[];
  weeklySchedule?: WeeklySlot[];
  schedule?: WeeklySlot[];
}

export interface SearchFilterState {
  wilayaId: number | null;
  communeId: number | null;
  cycle: EducationCycle | null;
  levelId: string | null;
  streamId: string | null;
  subjectId: string | null;
  mode: TeachingMode | null;
  profileType: 'all' | 'teacher' | 'school';
  searchQuery: string;
}

export interface DatabaseTable {
  name: string;
  description: string;
  columns: {
    name: string;
    type: string;
    constraints: string;
    description: string;
  }[];
  relationships: {
    type: '1-to-1' | '1-to-Many' | 'Many-to-1' | 'Many-to-Many';
    targetTable: string;
    description: string;
  }[];
}
