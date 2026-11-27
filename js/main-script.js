// ================= LANGUAGE (EN / AR)  +  RTL / LTR =================
// How it works
//  * Every translatable element in index.html carries  data-i18n  (text)  or
//    data-i18n-attrs="placeholder,alt,aria-label,title"  (attributes).
//  * The original English text is the lookup key into AR_TEXT below, so to
//    translate something new: add data-i18n to the element and add one
//    "English text": "Arabic text" line to AR_TEXT. Anything without an entry
//    simply stays in English (brand names, tech names, etc.).
//  * Switching language sets <html lang> + <html dir>; the RTL layout lives in
//    main-style.css under  html[dir="rtl"].
const languageToggle = document.getElementById('languageToggle');
const LANG_KEY = 'mfd-lang';
let currentLang = 'en';

// strings produced by JavaScript (form messages, aria labels ...)
const UI = {
  en: {
    toggleLabel: 'العربية',
    toggleAria: 'Switch to Arabic',
    slide: 'Slide',
    testimonialGroup: 'Testimonial group',
    sending: 'Sending...',
    sent: '✓ Thank you! Your message has been sent. I will get back to you within 24 hours.',
    subscribed: '✓ You are subscribed! Check your inbox for confirmation.',
    badEmail: '✗ Please enter a valid email address.'
  },
  ar: {
    toggleLabel: 'English',
    toggleAria: 'التبديل إلى الإنجليزية',
    slide: 'الشريحة',
    testimonialGroup: 'مجموعة آراء',
    sending: 'جارٍ الإرسال...',
    sent: '✓ شكراً لك! تم إرسال رسالتك. سأرد عليك خلال 24 ساعة.',
    subscribed: '✓ تم اشتراكك بنجاح! تحقق من بريدك الإلكتروني للتأكيد.',
    badEmail: '✗ الرجاء إدخال بريد إلكتروني صحيح.'
  }
};

