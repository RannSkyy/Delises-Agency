import type {
  CartItem,
  CategoryId,
  MenuItem,
  NotificationItem,
  OrderRecord,
} from '../types/delisas';

export const PROMO_BANNER_IMAGE = '/src/assets/images/promo_courier_banner_1795619775545.jpg';
export const COURIER_AVATAR_IMAGE = '/src/assets/images/courier_john_avatar_1795619779512.jpg';

export interface CategoryMeta {
  id: CategoryId;
  label: string;
  iconClass: string;
  accentBg: string;
  accentText: string;
}

export const MENU_CATEGORIES: CategoryMeta[] = [
  {
    id: 'all',
    label: 'All Dishes',
    iconClass: 'ri-restaurant-2-line',
    accentBg: 'bg-[#EEF5EE]',
    accentText: 'text-[#3D8B37]',
  },
  {
    id: 'meat',
    label: 'Meat',
    iconClass: 'ri-knife-line',
    accentBg: 'bg-[#FBEAE8]',
    accentText: 'text-[#B94A3E]',
  },
  {
    id: 'fast-food',
    label: 'Fast Food',
    iconClass: 'ri-cake-3-line',
    accentBg: 'bg-[#FEF3DF]',
    accentText: 'text-[#B4690E]',
  },
  {
    id: 'sushi',
    label: 'Sushi',
    iconClass: 'ri-bowl-line',
    accentBg: 'bg-[#FCECE7]',
    accentText: 'text-[#C25535]',
  },
  {
    id: 'drinks',
    label: 'Drinks',
    iconClass: 'ri-goblet-line',
    accentBg: 'bg-[#E9F5EE]',
    accentText: 'text-[#2E7D54]',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'melting-cheese-pizza',
    name: 'Melting Cheese Pizza',
    restaurant: 'Pizza Italiano',
    category: 'fast-food',
    basePrice: 10.99,
    calories: 44,
    prepMinutes: 20,
    rating: 4.8,
    reviewCountLabel: '2.2k',
    description:
      'Stone-baked artisan sourdough crust with blistered cherry tomatoes, fresh basil, black olives, and aged fior di latte.',
    image: '/src/assets/images/pizza_melting_cheese_1795619756552.jpg',
    featured: true,
    sizes: [
      { id: 'small', label: "6' - Small", shortLabel: 'Small', price: 8.99 },
      { id: 'medium', label: "8' - Medium", shortLabel: 'Medium', price: 10.99 },
      { id: 'large', label: "10' - Large", shortLabel: 'Large', price: 12.99 },
    ],
    ingredients: [
      { id: 'chicken', name: 'Chicken', portion: '250 gm', price: 1.4 },
      { id: 'mushroom', name: 'Mushroom', portion: '120 gm', price: 0.8 },
      { id: 'mozzarella', name: 'Extra Mozzarella', portion: '90 gm', price: 1.2 },
    ],
  },
  {
    id: 'cheese-burger',
    name: 'Cheese Burger',
    restaurant: 'Burger Hunt',
    category: 'fast-food',
    basePrice: 4.99,
    calories: 44,
    prepMinutes: 20,
    rating: 4.7,
    reviewCountLabel: '1.8k',
    description:
      'Seared prime beef patties layered with melted sharp cheddar, crisp green leaf lettuce, vine tomato, and toasted brioche.',
    image: '/src/assets/images/burger_cheese_double_1795619756564.jpg',
    featured: true,
    sizes: [
      { id: 'single', label: 'Single Patty', shortLabel: 'Single', price: 4.99 },
      { id: 'double', label: 'Double Melt', shortLabel: 'Double', price: 6.99 },
      { id: 'combo', label: 'Combo Meal', shortLabel: 'Combo', price: 9.49 },
    ],
    ingredients: [
      { id: 'extra-cheddar', name: 'Aged Cheddar', portion: '60 gm', price: 0.9 },
      { id: 'crispy-bacon', name: 'Smoked Beef Bacon', portion: '80 gm', price: 1.5 },
      { id: 'truffle-aioli', name: 'Truffle Aioli', portion: '40 ml', price: 0.75 },
    ],
  },
  {
    id: 'chicken-salad',
    name: 'Chicken Salad',
    restaurant: 'Melt House',
    category: 'meat',
    basePrice: 4.56,
    calories: 180,
    prepMinutes: 15,
    rating: 4.9,
    reviewCountLabel: '960',
    description:
      'Herb-grilled chicken breast sliced over baby spinach, heirloom cherry tomatoes, cucumber, feta crumbles, and toasted seeds.',
    image: '/src/assets/images/salad_chicken_bowl_1795619757328.jpg',
    featured: true,
    sizes: [
      { id: 'regular', label: 'Regular Bowl', shortLabel: 'Regular', price: 4.56 },
      { id: 'protein', label: 'High Protein', shortLabel: 'Large', price: 6.8 },
      { id: 'family', label: 'Sharing Platter', shortLabel: 'Share', price: 11.5 },
    ],
    ingredients: [
      { id: 'avocado', name: 'Sliced Avocado', portion: '100 gm', price: 1.25 },
      { id: 'feta', name: 'Crumbled Feta', portion: '50 gm', price: 0.85 },
      { id: 'herb-dressing', name: 'Extra Vinaigrette', portion: '45 ml', price: 0.5 },
    ],
  },
  {
    id: 'herb-ribeye-steak',
    name: 'Herb Ribeye Steak',
    restaurant: 'Prime Grill',
    category: 'meat',
    basePrice: 18.5,
    calories: 420,
    prepMinutes: 25,
    rating: 4.9,
    reviewCountLabel: '1.4k',
    description:
      'Char-grilled ribeye finished with rosemary butter, flaky sea salt, and blistered vine tomatoes.',
    image: '/src/assets/images/steak_herb_meat_1795619758541.jpg',
    featured: false,
    sizes: [
      { id: '220g', label: '220g Classic Cut', shortLabel: '220g', price: 18.5 },
      { id: '320g', label: '320g Reserve Cut', shortLabel: '320g', price: 24.0 },
      { id: '450g', label: '450g Chef Board', shortLabel: '450g', price: 31.5 },
    ],
    ingredients: [
      { id: 'garlic-butter', name: 'Roasted Garlic Butter', portion: '40 gm', price: 1.1 },
      { id: 'peppercorn', name: 'Green Peppercorn Jus', portion: '60 ml', price: 1.3 },
      { id: 'grilled-tomato', name: 'Extra Vine Tomatoes', portion: '120 gm', price: 0.9 },
    ],
  },
  {
    id: 'salmon-nigiri-set',
    name: 'Salmon Nigiri Set',
    restaurant: 'Sakura Kitchen',
    category: 'sushi',
    basePrice: 14.2,
    calories: 290,
    prepMinutes: 20,
    rating: 4.8,
    reviewCountLabel: '1.1k',
    description:
      'Four hand-pressed Atlantic salmon nigiri paired with four avocado maki rolls, pickled ginger, and aged soy.',
    image: '/src/assets/images/sushi_salmon_set_1795619757291.jpg',
    featured: false,
    sizes: [
      { id: '8pc', label: '8 Pieces Set', shortLabel: '8 pc', price: 14.2 },
      { id: '12pc', label: '12 Pieces Set', shortLabel: '12 pc', price: 18.9 },
      { id: '16pc', label: '16 Pieces Omotenashi', shortLabel: '16 pc', price: 23.5 },
    ],
    ingredients: [
      { id: 'extra-nigiri', name: '2x Salmon Nigiri', portion: '70 gm', price: 3.2 },
      { id: 'fresh-wasabi', name: 'Grated Fresh Wasabi', portion: '15 gm', price: 0.9 },
      { id: 'yuzu-soy', name: 'Yuzu Soy Dip', portion: '30 ml', price: 0.6 },
    ],
  },
  {
    id: 'blood-orange-cooler',
    name: 'Blood Orange Cooler',
    restaurant: 'Citrus Bar',
    category: 'drinks',
    basePrice: 3.99,
    calories: 65,
    prepMinutes: 10,
    rating: 4.7,
    reviewCountLabel: '640',
    description:
      'Sparkling Sicilian blood orange juice over hand-cracked ice with garden mint sprigs and cold-pressed lime.',
    image: '/src/assets/images/drink_citrus_cooler_1795619758826.jpg',
    featured: false,
    sizes: [
      { id: 'regular', label: '350ml Tall Glass', shortLabel: '350ml', price: 3.99 },
      { id: 'large', label: '500ml Carafe', shortLabel: '500ml', price: 5.49 },
      { id: 'duo', label: '2x Duo Pack', shortLabel: 'Duo', price: 7.5 },
    ],
    ingredients: [
      { id: 'mint-boost', name: 'Fresh Mint Infusion', portion: '15 gm', price: 0.45 },
      { id: 'ginger-shot', name: 'Cold Ginger Zing', portion: '20 ml', price: 0.7 },
    ],
  },
];

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    cartKey: 'melting-cheese-pizza__medium__chicken',
    itemId: 'melting-cheese-pizza',
    name: 'Melting Cheese Pizza',
    restaurant: 'Pizza Italiano',
    image: '/src/assets/images/pizza_melting_cheese_1795619756552.jpg',
    sizeId: 'medium',
    sizeLabel: "8' - Medium",
    selectedIngredients: [
      { id: 'chicken', name: 'Chicken', portion: '250 gm', price: 1.4 },
    ],
    unitPrice: 12.39,
    quantity: 1,
  },
  {
    cartKey: 'chicken-salad__regular__',
    itemId: 'chicken-salad',
    name: 'Chicken Salad',
    restaurant: 'Melt House',
    image: '/src/assets/images/salad_chicken_bowl_1795619757328.jpg',
    sizeId: 'regular',
    sizeLabel: 'Regular Bowl',
    selectedIngredients: [],
    unitPrice: 4.56,
    quantity: 1,
  },
  {
    cartKey: 'cheese-burger__single__',
    itemId: 'cheese-burger',
    name: 'Cheese Burger',
    restaurant: 'Burger Hunt',
    image: '/src/assets/images/burger_cheese_double_1795619756564.jpg',
    sizeId: 'single',
    sizeLabel: 'Single Patty',
    selectedIngredients: [],
    unitPrice: 4.99,
    quantity: 1,
  },
];

