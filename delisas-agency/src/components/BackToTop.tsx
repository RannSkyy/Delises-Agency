import { AnimatePresence, motion } from 'motion/react';
import { useSmoothScroll } from '../context/ScrollContext';

export function BackToTop() {
  const { showBackToTop, scrollToTop } = useSmoothScroll();

  return (
    <AnimatePresence>
      {showBackToTop && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed right-5 bottom-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#243026] text-white shadow-lg transition-colors hover:bg-[#58AE52] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#58AE52] cursor-pointer"
        >
          <i className="ri-arrow-up-line text-xl" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
