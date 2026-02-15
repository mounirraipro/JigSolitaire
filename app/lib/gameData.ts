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

export const categories: GameCategory[] = [
  {
    slug: 'animals',
    name: 'Animals',
    icon: '🦁',
    color: '#fd79a8',
    description: 'Adorable wildlife puzzles featuring animals from around the world.',
    longDescription: 'Dive into the wild kingdom with our animal puzzle collection! From majestic lions to playful dolphins, each puzzle brings you closer to nature. These puzzles feature stunning photography of animals in their natural habitats, making each solve a visual treat.',
    levels: [
      { id: 1, title: 'Playful Kitten', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'kitten' },
      { id: 2, title: 'Tropical Parrot', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'parrot' },
      { id: 3, title: 'Ocean Dolphins', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Medium', imageKeyword: 'dolphin' },
      { id: 4, title: 'Safari Lion', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Hard', imageKeyword: 'lion' },
      { id: 5, title: 'Arctic Fox', gridSize: '3×5', gridCols: 5, gridRows: 3, difficulty: 'Expert', imageKeyword: 'fox' },
    ],
  },
  {
    slug: 'nature',
    name: 'Nature',
    icon: '🌿',
    color: '#00b894',
    description: 'Breathtaking landscapes and natural wonders to piece together.',
    longDescription: 'Explore the beauty of our planet through these stunning nature puzzles. From snow-capped mountains to serene beaches, each image captures the majesty of the natural world. Perfect for relaxation and mindfulness.',
    levels: [
      { id: 6, title: 'Mountain Sunrise', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'mountain' },
      { id: 7, title: 'Autumn Forest', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'forest' },
      { id: 8, title: 'Ocean Waves', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Medium', imageKeyword: 'ocean' },
      { id: 9, title: 'Cherry Blossoms', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Hard', imageKeyword: 'cherry-blossom' },
      { id: 10, title: 'Northern Lights', gridSize: '3×5', gridCols: 5, gridRows: 3, difficulty: 'Expert', imageKeyword: 'aurora' },
    ],
  },
  {
    slug: 'cities',
    name: 'Cities',
    icon: '🏙️',
    color: '#6c5ce7',
    description: 'Iconic cityscapes and architectural marvels from around the globe.',
    longDescription: 'Travel the world without leaving your seat! Our city puzzles showcase the most iconic skylines and landmarks. From the neon streets of Tokyo to the romantic bridges of Paris, each puzzle is an urban adventure.',
    levels: [
      { id: 11, title: 'Paris Eiffel', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'paris' },
      { id: 12, title: 'Tokyo Nights', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'tokyo' },
      { id: 13, title: 'New York Skyline', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Medium', imageKeyword: 'new-york' },
      { id: 14, title: 'Venice Canals', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Hard', imageKeyword: 'venice' },
      { id: 15, title: 'Dubai Lights', gridSize: '3×5', gridCols: 5, gridRows: 3, difficulty: 'Expert', imageKeyword: 'dubai' },
    ],
  },
  {
    slug: 'art',
    name: 'Art',
    icon: '🎨',
    color: '#e17055',
    description: 'Classic paintings and modern art reimagined as puzzles.',
    longDescription: 'Experience art in a whole new way. Our art puzzle collection features classic masterpieces and contemporary works, transformed into engaging puzzles. Learn about famous artworks while challenging your spatial skills.',
    levels: [
      { id: 16, title: 'Starry Night', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'starry-night' },
      { id: 17, title: 'Abstract Colors', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'abstract' },
      { id: 18, title: 'Watercolor Garden', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Medium', imageKeyword: 'watercolor' },
      { id: 19, title: 'Pop Art Faces', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Hard', imageKeyword: 'pop-art' },
      { id: 20, title: 'Renaissance Study', gridSize: '3×5', gridCols: 5, gridRows: 3, difficulty: 'Expert', imageKeyword: 'renaissance' },
    ],
  },
  {
    slug: 'food',
    name: 'Food',
    icon: '🍕',
    color: '#fdcb6e',
    description: 'Delicious food photography that will tease your senses and brain.',
    longDescription: 'Feast your eyes on our food puzzle collection! These mouthwatering images of gourmet dishes, colorful ingredients, and artistic plating will challenge your puzzle skills while making you hungry for more.',
    levels: [
      { id: 21, title: 'Fresh Sushi', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'sushi' },
      { id: 22, title: 'Berry Basket', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'berries' },
      { id: 23, title: 'Italian Pizza', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Medium', imageKeyword: 'pizza' },
      { id: 24, title: 'Chocolate Dream', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Hard', imageKeyword: 'chocolate' },
      { id: 25, title: 'Farmers Market', gridSize: '3×5', gridCols: 5, gridRows: 3, difficulty: 'Expert', imageKeyword: 'market' },
    ],
  },
];

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
