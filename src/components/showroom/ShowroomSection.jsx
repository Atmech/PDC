import { motion, useReducedMotion } from 'framer-motion';
import { getRevealVariants } from '../../lib/motion';

export const ShowroomSection = ({ section, onPrimaryCta, className = '', children }) => {
  const reducedMotion = useReducedMotion();

  return (
    <section id={section.id} className={`relative ${className}`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={getRevealVariants(reducedMotion)}
        className="mx-auto w-full max-w-6xl px-5"
      >
        <p className="font-sans text-xs uppercase tracking-[0.24em] text-copper-soft/80">{section.eyebrow}</p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-ink md:text-6xl">
          {section.headline}
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">{section.body}</p>

        {section.ctaLabel && section.ctaTarget && onPrimaryCta ? (
          <button
            type="button"
            onClick={() => onPrimaryCta(section.ctaTarget)}
            className="premium-pill mt-8"
          >
            {section.ctaLabel}
          </button>
        ) : null}
      </motion.div>
      {children}
    </section>
  );
};
