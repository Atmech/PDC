import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useRef } from 'react';
import { heroMotionSpec } from '../../data/showroomData';
import { useHeroShowroomTimeline } from '../../lib/useHeroShowroomTimeline';
import { BrandLogo } from '../ui/BrandLogo';

export const HeroShowroom = ({ section, onPrimaryCta, totalProducts, headerOffset }) => {
  const heroRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useHeroShowroomTimeline({
    rootRef: heroRef,
    reducedMotion: Boolean(reducedMotion),
    headerOffset,
    spec: heroMotionSpec,
  });

  const reducedRevealProps = reducedMotion
    ? {
      initial: { opacity: 0, y: 18 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.35 },
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    }
    : {};


  return (
    <section
      ref={heroRef}
      id={section.id}
      className="hero-stage relative isolate overflow-hidden"
      style={{ paddingTop: `calc(var(--header-offset, ${Math.max(headerOffset ?? 88, 88)}px) + 5rem)` }}
      aria-label="Brand introduction"
    >
      <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden>
        <div className="hero-stage-glow hero-stage-glow-left" />
        <div className="hero-stage-glow hero-stage-glow-right" />
        <div className="hero-stage-glow hero-stage-glow-bottom" />
      </div>

      <div className="mx-auto flex w-full max-w-screen-2xl flex-col justify-center px-8 pb-32 pt-12 md:px-24 md:pb-40 lg:pt-20">
        <motion.div data-hero-copy className="relative z-10 max-w-4xl" {...reducedRevealProps}>


          <h1 data-hero-heading className="mt-8 font-display text-4xl font-semibold leading-[0.9] text-ink sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            {section.headline}
          </h1>

          <p data-hero-body className="mt-10 max-w-2xl text-base leading-loose text-ink-muted sm:text-lg md:text-xl">
            {section.body}
          </p>

          <div data-hero-actions className="mt-10 flex flex-wrap items-center gap-4">
            <button type="button" onClick={() => onPrimaryCta('shop')} className="premium-pill inline-flex items-center gap-2">
              Explore Collection <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>


      </div >
    </section >
  );
};
