// ================= LANGUAGE TOGGLE (EN/AR) =================
const languageToggle = document.getElementById('languageToggle');
let currentLang = 'en';

const translations = {
  en: {
    nav: { home: 'Home', about: 'About', services: 'Services', more: 'More Details', why: 'Why Us', work: 'Work', pricing: 'Pricing', faq: 'FAQ', cta: 'Get a Quote' },
    hero1: { badge: 'Full-Service IT Partner', title: 'Complete <span class="accent">IT Services</span> for Modern Business', desc: 'From web development, cloud infrastructure, and cybersecurity to AI automation — I deliver end-to-end technology solutions that scale with you.' },
    hero2: { badge: 'Cybersecurity Excellence', title: 'Protect Your Business with <span class="accent">Enterprise Security</span>', desc: 'Security audits, threat detection, firewall setup, and compliance — keeping your data safe from modern cyber threats.' },
    hero3: { badge: 'Cloud & DevOps', title: 'Scale Faster with <span class="accent">Cloud Solutions</span> That Work', desc: 'Migrate, optimize, and manage your infrastructure on AWS, Azure, and Google Cloud — with zero downtime and full control.' },
    hero4: { badge: 'Web & Mobile Development', title: 'Beautiful <span class="accent">Websites & Apps</span> Built to Perform', desc: 'Custom websites, web apps, and mobile apps designed for speed, SEO, and user delight. Built to convert, not just to look pretty.' },
    hero5: { badge: 'AI & Automation', title: 'Automate Your Workflow with <span class="accent">AI Solutions</span>', desc: 'Custom AI models, intelligent chatbots, and workflow automation that eliminate manual work and unlock new efficiencies.' }
  },
  ar: {
    nav: { home: 'الرئيسية', about: 'عني', services: 'الخدمات', more: 'المزيد', why: 'لماذا أنا', work: 'أعمالي', pricing: 'الأسعار', faq: 'الأسئلة', cta: 'احصل على عرض' },
    hero1: { badge: 'شريك تقني شامل', title: 'خدمات <span class="accent">تقنية متكاملة</span> للأعمال الحديثة', desc: 'من تطوير الويب والبنية السحابية والأمن السيبراني إلى أتمتة الذكاء الاصطناعي — أقدم حلولاً تقنية متكاملة تنمو معك.' },
    hero2: { badge: 'تميز في الأمن السيبراني', title: 'احمِ أعمالك مع <span class="accent">أمان المؤسسات</span>', desc: 'تدقيق أمني، كشف التهديدات، إعداد الجدران النارية، والامتثال — لحماية بياناتك من التهديدات السيبرانية.' },
    hero3: { badge: 'السحابة و DevOps', title: 'توسع أسرع مع <span class="accent">الحلول السحابية</span>', desc: 'هجرة، تحسين، وإدارة بنيتك التحتية على AWS و Azure و Google Cloud — بدون توقف وبتحكم كامل.' },
    hero4: { badge: 'تطوير الويب والجوال', title: 'مواقع <span class="accent">وتطبيقات</span> جميلة الأداء', desc: 'مواقع وتطبيقات ويب وجوال مصممة للسرعة وتحسين محركات البحث. مبنية لتحويل الزوار، وليس فقط للجمال.' },
    hero5: { badge: 'الذكاء الاصطناعي والأتمتة', title: 'أتمت سير عملك مع <span class="accent">حلول الذكاء الاصطناعي</span>', desc: 'نماذج ذكاء اصطناعي مخصصة، روبوتات محادثة ذكية، وأتمتة سير العمل التي تلغي العمل اليدوي.' }
  }
};

function updateLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  languageToggle.textContent = lang === 'en' ? 'العربية' : 'English';
  languageToggle.setAttribute('aria-pressed', lang === 'ar' ? 'true' : 'false');
  
  const t = translations[lang];
  document.querySelectorAll('.nav-links a').forEach((a, i) => {
    const keys = ['home','about','services','more','why','work','pricing','faq','cta'];
    if (i < keys.length) a.textContent = t.nav[keys[i]];
  });
  
  const slides = document.querySelectorAll('.carousel-slide');
  const heroKeys = ['hero1','hero2','hero3','hero4','hero5'];
  slides.forEach((slide, i) => {
    if (i < heroKeys.length) {
      const h = t[heroKeys[i]];
      const badge = slide.querySelector('.slide-badge');
      const h1 = slide.querySelector('h1');
      const p = slide.querySelector('p');
      if (badge) badge.textContent = h.badge;
      if (h1) h1.innerHTML = h.title;
      if (p) p.textContent = h.desc;
    }
  });
}

languageToggle.addEventListener('click', () => {
  updateLanguage(currentLang === 'en' ? 'ar' : 'en');
});

// ================= HERO CAROUSEL =================
const slides = document.querySelectorAll('.carousel-slide');
const dotsContainer = document.getElementById('carouselDots');
let currentSlide = 0;
let slideInterval;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `Slide ${i+1}`);
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dotsContainer.children[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dotsContainer.children[currentSlide].classList.add('active');
  resetInterval();
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }
function resetInterval() { clearInterval(slideInterval); slideInterval = setInterval(nextSlide, 7000); }

