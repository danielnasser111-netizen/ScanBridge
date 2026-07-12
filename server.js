const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const model = process.env.GEMINI_MODEL || 'gemini-3.5-flash';
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

function send(res, status, data, type = 'application/json') {
  res.writeHead(status, { 'content-type': `${type}; charset=utf-8`, 'cache-control': 'no-store' });
  res.end(Buffer.isBuffer(data) || typeof data === 'string' ? data : JSON.stringify(data));
}
function languageFor(value, requested) { return requested === 'ar' || /[\u0600-\u06ff]/u.test(value) ? 'ar' : 'en'; }
function urgentReply(language, message) {
  const nearHamra = /hamra|الحمرا/u.test(message);
  return {
    message: language === 'ar'
      ? 'أفهم أن هذا مخيف. لا أستطيع تقييم السبب أو تحديد ما إذا كانت الحالة التهاب رئة، لكن صعوبة التنفس قد تكون خطيرة. اتصل بالصليب الأحمر اللبناني على 140 أو توجّه إلى أقرب قسم طوارئ الآن. لا تؤخر طلب المساعدة لإكمال الدردشة أو بطاقة الطوارئ.'
      : 'I’m sorry this is frightening. I can’t assess the cause or determine whether this is pneumonia, but breathing difficulty can be serious. Call the Lebanese Red Cross on 140 or go to the nearest emergency department now. Do not delay help to finish this chat or a card.',
    routes: nearHamra ? ['aubmc', 'emergency'] : ['emergency', 'centers']
  };
}
async function miloReply(message, language, history = []) {
  if (urgentPattern.test(message)) return urgentReply(language, message);
  if (!process.env.GEMINI_API_KEY) throw new Error('MILO_LLM_UNAVAILABLE');
  const instructions = `You are Milo, ScanBridge's patient-navigation assistant for Lebanon. Respond naturally to the user's actual words and remember the supplied conversation. Be warm, calm, professional, concise, and especially reassuring when someone sounds frightened. You are not a clinician: never diagnose, confirm a suspected condition, prescribe treatment, decide that someone needs a scan, or interpret a report. Explain that a clinician decides whether imaging is needed. For urgent danger, clearly recommend Lebanese Red Cross 140 or the nearest emergency department and do not delay for chat. Use a stated city/area to recommend only facilities from this approved list, describing them as area-based options rather than guaranteed closest: ${JSON.stringify(facilityContext)}. Approved route keys: ${Object.keys(routes).join(', ')}. Return strict JSON only: {"message":"natural response","routes":["approved_key"]}. Use ${language === 'ar' ? 'Arabic' : 'English'}. Never invent a facility, URL, distance, emergency number, or medical claim.`;
  const transcript = [...history.slice(-10), { role: 'user', content: message }]
    .map(item => `${item.role === 'assistant' ? 'Milo' : 'User'}: ${item.content}`)
    .join('\n');
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
    body: JSON.stringify({ model, input: `${instructions}\n\nConversation:\n${transcript}` })
  });
  if (!response.ok) throw new Error(`GEMINI_${response.status}`);
  const output = await response.json();
  const stepText = (output.steps || [])
    .filter(step => step.type === 'model_output')
    .flatMap(step => step.content || [])
    .filter(part => part.type === 'text')
    .map(part => part.text)
    .join('');
  const raw = String(output.output_text || output.text || stepText || '').replace(/^```json\s*|\s*```$/g, '').trim();
  const parsed = JSON.parse(raw);
  return { message: String(parsed.message || ''), routes: Array.isArray(parsed.routes) ? parsed.routes.filter(key => routes[key]) : [] };
}
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml' };
http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (req.method === 'POST' && url.pathname === '/api/milo') {
    let body = ''; req.on('data', chunk => { body += chunk; if (body.length > 8000) req.destroy(); });
    req.on('end', async () => {
      try {
        const input = JSON.parse(body); const message = String(input.message || '').slice(0, 1800); const language = languageFor(message, input.language);
        const history = Array.isArray(input.history) ? input.history.slice(-10).map(item => ({ role: item.role === 'assistant' ? 'assistant' : 'user', content: String(item.content || '').slice(0, 1800) })) : [];
        const reply = await miloReply(message, language, history);
        send(res, 200, { ...reply, links: reply.routes.map(key => routes[key]) });
      } catch (error) { send(res, 503, { error: 'MILO_UNAVAILABLE' }); }
    }); return;
  }
  const safePath = path.normalize(url.pathname === '/' ? '/index.html' : url.pathname).replace(/^([.][.][/\\])+/, '');
  const file = path.join(root, safePath);
  if (!file.startsWith(root)) return send(res, 403, 'Forbidden', 'text/plain');
  fs.readFile(file, (error, data) => error ? send(res, 404, 'Not found', 'text/plain') : send(res, 200, data, types[path.extname(file)] || 'application/octet-stream'));
}).listen(port, () => console.log(`ScanBridge running at http://localhost:${port}`));
