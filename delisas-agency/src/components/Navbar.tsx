import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useSmoothScroll } from '../context/ScrollContext';

interface NavbarProps {
  cartCount: number;
  unreadNotifications: number;
  onOpenCart: () => void;
  onOpenNotifications: () => void;
}

const NAV_LINKS = [
  { id: 'menu', label: 'Menu' },
  { id: 'showcase', label: 'Showcase' },
  { id: 'tracking', label: 'Tracking' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({
  cartCount,
  unreadNotifications,
  onOpenCart,
  onOpenNotifications,
}: NavbarProps) {
  const { scrollToSection, scrollToTop, activeSection } = useSmoothScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#D2DDD7] bg-[#EBF0ED]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            scrollToTop();
          }}
          className="font-display text-lg font-bold tracking-tight text-[#181C19] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#58AE52] rounded-md"
        >
          Delisas Agency
        </a>

        {/* Zone 2: Clean single-line desktop nav links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#58AE52] rounded ${
                  isActive
                    ? 'text-[#181C19]'
                    : 'text-[#5A655E] hover:text-[#181C19]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-[#58AE52]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary action + mobile menu button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open shopping cart with ${cartCount} items`}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-[#58AE52] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#489742] active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#243026] cursor-pointer"
          >
            <i className="ri-shopping-bag-3-line text-base" aria-hidden="true" />
            <span>Cart</span>
            <span className="tabular-nums inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/20 px-1.5 text-xs font-bold">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex md:hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[#CED9D3] bg-white text-[#181C19] transition-colors hover:bg-[#F5F8F6] cursor-pointer"
          >
            <i
              className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-3-line'} text-xl`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-nav-drawer"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-[#D2DDD7] bg-white md:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.id);
                    }}
                    className={`flex min-h-[44px] items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#EEF6ED] text-[#3B8236]'
                        : 'text-[#181C19] hover:bg-[#F5F7F6]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <i className="ri-arrow-right-s-line text-lg text-[#68736C]" aria-hidden="true" />
                  </a>
                );
              })}

              <div className="pt-2 border-t border-[#EAEEEC]">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenNotifications();
                  }}
                  className="flex min-h-[44px] w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#181C19] hover:bg-[#F5F7F6] cursor-pointer"
                >
                  <span className="inline-flex items-center gap-2">
                    <i className="ri-notification-3-line text-base text-[#58AE52]" aria-hidden="true" />
                    <span>Notifications</span>
                  </span>
                  {unreadNotifications > 0 && (
                    <span className="tabular-nums rounded-full bg-[#58AE52] px-2 py-0.5 text-xs font-semibold text-white">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
