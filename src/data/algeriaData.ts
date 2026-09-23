import { Wilaya, Commune, EducationLevel, EducationStream, Subject } from '../types';

export const WILAYAS: Wilaya[] = [
  { id: 16, code: '16', name_fr: 'Alger', name_ar: 'الجزائر' },
  { id: 31, code: '31', name_fr: 'Oran', name_ar: 'وهران' },
  { id: 25, code: '25', name_fr: 'Constantine', name_ar: 'قسنطينة' },
  { id: 19, code: '19', name_fr: 'Sétif', name_ar: 'سطيف' },
  { id: 9, code: '09', name_fr: 'Blida', name_ar: 'البليدة' },
  { id: 15, code: '15', name_fr: 'Tizi Ouzou', name_ar: 'تيزي وزو' },
  { id: 23, code: '23', name_fr: 'Annaba', name_ar: 'عنابة' },
  { id: 5, code: '05', name_fr: 'Batna', name_ar: 'باتنة' },
  { id: 6, code: '06', name_fr: 'Béjaïa', name_ar: 'بجاية' },
  { id: 13, code: '13', name_fr: 'Tlemcen', name_ar: 'تلمسان' },
];

export const COMMUNES: Commune[] = [
  // Alger (16)
  { id: 1601, wilaya_id: 16, name_fr: 'Bab Ezzouar', name_ar: 'باب الزوار' },
  { id: 1602, wilaya_id: 16, name_fr: 'Kouba', name_ar: 'القبة' },
  { id: 1603, wilaya_id: 16, name_fr: 'Hydra', name_ar: 'حيدرة' },
  { id: 1604, wilaya_id: 16, name_fr: 'Alger Centre', name_ar: 'الجزائر الوسطى' },
  { id: 1605, wilaya_id: 16, name_fr: 'Dely Ibrahim', name_ar: 'دالي براهيم' },
  { id: 1606, wilaya_id: 16, name_fr: 'Chéraga', name_ar: 'الشراقة' },
  { id: 1607, wilaya_id: 16, name_fr: 'Bordj El Kiffan', name_ar: 'برج الكيفان' },
  { id: 1608, wilaya_id: 16, name_fr: 'Bir Mourad Raïs', name_ar: 'بئر مراد رايس' },

  // Oran (31)
  { id: 3101, wilaya_id: 31, name_fr: 'Oran Centre', name_ar: 'وهران المركز' },
  { id: 3102, wilaya_id: 31, name_fr: 'Es Sénia', name_ar: 'السانية' },
  { id: 3103, wilaya_id: 31, name_fr: 'Bir El Djir', name_ar: 'بئر الجير' },
  { id: 3104, wilaya_id: 31, name_fr: 'Arzew', name_ar: 'أرزيو' },

  // Constantine (25)
  { id: 2501, wilaya_id: 25, name_fr: 'Constantine Centre', name_ar: 'قسنطينة المركز' },
  { id: 2502, wilaya_id: 25, name_fr: 'El Khroub', name_ar: 'الخروب' },
  { id: 2503, wilaya_id: 25, name_fr: 'Ali Mendjeli (Nouvelle Ville)', name_ar: 'علي منجلي' },

  // Sétif (19)
  { id: 1901, wilaya_id: 19, name_fr: 'Sétif Ville', name_ar: 'مدينة سطيف' },
  { id: 1902, wilaya_id: 19, name_fr: 'El Eulma', name_ar: 'العلمة' },
  { id: 1903, wilaya_id: 19, name_fr: 'Aïn Oulmene', name_ar: 'عين ولمان' },

  // Blida (09)
  { id: 901, wilaya_id: 9, name_fr: 'Blida Centre', name_ar: 'البليدة المركز' },
  { id: 902, wilaya_id: 9, name_fr: 'Boufarik', name_ar: 'بوفاريك' },
  { id: 903, wilaya_id: 9, name_fr: 'Ouled Yaïch', name_ar: 'أولاد يعيش' },

  // Tizi Ouzou (15)
  { id: 1501, wilaya_id: 15, name_fr: 'Tizi Ouzou Ville', name_ar: 'تيزي وزو المدينة' },
  { id: 1502, wilaya_id: 15, name_fr: 'Draa Ben Khedda', name_ar: 'ذراع بن خدة' },

  // Annaba (23)
  { id: 2301, wilaya_id: 23, name_fr: 'Annaba Centre', name_ar: 'عنابة المركز' },
  { id: 2302, wilaya_id: 23, name_fr: 'El Bouni', name_ar: 'البوني' },

  // Batna (05)
  { id: 501, wilaya_id: 5, name_fr: 'Batna Centre', name_ar: 'باتنة المركز' },
  { id: 502, wilaya_id: 5, name_fr: 'Barika', name_ar: 'بريكة' },

  // Béjaïa (06)
  { id: 601, wilaya_id: 6, name_fr: 'Béjaïa Ville', name_ar: 'بجاية المدينة' },
  { id: 602, wilaya_id: 6, name_fr: 'Akbou', name_ar: 'أقبو' },

  // Tlemcen (13)
  { id: 1301, wilaya_id: 13, name_fr: 'Tlemcen Centre', name_ar: 'تلمسان المركز' },
  { id: 1302, wilaya_id: 13, name_fr: 'Mansourah', name_ar: 'منصورة' },
];

