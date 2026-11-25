import { useState } from 'react';
import { motion } from 'motion/react';
import { AnimatedHeading } from './AnimatedHeading';
import { DishImage } from './DishImage';
import { useSmoothScroll } from '../context/ScrollContext';
import { MENU_CATEGORIES, PROMO_BANNER_IMAGE } from '../data/menuData';
import type { CategoryId, MenuItem } from '../types/delisas';
import { formatCurrency } from '../utils/orderLogic';

interface HeroSectionProps {
  bestSellers: MenuItem[];
  favoriteIds: string[];
  unreadNotifications: number;
  cartCount: number;
  appliedPromoCode: string;
  onSelectCategory: (cat: CategoryId) => void;
  onQuickAdd: (item: MenuItem) => void;
  onOpenDish: (item: MenuItem) => void;
  onToggleFavorite: (itemId: string) => void;
  onOpenNotifications: () => void;
  onOpenCart: () => void;
  onClaimPromo: (code: string) => void;
}

export function HeroSection({
  bestSellers,
  favoriteIds,
  unreadNotifications,
  cartCount,
  appliedPromoCode,
  onSelectCategory,
  onQuickAdd,
  onOpenDish,
  onToggleFavorite,
  onOpenNotifications,
  onOpenCart,
  onClaimPromo,
}: HeroSectionProps) {
  const { scrollToSection } = useSmoothScroll();
  const [previewTab, setPreviewTab] = useState<'home' | 'saved'>('home');
  const [promoClaimed, setPromoClaimed] = useState(false);

  const previewItems =
    previewTab === 'saved'
      ? bestSellers.filter((item) => favoriteIds.includes(item.id))
      : bestSellers.slice(0, 2);

  const handleClaimOffer = () => {
    onClaimPromo('NEWYEAR30');
    setPromoClaimed(true);
    setTimeout(() => setPromoClaimed(false), 3000);
  };

  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Editorial Headline, Value Prop & Promotional Hero Card */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-medium text-[#4D5851]">
                Delisas Agency · New York Kitchens · 20 min average delivery
              </p>

              <AnimatedHeading
                as="h1"
                immediate
                text="Fresh culinary delivery crafted for every craving."
                className="font-display text-4xl font-bold tracking-tight text-[#181C19] sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]"
              />

              <p className="max-w-xl text-base leading-relaxed text-[#515D56] sm:text-lg">
                Browse curated local kitchens, customize pizza sizes and fresh add-on ingredients,
                and follow your courier door-to-door on a live New York route map.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => scrollToSection('menu')}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#58AE52] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#489742] active:scale-[0.98] whitespace-nowrap cursor-pointer"
              >
                <span>Explore Menu</span>
                <i className="ri-arrow-right-line text-base" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('tracking')}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#C7D4CD] bg-white px-6 py-3 text-sm font-semibold text-[#181C19] transition-colors hover:bg-[#F6F9F7] whitespace-nowrap cursor-pointer"
              >
                <i className="ri-map-pin-time-line text-base text-[#58AE52]" aria-hidden="true" />
                <span>Track Live Order</span>
              </button>
            </div>

            {/* New Year Offer Promotional Card matching reference */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="relative overflow-hidden rounded-3xl bg-[#243026] text-white shadow-lg"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 items-center">
                <div className="relative z-10 p-6 sm:col-span-7 sm:p-7">
                  <p className="text-xs font-medium text-[#B8CABD]">
                    New Year Offer · 16 – 31 Dec
                  </p>
                  <p className="mt-1.5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    30% OFF
                  </p>
                  <p className="mt-2 max-w-xs text-sm text-[#D1DDD5]">
                    Use code <span className="font-semibold text-[#F6C84C]">NEWYEAR30</span> at
                    checkout on custom pizzas, burgers, and salads.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleClaimOffer}
                      className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#58AE52] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#489742] whitespace-nowrap cursor-pointer"
                    >
                      <i
                        className={
                          promoClaimed || appliedPromoCode.toUpperCase() === 'NEWYEAR30'
                            ? 'ri-check-line text-base'
                            : 'ri-coupon-3-line text-base'
                        }
                        aria-hidden="true"
                      />
                      <span>
                        {promoClaimed || appliedPromoCode.toUpperCase() === 'NEWYEAR30'
                          ? 'Applied to Cart'
                          : 'Get Now'}
                      </span>
                    </button>
                    <span className="text-xs text-[#A8B9AE]">Instant cart discount</span>
                  </div>
                </div>

                <div className="relative h-48 sm:col-span-5 sm:h-full sm:min-h-[215px]">
                  <DishImage
                    src={PROMO_BANNER_IMAGE}
                    alt="Delisas courier with New Year 30% off pizza delivery"
                    className="h-full w-full object-cover object-[78%_20%] sm:object-right"
                    fallbackIconClass="ri-e-bike-2-line"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#243026] via-transparent to-transparent sm:bg-gradient-to-r sm:from-[#243026] sm:via-[#243026]/20 sm:to-transparent"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Mobile App Home Screen matching reference */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="w-full max-w-[380px] rounded-[2.25rem] bg-[#F7F9F8] p-5 shadow-[0_24px_60px_-15px_rgba(24,28,25,0.14)] border border-white"
            >
              {/* App Top Greeting Bar */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-[#68736C]">Hello, welcome back</p>
                  <p className="font-display text-lg font-bold text-[#181C19]">Delisas Agency</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollToSection('menu')}
                    aria-label="Jump to menu search"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#181C19] shadow-sm transition-transform hover:scale-105 cursor-pointer"
                  >
                    <i className="ri-search-line text-lg" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={onOpenNotifications}
                    aria-label={`Open notifications (${unreadNotifications} active)`}
                    className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#181C19] shadow-sm transition-transform hover:scale-105 cursor-pointer"
                  >
                    <i className="ri-notification-3-line text-lg" aria-hidden="true" />
                    {unreadNotifications > 0 && (
                      <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-[#58AE52]" />
                    )}
                  </button>
                </div>
              </div>

              {/* 4 Category Tiles */}
              <div className="mt-5 grid grid-cols-4 gap-2.5">
                {MENU_CATEGORIES.filter((c) => c.id !== 'all').map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      onSelectCategory(category.id);
                      scrollToSection('menu');
                    }}
                    className="group flex flex-col items-center gap-1.5 rounded-2xl bg-white p-2.5 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-sm cursor-pointer"
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${category.accentBg} ${category.accentText} transition-transform group-hover:scale-105`}
                    >
                      <i className={`${category.iconClass} text-lg`} aria-hidden="true" />
                    </span>
                    <span className="text-[11px] font-medium text-[#343C36] whitespace-nowrap">
                      {category.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Mini New Year Offer Banner */}
              <div className="mt-4 relative overflow-hidden rounded-2xl bg-[#243026] p-4 text-white">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-medium text-[#B8CABD]">New Year Offer</p>
                    <p className="font-display text-xl font-extrabold tracking-tight">30% OFF</p>
                    <p className="text-[11px] text-[#B8CABD]">16 - 31 Dec</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleClaimOffer}
                    className="rounded-full bg-[#58AE52] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#489742] whitespace-nowrap cursor-pointer"
                  >
                    Get Now
                  </button>
                </div>
              </div>

              {/* Best Sellers Header */}
              <div className="mt-5 flex items-center justify-between">
                <h2 className="font-display text-base font-bold text-[#181C19]">
                  {previewTab === 'saved' ? 'Saved Favorites' : 'Best Sellers'}
                </h2>
                <button
                  type="button"
                  onClick={() => scrollToSection('menu')}
                  className="text-xs font-semibold text-[#58AE52] hover:text-[#489742] cursor-pointer"
                >
                  See All
                </button>
              </div>

              {/* 2-Card Best Sellers Preview */}
              <div className="mt-3 grid grid-cols-2 gap-3">
                {previewItems.length > 0 ? (
                  previewItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col rounded-2xl bg-white p-3 shadow-xs transition-shadow hover:shadow-sm"
                    >
                      <button
                        type="button"
                        onClick={() => onOpenDish(item)}
                        className="text-left focus-visible:outline-2 focus-visible:outline-[#58AE52] rounded-xl cursor-pointer"
                      >
                        <p className="truncate text-xs font-semibold text-[#181C19]">
                          {item.name}
                        </p>
                        <p className="tabular-nums text-xs font-bold text-[#58AE52]">
                          {formatCurrency(item.basePrice)}
                        </p>
                        <div className="my-2.5 aspect-square w-full overflow-hidden rounded-xl bg-[#F4F7F5]">
                          <DishImage
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </button>

                      <div className="mt-auto flex items-center justify-between gap-1 pt-1">
                        <div className="text-[10px] leading-tight text-[#68736C] tabular-nums">
                          <div className="flex items-center gap-1">
                            <i className="ri-fire-line text-[#E66A2C]" aria-hidden="true" />
                            <span>{item.calories} kcal</span>
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <i className="ri-time-line text-[#68736C]" aria-hidden="true" />
                            <span>{item.prepMinutes} min</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onQuickAdd(item)}
                          aria-label={`Add ${item.name} to cart`}
                          className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#58AE52] text-white transition-colors hover:bg-[#489742] cursor-pointer"
                        >
                          <i className="ri-add-line text-base" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 rounded-2xl bg-white p-5 text-center text-xs text-[#68736C]">
                    Tap the heart icon on any dish below to save favorites here.
                  </div>
                )}
              </div>

              {/* Bottom App Tab Bar matching reference */}
              <div className="mt-4 flex items-center justify-between rounded-2xl bg-white px-2 py-2 shadow-xs">
                <button
                  type="button"
                  onClick={() => setPreviewTab('home')}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                    previewTab === 'home'
                      ? 'bg-[#58AE52] text-white'
                      : 'text-[#68736C] hover:text-[#181C19]'
                  }`}
                >
                  <i className="ri-home-5-fill text-sm" aria-hidden="true" />
                  <span>Home</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewTab('saved')}
                  aria-label="View saved favorites in preview"
                  className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-2 text-xs font-medium transition-colors cursor-pointer ${
                    previewTab === 'saved'
                      ? 'bg-[#EEF6ED] text-[#3B8236]'
                      : 'text-[#68736C] hover:text-[#181C19]'
                  }`}
                >
                  <i className="ri-heart-line text-base" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onOpenCart}
                  aria-label="Open shopping bag from preview"
                  className="relative inline-flex items-center rounded-xl px-2.5 py-2 text-[#68736C] hover:text-[#181C19] cursor-pointer"
                >
                  <i className="ri-shopping-bag-3-line text-base" aria-hidden="true" />
                  {cartCount > 0 && (
                    <span className="ml-1 tabular-nums text-[10px] font-bold text-[#58AE52]">
                      {cartCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleClaimOffer}
                  aria-label="Apply 30 percent coupon"
                  className="inline-flex items-center rounded-xl px-2.5 py-2 text-[#68736C] hover:text-[#181C19] cursor-pointer"
                >
                  <i className="ri-coupon-line text-base" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('tracking')}
                  aria-label="Jump to order tracking"
                  className="inline-flex items-center rounded-xl px-2.5 py-2 text-[#68736C] hover:text-[#181C19] cursor-pointer"
                >
                  <i className="ri-user-3-line text-base" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
