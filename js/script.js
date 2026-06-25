// ============ MAISON CACAO — Interactions ============

const I18N = {
  fr: {
    sending: 'Envoi en cours...',
    sent: 'Demande envoyée',
    alertReservation: (name) => `Merci ${name} ! Votre demande a bien été reçue.\n\nDémo Nextiweb — aucune donnée n'est réellement envoyée.\nVisitez nextiweb.ca pour votre vrai site.`,
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    cookie: {
      title: 'Vos préférences de confidentialité',
      text: 'Ce site utilise un stockage local minimal pour mémoriser vos préférences. Aucun cookie de traçage n\'est employé. Consultez notre <a href="politique-confidentialite.html">politique de confidentialité</a>.',
      acceptAll: 'Tout accepter',
      rejectAll: 'Tout refuser',
      customize: 'Personnaliser mes choix',
      save: 'Enregistrer mes choix',
      catEssential: 'Essentiels',
      catEssentialDesc: 'Indispensables au fonctionnement du site (préférence de langue, choix de cookies). Toujours actifs.',
      catAnalytics: 'Mesure d\'audience',
      catAnalyticsDesc: 'Statistiques anonymes pour améliorer le site. Aucun outil actif actuellement.',
      catMarketing: 'Marketing & médias sociaux',
      catMarketingDesc: 'Personnalisation publicitaire et partages réseaux sociaux. Aucun outil actif actuellement.',
    }
  },
  en: {
    sending: 'Sending...',
    sent: 'Request sent',
    alertReservation: (name) => `Thank you ${name}! Your request has been received.\n\nNextiweb Demo — no data is actually sent.\nVisit nextiweb.ca for your own real site.`,
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    cookie: {
      title: 'Your privacy preferences',
      text: 'This site uses minimal local storage to remember your preferences. No tracking cookies are used. See our <a href="privacy-policy.html">privacy policy</a>.',
      acceptAll: 'Accept all',
      rejectAll: 'Reject all',
      customize: 'Customize my choices',
      save: 'Save my choices',
      catEssential: 'Essential',
      catEssentialDesc: 'Required for the site to function (language preference, cookie choice). Always active.',
      catAnalytics: 'Analytics',
      catAnalyticsDesc: 'Anonymous visit statistics to improve the site. No tool currently active.',
      catMarketing: 'Marketing & social media',
      catMarketingDesc: 'Personalised ads and social sharing. No tool currently active.',
    }
  }
};
const LANG = document.documentElement.lang.startsWith('en') ? 'en' : 'fr';
const t = I18N[LANG];

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Header sticky shrink on scroll ---
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 60) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  requestAnimationFrame(onScroll);

  // --- 2. Mobile burger menu ---
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('is-open');
    nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    burger.setAttribute('aria-label', isOpen ? t.closeMenu : t.openMenu);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  // Close menu on link click (mobile)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('is-open');
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
  // Close menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      burger.click();
    }
  });

  // --- 3. Collections tabs (with ARIA) ---
  const tabs = document.querySelectorAll('.menu__tab');
  const panels = document.querySelectorAll('.menu__panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach(p => {
        p.classList.remove('is-active');
        p.setAttribute('hidden', '');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      const panel = document.querySelector(`.menu__panel[data-panel="${target}"]`);
      panel.classList.add('is-active');
      panel.removeAttribute('hidden');
    });
  });

  // --- 4. Reveal on scroll ---
  const revealEls = document.querySelectorAll(
    '.section__title, .section__lead, .dish, .review, .gallery__item, .stat, .form, .info-list, .team__member, .faq__item, .cta-banner, .ncard, .nextiweb__sub, .nextiweb__lead'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // --- 5. Demo form handling (reservation + contact, same logic) ---
  const handleDemoForm = (form) => {
    if (!form) return;
    const dateInput = form.querySelector('input[name="date"]');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const data = new FormData(form);
      const name = data.get('name');
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = t.sending;
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = t.sent;
        btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
        setTimeout(() => {
          alert(t.alertReservation(name));
          form.reset();
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 800);
      }, 600);
    });
  };
  handleDemoForm(document.getElementById('reservationForm'));

  // --- 6. Newsletter (demo) ---
  const newsletter = document.getElementById('newsletterForm');
  if (newsletter) {
    newsletter.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!newsletter.checkValidity()) {
        newsletter.reportValidity();
        return;
      }
      newsletter.classList.add('is-success');
      setTimeout(() => {
        newsletter.classList.remove('is-success');
        newsletter.reset();
      }, 3500);
    });
  }

  // --- 7. Nextiweb cards spotlight (mouse-tracking) ---
  const ncards = document.querySelectorAll('.ncard');
  ncards.forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
    });
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--mx');
      card.style.removeProperty('--my');
    });
  });

  // --- 8. FAQ — auto-close others when opening one ---
  const faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach(other => {
          if (other !== item) other.removeAttribute('open');
        });
      }
    });
  });

  // --- 9. Cookie consent banner (Loi 25 / RGPD) ---
  initCookieBanner();

});

