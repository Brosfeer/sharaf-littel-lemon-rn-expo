import { MenuItem, MenuApiResponse } from '@/types/menu';

const MENU_API_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

export const LOCAL_DISH_IMAGES: Record<string, any> = {
  'greekSalad.jpg': require('@/assets/images/dishes/greekSalad.jpg'),
  'bruschetta.jpg': require('@/assets/images/dishes/bruschetta.jpg'),
  'grilledFish.jpg': require('@/assets/images/dishes/grilledFish.jpg'),
  'pasta.jpg': require('@/assets/images/dishes/pasta.jpg'),
  'lemonDessert.jpg': require('@/assets/images/dishes/lemonDessert.jpg'),
  'lemonDessert 2.jpg': require('@/assets/images/dishes/lemonDessert.jpg'),
};

export const FALLBACK_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Greek Salad',
    price: 12.99,
    description:
      'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese.',
    image: 'greekSalad.jpg',
    category: 'starters',
  },
  {
    id: '2',
    name: 'Bruschetta',
    price: 7.99,
    description:
      'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
    image: 'bruschetta.jpg',
    category: 'starters',
  },
  {
    id: '3',
    name: 'Grilled Fish',
    price: 20.00,
    description:
      'Barbequed catch of the day, with red onion, crisp capers, chive creme fraiche.',
    image: 'grilledFish.jpg',
    category: 'mains',
  },
  {
    id: '4',
    name: 'Pasta',
    price: 18.99,
    description:
      'Penne with fried aubergines, tomato sauce, fresh chilli, garlic, basil & salted ricotta.',
    image: 'pasta.jpg',
    category: 'mains',
  },
  {
    id: '5',
    name: 'Lemon Dessert',
    price: 6.99,
    description:
      'Light and fluffy traditional homemade Italian Lemon and ricotta cake.',
    image: 'lemonDessert.jpg',
    category: 'desserts',
  },
];

export async function fetchMenuItems(): Promise<MenuItem[]> {
  try {
    const response = await fetch(MENU_API_URL, {
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch menu: ${response.status}`);
    }
    const data: MenuApiResponse = await response.json();
    return data.menu.map((item, index) => ({
      id: String(index + 1),
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.category.toLowerCase(),
    }));
  } catch (error) {
    console.warn('Network menu fetch failed, using fallback dataset:', error);
    return FALLBACK_MENU_ITEMS;
  }
}

export function filterMenuItems(
  items: MenuItem[],
  searchQuery: string,
  selectedCategories: string[]
): MenuItem[] {
  const query = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category.toLowerCase());

    if (!categoryMatch) {
      return false;
    }

    if (!query) {
      return true;
    }

    const nameMatch = item.name.toLowerCase().includes(query);
    const descMatch = item.description.toLowerCase().includes(query);
    return nameMatch || descMatch;
  });
}
