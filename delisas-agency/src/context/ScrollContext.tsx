import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollContextValue {
  scrollToSection: (sectionId: string) => void;
  scrollToTop: () => void;
  activeSection: string;
  showBackToTop: boolean;
}

const ScrollContext = createContext<ScrollContextValue>({
  scrollToSection: () => {},
  scrollToTop: () => {},
  activeSection: 'home',
  showBackToTop: false,
});

const TRACKED_SECTIONS = ['home', 'menu', 'showcase', 'tracking', 'contact'];

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.01 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    const handleScrollUpdate = () => {
      ScrollTrigger.update();
      const scrollY = window.scrollY || lenis.scroll;
      setShowBackToTop(scrollY > 360);

      const viewportAnchor = scrollY + 180;
      let current = 'home';
      for (const id of TRACKED_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= viewportAnchor) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    lenis.on('scroll', handleScrollUpdate);
    window.addEventListener('scroll', handleScrollUpdate, { passive: true });

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    handleScrollUpdate();

    return () => {
      window.removeEventListener('scroll', handleScrollUpdate);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const cleanId = sectionId.replace(/^#/, '');
    const target = document.getElementById(cleanId);
    if (!target) {
      return;
    }

    setActiveSection(cleanId);

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: -76,
        duration: 1.1,
      });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    setActiveSection('home');
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.1 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <ScrollContext.Provider
      value={{ scrollToSection, scrollToTop, activeSection, showBackToTop }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  return useContext(ScrollContext);
}