// English text  ->  Arabic text
const AR_TEXT = {
  "Toggle menu": "فتح / إغلاق القائمة",
  "Previous slide": "الشريحة السابقة",
  "Next slide": "الشريحة التالية",
  "Mohammad Farooq — IT specialist": "محمد فاروق — أخصائي تقنية معلومات",
  "Web Development": "تطوير المواقع",
  "Mobile Apps": "تطبيقات الجوال",
  "Cloud Solutions": "الحلول السحابية",
  "Cybersecurity": "الأمن السيبراني",
  "AI & Automation": "الذكاء الاصطناعي والأتمتة",
  "UI/UX Design": "تصميم واجهات وتجربة المستخدم",
  "Cloud Infrastructure": "البنية التحتية السحابية",
  "AI Solutions": "حلول الذكاء الاصطناعي",
  "E-commerce Platform": "منصة تجارة إلكترونية",
  "Mobile Banking App": "تطبيق مصرفي للجوال",
  "Analytics Dashboard": "لوحة التحليلات",
  "SaaS Platform": "منصة SaaS",
  "AI Chatbot": "روبوت محادثة بالذكاء الاصطناعي",
  "Brand Identity": "الهوية البصرية",
  "Enter your email address": "أدخل بريدك الإلكتروني",
  "Ahmed Al-Rashid": "أحمد الراشد",
  "Sarah Johnson": "سارة جونسون",
  "Rajesh Kumar": "راجيش كومار",
  "Fatima Hassan": "فاطمة حسن",
  "Michael Chen": "مايكل تشن",
  "Previous": "السابق",
  "Next": "التالي",
  "Your Name *": "الاسم *",
  "Your Email *": "البريد الإلكتروني *",
  "Your Message *": "رسالتك *",
  "Website": "الموقع الإلكتروني",
  "Email": "البريد الإلكتروني",
  "Chat on WhatsApp": "تواصل عبر واتساب",
  "Back to top": "العودة إلى الأعلى",
  "Design & Development": "التصميم والتطوير",
  "Home": "الرئيسية",
  "About": "عني",
  "Services": "الخدمات",
  "More Details": "المزيد من التفاصيل",
  "Why Us": "لماذا أنا",
  "Work": "أعمالي",
  "Pricing": "الأسعار",
  "FAQ": "الأسئلة الشائعة",
  "Get a Quote": "احصل على عرض سعر",
  "Full-Service IT Partner": "شريك تقني شامل",
  "Complete <span class=\"accent\">IT Services</span> for Modern Business": "خدمات <span class=\"accent\">تقنية متكاملة</span> للأعمال الحديثة",
  "From web development, cloud infrastructure, and cybersecurity to AI automation — I deliver end-to-end technology solutions that scale with you.": "من تطوير المواقع والبنية السحابية والأمن السيبراني إلى أتمتة الذكاء الاصطناعي — أقدّم حلولاً تقنية متكاملة تنمو معك.",
  "Start a Project": "ابدأ مشروعك",
  "Explore Services": "استكشف الخدمات",
  "Why Work With Me": "لماذا تعمل معي",
  "Response Time": "وقت الاستجابة",
  "Under 24h": "أقل من 24 ساعة",
  "Projects Delivered": "مشاريع منجزة",
  "Client Satisfaction": "رضا العملاء",
  "Support": "الدعم",
  "24/7 Global": "24/7 عالمياً",
  "Cybersecurity Excellence": "التميّز في الأمن السيبراني",
  "Protect Your Business with <span class=\"accent\">Enterprise Security</span>": "احمِ أعمالك بـ<span class=\"accent\">أمان المؤسسات</span>",
  "Security audits, threat detection, firewall setup, and compliance — keeping your data safe from modern cyber threats.": "تدقيق أمني، وكشف للتهديدات، وإعداد جدران الحماية، والامتثال — لحماية بياناتك من التهديدات السيبرانية الحديثة.",
  "Get a Security Audit": "احصل على تدقيق أمني",
  "Learn More": "اعرف المزيد",
  "Security Coverage": "التغطية الأمنية",
  "Threats Blocked": "التهديدات المحظورة",
  "Audits Performed": "عمليات تدقيق منفّذة",
  "Compliance": "الامتثال",
  "Monitoring": "المراقبة",
  "Cloud & DevOps": "الحوسبة السحابية وDevOps",
  "Scale Faster with <span class=\"accent\">Cloud Solutions</span> That Work": "توسّع أسرع مع <span class=\"accent\">حلول سحابية</span> فعّالة",
  "Migrate, optimize, and manage your infrastructure on AWS, Azure, and Google Cloud — with zero downtime and full control.": "انقل بنيتك التحتية وحسّنها وأدرها على AWS وAzure وGoogle Cloud — دون توقف وبتحكم كامل.",
  "Migrate to Cloud": "انتقل إلى السحابة",
  "See Case Studies": "شاهد دراسات الحالة",
  "Cloud Expertise": "الخبرة السحابية",
  "Cost Reduction": "خفض التكاليف",
  "Up to 60%": "حتى 60%",
  "Uptime SLA": "اتفاقية مستوى التشغيل",
  "Platforms": "المنصات",
  "Migrations": "عمليات الانتقال",
  "50+ Done": "50+ منجزة",
  "Web & Mobile Development": "تطوير الويب والجوال",
  "Beautiful <span class=\"accent\">Websites & Apps</span> Built to Perform": "<span class=\"accent\">مواقع وتطبيقات</span> جميلة مبنية للأداء",
  "Custom websites, web apps, and mobile apps designed for speed, SEO, and user delight. Built to convert, not just to look pretty.": "مواقع وتطبيقات ويب وجوال مخصصة، مصممة للسرعة وتحسين محركات البحث ولإسعاد المستخدم. مبنية لتحقيق التحويلات، لا للجمال فقط.",
  "Build Your Site": "ابنِ موقعك",
  "View Portfolio": "شاهد الأعمال",
  "Development Stats": "إحصائيات التطوير",
  "Websites Built": "مواقع منجزة",
  "Avg. Page Speed": "متوسط سرعة الصفحة",
  "Tech Stack": "التقنيات المستخدمة",
  "Automate Your Workflow with <span class=\"accent\">AI Solutions</span>": "أتمت سير عملك مع <span class=\"accent\">حلول الذكاء الاصطناعي</span>",
  "Custom AI models, intelligent chatbots, and workflow automation that eliminate manual work and unlock new efficiencies.": "نماذج ذكاء اصطناعي مخصصة، وروبوتات محادثة ذكية، وأتمتة لسير العمل تلغي العمل اليدوي وتفتح آفاقاً جديدة للكفاءة.",
  "Explore AI": "اكتشف الذكاء الاصطناعي",
  "Our Services": "خدماتي",
  "AI Capabilities": "قدرات الذكاء الاصطناعي",
  "Tickets Automated": "طلبات دعم مؤتمتة",
  "Chatbots Deployed": "روبوتات محادثة مُطلقة",
  "Manual Work Saved": "عمل يدوي تم توفيره",
  "1000+ hrs": "1000+ ساعة",
  "Models": "النماذج",
  "Cloud & Hosting": "السحابة والاستضافة",
  "Technical Support": "الدعم الفني",
  "Data & Analytics": "البيانات والتحليلات",
  "Automation & RPA": "الأتمتة وRPA",
  "AI & Machine Learning": "الذكاء الاصطناعي وتعلّم الآلة",
  "SEO & Marketing": "تحسين محركات البحث والتسويق",
  "ERP & CRM": "أنظمة ERP وCRM",
  "IT Consulting": "الاستشارات التقنية",
  "Graphic Design": "التصميم الجرافيكي",
  "12+ Years Exp.": "12+ سنة خبرة",
  "Mohammad Farooq": "محمد فاروق",
  "Full stack Developer — Riyadh, Saudi Arabia": "مطوّر Full Stack — الرياض، المملكة العربية السعودية",
  "About Myself": "نبذة عني",
  "Turning Ideas into <span class=\"grad\">Digital Reality</span>": "أحوّل الأفكار إلى <span class=\"grad\">واقع رقمي</span>",
  "I'm Mohammad Farooq Deen Mohammad — a professional with expertise in website development, graphic design, and content writing. With more than 12 years of experience, I've completed my Master's and Bachelor's degrees in Information Technology (MCA & BCA).": "أنا محمد فاروق دين محمد — متخصص في تطوير المواقع والتصميم الجرافيكي وكتابة المحتوى. بخبرة تزيد على 12 عاماً، أتممت درجتي الماجستير والبكالوريوس في تقنية المعلومات (MCA وBCA).",
  "I specialize in website and mobile UI/UX design and development, with a strong focus on user problems and genuine design solutions. I've worked on CRM systems, mobile apps, and web apps across multiple industries.": "أتخصص في تصميم وتطوير واجهات وتجربة المستخدم للمواقع والجوال، مع تركيز قوي على مشكلات المستخدمين وحلول التصميم الحقيقية. عملت على أنظمة CRM وتطبيقات الجوال وتطبيقات الويب في قطاعات متعددة.",
  "MCA — Master of Computer Application": "MCA — ماجستير تطبيقات الحاسب",
  "BCA — Bachelor of Computer Application": "BCA — بكالوريوس تطبيقات الحاسب",
  "Java Certification — CMC (TATA)": "شهادة Java — CMC (تاتا)",
  "Grade A++ Merit Diploma": "دبلوم بتقدير A++ للتفوق",
  "12+ years in website development & UI/UX design": "أكثر من 12 عاماً في تطوير المواقع وتصميم واجهات وتجربة المستخدم",
  "Creative analytical thinker with strong troubleshooting skills": "مفكر تحليلي مبدع بمهارات قوية في حل المشكلات",
  "Good organization and attention to detail on every project": "تنظيم جيد واهتمام بالتفاصيل في كل مشروع",
  "Currently Senior Software Development Specialist at Maharah Human Resources, Riyadh": "أعمل حالياً أخصائي أول تطوير برمجيات في مهارة للموارد البشرية بالرياض",
  "What I Offer": "ما أقدّمه",
  "Complete IT Services": "خدمات تقنية متكاملة",
  "End-to-end technology solutions tailored to your business needs.": "حلول تقنية متكاملة مصممة وفق احتياجات عملك.",
  "Fast, responsive, SEO-friendly websites and web applications built with modern frameworks.": "مواقع وتطبيقات ويب سريعة ومتجاوبة ومتوافقة مع محركات البحث، مبنية بأحدث الأطر البرمجية.",
  "Mobile App Development": "تطوير تطبيقات الجوال",
  "Native and cross-platform mobile apps for iOS and Android that deliver seamless user experiences.": "تطبيقات جوال أصلية ومتعددة المنصات لنظامي iOS وأندرويد تقدّم تجربة مستخدم سلسة.",
  "Scalable cloud infrastructure, migration, and managed hosting on AWS, Azure, and Google Cloud.": "بنية سحابية قابلة للتوسع، وهجرة، واستضافة مُدارة على AWS وAzure وGoogle Cloud.",
  "Security audits, threat detection, penetration testing, and compliance to keep your data safe.": "تدقيق أمني، وكشف للتهديدات، واختبار اختراق، وامتثال للحفاظ على أمان بياناتك.",
  "Custom AI models, intelligent chatbots, and workflow automation to eliminate manual work.": "نماذج ذكاء اصطناعي مخصصة، وروبوتات محادثة ذكية، وأتمتة لسير العمل للتخلص من العمل اليدوي.",
  "User-centered design that solves real problems — from wireframes to polished interfaces.": "تصميم يتمحور حول المستخدم ويحل مشكلات حقيقية — من المخططات الأولية إلى الواجهات المتقنة.",
  "Deep Dive": "نظرة معمّقة",
  "Explore how I approach each service area to deliver measurable results.": "اكتشف كيف أتعامل مع كل مجال من الخدمات لتحقيق نتائج قابلة للقياس.",
  "Development": "التطوير",
  "<span class=\"grad\">Web Development</span> That Converts": "<span class=\"grad\">تطوير مواقع</span> يحقق التحويلات",
  "I build websites and web applications that are not only visually stunning but also engineered for performance, SEO, and conversions.": "أبني مواقع وتطبيقات ويب لا تبهر بصرياً فحسب، بل مُهندسة أيضاً للأداء وتحسين محركات البحث وتحقيق التحويلات.",
  "Responsive design for all devices": "تصميم متجاوب مع جميع الأجهزة",
  "Core Web Vitals optimization": "تحسين مؤشرات Core Web Vitals",
  "CMS integration (WordPress, custom)": "تكامل أنظمة إدارة المحتوى (ووردبريس أو مخصصة)",
  "E-commerce and payment gateway setup": "إعداد المتاجر الإلكترونية وبوابات الدفع",
  "Ongoing maintenance and support": "صيانة ودعم مستمران",
  "Cloud": "السحابة",
  "<span class=\"grad\">Cloud Infrastructure</span> Done Right": "<span class=\"grad\">بنية سحابية</span> مبنية بالشكل الصحيح",
  "Whether you're migrating to the cloud or optimizing existing infrastructure, I ensure reliability, security, and cost efficiency.": "سواء كنت تنتقل إلى السحابة أو تحسّن بنية قائمة، أضمن لك الموثوقية والأمان وكفاءة التكلفة.",
  "AWS, Azure, Google Cloud expertise": "خبرة في AWS وAzure وGoogle Cloud",
  "Zero-downtime migrations": "عمليات انتقال دون توقف",
  "Auto-scaling and load balancing": "التوسع التلقائي وموازنة الأحمال",
  "CI/CD pipeline setup": "إعداد مسارات CI/CD",
  "Cost optimization and monitoring": "تحسين التكاليف والمراقبة",
  "Security": "الأمان",
  "<span class=\"grad\">Enterprise Security</span> & Compliance": "<span class=\"grad\">أمان المؤسسات</span> والامتثال",
  "Protect your business from modern cyber threats with comprehensive security assessments and proactive defense strategies.": "احمِ أعمالك من التهديدات السيبرانية الحديثة عبر تقييمات أمنية شاملة واستراتيجيات دفاع استباقية.",
  "Security audits and penetration testing": "تدقيق أمني واختبار اختراق",
  "Threat detection and incident response": "كشف التهديدات والاستجابة للحوادث",
  "Firewall and network security setup": "إعداد جدران الحماية وأمن الشبكات",
  "Compliance readiness (ISO, GDPR)": "الجاهزية للامتثال (ISO وGDPR)",
  "Security awareness training": "التدريب على الوعي الأمني",
  "AI": "الذكاء الاصطناعي",
  "<span class=\"grad\">AI & Automation</span> Solutions": "حلول <span class=\"grad\">الذكاء الاصطناعي والأتمتة</span>",
  "Leverage the power of artificial intelligence to streamline operations, reduce costs, and create new business opportunities.": "استفد من قوة الذكاء الاصطناعي لتبسيط العمليات وخفض التكاليف وخلق فرص عمل جديدة.",
  "Custom AI models for your business": "نماذج ذكاء اصطناعي مخصصة لعملك",
  "Intelligent chatbots and virtual assistants": "روبوتات محادثة ومساعدون افتراضيون أذكياء",
  "Workflow and process automation": "أتمتة سير العمل والعمليات",
  "Data analysis and predictive insights": "تحليل البيانات ورؤى تنبؤية",
  "Seamless integration with existing systems": "تكامل سلس مع الأنظمة الحالية",
  "Your Success is My Priority": "نجاحك هو أولويتي",
  "Here's what sets me apart from the rest.": "هذا ما يميزني عن الآخرين.",
  "Fast Turnaround": "تسليم سريع",
  "I deliver projects on time, every time — without compromising on quality.": "أسلّم المشاريع في موعدها دائماً — دون التضحية بالجودة.",
  "Results-Driven": "موجّه نحو النتائج",
  "Every solution is designed to achieve measurable business outcomes.": "كل حل مصمم لتحقيق نتائج أعمال قابلة للقياس.",
  "Premium Quality": "جودة عالية",
  "I use the latest technologies and best practices to ensure excellence.": "أستخدم أحدث التقنيات وأفضل الممارسات لضمان التميز.",
  "Dedicated Support": "دعم مخصص",
  "Get 24/7 support and maintenance for peace of mind.": "احصل على دعم وصيانة على مدار الساعة لراحة بالك.",
  "Security First": "الأمان أولاً",
  "Security is baked into every layer of your project from the start.": "الأمان مدمج في كل طبقة من مشروعك منذ البداية.",
  "Scalable Solutions": "حلول قابلة للتوسع",
  "Built to grow with your business — no need to rebuild later.": "مبنية لتنمو مع عملك — دون الحاجة لإعادة البناء لاحقاً.",
  "My Toolkit": "أدواتي",
  "Technologies I Master": "التقنيات التي أتقنها",
  "Modern tools and frameworks for future-proof solutions.": "أدوات وأطر عمل حديثة لحلول تدوم للمستقبل.",
  "Years Experience": "سنوات الخبرة",
  "% Client Satisfaction": "% رضا العملاء",
  "Cloud Migrations": "عمليات انتقال سحابي",
  "How I Work": "كيف أعمل",
  "My Process": "منهجية عملي",
  "A proven approach that ensures your project is delivered on time and on budget.": "منهج مجرّب يضمن تسليم مشروعك في وقته وضمن ميزانيته.",
  "Discover": "الاستكشاف",
  "We discuss your goals, challenges, and vision to understand exactly what you need.": "نناقش أهدافك وتحدياتك ورؤيتك لنفهم احتياجك بدقة.",
  "Design": "التصميم",
  "I create wireframes, prototypes, and design mockups for your approval before development.": "أُعدّ المخططات الأولية والنماذج التجريبية وتصاميم المعاينة لاعتمادك قبل بدء التطوير.",
  "Develop": "التطوير",
  "Using the latest technologies, I build your solution with clean, maintainable code.": "باستخدام أحدث التقنيات، أبني حلّك بشيفرة نظيفة وسهلة الصيانة.",
  "Deliver & Support": "التسليم والدعم",
  "I launch your project and provide ongoing support, maintenance, and improvements.": "أُطلق مشروعك وأقدّم الدعم والصيانة والتحسينات المستمرة.",
  "Recent Work": "أحدث الأعمال",
  "Portfolio": "معرض الأعمال",
  "A selection of projects that showcase my capabilities.": "مجموعة من المشاريع التي تعكس قدراتي.",
  "Full-featured online store with payment integration and inventory management.": "متجر إلكتروني متكامل مع بوابات الدفع وإدارة المخزون.",
  "Mobile App": "تطبيق جوال",
  "Secure, user-friendly banking app with biometric authentication.": "تطبيق مصرفي آمن وسهل الاستخدام مع المصادقة الحيوية.",
  "Real-time business intelligence dashboard with custom reporting.": "لوحة ذكاء أعمال لحظية مع تقارير مخصصة.",
  "Cloud Solution": "حل سحابي",
  "Multi-tenant SaaS platform with subscription billing and analytics.": "منصة SaaS متعددة المستأجرين مع فوترة الاشتراكات والتحليلات.",
  "Intelligent customer service chatbot handling 80% of queries automatically.": "روبوت محادثة لخدمة العملاء يعالج 80% من الاستفسارات تلقائياً.",
  "Complete visual identity and UI kit for a fintech startup.": "هوية بصرية متكاملة وحزمة واجهات لشركة ناشئة في التقنية المالية.",
  "Start Your Project": "ابدأ مشروعك",
  "View Figma Files": "شاهد ملفات Figma",
  "My 100% Satisfaction Guarantee": "ضمان رضاك بنسبة 100%",
  "I stand behind every project I deliver. If you're not completely satisfied, I'll work with you until you are.": "أقف خلف كل مشروع أسلّمه. وإن لم تكن راضياً تماماً، سأعمل معك حتى ترضى.",
  "100% money-back guarantee if not satisfied": "ضمان استرداد 100% من المبلغ عند عدم الرضا",
  "Unlimited revisions until you're happy": "تعديلات غير محدودة حتى ترضى",
  "On-time delivery, every time": "تسليم في الموعد دائماً",
  "Post-launch support included": "الدعم بعد الإطلاق مشمول",
  "Confidentiality and NDA protection": "السرية وحماية اتفاقيات عدم الإفصاح",
  "Your Success, Guaranteed": "نجاحك مضمون",
  "I'm committed to delivering exceptional results that exceed your expectations.": "ألتزم بتحقيق نتائج استثنائية تفوق توقعاتك.",
  "Global Reach": "حضور عالمي",
  "Where I Work": "أين أعمل",
  "Serving clients worldwide from Riyadh, Saudi Arabia.": "أخدم العملاء حول العالم من الرياض، المملكة العربية السعودية.",
  "Saudi Arabia": "المملكة العربية السعودية",
  "Riyadh — Headquarters": "الرياض — المقر الرئيسي",
  "UAE": "الإمارات",
  "Dubai — Clients": "دبي — عملاء",
  "India": "الهند",
  "Development Hub": "مركز التطوير",
  "UK": "المملكة المتحدة",
  "European Clients": "عملاء أوروبيون",
  "USA": "الولايات المتحدة",
  "North America Clients": "عملاء أمريكا الشمالية",
  "Stay Ahead of the Curve": "ابقَ في الصدارة",
  "Get the latest IT tips, trends, and exclusive offers delivered to your inbox.": "احصل على أحدث النصائح والاتجاهات التقنية والعروض الحصرية في بريدك.",
  "Subscribe": "اشترك",
  "Testimonials": "آراء العملاء",
  "What Clients Say": "ماذا يقول العملاء",
  "Real feedback from real clients.": "آراء حقيقية من عملاء حقيقيين.",
  "\"Mohammad delivered our e-commerce platform ahead of schedule. His attention to detail and technical expertise are unmatched.\"": "\"سلّم محمد منصتنا للتجارة الإلكترونية قبل الموعد المحدد. اهتمامه بالتفاصيل وخبرته التقنية لا مثيل لهما.\"",
  "CEO, TechMart Saudi": "الرئيس التنفيذي، TechMart Saudi",
  "\"Working with Mohammad on our cloud migration was seamless. He saved us 40% on infrastructure costs with zero downtime.\"": "\"كان العمل مع محمد على انتقالنا إلى السحابة سلساً. وفّر علينا 40% من تكاليف البنية التحتية دون أي توقف.\"",
  "CTO, Innovate UK": "المدير التقني، Innovate UK",
  "\"The AI chatbot Mohammad built handles 80% of our customer queries. Our support team can finally focus on complex issues.\"": "\"يعالج روبوت المحادثة الذي بناه محمد 80% من استفسارات عملائنا. أصبح فريق الدعم لدينا قادراً أخيراً على التركيز على القضايا المعقدة.\"",
  "Operations Manager, SupportAI": "مدير العمليات، SupportAI",
  "\"Our mobile banking app is fast, secure, and beautifully designed. Mohammad understood our compliance requirements perfectly.\"": "\"تطبيقنا المصرفي سريع وآمن وتصميمه جميل. فهم محمد متطلبات الامتثال لدينا على أكمل وجه.\"",
  "Product Lead, Gulf Bank": "قائد المنتج، Gulf Bank",
  "\"From concept to launch, Mohammad was professional and responsive. The design exceeded our expectations.\"": "\"من الفكرة إلى الإطلاق، كان محمد محترفاً وسريع الاستجابة. تجاوز التصميم توقعاتنا.\"",
  "Founder, StartupHub": "المؤسس، StartupHub",
  "Pricing Plans": "باقات الأسعار",
  "Choose Your Package": "اختر باقتك",
  "Transparent pricing, no hidden fees. Pick the plan that fits your needs.": "أسعار شفافة دون رسوم خفية. اختر الباقة التي تناسب احتياجك.",
  "Starter": "الأساسية",
  "Perfect for small projects": "مثالية للمشاريع الصغيرة",
  "/project": "لكل مشروع",
  "5-page responsive website": "موقع متجاوب من 5 صفحات",
  "Basic SEO setup": "إعداد أساسي لتحسين محركات البحث",
  "Contact form integration": "دمج نموذج التواصل",
  "1 month free support": "دعم مجاني لمدة شهر",
  "30-day delivery": "التسليم خلال 30 يوماً",
  "Get Started": "ابدأ الآن",
  "Most Popular": "الأكثر طلباً",
  "Professional": "الاحترافية",
  "For growing businesses": "للأعمال النامية",
  "Custom web application": "تطبيق ويب مخصص",
  "Full SEO optimization": "تحسين شامل لمحركات البحث",
  "CMS integration": "تكامل نظام إدارة المحتوى",
  "E-commerce functionality": "وظائف التجارة الإلكترونية",
  "3 months free support": "دعم مجاني لمدة 3 أشهر",
  "45-day delivery": "التسليم خلال 45 يوماً",
  "Start Project": "ابدأ المشروع",
  "Enterprise": "المؤسسية",
  "Custom solutions at scale": "حلول مخصصة على نطاق واسع",
  "Full-stack application": "تطبيق متكامل (Full-stack)",
  "Cloud infrastructure setup": "إعداد البنية التحتية السحابية",
  "AI & automation integration": "دمج الذكاء الاصطناعي والأتمتة",
  "Security audit included": "تدقيق أمني مشمول",
  "6 months free support": "دعم مجاني لمدة 6 أشهر",
  "Dedicated project manager": "مدير مشروع مخصص",
  "60-day delivery": "التسليم خلال 60 يوماً",
  "Contact Me": "تواصل معي",
  "🔥 Limited Offer": "🔥 عرض محدود",
  "Get <span class=\"highlight\">20% OFF</span> on Your First Project": "احصل على <span class=\"highlight\">خصم 20%</span> على مشروعك الأول",
  "New clients get 20% off any package. Use code: <strong>MFD20</strong> at checkout.": "يحصل العملاء الجدد على خصم 20% على أي باقة. استخدم الرمز: <strong>MFD20</strong> عند الدفع.",
  "Claim Offer": "احصل على العرض",
  "Questions?": "لديك أسئلة؟",
  "Frequently Asked Questions": "الأسئلة الشائعة",
  "Everything you need to know before we start working together.": "كل ما تحتاج لمعرفته قبل أن نبدأ العمل معاً.",
  "What services do you offer?": "ما الخدمات التي تقدمها؟",
  "I offer a full range of IT services including web development, mobile app development, cloud infrastructure, cybersecurity, AI & automation, UI/UX design, and ongoing technical support.": "أقدّم مجموعة متكاملة من الخدمات التقنية تشمل تطوير المواقع وتطبيقات الجوال والبنية السحابية والأمن السيبراني والذكاء الاصطناعي والأتمتة وتصميم واجهات وتجربة المستخدم والدعم الفني المستمر.",
  "How long does a typical project take?": "كم يستغرق المشروع عادةً؟",
  "Project timelines vary based on complexity. A simple website takes 2-4 weeks, while complex web applications or mobile apps can take 2-4 months. I'll provide a detailed timeline during our initial consultation.": "تختلف المدد حسب التعقيد. يستغرق الموقع البسيط من 2 إلى 4 أسابيع، بينما قد تستغرق تطبيقات الويب أو الجوال المعقدة من 2 إلى 4 أشهر. سأقدّم لك جدولاً زمنياً مفصلاً خلال الاستشارة الأولية.",
  "Do you provide ongoing support?": "هل تقدّم دعماً مستمراً؟",
  "Absolutely! I offer 24/7 support and maintenance packages. Every project includes free support for 1-6 months depending on the package you choose.": "بالتأكيد! أقدّم باقات دعم وصيانة على مدار الساعة. يتضمن كل مشروع دعماً مجانياً من شهر إلى 6 أشهر حسب الباقة التي تختارها.",
  "What is your payment structure?": "ما هي آلية الدفع؟",
  "Typically 40% upfront to start the project, 40% at the midpoint, and 20% upon completion. For larger projects, I can offer flexible payment plans.": "عادةً 40% مقدماً لبدء المشروع، و40% في منتصفه، و20% عند الإنجاز. وللمشاريع الأكبر يمكنني تقديم خطط دفع مرنة.",
  "Can you work with my existing website or app?": "هل يمكنك العمل على موقعي أو تطبيقي الحالي؟",
  "Yes! I can audit, redesign, optimize, or extend your existing website or application. I'll review your current setup and provide recommendations.": "نعم! يمكنني تدقيق موقعك أو تطبيقك الحالي وإعادة تصميمه وتحسينه أو توسيعه. سأراجع وضعك الحالي وأقدّم لك التوصيات.",
  "Do you sign NDAs and protect my intellectual property?": "هل توقّع اتفاقيات عدم الإفصاح وتحمي ملكيتي الفكرية؟",
  "Absolutely. I sign NDAs before discussing project details and ensure all intellectual property rights are fully transferred to you upon completion.": "بالتأكيد. أوقّع اتفاقيات عدم الإفصاح قبل مناقشة تفاصيل المشروع، وأضمن نقل جميع حقوق الملكية الفكرية إليك بالكامل عند الإنجاز.",
  "Let's Build Something Amazing": "لنبنِ معاً شيئاً مذهلاً",
  "Have a project in mind? I'd love to hear about it. Get in touch and let's discuss how I can help.": "هل لديك مشروع في بالك؟ يسعدني سماعه. تواصل معي لنناقش كيف يمكنني مساعدتك.",
  "WhatsApp": "واتساب",
  "Phone": "الهاتف",
  "Location": "الموقع",
  "Riyadh, Saudi Arabia": "الرياض، المملكة العربية السعودية",
  "Send a Message": "أرسل رسالة",
  "Please enter your name.": "الرجاء إدخال اسمك.",
  "Please enter a valid email.": "الرجاء إدخال بريد إلكتروني صحيح.",
  "Please enter your message.": "الرجاء كتابة رسالتك.",
  "Send Message": "إرسال الرسالة",
  "MFD Solutions delivers premium web, mobile, and cloud services worldwide. 12+ years of experience in Website Development and Graphic Design.": "تقدّم MFD Solutions خدمات ويب وجوال وسحابة عالية الجودة حول العالم، بخبرة تتجاوز 12 عاماً في تطوير المواقع والتصميم الجرافيكي.",
  "Web Designing": "تصميم المواقع",
  "CMS Development": "تطوير أنظمة إدارة المحتوى",
  "E-Commerce": "التجارة الإلكترونية",
  "Prototyping": "النماذج الأولية",
  "SEO/SMO Services": "خدمات SEO/SMO",
  "Quick Links": "روابط سريعة",
  "Latest Work": "أحدث الأعمال",
  "Our Guarantee": "ضماني",
  "Get In Touch": "تواصل معي",
  "WhatsApp:": "واتساب:",
  "— Design & Development. All rights reserved. | Riyadh, Saudi Arabia": "— التصميم والتطوير. جميع الحقوق محفوظة. | الرياض، المملكة العربية السعودية",
  "Chat with me on WhatsApp": "تحدّث معي عبر واتساب",
  "Online now": "متصل الآن",
  "👋 Hi there! How can I help you today?": "👋 مرحباً! كيف يمكنني مساعدتك اليوم؟",
  "Feel free to ask about any of my services or pricing.": "لا تتردد في السؤال عن أي من خدماتي أو الأسعار.",
  "Start Chat on WhatsApp": "ابدأ المحادثة عبر واتساب",
  "MFD Solutions — Design & Development": "MFD Solutions — التصميم والتطوير",
  "MFD Solutions — complete IT services: web, mobile, cloud, AI, cybersecurity and design.": "MFD Solutions — خدمات تقنية متكاملة: ويب وجوال وسحابة وذكاء اصطناعي وأمن سيبراني وتصميم."
};

