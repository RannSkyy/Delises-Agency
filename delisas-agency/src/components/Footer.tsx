import { useSmoothScroll } from '../context/ScrollContext';

interface FooterProps {
  onOpenCart: () => void;
  onOpenNotifications: () => void;
}

export function Footer({ onOpenCart, onOpenNotifications }: FooterProps) {
  const { scrollToSection, scrollToTop } = useSmoothScroll();

  return (
    <footer className="border-t border-[#D2DDD7] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="font-display text-lg font-bold text-[#181C19] hover:text-[#58AE52] transition-colors"
            >
              Delisas Agency
            </a>
            <p className="mt-1 text-xs text-[#68736C]">
              Fresh culinary delivery, custom ingredients, and real-time courier tracking across New York.
            </p>
          </div>

          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-5 text-sm">
            <a
              href="#menu"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('menu');
              }}
              className="text-[#515D56] hover:text-[#181C19] transition-colors"
            >
              Menu
            </a>
            <a
              href="#showcase"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('showcase');
              }}
              className="text-[#515D56] hover:text-[#181C19] transition-colors"
            >
              Showcase
            </a>
            <a
              href="#tracking"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('tracking');
              }}
              className="text-[#515D56] hover:text-[#181C19] transition-colors"
            >
              Tracking
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="text-[#515D56] hover:text-[#181C19] transition-colors"
            >
              Contact
            </a>
            <button
              type="button"
              onClick={onOpenCart}
              className="text-[#515D56] hover:text-[#181C19] transition-colors cursor-pointer"
            >
              Cart
            </button>
            <button
              type="button"
              onClick={onOpenNotifications}
              className="text-[#515D56] hover:text-[#181C19] transition-colors cursor-pointer"
            >
              Updates
            </button>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-[#EFF3F0] pt-6 text-xs text-[#68736C] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Delisas Agency. All rights reserved.</p>
          <p>Promo code NEWYEAR30 valid through Dec 31.</p>
        </div>
      </div>
    </footer>
  );
}
