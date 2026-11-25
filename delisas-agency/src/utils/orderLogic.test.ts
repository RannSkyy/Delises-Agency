import test from 'node:test';
import assert from 'node:assert/strict';
import {
  advanceOrderStep,
  buildCartKey,
  calculateCartTotals,
  calculateDishUnitPrice,
  filterAndSortMenu,
  validateContactForm,
} from './orderLogic';
import type { MenuItem } from '../types/delisas';

test('calculateDishUnitPrice sums base size price and selected add-ons cleanly', () => {
  const price = calculateDishUnitPrice(10.99, [{ price: 1.4 }, { price: 0.8 }]);
  assert.equal(price, 13.19);
});

test('buildCartKey produces order-independent keys for identical ingredient selections', () => {
  const keyA = buildCartKey('pizza', 'medium', ['mushroom', 'chicken']);
  const keyB = buildCartKey('pizza', 'medium', ['chicken', 'mushroom']);
  assert.equal(keyA, keyB);
});

test('calculateCartTotals computes subtotal, delivery, NEWYEAR30 30% discount, and total', () => {
  const totals = calculateCartTotals(
    [
      { unitPrice: 11.88, quantity: 1 },
      { unitPrice: 4.56, quantity: 1 },
      { unitPrice: 4.99, quantity: 1 },
    ],
    'newyear30',
    5.0
  );
  assert.equal(totals.subtotal, 21.43);
  assert.equal(totals.deliveryFee, 5.0);
  assert.equal(totals.discount, 6.43);
  assert.equal(totals.total, 20.0);
  assert.equal(totals.promoIsValid, true);
  assert.equal(totals.appliedCode, 'NEWYEAR30');
});

test('calculateCartTotals flags invalid promo code and minimum subtotal rules', () => {
  const lowSubtotal = calculateCartTotals([{ unitPrice: 10, quantity: 1 }], 'DELISAS10', 5);
  assert.equal(lowSubtotal.promoIsValid, false);
  assert.equal(lowSubtotal.discount, 0);
  assert.equal(lowSubtotal.total, 15);

  const badCode = calculateCartTotals([{ unitPrice: 20, quantity: 1 }], 'INVALID', 5);
  assert.equal(badCode.promoIsValid, false);
  assert.equal(badCode.total, 25);
});

test('filterAndSortMenu filters by category and search query and sorts by price', () => {
  const mockItems: MenuItem[] = [
    {
      id: '1',
      name: 'Melting Cheese Pizza',
      restaurant: 'Pizza Italiano',
      category: 'fast-food',
      basePrice: 10.99,
      calories: 44,
      prepMinutes: 20,
      rating: 4.8,
      reviewCountLabel: '2.2k',
      description: 'Wood-fired mozzarella and basil.',
      image: '/a.jpg',
      featured: true,
      sizes: [],
      ingredients: [],
    },
    {
      id: '2',
      name: 'Cheese Burger',
      restaurant: 'Burger Hunt',
      category: 'fast-food',
      basePrice: 4.99,
      calories: 44,
      prepMinutes: 20,
      rating: 4.7,
      reviewCountLabel: '1.8k',
      description: 'Double cheddar beef patty.',
      image: '/b.jpg',
      featured: true,
      sizes: [],
      ingredients: [],
    },
    {
      id: '3',
      name: 'Salmon Nigiri Set',
      restaurant: 'Sakura Kitchen',
      category: 'sushi',
      basePrice: 14.2,
      calories: 290,
      prepMinutes: 20,
      rating: 4.9,
      reviewCountLabel: '1.1k',
      description: 'Fresh Atlantic salmon.',
      image: '/c.jpg',
      featured: false,
      sizes: [],
      ingredients: [],
    },
  ];

  const fastFoodAsc = filterAndSortMenu(mockItems, 'fast-food', '', 'price-asc');
  assert.equal(fastFoodAsc.length, 2);
  assert.equal(fastFoodAsc[0].id, '2');

  const pizzaSearch = filterAndSortMenu(mockItems, 'all', 'italiano', 'featured');
  assert.equal(pizzaSearch.length, 1);
  assert.equal(pizzaSearch[0].id, '1');
});

test('validateContactForm catches invalid fields and accepts complete data', () => {
  const invalid = validateContactForm({
    name: 'A',
    email: 'not-an-email',
    topic: '',
    message: 'Hi',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.topic);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Rangga Pratama',
    email: 'rangga@example.com',
    topic: 'Restaurant Partnership',
    message: 'We would like to onboard our kitchen with Delisas Agency.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('advanceOrderStep increments up to final step without overflowing', () => {
  assert.equal(advanceOrderStep(0, 4), 1);
  assert.equal(advanceOrderStep(2, 4), 3);
  assert.equal(advanceOrderStep(3, 4), 3);
});
