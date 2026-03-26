import fs from 'fs';
import path from 'path';

export interface GameLevel {
  id: number;
  title: string;
  gridSize: string;
  gridCols: number;
  gridRows: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert' | 'Master';
  imageKeyword: string;
}

export interface GameCategory {
  slug: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  longDescription: string;
  levels: GameLevel[];
}

const categoryMetadata: Record<string, Partial<GameCategory>> = {
  Animals: { slug: 'animals', icon: '🦁', color: '#ef4444', description: 'Adorable wildlife puzzles featuring animals from around the world.', longDescription: 'Dive into the wild kingdom with our animal puzzle collection! From majestic lions to playful dolphins, each puzzle brings you closer to nature.' },
  Nature: { slug: 'nature', icon: '🌿', color: '#22c55e', description: 'Breathtaking landscapes and natural wonders to piece together.', longDescription: 'Explore the beauty of our planet through these stunning nature puzzles. From snow-capped mountains to serene beaches, each image captures the majesty of the natural world.' },
  Cities: { slug: 'cities', icon: '🏙️', color: '#6c5ce7', description: 'Iconic cityscapes and architectural marvels from around the globe.', longDescription: 'Travel the world without leaving your seat! Our city puzzles showcase the most iconic skylines and landmarks.' },
  Art: { slug: 'art', icon: '🎨', color: '#e17055', description: 'Classic paintings and modern art reimagined as puzzles.', longDescription: 'Experience art in a whole new way. Our art puzzle collection features classic masterpieces and contemporary works.' },
  Food: { slug: 'food', icon: '🍕', color: '#fdcb6e', description: 'Delicious food photography that will tease your senses and brain.', longDescription: 'Feast your eyes on our food puzzle collection! These mouthwatering images of gourmet dishes, colorful ingredients, and artistic plating will challenge your puzzle skills.' },
};

export const categories: GameCategory[] = [];

try {
  const levelsDir = path.join(process.cwd(), 'public', 'levels');
  const folders = fs.readdirSync(levelsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  let globalId = 1;
  const diffLevels: Array<'Easy'|'Medium'|'Hard'|'Expert'|'Master'> = ['Easy', 'Medium', 'Hard', 'Expert', 'Master'];

  for (const folder of folders) {
    const meta = categoryMetadata[folder] || {
      slug: folder.toLowerCase(),
      icon: '🧩',
      color: '#888',
      description: `${folder} puzzles.`,
      longDescription: `Enjoy our collection of ${folder} puzzles.`
    };

    const folderPath = path.join(levelsDir, folder);
    const files = fs.readdirSync(folderPath)
      .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file));
    
    const levels: GameLevel[] = [];
    files.forEach((file, index) => {
      const title = file.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      const difficulty = diffLevels[Math.min(index, diffLevels.length - 1)];

      levels.push({
        id: globalId++,
        title,
        gridSize: '3×3',
        gridCols: 3,
        gridRows: 3,
        difficulty,
        imageKeyword: file
      });
    });

    categories.push({
      slug: meta.slug!,
      name: folder,
      icon: meta.icon!,
      color: meta.color!,
      description: meta.description!,
      longDescription: meta.longDescription!,
      levels
    });
  }
} catch (error) {
  console.error('Error loading dynamic levels:', error);
}

export function getCategoryBySlug(slug: string): GameCategory | undefined {
  return categories.find(c => c.slug === slug);
}

export function getLevelById(id: number): { category: GameCategory; level: GameLevel } | undefined {
  for (const cat of categories) {
    const level = cat.levels.find(l => l.id === id);
    if (level) return { category: cat, level };
  }
  return undefined;
}

export function getAllLevels(): { category: GameCategory; level: GameLevel }[] {
  return categories.flatMap(cat => cat.levels.map(level => ({ category: cat, level })));
}
