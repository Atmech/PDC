import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ProductCard } from '../ProductCard';

const categoryMeta = [
  { id: 'all', label: 'All Atelier Picks' },
  { id: 'brownies', label: 'Brownies' },
  { id: 'whiteBrownies', label: 'White Brownies' },
  { id: 'cakes', label: 'Cakes & Rusks' },
  { id: 'tubs', label: 'Brownie Tubs' },
];

export const ProductRail = ({ products, activeCategory, onCategoryChange, onProductSelect, assurances = [] }) => {
  const reducedMotion = useReducedMotion();

  const visibleProducts =
    activeCategory === 'all'
      ? [...products.brownies, ...products.whiteBrownies, ...products.cakes, ...products.tubs]
      : products[activeCategory] || [];

  return (
    <section id="shop" className="relative py-24">
      <div className="mx-auto w-full max-w-6xl px-5">
        <div className="mb-8">
          <p className="font-sans text-xs uppercase tracking-[0.24em] text-copper-soft/80">Order Collection</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-ink md:text-6xl">Choose Your Atelier Box</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-muted md:text-base">
            Showroom prices reflect the latest menu drop. Tap any product card for full details, ingredients, and direct
            WhatsApp ordering.
          </p>
        </div>

        <div className="sticky top-16 z-30 mb-8 rounded-2xl border border-copper-soft/25 bg-cream-ice/90 p-3 backdrop-blur-xl">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categoryMeta.map((category) => {
              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onCategoryChange(category.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition ${
                    isActive
                      ? 'bg-copper-soft text-white shadow-premium-sm'
                      : 'bg-white/70 text-ink-muted hover:bg-white hover:text-ink'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -16 }}
            transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visibleProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={product.isBestseller || product.isChefChoice}
                onSelect={onProductSelect}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {assurances.length ? (
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {assurances.map((item) => (
              <p
                key={item}
                className="rounded-2xl border border-copper-soft/20 bg-white/65 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted"
              >
                {item}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};
