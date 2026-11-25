import { motion } from 'motion/react';
import { AnimatedHeading } from './AnimatedHeading';
import { DishImage } from './DishImage';
import { MENU_CATEGORIES } from '../data/menuData';
import type { CategoryId, MenuItem, SortOption } from '../types/delisas';
import { formatCurrency } from '../utils/orderLogic';

interface MenuSectionProps {
  items: MenuItem[];
  selectedCategory: CategoryId;
  searchQuery: string;
  sortBy: SortOption;
  favoriteIds: string[];
  onCategoryChange: (cat: CategoryId) => void;
  onSearchChange: (q: string) => void;
  onSortChange: (sort: SortOption) => void;
  onResetFilters: () => void;
  onOpenDish: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  onToggleFavorite: (itemId: string) => void;
}

export function MenuSection({
  items,
  selectedCategory,
  searchQuery,
  sortBy,
  favoriteIds,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onResetFilters,
  onOpenDish,
  onQuickAdd,
  onToggleFavorite,
}: MenuSectionProps) {
  return (
    <section id="menu" className="py-16 sm:py-20 bg-white/75 border-y border-[#D7E1DB]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header & Search/Sort Toolbar */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-[#58AE52]">Curated Kitchens</p>
            <AnimatedHeading
              text="Best Sellers & Daily Fresh Menu"
              className="mt-1 font-display text-3xl font-bold tracking-tight text-[#181C19] sm:text-4xl"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search Bar */}
            <div className="relative min-w-[240px] sm:w-72">
              <label htmlFor="menu-search" className="sr-only">
                Search dishes or restaurants
              </label>
              <i
                className="ri-search-line pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-base text-[#68736C]"
                aria-hidden="true"
              />
              <input
                id="menu-search"
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search dishes or kitchens..."
                className="min-h-[44px] w-full rounded-full border border-[#CFDAD4] bg-white pr-9 pl-10 text-sm text-[#181C19] placeholder:text-[#7D8881] focus:border-[#58AE52] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search query"
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full p-1 text-[#68736C] hover:text-[#181C19] cursor-pointer"
                >
                  <i className="ri-close-line text-base" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Sort Select Dropdown */}
            <div className="relative">
              <label htmlFor="menu-sort" className="sr-only">
                Sort dishes
              </label>
              <select
                id="menu-sort"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="min-h-[44px] w-full sm:w-auto appearance-none rounded-full border border-[#CFDAD4] bg-white py-2 pr-10 pl-4 text-sm font-medium text-[#181C19] focus:border-[#58AE52] focus:outline-none cursor-pointer"
              >
                <option value="featured">Sort: Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <i
                className="ri-arrow-down-s-line pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-lg text-[#68736C]"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Interactive Category Filter Buttons */}
        <div
          role="tablist"
          aria-label="Food categories"
          className="mt-8 flex flex-wrap items-center gap-2.5"
        >
          {MENU_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onCategoryChange(category.id)}
                className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#58AE52] text-white shadow-sm'
                    : 'border border-[#D5E0DA] bg-white text-[#3E4842] hover:border-[#58AE52]/50 hover:text-[#181C19]'
                }`}
              >
                <i className={`${category.iconClass} text-base`} aria-hidden="true" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dish Cards Grid or Empty State */}
        {items.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, idx) => {
              const isFavorite = favoriteIds.includes(item.id);
              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.4, delay: Math.min(idx * 0.06, 0.24) }}
                  whileHover={{ y: -4, transition: { duration: 0.18 } }}
                  className="group flex flex-col rounded-3xl border border-[#DCE4DF] bg-white p-5 shadow-xs transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#F4F7F5]">
                    <button
                      type="button"
                      onClick={() => onOpenDish(item)}
                      className="h-full w-full block text-left cursor-pointer"
                      aria-label={`Customize ${item.name}`}
                    >
                      <DishImage
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleFavorite(item.id)}
                      aria-label={
                        isFavorite
                          ? `Remove ${item.name} from favorites`
                          : `Save ${item.name} to favorites`
                      }
                      aria-pressed={isFavorite}
                      className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#181C19] shadow-sm backdrop-blur-xs transition-transform hover:scale-105 cursor-pointer"
                    >
                      <i
                        className={
                          isFavorite
                            ? 'ri-heart-fill text-lg text-[#E04F44]'
                            : 'ri-heart-line text-lg text-[#56615A]'
                        }
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  {/* Card Header & Unboxed Metadata */}
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#181C19]">
                        <button
                          type="button"
                          onClick={() => onOpenDish(item)}
                          className="text-left hover:text-[#58AE52] transition-colors cursor-pointer"
                        >
                          {item.name}
                        </button>
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-[#647068] tabular-nums">
                        <span>{item.restaurant}</span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-0.5 text-[#181C19] font-medium">
                          <i className="ri-star-fill text-[#58AE52]" aria-hidden="true" />
                          {item.rating.toFixed(1)} ({item.reviewCountLabel})
                        </span>
                      </div>
                    </div>

                    <p className="tabular-nums font-display text-lg font-bold text-[#181C19] shrink-0">
                      {formatCurrency(item.basePrice)}
                    </p>
                  </div>

                  <p className="mt-2.5 text-sm leading-relaxed text-[#5C6760] line-clamp-2">
                    {item.description}
                  </p>

                  {/* Footer Specs & Interactive Actions */}
                  <div className="mt-auto pt-5 flex items-center justify-between gap-3 border-t border-[#EFF3F0]">
                    <div className="flex items-center gap-3 text-xs text-[#647068] tabular-nums">
                      <span className="inline-flex items-center gap-1">
                        <i className="ri-fire-line text-[#E66A2C]" aria-hidden="true" />
                        {item.calories} kcal
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <i className="ri-time-line text-[#58AE52]" aria-hidden="true" />
                        {item.prepMinutes} min
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenDish(item)}
                        className="min-h-[40px] rounded-full border border-[#CFDAD4] px-3.5 py-1.5 text-xs font-semibold text-[#181C19] transition-colors hover:bg-[#F3F6F4] whitespace-nowrap cursor-pointer"
                      >
                        Customize
                      </button>
                      <button
                        type="button"
                        onClick={() => onQuickAdd(item)}
                        aria-label={`Quick add ${item.name} to cart`}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#58AE52] text-white transition-colors hover:bg-[#489742] active:scale-95 cursor-pointer"
                      >
                        <i className="ri-add-line text-lg" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-[#DCE4DF] bg-[#F8FAF9] px-6 py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF6ED] text-[#58AE52]">
              <i className="ri-search-eye-line text-2xl" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-[#181C19]">
              No matching dishes found
            </h3>
            <p className="mt-1.5 text-sm text-[#647068]">
              Try clearing your search term or switching back to all kitchens.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-5 inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#58AE52] px-5 py-2 text-sm font-semibold text-white hover:bg-[#489742] cursor-pointer"
            >
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
