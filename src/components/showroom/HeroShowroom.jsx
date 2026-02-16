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

  const reducedPanelRevealProps = reducedMotion
    ? {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.3 },
      transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
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

      <div className="mx-auto grid w-full max-w-screen-2xl gap-16 px-8 pb-32 md:grid-cols-[1.1fr_0.9fr] md:items-end md:gap-24 md:px-24 md:pb-40">
        <motion.div data-hero-copy className="relative z-10" {...reducedRevealProps}>


          <h1 data-hero-heading className="mt-8 max-w-3xl font-display text-4xl font-semibold leading-[0.9] text-ink sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            {section.headline}
          </h1>

          <p data-hero-body className="mt-10 max-w-lg text-base leading-loose text-ink-muted sm:text-lg md:text-xl">
            {section.body}
          </p>

          <div data-hero-actions className="mt-10 flex flex-wrap items-center gap-4">
            <button type="button" onClick={() => onPrimaryCta('shop')} className="premium-pill inline-flex items-center gap-2">
              Explore Collection <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        <div className="relative md:pl-4">
          <div data-hero-frame className="hero-orbit-shell pointer-events-none absolute -inset-6 -z-20 hidden lg:block" aria-hidden>
            <div className="hero-orbit-ring" />
            <div className="hero-orbit-ring hero-orbit-ring-inner" />
            <div className="hero-orbit-dot hero-orbit-dot-copper" />
            <div className="hero-orbit-dot hero-orbit-dot-gold" />
            <div className="hero-orbit-dot hero-orbit-dot-mint" />
          </div>

          <div
            data-hero-spotlight
            className="pointer-events-none absolute -right-8 top-16 -z-20 h-60 w-60 rounded-full bg-gradient-to-br from-brand-gold/30 via-copper-soft/24 to-brand-mint/22 blur-3xl"
            aria-hidden
          />

          <motion.article
            data-hero-panel
            className="showroom-panel hero-offer-panel relative flex flex-col overflow-hidden rounded-[2rem] border border-copper-soft/20 bg-brand-cream/40"
            {...reducedPanelRevealProps}
          >
            <div className="relative h-64 w-full shrink-0 overflow-hidden" aria-hidden>
              <img
                src={section.heroImage}
                alt="Premium Dessert Showroom"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="relative flex flex-1 flex-col p-6 sm:p-8">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-copper-soft/80">Current Offer Window</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">Up to 25% off with free Pune delivery</h2>

              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                Crafted in small batches with pure butter and real couverture chocolate. No preservatives, no artificial
                additives, no palm-oil margarine.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3 text-sm">
                <div data-hero-stat className="rounded-2xl border border-copper-soft/20 bg-white/55 p-4">
                  <p className="font-accent text-xl text-copper-soft">{totalProducts}</p>
                  <p className="mt-1 text-ink-muted">Offerings</p>
                </div>

                <div data-hero-stat className="rounded-2xl border border-copper-soft/20 bg-white/55 p-4">
                  <p className="font-accent text-xl text-copper-soft">25%</p>
                  <p className="mt-1 text-ink-muted">Showroom Off</p>
                </div>

                <div data-hero-stat className="rounded-2xl border border-copper-soft/20 bg-white/55 p-4">
                  <p className="font-accent text-xl text-copper-soft">0</p>
                  <p className="mt-1 text-ink-muted">Additives</p>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </div >
    </section >
  );
};
