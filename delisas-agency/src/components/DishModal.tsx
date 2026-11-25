import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { DishImage } from './DishImage';
import type { IngredientOption, MenuItem } from '../types/delisas';
import { calculateDishUnitPrice, formatCurrency } from '../utils/orderLogic';

interface DishModalProps {
  dish: MenuItem | null;
  isFavorite: boolean;
  onClose: () => void;
  onToggleFavorite: (dishId: string) => void;
  onAddToCart: (payload: {
    dish: MenuItem;
    sizeId: string;
    sizeLabel: string;
    selectedIngredients: IngredientOption[];
    quantity: number;
    unitPrice: number;
  }) => void;
}

export function DishModal({
  dish,
  isFavorite,
  onClose,
  onToggleFavorite,
  onAddToCart,
}: DishModalProps) {
  const [selectedSizeId, setSelectedSizeId] = useState<string>('');
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    if (!dish) {
      return;
    }
    const defaultSize = dish.sizes[1] || dish.sizes[0];
    setSelectedSizeId(defaultSize ? defaultSize.id : '');
    setSelectedIngredientIds([]);
    setQuantity(1);
    setCopiedShare(false);
  }, [dish]);

  useEffect(() => {
    if (!dish) {
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dish, onClose]);

  if (!dish) {
    return null;
  }

  const activeSize =
    dish.sizes.find((s) => s.id === selectedSizeId) ||
    dish.sizes[0] || { id: 'default', label: 'Standard', shortLabel: 'Standard', price: dish.basePrice };

  const activeIngredients = dish.ingredients.filter((ing) =>
    selectedIngredientIds.includes(ing.id)
  );

  const unitPrice = calculateDishUnitPrice(activeSize.price, activeIngredients);
  const totalLinePrice = unitPrice * quantity;

  const toggleIngredient = (id: string) => {
    setSelectedIngredientIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${dish.name} — ${dish.restaurant} on Delisas Agency`);
      }
    } catch {
      // Fallback visual confirmation even if clipboard permission is restricted
    }
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handleConfirmAdd = () => {
    onAddToCart({
      dish,
      sizeId: activeSize.id,
      sizeLabel: activeSize.label,
      selectedIngredients: activeIngredients,
      quantity,
      unitPrice,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#181C19]/50 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2 }}
          data-lenis-prevent
          className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[2rem] bg-[#F7F9F8] p-6 shadow-2xl border border-white"
        >
          {/* Top Modal Header */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dish details"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#181C19] shadow-xs hover:bg-[#EEF2EF] cursor-pointer"
            >
              <i className="ri-arrow-left-line text-lg" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleFavorite(dish.id)}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#181C19] shadow-xs hover:bg-[#EEF2EF] cursor-pointer"
              >
                <i
                  className={isFavorite ? 'ri-heart-fill text-lg text-[#E04F44]' : 'ri-heart-line text-lg'}
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share dish"
                className="flex h-10 items-center gap-1.5 rounded-full bg-white px-3 text-xs font-semibold text-[#181C19] shadow-xs hover:bg-[#EEF2EF] cursor-pointer"
              >
                <i className={copiedShare ? 'ri-check-line text-[#58AE52]' : 'ri-share-line text-base'} aria-hidden="true" />
                {copiedShare && <span>Copied</span>}
              </button>
            </div>
          </div>

          {/* Dish Photo */}
          <div className="mx-auto my-4 h-48 w-48 overflow-hidden rounded-full bg-white p-2 shadow-sm">
            <DishImage
              src={dish.image}
              alt={dish.name}
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          {/* Dish Title & Rating */}
          <div>
            <h2 id="dish-modal-title" className="font-display text-2xl font-bold text-[#181C19]">
              {dish.name}
            </h2>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#647068] tabular-nums">
              <span className="font-medium text-[#181C19]">{dish.restaurant}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 font-semibold text-[#181C19]">
                <i className="ri-star-fill text-[#58AE52]" aria-hidden="true" />
                {dish.rating.toFixed(1)} ({dish.reviewCountLabel})
              </span>
              <span aria-hidden="true">·</span>
              <span>{dish.prepMinutes} min</span>
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-[#515D56]">{dish.description}</p>
          </div>

          {/* Size Selector Radio Cards */}
          <div className="mt-5">
            <p className="text-sm font-bold text-[#181C19] mb-2.5">Choose Size</p>
            <div className="grid grid-cols-3 gap-2.5">
              {dish.sizes.map((size) => {
                const isSelected = activeSize.id === size.id;
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSelectedSizeId(size.id)}
                    aria-pressed={isSelected}
                    className={`rounded-2xl border p-3 text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#58AE52] bg-[#EEF6ED] shadow-xs'
                        : 'border-[#DCE4DF] bg-white hover:border-[#58AE52]/50'
                    }`}
                  >
                    <div
                      className={`mx-auto mb-2 flex h-4 w-4 items-center justify-center rounded-full border ${
                        isSelected ? 'border-[#58AE52]' : 'border-[#B6C2BB]'
                      }`}
                    >
                      {isSelected && <span className="h-2 w-2 rounded-full bg-[#58AE52]" />}
                    </div>
                    <p className="text-xs font-medium text-[#5C6760]">{size.label}</p>
                    <p className="mt-0.5 tabular-nums font-display text-sm font-bold text-[#181C19]">
                      {formatCurrency(size.price)}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add Ingredients Checkboxes */}
          <div className="mt-5">
            <p className="text-sm font-bold text-[#181C19] mb-2.5">Add Ingredients</p>
            <div className="space-y-2.5">
              {dish.ingredients.map((ing) => {
                const isChecked = selectedIngredientIds.includes(ing.id);
                return (
                  <button
                    key={ing.id}
                    type="button"
                    onClick={() => toggleIngredient(ing.id)}
                    aria-pressed={isChecked}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-colors cursor-pointer ${
                      isChecked
                        ? 'border-[#58AE52] bg-[#EEF6ED]/60'
                        : 'border-[#E2E9E5] bg-white hover:border-[#58AE52]/40'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#181C19]">{ing.name}</p>
                      <p className="tabular-nums text-xs text-[#647068]">
                        {ing.portion} · +{formatCurrency(ing.price)}
                      </p>
                    </div>
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-lg border transition-colors ${
                        isChecked
                          ? 'border-[#58AE52] bg-[#58AE52] text-white'
                          : 'border-[#C7D4CD] bg-white text-transparent'
                      }`}
                    >
                      <i className="ri-check-line text-sm" aria-hidden="true" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sticky Bottom Quantity & Add to Cart */}
          <div className="mt-6 flex items-center gap-3 pt-4 border-t border-[#E2E9E5]">
            <div className="flex items-center gap-2 rounded-full border border-[#D4DFD9] bg-white px-2 py-1.5">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#181C19] hover:bg-[#F3F6F4] cursor-pointer"
              >
                <i className="ri-subtract-line text-base" aria-hidden="true" />
              </button>
              <span className="tabular-nums w-5 text-center text-sm font-bold text-[#181C19]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#58AE52] hover:bg-[#EEF6ED] cursor-pointer"
              >
                <i className="ri-add-line text-base" aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleConfirmAdd}
              className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-[#58AE52] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#489742] cursor-pointer"
            >
              <span>Add to Cart</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{formatCurrency(totalLinePrice)}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