const normKey = s => s.replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const AR = {};
Object.keys(AR_TEXT).forEach(k => { AR[normKey(k)] = AR_TEXT[k]; });

function tr(en, lang) {
  lang = lang || currentLang;
  const hit = lang === 'ar' ? AR[normKey(en)] : null;
  return hit !== undefined && hit !== null ? hit : en;
}

// remember the original English of every translatable element
document.querySelectorAll('[data-i18n]').forEach(el => { el.setAttribute('data-en', el.innerHTML); });
document.querySelectorAll('[data-i18n-attrs]').forEach(el => {
  el.getAttribute('data-i18n-attrs').split(',').forEach(a => {
    const v = el.getAttribute(a);
    if (v !== null) el.setAttribute('data-en-' + a, v);
  });
});
const EN_TITLE = document.title;
const metaDesc = document.querySelector('meta[name="description"]');
const EN_DESC = metaDesc ? metaDesc.getAttribute('content') : '';

function translateEl(el) { el.innerHTML = tr(el.getAttribute('data-en')); }

function setCarouselArrows() {
  const rtl = currentLang === 'ar';
  const prev = rtl ? '›' : '‹';
  const next = rtl ? '‹' : '›';
  ['prevSlide', 'prevTestimonial'].forEach(id => { const b = document.getElementById(id); if (b) b.textContent = prev; });
  ['nextSlide', 'nextTestimonial'].forEach(id => { const b = document.getElementById(id); if (b) b.textContent = next; });
}

