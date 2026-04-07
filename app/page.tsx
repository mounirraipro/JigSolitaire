import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import AdSlot from './components/AdSlot';
import MobileGamePreview from './components/MobileGamePreview';
import Icon from './components/Icon';

export const metadata: Metadata = {
  title: 'JigSolitaire Online – Free Jigsaw Puzzle Game, No Download',
  description:
    'Play JigSolitaire online free — the unique browser puzzle game that blends jigsaw and solitaire. Swap tiles, merge groups, restore images. 25+ levels, 5 categories, instant play.',
  keywords: [
    'JigSolitaire',
    'JigSolitaire online',
    'jigsolitaire free',
    'jigsaw puzzle online',
    'free online puzzle game',
    'tile swap puzzle',
    'solitaire puzzle game',
    'brain games free',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'JigSolitaire Online – Free Jigsaw Puzzle Game',
    description:
      'Swap tiles, merge groups, and restore beautiful images. Play JigSolitaire free in your browser — no download, no account.',
    images: [{ url: '/Jigsolitaire.online_Thmbnail.png', width: 1200, height: 630 }],
  },
};

const RECENT_POSTS = [
  {
    slug: 'jigsolitaire-review',
    title: 'JigSolitaire Review 2026: Is It the Best Free Online Puzzle Game?',
    excerpt: 'An in-depth review covering gameplay, features, performance, and an honest verdict.',
    category: 'Reviews',
    readTime: '13 min read',
  },
  {
    slug: 'jigsolitaire-online-guide',
    title: 'How to Play JigSolitaire Online: Complete Beginner\'s Guide',
    excerpt: 'Step-by-step instructions, strategies, and tips for new players.',
    category: 'Strategy',
    readTime: '10 min read',
  },
  {
    slug: 'neuroscience-of-puzzle-solving',
    title: 'The Neuroscience of Puzzle Solving',
    excerpt: 'What dopamine, neural plasticity, and brain research say about every puzzle you solve.',
    category: 'Science',
    readTime: '10 min read',
  },
];

const CATEGORIES = [
  { name: 'Animals', icon: 'paw',      color: '#f59e0b', bg: '#fef3c7', img: '/level-thumbs/Animals/JigSolitaire_Animals1.webp' },
  { name: 'Nature',  icon: 'leaf',     color: '#10b981', bg: '#d1fae5', img: '/level-thumbs/Nature/JigSolitaire_Nature1.webp'  },
  { name: 'Cities',  icon: 'building', color: '#3b82f6', bg: '#dbeafe', img: '/level-thumbs/Cities/JigSolitaire_Cities1.webp'  },
  { name: 'Art',     icon: 'palette',  color: '#8b5cf6', bg: '#ede9fe', img: '/level-thumbs/Art/JigSolitaire_Art1.webp'        },
  { name: 'Food',    icon: 'utensils', color: '#ef4444', bg: '#fee2e2', img: '/level-thumbs/Food/JigSolitaire_Food1.webp'      },
] as const;

const FEATURES = [
  { icon: 'merge',  title: 'Unique Merge Mechanic', desc: 'Adjacent tiles in the right position fuse into a group. Move the group as one — the puzzle simplifies as you go.' },
  { icon: 'target', title: 'Progressive Difficulty', desc: 'Start gentle with a 3×3 grid and scale up to the 3×5 challenge. Flow state at every level.' },
  { icon: 'device', title: 'Play on Any Device',     desc: 'Touch drag-and-drop on mobile, precise mouse control on desktop. Fully responsive, no app required.' },
  { icon: 'bolt',   title: 'Instant Start',          desc: 'No account, no download, no loading screen. Click Play and you are puzzling in seconds.' },
  { icon: 'image',  title: 'Beautiful Photography',  desc: 'Every level features carefully curated, high-resolution images across five distinct themes.' },
  { icon: 'music',  title: 'Ambient Soundtrack',     desc: 'Calm background music and subtle sound effects designed to enhance focus without distraction.' },
] as const;