document.getElementById('nextSlide').addEventListener('click', nextSlide);
document.getElementById('prevSlide').addEventListener('click', prevSlide);
resetInterval();

// ================= HEADER SCROLL =================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ================= MOBILE MENU =================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.textContent = isOpen ? '✕' : '☰';
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

// ================= SCROLL REVEAL =================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ================= SCROLL PROGRESS =================
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = progress + '%';
});

// ================= CURSOR GLOW =================
const cursorGlow = document.getElementById('cursorGlow');
if (window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });
} else {
  cursorGlow.style.display = 'none';
}

// ================= COUNTER ANIMATION =================
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-count'));
      let current = 0;
      const duration = 2000;
      const stepTime = 16;
      const steps = duration / stepTime;
      const increment = target / steps;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, stepTime);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ================= FAQ ACCORDION =================
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!wasActive) item.classList.add('active');
  });
});

// ================= TESTIMONIALS CAROUSEL =================
const track = document.getElementById('testimonialsTrack');
const cards = track.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');
const dotsContainerT = document.getElementById('testimonialDots');

let currentTestimonial = 0;
let visibleCards = 3;
let maxIndex = 0;

function getVisibleCards() {
  if (window.innerWidth <= 720) return 1;
  if (window.innerWidth <= 1000) return 2;
  return 3;
}

function updateTestimonialCarousel() {
  visibleCards = getVisibleCards();
  maxIndex = Math.max(0, cards.length - visibleCards);
  
  if (currentTestimonial > maxIndex) currentTestimonial = maxIndex;
  
  const cardWidth = cards[0].offsetWidth + 28;
  track.style.transform = `translateX(-${currentTestimonial * cardWidth}px)`;
  
  prevBtn.disabled = currentTestimonial === 0;
  nextBtn.disabled = currentTestimonial >= maxIndex;
  
  dotsContainerT.innerHTML = '';
  for (let i = 0; i <= maxIndex; i++) {
    const dot = document.createElement('button');
    dot.className = 'testimonial-dot' + (i === currentTestimonial ? ' active' : '');
    dot.setAttribute('aria-label', `Testimonial group ${i+1}`);
    dot.addEventListener('click', () => {
      currentTestimonial = i;
      updateTestimonialCarousel();
    });
    dotsContainerT.appendChild(dot);
  }
}

prevBtn.addEventListener('click', () => {
  if (currentTestimonial > 0) {
    currentTestimonial--;
    updateTestimonialCarousel();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentTestimonial < maxIndex) {
    currentTestimonial++;
    updateTestimonialCarousel();
  }
});

window.addEventListener('resize', updateTestimonialCarousel);
setTimeout(updateTestimonialCarousel, 100);

// ================= CONTACT FORM =================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;
  
  ['name','email','message'].forEach(id => {
    const group = document.getElementById(id).parentElement;
    const input = document.getElementById(id);
    group.classList.remove('error');
    if (id === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        group.classList.add('error');
        valid = false;
      }
    } else if (!input.value.trim()) {
      group.classList.add('error');
      valid = false;
    }
  });
  
  if (!valid) return;
  
  submitBtn.classList.add('loading');
  submitBtn.querySelector('.btn-text').textContent = 'Sending...';
  
  setTimeout(() => {
    submitBtn.classList.remove('loading');
    submitBtn.querySelector('.btn-text').textContent = 'Send Message';
    formStatus.className = 'form-status show success';
    formStatus.textContent = '✓ Thank you! Your message has been sent. I will get back to you within 24 hours.';
    contactForm.reset();
    setTimeout(() => { formStatus.className = 'form-status'; }, 5000);
  }, 1500);
});

// ================= NEWSLETTER =================
const newsletterForm = document.getElementById('newsletterForm');
const newsletterStatus = document.getElementById('newsletterStatus');

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('newsletterEmail').value;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newsletterStatus.className = 'newsletter-status show success';
    newsletterStatus.textContent = '✓ You are subscribed! Check your inbox for confirmation.';
    newsletterForm.reset();
  } else {
    newsletterStatus.className = 'newsletter-status show error';
    newsletterStatus.textContent = '✗ Please enter a valid email address.';
  }
  setTimeout(() => { newsletterStatus.className = 'newsletter-status'; }, 4000);
});

// ================= BACK TO TOP =================
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 600);
});
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ================= WHATSAPP CHAT POPUP =================
const waChatPopup = document.getElementById('waChatPopup');
const waChatClose = document.getElementById('waChatClose');
const whatsappFloat = document.getElementById('whatsappFloat');

setTimeout(() => { waChatPopup.classList.add('show'); }, 6000);

waChatClose.addEventListener('click', () => {
  waChatPopup.classList.remove('show');
});

whatsappFloat.addEventListener('mouseenter', () => {
  waChatPopup.classList.add('show');
});

// ================= ACTIVE NAV ON SCROLL =================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a:not(.nav-cta)');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navItems.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

sections.forEach(s => navObserver.observe(s));