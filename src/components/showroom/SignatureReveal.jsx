import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { getCardVariants } from '../../lib/motion';
import { ShowroomSection } from './ShowroomSection';



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
            className="group flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-copper-soft/20 bg-white shadow-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-soft"
          >
            <div className="relative h-64 w-full overflow-hidden sm:h-72">
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute left-4 top-4">
                <p className="inline-flex items-center gap-2 rounded-full border border-copper-soft/25 bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-ink-muted backdrop-blur-md">
                  <Sparkles className="h-3 w-3" />
                  {product.highlight || 'Signature'}
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-3xl leading-tight text-ink">{product.name}</h3>
              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-muted">{product.storyNote || product.description}</p>

              <div className="mt-auto pt-6 flex items-end justify-between border-t border-copper-soft/10">
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
                <span className="inline-flex items-center gap-2 rounded-full bg-copper-soft px-4 py-2 text-sm font-semibold text-white transition hover:bg-copper-dark">
                  View
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </ShowroomSection>
  );
};
