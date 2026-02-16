import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

const focusableSelector =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export const PremiumProductModal = ({ product, onClose }) => {
  const reducedMotion = useReducedMotion();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!product) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusableElements = dialogRef.current.querySelectorAll(focusableSelector);
      if (!focusableElements.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const discount = Math.round((1 - product.salePrice / product.price) * 100);
  const whatsappMessage = encodeURIComponent(
    `Hi! I'd like to order:\n\n🍫 *${product.name}*\n📦 ${product.weight}\n💰 ₹${product.salePrice}\n\nPlease confirm availability!`
  );
  const whatsappLink = `https://wa.me/919354101493?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6">
        <motion.button
          type="button"
          aria-label="Close product details"
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.section
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={product.name}
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 44, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 36, scale: 0.99 }}
          transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="showroom-panel relative z-10 w-full max-w-2xl overflow-hidden rounded-t-[2rem] border border-copper-soft/30 bg-brand-cream p-6 shadow-premium-xl sm:rounded-[2rem] sm:p-8"
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-copper-soft/25 bg-white/80 text-ink transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-soft"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="grid gap-6 sm:grid-cols-[0.8fr_1.2fr]">
            <div className="relative overflow-hidden rounded-3xl border border-copper-soft/25 bg-gradient-to-br from-copper-soft/25 via-brand-gold/20 to-white p-6">
              <div className="absolute inset-0 showroom-noise opacity-70" />
              <div className="relative z-10">
                <p className="text-xs uppercase tracking-[0.2em] text-copper-soft/80">{product.highlight || 'Atelier Pick'}</p>
                <p className="mt-4 text-7xl">{product.icons[0] === '🍫' ? '🍪' : product.icons[0]}</p>
                <p className="mt-5 text-sm leading-relaxed text-ink-muted">{product.storyNote || product.description}</p>
              </div>
            </div>

            <div>
              <h3 className="pr-10 font-display text-4xl leading-tight text-ink">{product.name}</h3>
              {product.subtitle ? <p className="mt-2 text-xs uppercase tracking-[0.2em] text-copper-soft">{product.subtitle}</p> : null}

              <div className="mt-6 rounded-2xl border border-copper-soft/20 bg-white/70 p-4">
                <div className="flex items-center justify-between text-sm text-ink-muted">
                  <span>Original</span>
                  <span className="line-through">₹{product.price}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm text-emerald-700">
                  <span>Showroom Discount ({discount}%)</span>
                  <span>-₹{product.price - product.salePrice}</span>
                </div>
                <div className="mt-3 border-t border-copper-soft/20 pt-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">Final Price</p>
                  <p className="font-accent text-4xl text-copper-soft">₹{product.salePrice}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, index) => (
                  <span
                    key={`${product.id}-${ingredient}`}
                    className="inline-flex items-center gap-2 rounded-full border border-copper-soft/20 bg-white/75 px-3 py-1 text-xs font-semibold text-ink-muted"
                  >
                    {product.icons[index]}
                    {ingredient}
                  </span>
                ))}
              </div>

              {product.specialNote ? (
                <p className="mt-4 rounded-2xl border border-copper-soft/20 bg-white/65 px-4 py-3 text-xs leading-relaxed text-ink-muted">
                  {product.specialNote}
                </p>
              ) : null}

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="premium-pill mt-8 inline-flex w-full items-center justify-center gap-3"
              >
                <MessageCircle className="h-5 w-5" />
                Order on WhatsApp
              </a>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  );
};
