import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Key = 'projects' | 'workspaces' | 'mascot' | 'access' | 'eyebrow' | 'title1' | 'title2' | 'sub' | 'cta' | 'soon';
type Row = [code: string, name: string, ...values: string[]];

// Order: projects, workspaces, mascot, access, eyebrow, title1, title2, sub, cta, soon
const rows: Row[] = [
  ['en','English','Projects','Workspaces','Meet Ágata','Early access','The Roblox development platform','Create beyond','limits.','Projects, tools and AI — organised for the worlds you build.','Request early access','In development'],
  ['pt','Português','Projetos','Workspaces','Conheça a Ágata','Acesso antecipado','A plataforma de desenvolvimento Roblox','Crie além dos','limites.','Projetos, ferramentas e IA — organizados para os mundos que você cria.','Pedir acesso antecipado','Em desenvolvimento'],
  ['es','Español','Proyectos','Espacios','Conoce a Ágata','Acceso anticipado','La plataforma de desarrollo Roblox','Crea más allá de los','límites.','Proyectos, herramientas e IA, organizados para los mundos que creas.','Solicitar acceso','En desarrollo'],
  ['fr','Français','Projets','Espaces','Découvrez Ágata','Accès anticipé','La plateforme de développement Roblox','Créez au-delà des','limites.','Projets, outils et IA, organisés pour les mondes que vous créez.','Demander un accès','En développement'],
  ['de','Deutsch','Projekte','Workspaces','Lerne Ágata kennen','Früher Zugang','Die Roblox-Entwicklungsplattform','Erschaffe über alle','Grenzen.','Projekte, Werkzeuge und KI – geordnet für deine Welten.','Frühen Zugang anfragen','In Entwicklung'],
  ['it','Italiano','Progetti','Workspace','Scopri Ágata','Accesso anticipato','La piattaforma di sviluppo Roblox','Crea oltre i','limiti.','Progetti, strumenti e IA, organizzati per i mondi che crei.','Richiedi accesso','In sviluppo'],
  ['nl','Nederlands','Projecten','Werkruimtes','Maak kennis met Ágata','Vroege toegang','Het Roblox-ontwikkelplatform','Creëer voorbij','grenzen.','Projecten, tools en AI — geordend voor de werelden die je bouwt.','Vraag toegang aan','In ontwikkeling'],
  ['pl','Polski','Projekty','Przestrzenie','Poznaj Ágatę','Wczesny dostęp','Platforma do tworzenia w Roblox','Twórz bez','granic.','Projekty, narzędzia i AI — uporządkowane dla twoich światów.','Poproś o dostęp','W budowie'],
  ['ru','Русский','Проекты','Пространства','Знакомьтесь, Ágata','Ранний доступ','Платформа разработки для Roblox','Создавайте без','границ.','Проекты, инструменты и ИИ — для миров, которые вы строите.','Запросить доступ','В разработке'],
  ['uk','Українська','Проєкти','Простори','Знайомтеся, Ágata','Ранній доступ','Платформа розробки для Roblox','Створюйте без','меж.','Проєкти, інструменти та ШІ — для світів, які ви будуєте.','Запросити доступ','У розробці'],
  ['tr','Türkçe','Projeler','Çalışma alanları','Ágata ile tanışın','Erken erişim','Roblox geliştirme platformu','Sınırların ötesinde','yarat.','Projeler, araçlar ve yapay zekâ — kurduğun dünyalar için.','Erken erişim iste','Geliştiriliyor'],
  ['ar','العربية','المشاريع','مساحات العمل','تعرّف على Ágata','وصول مبكر','منصة تطوير Roblox','اصنع ما وراء','الحدود.','مشاريع وأدوات وذكاء اصطناعي منظمة للعوالم التي تبنيها.','اطلب الوصول المبكر','قيد التطوير'],
  ['he','עברית','פרויקטים','סביבות עבודה','הכירו את Ágata','גישה מוקדמת','פלטפורמת הפיתוח ל-Roblox','צרו מעבר','לגבולות.','פרויקטים, כלים ובינה מלאכותית — לעולמות שאתם בונים.','בקשו גישה','בפיתוח'],
  ['fa','فارسی','پروژه‌ها','فضاهای کاری','با Ágata آشنا شوید','دسترسی زودهنگام','پلتفرم توسعه Roblox','فراتر از','مرزها بساز.','پروژه‌ها، ابزارها و هوش مصنوعی برای دنیاهایی که می‌سازی.','درخواست دسترسی','در حال توسعه'],
  ['hi','हिन्दी','प्रोजेक्ट','वर्कस्पेस','मिलिए Ágata से','शुरुआती एक्सेस','Roblox डेवलपमेंट प्लेटफ़ॉर्म','सीमाओं से परे','रचें।','प्रोजेक्ट, टूल और AI — आपकी दुनिया के लिए व्यवस्थित।','एक्सेस का अनुरोध करें','विकास में'],
  ['bn','বাংলা','প্রজেক্ট','ওয়ার্কস্পেস','Ágata-র সাথে পরিচিত হন','আগাম অ্যাক্সেস','Roblox ডেভেলপমেন্ট প্ল্যাটফর্ম','সীমার বাইরে','সৃষ্টি করুন।','প্রজেক্ট, টুল ও AI — আপনার জগতের জন্য সাজানো।','অ্যাক্সেস চান','নির্মাণাধীন'],
  ['ur','اردو','پروجیکٹس','ورک اسپیس','Ágata سے ملیں','ابتدائی رسائی','Roblox ڈیولپمنٹ پلیٹ فارم','حدوں سے آگے','تخلیق کریں۔','پروجیکٹس، ٹولز اور AI — آپ کی دنیاؤں کے لیے۔','رسائی کی درخواست','زیرِ تعمیر'],
  ['zh','中文','项目','工作区','认识 Ágata','抢先体验','Roblox 开发平台','创造，','无限可能。','项目、工具与 AI——为你构建的世界而整理。','申请抢先体验','开发中'],
  ['zh-TW','繁體中文','專案','工作區','認識 Ágata','搶先體驗','Roblox 開發平台','創造，','無限可能。','專案、工具與 AI——為你打造的世界而整理。','申請搶先體驗','開發中'],
  ['ja','日本語','プロジェクト','ワークスペース','Ágata に会う','先行アクセス','Roblox 開発プラットフォーム','限界を超えて','創ろう。','プロジェクト、ツール、AI を、あなたの世界のために。','先行アクセスを申し込む','開発中'],
  ['ko','한국어','프로젝트','워크스페이스','Ágata를 만나보세요','얼리 액세스','Roblox 개발 플랫폼','한계를 넘어','창조하세요.','프로젝트, 도구, AI — 당신이 만드는 세계를 위해.','얼리 액세스 신청','개발 중'],
  ['vi','Tiếng Việt','Dự án','Không gian','Gặp Ágata','Truy cập sớm','Nền tảng phát triển Roblox','Sáng tạo vượt','giới hạn.','Dự án, công cụ và AI — cho những thế giới bạn xây dựng.','Đăng ký truy cập sớm','Đang phát triển'],
  ['th','ไทย','โปรเจกต์','เวิร์กสเปซ','พบกับ Ágata','เข้าถึงก่อนใคร','แพลตฟอร์มพัฒนา Roblox','สร้างสรรค์เหนือ','ขีดจำกัด','โปรเจกต์ เครื่องมือ และ AI สำหรับโลกที่คุณสร้าง','ขอสิทธิ์เข้าถึง','กำลังพัฒนา'],
  ['id','Bahasa Indonesia','Proyek','Ruang kerja','Kenalan dengan Ágata','Akses awal','Platform pengembangan Roblox','Berkarya melampaui','batas.','Proyek, alat, dan AI — untuk dunia yang kamu bangun.','Minta akses awal','Dalam pengembangan'],
  ['ms','Bahasa Melayu','Projek','Ruang kerja','Kenali Ágata','Akses awal','Platform pembangunan Roblox','Cipta melangkaui','batasan.','Projek, alat dan AI — untuk dunia yang anda bina.','Mohon akses awal','Dalam pembangunan'],
  ['fil','Filipino','Mga proyekto','Workspace','Kilalanin si Ágata','Maagang access','Ang Roblox development platform','Lumikha nang lampas sa','hangganan.','Mga proyekto, tool at AI — para sa mga mundong binubuo mo.','Humiling ng access','Ginagawa pa'],
  ['sv','Svenska','Projekt','Arbetsytor','Möt Ágata','Tidig åtkomst','Plattformen för Roblox-utveckling','Skapa bortom','gränserna.','Projekt, verktyg och AI — ordnat för världarna du bygger.','Begär åtkomst','Under utveckling'],
  ['no','Norsk','Prosjekter','Arbeidsområder','Møt Ágata','Tidlig tilgang','Plattformen for Roblox-utvikling','Skap forbi','grensene.','Prosjekter, verktøy og KI — for verdenene du bygger.','Be om tilgang','Under utvikling'],
  ['da','Dansk','Projekter','Arbejdsområder','Mød Ágata','Tidlig adgang','Platformen til Roblox-udvikling','Skab ud over','grænserne.','Projekter, værktøjer og AI — til de verdener, du bygger.','Anmod om adgang','Under udvikling'],
  ['fi','Suomi','Projektit','Työtilat','Tapaa Ágata','Varhainen pääsy','Roblox-kehitysalusta','Luo yli','rajojen.','Projektit, työkalut ja tekoäly — rakentamiisi maailmoihin.','Pyydä pääsyä','Kehitteillä'],
  ['cs','Čeština','Projekty','Pracovní prostory','Seznamte se s Ágatou','Předběžný přístup','Platforma pro vývoj v Roblox','Tvořte bez','hranic.','Projekty, nástroje a AI — pro světy, které stavíte.','Požádat o přístup','Ve vývoji'],
  ['sk','Slovenčina','Projekty','Pracovné priestory','Spoznajte Ágatu','Predbežný prístup','Platforma na vývoj v Roblox','Tvorte bez','hraníc.','Projekty, nástroje a AI — pre svety, ktoré staviate.','Požiadať o prístup','Vo vývoji'],
  ['hu','Magyar','Projektek','Munkaterek','Ismerd meg Ágatát','Korai hozzáférés','A Roblox fejlesztői platform','Alkoss határok','nélkül.','Projektek, eszközök és MI — az általad épített világokhoz.','Hozzáférés kérése','Fejlesztés alatt'],
  ['ro','Română','Proiecte','Spații de lucru','Cunoaște-o pe Ágata','Acces timpuriu','Platforma de dezvoltare Roblox','Creează dincolo de','limite.','Proiecte, unelte și AI — pentru lumile pe care le construiești.','Cere acces','În dezvoltare'],
  ['el','Ελληνικά','Έργα','Χώροι εργασίας','Γνωρίστε την Ágata','Πρώιμη πρόσβαση','Η πλατφόρμα ανάπτυξης Roblox','Δημιούργησε πέρα από τα','όρια.','Έργα, εργαλεία και AI — για τους κόσμους που χτίζεις.','Ζήτησε πρόσβαση','Σε ανάπτυξη'],
  ['bg','Български','Проекти','Работни пространства','Запознайте се с Ágata','Ранен достъп','Платформата за разработка в Roblox','Създавай отвъд','границите.','Проекти, инструменти и ИИ — за световете, които градиш.','Заяви достъп','В разработка'],
  ['hr','Hrvatski','Projekti','Radni prostori','Upoznajte Ágatu','Rani pristup','Platforma za razvoj u Robloxu','Stvaraj iznad','granica.','Projekti, alati i AI — za svjetove koje gradiš.','Zatraži pristup','U razvoju'],
  ['sw','Kiswahili','Miradi','Nafasi za kazi','Mjue Ágata','Ufikiaji wa mapema','Jukwaa la kutengeneza Roblox','Unda zaidi ya','mipaka.','Miradi, zana na AI — kwa ulimwengu unaoujenga.','Omba ufikiaji','Inaendelezwa'],
  ['ca','Català','Projectes','Espais de treball','Coneix l’Ágata','Accés anticipat','La plataforma de desenvolupament Roblox','Crea més enllà dels','límits.','Projectes, eines i IA — per als mons que construeixes.','Sol·licita accés','En desenvolupament'],
];