const STEPS = [
  { icon: 'folder',       title: 'Choose a Category',  desc: 'Pick Animals, Nature, Cities, Art, or Food. Each has five levels with progressively larger grids.' },
  { icon: 'eye',          title: 'Memorise the Image', desc: 'Before tiles scatter, study the 5-second preview. Lock the colours and composition in your mind.' },
  { icon: 'refresh',      title: 'Swap Tiles',         desc: 'Drag any tile to an adjacent position to swap. Plan your moves for efficiency.' },
  { icon: 'puzzle',       title: 'Watch Tiles Merge',  desc: 'Correctly placed neighbours fuse into groups. Move the entire group together as one.' },
  { icon: 'check-circle', title: 'Complete the Image', desc: 'Restore the photograph to finish. Track your time and move count for personal bests.' },
] as const;

const FAQ_ITEMS = [
  { q: 'What is JigSolitaire?', a: 'JigSolitaire is a free browser-based puzzle game that combines jigsaw puzzle logic with a tile-swapping mechanic. You drag and swap grid tiles to reconstruct a scrambled image. Correctly placed adjacent tiles merge into movable groups, creating a satisfying cascade toward the solution.' },
  { q: 'How do I play JigSolitaire online?', a: 'Visit the Play page, choose one of five image categories, select a level, and start swapping tiles. No download, no account, and no payment is required.' },
  { q: 'Is JigSolitaire free?', a: 'Yes — JigSolitaire is 100% free to play. Every level and every category is available at no cost, with no paywalls or premium tiers.' },
  { q: 'Does JigSolitaire work on mobile?', a: 'Yes. JigSolitaire supports touch drag-and-drop on iOS and Android. It is fully responsive and runs in any modern mobile browser without installation.' },
  { q: 'How many levels does JigSolitaire have?', a: 'JigSolitaire features 25 handcrafted levels spread across five categories, with grid sizes from an easy 3×3 (9 tiles) to a challenging 3×5 (15 tiles). New levels are added regularly.' },
  { q: 'What makes JigSolitaire different from other jigsaw games?', a: 'Most digital jigsaw games simply place irregular pieces. JigSolitaire uses a clean grid and a unique merging mechanic — when adjacent tiles are correctly placed, they fuse into a group that moves together.' },
  { q: 'Is JigSolitaire safe for kids?', a: 'Yes. JigSolitaire has no social features, no user-generated content, no chat, and no violent imagery. It complies with COPPA and does not collect personal data from children.' },
] as const;

const RESOURCES = [
  { href: 'https://en.wikipedia.org/wiki/Jigsaw_puzzle',       source: 'Wikipedia', title: 'History of Jigsaw Puzzles',  desc: 'From 18th-century dissected maps to modern digital grids.',          icon: 'book'    },
  { href: 'https://en.wikipedia.org/wiki/Patience_(game)',     source: 'Wikipedia', title: 'Solitaire (Patience) Guide', desc: 'The origins, variants, and popularity of solitaire card games.',    icon: 'cards'   },
  { href: 'https://en.wikipedia.org/wiki/Puzzle_video_game',   source: 'Wikipedia', title: 'Puzzle Video Games',         desc: 'The genre that has captivated players for decades.',                 icon: 'gamepad' },
  { href: 'https://www.youtube.com/results?search_query=JigSolitaire+online+puzzle+game', source: 'YouTube', title: 'JigSolitaire Gameplay', desc: 'Watch the game in action — tutorials and speedruns.', icon: 'video' },
] as const;