function relabelHeroDots() {
  Array.from(dotsContainer.children).forEach((dot, i) => {
    dot.setAttribute('aria-label', `${UI[currentLang].slide} ${i + 1}`);
  });
}

function updateLanguage(lang, persist) {
  currentLang = lang === 'ar' ? 'ar' : 'en';
  const isAr = currentLang === 'ar';
  const root = document.documentElement;
  root.lang = currentLang;
  root.dir = isAr ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach(translateEl);
  document.querySelectorAll('[data-i18n-attrs]').forEach(el => {
    el.getAttribute('data-i18n-attrs').split(',').forEach(a => {
      const en = el.getAttribute('data-en-' + a);
      if (en !== null) el.setAttribute(a, tr(en));
    });
  });

  document.title = tr(EN_TITLE);
  if (metaDesc) metaDesc.setAttribute('content', tr(EN_DESC));

  languageToggle.textContent = UI[currentLang].toggleLabel;
  languageToggle.setAttribute('aria-label', UI[currentLang].toggleAria);
  languageToggle.setAttribute('aria-pressed', isAr ? 'true' : 'false');

  setCarouselArrows();
  relabelHeroDots();
  updateTestimonialCarousel();   // re-measure + flip direction

  if (persist !== false) {
    try { localStorage.setItem(LANG_KEY, currentLang); } catch (e) {}
  }
}

