const routes = {
  guides: { href: 'guides.html', en: 'Open scan guides', ar: 'افتح أدلة الفحوصات' },
  centers: { href: 'directory.html', en: 'Open center directory', ar: 'افتح دليل المراكز' },
  emergency: { href: 'emergency.html', en: 'Open emergency card', ar: 'افتح بطاقة الطوارئ' },
  aubmc: { href: 'https://aub.edu/fm/DiagnosticRadiology/Pages/default.aspx', en: 'AUBMC — Hamra', ar: 'المركز الطبي للجامعة الأميركية — الحمرا' },
  cmc: { href: 'https://www.cmc.com.lb/diagnostic-imaging-radiology/', en: 'Clemenceau Medical Center', ar: 'مركز كليمنصو الطبي' },
  stjoseph: { href: 'https://www.moph.gov.lb/en/HealthFacilities/view/0/42273/71343/centre-medical-st-joseph-radiology/', en: 'Centre Medical St. Joseph — Achrafieh', ar: 'مركز سان جوزف الطبي — الأشرفية' },
  adc: { href: 'https://www.adc-lb.com/', en: 'American Diagnostic Center — Jnah', ar: 'المركز التشخيصي الأميركي — الجناح' },
  zhumc: { href: 'https://zhumc.org.lb/mdepartment/radiology/', en: 'Al Zahraa Hospital — Jnah', ar: 'مستشفى الزهراء — الجناح' },
  monla: { href: 'https://www.moph.gov.lb/en/HealthFacilities/view/0/42273/71516/monla-hospital-/', en: 'Monla Hospital — Tripoli', ar: 'مستشفى المنلا — طرابلس' },
  dallaa: { href: 'https://www.dallaahospital.com/details.php?id=1&type=department', en: 'Dallaa General Hospital — Saida', ar: 'مستشفى دلّاعة — صيدا' }
};

const facilityContext = [
  { key: 'aubmc', city: 'Beirut', area: 'Hamra' }, { key: 'cmc', city: 'Beirut', area: 'Clemenceau' },
  { key: 'stjoseph', city: 'Beirut', area: 'Achrafieh' }, { key: 'adc', city: 'Beirut', area: 'Jnah' },
  { key: 'zhumc', city: 'Beirut', area: 'Jnah' }, { key: 'monla', city: 'Tripoli', area: 'Tripoli' },
  { key: 'dallaa', city: 'Saida', area: 'Saida' }
];

const urgentPattern = /chest pain|trouble breathing|can.t breathe|unconscious|seizure|severe bleeding|stroke|suicid|not breathing|صعوبة.*تنفس|ضيق.*تنفس|لا.*تتنفس|ألم.*صدر|نزيف.*شديد|فقدان.*وعي|تشنج|جلطة/iu;
const json = (body, status = 200) => Response.json(body, { status, headers: { 'cache-control': 'no-store' } });
const languageFor = (value, requested) => requested === 'ar' || /[\u0600-\u06ff]/u.test(value) ? 'ar' : 'en';

function urgentReply(language, message) {
  const nearHamra = /hamra|الحمرا/iu.test(message);
  return {
    message: language === 'ar'
      ? 'أفهم أن هذا مخيف. لا أستطيع تقييم السبب أو تحديد ما إذا كانت الحالة التهاب رئة، لكن صعوبة التنفس قد تكون خطيرة. اتصل بالصليب الأحمر اللبناني على 140 أو توجّه إلى أقرب قسم طوارئ الآن. لا تؤخر طلب المساعدة لإكمال الدردشة أو بطاقة الطوارئ.'
      : 'I’m sorry this is frightening. I can’t assess the cause or determine whether this is pneumonia, but breathing difficulty can be serious. Call the Lebanese Red Cross on 140 or go to the nearest emergency department now. Do not delay help to finish this chat or a card.',
    routes: nearHamra ? ['aubmc', 'emergency'] : ['emergency', 'centers']
  };
}

async function miloReply(message, language, history) {
  if (urgentPattern.test(message)) return urgentReply(language, message);
  if (!process.env.GEMINI_API_KEY) throw new Error('MILO_LLM_UNAVAILABLE');
  const instructions = `You are Milo, ScanBridge's patient-navigation assistant for Lebanon. Respond naturally to the user's actual words and remember the supplied conversation. Be warm, calm, professional, concise, and especially reassuring when someone sounds frightened. You are not a clinician: never diagnose, confirm a suspected condition, prescribe treatment, decide that someone needs a scan, or interpret a report. Explain that a clinician decides whether imaging is needed. For urgent danger, clearly recommend Lebanese Red Cross 140 or the nearest emergency department and do not delay for chat. Use a stated city/area to recommend only facilities from this approved list, describing them as area-based options rather than guaranteed closest: ${JSON.stringify(facilityContext)}. Approved route keys: ${Object.keys(routes).join(', ')}. Return strict JSON only: {"message":"natural response","routes":["approved_key"]}. Use ${language === 'ar' ? 'Arabic' : 'English'}. Never invent a facility, URL, distance, emergency number, or medical claim.`;
  const transcript = [...history.slice(-10), { role: 'user', content: message }]
    .map(item => `${item.role === 'assistant' ? 'Milo' : 'User'}: ${item.content}`).join('\n');
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
    body: JSON.stringify({ model: process.env.GEMINI_MODEL || 'gemini-3.5-flash', input: `${instructions}\n\nConversation:\n${transcript}` })
  });
  if (!response.ok) throw new Error(`GEMINI_${response.status}`);
  const output = await response.json();
  const stepText = (output.steps || []).filter(step => step.type === 'model_output')
    .flatMap(step => step.content || []).filter(part => part.type === 'text').map(part => part.text).join('');
  const parsed = JSON.parse(String(output.output_text || output.text || stepText || '').replace(/^```json\s*|\s*```$/g, '').trim());
  return { message: String(parsed.message || ''), routes: Array.isArray(parsed.routes) ? parsed.routes.filter(key => routes[key]) : [] };
}

export default async (request) => {
  if (request.method !== 'POST') return json({ error: 'METHOD_NOT_ALLOWED' }, 405);
  try {
    const input = await request.json();
    const message = String(input.message || '').slice(0, 1800);
    if (!message) return json({ error: 'MESSAGE_REQUIRED' }, 400);
    const language = languageFor(message, input.language);
    const history = Array.isArray(input.history) ? input.history.slice(-10).map(item => ({ role: item.role === 'assistant' ? 'assistant' : 'user', content: String(item.content || '').slice(0, 1800) })) : [];
    const reply = await miloReply(message, language, history);
    return json({ ...reply, links: reply.routes.map(key => routes[key]) });
  } catch (error) {
    console.error('Milo function error:', error.message);
    return json({ error: 'MILO_UNAVAILABLE' }, 503);
  }
};

export const config = { path: '/api/milo' };
