const scanbridgeChatbot = document.createElement('script');
scanbridgeChatbot.src = 'chatbot.js';
document.head.append(scanbridgeChatbot);

const emergencyStyle = document.createElement('style');
emergencyStyle.textContent = `
  .emergency-tool{padding:4rem 0 6rem}
  .emergency-tool h1{font-size:clamp(3rem,6vw,5rem)}
  .emergency-intro{max-width:740px;color:var(--ink-soft);font-size:1.1rem}
  .emergency-warning{display:flex;flex-wrap:wrap;gap:.75rem 1rem;align-items:center;margin:2rem 0 1rem;padding:1rem 1.2rem;border-left:4px solid var(--coral);background:#fff1eb;color:#774333}
  .emergency-warning strong{width:100%}
  .red-cross-call{display:inline-flex;align-items:center;min-height:44px;padding:.5rem .75rem;border-radius:.45rem;color:white;background:#a94439;font-weight:700;text-decoration:none}
  .privacy-note{max-width:800px;color:var(--ink-soft);font-size:.86rem}
  .card-form{max-width:900px;margin-top:2rem}
  .mobile-form-note,.field-toggle{display:none}
  .form-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem}
  .form-field{min-width:0}
  .form-field:first-child,.form-field:nth-child(3){grid-column:span 2}
  .form-field label{display:grid;gap:.35rem;font-size:.84rem;font-weight:700}
  .form-grid input,.form-grid textarea{width:100%;padding:.7rem;border:1px solid var(--line);border-radius:.45rem;color:var(--ink);background:transparent}
  .form-grid textarea{min-height:92px;resize:vertical}
  .card-form .consent{margin:1.2rem 0}
  .generated-card{max-width:900px;margin-top:3rem;padding:1.75rem;border:1px solid var(--line);border-radius:.8rem;background:white;box-shadow:var(--shadow)}
  .card-output-top{display:flex;justify-content:space-between;gap:1rem;border-bottom:1px solid var(--line)}
  .card-output-top h2{font-family:"DM Sans",sans-serif}
  .card-details{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin:1.4rem 0}
  .card-details div{padding:.75rem;border-radius:.5rem;background:var(--mint)}
  .card-details strong,.card-details span{display:block}
  .card-details strong{font-size:.78rem}
  .card-details span{margin-top:.18rem;color:var(--ink-soft);white-space:pre-wrap}
  .card-disclaimer{color:var(--ink-soft);font-size:.78rem}
  .export-tools{display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-top:1rem;padding-top:1rem;border-top:1px solid var(--line);color:var(--ink-soft);font-size:.84rem}
  .dark-mode .generated-card{background:#17363a}
  .dark-mode .emergency-warning{background:#4b302a;color:#ffe1d8}
  html[dir="rtl"] .emergency-warning{border-right:4px solid var(--coral);border-left:0}

  @media(max-width:760px){
    .emergency-tool{padding-top:2.5rem}
    .form-grid,.card-details{grid-template-columns:1fr}
    .form-field:first-child,.form-field:nth-child(3){grid-column:auto}
    .emergency-warning,.card-output-top,.export-tools{align-items:stretch;flex-direction:column}
  }

  @media(max-width:600px){
    .emergency-tool{padding-top:2rem;padding-bottom:4rem}
    .emergency-tool h1{max-width:12ch;font-size:clamp(2.35rem,11vw,3rem);line-height:1.03}
    .emergency-intro{font-size:.96rem;line-height:1.6}
    .emergency-warning{gap:.45rem;margin:1.35rem 0 .8rem;padding:.85rem;border-radius:.7rem;font-size:.82rem}
    .privacy-note{font-size:.74rem;line-height:1.55}
    .card-form{margin-top:1.25rem}
    .mobile-form-note{display:block;margin:0 0 .65rem;padding:.75rem .85rem;border:1px solid var(--line);border-radius:.7rem;color:var(--ink-soft);background:var(--mint);font-size:.78rem;line-height:1.5}
    .form-grid{display:block;overflow:hidden;border:1px solid var(--line);border-radius:.85rem;background:var(--paper);background:color-mix(in srgb,var(--paper) 82%,var(--mint))}
    .form-field{border-bottom:1px solid var(--line)}
    .form-field:last-child{border-bottom:0}
    .field-toggle{display:grid;grid-template-columns:1fr auto;gap:.75rem;align-items:center;width:100%;min-height:64px;padding:.65rem .8rem;border:0;color:var(--ink);background:transparent;cursor:pointer;text-align:start;touch-action:manipulation}
    .field-toggle:active{background:var(--mint)}
    .field-toggle-copy strong,.field-toggle-copy small{display:block}
    .field-toggle-copy strong{font-size:.84rem;line-height:1.3}
    .field-toggle-copy small{max-width:29ch;margin-top:.18rem;overflow:hidden;color:var(--ink-soft);font-size:.72rem;font-weight:500;line-height:1.35;text-overflow:ellipsis;white-space:nowrap}
    .field-toggle-action{display:inline-flex;align-items:center;justify-content:center;min-width:58px;min-height:36px;padding:.25rem .55rem;border:1px solid var(--line);border-radius:999px;color:var(--ink);background:var(--paper);font-size:.7rem;font-weight:800}
    .form-field label{display:none;padding:0 .8rem .8rem}
    .form-field.is-editing label{display:grid}
    .form-field.is-editing label>span{position:absolute;width:1px;height:1px;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}
    .form-grid input,.form-grid textarea{min-height:48px;padding:.75rem;font-size:16px;background:var(--paper)}
    .form-grid textarea{min-height:88px}
    .card-form>.consent{margin:1rem 0;font-size:.78rem;line-height:1.5}
    .card-form>.button{width:100%;min-height:52px}
    .generated-card{margin-top:2rem;padding:1rem;border-radius:.85rem}
    .card-details{gap:.55rem;margin:1rem 0}
    .card-details div{padding:.7rem}
    .dark-mode .form-grid{background:#17363a}
    .dark-mode .field-toggle-action,.dark-mode .form-grid input,.dark-mode .form-grid textarea{color:#e6f3ef;background:#10292c}
  }

  @media(prefers-reduced-motion:reduce){
    .field-toggle,.red-cross-call{transition:none}
  }

  @media print{
    .site-header,.emergency-tool>.eyebrow,.emergency-tool>h1,.emergency-intro,.emergency-warning,.privacy-note,.card-form,.card-output-top button,.export-tools{display:none!important}
    .emergency-tool{padding:0;width:100%}
    .generated-card{box-shadow:none;border:0;margin:0;padding:0}
    .generated-card[hidden]{display:none!important}
  }
`;
document.head.append(emergencyStyle);