languageToggle.addEventListener('click', () => {
  updateLanguage(currentLang === 'en' ? 'ar' : 'en');
});

// ================= HERO CAROUSEL =================
const slides = document.querySelectorAll('.carousel-slide');
const dotsContainer = document.getElementById('carouselDots');
let currentSlide = 0;
let slideInterval;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `${UI[currentLang].slide} ${i+1}`);
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dotsContainer.children[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dotsContainer.children[currentSlide].classList.add('active');
  resetInterval();
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }
function resetInterval() { clearInterval(slideInterval); slideInterval = setInterval(nextSlide, 7000); }

document.getElementById('nextSlide').addEventListener('click', nextSlide);
document.getElementById('prevSlide').addEventListener('click', prevSlide);
resetInterval();

// ================= HEADER SCROLL =================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ================= MOBILE MENU =================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.textContent = isOpen ? '✕' : '☰';
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

// ================= SCROLL REVEAL =================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ================= SCROLL PROGRESS =================
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = progress + '%';
});

// ================= CURSOR GLOW =================
const cursorGlow = document.getElementById('cursorGlow');
if (window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });
} else {
  cursorGlow.style.display = 'none';
}

// ================= COUNTER ANIMATION =================
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'));
      let current = 0;
      const duration = 2000;
      const stepTime = 16;
      const steps = duration / stepTime;
      const increment = target / steps;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, stepTime);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ================= FAQ ACCORDION =================
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!wasActive) item.classList.add('active');
  });
});

