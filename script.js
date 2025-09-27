gsap.registerPlugin(ScrollTrigger);
gsap.from("header.site-header", { y: -100, opacity: 0, duration: 1, ease: "power2.out" });

const animatePath = (id, d1, d2, duration) => {
  const path = document.getElementById(id);
  return gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "power1.inOut", duration } })
    .to(path, { attr: { d: d2 } }).to(path, { attr: { d: d1 } });
};
animatePath('thread1', "M10,70 C50,20 170,130 210,70", "M10,75 C55,25 165,135 210,75", 8);
animatePath('thread2', "M20,90 C70,30 160,120 200,80", "M20,85 C80,40 150,110 190,70", 6);
animatePath('thread3', "M5,60 C60,110 160,50 220,100", "M5,65 C55,115 150,45 215,100", 7);
gsap.to('svg.threads-cloud', { y: "-=8", repeat: -1, yoyo: true, ease: "sine.inOut", duration: 6 });

const pops = gsap.utils.toArray('.popcorn-pop');
const tlPop = gsap.timeline({ scrollTrigger: { trigger: ".popcorn-pop-container", start: "top 80%", toggleActions: "play reverse play none" } });
pops.forEach((pop, i) => {
  tlPop.fromTo(pop, { opacity: 0, scale: 0.2, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "elastic.out(1,0.6)" }, i * 0.15);
});

document.querySelectorAll("section").forEach(sec => {
  gsap.from(sec, { scrollTrigger: { trigger: sec, start: "top 80%", toggleActions: "play none none none" }, opacity: 0, y: 50, duration: 1, ease: "power2.out" });
});
gsap.from(".project-card", { scrollTrigger: { trigger: ".projects-section", start: "top 75%", toggleActions: "play none none none" }, y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: "bounce.out" });

