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
    name: '技術',
    description: 'プログラミング、開発、技術に関する記事',
    icon: '💻'
  },
  hobby: {
    id: 'hobby',
    name: '趣味',
    description: '趣味、日常、その他の記事',
    icon: '🎨'
  }
};
