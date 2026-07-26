const scanbridgeChatbot = document.createElement('script'); scanbridgeChatbot.src = 'chatbot.js'; document.head.append(scanbridgeChatbot);
const dialog = document.querySelector('.feedback-dialog');
const feedbackButtons = document.querySelectorAll('[data-open-feedback]');
const closeButton = document.querySelector('[data-close-feedback]');
const feedbackForm = document.querySelector('#feedback-form');
const status = document.querySelector('.form-status');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const languageToggle = document.querySelector('.language-toggle');
const themeToggle = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-label');

const translations = {
  ar: {
    menu: 'القائمة', navGuides: 'أدلة الفحوصات', navCenter: 'ابحث عن مركز', navEmergency: 'بطاقة الطوارئ', navAbout: 'عن المشروع', shareFeedback: 'شاركنا رأيك',
    heroEyebrow: 'التصوير الطبي، بشكل أوضح وأقل قلقاً', heroTitle: 'افهم الفحص. واستعد لما بعده بثقة.', heroIntro: 'يساعد ScanBridge العائلات في لبنان على الاستعداد للتصوير الطبي، والعثور على مراكز موثوقة للاتصال بها، وطرح أسئلة أفضل في كل خطوة.', exploreGuides: 'استكشف أدلة الفحوصات', findCenter: 'ابحث عن مركز', heroNote: 'معلومات واضحة للمرضى والعائلات. وليست تشخيصاً.',
    pathTitle: 'خطوات الاستعداد', understand: 'افهم', understandText: 'تعرّف إلى الفحص وسبب طلبه.', prepare: 'استعد', prepareText: 'اعرف ما الذي تحضره وتسأل عنه وتتوقعه.', followUp: 'تابع', followUpText: 'نظّم التقارير وجهّز أسئلتك للطبيب.',
    lebanon: 'مصمم للبنان', lebanonText: 'معلومات وصول محلية، بدءاً من بيروت.', family: 'مناسب للعائلات', familyText: 'لغة بسيطة للمرضى ومقدمي الرعاية.', safetyFirst: 'السلامة أولاً', safetyFirstText: 'لا تشخيص ولا قراءة صور ولا نصائح علاجية.',
    guidesEyebrow: 'أدلة ScanPrep', guidesTitle: 'أدلة قصيرة وواضحة للحظات ما قبل الفحص.', guidesText: 'نبني قوائم عملية تحوّل عدم اليقين إلى خطوة تالية بسيطة.', firstGuide: 'الدليل الأول قريباً', ultrasound: 'الألتراساوند', ultrasoundText: 'ما الذي تتوقعه، وهل تحتاج إلى تحضير، وما الأسئلة التي تستحق طرحها.', tellUs: 'أخبرنا بما تريد معرفته', xray: 'الأشعة السينية', xrayText: 'دليل قصير للاستعداد، وما يحدث في الغرفة، وما الذي تحضره.', comingSoon: 'قريباً', ctText: 'التحضير، وأسئلة الصبغة، وطرق بسيطة للشعور بجاهزية أكبر.',
    centerEyebrow: 'ابحث عن مركز', centerTitle: 'لا ينبغي أن يبدأ البحث عن فحص بعشرات الاتصالات المربكة.', centerText: 'سيساعدك دليلنا في العثور على مراكز التصوير حسب الموقع ونوع الفحص، مع تواريخ تحقق واضحة لمعرفة آخر تحديث للمعلومات.', recommendCenter: 'اقترح مركزاً لإضافته', search: 'ابحث عن نوع فحص أو مدينة', directoryProgress: 'الدليل قيد الإعداد', directoryText: 'تُضاف المراكز الأولى التي تم التحقق منها.',
    emergencyEyebrow: 'بطاقة الاستعداد للطوارئ', emergencyTitle: 'حين يبدو الأمر عاجلاً، قد تساعد قائمة قصيرة.', emergencyText: 'ستساعد بطاقتنا القادمة العائلات في جمع المعلومات المهمة قبل التوجه إلى الرعاية العاجلة أو قسم الطوارئ: الأدوية، والحساسية، والأعراض، والتقارير السابقة، والأسئلة.', callout: 'إذا كنت تعتقد أن شخصاً ما قد يمر بحالة طبية طارئة، اتصل بخدمات الطوارئ المحلية أو توجّه إلى أقرب قسم طوارئ الآن.', bring: 'أحضر ما تستطيع', bringId: 'الهوية ومعلومات التأمين', bringMedication: 'قائمة الأدوية والحساسية', bringReports: 'التقارير السابقة أو صور الفحوصات', bringSymptoms: 'وقت بدء الأعراض', shapeTool: 'ساعد في تطوير هذه الأداة',
    aboutEyebrow: 'لماذا يوجد ScanBridge؟', aboutTitle: 'التصوير الطبي مهم. وفهم مراحله لا يجب أن يكون صعباً.', aboutText: 'ScanBridge مشروع شبابي للتوجيه الصحي، بُني ليجعل رحلة التصوير أسهل للفهم والاستعداد والمتابعة. إنه يدعم الحديث مع المختصين الصحيين، ولا يحل محلهم أبداً.', readSafety: 'اقرأ التزامنا بالسلامة',
    feedbackEyebrow: 'ابنِ هذا معنا', feedbackTitle: 'ما أكثر ما يسبب لك الحيرة عند إجراء فحص؟', feedbackText: 'رأيك يساعدنا في تحديد ما نبنيه أولاً. ولن يستغرق ذلك أكثر من دقيقة.', safetyTitle: 'التزامنا بالسلامة', safetyText: 'يوفر ScanBridge معلومات عامة للتثقيف والتوجيه. لا يشخّص الحالات الصحية، ولا يفسّر الصور أو التقارير، ولا يوصي بالعلاج، ولا يحل محل الطبيب أو خدمات الطوارئ. عند وجود أعراض عاجلة أو قلق فوري، اطلب الرعاية الطبية بسرعة.', tagline: 'افهم. استعد. تابع.',
    perspective: 'رأيك مهم', helpBuild: 'ساعدنا في بناء ScanBridge.', formPrompt: 'ما الذي سيجعل الاستعداد للفحص أسهل لك أو لعائلتك؟', formRole: 'أشارك الرأي بصفتي…', patient: 'مريض أو فرد من العائلة', student: 'طالب', healthcare: 'مختص صحي', other: 'أخرى', yourFeedback: 'رأيك', placeholder: 'مثال: لا أعرف أبداً إن كان يجب أن أصوم قبل فحص الألتراساوند.', consent: 'أفهم أن هذه الاستمارة ليست للحصول على نصيحة طبية أو لحالات الطوارئ.', sendFeedback: 'أرسل رأيك'
  }
};

