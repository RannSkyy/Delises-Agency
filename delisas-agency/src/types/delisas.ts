export type CategoryId = 'all' | 'meat' | 'fast-food' | 'sushi' | 'drinks';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export interface SizeOption {
  id: string;
  label: string;
  shortLabel: string;
  price: number;
}

export interface IngredientOption {
  id: string;
  name: string;
  portion: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  restaurant: string;
  category: Exclude<CategoryId, 'all'>;
  basePrice: number;
  calories: number;
  prepMinutes: number;
  rating: number;
  reviewCountLabel: string;
  description: string;
  image: string;
  featured: boolean;
  sizes: SizeOption[];
  ingredients: IngredientOption[];
}

export interface CartItem {
  cartKey: string;
  itemId: string;
  name: string;
  restaurant: string;
  image: string;
  sizeId: string;
  sizeLabel: string;
  selectedIngredients: IngredientOption[];
  unitPrice: number;
  quantity: number;
}

export interface OrderStep {
  id: string;
  title: string;
  time: string;
  description: string;
}

export interface OrderItemSummary {
  name: string;
  detail: string;
  quantity: number;
  lineTotal: number;
}

export interface OrderRecord {
  orderId: string;
  restaurant: string;
  placedAt: string;
  arrivalMinutes: number;
  currentStepIndex: number;
  courier: {
    name: string;
    role: string;
    rating: number;
    avatar: string;
    phone: string;
  };
  steps: OrderStep[];
  items: OrderItemSummary[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

export interface NotificationItem {
  id: string;
  restaurant: string;
  title: string;
  body: string;
  timestamp: string;
  type: 'order' | 'promo';
  status: 'pending' | 'accepted' | 'declined' | 'info';
  promoCode?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
}
