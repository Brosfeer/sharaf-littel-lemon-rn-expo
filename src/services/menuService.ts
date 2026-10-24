import { MenuItem, MenuSection } from '@/types/menu';
import localMenuData from '@/data/menu.json';

const MENU_API_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json';

export const CATEGORIES = ['Appetizers', 'Salads', 'Beverages'] as const;

export const LOCAL_DISH_IMAGES: Record<string, any> = {
  'greekSalad.jpg': require('@/assets/images/dishes/greekSalad.jpg'),
  'bruschetta.jpg': require('@/assets/images/dishes/bruschetta.jpg'),
  'grilledFish.jpg': require('@/assets/images/dishes/grilledFish.jpg'),
  'pasta.jpg': require('@/assets/images/dishes/pasta.jpg'),
  'lemonDessert.jpg': require('@/assets/images/dishes/lemonDessert.jpg'),
};

export async function fetchMenuItems(): Promise<MenuItem[]> {
  try {
    const response = await fetch(MENU_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    return data.menu.map((item: any) => ({
      id: item.id,
      title: item.title,
      price: String(item.price),
      category: typeof item.category === 'object' ? item.category.title : item.category,
    }));
  } catch (error) {
    return localMenuData.menu.map((item) => ({
      id: item.id,
      title: item.title,
      price: String(item.price),
      category: item.category,
    }));
  }
}

export function filterMenuSections(
  items: MenuItem[],
  searchQuery: string,
  selectedCategories: string[]
): MenuSection[] {
  const query = searchQuery.trim().toLowerCase();

  const activeCategories =
    selectedCategories.length === 0 ? CATEGORIES : selectedCategories;

  const sections: MenuSection[] = [];

  for (const cat of CATEGORIES) {
    if (!activeCategories.some((c) => c.toLowerCase() === cat.toLowerCase())) {
      continue;
    }

    const catItems = items.filter((item) => {
      const matchCat = item.category.toLowerCase() === cat.toLowerCase();
      if (!matchCat) return false;
      if (!query) return true;
      return item.title.toLowerCase().includes(query);
    });

    if (catItems.length > 0) {
      sections.push({
        title: cat,
        data: catItems,
      });
    }
  }

  return sections;
}