translations.ar.openDirectory = 'ابحث في الدليل ←';
translations.ar.navImpact = 'الإطلاق والأثر';
translations.ar.privacy = 'الخصوصية';
translations.ar.terms = 'الشروط';
translations.ar.contact = 'تواصل معنا';
translations.ar.feedbackEyebrow = 'ساعدنا على التحسين';
translations.ar.feedbackTitle = 'ما الذي سيجعل استخدام ScanBridge أوضح أو أكثر أماناً؟';
translations.ar.feedbackText = 'تساعدنا ملاحظاتك على تحسين الخدمة العامة. لن تستغرق أكثر من دقيقة.';
translations.ar.helpBuild = 'ساعدنا على تحسين ScanBridge.';
translations.ar.directoryProgress = '58 إدراجاً';
translations.ar.firstGuide = 'ابدأ بدليل واضح';
translations.ar.centerText = 'استخدم الدليل التجريبي لاستكشاف مراكز التصوير حسب الموقع ونوع الفحص. توضّح كل بطاقة حالة مصدرها كي تعرف ما يجب تأكيده بالاتصال.';
translations.ar.directoryProgress = '58 إدراجاً تجريبياً';
translations.ar.directoryText = 'تحقّق من حالة مصدر كل إدراج وأكّد المعلومات بالاتصال.';
translations.ar.emergencyText = 'تساعد بطاقة الطوارئ العائلات على جمع المعلومات المهمة قبل التوجه إلى الرعاية العاجلة أو قسم الطوارئ: الأدوية والحساسية والأعراض والتقارير السابقة والأسئلة.';
translations.ar.callout = 'إذا اعتقدت أن شخصاً ما قد يمر بحالة طبية طارئة، اتصل بالصليب الأحمر اللبناني على 140 أو توجّه إلى أقرب قسم طوارئ الآن.';
translations.ar.consent = 'لن أدرج أسماء أو بيانات اتصال أو أعراضاً أو تقارير أو صوراً أو أموراً عاجلة. هذه الاستمارة ليست للنصيحة الطبية أو للطوارئ.';
translations.ar.aboutEyebrow = 'كيف بدأت ScanBridge؟';
translations.ar.aboutTitle = 'بدأت برحلة مخيفة ومن دون مكان واضح للذهاب إليه.';
translations.ar.aboutText = 'بدأ مشروع ScanBridge بعد أن كاد فتى أن يفقد والده أثناء قيادتهما بعيداً عن المنزل. في لحظة مخيفة، لم يعرفا بسرعة إلى أين يذهبان أو أي مستشفى يمكنه المساعدة. جعل عدم اليقين كل شيء أصعب. بُني ScanBridge لمساعدة العائلات في العثور على خطوة تالية أوضح في المواقف العاجلة أو المربكة، من دون أن يحل محل خدمات الطوارئ أو الأطباء.';

