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
const urgentPattern = /chest pain|trouble breathing|shortness of breath|difficulty breathing|struggling to breathe|can.t breathe|not breathing|blue lips|unconscious|collapse|seizure|severe bleeding|stroke|suicid|overdose|poison|anaphyla|صعوبة.*تنفس|ضيق.*تنفس|لا.*تتنفس|لا.*يتنفس|زرقة.*شفا|ألم.*صدر|نزيف.*شديد|فقدان.*وعي|إغماء|تشنج|جلطة|تسمم|حساسية.*شديدة/iu;
const rateWindows = new Map();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 12;
function clientKey(req){return String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim();}
function allowRequest(req){const key=clientKey(req),now=Date.now(),recent=(rateWindows.get(key)||[]).filter(time=>now-time<RATE_WINDOW_MS);if(recent.length>=RATE_LIMIT){rateWindows.set(key,recent);return false;}recent.push(now);rateWindows.set(key,recent);return true;}

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
  const instructions = `You are Milo, ScanBridge's patient-navigation assistant for Lebanon. Respond naturally to the user's actual words and remember the supplied conversation. Be warm, calm, professional, concise, and especially reassuring when someone sounds frightened. You are not a clinician: never diagnose, confirm a suspected condition, prescribe treatment, decide that someone needs a scan, or interpret a report. Explain that a clinician decides whether imaging is needed. For urgent danger, clearly recommend Lebanese Red Cross 140 or the nearest emergency department and do not delay for chat. Use a stated city/area to recommend only facilities from this small approved source-linked list, describing them as area-based options rather than guaranteed closest or a complete local list: ${JSON.stringify(facilityContext)}. If the user's area is not in that list, guide them to the directory instead. Approved route keys: ${Object.keys(routes).join(', ')}. Return strict JSON only: {"message":"natural response","routes":["approved_key"]}. Use ${language === 'ar' ? 'Arabic' : 'English'}. Never invent a facility, URL, distance, emergency number, medical claim, or clinical recommendation.`;
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
  const replyMessage = String(parsed.message || '').replace(/\u0000/g, '').trim().slice(0, 1400);
  if (!replyMessage) throw new Error('MILO_EMPTY_RESPONSE');
  return { message: replyMessage, routes: Array.isArray(parsed.routes) ? parsed.routes.filter(key => routes[key]) : [] };
}
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (req.method === 'POST' && url.pathname === '/api/milo') {
    if (!allowRequest(req)) return send(res, 429, { error: 'RATE_LIMITED' });
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
  const requestedPath = decodeURIComponent(url.pathname === '/' ? 'index.html' : url.pathname.replace(/^\/+/, ''));
  const isTopLevelPublicFile = /^[a-z0-9-]+\.(html|js|css)$/i.test(requestedPath);
  const isPublicAsset = /^assets\/[a-z0-9._-]+\.(png|webp|svg)$/i.test(requestedPath);
  if (!isTopLevelPublicFile && !isPublicAsset) return send(res, 404, 'Not found', 'text/plain');
  const file = path.join(root, requestedPath);
  fs.readFile(file, (error, data) => error ? send(res, 404, 'Not found', 'text/plain') : send(res, 200, data, types[path.extname(file)] || 'application/octet-stream'));
}).listen(port, () => console.log(`ScanBridge running at http://localhost:${port}`));