const cards = document.querySelectorAll(".project-card");
cards.forEach(card => {
  card.addEventListener("mouseleave", () => { card.style.transform = ''; card.style.boxShadow = ''; });
  card.addEventListener("focus", () => { card.style.transform = `translateY(-12px) scale(1.06)`; card.style.boxShadow = `0 16px 32px rgba(0,0,0,0.15)`; });
  card.addEventListener("blur", () => { card.style.transform = ''; card.style.boxShadow = ''; });
  card.addEventListener("mouseenter", () => {
    for (let i = 0; i < 22; i++) {
      let spark = document.createElement("div");
      spark.className = "spark";
      spark.style.left = `${Math.random() * 100}%`;
      spark.style.top = `${Math.random() * 100}%`;
      card.appendChild(spark);
      gsap.fromTo(spark, { opacity: 1, scale: 0.4 }, { opacity: 0, scale: 1.9, duration: 3.4, ease: "power2.out", onComplete: () => spark.remove() });
    }
  });
});
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateX = ((y - midY) / midY) * 10;
    const rotateY = ((x - midX) / midX) * 10;

    card.style.transform = `translateY(-12px) scale(1.06) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.boxShadow = `0 20px 40px rgba(0,0,0,0.2)`;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });

});
// gsap.utils.toArray(".project-card").forEach(card => {
//     gsap.to(card, { y: '+=8', duration: 4 + Math.random() * 2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: Math.random() * 2 });
// });

const cursor = document.querySelector('.custom-cursor');

// Smooth trailing cursor
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let posX = mouseX, posY = mouseY;
let isSnapping = false;
const light = document.querySelector('.cursor-light');

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (isSnapping) {
    // Instantly move to cursor when snapping
    posX = mouseX;
    posY = mouseY;
    cursor.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;
    light.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;
  }
});

function animateCursor() {
  if (!isSnapping) {
    // Smooth trailing when not snapping
    posX += (mouseX - posX) * 0.15;
    posY += (mouseY - posY) * 0.15;
    cursor.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;
    light.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Particle trail
function createParticle(x, y) {
  const particle = document.createElement('div');
  particle.className = 'cursor-particle';
  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  document.body.appendChild(particle);

  gsap.to(particle, {
    x: '+=' + (Math.random() * 40 - 20),
    y: '+=' + (Math.random() * 40 - 20),
    scale: 0,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    onComplete: () => particle.remove()
  });
}

let lastTime = 0;
document.addEventListener('mousemove', e => {
  const now = Date.now();
  if (now - lastTime > 15) {
    createParticle(e.clientX, e.clientY);
    lastTime = now;
  }
});

// Enlarge cursor on interactive elements
const interactive = document.querySelectorAll('a, button, .project-card, .btn-primary, .site-title, h2, h1');
interactive.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('active'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

const modal = document.getElementById('project-modal');
const modalOverlay = modal.querySelector('.modal-overlay');
const modalTitle = modal.querySelector('.modal-title');
const modalDesc = modal.querySelector('.modal-description');
const modalIframeContainer = modal.querySelector('.modal-iframe-container');
const modalClose = modal.querySelector('.modal-close');

cards.forEach(card => {
  card.addEventListener('click', () => {
    // Fill modal content
    modalTitle.textContent = card.querySelector('h3').textContent;
    modalDesc.textContent = card.querySelector('p').textContent;

    modalIframeContainer.innerHTML = '';

    const preview = card.querySelector('.project-preview');
    if (preview && preview.dataset.src) {
      const iframe = document.createElement('iframe');
      iframe.src = preview.dataset.src;
      iframe.width = "100%";
      iframe.height = "400";
      iframe.style.border = "none";
      iframe.style.borderRadius = "10px";
      iframe.loading = "lazy";
      modalIframeContainer.appendChild(iframe);
    }


    modal.style.display = 'flex';
    gsap.to('.modal-content', { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" });
  });
});

// Close modal
const closeModal = () => {
  gsap.to('.modal-content', {
    scale: 0.8, opacity: 0, duration: 0.4, ease: "power3.in", onComplete: () => {
      modal.style.display = 'none';
      modalIframeContainer.innerHTML = '';
    }
  });
};

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

const wrapper = document.querySelector('.intro-wrapper');
const elements = wrapper.querySelectorAll('[data-depth]');
const introSection = document.querySelector('.intro-section');

const wrapperRotX = gsap.quickSetter(wrapper, "rotateX", "deg");
const wrapperRotY = gsap.quickSetter(wrapper, "rotateY", "deg");

const elementSetters = [];
elements.forEach(el => {
  elementSetters.push({
    setter: gsap.quickSetter(el, "x", "px"),
    depth: parseFloat(el.getAttribute("data-depth"))
  });
});

const rect = introSection.getBoundingClientRect();
const midX = rect.width / 2;
const midY = rect.height / 2;

introSection.addEventListener('mousemove', e => {
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateX = -((y - midY) / midY) * 8;
  const rotateY = ((x - midX) / midX) * 8;

  wrapperRotX(rotateX);
  wrapperRotY(rotateY);

  elementSetters.forEach(el => {
    el.setter(((x - midX) / midX) * el.depth * 20, ((y - midY) / midY) * el.depth * 20);
  });
});

introSection.addEventListener('mouseleave', () => {
  wrapperRotX(0);
  wrapperRotY(0);
  elementSetters.forEach(el => el.setter(0, 0));
});

const strangerBtn = document.querySelector('.btn-primary');
// Toggle revealing state on hover
strangerBtn.addEventListener('mouseenter', () => {
  strangerBtn.classList.add('revealing');
});
strangerBtn.addEventListener('mouseleave', () => {
  strangerBtn.classList.remove('revealing');
});

strangerBtn.addEventListener('mouseenter', () => {
  isSnapping = true;
  cursor.classList.add('snap-cursor');
});

strangerBtn.addEventListener('mouseleave', () => {
  isSnapping = false;
  cursor.classList.remove('snap-cursor');
});

// Track cursor position within button for mask
strangerBtn.addEventListener('mousemove', (e) => {
  const rect = strangerBtn.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  strangerBtn.style.setProperty('--cursor-x', `${x}px`);
  strangerBtn.style.setProperty('--cursor-y', `${y}px`);
});

// Button entrance animation (GSAP - subtle scale/fade on load)
gsap.from(".btn-primary", {
  scale: 0.9,
  opacity: 0,
  duration: 3.2,
  ease: "back.out(1.7)",
  delay: 0.3, // After other animations
  scrollTrigger: { trigger: ".contact-section", start: "top 80%" }
});

// Enhanced button interactions
let lastMouseTime = 0; // For throttling mousemove

// Toggle revealing state on hover/focus
const activateReveal = () => strangerBtn.classList.add('revealing');
const deactivateReveal = () => strangerBtn.classList.remove('revealing');

strangerBtn.addEventListener('mouseenter', activateReveal);
strangerBtn.addEventListener('focus', activateReveal); // Accessibility
strangerBtn.addEventListener('mouseleave', deactivateReveal);
strangerBtn.addEventListener('blur', deactivateReveal);

// Throttled cursor tracking for smoothness (60fps)
strangerBtn.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastMouseTime < 16) return; // Throttle to ~60fps
  lastMouseTime = now;

  const rect = strangerBtn.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  strangerBtn.style.setProperty('--cursor-x', `${x}px`);
  strangerBtn.style.setProperty('--cursor-y', `${y}px`);
});

// Touch support (simulate mousemove on mobile)
strangerBtn.addEventListener('touchstart', activateReveal, { passive: true });
strangerBtn.addEventListener('touchend', deactivateReveal, { passive: true });
strangerBtn.addEventListener('touchmove', (e) => {
  e.preventDefault(); // Prevent scrolling during reveal
  const touch = e.touches[0];
  const rect = strangerBtn.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  strangerBtn.style.setProperty('--cursor-x', `${x}px`);
  strangerBtn.style.setProperty('--cursor-y', `${y}px`);
}, { passive: false });

document.addEventListener('DOMContentLoaded', () => {
  const lazyIframes = document.querySelectorAll('.project-card iframe');

  lazyIframes.forEach((iframe) => {
    const src = iframe.getAttribute('src');
    iframe.setAttribute('data-src', src);
    iframe.removeAttribute('src');
  });

  ScrollTrigger.batch(".project-card", {
    onEnter: (batch) => {
      batch.forEach(card => {
        const iframe = card.querySelector('iframe');
        if (iframe && iframe.dataset.src) {
          iframe.src = iframe.dataset.src;
        }
      });
    },
    start: "top 85%"
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -60% 0px", // triggers when section is ~40% visible
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute("id");

        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});

const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("shrink");
  } else {
    navbar.classList.remove("shrink");
  }
});
