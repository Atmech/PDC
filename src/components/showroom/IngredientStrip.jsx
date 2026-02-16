import { motion, useReducedMotion } from 'framer-motion';
import { getCardVariants } from '../../lib/motion';

export const IngredientStrip = ({ promises, narrative }) => {
  const reducedMotion = useReducedMotion();
  const trackItems = [...narrative, ...narrative];

  return (
    <section className="relative overflow-hidden py-16">
      <div className="mx-auto w-full max-w-6xl px-5">
        <div className="mb-8 flex flex-wrap gap-3">
          {promises.map((promise, index) => (
            <motion.div
              key={promise}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={getCardVariants(reducedMotion, index)}
              className="rounded-full border border-copper-soft/25 bg-cream-ice/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-ink-muted"
            >
              {promise}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative">
        <div
          className={`marquee-track flex gap-4 px-5 ${reducedMotion ? 'flex-wrap justify-center md:flex-nowrap md:justify-start' : ''}`}
          style={reducedMotion ? { animation: 'none', transform: 'none' } : undefined}
        >
          {trackItems.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className="showroom-panel min-w-[260px] max-w-xs rounded-3xl border border-copper-soft/20 p-5"
            >
              <p className="text-2xl">{item.icon}</p>
              <h3 className="mt-4 font-display text-2xl text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
