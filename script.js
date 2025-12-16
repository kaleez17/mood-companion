/* ===== Typewriter AI advice ===== */
const adviceLines = {
  happy: [
    "Your smile could power a Sunny Go sail—keep it bright.",
    "Share that energy; it multiplies when you give it away.",
    "Small wins stack into big adventures. Celebrate them.",
    "Joy is contagious—spread it like Luffy’s laughter.",
    "Every sunrise is a new chance to dance with life.",
    "Happiness is a treasure—guard it but also share it.",
    "Laugh loud, even the sea echoes back.",
    "Crewmates thrive when you shine with positivity.",
    "A cheerful heart makes storms easier to sail through.",
    "Keep chasing dreams with a grin—it’s your superpower."
  ],
  sad: [
    "Even the calm after a storm is part of the voyage.",
    "Lean on your crew—no captain sails alone.",
    "You’re allowed to pause; the sea will still be there tomorrow.",
    "Tears water the seeds of tomorrow’s strength.",
    "Sadness is proof you cared deeply—never lose that heart.",
    "Every scar tells a story of survival.",
    "It’s okay to drift; the tide always returns.",
    "Quiet moments rebuild the spirit for the next adventure.",
    "The ocean teaches patience—waves always come back.",
    "Your resilience is stronger than any storm cloud."
  ],
  angry: [
    "Breathe. Aim your strength, don’t let it scatter.",
    "Direct the fire into building, not burning.",
    "Choose your battles—victory is strategy, not volume.",
    "Anger is energy—forge it into determination.",
    "Even Zoro’s rage is sharpened into focus.",
    "Pause before striking—the sharpest blade is patience.",
    "Channel fury into discipline, not destruction.",
    "Strength is proven by control, not chaos.",
    "Let the fire light your path, not consume it.",
    "Resolve is born when anger finds purpose."
  ],
  love: [
    "Kindness is a compass; let it set your course.",
    "Love well, love steady—it makes the journey worth it.",
    "Guard your heart but keep the door open for your crew.",
    "Love is the anchor that steadies the storm.",
    "Sanji’s devotion reminds us: affection is strength, not weakness.",
    "Cherish bonds—they’re the true treasure of any voyage.",
    "Affection fuels courage when seas get rough.",
    "Love is the spark that keeps hope alive.",
    "Every gesture of care builds unbreakable trust.",
    "Hearts united sail farther than any lone ship."
  ]
};

function typeWriter(text, el, done) {
  let i = 0;
  el.textContent = "";
  const speed = 38;
  function tick() {
    if (i < text.length) {
      el.textContent += text.charAt(i++);
      setTimeout(tick, speed);
    } else {
      if (typeof done === "function") setTimeout(done, 600);
    }
  }
  tick();
}

function showAdvice(mood) {
  const box = document.getElementById("adviceBox");
  if (!box) return;
  box.innerHTML = "";
  const lines = adviceLines[mood] || [];
  let idx = 0;
  function next() {
    if (idx >= lines.length) return;
    const p = document.createElement("p");
    p.className = "line";
    box.appendChild(p);
    typeWriter(lines[idx++], p, next);
  }
  next();
}

/* ===== Visual effects spawners ===== */
function spawnConfetti(count = 24) {
  for (let i = 0; i < count; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = `${Math.random() * 100}%`;
    c.style.background = ["#f97316","#22c55e","#3b82f6","#eab308","#ec4899"][Math.floor(Math.random()*5)];
    c.style.animationDelay = `${Math.random() * 2}s`;
    c.style.transform = `translateX(${(Math.random()*60)-30}px)`;
    document.body.appendChild(c);
  }
}

function spawnEmbers(count = 20) {
  for (let i = 0; i < count; i++) {
    const e = document.createElement("div");
    e.className = "ember";
    e.style.left = `${Math.random() * 100}%`;
    e.style.animationDelay = `${Math.random() * 2}s`;
    document.body.appendChild(e);
  }
}

function spawnHearts(count = 24) {
  const container = document.createElement("div");
  container.className = "hearts";
  document.body.appendChild(container);
  for (let i = 0; i < count; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = "❤";
    h.style.left = `${Math.random() * 100}%`;
    h.style.animationDelay = `${Math.random() * 3}s`;
    container.appendChild(h);
  }
}

/* ===== Global audio toggle ===== */
const moodAudioMap = {
  happy: "assets/audio/happy-waves.mp3",
  sad: "assets/audio/sad-rain.mp3",
  angry: "assets/audio/angry-crackle.mp3",
  love: "assets/audio/love-chimes.mp3"
};

let audioEl = null;
let audioOn = false;

function initAudio(mood) {
  // Create or reuse audio element
  if (!audioEl) {
    audioEl = document.createElement("audio");
    audioEl.loop = true;
    audioEl.preload = "auto";
    document.body.appendChild(audioEl);
  }
  audioEl.src = moodAudioMap[mood] || "";
  if (audioOn && audioEl.src) {
    audioEl.play().catch(() => {});
  } else {
    audioEl.pause();
  }
}

function toggleAudio(btn, mood) {
  audioOn = !audioOn;
  btn.textContent = audioOn ? "🔊 Audio: On" : "🔇 Audio: Off";
  initAudio(mood);
}

/* ===== Dark mode switch ===== */
function initThemeToggle(btn) {
  const root = document.documentElement;
  const current = localStorage.getItem("theme") || "light";
  root.setAttribute("data-theme", current);
  btn.textContent = current === "dark" ? "🌙 Dark mode" : "☀️ Light mode";

  btn.addEventListener("click", () => {
    const now = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", now);
    localStorage.setItem("theme", now);
    btn.textContent = now === "dark" ? "🌙 Dark mode" : "☀️ Light mode";
  });
}

/* ===== Preloader ===== */
function showPreloader() {
  const overlay = document.createElement("div");
  overlay.className = "preloader";
  overlay.innerHTML = '<div class="loader"></div>';
  document.body.appendChild(overlay);
  return overlay;
}

function hidePreloader(overlay) {
  if (!overlay) return;
  overlay.style.opacity = "0";
  setTimeout(() => overlay.remove(), 200);
}

/* Initialize page-level UI */
function initPage({ mood }) {
  // Preloader: show on load, hide when DOM ready
  const pre = showPreloader();
  window.addEventListener("load", () => {
    setTimeout(() => hidePreloader(pre), 300);
  });

  // Advice
  showAdvice(mood);

  // Audio
  const audioBtn = document.getElementById("audioToggle");
  if (audioBtn) {
    audioBtn.addEventListener("click", () => toggleAudio(audioBtn, mood));
    audioBtn.textContent = "🔇 Audio: Off";
    initAudio(mood);
  }

  // Theme toggle
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) initThemeToggle(themeBtn);

  // Effects
  if (mood === "happy") spawnConfetti(36);
  if (mood === "angry") spawnEmbers(28);
  if (mood === "love")  spawnHearts(32);
  if (mood === "sad") {
    const rain = document.createElement("div");
    rain.className = "rain";
    document.body.appendChild(rain);
  }

  // Preloader on navigation clicks (smoothness)
  document.querySelectorAll('a[href]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:')) return;
      const overlay = showPreloader();
      setTimeout(() => { window.location.href = href; }, 150);
      e.preventDefault();
    });
  });
  // Fix for back navigation stuck preloader
window.addEventListener("pageshow", () => {
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    preloader.style.display = "none";
  }
});

}
