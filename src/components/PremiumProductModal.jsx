import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const focusableSelector =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const toneClasses = {
  copper: 'from-copper-soft/28 via-brand-gold/34 to-brand-lemon/26',
  chocolate: 'from-brand-mocha/32 via-copper-glow/24 to-brand-gold/24',
  cream: 'from-brand-cream/58 via-brand-sky/24 to-brand-lemon/24',
};

export const PremiumProductModal = ({ product, onClose }) => {
  const reducedMotion = useReducedMotion();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [product]);

  const nextImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

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
            className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-copper-soft/25 bg-white/80 text-ink transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-soft"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="grid gap-6 sm:grid-cols-[0.8fr_1.2fr]">
            <div className="group relative aspect-square overflow-hidden rounded-3xl border border-copper-soft/25 bg-white sm:aspect-[0.9/1]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={product.images[currentImageIndex]}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <img
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    className="h-full w-full object-cover opacity-90"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${toneClasses[product.accentTone] || toneClasses.copper} mix-blend-multiply opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-cream-ice/95 via-cream-ice/20 to-transparent opacity-60" />
                </motion.div>
              </AnimatePresence>

              {product.images.length > 1 && (
                <>
                  <div className="absolute inset-x-0 bottom-4 z-20 flex justify-center gap-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 w-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-copper-soft w-4' : 'bg-copper-soft/40 hover:bg-copper-soft/60'
                          }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 text-ink shadow-sm transition hover:bg-white disabled:opacity-0"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 text-ink shadow-sm transition hover:bg-white disabled:opacity-0"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              <div className="absolute left-4 top-4 z-10">
                <p className="rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-copper-soft backdrop-blur-md">
                  {product.highlight || 'Atelier Pick'}
                </p>
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