// ============ COOKIE CONSENT — Loi 25 ============
const CONSENT_KEY = 'mc-cookie-consent-v1';

function getConsent() {
  try { return JSON.parse(localStorage.getItem(CONSENT_KEY)); }
  catch (e) { return null; }
}
function setConsent(prefs) {
  const data = Object.assign({ ts: new Date().toISOString() }, prefs);
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify(data)); }
  catch (e) {}
  // Hook for future analytics/marketing scripts:
  // if (data.analytics) loadAnalytics();
  // if (data.marketing) loadMarketing();
}

function initCookieBanner() {
  const c = I18N[LANG].cookie;
  const linkIcon = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="9" cy="9.5" r="1" fill="currentColor" stroke="none"/><circle cx="14.5" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="11" cy="14.5" r="1" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15" r="0.8" fill="currentColor" stroke="none"/></svg>';

  // Build banner
  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-labelledby', 'cookie-title');
  banner.setAttribute('aria-describedby', 'cookie-text');
  banner.innerHTML = `
    <div class="cookie-banner__head">
      <span class="cookie-banner__icon" aria-hidden="true">${linkIcon}</span>
      <h2 class="cookie-banner__title" id="cookie-title">${c.title}</h2>
    </div>
    <p class="cookie-banner__text" id="cookie-text">${c.text}</p>
    <div class="cookie-banner__actions">
      <button class="cookie-banner__btn cookie-banner__btn--secondary" data-act="reject">${c.rejectAll}</button>
      <button class="cookie-banner__btn cookie-banner__btn--primary" data-act="accept">${c.acceptAll}</button>
    </div>
    <button class="cookie-banner__customize" data-act="customize">${c.customize}</button>
    <div class="cookie-banner__details">
      <label class="cookie-cat">
        <span class="cookie-cat__toggle">
          <input type="checkbox" checked disabled aria-label="${c.catEssential}" />
          <span class="cookie-cat__toggle-bg"></span>
        </span>
        <span class="cookie-cat__body">
          <span class="cookie-cat__name">${c.catEssential}</span>
          <span class="cookie-cat__desc">${c.catEssentialDesc}</span>
        </span>
      </label>
      <label class="cookie-cat">
        <span class="cookie-cat__toggle">
          <input type="checkbox" data-cat="analytics" aria-label="${c.catAnalytics}" />
          <span class="cookie-cat__toggle-bg"></span>
        </span>
        <span class="cookie-cat__body">
          <span class="cookie-cat__name">${c.catAnalytics}</span>
          <span class="cookie-cat__desc">${c.catAnalyticsDesc}</span>
        </span>
      </label>
      <label class="cookie-cat">
        <span class="cookie-cat__toggle">
          <input type="checkbox" data-cat="marketing" aria-label="${c.catMarketing}" />
          <span class="cookie-cat__toggle-bg"></span>
        </span>
        <span class="cookie-cat__body">
          <span class="cookie-cat__name">${c.catMarketing}</span>
          <span class="cookie-cat__desc">${c.catMarketingDesc}</span>
        </span>
      </label>
      <button class="cookie-banner__btn cookie-banner__btn--primary cookie-banner__save" data-act="save">${c.save}</button>
    </div>
  `;
  document.body.appendChild(banner);

  const hide = () => banner.classList.remove('is-visible', 'is-expanded');
  const show = () => requestAnimationFrame(() => banner.classList.add('is-visible'));

  banner.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const act = btn.dataset.act;
    if (act === 'accept') {
      setConsent({ essential: true, analytics: true, marketing: true });
      hide();
    } else if (act === 'reject') {
      setConsent({ essential: true, analytics: false, marketing: false });
      hide();
    } else if (act === 'customize') {
      banner.classList.add('is-expanded');
      // Pre-fill toggles from stored consent if any
      const prev = getConsent();
      if (prev) {
        banner.querySelector('[data-cat="analytics"]').checked = !!prev.analytics;
        banner.querySelector('[data-cat="marketing"]').checked = !!prev.marketing;
      }
    } else if (act === 'save') {
      const analytics = banner.querySelector('[data-cat="analytics"]').checked;
      const marketing = banner.querySelector('[data-cat="marketing"]').checked;
      setConsent({ essential: true, analytics, marketing });
      hide();
    }
  });

  // Re-open from any footer link / button with data-cookie-prefs
  document.querySelectorAll('[data-cookie-prefs]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      show();
    });
  });

  // Show on first visit (no stored consent)
  if (!getConsent()) {
    setTimeout(show, 800);
  }
}
