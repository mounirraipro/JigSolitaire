'use client';

const AUTHORS: Record<string, {
    name: string;
    title: string;
    bio: string;
    initials: string;
}> = {
    'Marcus Webb': {
        name: 'Lahcen Aharouane',
        title: 'Puzzle Designer & Product Manager',
        bio: 'Lahcen Aharouane is a puzzle game designer with over 7 years of experience building browser-based games and educational software. He holds a degree in Human & Computer Sience and has researched how puzzle mechanics affect player cognition and well-being. He writes regularly about the science behind games, puzzle strategy, and the psychology of play.',
        initials: 'LA',
    },
};

interface AuthorBioBoxProps {
    author?: string;
}

export default function AuthorBioBox({ author = 'Marcus Webb' }: AuthorBioBoxProps) {
    const profile = AUTHORS[author] ?? AUTHORS['Marcus Webb'];

    return (
        <div className="author-bio-box">
            <div className="author-bio-avatar" aria-hidden="true">
                {profile.initials}
            </div>
            <div className="author-bio-content">
                <p className="author-bio-name">{profile.name}</p>
                <p className="author-bio-title">{profile.title}</p>
                <p className="author-bio-text">{profile.bio}</p>
            </div>
        </div>
    );
}
