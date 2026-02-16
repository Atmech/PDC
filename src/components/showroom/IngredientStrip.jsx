import { motion, useReducedMotion } from 'framer-motion';
import { getCardVariants } from '../../lib/motion';

export const IngredientStrip = ({ promises, narrative }) => {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-16">
      <div className="mx-auto w-full max-w-screen-2xl px-8 md:px-24">
        <div className="mb-16 flex flex-wrap justify-center gap-4">
          {promises.map((promise, index) => (
            <motion.div
              key={promise}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={getCardVariants(reducedMotion, index)}
              className="rounded-full border border-copper-soft/25 bg-cream-ice/80 px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-ink-muted shadow-sm backdrop-blur-sm transition hover:border-copper-soft/50 hover:bg-white"
            >
              {promise}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative">
        <div
          className={`flex gap-8 px-8 md:justify-center md:gap-10 overflow-x-auto pb-8 md:overflow-visible md:pb-0 no-scrollbar`}
        >
          {narrative.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className="showroom-panel min-w-[300px] flex-1 max-w-sm rounded-[2rem] border border-copper-soft/20 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-4xl mb-6">{item.icon}</p>
              <h3 className="font-display text-2xl text-ink">{item.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
