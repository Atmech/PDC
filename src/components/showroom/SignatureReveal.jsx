import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { getCardVariants } from '../../lib/motion';
import { ShowroomSection } from './ShowroomSection';

const toneMap = {
  copper: 'from-copper-soft/30 via-brand-gold/30 to-brand-lemon/24',
  chocolate: 'from-brand-mocha/32 via-copper-glow/24 to-brand-gold/24',
  cream: 'from-brand-cream/52 via-brand-sky/25 to-brand-lemon/22',
};

export const SignatureReveal = ({ section, products, onPrimaryCta, onProductSelect }) => {
  const reducedMotion = useReducedMotion();

  return (
    <ShowroomSection section={section} onPrimaryCta={onPrimaryCta} className="py-24">
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <motion.button
            key={product.id}
            type="button"
            onClick={(event) => onProductSelect(product, event.currentTarget)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={getCardVariants(reducedMotion, index)}
            whileHover={reducedMotion ? undefined : { y: -8 }}
            className="group showroom-panel relative overflow-hidden rounded-[1.8rem] border border-copper-soft/20 p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-soft"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${toneMap[product.accentTone] || toneMap.copper}`} />
            <div className="absolute inset-0 showroom-noise opacity-60" />
            <div className="relative z-10">
              <p className="inline-flex items-center gap-2 rounded-full border border-copper-soft/25 bg-white/65 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                <Sparkles className="h-3 w-3" />
                {product.highlight || 'Signature'}
              </p>
              <h3 className="mt-5 font-display text-3xl leading-tight text-ink">{product.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{product.storyNote || product.description}</p>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-ink-muted/80">Showroom Price</p>
                  <p className="font-accent text-3xl text-copper-soft">₹{product.salePrice}</p>
                  <p className="text-xs text-ink-muted">
                    <span className="line-through">₹{product.price}</span> •
                    <span className="ml-1 font-semibold text-emerald-700">
                      {Math.round((1 - product.salePrice / product.price) * 100)}% off
                    </span>
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
                  View
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </ShowroomSection>
  );
};
