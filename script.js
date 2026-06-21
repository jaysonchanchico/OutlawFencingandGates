// Hero parallax
const heroImg = document.getElementById('hero-img');
if (heroImg) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) {
    function heroParallax() {
      heroImg.style.transform = 'translateY(' + (window.scrollY * 0.4) + 'px)';
    }
    window.addEventListener('scroll', heroParallax, { passive: true });
    heroParallax();
  }
}

// Services bg parallax
const servicesBg = document.getElementById('services-bg');
if (servicesBg) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) {
    function servicesBgParallax() {
      const section = document.getElementById('services');
      const rect = section.getBoundingClientRect();
      const offset = (window.innerHeight - rect.top) * 0.15;
      servicesBg.style.transform = 'translateY(' + offset + 'px)';
    }
    window.addEventListener('scroll', servicesBgParallax, { passive: true });
    servicesBgParallax();
  }
}

// Nav scroll
const nav = document.getElementById('site-nav');
function onScroll() {
  if (window.scrollY > 80) {
    nav.style.backgroundColor = '#1C1A18';
    nav.style.borderBottomColor = 'rgba(245,239,224,0.12)';
  } else {
    nav.style.backgroundColor = 'transparent';
    nav.style.borderBottomColor = 'transparent';
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
let menuOpen = false;
function toggleMenu() {
  menuOpen = !menuOpen;
  document.getElementById('mobile-menu').classList.toggle('is-open', menuOpen);
}
function closeMenu() {
  menuOpen = false;
  document.getElementById('mobile-menu').classList.remove('is-open');
}

// Services dropdown
let servicesOpen = false;
function openServices() {
  servicesOpen = true;
  document.getElementById('services-dropdown').style.display = 'block';
}
function closeServices() {
  servicesOpen = false;
  document.getElementById('services-dropdown').style.display = 'none';
}
function toggleServices(e) {
  e.preventDefault();
  servicesOpen = !servicesOpen;
  document.getElementById('services-dropdown').style.display = servicesOpen ? 'block' : 'none';
}

// Scroll to estimate form
function scrollToForm() {
  const card = document.getElementById('estimate-form-card');
  if (!card) return;
  const y = card.getBoundingClientRect().top + window.scrollY - 90;
  window.scrollTo({ top: y, behavior: 'smooth' });
  const field = card.querySelector('select, input');
  if (field) setTimeout(() => { try { field.focus({ preventScroll: true }); } catch(e) { field.focus(); } }, 480);
}
function scrollToFormMobile() {
  closeMenu();
  setTimeout(scrollToForm, 60);
}

// Form validation + submit
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const service = form.service.value;
  const name = form.name.value.trim();
  const phone = form.phone.value;
  const digits = (phone.match(/\d/g) || []).length;
  const errors = {};
  if (!service) errors.service = true;
  if (!name) errors.name = true;
  if (digits < 10) errors.phone = true;
  document.getElementById('e-service').style.display = errors.service ? 'block' : 'none';
  document.getElementById('e-name').style.display = errors.name ? 'block' : 'none';
  document.getElementById('e-phone').style.display = errors.phone ? 'block' : 'none';
  if (Object.keys(errors).length) return;
  // TODO: POST to Formspree/Netlify endpoint before launch
  document.getElementById('form-container').style.display = 'none';
  document.getElementById('form-success').style.display = 'flex';
}

// Cookie banner
(function () {
  let choice = null;
  try { choice = localStorage.getItem('outlaw_cookie_choice'); } catch (e) {}
  if (!choice) document.getElementById('cookie-banner').style.display = 'flex';
})();
function acceptCookie() {
  try { localStorage.setItem('outlaw_cookie_choice', 'accepted'); } catch (e) {}
  document.getElementById('cookie-banner').style.display = 'none';
}
function declineCookie() {
  try { localStorage.setItem('outlaw_cookie_choice', 'declined'); } catch (e) {}
  document.getElementById('cookie-banner').style.display = 'none';
}

// Button / card hover effects
function btnEnter(e) { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.backgroundColor = '#A93A18'; }
function btnLeave(e) { e.currentTarget.style.transform = 'none'; e.currentTarget.style.backgroundColor = '#C0441E'; }
function btnEnterDark(e) { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.opacity = '0.92'; }
function btnLeaveDark(e) { e.currentTarget.style.transform = 'none'; e.currentTarget.style.opacity = '1'; }
function cardEnter(e) { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderTopColor = '#C0441E'; }
function cardLeave(e) { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderTopColor = 'transparent'; }
function linkEnter(e) { e.currentTarget.style.color = '#F5EFE0'; }
function linkLeave(e) { e.currentTarget.style.color = '#7A6F63'; }

// Gallery grid with placeholder images
(function () {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  const items = [
    { label: 'Chain Link Installation', img: 'https://images.unsplash.com/photo-1582058989417-5b48e919ff84?w=600&h=450&fit=crop&auto=format' },
    { label: 'Custom Gate',             img: 'https://images.unsplash.com/photo-1758636588716-5dc04a819c24?w=600&h=450&fit=crop&auto=format' },
    { label: 'RV Gate',                 img: 'https://images.unsplash.com/photo-1563902660142-d13851243d13?w=600&h=450&fit=crop&auto=format' },
    { label: 'Commercial Perimeter',    img: 'https://images.unsplash.com/photo-1553379027-7fcd98bc5f35?w=600&h=450&fit=crop&auto=format' },
    { label: 'Razor Wire',              img: 'https://images.unsplash.com/photo-1764486501574-d55d47693ef5?w=600&h=450&fit=crop&auto=format' },
    { label: 'Handrail',                img: 'https://images.unsplash.com/photo-1606494579572-f605276573f3?w=600&h=450&fit=crop&auto=format' },
    { label: 'Electric Fencing',        img: 'https://images.unsplash.com/photo-1684870742961-6ff3ab069cc1?w=600&h=450&fit=crop&auto=format' },
    { label: 'Slide Gate',              img: 'https://images.unsplash.com/photo-1774796212953-f046482ee6f1?w=600&h=450&fit=crop&auto=format' },
  ];
  items.forEach(({ label, img }, i) => {
    const fig = document.createElement('figure');
    fig.setAttribute('data-reveal', '');
    fig.setAttribute('data-reveal-delay', String((i % 3) * 80));
    fig.style.cssText = 'margin:0;position:relative;aspect-ratio:4/3;overflow:hidden;background:#1C1A18;cursor:pointer;';

    const image = document.createElement('img');
    image.src = img;
    image.alt = label;
    image.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;transition:transform 400ms ease-in-out, filter 400ms ease-in-out;';
    fig.appendChild(image);

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:absolute;inset:0;background:rgba(28,26,24,0.25);transition:background 300ms ease-in-out;';
    fig.appendChild(overlay);

    const cap = document.createElement('figcaption');
    cap.style.cssText = "position:absolute;left:0;right:0;bottom:0;background:#C0441E;color:#F5EFE0;font-family:'Oswald',sans-serif;font-weight:600;font-size:0.875rem;text-transform:uppercase;letter-spacing:0.02em;padding:9px 12px;";
    cap.textContent = label;
    fig.appendChild(cap);

    fig.addEventListener('mouseenter', () => {
      image.style.transform = 'scale(1.05)';
      image.style.filter = 'grayscale(0.6)';
      overlay.style.background = 'rgba(28,26,24,0.45)';
    });
    fig.addEventListener('mouseleave', () => {
      image.style.transform = 'scale(1)';
      image.style.filter = 'none';
      overlay.style.background = 'rgba(28,26,24,0.25)';
    });

    grid.appendChild(fig);
  });
})();

// Scroll reveal
(function () {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = Array.from(document.querySelectorAll('[data-reveal]'));
  if (reduce || !('IntersectionObserver' in window)) return;
  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 300ms ease-in-out, transform 300ms ease-in-out';
  });
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
        setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, delay);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();