export const INITIAL_ORDER: OrderRecord = {
  orderId: '123456',
  restaurant: 'Pizza Italiano',
  placedAt: '24 Sep · 06:45 PM',
  arrivalMinutes: 20,
  currentStepIndex: 2,
  courier: {
    name: 'John Smith',
    role: 'Driver',
    rating: 4.8,
    avatar: COURIER_AVATAR_IMAGE,
    phone: '+1 (212) 555-0148',
  },
  steps: [
    {
      id: 'accepted',
      title: 'Order Accepted',
      time: '06:20 PM',
      description: 'Pizza Italiano confirmed your kitchen ticket.',
    },
    {
      id: 'cooking',
      title: 'Cooking Food',
      time: '06:25 PM',
      description: 'Stone-baked pizza and fresh toppings are being prepared.',
    },
    {
      id: 'on-the-way',
      title: "Food's on the Way",
      time: '06:40 PM',
      description: 'John Smith picked up your insulated order bag.',
    },
    {
      id: 'delivered',
      title: 'Delivered to you',
      time: '06:50 PM',
      description: 'Handed over fresh at your doorstep.',
    },
  ],
  items: [
    {
      name: 'Melting Cheese Pizza',
      detail: "Medium 8' · +Chicken",
      quantity: 2,
      lineTotal: 24.78,
    },
    {
      name: 'Cheese Burger',
      detail: 'Single Patty',
      quantity: 2,
      lineTotal: 9.98,
    },
    {
      name: 'Chicken Salad',
      detail: 'Regular Bowl',
      quantity: 1,
      lineTotal: 4.56,
    },
  ],
  subtotal: 39.32,
  deliveryFee: 5.0,
  discount: 0,
  total: 44.32,
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    restaurant: 'Pizza Italiano',
    title: 'Pizza Italiano accepted your custom order.',
    body: 'Estimated arrival in 20 minutes with courier John Smith.',
    timestamp: '5 min',
    type: 'order',
    status: 'pending',
  },
  {
    id: 'notif-2',
    restaurant: 'Western Hot Grill',
    title: 'Western Hot Grill New Year Special',
    body: 'Enjoy 30% OFF your entire cart with promo code NEWYEAR30 until Dec 31.',
    timestamp: '2 hrs',
    type: 'promo',
    status: 'info',
    promoCode: 'NEWYEAR30',
  },
];
