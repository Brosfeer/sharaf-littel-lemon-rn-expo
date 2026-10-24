export interface MenuItem {
  id: number | string;
  title: string;
  price: string | number;
  category: string;
  name?: string;
  description?: string;
  image?: string;
}

export interface MenuSection {
  title: string;
  data: MenuItem[];
}

export type MenuCategory = 'Appetizers' | 'Salads' | 'Beverages';
