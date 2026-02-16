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
      style={{ paddingTop: `calc(var(--header-offset, ${Math.max(headerOffset ?? 88, 88)}px) + 2.5rem)` }}
      aria-label="Brand introduction"
    >
      <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden>
        <div className="hero-stage-glow hero-stage-glow-left" />
        <div className="hero-stage-glow hero-stage-glow-right" />
        <div className="hero-stage-glow hero-stage-glow-bottom" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 pb-24 md:grid-cols-[1.02fr_0.98fr] md:items-end md:gap-14 md:pb-28">
        <motion.div data-hero-copy className="relative z-10" {...reducedRevealProps}>
          <div data-hero-logo className="origin-left">
            <BrandLogo className="h-9 sm:h-14" />
          </div>

          <h1 data-hero-heading className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-[0.95] text-ink sm:text-6xl md:text-7xl">
            {section.headline}
          </h1>

          <p data-hero-body className="mt-8 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {section.body}
          </p>

          <div data-hero-actions className="mt-10 flex flex-wrap items-center gap-4">
            <button type="button" onClick={() => onPrimaryCta('shop')} className="premium-pill inline-flex items-center gap-2">
              Explore Collection <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href="https://wa.me/919354101493"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold text-ink transition hover:border-copper-soft hover:text-copper-soft"
            >
              <MessageCircle className="h-4 w-4" />
              Direct WhatsApp Concierge
            </a>
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
            className="showroom-panel hero-offer-panel relative overflow-hidden rounded-[2rem] border border-copper-soft/20 p-6 sm:p-8"
            {...reducedPanelRevealProps}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-48 overflow-hidden" aria-hidden>
              <img
                src={section.heroImage}
                alt="Premium Dessert Showroom"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-cream/90" />
            </div>

            <div className="relative z-10 pt-14">
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
      </div>
    </section>
  );
};