export default function Home() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  const gameSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: 'JigSolitaire',
    description: 'A free browser puzzle game combining jigsaw and solitaire mechanics. Swap tiles to restore beautiful images across 25+ levels.',
    url: 'https://jigsolitaire.online',
    genre: ['Puzzle', 'Strategy'],
    gamePlatform: 'Web Browser',
    applicationCategory: 'Game',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameSchema) }} />

      {/* ══ HERO — iframe only ══════════════════════════════════════════ */}
      <section className="lp-hero">
        <div className="lp-hero-bg" aria-hidden="true">
          <div className="lp-blob lp-blob-1" />
          <div className="lp-blob lp-blob-2" />
          <div className="lp-blob lp-blob-3" />
        </div>
        <div className="lp-hero-frame">
          <MobileGamePreview />
        </div>
      </section>

      {/* ══ INTRO — title + stats ═══════════════════════════════════════ */}
      <section className="lp-intro">
        <div className="container lp-intro-inner">
          <div className="lp-eyebrow">
            <Icon name="sparkles" size={14} />
            <span>Free • No download • No account</span>
          </div>
          <h1 className="lp-title">
            <span>JigSolitaire Online</span>
            <span className="lp-title-accent">The puzzle game your brain has been waiting for.</span>
          </h1>
          <p className="lp-lede">
            Swap scrambled tiles, watch them merge, and restore stunning images.
            JigSolitaire blends the calm of jigsaw puzzles with the strategy of solitaire
            into something entirely new — <strong>100% free</strong>, instant play in your browser.
          </p>
          <div className="lp-hero-ctas">
            <Link href="/play" className="lp-btn lp-btn-primary">
              <Icon name="play" size={16} />
              Play Free Now
            </Link>
            <Link href="/how-to-play" className="lp-btn lp-btn-ghost">
              How to Play
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>

          <div className="lp-stats">
            {[
              { v: '25+',  l: 'Handcrafted Levels' },
              { v: '5',    l: 'Image Categories' },
              { v: '0',    l: 'Downloads Needed' },
              { v: '100%', l: 'Free Forever' },
            ].map((s) => (
              <div key={s.l} className="lp-stat">
                <span className="lp-stat-v">{s.v}</span>
                <span className="lp-stat-l">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdSlot type="banner" />

      {/* ══ ABOUT — text + image grid ═══════════════════════════════════ */}
      <section className="lp-section">
        <div className="container">
          <div className="lp-about-grid">
            <div className="lp-about-text">
              <span className="lp-kicker">What is JigSolitaire?</span>
              <h2>A fresh take on two timeless puzzle genres.</h2>
              <p>
                <strong>JigSolitaire</strong> is a free online puzzle game available directly
                in your browser. It takes the visual challenge of a{' '}
                <a href="https://en.wikipedia.org/wiki/Jigsaw_puzzle" target="_blank" rel="noopener noreferrer" className="lp-link">
                  jigsaw puzzle
                </a>{' '}
                and pairs it with the strategy of{' '}
                <a href="https://en.wikipedia.org/wiki/Patience_(game)" target="_blank" rel="noopener noreferrer" className="lp-link">
                  solitaire
                </a>
                , creating a hybrid experience unlike anything else on the web.
              </p>
              <p>
                The core mechanic is tile-swapping: a beautiful photograph is scrambled into a
                grid, and you drag tiles to swap positions until the image is restored. The
                twist? When two adjacent tiles are correctly placed, they automatically{' '}
                <em>merge</em> into a group that moves as one — making the puzzle progressively
                simpler as you build momentum.
              </p>
              <div className="lp-about-badges">
                <div className="lp-trust-badge">
                  <Icon name="shield" size={18} />
                  <div>
                    <strong>Safe for all ages</strong>
                    <span>No ads in gameplay, no data collection</span>
                  </div>
                </div>
                <div className="lp-trust-badge">
                  <Icon name="bolt" size={18} />
                  <div>
                    <strong>Instant play</strong>
                    <span>Runs in any modern browser</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lp-about-collage">
              {[
                { cat: 'Animals', src: '/level-thumbs/Animals/JigSolitaire_Animals1.webp', pos: 'a' },
                { cat: 'Nature',  src: '/level-thumbs/Nature/JigSolitaire_Nature1.webp',   pos: 'b' },
                { cat: 'Cities',  src: '/level-thumbs/Cities/JigSolitaire_Cities1.webp',   pos: 'c' },
                { cat: 'Food',    src: '/level-thumbs/Food/JigSolitaire_Food1.webp',       pos: 'd' },
              ].map((item) => (
                <div key={item.cat} className={`lp-collage-item lp-collage-${item.pos}`}>
                  <Image src={item.src} alt={`JigSolitaire ${item.cat} puzzle preview`} width={280} height={200} />
                  <span>{item.cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ HOW TO PLAY — card grid ══════════════════════════════════════ */}
      <section className="lp-section lp-section-tinted">
        <div className="container">
          <div className="lp-section-head">
            <span className="lp-kicker">How it works</span>
            <h2>Master the basics in two minutes.</h2>
            <p>Five simple steps from scrambled tiles to a perfectly restored image.</p>
          </div>

          <div className="lp-how-grid">
            {STEPS.map((step, i) => (
              <div key={step.title} className="lp-how-card">
                <span className="lp-how-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="lp-how-icon">
                  <Icon name={step.icon} size={22} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CATEGORIES — image cards with svg icons ═════════════════════ */}
      <section className="lp-section">
        <div className="container">
          <div className="lp-section-head">
            <span className="lp-kicker">Five worlds</span>
            <h2>Choose your puzzle flavour.</h2>
            <p>Every category features stunning photography and five handcrafted levels.</p>
          </div>

          <div className="lp-cats">
            {CATEGORIES.map((cat) => (
              <Link key={cat.name} href="/play" className="lp-cat">
                <div className="lp-cat-img">
                  <Image src={cat.img} alt={`JigSolitaire ${cat.name} category`} width={300} height={220} />
                  <div className="lp-cat-gradient" style={{ background: `linear-gradient(180deg, transparent 40%, ${cat.color}ee 100%)` }} />
                  <div className="lp-cat-icon-chip" style={{ background: cat.bg, color: cat.color }}>
                    <Icon name={cat.icon} size={18} />
                  </div>
                </div>
                <div className="lp-cat-info">
                  <span className="lp-cat-name">{cat.name}</span>
                  <span className="lp-cat-levels">5 levels</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AdSlot type="banner" />

      {/* ══ FEATURES — offset grid ══════════════════════════════════════ */}
      <section className="lp-section lp-section-tinted">
        <div className="container">
          <div className="lp-section-head">
            <span className="lp-kicker">Why players love it</span>
            <h2>Little details that make a big difference.</h2>
            <p>Every interaction is crafted to feel smooth, satisfying, and never frustrating.</p>
          </div>

          <div className="lp-features">
            {FEATURES.map((f, i) => (
              <div key={f.title} className={`lp-feature ${i % 2 === 0 ? 'lp-feature-a' : 'lp-feature-b'}`}>
                <div className="lp-feature-icon">
                  <Icon name={f.icon} size={22} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EXTERNAL RESOURCES ══════════════════════════════════════════ */}
      <section className="lp-section">
        <div className="container">
          <div className="lp-section-head">
            <span className="lp-kicker">Dig deeper</span>
            <h2>Learn more about puzzle games.</h2>
            <p>JigSolitaire is part of a rich tradition. Explore the history and science of the genre.</p>
          </div>

          <div className="lp-resources">
            {RESOURCES.map((r) => (
              <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className="lp-resource">
                <div className="lp-resource-icon">
                  <Icon name={r.icon} size={20} />
                </div>
                <div className="lp-resource-body">
                  <span className="lp-resource-src">{r.source}</span>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                </div>
                <Icon name="arrow-right" size={16} className="lp-resource-arrow" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BLOG ════════════════════════════════════════════════════════ */}
      <section className="lp-section lp-section-tinted">
        <div className="container">
          <div className="lp-section-head">
            <span className="lp-kicker">From the blog</span>
            <h2>Puzzle guides, science &amp; strategy.</h2>
            <p>In-depth articles on puzzle games, cognitive science, and winning strategies.</p>
          </div>

          <div className="lp-blog">
            {RECENT_POSTS.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="lp-blog-card">
                <span className="lp-blog-cat">{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="lp-blog-read">
                  {post.readTime}
                  <Icon name="arrow-right" size={14} />
                </span>
              </Link>
            ))}
          </div>

          <div className="lp-center">
            <Link href="/blog" className="lp-btn lp-btn-ghost">
              Browse all articles
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ FAQ ═════════════════════════════════════════════════════════ */}
      <section className="lp-section">
        <div className="container lp-faq-wrap">
          <div className="lp-section-head">
            <span className="lp-kicker">FAQ</span>
            <h2>Questions, answered.</h2>
          </div>

          <div className="lp-faq">
            {FAQ_ITEMS.map(({ q, a }) => (
              <details key={q} className="lp-faq-item">
                <summary>
                  <span>{q}</span>
                  <span className="lp-faq-chev" aria-hidden="true" />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ═══════════════════════════════════════════════════ */}
      <section className="lp-cta">
        <div className="lp-cta-bg" aria-hidden="true" />
        <div className="container lp-cta-inner">
          <Icon name="trophy" size={32} className="lp-cta-icon" />
          <h2>Your next puzzle is one click away.</h2>
          <p>No signup, no download. Open your browser and start solving beautiful puzzles in seconds.</p>
          <Link href="/play" className="lp-btn lp-btn-primary lp-btn-lg">
            <Icon name="play" size={18} />
            Play JigSolitaire Free
          </Link>
        </div>
      </section>
    </>
  );
}