const ui = {
  en: {
    home: 'Home', eyebrow: 'Emergency preparation card', title: 'A short card for a stressful moment.',
    intro: 'Gather important facts before you leave. It can help you communicate clearly with emergency or urgent-care staff.',
    warningTitle: 'If this may be an emergency, go now.',
    warningText: 'Do not wait to finish this card if someone has severe symptoms or you think they need urgent medical care.',
    redCross: 'Call Lebanese Red Cross: 140',
    privacy: 'This card stays in your browser. Downloading or printing creates a copy on your device; ScanBridge does not create share links containing these details.',
    quickIntro: 'Every answer starts as “Not provided.” Tap Change only where you have information.',
    person: 'Patient name', age: 'Age', symptoms: 'Main symptoms or concern', started: 'When did it start?',
    meds: 'Medications', allergies: 'Allergies', conditions: 'Important medical conditions',
    reports: 'Previous reports or scans available?', contact: 'Emergency contact', notes: 'Other notes for staff',
    change: 'Change', done: 'Done',
    consent: 'I understand this tool does not provide medical advice or replace emergency services.',
    generate: 'Generate card', cardEyebrow: 'For emergency or urgent-care staff', cardTitle: 'Emergency preparation card',
    edit: 'Edit', print: 'Print card', download: 'Download as photo',
    toolCopy: 'Save a local copy for a trusted person or care team.',
    cardDisclaimer: 'This card shares information supplied by the patient or family. It is not a diagnosis or medical instruction.',
    empty: 'Not provided'
  },
  ar: {
    home: 'الرئيسية', eyebrow: 'بطاقة الاستعداد للطوارئ', title: 'بطاقة قصيرة للحظات الصعبة.',
    intro: 'اجمع المعلومات المهمة قبل الذهاب. قد تساعدك على التواصل بوضوح مع فريق الطوارئ أو الرعاية العاجلة.',
    warningTitle: 'إذا كان الأمر طارئاً، اذهب الآن.',
    warningText: 'لا تنتظر إنهاء هذه البطاقة إذا كانت لدى شخص أعراض شديدة أو كنت تعتقد أنه يحتاج إلى رعاية طبية عاجلة.',
    redCross: 'اتصل بالصليب الأحمر اللبناني: 140',
    privacy: 'تبقى هذه البطاقة داخل متصفحك. يؤدي التنزيل أو الطباعة إلى إنشاء نسخة على جهازك؛ لا ينشئ ScanBridge روابط مشاركة تحتوي على هذه التفاصيل.',
    quickIntro: 'تبدأ كل الإجابات بـ «غير متوفر». اضغط على تعديل فقط حيث تتوفر لديك معلومات.',
    person: 'اسم المريض', age: 'العمر', symptoms: 'الأعراض الرئيسية أو سبب القلق', started: 'متى بدأت؟',
    meds: 'الأدوية', allergies: 'الحساسية', conditions: 'حالات طبية مهمة',
    reports: 'هل تتوفر تقارير أو صور سابقة؟', contact: 'جهة اتصال للطوارئ', notes: 'ملاحظات أخرى للفريق',
    change: 'تعديل', done: 'تم',
    consent: 'أفهم أن هذه الأداة لا تقدم نصيحة طبية ولا تحل محل خدمات الطوارئ.',
    generate: 'أنشئ البطاقة', cardEyebrow: 'لفريق الطوارئ أو الرعاية العاجلة', cardTitle: 'بطاقة الاستعداد للطوارئ',
    edit: 'تعديل', print: 'اطبع البطاقة', download: 'تنزيل كصورة',
    toolCopy: 'احفظ نسخة محلية لشخص موثوق أو لفريق الرعاية.',
    cardDisclaimer: 'تشارك هذه البطاقة معلومات أدخلها المريض أو العائلة. وليست تشخيصاً أو تعليمات طبية.',
    empty: 'غير متوفر'
  }
};

