import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '../../components/AdSlot';

export const metadata: Metadata = {
    title: 'What is JigSolitaire? The Ultimate Puzzle Experience',
    description: 'Discover JigSolitaire — a unique game that combines jigsaw puzzles with solitaire mechanics. Learn what makes it special and how to get started.',
    keywords: ['what is JigSolitaire', 'jigsaw solitaire explained', 'puzzle game overview', 'unique puzzle games'],
};

export default function WhatIsJigSolitairePage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        <Link href="/blog" style={{ color: 'var(--primary-light)' }}>Blog</Link> / Game
                    </div>
                    <h1 className="gradient-text">What is JigSolitaire? The Ultimate Puzzle Experience</h1>
                    <p>February 10, 2026 · 5 min read</p>
                </div>
            </div>

            <div className="page-content">
                <p>
                    If you&apos;ve ever loved the satisfying click of a jigsaw piece snapping into place, or the
                    strategic planning of a solitaire card game, JigSolitaire is the game you&apos;ve been waiting
                    for. It takes the best elements of both genres and creates something entirely new — a
                    tile-swapping puzzle experience that&apos;s both relaxing and mentally stimulating.
                </p>

                <h2>The Concept</h2>
                <p>
                    At its core, JigSolitaire is deceptively simple. You&apos;re presented with a grid of tiles —
                    each one a piece of a larger image that has been scrambled. Your job? Drag and drop tiles
                    to swap their positions until the original image is restored.
                </p>
                <p>
                    Unlike traditional jigsaw puzzles where pieces have irregular shapes that physically fit
                    together, JigSolitaire uses a clean grid system. This makes the game accessible to
                    everyone while adding a strategic layer that jigsaw puzzles don&apos;t have — you need to
                    think about the most efficient sequence of swaps.
                </p>

                <AdSlot type="in-content" />

                <h2>What Makes It Unique</h2>
                <p>
                    Several features set JigSolitaire apart from other puzzle games on the web:
                </p>
                <h3>Intelligent Tile Merging</h3>
                <p>
                    The most distinctive feature of JigSolitaire is its tile merging system. When you place
                    two adjacent tiles in their correct positions, they automatically merge into a group.
                    This group then moves as a single unit. It&apos;s incredibly satisfying to watch sections of
                    the image snap together and simplify the remaining puzzle.
                </p>
                <h3>Progressive Difficulty</h3>
                <p>
                    Start with a gentle 3×3 grid (just 9 tiles) and work your way up to a challenging 3×5
                    grid (15 tiles). The progression feels natural — each step up introduces enough complexity
                    to keep things interesting without becoming frustrating.
                </p>
                <h3>Beautiful Imagery</h3>
                <p>
                    Each level features a carefully selected image from one of five categories: Animals,
                    Nature, Cities, Art, and Food. The images aren&apos;t just backdrops — they&apos;re integral to
                    the experience. Recognizing color patterns and visual elements within the tiles is key
                    to solving each puzzle efficiently.
                </p>

                <h2>Who Is It For?</h2>
                <p>
                    JigSolitaire is designed for everyone:
                </p>
                <ul>
                    <li><strong>Casual gamers</strong> who want a quick, relaxing brain break</li>
                    <li><strong>Puzzle enthusiasts</strong> looking for a fresh twist on classic mechanics</li>
                    <li><strong>Students</strong> seeking a productive study break that exercises the mind</li>
                    <li><strong>Parents</strong> wanting a safe, educational game for their children</li>
                    <li><strong>Seniors</strong> looking for engaging cognitive exercises</li>
                </ul>

                <h2>How to Get Started</h2>
                <p>
                    Getting started with JigSolitaire couldn&apos;t be easier. Visit the{' '}
                    <Link href="/play">Play page</Link>, choose a category that interests you, select a
                    level, and start swapping tiles. No account needed, no downloads required — just pure
                    puzzle fun right in your browser.
                </p>
                <p>
                    For a detailed walkthrough, check out our{' '}
                    <Link href="/how-to-play">How to Play guide</Link>.
                </p>

                <AdSlot type="banner" />
            </div>
        </>
    );
}