// ================= TESTIMONIALS CAROUSEL =================
const track = document.getElementById('testimonialsTrack');
const cards = track.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');
const dotsContainerT = document.getElementById('testimonialDots');

let currentTestimonial = 0;
let visibleCards = 3;
let maxIndex = 0;

function getVisibleCards() {
  if (window.innerWidth <= 720) return 1;
  if (window.innerWidth <= 1000) return 2;
  return 3;
}

function updateTestimonialCarousel() {
  visibleCards = getVisibleCards();
  maxIndex = Math.max(0, cards.length - visibleCards);
  
  if (currentTestimonial > maxIndex) currentTestimonial = maxIndex;
  
  const cardWidth = cards[0].offsetWidth + 28;
  const sign = document.documentElement.dir === 'rtl' ? 1 : -1;   // RTL tracks grow to the left
  track.style.transform = `translateX(${sign * currentTestimonial * cardWidth}px)`;
  
  prevBtn.disabled = currentTestimonial === 0;
  nextBtn.disabled = currentTestimonial >= maxIndex;
  
  dotsContainerT.innerHTML = '';
  for (let i = 0; i <= maxIndex; i++) {
    const dot = document.createElement('button');
    dot.className = 'testimonial-dot' + (i === currentTestimonial ? ' active' : '');
    dot.setAttribute('aria-label', `${UI[currentLang].testimonialGroup} ${i+1}`);
    dot.addEventListener('click', () => {
      currentTestimonial = i;
      updateTestimonialCarousel();
    });
    dotsContainerT.appendChild(dot);
  }
}

