import { motion, useReducedMotion } from 'framer-motion';

const toneClasses = {
  copper: 'from-copper-soft/28 via-brand-gold/34 to-brand-lemon/26',
  chocolate: 'from-brand-mocha/32 via-copper-glow/24 to-brand-gold/24',
  cream: 'from-brand-cream/58 via-brand-sky/24 to-brand-lemon/24',
};

export const ProductCard = ({ product, onSelect, priority = false }) => {
  const reducedMotion = useReducedMotion();
  const discount = Math.round((1 - product.salePrice / product.price) * 100);

  return (
    <motion.button
      type="button"
      onClick={(event) => onSelect(product, event.currentTarget)}
      whileHover={reducedMotion ? undefined : { y: -6 }}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
      className="group relative overflow-hidden rounded-[1.6rem] border border-copper-soft/20 bg-white/70 p-5 text-left shadow-premium-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-soft"
      aria-label={`View details for ${product.name}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${toneClasses[product.accentTone] || toneClasses.copper}`} />
      <div className="absolute inset-0 showroom-noise opacity-65" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div>
            {product.highlight ? (
              <p className="text-[10px] uppercase tracking-[0.2em] text-copper-soft/80">{product.highlight}</p>
            ) : null}
            <h3 className="mt-2 font-display text-2xl leading-tight text-ink">{product.name}</h3>
            {product.subtitle ? <p className="mt-2 text-xs uppercase tracking-[0.18em] text-copper-soft">{product.subtitle}</p> : null}
          </div>
          <span className="rounded-full border border-copper-soft/25 bg-white/80 px-3 py-1 text-xs font-semibold text-ink-muted">
            {product.weight}
          </span>
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-muted">{product.description}</p>

        <div className="mt-5 flex items-center gap-2">
          {product.icons.map((icon, iconIndex) => (
            <span
              key={`${product.id}-icon-${iconIndex}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-copper-soft/20 bg-white/75"
              aria-hidden="true"
            >
              {icon}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="font-accent text-3xl text-copper-soft">₹{product.salePrice}</p>
            <p className="text-sm text-ink-muted">
              <span className="line-through">₹{product.price}</span> <span className="ml-2 font-semibold text-emerald-700">{discount}% off</span>
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
              priority
                ? 'bg-copper-soft text-white'
                : 'border border-copper-soft/30 bg-white/80 text-ink-muted'
            }`}
          >
            {priority ? 'Signature' : 'Atelier'}
          </span>
        </div>
      </div>
    </motion.button>
  );
};
