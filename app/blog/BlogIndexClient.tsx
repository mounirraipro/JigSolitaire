'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdSlot from '../components/AdSlot';

const posts = [
    {
        slug: 'puzzle-table-setup-small-spaces',
        title: 'How to Set Up a Puzzle Table in a Small Space',
        excerpt: 'A practical guide to creating a comfortable puzzle setup in an apartment, dorm room, shared home, or compact office.',
        icon: 'Table',
        date: 'May 24, 2026',
        readTime: '11 min read',
        category: 'Lifestyle',
    },
    {
        slug: 'visual-memory-puzzle-solving',
        title: 'Visual Memory and Puzzle Solving: How to Train What You Notice',
        excerpt: 'Learn how visual memory supports puzzle solving and how to train your eye for color, position, texture, and image patterns.',
        icon: 'Eye',
        date: 'May 23, 2026',
        readTime: '12 min read',
        category: 'Science',
    },
    {
        slug: 'cooperative-puzzle-games-family',
        title: 'Cooperative Puzzle Games: How Families Can Solve Better Together',
        excerpt: 'Roles, turn-taking, age adjustments, and simple ways to make shared puzzle solving feel calmer and more cooperative.',
        icon: 'Team',
        date: 'May 22, 2026',
        readTime: '11 min read',
        category: 'Family',
    },
    {
        slug: 'puzzle-breaks-at-work',
        title: 'Puzzle Breaks at Work: A Better Way to Reset Your Focus',
        excerpt: 'How short, contained puzzle breaks can help you shift attention between tasks without falling into endless scrolling.',
        icon: 'Focus',
        date: 'May 21, 2026',
        readTime: '10 min read',
        category: 'Work',
    },
    {
        slug: 'no-download-puzzle-games-guide',
        title: 'No-Download Puzzle Games: What to Look For Before You Play',
        excerpt: 'A player-friendly checklist for choosing browser puzzle games that are fast, clear, private, and comfortable on your device.',
        icon: 'Play',
        date: 'May 20, 2026',
        readTime: '12 min read',
        category: 'Guides',
    },
    {
        slug: 'jigsolitaire-review',
        title: 'JigSolitaire Review 2026: Is It the Best Free Online Puzzle Game?',
        excerpt: 'An in-depth review covering gameplay, the merge mechanic, performance, and an honest verdict on whether JigSolitaire is worth your time.',
        icon: '⭐',
        date: 'April 3, 2026',
        readTime: '13 min read',
        category: 'Reviews',
    },
    {
        slug: 'jigsolitaire-online-guide',
        title: 'How to Play JigSolitaire Online: Complete Beginner\'s Guide 2026',
        excerpt: 'New to JigSolitaire? This step-by-step guide covers controls, the merge mechanic, difficulty levels, and strategies to solve puzzles faster.',
        icon: '🗺️',
        date: 'April 1, 2026',
        readTime: '10 min read',
        category: 'Strategy',
    },
    {
        slug: 'free-online-puzzle-games-2026',
        title: 'Best Free Online Puzzle Games in 2026: No Download, No Account',
        excerpt: 'A curated list of the best browser-based puzzle games available right now — with JigSolitaire at the top and honest alternatives reviewed.',
        icon: '🏆',
        date: 'March 15, 2026',
        readTime: '13 min read',
        category: 'Reviews',
    },
    {
        slug: 'jigsolitaire-vs-traditional-jigsaw',
        title: 'JigSolitaire vs Traditional Jigsaw Puzzles: Key Differences',
        excerpt: 'How does the tile-swap mechanic compare to fitting irregular pieces? A detailed comparison of mechanics, cognitive benefits, and accessibility.',
        icon: '⚖️',
        date: 'March 28, 2026',
        readTime: '11 min read',
        category: 'Reviews',
    },
    {
        slug: 'puzzle-games-for-adults',
        title: 'Puzzle Games for Adults: Why JigSolitaire Stands Out in 2026',
        excerpt: 'Adult players deserve games without cartoon characters and manipulative mechanics. Here is why JigSolitaire delivers the right balance.',
        icon: '🧑',
        date: 'March 20, 2026',
        readTime: '11 min read',
        category: 'Reviews',
    },
    {
        slug: 'tile-swap-puzzle-games-guide',
        title: 'The Complete Guide to Tile-Swap Puzzle Games: History, Strategy & Best Picks',
        excerpt: 'From the 19th-century 15-puzzle to modern browser games like JigSolitaire — the full story of tile-swap mechanics, strategy, and the best options today.',
        icon: '🔀',
        date: 'March 25, 2026',
        readTime: '12 min read',
        category: 'History',
    },
    {
        slug: 'how-to-get-better-at-jigsaw-puzzles',
        title: 'How to Get Better at Jigsaw Puzzles: 12 Skills That Actually Help',
        excerpt: 'A practical guide to sorting smarter, spotting patterns faster, and solving jigsaw puzzles with less frustration.',
        icon: '🧩',
        date: 'March 13, 2026',
        readTime: '12 min read',
        category: 'Strategy',
    },
    {
        slug: 'are-puzzles-good-for-anxiety-and-stress',
        title: 'Are Puzzles Good for Anxiety and Stress? What the Research Actually Suggests',
        excerpt: 'What puzzles can and cannot do for stress relief, attention, and everyday emotional regulation.',
        icon: '🌿',
        date: 'March 11, 2026',
        readTime: '12 min read',
        category: 'Science',
    },
    {
        slug: 'best-puzzle-routine-for-busy-adults',
        title: 'The Best Puzzle Routine for Busy Adults: A Realistic Weekly Plan',
        excerpt: 'A flexible weekly puzzle habit designed for adults who want focus and relaxation without adding pressure.',
        icon: '🗓️',
        date: 'March 8, 2026',
        readTime: '11 min read',
        category: 'Strategy',
    },
    {
        slug: 'how-to-choose-the-right-puzzle-difficulty',
        title: 'How to Choose the Right Puzzle Difficulty for Your Skill Level',
        excerpt: 'Use image complexity, piece count, and format to choose puzzles that are challenging without becoming exhausting.',
        icon: '🎚️',
        date: 'March 6, 2026',
        readTime: '11 min read',
        category: 'Reviews',
    },
    {
        slug: 'what-is-jigsolitaire',
        title: 'What is JigSolitaire? The Ultimate Puzzle Experience',
        excerpt: 'Discover the game that blends the best of jigsaw puzzles with solitaire card mechanics. Learn what makes JigSolitaire unique and why players love it.',
        icon: '🧩',
        date: 'February 10, 2026',
        readTime: '5 min read',
        category: 'Game',
    },
    {
        slug: 'benefits-of-puzzle-games',
        title: '7 Brain Benefits of Playing Puzzle Games',
        excerpt: 'Science shows that puzzles improve memory, concentration, and problem-solving skills. Seven proven ways puzzles boost your brain.',
        icon: '🧠',
        date: 'February 8, 2026',
        readTime: '6 min read',
        category: 'Science',
    },
    {
        slug: 'tips-and-tricks',
        title: 'Pro Tips & Tricks to Master JigSolitaire',
        excerpt: 'From corner strategies to move optimization, expert tips backed by cognitive science to solve puzzles faster.',
        icon: '💡',
        date: 'February 5, 2026',
        readTime: '7 min read',
        category: 'Strategy',
    },
    {
        slug: 'history-of-puzzle-games',
        title: 'The Fascinating History of Jigsaw & Solitaire Games',
        excerpt: 'From 18th-century dissected maps to modern digital puzzles, explore the rich history behind two beloved game types.',
        icon: '📜',
        date: 'February 2, 2026',
        readTime: '8 min read',
        category: 'History',
    },
    {
        slug: 'best-puzzle-games-for-kids',
        title: 'Best Puzzle Games for Kids in 2025',
        excerpt: 'Educational and fun puzzle games curated for children, evaluated against AAP and research-backed safety and learning criteria.',
        icon: '👧',
        date: 'January 28, 2026',
        readTime: '6 min read',
        category: 'Family',
    },
    {
        slug: 'neuroscience-of-puzzle-solving',
        title: 'The Neuroscience of Puzzle Solving: What Happens in Your Brain',
        excerpt: 'Dopamine, neural plasticity, and the brain regions activated when you solve puzzles — the full neuroscience breakdown.',
        icon: '🔬',
        date: 'February 24, 2026',
        readTime: '10 min read',
        category: 'Science',
    },
    {
        slug: 'puzzles-and-focus',
        title: 'How Puzzles Improve Focus and Attention in the Digital Age',
        excerpt: 'Combat digital distraction and train sustained attention through puzzle solving, backed by attention research.',
        icon: '🎯',
        date: 'February 21, 2026',
        readTime: '9 min read',
        category: 'Science',
    },
    {
        slug: 'puzzle-solving-psychology',
        title: 'Puzzle-Solving Psychology: Why We Love the \'Aha!\' Moment',
        excerpt: 'The psychology of insight, curiosity, and intrinsic motivation — why solving puzzles feels so good.',
        icon: '💡',
        date: 'February 18, 2026',
        readTime: '10 min read',
        category: 'Science',
    },
    {
        slug: 'pattern-recognition-skills',
        title: 'Pattern Recognition: The Hidden Skill Behind Every Great Puzzler',
        excerpt: 'How expert puzzlers develop visual pattern-matching skills and why this ability transfers to real life.',
        icon: '👁️',
        date: 'February 18, 2026',
        readTime: '9 min read',
        category: 'Strategy',
    },
    {
        slug: 'brain-training-techniques',
        title: 'Brain Training Techniques: Science-Based Methods That Actually Work',
        excerpt: 'Cut through the hype — which brain training approaches are genuinely backed by scientific evidence?',
        icon: '🏋️',
        date: 'February 15, 2026',
        readTime: '10 min read',
        category: 'Strategy',
    },
    {
        slug: 'mindfulness-and-puzzles',
        title: 'Mindfulness and Puzzles: How Games Create Flow States',
        excerpt: 'The deep connection between puzzles, mindfulness, and Csikszentmihalyi\'s flow — active meditation through games.',
        icon: '🧘',
        date: 'February 12, 2026',
        readTime: '9 min read',
        category: 'Strategy',
    },
    {
        slug: 'history-of-card-games',
        title: 'The Complete History of Card Games: From Ancient China to Solitaire',
        excerpt: 'A thousand-year journey from Tang Dynasty leaf cards through Mamluk courts to Windows Solitaire.',
        icon: '🃏',
        date: 'February 9, 2026',
        readTime: '10 min read',
        category: 'History',
    },
    {
        slug: 'famous-puzzle-designers',
        title: 'Famous Puzzle Designers Who Changed Gaming Forever',
        excerpt: 'The brilliant minds behind the Rubik\'s Cube, Tetris, Sudoku, and modern puzzle game design.',
        icon: '🏆',
        date: 'February 6, 2026',
        readTime: '10 min read',
        category: 'History',
    },
    {
        slug: 'golden-age-of-puzzles',
        title: 'The Golden Age of Puzzles: How the Great Depression Made Jigsaws a Craze',
        excerpt: 'How economic hardship in the 1930s sparked the greatest jigsaw puzzle craze in history.',
        icon: '📰',
        date: 'February 3, 2026',
        readTime: '9 min read',
        category: 'History',
    },
    {
        slug: 'screen-time-guide',
        title: "A Parent's Complete Guide to Screen Time and Educational Games",
        excerpt: 'Navigate the screen time debate with evidence from the AAP, Oxford, and developmental psychology.',
        icon: '📱',
        date: 'January 25, 2026',
        readTime: '10 min read',
        category: 'Family',
    },
    {
        slug: 'family-game-night',
        title: 'Family Game Night: Building Bonds Through Puzzles',
        excerpt: 'How shared puzzle solving strengthens family relationships, communication, and emotional development.',
        icon: '👨‍👩‍👧‍👦',
        date: 'January 22, 2026',
        readTime: '9 min read',
        category: 'Family',
    },
    {
        slug: 'puzzles-build-resilience',
        title: 'How Puzzles Build Resilience and Patience in Children',
        excerpt: 'Research on how productive struggle in puzzles develops grit, growth mindset, and frustration tolerance.',
        icon: '💪',
        date: 'January 19, 2026',
        readTime: '9 min read',
        category: 'Family',
    },
    {
        slug: 'best-free-online-puzzle-games',
        title: '10 Best Free Online Puzzle Games in 2026 (Honest Reviews)',
        excerpt: 'Independent, unbiased reviews of the best free puzzle games available online today.',
        icon: '⭐',
        date: 'January 16, 2026',
        readTime: '10 min read',
        category: 'Reviews',
    },
    {
        slug: 'puzzles-vs-social-media',
        title: 'Puzzles vs. Social Media: What Science Says About Screen Quality',
        excerpt: 'Active vs passive screen time — the cognitive effects of puzzles compared to social media scrolling.',
        icon: '📊',
        date: 'January 13, 2026',
        readTime: '9 min read',
        category: 'Reviews',
    },
    {
        slug: 'puzzles-for-seniors',
        title: 'How Seniors Can Use Puzzles to Stay Mentally Sharp',
        excerpt: 'Evidence-based strategies for older adults to maintain cognitive health through regular puzzle practice.',
        icon: '🧓',
        date: 'January 10, 2026',
        readTime: '9 min read',
        category: 'Reviews',
    },
];