prevBtn.addEventListener('click', () => {
  if (currentTestimonial > 0) {
    currentTestimonial--;
    updateTestimonialCarousel();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentTestimonial < maxIndex) {
    currentTestimonial++;
    updateTestimonialCarousel();
  }
});

window.addEventListener('resize', updateTestimonialCarousel);
setTimeout(updateTestimonialCarousel, 100);

// ================= CONTACT FORM =================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;
  
  ['name','email','message'].forEach(id => {
    const group = document.getElementById(id).parentElement;
    const input = document.getElementById(id);
    group.classList.remove('error');
    if (id === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        group.classList.add('error');
        valid = false;
      }
    } else if (!input.value.trim()) {
      group.classList.add('error');
      valid = false;
    }
  });
  
  if (!valid) return;
  
  const btnText = submitBtn.querySelector('.btn-text');
  submitBtn.classList.add('loading');
  btnText.textContent = UI[currentLang].sending;
  
  setTimeout(() => {
    submitBtn.classList.remove('loading');
    translateEl(btnText);   // restore the (translated) button label
    formStatus.className = 'form-status show success';
    formStatus.textContent = UI[currentLang].sent;
    contactForm.reset();
    setTimeout(() => { formStatus.className = 'form-status'; }, 5000);
  }, 1500);
});