export const EDUCATION_LEVELS: EducationLevel[] = [
  // Primaire
  { id: '1ap', cycle: 'primaire', name_fr: '1ère Année Primaire (1AP)', name_ar: 'السنة الأولى ابتدائي', short_code: '1AP' },
  { id: '2ap', cycle: 'primaire', name_fr: '2ème Année Primaire (2AP)', name_ar: 'السنة الثانية ابتدائي', short_code: '2AP' },
  { id: '3ap', cycle: 'primaire', name_fr: '3ème Année Primaire (3AP)', name_ar: 'السنة الثالثة ابتدائي', short_code: '3AP' },
  { id: '4ap', cycle: 'primaire', name_fr: '4ème Année Primaire (4AP)', name_ar: 'السنة الرابعة ابتدائي', short_code: '4AP' },
  { id: '5ap', cycle: 'primaire', name_fr: '5ème Année Primaire (Examen 5AP)', name_ar: 'السنة الخامسة ابتدائي', short_code: '5AP' },

  // Moyen / CEM
  { id: '1am', cycle: 'moyen', name_fr: '1ère Année Moyenne (1AM)', name_ar: 'السنة الأولى متوسط', short_code: '1AM' },
  { id: '2am', cycle: 'moyen', name_fr: '2ème Année Moyenne (2AM)', name_ar: 'السنة الثانية متوسط', short_code: '2AM' },
  { id: '3am', cycle: 'moyen', name_fr: '3ème Année Moyenne (3AM)', name_ar: 'السنة الثالثة متوسط', short_code: '3AM' },
  { id: '4am', cycle: 'moyen', name_fr: '4ème Année Moyenne (Brevet BEM)', name_ar: 'السنة الرابعة متوسط (شهادة BEM)', short_code: '4AM / BEM' },

  // Secondaire / Lycée
  { id: '1as', cycle: 'secondaire', name_fr: '1ère Année Secondaire (Tronc Commun)', name_ar: 'السنة الأولى ثانوي (جذع مشترك)', short_code: '1AS', has_streams: true },
  { id: '2as', cycle: 'secondaire', name_fr: '2ème Année Secondaire (2AS)', name_ar: 'السنة الثانية ثانوي', short_code: '2AS', has_streams: true },
  { id: '3as', cycle: 'secondaire', name_fr: '3ème Année Secondaire (Baccalauréat BAC)', name_ar: 'السنة الثالثة ثانوي (شهادة البكالوريا)', short_code: '3AS / BAC', has_streams: true },
];

