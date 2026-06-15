
const CONSENT_KEY = 'gg_cookie_consent_v7';

function setYear(){
  const el = document.getElementById('year');
  if(el) el.textContent = new Date().getFullYear();
}

function activeNav(){
  const page=(location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('[data-nav]').forEach(a=>{
    if(a.getAttribute('href')===page) a.classList.add('active');
  });
}

function applyAffiliateLinks(){
  const map = window.AFFILIATE_LINKS || {};
  document.querySelectorAll('[data-affiliate-key]').forEach(a=>{
    const key = a.getAttribute('data-affiliate-key');
    const fallback = a.getAttribute('data-fallback') || '#';
    a.href = map[key] || fallback;
    a.target = '_blank';
    a.rel = 'nofollow sponsored noopener noreferrer';
  });
}

function initNewsletter(){
  const form = document.getElementById('newsletterForm');
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const msg = document.getElementById('newsletterMessage');
    if(msg){
      msg.textContent = 'Top! Deze knop werkt al als demo. Koppel later een echte nieuwsbriefdienst om echte inschrijvingen te bewaren.';
    }
    form.reset();
  });
}

function initCookie(){
  const banner = document.getElementById('cookieBanner');
  if(!banner) return;
  const saved = localStorage.getItem(CONSENT_KEY);
  if(saved){
    banner.style.display = 'none';
    return;
  }
  document.getElementById('cookieAccept')?.addEventListener('click', ()=>{
    localStorage.setItem(CONSENT_KEY, 'all');
    banner.style.display = 'none';
  });
  document.getElementById('cookieEssential')?.addEventListener('click', ()=>{
    localStorage.setItem(CONSENT_KEY, 'essential');
    banner.style.display = 'none';
  });
}

function initAccordions(){
  document.querySelectorAll('.faq-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const target = document.getElementById(btn.getAttribute('aria-controls'));
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      if(target) target.hidden = open;
    });
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  setYear();
  activeNav();
  applyAffiliateLinks();
  initNewsletter();
  initCookie();
  initAccordions();
});