// ================= NEWSLETTER =================
const newsletterForm = document.getElementById('newsletterForm');
const newsletterStatus = document.getElementById('newsletterStatus');

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('newsletterEmail').value;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newsletterStatus.className = 'newsletter-status show success';
    newsletterStatus.textContent = UI[currentLang].subscribed;
    newsletterForm.reset();
  } else {
    newsletterStatus.className = 'newsletter-status show error';
    newsletterStatus.textContent = UI[currentLang].badEmail;
  }
  setTimeout(() => { newsletterStatus.className = 'newsletter-status'; }, 4000);
});

// ================= BACK TO TOP =================
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 600);
});
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ================= WHATSAPP CHAT POPUP =================
const waChatPopup = document.getElementById('waChatPopup');
const waChatClose = document.getElementById('waChatClose');
const whatsappFloat = document.getElementById('whatsappFloat');

setTimeout(() => { waChatPopup.classList.add('show'); }, 6000);

waChatClose.addEventListener('click', () => {
  waChatPopup.classList.remove('show');
});

whatsappFloat.addEventListener('mouseenter', () => {
  waChatPopup.classList.add('show');
});

// ================= ACTIVE NAV ON SCROLL =================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a:not(.nav-cta)');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navItems.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

sections.forEach(s => navObserver.observe(s));

// ================= INITIAL LANGUAGE =================
(function initLanguage() {
  let lang = 'en';
  try {
    const q = new URLSearchParams(location.search).get('lang');
    lang = (q === 'ar' || q === 'en') ? q : (localStorage.getItem(LANG_KEY) || 'en');
  } catch (e) {}
  updateLanguage(lang, false);
})();
