import { motion, useReducedMotion } from 'framer-motion';



export const ProductCard = ({ product, onSelect, priority = false }) => {
  const reducedMotion = useReducedMotion();
  const discount = Math.round((1 - product.salePrice / product.price) * 100);

  return (
    <motion.button
      type="button"
      onClick={(event) => onSelect(product, event.currentTarget)}
      whileHover={reducedMotion ? undefined : { y: -6 }}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
      className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-copper-soft/20 bg-white shadow-premium-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-soft"
      aria-label={`View details for ${product.name}`}
    >
      <div className="relative h-64 w-full overflow-hidden sm:h-72">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          <span
            className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] shadow-sm backdrop-blur-md ${priority ? 'bg-copper-soft text-white' : 'bg-white/90 text-ink-muted'
              }`}
          >
            {priority ? 'Signature' : 'Atelier'}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-10 text-left md:p-14">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {product.highlight ? (
              <p className="text-[10px] uppercase tracking-[0.2em] text-copper-soft">{product.highlight}</p>
            ) : null}
            <h3 className="mt-2 font-display text-2xl leading-tight text-ink">{product.name}</h3>
          </div>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-ink-muted">{product.description}</p>

        <div className="mt-auto pt-6">
          <div className="flex items-center gap-2">
            {product.icons.map((icon, iconIndex) => (
              <span
                key={`${product.id}-icon-${iconIndex}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-copper-soft/20 bg-brand-cream/50 text-base"
                aria-hidden="true"
              >
                {icon}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-end justify-between border-t border-copper-soft/10 pt-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-muted">Price</p>
              <div className="flex items-baseline gap-2">
                <p className="font-accent text-3xl text-copper-soft">₹{product.salePrice}</p>
                {discount > 0 && <span className="text-sm text-ink-muted line-through">₹{product.price}</span>}
              </div>
            </div>
            {discount > 0 && (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                {discount}% OFF
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.button>
  );
};
