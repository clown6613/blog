export type CategoryId = 'tech' | 'hobby';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
}

export const CATEGORIES: Record<CategoryId, Category> = {
  tech: {
    id: 'tech',
    name: 'Tech',
    description: 'プログラミング、開発、技術に関する記事',
    icon: '💻'
  },
  hobby: {
    id: 'hobby',
    name: 'Life',
    description: '日常、趣味、その他の記事',
    icon: '🌿'
  }
};
