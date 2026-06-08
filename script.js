const textOptions = [
  'Creative Problem Solver',
  'Full-Stack Builder',
  'Engineering Explorer',
  'Interactive Web Designer'
];

const typedElement = document.querySelector('.typed-text');

if (typedElement) {
  typeEffect();
}
let typeIndex = 0;
let charIndex = 0;
let deleting = false;
let activeText = textOptions[0];

function typeEffect() {
  const current = textOptions[typeIndex];
  if (!deleting) {
    typedElement.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    typedElement.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      typeIndex = (typeIndex + 1) % textOptions.length;
    }
  }
  setTimeout(typeEffect, deleting ? 80 : 120);
}



const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section');

function updateActiveNav() {
  let currentSection = 'home';
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop <= window.innerHeight * 0.26) {
      currentSection = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
  });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

navLinks.forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
  });
});

const form = document.getElementById('contact-form');
const messageDiv = document.getElementById('form-message');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = form.elements['name'].value.trim();
  const email = form.elements['email'].value.trim();
  const message = form.elements['message'].value.trim();

  // compose mailto to open user's email client with prefilled content
  const to = 'kavindhra.s2024eee@sece.ac.in';
  const subject = encodeURIComponent(`Portfolio message from ${name || 'Website Visitor'}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  const mailto = `mailto:${to}?subject=${subject}&body=${body}`;

  // open mail client
  window.location.href = mailto;

  messageDiv.textContent = 'Opening your mail client to send the message...';
  messageDiv.className = 'form-message success';
  form.reset();
  setTimeout(() => {
    messageDiv.textContent = '';
    messageDiv.className = 'form-message';
  }, 5000);
});

// Mousemove decorative effects: subtle parallax + random hue shifts for orbs
const orbs = document.querySelectorAll('.orb');
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) - 0.5;
  const y = (e.clientY / window.innerHeight) - 0.5;

  orbs.forEach((orb, i) => {
    const depth = (i + 1) * 10; // movement multiplier
    orb.style.transform = `translate(${x * depth}px, ${y * depth}px) rotate(${x * 20}deg)`;
    // apply a small random hue rotation so effects vary continuously
    const hue = Math.floor((x + y + i) * 40 + (Date.now() % 360));
    orb.style.filter = `hue-rotate(${hue}deg) saturate(1.05)`;
    orb.style.transition = 'transform 120ms linear, filter 400ms linear';
  });
});

// Sprinkles effect on mouse move
(() => {
  const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#C77DFF', '#38BDF8', '#F472B6'];
  let forgive = true;
  let last = 0;
  let lastMoveTime = Date.now();
  let lastPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const rate = 20; // ms minimum between particles
  const maxParticles = 120;
  let sprinkleEnabled = true;

  function updateToggleButton() {
    const toggle = document.getElementById('sprinkle-toggle');
    if (!toggle) return;
    toggle.textContent = sprinkleEnabled ? 'Sprinkles: ON' : 'Sprinkles: OFF';
    toggle.classList.toggle('off', !sprinkleEnabled);
  }

  function makeSprinkle(x, y, isClick = false) {
    if (!sprinkleEnabled) return;
    const el = document.createElement('span');
    el.className = 'sprinkle';
    const color = colors[Math.floor(Math.random() * colors.length)];
    el.style.background = color;
    const size = 6 + Math.floor(Math.random() * (isClick ? 10 : 8));
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '18%';
    const duration = 700 + Math.floor(Math.random() * 500);
    el.style.animationDuration = `${duration}ms`;
    const sx = (Math.random() - 0.5) * 40 + 'px';
    el.style.setProperty('--sx', sx);
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    document.body.appendChild(el);

    el.addEventListener('animationend', () => {
      el.remove();
    });
  }

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    lastMoveTime = now;
    lastPos = { x: e.clientX, y: e.clientY };
    if (!sprinkleEnabled) return;
    if (now - last < rate) return;
    last = now;

    const current = document.querySelectorAll('.sprinkle').length;
    if (current > maxParticles) return;

    const count = Math.random() > 0.7 ? 4 : 2;
    for (let i = 0; i < count; i++) {
      const jitterX = e.clientX + (Math.random() - 0.5) * 20;
      const jitterY = e.clientY + (Math.random() - 0.5) * 20;
      makeSprinkle(jitterX, jitterY);
    }
  });

  document.addEventListener('click', (e) => {
    if (!sprinkleEnabled) return;
    const current = document.querySelectorAll('.sprinkle').length;
    if (current > maxParticles) return;
    const burst = 18 + Math.floor(Math.random() * 14);
    for (let i = 0; i < burst; i++) {
      const jitterX = e.clientX + (Math.random() - 0.5) * 60;
      const jitterY = e.clientY + (Math.random() - 0.5) * 60;
      makeSprinkle(jitterX, jitterY, true);
    }
  });

  const idleThreshold = 900; // ms of no movement to consider "idle"
  setInterval(() => {
    if (!sprinkleEnabled) return;
    const now = Date.now();
    const idle = now - lastMoveTime;
    if (idle > idleThreshold) {
      const current = document.querySelectorAll('.sprinkle').length;
      if (current > maxParticles) return;
      const count = Math.random() > 0.6 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        const jitterX = lastPos.x + (Math.random() - 0.5) * 24;
        const jitterY = lastPos.y + (Math.random() - 0.5) * 24;
        makeSprinkle(jitterX, jitterY);
      }
    }
  }, 700);

  const toggleButton = document.getElementById('sprinkle-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      sprinkleEnabled = !sprinkleEnabled;
      updateToggleButton();
    });
  }

  updateToggleButton();
})();

// RFID Modal Functionality
function initializeRfidModal() {
  console.log('RFID Modal initialization started');
  
  const rfidModal = document.getElementById('rfid-modal');
  const rfidGallery = document.getElementById('rfid-gallery');
  const openRfidBtn = document.getElementById('open-rfid-details');
  const closeRfidBtn = document.getElementById('close-rfid-details');
  const modalBackdrop = document.getElementById('modal-backdrop');

  console.log('RFID Elements found:', {
    modal: !!rfidModal,
    gallery: !!rfidGallery,
    openBtn: !!openRfidBtn,
    closeBtn: !!closeRfidBtn,
    backdrop: !!modalBackdrop
  });

  if (!rfidModal || !openRfidBtn) {
    console.error('❌ RFID modal or button element NOT found!');
    return;
  }

  const rfidImages = [
    'image/rfid1.jpeg',
    'image/rfid2.jpeg',
    'image/rfid3.jpeg',
    'image/rfid4.jpeg',
    'image/rfid5.jpeg',
    'image/rfid6.jpeg',
    'image/rfid7.jpeg',
    'image/rfid8.jpeg',
    'image/rfid9.jpeg'
  ];

  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  window.openRfidDetailsModal = function() {
    console.log('✅ Opening RFID modal');
    if (rfidGallery) {
      rfidGallery.innerHTML = '';
      const shuffled = shuffleArray(rfidImages);
      shuffled.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'RFID project photo';
        img.style.cursor = 'pointer';
        rfidGallery.appendChild(img);
      });
    }
    rfidModal.classList.remove('hidden');
    rfidModal.setAttribute('aria-hidden', 'false');
  };

  function closeRfidModal() {
    console.log('✅ Closing RFID modal');
    rfidModal.classList.add('hidden');
    rfidModal.setAttribute('aria-hidden', 'true');
  }

  // Attach click listener to open button
  console.log('Attaching click event to open button');
  openRfidBtn.addEventListener('click', function(e) {
    console.log('🖱️ Button clicked!');
    e.preventDefault();
    e.stopPropagation();
    window.openRfidDetailsModal();
  });

  // Attach close button listener
  if (closeRfidBtn) {
    closeRfidBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeRfidModal();
    });
  }

  // Attach backdrop click listener
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeRfidModal);
  }

  // Escape key to close
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && !rfidModal.classList.contains('hidden')) {
      closeRfidModal();
    }
  });

  console.log('✅ RFID Modal initialization complete');
}

// Initialize when DOM is ready
console.log('Script loaded, document.readyState:', document.readyState);
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeRfidModal);
} else {
  // DOM already loaded, initialize immediately
  setTimeout(initializeRfidModal, 0);
}
