/* =========================================
   DB Wellness & Fitness Training — Scripts
   ========================================= */

// --- Navbar scroll behavior ---
const navbar = document.getElementById('navbar');

const handleScroll = () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// --- Mobile hamburger menu ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);

  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});

// --- Intersection Observer for AOS-style animations ---
const aosObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        aosObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));

// --- Active nav link on scroll ---
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a:not(.nav-cta)');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === `#${id}`) {
            a.style.color = 'var(--white)';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));

// --- Video testimonial play button ---
const testimonialVideo = document.getElementById('testimonialVideo');
const videoPlayBtn = document.getElementById('videoPlayBtn');

if (testimonialVideo && videoPlayBtn) {
  videoPlayBtn.addEventListener('click', () => {
    testimonialVideo.play();
    videoPlayBtn.classList.add('hidden');
  });

  testimonialVideo.addEventListener('pause', () => {
    videoPlayBtn.classList.remove('hidden');
  });

  testimonialVideo.addEventListener('ended', () => {
    videoPlayBtn.classList.remove('hidden');
  });
}

// --- Smooth number counter animation for hero stats ---
const statNums = document.querySelectorAll('.stat-num');

const animateCounter = (el) => {
  const target = el.textContent;
  const suffix = target.replace(/[0-9]/g, '');
  const num = parseInt(target.replace(/\D/g, ''), 10);

  if (isNaN(num)) return;

  let current = 0;
  const duration = 1500;
  const steps = 60;
  const increment = num / steps;
  const stepTime = duration / steps;

  const timer = setInterval(() => {
    current = Math.min(current + increment, num);
    el.textContent = Math.round(current) + suffix;
    if (current >= num) clearInterval(timer);
  }, stepTime);
};

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statNums.forEach(el => statsObserver.observe(el));

// --- Parallax subtle effect on hero ---
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY < window.innerHeight && heroContent) {
    heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
    heroContent.style.opacity = 1 - (scrollY / (window.innerHeight * 0.7));
  }
}, { passive: true });

// --- Cursor glow effect on service cards ---
document.querySelectorAll('.service-card, .testimonial-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(201,168,76,0.06) 0%, transparent 60%), var(--dark-card)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

// --- Service card featured stays with its own background ---
const featuredCard = document.querySelector('.service-card-featured');
if (featuredCard) {
  featuredCard.addEventListener('mousemove', (e) => {
    const rect = featuredCard.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    featuredCard.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(201,168,76,0.1) 0%, transparent 60%), linear-gradient(145deg, #1c1811 0%, #161616 100%)`;
  });

  featuredCard.addEventListener('mouseleave', () => {
    featuredCard.style.background = '';
  });
}
