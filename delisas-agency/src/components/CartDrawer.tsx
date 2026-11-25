import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { DishImage } from './DishImage';
import type { CartItem } from '../types/delisas';
import type { CartTotals } from '../utils/orderLogic';
import { formatCurrency } from '../utils/orderLogic';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  totals: CartTotals;
  promoInput: string;
  onClose: () => void;
  onUpdateQty: (cartKey: string, delta: number) => void;
  onRemoveItem: (cartKey: string) => void;
  onClearCart: () => void;
  onPromoInputChange: (val: string) => void;
  onApplyPromo: (code: string) => void;
  onCheckout: () => void;
  onBrowseMenu: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  totals,
  promoInput,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onPromoInputChange,
  onApplyPromo,
  onCheckout,
  onBrowseMenu,
}: CartDrawerProps) {
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setConfirmClear(false);
      return;
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyPromo(promoInput);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-drawer-title"
          className="fixed inset-0 z-50 flex justify-end"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#181C19]/45 backdrop-blur-xs"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            data-lenis-prevent
            className="relative z-10 flex h-full w-full max-w-md flex-col bg-[#F7F9F8] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E2E9E5] bg-white px-5 py-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close cart drawer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F7F6] text-[#181C19] hover:bg-[#E7EDE9] cursor-pointer"
                >
                  <i className="ri-arrow-left-line text-lg" aria-hidden="true" />
                </button>
                <h2 id="cart-drawer-title" className="font-display text-lg font-bold text-[#181C19]">
                  Cart
                </h2>
              </div>

              {items.length > 0 && (
                <div>
                  {confirmClear ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onClearCart();
                          setConfirmClear(false);
                        }}
                        className="rounded-full bg-[#D14B40] px-3 py-1.5 text-xs font-semibold text-white cursor-pointer"
                      >
                        Confirm Clear
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmClear(false)}
                        className="rounded-full border border-[#CFDAD4] px-3 py-1.5 text-xs font-semibold text-[#181C19] cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmClear(true)}
                      aria-label="Clear all items from cart"
                      className="flex h-10 w-10 items-center justify-center rounded-full text-[#68736C] hover:bg-[#FBEAE8] hover:text-[#D14B40] cursor-pointer"
                    >
                      <i className="ri-delete-bin-6-line text-lg" aria-hidden="true" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF6ED] text-[#58AE52]">
                    <i className="ri-shopping-bag-3-line text-3xl" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-[#181C19]">
                    Your cart is empty
                  </h3>
                  <p className="mt-1.5 max-w-xs text-sm text-[#647068]">
                    Add wood-fired pizzas, burgers, sushi, or drinks from our curated kitchens.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onBrowseMenu();
                    }}
                    className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#58AE52] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#489742] cursor-pointer"
                  >
                    <span>Browse Menu</span>
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.cartKey}
                        className="flex items-center gap-3.5 rounded-2xl bg-white p-3.5 shadow-xs border border-[#EAEFEA]"
                      >
                        <DishImage
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-xl object-cover shrink-0"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="truncate font-display text-sm font-bold text-[#181C19]">
                              {item.name}
                            </p>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.cartKey)}
                              aria-label={`Remove ${item.name}`}
                              className="text-[#8A968E] hover:text-[#D14B40] cursor-pointer"
                            >
                              <i className="ri-close-line text-base" aria-hidden="true" />
                            </button>
                          </div>
                          <p className="truncate text-xs text-[#68736C]">
                            {item.restaurant} · {item.sizeLabel}
                          </p>
                          {item.selectedIngredients.length > 0 && (
                            <p className="truncate text-[11px] text-[#58AE52]">
                              +{item.selectedIngredients.map((i) => i.name).join(', ')}
                            </p>
                          )}

                          <div className="mt-2 flex items-center justify-between">
                            <span className="tabular-nums text-sm font-bold text-[#181C19]">
                              {formatCurrency(item.unitPrice * item.quantity)}
                            </span>

                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.cartKey, -1)}
                                aria-label={`Decrease quantity of ${item.name}`}
                                className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#58AE52] text-white hover:bg-[#489742] cursor-pointer"
                              >
                                <i className="ri-subtract-line text-sm" aria-hidden="true" />
                              </button>
                              <span className="tabular-nums w-6 text-center text-xs font-bold text-[#181C19]">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQty(item.cartKey, 1)}
                                aria-label={`Increase quantity of ${item.name}`}
                                className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#58AE52] text-white hover:bg-[#489742] cursor-pointer"
                              >
                                <i className="ri-add-line text-sm" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Promo Code Input */}
                  <form onSubmit={handlePromoSubmit} className="rounded-2xl bg-white p-3.5 border border-[#EAEFEA]">
                    <label htmlFor="cart-promo-input" className="sr-only">
                      Promo code
                    </label>
                    <div className="flex items-center gap-2">
                      <i className="ri-percent-line text-lg text-[#58AE52] ml-1" aria-hidden="true" />
                      <input
                        id="cart-promo-input"
                        type="text"
                        value={promoInput}
                        onChange={(e) => onPromoInputChange(e.target.value)}
                        placeholder="Promo code (try NEWYEAR30)"
                        className="min-h-[40px] flex-1 bg-transparent text-sm text-[#181C19] placeholder:text-[#8A968E] focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="min-h-[38px] rounded-full bg-[#58AE52] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#489742] cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {totals.promoMessage && (
                      <p
                        role="status"
                        className={`mt-2 text-xs font-medium ${
                          totals.promoIsValid ? 'text-[#3D8B37]' : 'text-[#C53B30]'
                        }`}
                      >
                        {totals.promoMessage}
                      </p>
                    )}
                  </form>
                </>
              )}
            </div>

            {/* Footer Totals & Checkout */}
            {items.length > 0 && (
              <div className="border-t border-[#E2E9E5] bg-white p-5 space-y-4">
                <div className="space-y-2 text-sm tabular-nums">
                  <div className="flex justify-between text-[#68736C]">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#181C19]">
                      {formatCurrency(totals.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#68736C]">
                    <span>Delivery</span>
                    <span className="font-semibold text-[#181C19]">
                      {formatCurrency(totals.deliveryFee)}
                    </span>
                  </div>
                  {totals.discount > 0 && (
                    <div className="flex justify-between text-[#58AE52]">
                      <span>Discount ({totals.appliedCode})</span>
                      <span className="font-semibold">-{formatCurrency(totals.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-[#EFF3F0] pt-2.5 text-base font-bold text-[#181C19]">
                    <span>Total</span>
                    <span className="text-[#58AE52]">{formatCurrency(totals.total)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onCheckout}
                  className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-[#58AE52] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#489742] cursor-pointer"
                >
                  <span>Checkout</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{formatCurrency(totals.total)}</span>
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
