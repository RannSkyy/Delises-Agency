import type {
  CartItem,
  CategoryId,
  ContactFormData,
  ContactFormErrors,
  IngredientOption,
  MenuItem,
  SortOption,
} from '../types/delisas';

export const DELIVERY_FEE = 5.0;

export interface CartTotals {
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  appliedCode: string | null;
  promoMessage: string | null;
  promoIsValid: boolean;
}

export function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function formatCurrency(value: number): string {
  return `$${roundCurrency(value).toFixed(2)}`;
}

export function calculateDishUnitPrice(
  sizePrice: number,
  selectedIngredients: Pick<IngredientOption, 'price'>[]
): number {
  const addons = selectedIngredients.reduce((sum, item) => sum + item.price, 0);
  return roundCurrency(Math.max(0, sizePrice + addons));
}

export function buildCartKey(
  itemId: string,
  sizeId: string,
  ingredientIds: string[]
): string {
  const sorted = [...ingredientIds].sort().join(',');
  return `${itemId}__${sizeId}__${sorted}`;
}

export function calculateCartTotals(
  items: Pick<CartItem, 'unitPrice' | 'quantity'>[],
  promoCodeInput: string,
  deliveryFee: number = DELIVERY_FEE
): CartTotals {
  const subtotal = roundCurrency(
    items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  );

  if (items.length === 0) {
    return {
      subtotal: 0,
      deliveryFee: 0,
      discount: 0,
      total: 0,
      appliedCode: null,
      promoMessage: null,
      promoIsValid: false,
    };
  }

  const normalizedCode = promoCodeInput.trim().toUpperCase();
  let discount = 0;
  let appliedCode: string | null = null;
  let promoMessage: string | null = null;
  let promoIsValid = false;

  if (normalizedCode === 'NEWYEAR30') {
    discount = roundCurrency(subtotal * 0.3);
    appliedCode = 'NEWYEAR30';
    promoMessage = '30% New Year Offer applied';
    promoIsValid = true;
  } else if (normalizedCode === 'DELISAS10') {
    if (subtotal >= 15) {
      discount = 5.0;
      appliedCode = 'DELISAS10';
      promoMessage = '$5.00 instant discount applied';
      promoIsValid = true;
    } else {
      promoMessage = 'DELISAS10 requires a $15.00 minimum subtotal';
      promoIsValid = false;
    }
  } else if (normalizedCode.length > 0) {
    promoMessage = 'Invalid code. Try NEWYEAR30 or DELISAS10';
    promoIsValid = false;
  }

  const effectiveDelivery = subtotal > 0 ? deliveryFee : 0;
  const total = roundCurrency(Math.max(0, subtotal + effectiveDelivery - discount));

  return {
    subtotal,
    deliveryFee: effectiveDelivery,
    discount,
    total,
    appliedCode,
    promoMessage,
    promoIsValid,
  };
}

export function filterAndSortMenu(
  items: MenuItem[],
  category: CategoryId,
  searchQuery: string,
  sortBy: SortOption
): MenuItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filtered = items.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category;
    if (!matchesCategory) {
      return false;
    }
    if (!normalizedQuery) {
      return true;
    }
    return (
      item.name.toLowerCase().includes(normalizedQuery) ||
      item.restaurant.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery)
    );
  });

  const sorted = [...filtered];
  if (sortBy === 'price-asc') {
    sorted.sort((a, b) => a.basePrice - b.basePrice);
  } else if (sortBy === 'price-desc') {
    sorted.sort((a, b) => b.basePrice - a.basePrice);
  } else if (sortBy === 'rating') {
    sorted.sort((a, b) => b.rating - a.rating);
  } else {
    sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
  }

  return sorted;
}

export function validateContactForm(data: ContactFormData): {
  valid: boolean;
  errors: ContactFormErrors;
} {
  const errors: ContactFormErrors = {};

  if (data.name.trim().length < 2) {
    errors.name = 'Please enter your full name (at least 2 characters).';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.topic.trim()) {
    errors.topic = 'Please choose an inquiry topic.';
  }

  if (data.message.trim().length < 10) {
    errors.message = 'Please enter a message of at least 10 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function advanceOrderStep(currentStep: number, totalSteps: number): number {
  if (totalSteps <= 0) {
    return 0;
  }
  return Math.min(totalSteps - 1, currentStep + 1);
}