const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
const allCategories = ['All', ...Array.from(new Set(posts.map((post) => post.category)))];

export default function BlogIndexClient() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredPosts = activeCategory === 'All'
        ? sortedPosts
        : sortedPosts.filter((post) => post.category === activeCategory);

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">JigSolitaire Blog</h1>
                    <p>Evidence-based puzzle advice, game guides, and long-form articles for thoughtful players.</p>
                </div>
            </div>

            <div className="container" style={{ maxWidth: '900px', padding: '0 1.5rem 4rem' }}>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: '2rem' }}>
                    Explore practical guides on puzzle strategy, focus, family play, brain health, and game history. Every article is written to be useful first,
                    with clear takeaways and related reading when you want to go deeper.
                </p>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginTop: '2rem',
                    marginBottom: '1rem',
                }}>
                    {allCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '0.4rem 1rem',
                                borderRadius: 'var(--radius-xl)',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                background: activeCategory === cat ? 'var(--primary)' : 'rgba(108, 92, 231, 0.1)',
                                color: activeCategory === cat ? '#fff' : 'var(--primary-light)',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                    Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                </p>

                <AdSlot type="banner" />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
                    {filteredPosts.map((post, i) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                            <article className="card animate-in" style={{
                                animationDelay: `${0.1 + i * 0.05}s`,
                                display: 'flex',
                                gap: '1.5rem',
                                cursor: 'pointer',
                                alignItems: 'flex-start',
                            }}>
                                <div style={{
                                    fontSize: '2.5rem',
                                    flexShrink: 0,
                                    width: '80px',
                                    height: '80px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(108, 92, 231, 0.1)',
                                    borderRadius: 'var(--radius-md)',
                                }}>
                                    {post.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        display: 'flex',
                                        gap: '1rem',
                                        marginBottom: '0.5rem',
                                        fontSize: '0.8rem',
                                        color: 'var(--text-muted)',
                                        flexWrap: 'wrap',
                                    }}>
                                        <span style={{
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: 'var(--radius-xl)',
                                            background: 'rgba(108, 92, 231, 0.15)',
                                            color: 'var(--primary-light)',
                                            fontWeight: 600,
                                        }}>
                                            {post.category}
                                        </span>
                                        <span>{post.date}</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text)' }}>
                                        {post.title}
                                    </h2>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.7 }}>
                                        {post.excerpt}
                                    </p>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
