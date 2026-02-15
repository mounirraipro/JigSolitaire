// ==========================================
// JigSolitaire Game Engine v5
// Premium UI, Sound Engine, Confetti, Animations
// ==========================================

(function () {
  'use strict';

  // ==========================================
  // SOUND ENGINE — Web Audio API Synthesizer
  // ==========================================
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = true;
      this.initialized = false;
      this.musicVolume = 0.25;
      this.sfxVolume = 0.4;
    }

    init() {
      if (this.initialized) return;
      try {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.initialized = true;
      } catch (e) {
        console.warn('Web Audio API not supported');
      }
    }

    // Create an oscillator note
    _note(freq, type, duration, volume, delay = 0) {
      if (!this.ctx || !this.enabled) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);
      gain.gain.setValueAtTime(volume * this.sfxVolume, this.ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + delay + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + delay);
      osc.stop(this.ctx.currentTime + delay + duration);
    }

    // Tile pickup — soft high pluck
    pickup() {
      this._note(880, 'sine', 0.12, 0.3);
      this._note(1320, 'sine', 0.08, 0.15, 0.03);
    }

    // Tile drop — satisfying thud
    drop() {
      this._note(220, 'sine', 0.15, 0.35);
      this._note(165, 'triangle', 0.1, 0.2, 0.02);
    }

    // Merge — gentle chime
    merge() {
      this._note(523, 'sine', 0.2, 0.3);
      this._note(659, 'sine', 0.2, 0.25, 0.08);
      this._note(784, 'sine', 0.3, 0.2, 0.16);
    }

    // Win — ascending arpeggio celebration
    win() {
      const notes = [523, 659, 784, 1047, 1319, 1568];
      notes.forEach((freq, i) => {
        this._note(freq, 'sine', 0.35, 0.25, i * 0.1);
        this._note(freq * 1.5, 'triangle', 0.25, 0.1, i * 0.1 + 0.05);
      });
    }

    // Button click — subtle tick
    click() {
      this._note(600, 'sine', 0.06, 0.15);
    }

    // Screen transition — soft whoosh (noise-like)
    whoosh() {
      if (!this.ctx || !this.enabled) return;
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3);
      }
      const source = this.ctx.createBufferSource();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      source.buffer = buffer;
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.15 * this.sfxVolume, this.ctx.currentTime);
      source.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      source.start();
    }
  }

  // ==========================================
  // MUSIC MANAGER — Playlist & Fading
  // ==========================================
  class MusicManager {
    constructor() {
      this.tracks = [
        '/Music/Golden Time.mp3',
        '/Music/Golden Time Extra.mp3',
        '/Music/Golden Time Reup.mp3',
      ];
      this.currentAudio = null;
      this.nextAudio = null;
      this.playing = false;
      this.volume = 0.6; // Increased from 0.3 to ensure audibility
      this.fadeDuration = 2000; // ms
    }

    playRandom() {
      if (!this.playing) {
        console.log('Music: Play request ignored (not playing)');
        return;
      }
      
      // Pick random track different from current
      let nextTrack;
      do {
        nextTrack = this.tracks[Math.floor(Math.random() * this.tracks.length)];
      } while (this.currentAudio && this.currentAudio.src.endsWith(encodeURI(nextTrack).split('/').pop()) && this.tracks.length > 1);

      console.log('Music: Loading track', nextTrack);
      const audio = new Audio(nextTrack);
      audio.volume = 0;
      audio.loop = false;
      
      // When track ends, play next
      audio.addEventListener('ended', () => {
        console.log('Music: Track ended, playing next');
        this.playRandom();
      });

      // Handle loading error
      audio.addEventListener('error', (e) => {
        console.warn('Music: Load error, trying next:', nextTrack, e);
        setTimeout(() => this.playRandom(), 1000);
      });

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log('Music: Playing started');
          this._fadeIn(audio);
          if (this.currentAudio) {
            this._fadeOut(this.currentAudio);
          }
          this.currentAudio = audio;
        }).catch(e => {
          console.error('Music: Autoplay prevented/Error', e);
          // Retry on next interaction if possible, or just log
        });
      }
    }

    _fadeIn(audio) {
      const step = 0.02;
      const interval = this.fadeDuration * step / this.volume;
      const fade = setInterval(() => {
        if (!this.playing) {
          console.log('Music: FadeIn aborted (stopped)');
          audio.volume = 0; // Ensure muted if stopped
          clearInterval(fade);
          return;
        }
        if (audio.volume < this.volume) {
          audio.volume = Math.min(this.volume, audio.volume + step);
          // console.log('Music: Volume', audio.volume.toFixed(2)); // Uncomment for noisy logs
        } else {
          console.log('Music: FadeIn complete at', audio.volume);
          clearInterval(fade);
        }
      }, interval);
    }

    _fadeOut(audio) {
      const step = 0.02;
      const interval = this.fadeDuration * step / this.volume;
      const fade = setInterval(() => {
        if (audio.volume > 0) {
          audio.volume = Math.max(0, audio.volume - step);
        } else {
          clearInterval(fade);
          audio.pause();
          audio.src = ''; // Release memory
        }
      }, interval);
    }

    start() {
      if (this.playing) return;
      this.playing = true;
      this.playRandom();
    }

    stop() {
      this.playing = false;
      if (this.currentAudio) {
        this._fadeOut(this.currentAudio);
      }
    }

    // Immediate mute/unmute without fading restart
    setMute(muted) {
      if (muted) {
        this.playing = false;
        if (this.currentAudio) this.currentAudio.volume = 0;
      } else {
        this.playing = true;
        if (this.currentAudio) {
           this.currentAudio.volume = this.volume;
           this.currentAudio.play().catch(() => {});
        } else {
           this.start();
        }
      }
    }
  }

  // ==========================================
  // CONFETTI SYSTEM
  // ==========================================
  class ConfettiSystem {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.running = false;
      this.colors = ['#e8614d', '#22c55e', '#6366f1', '#eab308', '#f97316', '#ec4899', '#14b8a6'];
    }

    resize() {
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
    }

    burst(count = 80) {
      this.resize();
      this.particles = [];
      const cx = this.canvas.width / 2;
      const cy = this.canvas.height * 0.35;

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const speed = 3 + Math.random() * 6;
        this.particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3,
          size: 4 + Math.random() * 6,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 12,
          gravity: 0.12 + Math.random() * 0.08,
          friction: 0.98,
          opacity: 1,
          shape: Math.random() > 0.5 ? 'rect' : 'circle',
        });
      }

      if (!this.running) {
        this.running = true;
        this._animate();
      }
    }

    _animate() {
      if (!this.running) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      let alive = 0;
      for (const p of this.particles) {
        p.vy += p.gravity;
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.opacity -= 0.008;

        if (p.opacity <= 0) continue;
        alive++;

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.globalAlpha = p.opacity;
        this.ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          this.ctx.fill();
        }
        this.ctx.restore();
      }

      if (alive > 0) {
        requestAnimationFrame(() => this._animate());
      } else {
        this.running = false;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }

    stop() {
      this.running = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  // ==========================================
  // GAME CONFIG & DATA
  // ==========================================
  const ICON = {
    lock: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="#9a8e82" stroke-width="1.2"/><path d="M5 7V5a3 3 0 116 0v2" stroke="#9a8e82" stroke-width="1.2" stroke-linecap="round"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#22c55e" stroke-width="1.2"/><path d="M5 8l2 2 4-4" stroke="#22c55e" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    play: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 2.5l7 4.5-7 4.5V2.5z" fill="#9a8e82"/></svg>',
  };

  const CAT_DESC = {
    animals: 'Wildlife from around the world',
    nature: 'Landscapes and natural wonders',
    cities: 'Iconic urban destinations',
    art: 'Paintings and creative works',
    food: 'Culinary delights and cuisine',
  };

  const CATEGORIES = [
    {
      slug: 'animals', name: 'Animals', color: '#ef4444', imgSeed: 'animals-cat',
      levels: [
        { id: 1, title: 'Playful Kitten', cols: 3, rows: 3, difficulty: 'Easy', seed: 'kitten' },
        { id: 2, title: 'Tropical Parrot', cols: 3, rows: 3, difficulty: 'Easy', seed: 'parrot' },
        { id: 3, title: 'Ocean Dolphins', cols: 4, rows: 4, difficulty: 'Medium', seed: 'dolphin' },
        { id: 4, title: 'Safari Lion', cols: 4, rows: 4, difficulty: 'Hard', seed: 'lion' },
        { id: 5, title: 'Arctic Fox', cols: 5, rows: 3, difficulty: 'Expert', seed: 'arctic-fox' },
      ],
    },
    {
      slug: 'nature', name: 'Nature', color: '#22c55e', imgSeed: 'nature-cat',
      levels: [
        { id: 6, title: 'Mountain Sunrise', cols: 3, rows: 3, difficulty: 'Easy', seed: 'mountain' },
        { id: 7, title: 'Autumn Forest', cols: 3, rows: 3, difficulty: 'Easy', seed: 'autumn' },
        { id: 8, title: 'Ocean Waves', cols: 4, rows: 4, difficulty: 'Medium', seed: 'ocean' },
        { id: 9, title: 'Cherry Blossoms', cols: 4, rows: 4, difficulty: 'Hard', seed: 'cherry' },
        { id: 10, title: 'Northern Lights', cols: 5, rows: 3, difficulty: 'Expert', seed: 'aurora' },
      ],
    },
    {
      slug: 'cities', name: 'Cities', color: '#6366f1', imgSeed: 'cities-cat',
      levels: [
        { id: 11, title: 'Paris Eiffel', cols: 3, rows: 3, difficulty: 'Easy', seed: 'paris' },
        { id: 12, title: 'Tokyo Nights', cols: 3, rows: 3, difficulty: 'Easy', seed: 'tokyo' },
        { id: 13, title: 'New York Skyline', cols: 4, rows: 4, difficulty: 'Medium', seed: 'newyork' },
        { id: 14, title: 'Venice Canals', cols: 4, rows: 4, difficulty: 'Hard', seed: 'venice' },
        { id: 15, title: 'Dubai Lights', cols: 5, rows: 3, difficulty: 'Expert', seed: 'dubai' },
      ],
    },
    {
      slug: 'art', name: 'Art', color: '#f97316', imgSeed: 'art-cat',
      levels: [
        { id: 16, title: 'Starry Night', cols: 3, rows: 3, difficulty: 'Easy', seed: 'painting' },
        { id: 17, title: 'Abstract Colors', cols: 3, rows: 3, difficulty: 'Easy', seed: 'abstract' },
        { id: 18, title: 'Watercolor Garden', cols: 4, rows: 4, difficulty: 'Medium', seed: 'watercolor' },
        { id: 19, title: 'Pop Art Faces', cols: 4, rows: 4, difficulty: 'Hard', seed: 'popart' },
        { id: 20, title: 'Renaissance Study', cols: 5, rows: 3, difficulty: 'Expert', seed: 'renaissance' },
      ],
    },
    {
      slug: 'food', name: 'Food', color: '#eab308', imgSeed: 'food-cat',
      levels: [
        { id: 21, title: 'Fresh Sushi', cols: 3, rows: 3, difficulty: 'Easy', seed: 'sushi' },
        { id: 22, title: 'Berry Basket', cols: 3, rows: 3, difficulty: 'Easy', seed: 'berries' },
        { id: 23, title: 'Italian Pizza', cols: 4, rows: 4, difficulty: 'Medium', seed: 'pizza' },
        { id: 24, title: 'Chocolate Dream', cols: 4, rows: 4, difficulty: 'Hard', seed: 'chocolate' },
        { id: 25, title: 'Farmers Market', cols: 5, rows: 3, difficulty: 'Expert', seed: 'market' },
      ],
    },
  ];

  // ==========================================
  // PROGRESS (localStorage)
  // ==========================================
  const STORAGE_KEY = 'jigsolitaire_progress';
  const SOUND_PREF_KEY = 'jigsolitaire_sound';

  function getProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch { return {}; }
  }

  function markSolved(levelId) {
    const p = getProgress();
    p[levelId] = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  }

  function isLevelUnlocked(cat, levelIndex) {
    if (levelIndex === 0) return true;
    const prevLevel = cat.levels[levelIndex - 1];
    return !!getProgress()[prevLevel.id];
  }

  function isLevelSolved(levelId) {
    return !!getProgress()[levelId];
  }

  function getSolvedCount(cat) {
    const p = getProgress();
    return cat.levels.filter(l => p[l.id]).length;
  }

  // ==========================================
  // STATE
  // ==========================================
  let currentCategory = null;
  let currentLevel = null;
  let currentLevelIndex = 0;
  let tiles = [];
  let cols = 3, rows = 3;
  let tileW = 0, tileH = 0;
  let moves = 0;
  let timerInterval = null;
  let seconds = 0;
  let sourceImage = null;
  let dragging = null;
  let dragX = 0, dragY = 0;
  let mergedGroups = [];
  let isAnimating = false;
  let prevMergedCount = 0;

  // ==========================================
  // DOM
  // ==========================================
  const menuScreen = document.getElementById('menu-screen');
  const levelScreen = document.getElementById('level-screen');
  const gameScreen = document.getElementById('game-screen');
  const winScreen = document.getElementById('win-screen');
  const categoryGrid = document.getElementById('category-grid');
  const levelGrid = document.getElementById('level-grid');
  const levelCatImg = document.getElementById('level-cat-img');
  const levelCatName = document.getElementById('level-cat-name');
  const levelCatDesc = document.getElementById('level-cat-desc');
  const moveCounter = document.getElementById('move-counter');
  const timerEl = document.getElementById('timer');
  const gameLevelTitle = document.getElementById('game-level-title');
  const gameCanvas = document.getElementById('game-canvas');
  const previewCanvas = document.getElementById('preview-canvas');
  const ctx = gameCanvas.getContext('2d');
  const pctx = previewCanvas.getContext('2d');

  // ==========================================
  // INIT SOUND & MUSIC
  // ==========================================
  const sfx = new SoundEngine();
  const music = new MusicManager();
  window.music = music; // Expose for debugging
  const confetti = new ConfettiSystem(document.getElementById('confetti-canvas'));

  // Sound preference
  let soundEnabled = localStorage.getItem(SOUND_PREF_KEY) !== 'off';

  function updateSoundUI() {
    const menuBtn = document.getElementById('sound-toggle-menu');
    const gameBtn = document.getElementById('sound-toggle-game');
    const menuLabel = document.getElementById('sound-label-menu');

    const onSVG = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>`;
    const offSVG = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>`;

    if (soundEnabled) {
      menuBtn.classList.add('active');
      gameBtn.classList.add('active');
      if (menuLabel) menuLabel.textContent = 'Sound On';
      document.getElementById('sound-icon-menu').innerHTML = onSVG;
      document.getElementById('sound-icon-game').innerHTML = onSVG;
    } else {
      menuBtn.classList.remove('active');
      gameBtn.classList.remove('active');
      if (menuLabel) menuLabel.textContent = 'Sound Off';
      document.getElementById('sound-icon-menu').innerHTML = offSVG;
      document.getElementById('sound-icon-game').innerHTML = offSVG;
    }
  }

  function toggleSound() {
    sfx.init(); // init on first interaction
    soundEnabled = !soundEnabled;
    sfx.enabled = soundEnabled;
    music.setMute(!soundEnabled); // Mute if disabled, unmute if enabled
    localStorage.setItem(SOUND_PREF_KEY, soundEnabled ? 'on' : 'off');
    updateSoundUI();
    
    if (soundEnabled) sfx.click();
  }

  document.getElementById('sound-toggle-menu').addEventListener('click', toggleSound);
  document.getElementById('sound-toggle-game').addEventListener('click', toggleSound);
  updateSoundUI();

  // Initialize sound on any first interaction
  function initOnInteraction() {
    sfx.init();
    if (soundEnabled && !music.isPlaying) {
      music.start();
    }
    document.removeEventListener('click', initOnInteraction);
    document.removeEventListener('touchstart', initOnInteraction);
  }
  document.addEventListener('click', initOnInteraction);
  document.addEventListener('touchstart', initOnInteraction);

  // ==========================================
  // SCREEN MANAGEMENT
  // ==========================================
  function showScreen(screen) {
    [menuScreen, levelScreen, gameScreen, winScreen].forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
    sfx.whoosh();
  }

  // ==========================================
  // IMAGE LOADING
  // ==========================================
  function picUrl(seed, w, h) {
    return `https://picsum.photos/seed/${seed}/${w}/${h}`;
  }

  function loadImage(seed, w, h) {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => resolve(generateFallback(seed, w, h));
      img.src = picUrl(seed, w, h);
    });
  }

  function generateFallback(seed, w, h) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const x = c.getContext('2d');
    const s = typeof seed === 'string' ? seed.split('').reduce((a, ch) => a + ch.charCodeAt(0), 0) : seed;
    const h1 = (s * 47) % 360, h2 = (h1 + 80) % 360;
    const grad = x.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, `hsl(${h1}, 55%, 65%)`);
    grad.addColorStop(1, `hsl(${h2}, 50%, 60%)`);
    x.fillStyle = grad;
    x.fillRect(0, 0, w, h);
    for (let i = 0; i < 8; i++) {
      x.save(); x.globalAlpha = 0.15;
      x.fillStyle = `hsl(${(h1 + i * 45) % 360}, 60%, 70%)`;
      x.beginPath();
      x.arc((s * (i + 1) * 73) % w, (s * (i + 1) * 97) % h, 20 + (s * (i + 1) * 31) % 60, 0, Math.PI * 2);
      x.fill(); x.restore();
    }
    return c;
  }

  // ==========================================
  // MENU
  // ==========================================
  function initMenu() {
    categoryGrid.innerHTML = '';
    CATEGORIES.forEach((cat, catIndex) => {
      const solved = getSolvedCount(cat);
      const total = cat.levels.length;
      const pct = Math.round((solved / total) * 100);
      const card = document.createElement('div');
      card.className = 'category-card';
      card.style.animationDelay = `${0.15 + catIndex * 0.1}s`;
      card.innerHTML = `
        <img class="cat-thumbnail" src="${picUrl(cat.imgSeed, 400, 260)}" alt="${cat.name}" loading="lazy">
        <div class="cat-body">
          <div class="cat-name">${cat.name}</div>
          <div class="cat-meta">
            <span>${solved}/${total}</span>
            <div class="cat-progress-bar">
              <div class="cat-progress-fill" style="width:${pct}%;background:${cat.color}"></div>
            </div>
          </div>
        </div>
      `;
      card.addEventListener('click', () => {
        sfx.click();
        openCategory(cat);
      });
      categoryGrid.appendChild(card);
    });
  }

  function openCategory(cat) {
    currentCategory = cat;
    levelCatImg.innerHTML = `<img src="${picUrl(cat.imgSeed, 144, 144)}" alt="${cat.name}">`;
    levelCatName.textContent = cat.name;
    levelCatDesc.textContent = CAT_DESC[cat.slug] || '';
    levelGrid.innerHTML = '';

    cat.levels.forEach((level, i) => {
      const unlocked = isLevelUnlocked(cat, i);
      const solved = isLevelSolved(level.id);
      const card = document.createElement('div');
      card.className = 'level-card' + (solved ? ' level-solved' : '') + (!unlocked ? ' level-locked' : '');
      card.style.animationDelay = `${0.1 + i * 0.08}s`;

      let statusIcon;
      if (solved) statusIcon = ICON.check;
      else if (!unlocked) statusIcon = ICON.lock;
      else statusIcon = ICON.play;

      card.innerHTML = `
        <img class="level-thumb" src="${picUrl(level.seed, 400, 220)}" alt="${level.title}" loading="lazy">
        <div class="level-body">
          <span class="level-title">${level.title}</span>
          <div class="level-meta-right">
            <span class="level-diff" style="background:${cat.color}0d;color:${cat.color}">${level.difficulty}</span>
            <span class="level-status-icon">${statusIcon}</span>
          </div>
        </div>
      `;

      if (unlocked) {
        card.addEventListener('click', () => {
          sfx.click();
          currentLevelIndex = i;
          startGame(cat, level);
        });
      }
      levelGrid.appendChild(card);
    });

    showScreen(levelScreen);
  }

  // ==========================================
  // GAME
  // ==========================================
  async function startGame(cat, level) {
    currentCategory = cat;
    currentLevel = level;
    cols = level.cols;
    rows = level.rows;
    moves = 0;
    seconds = 0;
    mergedGroups = [];
    dragging = null;
    isAnimating = true;
    prevMergedCount = 0;

    gameLevelTitle.textContent = level.title;
    showScreen(gameScreen);
    confetti.stop();

    // Size board
    const bp = document.querySelector('.board-panel');
    const aW = bp.clientWidth - 16;
    const aH = bp.clientHeight - 16;
    const ratio = cols / rows;
    let bW, bH;
    if (aW / aH > ratio) { bH = aH; bW = bH * ratio; }
    else { bW = aW; bH = bW / ratio; }

    bW = Math.floor(bW); bH = Math.floor(bH);
    tileW = Math.floor(bW / cols);
    tileH = Math.floor(bH / rows);
    bW = tileW * cols;
    bH = tileH * rows;

    gameCanvas.width = bW;
    gameCanvas.height = bH;

    // Preview
    const rp = document.querySelector('.ref-panel');
    const rW = rp.clientWidth - 32;
    const rH = Math.floor(rW / ratio);
    previewCanvas.width = rW;
    previewCanvas.height = rH;

    // Loading
    ctx.fillStyle = '#f5f0eb';
    ctx.fillRect(0, 0, bW, bH);
    ctx.fillStyle = '#9a8e82';
    ctx.font = '500 13px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Loading...', bW / 2, bH / 2);

    sourceImage = await loadImage(level.seed, bW, bH);
    pctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    pctx.drawImage(sourceImage, 0, 0, previewCanvas.width, previewCanvas.height);

    // Tiles — initially in correct order
    const total = cols * rows;
    tiles = [];
    for (let i = 0; i < total; i++) tiles.push({ correctIndex: i, currentIndex: i });

    // Draw full image on game canvas with "Memorize!" overlay
    ctx.clearRect(0, 0, bW, bH);
    ctx.drawImage(sourceImage, 0, 0, bW, bH);

    // Draw subtle grid lines
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.35)';
    ctx.lineWidth = 1;
    for (let c = 1; c < cols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * tileW, 0);
      ctx.lineTo(c * tileW, bH);
      ctx.stroke();
    }
    for (let r = 1; r < rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * tileH);
      ctx.lineTo(bW, r * tileH);
      ctx.stroke();
    }
    ctx.restore();

    // "Memorize!" label — premium pill style
    ctx.save();
    const labelW = 180, labelH = 48;
    const lx = (bW - labelW) / 2, ly = (bH - labelH) / 2;
    ctx.fillStyle = 'rgba(26,23,20,0.65)';
    ctx.beginPath();
    ctx.roundRect(lx, ly, labelW, labelH, 24);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = '650 15px Outfit, Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Memorize!', bW / 2, bH / 2);
    ctx.restore();

    updateMoveCounter();
    updateTimer();

    // Wait 5 seconds, then shuffle with animation
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Shuffle
    for (let i = total - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i].currentIndex, tiles[j].currentIndex] = [tiles[j].currentIndex, tiles[i].currentIndex];
    }
    if (isSolved()) {
      [tiles[0].currentIndex, tiles[1].currentIndex] = [tiles[1].currentIndex, tiles[0].currentIndex];
    }

    // Animate shuffle
    const animDuration = 800;
    const startPositions = tiles.map(t => {
      const cc = t.correctIndex % cols;
      const cr = Math.floor(t.correctIndex / cols);
      return { x: cc * tileW, y: cr * tileH };
    });
    const endPositions = tiles.map(t => {
      const cc = t.currentIndex % cols;
      const cr = Math.floor(t.currentIndex / cols);
      return { x: cc * tileW, y: cr * tileH };
    });

    await new Promise(resolve => {
      const t0 = performance.now();

      function animFrame(now) {
        const elapsed = now - t0;
        const progress = Math.min(elapsed / animDuration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);

        ctx.clearRect(0, 0, bW, bH);
        ctx.fillStyle = '#f5f0eb';
        ctx.fillRect(0, 0, bW, bH);

        for (let i = 0; i < tiles.length; i++) {
          const t = tiles[i];
          const sx = t.correctIndex % cols;
          const sy = Math.floor(t.correctIndex / cols);
          const curX = startPositions[i].x + (endPositions[i].x - startPositions[i].x) * ease;
          const curY = startPositions[i].y + (endPositions[i].y - startPositions[i].y) * ease;

          ctx.drawImage(sourceImage, sx * tileW, sy * tileH, tileW, tileH, curX, curY, tileW, tileH);
          ctx.strokeStyle = 'rgba(26,23,20,0.06)';
          ctx.lineWidth = 1;
          ctx.strokeRect(curX, curY, tileW, tileH);
        }

        if (progress < 1) {
          requestAnimationFrame(animFrame);
        } else {
          resolve();
        }
      }

      requestAnimationFrame(animFrame);
    });

    // Animation done — start game
    isAnimating = false;
    startTimer();
    checkMerges();
    drawBoard();
  }

  function isSolved() { return tiles.every(t => t.currentIndex === t.correctIndex); }

  // ==========================================
  // GRID HELPERS
  // ==========================================
  function tileAtGrid(gc, gr) {
    if (gc < 0 || gc >= cols || gr < 0 || gr >= rows) return -1;
    return tiles.findIndex(t => t.currentIndex === gr * cols + gc);
  }

  function gridOf(ti) {
    const ci = tiles[ti].currentIndex;
    return { col: ci % cols, row: Math.floor(ci / cols) };
  }

  function correctGridOf(ti) {
    const ci = tiles[ti].correctIndex;
    return { col: ci % cols, row: Math.floor(ci / cols) };
  }

  function pxOf(ti) {
    const g = gridOf(ti);
    return { x: g.col * tileW, y: g.row * tileH };
  }

  // ==========================================
  // RELATIVE-POSITION GROUPING
  // ==========================================
  function areRelativeNeighbors(tiA, tiB) {
    const curA = gridOf(tiA), curB = gridOf(tiB);
    const corA = correctGridOf(tiA), corB = correctGridOf(tiB);
    const dcCur = curB.col - curA.col;
    const drCur = curB.row - curA.row;
    if (Math.abs(dcCur) + Math.abs(drCur) !== 1) return false;
    return dcCur === (corB.col - corA.col) && drCur === (corB.row - corA.row);
  }

  function checkMerges() {
    mergedGroups = [];
    const visited = new Set();

    for (let i = 0; i < tiles.length; i++) {
      if (visited.has(i)) continue;
      const group = new Set();
      const queue = [i];
      group.add(i); visited.add(i);

      while (queue.length) {
        const cur = queue.shift();
        const cp = gridOf(cur);
        [{ dc: 0, dr: -1 }, { dc: 1, dr: 0 }, { dc: 0, dr: 1 }, { dc: -1, dr: 0 }].forEach(d => {
          const nc = cp.col + d.dc, nr = cp.row + d.dr;
          if (nc < 0 || nc >= cols || nr < 0 || nr >= rows) return;
          const ni = tileAtGrid(nc, nr);
          if (ni === -1 || visited.has(ni)) return;
          if (areRelativeNeighbors(cur, ni)) {
            group.add(ni); visited.add(ni); queue.push(ni);
          }
        });
      }
      if (group.size >= 2) mergedGroups.push(group);
    }

    // Play merge sound if new merge happened
    const currentMergedCount = mergedGroups.reduce((sum, g) => sum + g.size, 0);
    if (currentMergedCount > prevMergedCount && prevMergedCount > 0) {
      sfx.merge();
    }
    prevMergedCount = currentMergedCount;
  }

  function getGroupOf(ti) { return mergedGroups.find(g => g.has(ti)) || null; }
  function getDragGroup(ti) { const g = getGroupOf(ti); return g ? Array.from(g) : [ti]; }

  // ==========================================
  // DRAWING
  // ==========================================
  function drawBoard() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.fillStyle = '#f5f0eb';
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    if (!sourceImage) return;

    const draggingSet = new Set();
    if (dragging) dragging.groupIndices.forEach(i => draggingSet.add(i));

    tiles.forEach((_, i) => { if (!draggingSet.has(i)) drawTile(i); });
    tiles.forEach((_, i) => { if (!draggingSet.has(i)) drawBorders(i); });

    if (dragging) {
      const anchor = pxOf(dragging.anchorTileIdx);
      const dx = dragX - dragging.offsetX - anchor.x;
      const dy = dragY - dragging.offsetY - anchor.y;

      ctx.save();
      ctx.fillStyle = 'rgba(26,23,20,0.04)';
      dragging.groupIndices.forEach(i => {
        const p = pxOf(i);
        ctx.fillRect(p.x + dx + 4, p.y + dy + 4, tileW, tileH);
      });
      ctx.restore();

      dragging.groupIndices.forEach(i => { const p = pxOf(i); drawTile(i, p.x + dx, p.y + dy, true); });
      dragging.groupIndices.forEach(i => { const p = pxOf(i); drawBorders(i, p.x + dx, p.y + dy, true); });
    }
  }

  function drawTile(ti, ox, oy, isDrag) {
    const t = tiles[ti];
    const sc = t.correctIndex % cols;
    const sr = Math.floor(t.correctIndex / cols);
    const p = pxOf(ti);
    const x = ox !== undefined ? ox : p.x;
    const y = oy !== undefined ? oy : p.y;

    ctx.save();
    if (isDrag) {
      ctx.shadowColor = 'rgba(232,97,77,0.12)';
      ctx.shadowBlur = 16;
      ctx.shadowOffsetY = 4;
    }
    ctx.drawImage(sourceImage, sc * tileW, sr * tileH, tileW, tileH, x, y, tileW, tileH);
    ctx.restore();
  }

  function drawBorders(ti, ox, oy, isDrag) {
    const group = getGroupOf(ti);
    const p = pxOf(ti);
    const x = ox !== undefined ? ox : p.x;
    const y = oy !== undefined ? oy : p.y;
    const gp = gridOf(ti);

    const sides = [
      { dc: 0, dr: -1, edge: 'top' },
      { dc: 1, dr: 0, edge: 'right' },
      { dc: 0, dr: 1, edge: 'bottom' },
      { dc: -1, dr: 0, edge: 'left' },
    ];

    ctx.save();
    sides.forEach(s => {
      const nc = gp.col + s.dc, nr = gp.row + s.dr;
      if (group && nc >= 0 && nc < cols && nr >= 0 && nr < rows) {
        const ni = tileAtGrid(nc, nr);
        if (ni !== -1 && group.has(ni)) return;
      }

      if (group && group.size >= 2) {
        ctx.strokeStyle = isDrag ? 'rgba(232,97,77,0.45)' : 'rgba(232,97,77,0.2)';
        ctx.lineWidth = isDrag ? 2.5 : 2;
      } else {
        ctx.strokeStyle = isDrag ? 'rgba(26,23,20,0.12)' : 'rgba(26,23,20,0.06)';
        ctx.lineWidth = 1;
      }

      ctx.beginPath();
      if (s.edge === 'top') { ctx.moveTo(x, y); ctx.lineTo(x + tileW, y); }
      else if (s.edge === 'right') { ctx.moveTo(x + tileW, y); ctx.lineTo(x + tileW, y + tileH); }
      else if (s.edge === 'bottom') { ctx.moveTo(x, y + tileH); ctx.lineTo(x + tileW, y + tileH); }
      else { ctx.moveTo(x, y); ctx.lineTo(x, y + tileH); }
      ctx.stroke();
    });
    ctx.restore();
  }

  // ==========================================
  // MOVEMENT
  // ==========================================
  function performGroupMove(groupIndices, colOff, rowOff) {
    if (colOff === 0 && rowOff === 0) return;
    const dragSet = new Set(groupIndices);

    const moves_map = [];
    for (const ti of groupIndices) {
      const old = tiles[ti].currentIndex;
      const oc = old % cols, or = Math.floor(old / cols);
      const nc = oc + colOff, nr = or + rowOff;
      if (nc < 0 || nc >= cols || nr < 0 || nr >= rows) return;
      moves_map.push({ tileIdx: ti, oldGridIdx: old, newGridIdx: nr * cols + nc });
    }

    const newGridSet = new Set(moves_map.map(m => m.newGridIdx));
    const oldGridSet = new Set(moves_map.map(m => m.oldGridIdx));

    const displaced = [];
    for (const m of moves_map) {
      const occ = tiles.findIndex(t => t.currentIndex === m.newGridIdx);
      if (occ !== -1 && !dragSet.has(occ)) {
        displaced.push(occ);
      }
    }

    const freed = [];
    for (const m of moves_map) {
      if (!newGridSet.has(m.oldGridIdx)) {
        freed.push(m.oldGridIdx);
      }
    }

    if (displaced.length !== freed.length) return;

    for (const m of moves_map) {
      tiles[m.tileIdx].currentIndex = m.newGridIdx;
    }

    for (let i = 0; i < displaced.length; i++) {
      tiles[displaced[i]].currentIndex = freed[i];
    }

    moves++;
    updateMoveCounter();
    sfx.drop();
    checkMerges();
    drawBoard();
    if (isSolved()) win();
  }

  function swapTilesOrGroups(dragIdx, targetGridIdx) {
    const tt = tiles.findIndex(t => t.currentIndex === targetGridIdx);
    if (tt === -1 || tt === dragIdx) return;

    [tiles[dragIdx].currentIndex, tiles[tt].currentIndex] =
      [tiles[tt].currentIndex, tiles[dragIdx].currentIndex];

    moves++;
    updateMoveCounter();
    sfx.drop();
    checkMerges();
    drawBoard();
    if (isSolved()) win();
  }

  // ==========================================
  // INPUT
  // ==========================================
  function getCanvasPos(e) {
    const r = gameCanvas.getBoundingClientRect();
    const sx = gameCanvas.width / r.width, sy = gameCanvas.height / r.height;
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (cx - r.left) * sx, y: (cy - r.top) * sy };
  }

  function tileAtPixel(px, py) {
    return tileAtGrid(Math.floor(px / tileW), Math.floor(py / tileH));
  }

  function onDown(e) {
    if (isAnimating) return;
    e.preventDefault();
    const pos = getCanvasPos(e);
    const ti = tileAtPixel(pos.x, pos.y);
    if (ti === -1) return;
    sfx.pickup();
    const group = getDragGroup(ti);
    dragging = { groupIndices: group, anchorTileIdx: ti, offsetX: pos.x - pxOf(ti).x, offsetY: pos.y - pxOf(ti).y };
    dragX = pos.x; dragY = pos.y;
    drawBoard();
  }

  function onMove(e) {
    if (!dragging || isAnimating) return;
    e.preventDefault();
    const pos = getCanvasPos(e);
    dragX = pos.x; dragY = pos.y;
    drawBoard();
  }

  function onUp(e) {
    if (!dragging || isAnimating) return;
    e.preventDefault();
    const anchor = pxOf(dragging.anchorTileIdx);
    const dx = dragX - dragging.offsetX - anchor.x;
    const dy = dragY - dragging.offsetY - anchor.y;

    if (dragging.groupIndices.length === 1) {
      const cx = anchor.x + dx + tileW / 2;
      const cy = anchor.y + dy + tileH / 2;
      const tc = Math.floor(cx / tileW), tr = Math.floor(cy / tileH);
      if (tc >= 0 && tc < cols && tr >= 0 && tr < rows) {
        const tgi = tr * cols + tc;
        if (tgi !== tiles[dragging.anchorTileIdx].currentIndex) swapTilesOrGroups(dragging.anchorTileIdx, tgi);
      }
    } else {
      performGroupMove(dragging.groupIndices, Math.round(dx / tileW), Math.round(dy / tileH));
    }
    dragging = null;
    drawBoard();
  }

  gameCanvas.addEventListener('mousedown', onDown);
  gameCanvas.addEventListener('mousemove', onMove);
  gameCanvas.addEventListener('mouseup', onUp);
  gameCanvas.addEventListener('mouseleave', onUp);
  gameCanvas.addEventListener('touchstart', onDown, { passive: false });
  gameCanvas.addEventListener('touchmove', onMove, { passive: false });
  gameCanvas.addEventListener('touchend', onUp, { passive: false });

  // ==========================================
  // TIMER
  // ==========================================
  function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => { seconds++; updateTimer(); }, 1000);
  }
  function stopTimer() { clearInterval(timerInterval); }
  function updateTimer() {
    const m = Math.floor(seconds / 60);
    timerEl.textContent = `${m}:${(seconds % 60).toString().padStart(2, '0')}`;
  }
  function updateMoveCounter() { moveCounter.textContent = `${moves} moves`; }

  // ==========================================
  // WIN
  // ==========================================
  function win() {
    stopTimer();
    markSolved(currentLevel.id);
    sfx.win();

    const finalMoves = moves;
    const finalTime = `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

    // Show/hide Next Level button
    const nextBtn = document.getElementById('next-level');
    const nextIndex = currentLevelIndex + 1;
    if (nextIndex < currentCategory.levels.length) {
      nextBtn.style.display = '';
      nextBtn.onclick = () => {
        sfx.click();
        currentLevelIndex = nextIndex;
        startGame(currentCategory, currentCategory.levels[nextIndex]);
      };
    } else {
      nextBtn.style.display = 'none';
    }

    setTimeout(() => {
      showScreen(winScreen);

      // Animated counter for moves
      const movesEl = document.getElementById('win-moves');
      const timeEl = document.getElementById('win-time');
      animateCounter(movesEl, finalMoves, 800);
      timeEl.textContent = finalTime;

      // Confetti burst!
      setTimeout(() => confetti.burst(100), 200);
    }, 400);
  }

  // Animate a number counting up
  function animateCounter(el, target, duration) {
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * ease);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ==========================================
  // NAVIGATION
  // ==========================================
  document.getElementById('back-to-menu').addEventListener('click', () => {
    sfx.click();
    initMenu();
    showScreen(menuScreen);
  });
  document.getElementById('back-to-levels').addEventListener('click', () => {
    sfx.click();
    stopTimer();
    openCategory(currentCategory);
  });
  document.getElementById('play-again').addEventListener('click', () => {
    sfx.click();
    startGame(currentCategory, currentLevel);
  });
  document.getElementById('back-to-menu-win').addEventListener('click', () => {
    sfx.click();
    initMenu();
    showScreen(menuScreen);
  });

  // ==========================================
  // RESIZE
  // ==========================================
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (currentLevel && gameScreen.classList.contains('active')) {
        const bp = document.querySelector('.board-panel');
        const aW = bp.clientWidth - 16, aH = bp.clientHeight - 16;
        const ratio = cols / rows;
        let bW, bH;
        if (aW / aH > ratio) { bH = aH; bW = bH * ratio; }
        else { bW = aW; bH = bW / ratio; }
        bW = Math.floor(bW); bH = Math.floor(bH);
        tileW = Math.floor(bW / cols); tileH = Math.floor(bH / rows);
        bW = tileW * cols; bH = tileH * rows;
        gameCanvas.width = bW; gameCanvas.height = bH;
        const rp = document.querySelector('.ref-panel');
        const rW = rp.clientWidth - 32;
        const rH = Math.floor(rW / ratio);
        previewCanvas.width = rW; previewCanvas.height = rH;
        pctx.drawImage(sourceImage, 0, 0, rW, rH);
        drawBoard();
      }
    }, 200);
  });

  // ==========================================
  // INIT
  // ==========================================
  initMenu();
})();