let language = localStorage.getItem('scanbridge-language') || 'en';
let lastCardData = null;

const $ = (selector) => document.querySelector(selector);
const form = $('#card-form');
const lang = $('.language-toggle');
const theme = $('.theme-toggle');
const themeLabel = $('.theme-label');
const mobileFormQuery = matchMedia('(max-width: 600px)');
const watchMedia = (query, callback) => query.addEventListener ? query.addEventListener('change', callback) : query.addListener(callback);
const fields = [
  ['person', 'name'], ['age', 'age'], ['symptoms', 'symptoms'], ['started', 'started'],
  ['meds', 'medications'], ['allergies', 'allergies'], ['conditions', 'conditions'],
  ['reports', 'reports'], ['contact', 'contact'], ['notes', 'notes']
];

function setTheme(value) {
  const dark = value === 'dark';
  document.body.classList.toggle('dark-mode', dark);
  theme.setAttribute('aria-pressed', String(dark));
  themeLabel.textContent = language === 'ar' ? (dark ? 'فاتح' : 'داكن') : (dark ? 'Light' : 'Dark');
  localStorage.setItem('scanbridge-theme', value);
}

function refreshFieldSummary(field) {
  const text = ui[language];
  const control = field.querySelector('input, textarea');
  field.querySelector('.field-toggle-label').textContent = text[field.dataset.labelKey];
  field.querySelector('.field-toggle-value').textContent = control.value.trim() || text.empty;
  field.querySelector('.field-toggle-action').textContent = field.classList.contains('is-editing') ? text.done : text.change;
}

function refreshFieldSummaries() {
  document.querySelectorAll('.form-field').forEach(refreshFieldSummary);
}

function enhanceMobileForm() {
  const labels = [...document.querySelectorAll('.form-grid > label')];
  labels.forEach((label, index) => {
    const [labelKey, fieldName] = fields[index];
    const control = label.querySelector('input, textarea');
    const field = document.createElement('div');
    const toggle = document.createElement('button');
    const copy = document.createElement('span');
    const labelText = document.createElement('strong');
    const valueText = document.createElement('small');
    const action = document.createElement('span');

    field.className = 'form-field';
    field.dataset.labelKey = labelKey;
    toggle.className = 'field-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', 'false');
    control.id = `emergency-field-${fieldName}`;
    toggle.setAttribute('aria-controls', control.id);
    copy.className = 'field-toggle-copy';
    labelText.className = 'field-toggle-label';
    valueText.className = 'field-toggle-value';
    action.className = 'field-toggle-action';
    copy.append(labelText, valueText);
    toggle.append(copy, action);
    label.before(field);
    field.append(toggle, label);

    toggle.addEventListener('click', () => {
      const willOpen = !field.classList.contains('is-editing');
      document.querySelectorAll('.form-field.is-editing').forEach((openField) => {
        if (openField !== field) {
          openField.classList.remove('is-editing');
          openField.querySelector('.field-toggle').setAttribute('aria-expanded', 'false');
          refreshFieldSummary(openField);
        }
      });
      field.classList.toggle('is-editing', willOpen);
      toggle.setAttribute('aria-expanded', String(willOpen));
      refreshFieldSummary(field);
      if (willOpen) requestAnimationFrame(() => control.focus());
    });
    control.addEventListener('input', () => refreshFieldSummary(field));
  });
}

