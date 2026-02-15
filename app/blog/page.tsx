import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '../components/AdSlot';

export const metadata: Metadata = {
    title: 'Blog – Puzzle Tips, News & Insights',
    description: 'Read the JigSolitaire blog for puzzle tips, brain-boosting benefits, game history, and the latest updates from our puzzle community.',
    keywords: ['JigSolitaire blog', 'puzzle game tips', 'brain games blog', 'jigsaw puzzle articles'],
};

const posts = [
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
        excerpt: 'Science shows that puzzles improve memory, concentration, and problem-solving skills. Here are seven proven ways puzzles boost your brain.',
        icon: '🧠',
        date: 'February 8, 2026',
        readTime: '6 min read',
        category: 'Science',
    },
    {
        slug: 'tips-and-tricks',
        title: 'Pro Tips & Tricks to Master JigSolitaire',
        excerpt: 'From corner strategies to move optimization, these expert tips will help you solve puzzles faster and more efficiently.',
        icon: '💡',
        date: 'February 5, 2026',
        readTime: '7 min read',
        category: 'Strategy',
    },
    {
        slug: 'history-of-puzzle-games',
        title: 'The Fascinating History of Jigsaw & Solitaire Games',
        excerpt: 'From 18th-century dissected maps to modern digital puzzles, explore the rich history behind two of the world\'s most beloved game types.',
        icon: '📜',
        date: 'February 2, 2026',
        readTime: '8 min read',
        category: 'History',
    },
    {
        slug: 'best-puzzle-games-for-kids',
        title: 'Best Puzzle Games for Kids in 2025',
        excerpt: 'Looking for educational and fun puzzle games for your children? We\'ve curated a list of the best options that combine learning with entertainment.',
        icon: '👧',
        date: 'January 28, 2026',
        readTime: '6 min read',
        category: 'Family',
    },
];

export default function BlogPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">JigSolitaire Blog</h1>
                    <p>Tips, insights, and stories from the world of puzzles.</p>
                </div>
            </div>

            <div className="container" style={{ maxWidth: '900px', padding: '0 1.5rem 4rem' }}>
                <AdSlot type="banner" />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
                    {posts.map((post, i) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                            <article className="card animate-in" style={{
                                animationDelay: `${0.1 + i * 0.1}s`,
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

                <AdSlot type="banner" />
            </div>
        </>
    );
}
