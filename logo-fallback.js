const scanBridgeLogoFallback = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="ScanBridge"><defs><linearGradient id="m" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#b9ece0"/><stop offset="1" stop-color="#5cc1b7"/></linearGradient></defs><rect width="64" height="64" rx="18" fill="#fffdf8"/><path d="M10 31a22 22 0 0 1 44 0" fill="none" stroke="url(#m)" stroke-width="8" stroke-linecap="round"/><path d="M8 39 32 30l24 9v7H8z" fill="#073d43"/><path d="M19 46v-6m13 6v-11m13 11v-6" stroke="#073d43" stroke-width="6" stroke-linecap="round"/><path d="M20 54a13 13 0 0 1 24 0" fill="#0c8888"/><circle cx="32" cy="29" r="4" fill="#ff7966"/></svg>`)}`;

document.addEventListener('error', (event) => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || !image.classList.contains('brand-logo') || image.dataset.logoFallbackApplied) return;
  image.dataset.logoFallbackApplied = 'true';
  image.src = scanBridgeLogoFallback;
}, true);