export const languages = rows.map(([code, name]) => ({ code, name }));
const keys: Key[] = ['projects','workspaces','mascot','access','eyebrow','title1','title2','sub','cta','soon'];
const dict: Record<string, Record<Key, string>> & { en: Record<Key, string> } = Object.fromEntries(rows.map(([code, , ...v]) => [code, Object.fromEntries(keys.map((k, i) => [k, v[i]])) as Record<Key, string>])) as never;
const rtl = new Set(['ar', 'he', 'fa', 'ur']);

/** Picks the best supported language for a list of browser locales (e.g. navigator.languages). */
export function matchLanguage(locales: readonly string[]): string {
  for (const raw of locales) {
    const l = raw.toLowerCase();
    if (l.startsWith('zh')) return /tw|hk|mo|hant/.test(l) ? 'zh-TW' : 'zh';
    if (l.startsWith('nb') || l.startsWith('nn')) return 'no';
    if (l.startsWith('tl')) return 'fil';
    const base = l.split('-')[0] ?? '';
    if (dict[base]) return base;
  }
  return 'en';
}

const Ctx = createContext<{ lang: string; t: (k: Key) => string; setLang: (c: string) => void }>({ lang: 'en', t: k => dict.en[k], setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState('en');
  useEffect(() => { setLangState(localStorage.getItem('agata-lang') ?? matchLanguage(navigator.languages ?? [navigator.language])); }, []);
  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = rtl.has(lang) ? 'rtl' : 'ltr'; }, [lang]);
  const setLang = (c: string) => { localStorage.setItem('agata-lang', c); setLangState(c); };
  return <Ctx.Provider value={{ lang, setLang, t: k => (dict[lang] ?? dict.en)[k] }}>{children}</Ctx.Provider>;
}
export const useI18n = () => useContext(Ctx);
