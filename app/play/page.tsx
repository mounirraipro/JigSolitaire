import type { Metadata } from 'next';
import Link from 'next/link';
import GameIframe from '../components/GameIframe';
import JsonLd from '../components/JsonLd';

const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'JigSolitaire',
    url: 'https://jigsolitaire.online/play',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires a modern web browser with JavaScript enabled.',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
    },
    description:
        'A free browser-based jigsaw solitaire puzzle game. Drag, drop, and swap tiles to restore beautiful images across 25+ levels in 5 categories.',
    author: {
        '@type': 'Person',
        name: 'Lahcen Aharouane',
        url: 'https://jigsolitaire.online/about',
    },
    publisher: {
        '@type': 'Organization',
        name: 'JigSolitaire',
        url: 'https://jigsolitaire.online',
    },
};

export const metadata: Metadata = {
    title: 'Play JigSolitaire – Free Online Puzzle Game',
    description: 'Play JigSolitaire free online in your browser. Swap tiles, restore beautiful images, choose puzzle categories, and enjoy a relaxing no-download puzzle game.',
    keywords: ['play JigSolitaire', 'free puzzle game online', 'jigsaw solitaire game', 'tile swap puzzle', 'play puzzle online', 'no download puzzle game'],
    alternates: {
        canonical: '/play',
    },
};

const gameFeatures = [
    {
        title: 'Free browser play',
        text: 'Start instantly on desktop, tablet, Chromebook, or mobile without installing an app or creating an account.',
    },
    {
        title: 'Image-based puzzles',
        text: 'Restore colorful photos from Animals, Nature, Cities, Art, and Food categories by reading visual clues.',
    },
    {
        title: 'Smart merge mechanic',
        text: 'Correct neighboring tiles merge into groups, giving every successful placement a clear sense of progress.',
    },
    {
        title: 'Five difficulty levels',
        text: 'Begin with compact beginner grids, then move into larger challenges as your pattern recognition improves.',
    },
];

const strategyTips = [
    'Use the preview actively: look for one strong anchor, two color zones, and any clear horizontal or vertical lines.',
    'Build from corners and edges first because they have fewer possible neighbors and create reliable reference points.',
    'Move tiles into the right region before worrying about the exact square. Rough sorting makes final placement easier.',
    'Watch for automatic merges. A merged group is a clue that your visual map is correct, so build outward from it.',
    'Stay patient near the end. The last few loose tiles often require slower comparison, not faster dragging.',
];

const faqs = [
    {
        question: 'Is JigSolitaire free to play?',
        answer: 'Yes. JigSolitaire is free to play online directly in your browser, with no account required to start a puzzle.',
    },
    {
        question: 'Do I need to download JigSolitaire?',
        answer: 'No. The game runs in a modern web browser, so you can play on compatible computers, tablets, phones, and Chromebooks without downloading anything.',
    },
    {
        question: 'How do you play JigSolitaire?',
        answer: 'Choose a category and level, study the full image during the preview, then drag adjacent tiles to swap them until the picture is restored.',
    },
    {
        question: 'What makes JigSolitaire different from a normal jigsaw puzzle?',
        answer: 'Instead of fitting irregular pieces by shape, JigSolitaire uses equal-sized image tiles. The challenge is visual memory, pattern recognition, and smart tile swapping.',
    },
    {
        question: 'Can I play JigSolitaire on mobile?',
        answer: 'Yes. JigSolitaire is designed for browser play on mobile and desktop devices, with drag controls that work on touch screens and mouse input.',
    },
];

