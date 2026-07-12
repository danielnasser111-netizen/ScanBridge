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
translations.ar.navImpact = 'الأثر والتجربة';
translations.ar.aboutEyebrow = 'كيف بدأت ScanBridge؟';
translations.ar.aboutTitle = 'بدأت برحلة مخيفة ومن دون مكان واضح للذهاب إليه.';
translations.ar.aboutText = 'بدأ مشروع ScanBridge بعد أن كاد فتى أن يفقد والده أثناء قيادتهما بعيداً عن المنزل. في لحظة مخيفة، لم يعرفا بسرعة إلى أين يذهبان أو أي مستشفى يمكنه المساعدة. جعل عدم اليقين كل شيء أصعب. بُني ScanBridge لمساعدة العائلات في العثور على خطوة تالية أوضح في المواقف العاجلة أو المربكة، من دون أن يحل محل خدمات الطوارئ أو الأطباء.';

function setLanguage(language) {
  const dictionary = translations[language];
  document.documentElement.lang = language === 'ar' ? 'ar' : 'en';
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = language === 'ar' ? dictionary[key] : element.dataset.original;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    element.placeholder = language === 'ar' ? dictionary[key] : element.dataset.originalPlaceholder;
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

feedbackButtons.forEach((button) => {
  button.addEventListener('click', () => dialog.showModal());
});

closeButton.addEventListener('click', () => dialog.close());

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

feedbackForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const feedback = Object.fromEntries(new FormData(feedbackForm));
  const existing = JSON.parse(localStorage.getItem('scanbridge-feedback') || '[]');
  existing.push({ ...feedback, submittedAt: new Date().toISOString() });
  localStorage.setItem('scanbridge-feedback', JSON.stringify(existing));
  feedbackForm.reset();
  status.textContent = 'Thank you — your feedback has been saved on this device for this early prototype.';
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