Object.assign(translations.ar, {
  heroEyebrow: 'للمرضى والعائلات في لبنان',
  heroTitle: 'التصوير الطبي، بطريقة أسهل للفهم.',
  heroIntro: 'استعد للفحص، وابحث عن مركز، واعرف ما الذي تسأل عنه — بمعلومات واضحة بالعربية والإنجليزية.',
  exploreGuides: 'استعد للفحص',
  urgentHelp: 'هل الحالة عاجلة؟',
  urgentHelpText: 'اتصل بالصليب الأحمر اللبناني على 140 أو توجّه إلى أقرب قسم طوارئ.',
  heroLive: 'ScanBridge متاح الآن',
  chooseNeed: 'ما الذي تحتاج إليه الآن؟',
  scanPrepAction: 'استعد للفحص',
  scanPrepActionText: 'أدلة بسيطة للأشعة السينية وCT وMRI والألتراساوند وغيرها.',
  directoryAction: 'ابحث عن مركز تصوير',
  directoryActionText: 'ابحث بحسب المدينة ونوع الفحص والموقع.',
  emergencyAction: 'أنشئ بطاقة طوارئ',
  emergencyActionText: 'اجمع الأدوية والحساسية والمعلومات المهمة في مكان واحد.',
  miloReady: 'ميلو جاهز لإرشادك.',
  miloReadyText: 'افتح الدليل الودود في الزاوية عندما تحتاج إلى مساعدة في استخدام ScanBridge.',
  lebanonText: 'معلومات وصول محلية للمرضى والعائلات.',
  languageTrust: 'العربية + الإنجليزية',
  languageTrustText: 'غيّر اللغة والمظهر في أي وقت.',
  safetyFirstText: 'تثقيف وتوجيه — وليس تشخيصاً.',
  prepareLabel: 'استعد',
  guidesTitle: 'اعرف ما سيحدث قبل موعدك.',
  guidesText: 'اختر فحصك لشرح قصير عن التحضير ومادة التباين وما يحدث داخل الغرفة والأسئلة التي يمكنك طرحها.',
  xrayText: 'ما الذي ترتديه وتحضره وتتوقعه.',
  ultrasoundText: 'الصيام والماء وما الذي يحدث.',
  ctText: 'التحضير والضوضاء ومادة التباين.',
  contrastIncluded: 'شرح مادة التباين أولاً',
  allGuides: 'شاهد كل أدلة الفحوصات',
  findLabel: 'ابحث',
  centerTitle: 'ابحث في دليل مراكز التصوير في لبنان من دون تخمين.',
  centerText: 'صفِّ المراكز بحسب المنطقة ونوع الفحص، واستخدم موقعك لترتيب الخيارات القريبة، واطّلع على الخدمات المعلنة. أكّد التفاصيل مباشرة قبل الزيارة.',
  directoryStatListings: 'إدراجاً للمرافق',
  directoryStatListingsText: 'في عدة مناطق لبنانية',
  directoryStatLocation: 'ترتيب حسب القرب',
  directoryStatLocationText: 'عندما تختار مشاركة موقعك',
  directoryStatServices: 'فلاتر للفحوصات',
  directoryStatServicesText: 'لتضييق القائمة بسرعة',
  openDirectory: 'ابحث في الدليل',
  directoryPreview: 'معاينة دليل المراكز',
  nearMe: 'قربي',
  exampleCenter: 'مركز تصوير',
  exampleCenterText: 'المنطقة · MRI · CT · أشعة سينية',
  exampleCenterTextTwo: 'المنطقة · ألتراساوند · تصوير الثدي',
  readyLabel: 'كن مستعداً',
  emergencyTitle: 'اجمع المعلومات المهمة عندما يكون الوقت مهماً.',
  emergencyText: 'أنشئ بطاقة خاصة تضم الأدوية والحساسية والأعراض والتقارير السابقة ورقم شخص للطوارئ. يمكنك تنزيلها أو طباعتها أو مشاركتها برمز QR.',
  shapeTool: 'أنشئ بطاقة الطوارئ',
  emergencyCardLabel: 'بطاقة الاستعداد للطوارئ',
  medicationsLabel: 'الأدوية',
  allergiesLabel: 'الحساسية',
  symptomsLabel: 'الأعراض الأساسية',
  contactLabel: 'شخص للطوارئ',
  readyToAdd: 'جاهز للإضافة',
  notProvidedLabel: 'غير متوفر',
  family: 'مصمم للعائلات',
  familyText: 'لغة بسيطة وخطوات عملية.',
  seeImpact: 'اطّلع على أثر ScanBridge',
  feedbackEyebrow: 'ساعدنا على التحسين',
  feedbackTitle: 'ما الذي سيجعل ScanBridge أوضح أو أكثر أماناً؟',
  feedbackText: 'تساعد ملاحظاتك على تحسين هذه الخدمة العامة. من فضلك لا ترسل معلومات طبية خاصة أو أموراً عاجلة.',
  mobileHeroIntro: 'أدلة للفحوصات، ومراكز قريبة، وبطاقة للطوارئ — خطوة واضحة واحدة.',
  quickTools: 'افتح الأدوات السريعة',
  miloPointer: 'تحتاج مساعدة؟ اسأل ميلو',
  mobileGuidesTitle: 'ما الذي ترتديه وتحضره وتتوقعه.',
  mobileGuidesSubtitle: 'اعرف ما سيحدث قبل موعد الفحص.',
  mobileDirectoryTitle: 'ابحث عن مركز تصوير.',
  mobileDirectorySubtitle: 'اضغط على الباحث للبحث بحسب الفحص أو المدينة أو الأقرب إليك.',
  mobileEmergencyTitle: 'أنشئ بطاقة طوارئ خلال ثوانٍ.',
  mobileEmergencySubtitle: 'ابدأ بـ «غير متوفر». غيّر فقط المعلومات التي تعرفها، ثم احفظ البطاقة أو شاركها.',
  mobileEmergencyDefaults: 'تبدأ الحقول بخيار «غير متوفر».',
  mobileFeedbackTitle: 'ساعد في جعل ScanBridge أوضح.'
});

