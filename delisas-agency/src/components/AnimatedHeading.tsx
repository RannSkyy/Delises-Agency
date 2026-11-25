import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedHeadingProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  immediate?: boolean;
}

export function AnimatedHeading({
  text,
  as: Tag = 'h2',
  className = '',
  immediate = false,
}: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLHeadingElement | null>(null);
  const words = text.split(' ');

  useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      return;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const wordSpans = el.querySelectorAll('.gsap-word-inner');
      if (wordSpans.length === 0) {
        return;
      }

      if (immediate) {
        gsap.fromTo(
          wordSpans,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.05,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          }
        );
      } else {
        gsap.fromTo(
          wordSpans,
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.055,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [text, immediate]);

  return (
    <Tag ref={containerRef} className={`text-balance ${className}`}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom mr-[0.26em] last:mr-0"
        >
          <span className="gsap-word-inner inline-block">{word}</span>
        </span>
      ))}
    </Tag>
  );
}
