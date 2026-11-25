import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ScrollProvider, useSmoothScroll } from './context/ScrollContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { ShowcaseSection } from './components/ShowcaseSection';
import { TrackingSection } from './components/TrackingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { DishModal } from './components/DishModal';
import { CartDrawer } from './components/CartDrawer';
import { NotificationsModal } from './components/NotificationsModal';
import { CourierModal } from './components/CourierModal';
import {
  INITIAL_CART_ITEMS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ORDER,
  MENU_ITEMS,
} from './data/menuData';
import type {
  CartItem,
  CategoryId,
  IngredientOption,
  MenuItem,
  NotificationItem,
  OrderRecord,
  SortOption,
} from './types/delisas';
import {
  advanceOrderStep,
  buildCartKey,
  calculateCartTotals,
  DELIVERY_FEE,
  filterAndSortMenu,
  roundCurrency,
} from './utils/orderLogic';

function DelisasAppContent() {
  const { scrollToSection } = useSmoothScroll();

  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['melting-cheese-pizza']);

  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [promoInput, setPromoInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<string>('');

  const [activeDish, setActiveDish] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [courierModalMode, setCourierModalMode] = useState<'message' | 'call' | null>(null);

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [order, setOrder] = useState<OrderRecord>(INITIAL_ORDER);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const filteredMenu = useMemo(
    () => filterAndSortMenu(MENU_ITEMS, selectedCategory, searchQuery, sortBy),
    [selectedCategory, searchQuery, sortBy]
  );

  const bestSellers = useMemo(() => MENU_ITEMS.filter((item) => item.featured), []);

  const cartTotals = useMemo(
    () => calculateCartTotals(cartItems, appliedPromo, DELIVERY_FEE),
    [cartItems, appliedPromo]
  );

  const totalCartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const unreadNotificationsCount = useMemo(
    () => notifications.filter((n) => n.status === 'pending' || n.type === 'promo').length,
    [notifications]
  );

  const handleToggleFavorite = (itemId: string) => {
    setFavoriteIds((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleAddToCart = (payload: {
    dish: MenuItem;
    sizeId: string;
    sizeLabel: string;
    selectedIngredients: IngredientOption[];
    quantity: number;
    unitPrice: number;
  }) => {
    const key = buildCartKey(
      payload.dish.id,
      payload.sizeId,
      payload.selectedIngredients.map((i) => i.id)
    );

    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartKey === key);
      if (existing) {
        return prev.map((item) =>
          item.cartKey === key
            ? { ...item, quantity: item.quantity + payload.quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartKey: key,
          itemId: payload.dish.id,
          name: payload.dish.name,
          restaurant: payload.dish.restaurant,
          image: payload.dish.image,
          sizeId: payload.sizeId,
          sizeLabel: payload.sizeLabel,
          selectedIngredients: payload.selectedIngredients,
          unitPrice: payload.unitPrice,
          quantity: payload.quantity,
        },
      ];
    });

    showToast(`Added ${payload.dish.name} to cart`);
  };

  const handleQuickAdd = (dish: MenuItem) => {
    const defaultSize = dish.sizes[1] || dish.sizes[0];
    handleAddToCart({
      dish,
      sizeId: defaultSize ? defaultSize.id : 'default',
      sizeLabel: defaultSize ? defaultSize.label : 'Standard',
      selectedIngredients: [],
      quantity: 1,
      unitPrice: defaultSize ? defaultSize.price : dish.basePrice,
    });
  };

  const handleUpdateCartQty = (cartKey: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (cartKey: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const handleClearCart = () => {
    setCartItems([]);
    setAppliedPromo('');
    setPromoInput('');
  };

  const handleApplyPromo = (code: string) => {
    setPromoInput(code);
    setAppliedPromo(code);
    if (code.trim().toUpperCase() === 'NEWYEAR30') {
      showToast('NEWYEAR30 applied (30% off)');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }

    const newOrderId = String(Math.floor(100000 + Math.random() * 900000));
    const leadRestaurant = cartItems[0].restaurant;

    setOrder((prev) => ({
      ...prev,
      orderId: newOrderId,
      restaurant: leadRestaurant,
      placedAt: 'Just now',
      arrivalMinutes: 20,
      currentStepIndex: 0,
      items: cartItems.map((item) => ({
        name: item.name,
        detail:
          item.selectedIngredients.length > 0
            ? `${item.sizeLabel} · +${item.selectedIngredients.map((i) => i.name).join(', ')}`
            : item.sizeLabel,
        quantity: item.quantity,
        lineTotal: roundCurrency(item.unitPrice * item.quantity),
      })),
      subtotal: cartTotals.subtotal,
      deliveryFee: cartTotals.deliveryFee,
      discount: cartTotals.discount,
      total: cartTotals.total,
    }));

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        restaurant: leadRestaurant,
        title: `Order #${newOrderId} confirmed by ${leadRestaurant}.`,
        body: 'Your courier John Smith is heading to the kitchen.',
        timestamp: 'Just now',
        type: 'order',
        status: 'pending',
      },
      ...prev,
    ]);

    setCartItems([]);
    setAppliedPromo('');
    setPromoInput('');
    setIsCartOpen(false);
    showToast(`Order #${newOrderId} placed! Tracking is now live.`);
    scrollToSection('tracking');
  };

  const handleDeclineNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: 'declined' } : n))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#EBF0ED] text-[#181C19]">
      <Navbar
        cartCount={totalCartCount}
        unreadNotifications={unreadNotificationsCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
      />

      <main className="flex-1">
        <HeroSection
          bestSellers={bestSellers}
          favoriteIds={favoriteIds}
          unreadNotifications={unreadNotificationsCount}
          cartCount={totalCartCount}
          appliedPromoCode={appliedPromo}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onQuickAdd={handleQuickAdd}
          onOpenDish={(dish) => setActiveDish(dish)}
          onToggleFavorite={handleToggleFavorite}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          onClaimPromo={(code) => {
            handleApplyPromo(code);
          }}
        />

        <MenuSection
          items={filteredMenu}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          sortBy={sortBy}
          favoriteIds={favoriteIds}
          onCategoryChange={setSelectedCategory}
          onSearchChange={setSearchQuery}
          onSortChange={setSortBy}
          onResetFilters={() => {
            setSelectedCategory('all');
            setSearchQuery('');
            setSortBy('featured');
          }}
          onOpenDish={(dish) => setActiveDish(dish)}
          onQuickAdd={handleQuickAdd}
          onToggleFavorite={handleToggleFavorite}
        />

        <ShowcaseSection
          featuredPizza={MENU_ITEMS[0]}
          cartItems={cartItems}
          cartSubtotal={cartTotals.subtotal}
          cartDelivery={cartTotals.deliveryFee}
          cartTotal={cartTotals.total}
          notifications={notifications}
          order={order}
          onOpenDish={(dish) => setActiveDish(dish)}
          onUpdateCartQty={handleUpdateCartQty}
          onOpenCart={() => setIsCartOpen(true)}
          onDeclineNotification={handleDeclineNotification}
          onApplyPromoFromShowcase={(code) => {
            handleApplyPromo(code);
            setIsCartOpen(true);
          }}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
        />

        <TrackingSection
          order={order}
          onAdvanceStep={() =>
            setOrder((prev) => ({
              ...prev,
              currentStepIndex: advanceOrderStep(prev.currentStepIndex, prev.steps.length),
            }))
          }
          onResetTracking={() => setOrder(INITIAL_ORDER)}
          onOpenCourierModal={(mode) => setCourierModalMode(mode)}
        />

        <ContactSection />
      </main>

      <Footer
        onOpenCart={() => setIsCartOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
      />

      <BackToTop />

      {/* Modals & Drawers */}
      <DishModal
        dish={activeDish}
        isFavorite={activeDish ? favoriteIds.includes(activeDish.id) : false}
        onClose={() => setActiveDish(null)}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        totals={cartTotals}
        promoInput={promoInput}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onPromoInputChange={setPromoInput}
        onApplyPromo={handleApplyPromo}
        onCheckout={handleCheckout}
        onBrowseMenu={() => scrollToSection('menu')}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        notifications={notifications}
        onClose={() => setIsNotificationsOpen(false)}
        onDeclineOrder={handleDeclineNotification}
        onViewOrderDetails={() => scrollToSection('tracking')}
        onApplyPromo={(code) => {
          handleApplyPromo(code);
          setIsCartOpen(true);
        }}
      />

      <CourierModal
        mode={courierModalMode}
        courier={order.courier}
        onClose={() => setCourierModalMode(null)}
      />

      {/* Non-intrusive bottom toast feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#243026] px-5 py-2.5 text-xs font-semibold text-white shadow-lg"
          >
            <span className="inline-flex items-center gap-2">
              <i className="ri-check-line text-[#58AE52]" aria-hidden="true" />
              <span>{toastMessage}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <ScrollProvider>
      <DelisasAppContent />
    </ScrollProvider>
  );
}
