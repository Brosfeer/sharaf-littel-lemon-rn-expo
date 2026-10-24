export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export type MenuCategory = 'all' | 'starters' | 'mains' | 'desserts' | 'drinks';

export interface MenuApiResponse {
  menu: Array<{
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
  }>;
}