export default function PlayPage() {
    return (
        <>
            <JsonLd schema={webAppSchema} />
            {/* Game Section — full viewport */}
            <div id="top" className="play-layout">
                {/* Game iframe */}
                <main className="play-main">
                    {/* Animated Background Layer */}
                    <div 
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: 'radial-gradient(circle at center, var(--nin-blue) 3px, transparent 3px)',
                            backgroundSize: '40px 40px',
                            opacity: 0.08,
                            zIndex: 0,
                            animation: 'demo-bg-scroll 25s linear infinite',
                        }} 
                    />
                    <div 
                        style={{
                            position: 'absolute',
                            top: '15%',
                            left: '10%',
                            width: '120px',
                            height: '120px',
                            background: 'var(--nin-yellow)',
                            borderRadius: '50%',
                            opacity: 0.15,
                            animation: 'demo-float-1 8s ease-in-out infinite',
                            zIndex: 0,
                        }} 
                    />
                    <div 
                        style={{
                            position: 'absolute',
                            bottom: '15%',
                            right: '10%',
                            width: '150px',
                            height: '150px',
                            background: 'var(--nin-red)',
                            borderRadius: '30px',
                            transform: 'rotate(15deg)',
                            opacity: 0.1,
                            animation: 'demo-float-2 12s ease-in-out infinite alternate',
                            zIndex: 0,
                        }} 
                    />
                    <div 
                        style={{
                            position: 'absolute',
                            top: '40%',
                            right: '25%',
                            width: '60px',
                            height: '60px',
                            background: 'var(--nin-green)',
                            borderRadius: '50%',
                            opacity: 0.12,
                            animation: 'demo-float-1 10s ease-in-out infinite reverse',
                            zIndex: 0,
                        }} 
                    />
                    <GameIframe
                        src="/game/index.html"
                        title="JigSolitaire Game"
                        className="play-iframe"
                    />
                </main>
            </div>

            {/* How It Works Section */}
            <section className="how-it-works">
                <div className="container">
                    <h2 className="section-title">How JigSolitaire Works</h2>
                    <p className="section-subtitle">Three simple steps to start solving puzzles</p>

                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h3>Choose a Category</h3>
                            <p>Pick from Animals, Nature, Cities, Art, or Food — each with unique images to solve.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h3>Memorize the Image</h3>
                            <p>Study the full picture for 5 seconds before it splits into shuffled tiles.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h3>Swap &amp; Solve</h3>
                            <p>Drag tiles to swap positions. Correctly placed neighbors merge automatically!</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="play-seo-section">
                <div className="container">
                    <div className="play-seo-hero">
                        <span className="play-seo-kicker">Free Online Puzzle Game</span>
                        <h2>Play JigSolitaire Online</h2>
                        <p>
                            JigSolitaire is a relaxing tile-swap puzzle game where you rebuild beautiful images
                            one smart move at a time. Choose a category, memorize the preview, then swap nearby
                            tiles until the full picture comes back together. It is easy to start, satisfying to
                            improve at, and built for quick browser play whenever you want a calm visual challenge.
                        </p>
                        <div className="play-seo-actions">
                            <Link href="#top" className="play-seo-btn">Back to game</Link>
                            <Link href="/how-to-play" className="play-seo-link">Read the full guide</Link>
                        </div>
                    </div>

                    <div className="play-seo-grid">
                        {gameFeatures.map((feature) => (
                            <article key={feature.title} className="play-seo-card">
                                <h3>{feature.title}</h3>
                                <p>{feature.text}</p>
                            </article>
                        ))}
                    </div>

                    <div className="play-seo-split">
                        <div>
                            <span className="play-seo-kicker">Game Description</span>
                            <h2>What Is JigSolitaire?</h2>
                            <p>
                                JigSolitaire combines the visual satisfaction of a jigsaw puzzle with the clean,
                                focused structure of a tile-swapping game. Every puzzle begins as a complete image.
                                After a short preview, the picture is divided into shuffled tiles. Your goal is to
                                restore the image by swapping adjacent tiles and recognizing which details belong
                                together.
                            </p>
                            <p>
                                The game stands out because correctly positioned neighboring tiles merge into a
                                single group. That means progress is not hidden. When two tiles belong together,
                                the board confirms it, and that merged group becomes a stronger anchor for your
                                next decisions. The result is a puzzle experience that feels clear, visual, and
                                rewarding without needing complicated rules.
                            </p>
                            <p>
                                You can play JigSolitaire as a short break, a daily focus routine, or a longer
                                puzzle session. The categories offer different kinds of visual challenges: animals
                                with recognizable faces, nature scenes with broad color zones, city images with
                                strong lines, art with subtle patterns, and food images full of texture and detail.
                            </p>
                        </div>
                        <aside className="play-seo-panel">
                            <h3>Best for players who want</h3>
                            <ul>
                                <li>A free puzzle game with no download</li>
                                <li>Quick levels that still feel thoughtful</li>
                                <li>Visual memory and pattern recognition practice</li>
                                <li>A calmer alternative to endless scrolling</li>
                                <li>Simple controls on desktop and mobile</li>
                            </ul>
                        </aside>
                    </div>

                    <div className="play-seo-split play-seo-split-reverse">
                        <aside className="play-seo-panel play-seo-panel-accent">
                            <h3>How to play in 5 steps</h3>
                            <ol>
                                <li>Pick a category that matches your mood.</li>
                                <li>Choose a level and study the preview image.</li>
                                <li>Drag one tile toward an adjacent tile to swap them.</li>
                                <li>Use merged groups as anchors for the rest of the board.</li>
                                <li>Restore the full image and try to improve your solve.</li>
                            </ol>
                        </aside>
                        <div>
                            <span className="play-seo-kicker">Gameplay Mechanics</span>
                            <h2>Swap Tiles, Build Groups, Restore the Image</h2>
                            <p>
                                The main mechanic is simple: tiles can swap with adjacent tiles. There is no empty
                                space to manage and no complicated inventory of moves. The challenge comes from
                                reading the image. A patch of sky, a curved edge, a shadow, a small highlight, or
                                a repeated texture can tell you where a tile belongs.
                            </p>
                            <p>
                                As the puzzle develops, the merge system changes the rhythm of play. Instead of
                                treating every tile as a separate piece forever, you gradually build stable groups.
                                A correct pair can become a row, a row can become a section, and a section can
                                guide the final placements. This makes the end of each puzzle feel cleaner and
                                more satisfying than random trial and error.
                            </p>
                            <p>
                                Beginners can start with smaller grids and high-contrast categories. Experienced
                                players can challenge themselves with more subtle images, fewer wasted moves, and
                                faster recognition. Either way, every puzzle rewards careful looking more than
                                frantic clicking.
                            </p>
                        </div>
                    </div>

                    <div className="play-seo-wide">
                        <span className="play-seo-kicker">Pro Tips</span>
                        <h2>Tips to Get Better at JigSolitaire</h2>
                        <div className="play-tip-list">
                            {strategyTips.map((tip, index) => (
                                <div key={tip} className="play-tip">
                                    <span>{index + 1}</span>
                                    <p>{tip}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="play-seo-split">
                        <div>
                            <span className="play-seo-kicker">Play Anywhere</span>
                            <h2>No Download, No Account, Just the Puzzle</h2>
                            <p>
                                JigSolitaire runs online, so you can open the play page and begin without installing
                                software. It works well for players who want a quick puzzle on a laptop, a relaxed
                                session on a tablet, or a simple visual game on a phone. Because the game lives in
                                the browser, it is also convenient for Chromebooks and shared devices.
                            </p>
                            <p>
                                For the best experience, use a modern browser such as Chrome, Edge, Firefox, or
                                Safari, keep JavaScript enabled, and use fullscreen mode when you want fewer
                                distractions. On mobile, turn the device to the orientation that gives you the most
                                comfortable board size.
                            </p>
                        </div>
                        <div>
                            <span className="play-seo-kicker">Why Players Like It</span>
                            <h2>A Calm Alternative to Fast, Noisy Games</h2>
                            <p>
                                JigSolitaire is built around attention rather than pressure. There is a clear goal,
                                visible progress, and enough challenge to keep the mind engaged. You do not need to
                                race through menus, manage complex controls, or learn a long rulebook. You only need
                                to observe the image and make the next useful swap.
                            </p>
                            <p>
                                That makes it a good fit for short focus breaks, evening relaxation, family-friendly
                                play, and anyone who enjoys visual puzzles but does not always have table space for
                                a physical jigsaw.
                            </p>
                        </div>
                    </div>

                    <div className="play-seo-faq">
                        <span className="play-seo-kicker">FAQ</span>
                        <h2>JigSolitaire Questions</h2>
                        <div className="play-faq-list">
                            {faqs.map((item) => (
                                <details key={item.question} className="play-faq-item">
                                    <summary>{item.question}</summary>
                                    <p>{item.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