function setLanguage(language) {
  const dictionary = translations[language];
  document.documentElement.lang = language === 'ar' ? 'ar' : 'en';
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  const heroLocale = language === 'ar' ? 'Ar' : 'En';
  const mobileHeroSource = document.querySelector('[data-mobile-hero-source]');
  const mobileHeroImage = document.querySelector('[data-mobile-hero-image]');
  if (mobileHeroSource) mobileHeroSource.srcset = mobileHeroSource.dataset[`src${heroLocale}`];
  if (mobileHeroImage) mobileHeroImage.src = mobileHeroImage.dataset[`src${heroLocale}`];
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = language === 'ar' ? (dictionary[key] || element.dataset.original) : element.dataset.original;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    element.placeholder = language === 'ar' ? (dictionary[key] || element.dataset.originalPlaceholder) : element.dataset.originalPlaceholder;
  });
  languageToggle.textContent = language === 'ar' ? 'English' : 'العربية';
  languageToggle.setAttribute('aria-label', language === 'ar' ? 'Switch to English' : 'Switch to Arabic');
  const isDark = document.body.classList.contains('dark-mode');
  themeLabel.textContent = language === 'ar' ? (isDark ? 'فاتح' : 'داكن') : (isDark ? 'Light' : 'Dark');
  localStorage.setItem('scanbridge-language', language);
}

function setTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Use light mode' : 'Use dark mode');
  themeLabel.textContent = document.documentElement.lang === 'ar' ? (isDark ? 'فاتح' : 'داكن') : (isDark ? 'Light' : 'Dark');
  localStorage.setItem('scanbridge-theme', theme);
}