function syncMobileFormMode() {
  form.elements.symptoms.required = !mobileFormQuery.matches;
  if (!mobileFormQuery.matches) {
    document.querySelectorAll('.form-field.is-editing').forEach((field) => {
      field.classList.remove('is-editing');
      field.querySelector('.field-toggle').setAttribute('aria-expanded', 'false');
    });
  }
  refreshFieldSummaries();
}

function render() {
  const text = ui[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-ui]').forEach((element) => { element.textContent = text[element.dataset.ui]; });
  lang.textContent = language === 'ar' ? 'English' : 'العربية';
  refreshFieldSummaries();
}

function showCard(data, scroll = true) {
  lastCardData = data;
  const text = ui[language];
  const details = $('#card-details');
  details.replaceChildren();
  fields.forEach(([label, key]) => {
    const item = document.createElement('div');
    const heading = document.createElement('strong');
    const value = document.createElement('span');
    heading.textContent = text[label];
    value.textContent = data[key] || text.empty;
    item.append(heading, value);
    details.append(item);
  });
  $('#card-output').hidden = false;
  if (scroll) $('#card-output').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
}

function wrap(text, max) {
  const words = (text || 'Not provided').split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    if ((`${line} ${word}`).length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function escapeXml(text) {
  return String(text).replace(/[<>&"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[char]));
}

function downloadPhoto() {
  if (!lastCardData) return;
  const text = ui[language];
  const rtl = language === 'ar';
  const width = 1200;
  const entries = fields.flatMap(([label, key]) => [[text[label], ...wrap(lastCardData[key] || text.empty, rtl ? 48 : 62)]]);
  const height = Math.max(900, 300 + entries.length * 44);
  let y = 155;
  let body = '';
  for (const [label, ...lines] of entries) {
    body += `<text x="${rtl ? 1130 : 70}" y="${y}" text-anchor="${rtl ? 'end' : 'start'}" font-size="21" font-weight="700" fill="#ef795e">${escapeXml(label)}</text>`;
    y += 32;
    for (const line of lines) {
      body += `<text x="${rtl ? 1130 : 70}" y="${y}" text-anchor="${rtl ? 'end' : 'start'}" font-size="25" fill="#173c3e">${escapeXml(line)}</text>`;
      y += 34;
    }
    y += 18;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#fffdf8"/><rect x="45" y="35" width="1110" height="${height - 70}" rx="24" fill="#ffffff" stroke="#d8e2dc" stroke-width="3"/><text x="70" y="85" font-family="Arial" font-size="35" font-weight="700" fill="#173c3e">ScanBridge</text><text x="${rtl ? 1130 : 70}" y="130" text-anchor="${rtl ? 'end' : 'start'}" font-family="Arial" font-size="31" font-weight="700" fill="#173c3e">${escapeXml(text.cardTitle)}</text>${body}<text x="70" y="${height - 45}" font-family="Arial" font-size="17" fill="#42666a">ScanBridge · Not a diagnosis or medical instruction</text></svg>`;
  const image = new Image();
  image.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(image, 0, 0);
    const link = document.createElement('a');
    link.download = 'scanbridge-emergency-card.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    URL.revokeObjectURL(image.src);
  };
  image.src = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
}

enhanceMobileForm();
syncMobileFormMode();
watchMedia(mobileFormQuery, syncMobileFormMode);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  showCard(Object.fromEntries(new FormData(form)));
});
lang.addEventListener('click', () => {
  language = language === 'ar' ? 'en' : 'ar';
  localStorage.setItem('scanbridge-language', language);
  render();
  if (lastCardData) showCard(lastCardData, false);
  setTheme(localStorage.getItem('scanbridge-theme') || 'light');
});
theme.addEventListener('click', () => setTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark'));
$('#edit-card').addEventListener('click', () => form.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));
$('#print-card').addEventListener('click', () => window.print());
$('#download-card').addEventListener('click', downloadPhoto);

render();
setTheme(localStorage.getItem('scanbridge-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
