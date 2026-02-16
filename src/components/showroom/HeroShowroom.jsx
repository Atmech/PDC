import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useRef } from 'react';
import { getParallaxRange } from '../../lib/motion';
import { BrandLogo } from '../ui/BrandLogo';

export const HeroShowroom = ({ section, onPrimaryCta, totalProducts }) => {
  const heroRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], getParallaxRange(reducedMotion, 0, 90));
  const bgLayerY = useTransform(scrollYProgress, [0, 1], getParallaxRange(reducedMotion, 0, -55));
  const textOpacity = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [1, 0.45]);
  const pourY = useTransform(scrollYProgress, [0, 0.35, 1], reducedMotion ? [0, 0, 0] : [-12, 30, 96]);
  const pourOpacity = useTransform(scrollYProgress, [0, 0.7, 1], reducedMotion ? [0.88, 0.88, 0.88] : [0.94, 0.62, 0.34]);
  const pourSheenX = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [-24, 74]);
  const orbitOuterRotate = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, 52]);
  const orbitInnerRotate = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, -68]);
  const orbitFloatY = useTransform(scrollYProgress, [0, 0.5, 1], reducedMotion ? [0, 0, 0] : [0, -14, 8]);
  const orbitFloatX = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, 22]);
  const panelRotateZ = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [-0.6, 1.4]);
  const panelRotateX = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, 4.8]);

  return (
    <section
      ref={heroRef}
      id={section.id}
      className="relative isolate overflow-hidden pt-28 sm:pt-32"
      aria-label="Brand introduction"
    >
      <motion.div style={{ y: bgLayerY }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-copper-soft/26 blur-3xl" />
        <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-brand-gold/22 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-brand-mint/20 blur-3xl" />
      </motion.div>

      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 pb-24 md:grid-cols-[1.05fr_0.95fr] md:items-end md:pb-28">
        <motion.div style={{ y: headlineY, opacity: textOpacity }}>
          <BrandLogo className="mb-5 h-12 sm:h-14" />
          <h1 className="mt-3 max-w-4xl font-display text-5xl font-semibold leading-[0.95] text-ink sm:text-6xl md:text-7xl">
            {section.headline}
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">{section.body}</p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
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

        <div className="relative">
          <motion.div
            style={{ rotate: orbitOuterRotate, y: orbitFloatY }}
            className="pointer-events-none absolute -right-16 -top-14 -z-20 hidden h-[300px] w-[300px] lg:block"
            aria-hidden
          >
            <div className="absolute inset-0 rounded-[40%] border border-copper-soft/25" />
            <div className="absolute inset-9 rounded-[38%] border border-copper-soft/20 border-dashed" />
          </motion.div>

          <motion.div
            style={{ rotate: orbitInnerRotate, x: orbitFloatX, y: orbitFloatY }}
            className="pointer-events-none absolute -inset-8 -z-10 hidden xl:block"
            aria-hidden
          >
            <div className="ingredient-orbit-chip absolute left-0 top-14">Pure Butter</div>
            <div className="ingredient-orbit-chip absolute -right-3 top-20">Cocoa Mass</div>
            <div className="ingredient-orbit-chip absolute left-12 bottom-8">Vanilla Bean</div>
            <div className="ingredient-orbit-chip absolute right-16 bottom-2">Sea Salt</div>
          </motion.div>

          <motion.div
            style={{ rotate: orbitInnerRotate, y: orbitFloatY }}
            className="pointer-events-none absolute -left-20 top-16 -z-20 h-56 w-56 rounded-full bg-gradient-to-br from-brand-gold/30 via-copper-soft/20 to-brand-mint/30 blur-3xl"
            aria-hidden
          />
          <motion.div
            style={{ rotate: orbitOuterRotate, y: orbitFloatY }}
            className="pointer-events-none absolute -right-12 top-1/3 -z-20 h-52 w-52 rounded-full bg-gradient-to-br from-copper-soft/20 via-brand-gold/20 to-brand-mint/20 blur-3xl"
            aria-hidden
          />

          <motion.div
            style={{ rotateZ: panelRotateZ, rotateX: panelRotateX, transformPerspective: 950 }}
            initial={reducedMotion ? false : { opacity: 0, y: 35 }}
            whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="showroom-panel relative overflow-hidden rounded-[2rem] border border-copper-soft/20 p-6 sm:p-8"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-36 overflow-hidden" aria-hidden>
              <motion.div style={{ y: pourY, opacity: pourOpacity }} className="absolute inset-x-0 top-0 h-36">
                <div className="absolute inset-x-0 top-0 h-24 rounded-b-[2.1rem] bg-gradient-to-b from-[#4a2419] via-[#7a4a38] to-[#c69375]" />
                <div className="absolute -bottom-3 left-[12%] h-9 w-9 rounded-full bg-[#5c2d1f]/72 blur-[0.5px]" />
                <div className="absolute -bottom-4 left-[42%] h-11 w-11 rounded-full bg-[#6f3928]/70 blur-[0.5px]" />
                <div className="absolute -bottom-3 right-[14%] h-8 w-8 rounded-full bg-[#6b3725]/72 blur-[0.5px]" />
                <motion.div
                  style={{ x: pourSheenX }}
                  className="absolute left-8 top-3 h-10 w-24 rounded-full bg-white/25 blur-xl"
                />
              </motion.div>
            </div>

            <div className="relative z-10 pt-10">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-copper-soft/80">Current Offer Window</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">Up to 25% off with free Pune delivery</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                Crafted in small batches with pure butter and real couverture chocolate. No preservatives, no artificial
                additives, no palm-oil margarine.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-2xl border border-copper-soft/20 bg-white/55 p-4">
                  <p className="font-accent text-xl text-copper-soft">{totalProducts}</p>
                  <p className="mt-1 text-ink-muted">Offerings</p>
                </div>
                <div className="rounded-2xl border border-copper-soft/20 bg-white/55 p-4">
                  <p className="font-accent text-xl text-copper-soft">25%</p>
                  <p className="mt-1 text-ink-muted">Showroom Off</p>
                </div>
                <div className="rounded-2xl border border-copper-soft/20 bg-white/55 p-4">
                  <p className="font-accent text-xl text-copper-soft">0</p>
                  <p className="mt-1 text-ink-muted">Additives</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