document.querySelectorAll('[data-i18n]').forEach((element) => { element.dataset.original = element.textContent; });
document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => { element.dataset.originalPlaceholder = element.placeholder; });
setLanguage(localStorage.getItem('scanbridge-language') || 'en');
setTheme(localStorage.getItem('scanbridge-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

languageToggle.addEventListener('click', () => setLanguage(document.documentElement.lang === 'ar' ? 'en' : 'ar'));
themeToggle.addEventListener('click', () => setTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark'));

const mobileToolsToggle = document.querySelector('[data-mobile-tools-toggle]');
const mobileToolsPanel = document.querySelector('#mobile-tools-panel');
const mobileLandingQuery = window.matchMedia('(max-width: 600px)');
const watchMedia = (query, callback) => query.addEventListener ? query.addEventListener('change', callback) : query.addListener(callback);

function closeMobileTools() {
  if (!mobileToolsToggle || !mobileToolsPanel) return;
  mobileToolsToggle.setAttribute('aria-expanded', 'false');
  mobileToolsPanel.hidden = true;
}

if (mobileToolsToggle && mobileToolsPanel) {
  mobileToolsToggle.addEventListener('click', () => {
    const willOpen = mobileToolsPanel.hidden;
    mobileToolsPanel.hidden = !willOpen;
    mobileToolsToggle.setAttribute('aria-expanded', String(willOpen));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !mobileToolsPanel.hidden) {
      closeMobileTools();
      mobileToolsToggle.focus();
    }
  });
  watchMedia(mobileLandingQuery, (event) => { if (!event.matches) closeMobileTools(); });
}

const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const landingRevealItems = document.querySelectorAll('.landing-band > .landing-shell, .hero-trust-strip, .home-safety > .landing-shell');
if (!reducedMotionQuery.matches && landingRevealItems.length && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });

  landingRevealItems.forEach((element) => element.classList.add('landing-reveal'));
  window.requestAnimationFrame(() => {
    document.body.classList.add('motion-ready');
    landingRevealItems.forEach((element) => revealObserver.observe(element));
  });
}

feedbackButtons.forEach((button) => {
  button.addEventListener('click', () => dialog.showModal());
});

closeButton.addEventListener('click', () => dialog.close());

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

feedbackForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const submit = feedbackForm.querySelector('[type="submit"]');
  if (location.protocol === 'file:' || location.hostname === 'localhost') {
    status.textContent = 'Feedback collection works on the published ScanBridge website. Please use the public site to send your response.';
    return;
  }
  submit.disabled = true;
  status.textContent = 'Sending your feedback…';
  try {
    const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(feedbackForm)).toString() });
    if (!response.ok) throw new Error('FORM_SUBMISSION_FAILED');
    feedbackForm.reset();
    status.textContent = 'Thank you — your feedback was sent to the ScanBridge team.';
  } catch {
    status.textContent = 'Your feedback could not be sent. Please try again from the published ScanBridge website.';
  } finally {
    submit.disabled = false;
  }
});

menuToggle.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

navigation.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const welcomeDialog = document.querySelector('.welcome-dialog');
if (welcomeDialog && localStorage.getItem('scanbridge-onboarding-complete') !== 'true') {
  let selectedLanguage = null;
  let selectedTheme = null;
  const continueButton = welcomeDialog.querySelector('.welcome-continue');

  const updateWelcome = () => {
    welcomeDialog.querySelectorAll('[data-welcome-language]').forEach((button) => {
      button.classList.toggle('is-selected', button.dataset.welcomeLanguage === selectedLanguage);
      button.setAttribute('aria-pressed', String(button.dataset.welcomeLanguage === selectedLanguage));
    });
    welcomeDialog.querySelectorAll('[data-welcome-theme]').forEach((button) => {
      button.classList.toggle('is-selected', button.dataset.welcomeTheme === selectedTheme);
      button.setAttribute('aria-pressed', String(button.dataset.welcomeTheme === selectedTheme));
    });
    continueButton.disabled = !(selectedLanguage && selectedTheme);
  };

  welcomeDialog.querySelectorAll('[data-welcome-language]').forEach((button) => {
    button.addEventListener('click', () => {
      selectedLanguage = button.dataset.welcomeLanguage;
      setLanguage(selectedLanguage);
      updateWelcome();
    });
  });
  welcomeDialog.querySelectorAll('[data-welcome-theme]').forEach((button) => {
    button.addEventListener('click', () => {
      selectedTheme = button.dataset.welcomeTheme;
      setTheme(selectedTheme);
      updateWelcome();
    });
  });
  continueButton.addEventListener('click', () => {
    localStorage.setItem('scanbridge-onboarding-complete', 'true');
    welcomeDialog.close();
  });
  updateWelcome();
  welcomeDialog.showModal();
}
