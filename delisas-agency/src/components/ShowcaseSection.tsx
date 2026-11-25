import { motion } from 'motion/react';
import { AnimatedHeading } from './AnimatedHeading';
import { DishImage } from './DishImage';
import { useSmoothScroll } from '../context/ScrollContext';
import type { CartItem, MenuItem, NotificationItem, OrderRecord } from '../types/delisas';
import { formatCurrency } from '../utils/orderLogic';

interface ShowcaseSectionProps {
  featuredPizza: MenuItem;
  cartItems: CartItem[];
  cartSubtotal: number;
  cartDelivery: number;
  cartTotal: number;
  notifications: NotificationItem[];
  order: OrderRecord;
  onOpenDish: (item: MenuItem) => void;
  onUpdateCartQty: (cartKey: string, delta: number) => void;
  onOpenCart: () => void;
  onDeclineNotification: (id: string) => void;
  onApplyPromoFromShowcase: (code: string) => void;
  onOpenNotifications: () => void;
}

export function ShowcaseSection({
  featuredPizza,
  cartItems,
  cartSubtotal,
  cartDelivery,
  cartTotal,
  notifications,
  order,
  onOpenDish,
  onUpdateCartQty,
  onOpenCart,
  onDeclineNotification,
  onApplyPromoFromShowcase,
  onOpenNotifications,
}: ShowcaseSectionProps) {
  const { scrollToSection } = useSmoothScroll();
  const primaryNotification = notifications[0];

  return (
    <section id="showcase" className="py-16 sm:py-20 bg-[#E3EAE6]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#4D5851]">Mobile Experience</p>
          <AnimatedHeading
            text="Interactive App Workflow From Kitchen To Doorstep"
            className="mt-1 font-display text-3xl font-bold tracking-tight text-[#181C19] sm:text-4xl"
          />
          <p className="mt-3 text-base text-[#515D56]">
            Every screen from the Delisas Agency mobile system is live here — adjust cart quantities,
            customize pizza sizes, respond to restaurant updates, and inspect your receipt.
          </p>
        </div>

        {/* 4 Interactive Reference Screens Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {/* Card 1: Dish Customizer Preview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="flex flex-col rounded-[2rem] bg-[#F7F9F8] p-5 shadow-md border border-white"
          >
            <div className="flex items-center justify-between text-xs text-[#68736C]">
              <span>01 · Dish Details</span>
              <span className="inline-flex items-center gap-1 font-medium text-[#181C19]">
                <i className="ri-star-fill text-[#58AE52]" aria-hidden="true" />
                {featuredPizza.rating}
              </span>
            </div>

            <div className="mx-auto my-3 h-32 w-32 overflow-hidden rounded-full bg-white p-1.5 shadow-sm">
              <DishImage
                src={featuredPizza.image}
                alt={featuredPizza.name}
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            <h3 className="font-display text-base font-bold text-[#181C19]">
              {featuredPizza.name}
            </h3>
            <p className="text-xs text-[#68736C]">
              {featuredPizza.restaurant} · {featuredPizza.rating} ({featuredPizza.reviewCountLabel})
            </p>

            <div className="mt-3 grid grid-cols-3 gap-1.5 text-center">
              {featuredPizza.sizes.map((size) => (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => onOpenDish(featuredPizza)}
                  className={`rounded-xl border px-1.5 py-2 text-[11px] transition-colors cursor-pointer ${
                    size.id === 'medium'
                      ? 'border-[#58AE52] bg-[#EEF6ED] font-semibold text-[#181C19]'
                      : 'border-[#DCE4DF] bg-white text-[#5C6760] hover:border-[#58AE52]/50'
                  }`}
                >
                  <div className="truncate">{size.shortLabel}</div>
                  <div className="tabular-nums font-bold text-[#181C19]">
                    {size.price.toFixed(2)}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-3 rounded-xl bg-white p-2.5 text-xs border border-[#EAEFEA]">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#181C19]">Add Chicken (250 gm)</span>
                <span className="tabular-nums text-[#58AE52] font-semibold">+$1.40</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenDish(featuredPizza)}
              className="mt-auto pt-4 w-full cursor-pointer"
            >
              <span className="flex min-h-[42px] w-full items-center justify-center rounded-full bg-[#58AE52] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#489742]">
                Customize & Add
              </span>
            </button>
          </motion.div>

          {/* Card 2: Interactive Cart Preview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="flex flex-col rounded-[2rem] bg-[#F7F9F8] p-5 shadow-md border border-white"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#68736C]">02 · Live Cart</span>
              <span className="font-display text-sm font-bold text-[#181C19]">Cart</span>
            </div>

            <div className="mt-3 space-y-2.5 flex-1">
              {cartItems.slice(0, 3).map((item) => (
                <div
                  key={item.cartKey}
                  className="flex items-center gap-2.5 rounded-2xl bg-white p-2.5 shadow-xs"
                >
                  <DishImage
                    src={item.image}
                    alt={item.name}
                    className="h-11 w-11 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-[#181C19]">{item.name}</p>
                    <p className="tabular-nums text-[11px] font-bold text-[#58AE52]">
                      {formatCurrency(item.unitPrice)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => onUpdateCartQty(item.cartKey, -1)}
                      aria-label={`Decrease quantity of ${item.name}`}
                      className="flex h-6 w-6 items-center justify-center rounded-md bg-[#EEF6ED] text-xs font-bold text-[#3D8B37] hover:bg-[#58AE52] hover:text-white cursor-pointer"
                    >
                      -
                    </button>
                    <span className="tabular-nums w-4 text-center text-xs font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateCartQty(item.cartKey, 1)}
                      aria-label={`Increase quantity of ${item.name}`}
                      className="flex h-6 w-6 items-center justify-center rounded-md bg-[#58AE52] text-xs font-bold text-white hover:bg-[#489742] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              {cartItems.length === 0 && (
                <div className="rounded-2xl bg-white p-4 text-center text-xs text-[#68736C]">
                  Your cart is currently empty.
                </div>
              )}
            </div>

            <div className="mt-4 space-y-1.5 border-t border-[#E2E9E5] pt-3 text-xs tabular-nums">
              <div className="flex justify-between text-[#68736C]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#181C19]">{formatCurrency(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-[#68736C]">
                <span>Delivery</span>
                <span className="font-semibold text-[#181C19]">{formatCurrency(cartDelivery)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#181C19] pt-1">
                <span>Total</span>
                <span className="text-[#58AE52]">{formatCurrency(cartTotal)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenCart}
              className="mt-4 flex min-h-[42px] w-full items-center justify-center rounded-full bg-[#58AE52] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#489742] cursor-pointer"
            >
              Checkout · {formatCurrency(cartTotal)}
            </button>
          </motion.div>

          {/* Card 3: Notifications Screen Preview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="flex flex-col rounded-[2rem] bg-[#F7F9F8] p-5 shadow-md border border-white"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#68736C]">03 · Updates</span>
              <span className="font-display text-sm font-bold text-[#181C19]">Notification</span>
            </div>

            <div className="mt-3 space-y-3 flex-1">
              {primaryNotification && (
                <div className="rounded-2xl bg-white p-3.5 shadow-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FEF4E4] text-[#C87A19]">
                      <i className="ri-store-2-line text-base" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-[#181C19] truncate">
                          {primaryNotification.restaurant}
                        </p>
                        <span className="text-[11px] text-[#7D8881] shrink-0">
                          {primaryNotification.timestamp}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-[#515D56] leading-snug">
                        {primaryNotification.title}
                      </p>

                      {primaryNotification.status === 'declined' ? (
                        <p className="mt-2 text-[11px] font-semibold text-[#C24B40]">
                          Custom request declined
                        </p>
                      ) : (
                        <div className="mt-2.5 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onDeclineNotification(primaryNotification.id)}
                            className="rounded-full border border-[#D4DFD9] px-3 py-1 text-[11px] font-semibold text-[#5C6760] hover:bg-[#F5F7F6] cursor-pointer"
                          >
                            Decline
                          </button>
                          <button
                            type="button"
                            onClick={() => scrollToSection('tracking')}
                            className="rounded-full bg-[#58AE52] px-3 py-1 text-[11px] font-semibold text-white hover:bg-[#489742] cursor-pointer"
                          >
                            View Details
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="rounded-2xl bg-white p-3.5 shadow-xs">
                <div className="flex items-start gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF6ED] text-[#58AE52]">
                    <i className="ri-percent-line text-base" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-[#181C19]">Western Hot Grill</p>
                    <p className="mt-0.5 text-xs text-[#515D56] leading-snug">
                      Apply NEWYEAR30 for 30% off any order until Dec 31.
                    </p>
                    <button
                      type="button"
                      onClick={() => onApplyPromoFromShowcase('NEWYEAR30')}
                      className="mt-2 text-[11px] font-semibold text-[#58AE52] hover:underline cursor-pointer"
                    >
                      Apply NEWYEAR30
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenNotifications}
              className="mt-4 flex min-h-[42px] w-full items-center justify-center rounded-full border border-[#CFDAD4] bg-white px-4 py-2 text-xs font-semibold text-[#181C19] transition-colors hover:bg-[#F3F6F4] cursor-pointer"
            >
              View All Updates
            </button>
          </motion.div>

          {/* Card 4: Order Details Receipt Preview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="flex flex-col rounded-[2rem] bg-[#F7F9F8] p-5 shadow-md border border-white"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#68736C]">04 · Summary</span>
              <span className="font-display text-sm font-bold text-[#181C19]">Order Details</span>
            </div>

            <div className="mt-3 rounded-2xl bg-white p-3 shadow-xs">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-bold text-[#181C19]">{order.restaurant}</p>
                  <p className="tabular-nums text-[11px] text-[#68736C]">
                    Order ID: #{order.orderId}
                  </p>
                </div>
                <span className="tabular-nums text-[11px] text-[#68736C] text-right">
                  {order.placedAt}
                </span>
              </div>
              <div className="mt-2.5 flex items-center justify-between rounded-xl bg-[#58AE52] px-3 py-1.5 text-xs font-semibold text-white">
                <span>Arrival Time</span>
                <span className="tabular-nums">{order.arrivalMinutes} min</span>
              </div>
            </div>

            <div className="mt-3 space-y-2 flex-1">
              {order.items.slice(0, 3).map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-xs shadow-xs"
                >
                  <div className="min-w-0 pr-2">
                    <p className="truncate font-semibold text-[#181C19]">{item.name}</p>
                    <p className="truncate text-[11px] text-[#68736C]">{item.detail}</p>
                  </div>
                  <span className="tabular-nums font-bold text-[#181C19] shrink-0">
                    {formatCurrency(item.lineTotal)}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToSection('tracking')}
              className="mt-4 flex min-h-[42px] w-full items-center justify-center rounded-full border border-[#58AE52] bg-white px-4 py-2 text-xs font-semibold text-[#3D8B37] transition-colors hover:bg-[#EEF6ED] cursor-pointer"
            >
              Open Live Map Tracking
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