export const EDUCATION_STREAMS: EducationStream[] = [
  // 1AS Troncs communs
  { id: '1as-st', level_id: '1as', name_fr: 'Tronc Commun Sciences & Technologies', name_ar: 'جذع مشترك علوم وتكنولوجيا' },
  { id: '1as-l', level_id: '1as', name_fr: 'Tronc Commun Lettres', name_ar: 'جذع مشترك آداب' },

  // 2AS & 3AS Filières
  { id: 'sci-exp', level_id: '3as', name_fr: 'Sciences Expérimentales', name_ar: 'علوم تجريبية' },
  { id: 'maths', level_id: '3as', name_fr: 'Mathématiques (Maths)', name_ar: 'رياضيات' },
  { id: 'technique-math', level_id: '3as', name_fr: 'Technique Mathématique', name_ar: 'تقني رياضي' },
  { id: 'gestion-eco', level_id: '3as', name_fr: 'Gestion & Économie', name_ar: 'تسيير واقتصاد' },
  { id: 'lettres-philo', level_id: '3as', name_fr: 'Lettres & Philosophie', name_ar: 'آداب وفلسفة' },
  { id: 'langues-etrangeres', level_id: '3as', name_fr: 'Langues Étrangères', name_ar: 'لغات أجنبية' },

  // Same streams also applicable for 2AS
  { id: 'sci-exp-2', level_id: '2as', name_fr: 'Sciences Expérimentales', name_ar: 'علوم تجريبية' },
  { id: 'maths-2', level_id: '2as', name_fr: 'Mathématiques', name_ar: 'رياضيات' },
  { id: 'technique-math-2', level_id: '2as', name_fr: 'Technique Mathématique', name_ar: 'تقني رياضي' },
  { id: 'gestion-eco-2', level_id: '2as', name_fr: 'Gestion & Économie', name_ar: 'تسيير واقتصاد' },
  { id: 'lettres-philo-2', level_id: '2as', name_fr: 'Lettres & Philosophie', name_ar: 'آداب وفلسفة' },
  { id: 'langues-etrangeres-2', level_id: '2as', name_fr: 'Langues Étrangères', name_ar: 'لغات أجنبية' },
];

export const SUBJECTS: Subject[] = [
  { id: 'maths', name_fr: 'Mathématiques', name_ar: 'الرياضيات', category: 'scientifique', cycles: ['primaire', 'moyen', 'secondaire'] },
  { id: 'physique', name_fr: 'Physique-Chimie', name_ar: 'العلوم الفيزيائية', category: 'scientifique', cycles: ['moyen', 'secondaire'] },
  { id: 'sciences', name_fr: 'Sciences de la Nature et de la Vie', name_ar: 'علوم الطبيعة والحياة', category: 'scientifique', cycles: ['moyen', 'secondaire'] },
  { id: 'arabe', name_fr: 'Langue Arabe', name_ar: 'اللغة العربية', category: 'litteraire', cycles: ['primaire', 'moyen', 'secondaire'] },
  { id: 'francais', name_fr: 'Français', name_ar: 'اللغة الفرنسية', category: 'langue', cycles: ['primaire', 'moyen', 'secondaire'] },
  { id: 'anglais', name_fr: 'Anglais', name_ar: 'اللغة الإنجليزية', category: 'langue', cycles: ['moyen', 'secondaire'] },
  { id: 'philosophie', name_fr: 'Philosophie', name_ar: 'الفلسفة', category: 'litteraire', cycles: ['secondaire'] },
  { id: 'histoire-geo', name_fr: 'Histoire-Géographie', name_ar: 'التاريخ والجغرافيا', category: 'litteraire', cycles: ['primaire', 'moyen', 'secondaire'] },
  { id: 'islamique', name_fr: 'Éducation Islamique', name_ar: 'التربية الإسلامية', category: 'litteraire', cycles: ['primaire', 'moyen', 'secondaire'] },
  { id: 'comptabilite', name_fr: 'Gestion Financière & Comptabilité', name_ar: 'التسيير المالي والمحاسبي', category: 'scientifique', cycles: ['secondaire'] },
  { id: 'economie', name_fr: 'Économie & Droit', name_ar: 'الاقتصاد والمناجمنت والقانون', category: 'scientifique', cycles: ['secondaire'] },
  { id: 'genie-civil', name_fr: 'Génie Civil', name_ar: 'الهندسة المدنية', category: 'scientifique', cycles: ['secondaire'] },
  { id: 'genie-mecanique', name_fr: 'Génie Mécanique', name_ar: 'الهندسة الميكانيكية', category: 'scientifique', cycles: ['secondaire'] },
  { id: 'genie-electrique', name_fr: 'Génie Électrique', name_ar: 'الهندسة الكهربائية', category: 'scientifique', cycles: ['secondaire'] },
];
