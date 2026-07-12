(() => {
  if (document.querySelector('#milo-root')) return;

  const copy = {
    en: {
      name: 'Milo', role: 'Live ScanBridge guide', hello: 'Welcome — I’m Milo. I can guide you through ScanBridge, recommend the right page or tool, and explain what each feature is for. I do not provide medical advice, diagnosis, or treatment guidance.',
      placeholder: 'Ask Milo where to start…', send: 'Send', close: 'Close chat', thinking: 'Milo is finding the right ScanBridge tool…', unavailable: 'Milo’s live language model is not connected right now. Please try again shortly.',
      chips: ['Scan guides', 'Find a center', 'Emergency card', 'Report helper'], prompts: ['Where can I find the scan guides?', 'Help me find an imaging center.', 'Open the emergency preparation card.', 'What is the report helper?']
    },
    ar: {
      name: 'مايلو', role: 'دليل ScanBridge المباشر', hello: 'مرحباً، أنا مايلو. أستطيع إرشادك داخل ScanBridge واقتراح الصفحة أو الأداة المناسبة وشرح هدف كل ميزة. لا أقدّم نصيحة طبية أو تشخيصاً أو إرشادات علاجية.',
      placeholder: 'اسأل مايلو من أين تبدأ…', send: 'إرسال', close: 'إغلاق المحادثة', thinking: 'مايلو يبحث عن أداة ScanBridge المناسبة…', unavailable: 'نموذج مايلو المباشر غير متصل الآن. حاول مرة أخرى بعد قليل.',
      chips: ['أدلة الفحوصات', 'ابحث عن مركز', 'بطاقة الطوارئ', 'مساعد التقرير'], prompts: ['أين أجد أدلة الفحوصات؟', 'ساعدني في العثور على مركز تصوير.', 'افتح بطاقة الاستعداد للطوارئ.', 'ما هو مساعد التقرير؟']
    }
  };

  copy.en.role = 'Chat with Milo';
  copy.ar.role = 'دردش مع مايلو';

  const css = `
    @keyframes milo-float { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-7px) rotate(2deg); } }
    @keyframes milo-orbit { to { transform: rotate(360deg); } }
    @keyframes milo-blink { 0%,44%,48%,100% { transform: scaleY(1); } 46% { transform: scaleY(.12); } }
    @keyframes milo-wave { 0%,100% { transform: rotate(-14deg); } 50% { transform: rotate(14deg); } }
    @keyframes milo-think { 50% { transform: scale(1.08); } }
    @keyframes milo-hint { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-3px); } }
    @keyframes milo-bubble-pop { to { opacity:0; transform:scale(.78); } }
    .milo-launch { position:fixed; right:16px; bottom:max(14px, env(safe-area-inset-bottom)); z-index:30; display:grid; grid-template-columns:68px auto; gap:.35rem; align-items:center; padding:0; border:0; color:var(--ink); background:transparent; cursor:pointer; font-family:"DM Sans",sans-serif; text-align:left; }
    .milo-companion { position:relative; display:grid; place-items:center; width:68px; height:76px; animation:milo-float 3.8s ease-in-out infinite; filter:drop-shadow(0 10px 12px rgba(23,60,62,.25)); }
    .milo-orbit { position:absolute; width:68px; height:68px; border:1px dashed rgba(245,200,93,.9); border-radius:50%; animation:milo-orbit 16s linear infinite; }
    .milo-orbit::before,.milo-orbit::after { position:absolute; content:""; width:6px; height:6px; border-radius:50%; background:var(--sun); }
    .milo-orbit::before { top:-3px; left:31px; }.milo-orbit::after { right:1px; bottom:7px; width:4px; height:4px; background:var(--coral); }
    .milo-antenna { position:absolute; top:5px; width:18px; height:15px; border:3px solid var(--ink); border-bottom:0; border-radius:18px 18px 0 0; }
    .milo-antenna::after { position:absolute; top:-7px; left:4px; content:""; width:7px; height:7px; border-radius:50%; background:var(--coral); box-shadow:0 0 0 4px var(--paper); }
    .milo-avatar { position:relative; z-index:1; display:flex; align-items:center; justify-content:center; gap:10px; width:55px; height:53px; margin-top:11px; border:3px solid var(--ink); border-radius:45% 45% 48% 48%; background:linear-gradient(135deg,#f8d778,#f5c85d); box-shadow:inset 0 -5px 0 rgba(23,60,62,.1); }
    .milo-avatar::before { position:absolute; right:-9px; bottom:7px; content:""; width:15px; height:13px; border:3px solid var(--ink); border-left:0; border-radius:0 12px 12px 0; transform:rotate(-14deg); animation:milo-wave 1.7s ease-in-out infinite; }
    .milo-eye { width:6px; height:9px; border-radius:50%; background:var(--ink); animation:milo-blink 4.2s infinite; }.milo-eye:nth-child(2) { animation-delay:.1s; }
    .milo-smile { position:absolute; bottom:9px; width:14px; height:7px; border:2px solid var(--ink); border-top:0; border-radius:0 0 12px 12px; }
    .milo-bubble { display:grid; gap:.02rem; max-width:148px; padding:.55rem .75rem; border:1px solid var(--line); border-radius:13px 13px 13px 3px; color:var(--ink); background:var(--paper); box-shadow:0 8px 24px rgba(23,60,62,.14); transition:transform 180ms ease,opacity 180ms ease; }
    .milo-bubble strong { font-size:.9rem; line-height:1.1; }.milo-bubble span { color:var(--ink-soft); font-size:.7rem; font-weight:600; line-height:1.25; }
    .milo-launch.milo-open .milo-bubble { transform:translateX(8px); opacity:.45; }.milo-launch.milo-thinking .milo-companion { animation:milo-think .8s ease-in-out infinite; }.milo-launch.milo-thinking .milo-orbit { border-style:solid; animation-duration:1.3s; }.milo-launch.milo-thinking .milo-avatar::before { animation-duration:.55s; }
    .milo-panel { position:fixed; right:22px; bottom:calc(90px + env(safe-area-inset-bottom)); z-index:31; display:flex; flex-direction:column; width:min(390px,calc(100% - 28px)); height:min(590px,calc(100dvh - 112px)); overflow:hidden; border:1px solid var(--line); border-radius:18px; background:var(--paper); box-shadow:0 24px 70px rgba(0,0,0,.25); font-family:"DM Sans",sans-serif; }.milo-panel[hidden] { display:none; }
    .milo-head { display:flex; align-items:center; justify-content:space-between; padding:1rem 1.1rem; border-bottom:1px solid #356063; background:#173c3e; color:#fff; }.milo-title { display:flex; align-items:center; gap:.65rem; }.milo-face { display:grid; place-items:center; width:34px; height:34px; border-radius:50%; background:#f5c85d; color:#173c3e; font-size:1.1rem; }.milo-title strong,.milo-title small { display:block; }.milo-title small { color:#d8eae6; }.milo-status { display:inline-flex; align-items:center; gap:.35rem; }.milo-status::before { content:""; width:7px; height:7px; border-radius:50%; background:#65c18c; }.milo-close { border:0; color:#fff; background:transparent; cursor:pointer; font-size:1.35rem; }
    .milo-messages { display:flex; flex:1; flex-direction:column; gap:.8rem; overflow:auto; padding:1rem; }.milo-message { max-width:88%; padding:.72rem .82rem; border-radius:13px; color:#173c3e; background:#e6f1ec; font-size:.9rem; line-height:1.5; }.milo-message.user { align-self:flex-end; color:#fff; background:#346d6e; }.milo-message.typing { color:#42666a; font-style:italic; }.milo-message a { display:inline; margin:.35rem .55rem 0 0; padding:0; border-bottom:1px solid currentColor; color:#c85f49; background:transparent; font-weight:700; text-decoration:none; }.milo-message a::after { content:" ↗"; }
    .milo-chips { display:flex; flex-wrap:wrap; gap:.45rem; padding:0 1rem .75rem; }.milo-chip { border:1px solid var(--line); padding:.38rem .55rem; border-radius:999px; color:var(--ink); background:transparent; cursor:pointer; font-size:.78rem; font-weight:700; }.milo-form { display:flex; gap:.5rem; padding:.8rem; border-top:1px solid var(--line); }.milo-form input { min-width:0; flex:1; border:1px solid #b9ceca; padding:.65rem; border-radius:8px; color:var(--ink); background:#fff; }.milo-send { border:0; padding:.55rem .7rem; border-radius:8px; color:#fff; background:#173c3e; cursor:pointer; font-weight:700; }
    .dark-mode .milo-bubble,.dark-mode .milo-panel,.dark-mode .milo-messages { border-color:#356063; color:#e6f3ef; background:#10292c; }.dark-mode .milo-bubble span { color:#b8d1ca; }.dark-mode .milo-antenna,.dark-mode .milo-avatar,.dark-mode .milo-avatar::before,.dark-mode .milo-smile { border-color:#e6f3ef; }.dark-mode .milo-eye { background:#e6f3ef; }.dark-mode .milo-antenna::after { box-shadow:0 0 0 4px #10292c; }.dark-mode .milo-message { color:#e6f3ef; background:#21484a; }.dark-mode .milo-message.user { background:#346d6e; }.dark-mode .milo-message a { color:#ffab95; }.dark-mode .milo-form { border-color:#356063; }.dark-mode .milo-form input { border-color:#356063; color:#e6f3ef; background:#17363a; }.dark-mode .milo-chip { border-color:#356063; color:#e6f3ef; }
    html[dir="rtl"] .milo-launch { right:auto; left:16px; text-align:right; }html[dir="rtl"] .milo-bubble { border-radius:13px 13px 3px 13px; }html[dir="rtl"] .milo-launch.milo-open .milo-bubble { transform:translateX(-8px); }html[dir="rtl"] .milo-panel { right:auto; left:22px; direction:rtl; }
    .milo-launch.milo-intro-seen .milo-bubble { animation:milo-bubble-pop 180ms ease-in forwards; pointer-events:none; }.milo-launch.milo-intro-hidden .milo-bubble { display:none; }
    @media(max-width:600px){.milo-launch{right:10px;bottom:max(8px,env(safe-area-inset-bottom));grid-template-columns:62px auto}.milo-companion{width:62px;height:70px}.milo-bubble{display:grid;max-width:124px;padding:.42rem .55rem;animation:milo-hint 2.8s ease-in-out infinite}.milo-bubble strong{font-size:.78rem}.milo-bubble span{font-size:.62rem}.milo-orbit{width:62px;height:62px}.milo-panel{right:14px;bottom:calc(76px + env(safe-area-inset-bottom));height:min(570px,calc(100dvh - 92px))}html[dir="rtl"] .milo-launch{left:10px;right:auto}html[dir="rtl"] .milo-panel{left:14px;right:auto}}
    @media(prefers-reduced-motion:reduce){.milo-companion,.milo-orbit,.milo-eye,.milo-avatar::before{animation:none!important;}}
  `;
  const style = document.createElement('style'); style.textContent = css; document.head.append(style);

  const root = document.createElement('div');
  root.id = 'milo-root';
  root.innerHTML = '<button class="milo-launch" aria-expanded="false" aria-label="Chat with Milo"><span class="milo-companion" aria-hidden="true"><span class="milo-orbit"></span><span class="milo-antenna"></span><span class="milo-avatar"><span class="milo-eye"></span><span class="milo-eye"></span><span class="milo-smile"></span></span></span><span class="milo-bubble"><strong class="launch-label">Milo</strong><span class="milo-bubble-text">Live ScanBridge guide</span></span></button><section class="milo-panel" hidden><header class="milo-head"><div class="milo-title"><span class="milo-face">✦</span><div><strong>Milo</strong><small class="role milo-status">Live ScanBridge guide</small></div></div><button class="milo-close">×</button></header><div class="milo-messages" aria-live="polite"></div><div class="milo-chips"></div><form class="milo-form"><input required><button class="milo-send">Send</button></form></section>';
  document.body.append(root);

  const conversation = [];
  const $ = selector => root.querySelector(selector);
  const launch = $('.milo-launch');
  const panel = $('.milo-panel');
  const messages = $('.milo-messages');
  const chips = $('.milo-chips');
  const input = $('.milo-form input');
  const language = value => /[\u0600-\u06ff]/u.test(value) || document.documentElement.lang === 'ar' ? 'ar' : 'en';
  if (localStorage.getItem('scanbridge-milo-intro-seen') === 'true') launch.classList.add('milo-intro-hidden');

  function dismissMiloIntro() {
    if (launch.classList.contains('milo-intro-hidden')) return;
    localStorage.setItem('scanbridge-milo-intro-seen', 'true');
    launch.classList.add('milo-intro-seen');
    window.setTimeout(() => launch.classList.add('milo-intro-hidden'), 190);
  }

  function addMessage(value, isUser = false, links = [], className = '') {
    const bubble = document.createElement('div');
    bubble.className = `milo-message${isUser ? ' user' : ''}${className ? ` ${className}` : ''}`;
    bubble.append(document.createTextNode(value));
    links.forEach(([href, label]) => {
      const link = document.createElement('a'); link.href = href; link.textContent = label; bubble.append(' ', link);
    });
    messages.append(bubble); messages.scrollTop = messages.scrollHeight;
    return bubble;
  }

  async function reply(value) {
    const locale = language(value);
    const typing = addMessage(copy[locale].thinking, false, [], 'typing');
    launch.classList.add('milo-thinking');
    conversation.push({ role: 'user', content: value });
    try {
      if (location.protocol === 'file:') throw new Error('LOCAL_PREVIEW');
      const response = await fetch('/api/milo', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ message: value, language: locale, history: conversation.slice(0, -1) }) });
      if (!response.ok) throw new Error('MILO_UNAVAILABLE');
      const data = await response.json();
      typing.remove(); conversation.push({ role: 'assistant', content: data.message });
      addMessage(data.message, false, (data.links || []).map(link => [link.href, link[locale] || link.en]));
    } catch {
      typing.remove(); conversation.pop(); addMessage(copy[locale].unavailable);
    } finally {
      launch.classList.remove('milo-thinking');
    }
  }

  function refresh() {
    const locale = language(''); const text = copy[locale];
    $('.launch-label').textContent = text.name; $('.milo-bubble-text').textContent = text.role; $('.milo-title strong').textContent = text.name; $('.role').textContent = text.role;
    launch.setAttribute('aria-label', text.name); $('.milo-close').setAttribute('aria-label', text.close); input.placeholder = text.placeholder; $('.milo-send').textContent = text.send;
    chips.replaceChildren();
    text.chips.forEach((label, index) => {
      const chip = document.createElement('button'); chip.className = 'milo-chip'; chip.type = 'button'; chip.textContent = label;
      chip.onclick = () => { addMessage(label, true); reply(text.prompts[index]); }; chips.append(chip);
    });
  }

  launch.onclick = () => {
    const isOpening = panel.hidden;
    panel.hidden = !panel.hidden; launch.classList.toggle('milo-open', !panel.hidden); launch.setAttribute('aria-expanded', String(!panel.hidden));
    if (!panel.hidden && !messages.children.length) addMessage(copy[language('')].hello);
    if (!panel.hidden) input.focus();
    if (isOpening) dismissMiloIntro();
  };
  $('.milo-close').onclick = () => launch.click();
  $('.milo-form').onsubmit = event => { event.preventDefault(); const value = input.value.trim(); if (value) { addMessage(value, true); input.value = ''; reply(value); } };
  new MutationObserver(refresh).observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });
  refresh();
})();
