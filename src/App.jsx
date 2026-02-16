import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Instagram, MessageCircle } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { PremiumProductModal } from './components/PremiumProductModal';
import { CraftTimeline } from './components/showroom/CraftTimeline';
import { FooterShowroom } from './components/showroom/FooterShowroom';
import { HeroShowroom } from './components/showroom/HeroShowroom';
import { IngredientStrip } from './components/showroom/IngredientStrip';
import { ProductRail } from './components/showroom/ProductRail';
import { SignatureReveal } from './components/showroom/SignatureReveal';
import { BrandLogo } from './components/ui/BrandLogo';
import {
  craftsmanshipTimeline,
  ingredientNarrative,
  showroomSections,
  brandPromises,
  assuranceNotes,
} from './data/showroomData';
import { menuData } from './data/menuData';

const navLinks = [
  { id: 'hero', label: 'Showroom' },
  { id: 'craft', label: 'Craft' },
  { id: 'signature', label: 'Signature' },
  { id: 'shop', label: 'Shop' },
  { id: 'contact', label: 'Contact' },
];

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const lastTriggerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.12], [0.8, 1]);

  const allProducts = useMemo(
    () => [...menuData.brownies, ...menuData.whiteBrownies, ...menuData.cakes, ...menuData.tubs],
    []
  );

  const featuredProducts = useMemo(() => {
    const markedProducts = allProducts.filter((product) => product.isBestseller || product.isChefChoice);
    return (markedProducts.length ? markedProducts : allProducts).slice(0, 3);
  }, [allProducts]);

  const handlePrimaryCta = (targetId) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  const handleSelectProduct = (product, triggerElement) => {
    lastTriggerRef.current = triggerElement;
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    window.setTimeout(() => {
      if (lastTriggerRef.current instanceof HTMLElement) {
        lastTriggerRef.current.focus();
      }
    }, 0);
  };

  return (
    <div className="showroom-backdrop min-h-screen text-ink">
      <motion.div
        className="fixed left-0 right-0 top-0 z-[100] h-1 origin-left bg-gradient-to-r from-copper-soft via-brand-gold to-brand-chocolate"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.header
        style={{ opacity: headerOpacity }}
        className="fixed left-0 right-0 top-1 z-40 mx-auto w-[min(1120px,calc(100%-1.25rem))] rounded-2xl border border-copper-soft/20 bg-cream-ice/85 px-4 py-3 shadow-premium-sm backdrop-blur-xl"
      >
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => handlePrimaryCta('hero')}
            className="rounded-xl px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-soft"
            aria-label="Go to top"
          >
            <BrandLogo className="h-10 sm:h-11" />
          </button>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handlePrimaryCta(link.id)}
                className="rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted transition hover:bg-white hover:text-ink"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://instagram.com/punedessertcompany"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-copper-soft/25 bg-white/80 text-ink transition hover:text-copper-soft"
              aria-label="Visit Pune Dessert on Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/919354101493"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-copper-soft text-white transition hover:bg-copper-glow"
              aria-label="Order on WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.header>

      <main>
        <HeroShowroom section={showroomSections[0]} onPrimaryCta={handlePrimaryCta} totalProducts={allProducts.length} />
        <IngredientStrip promises={brandPromises} narrative={ingredientNarrative} />
        <CraftTimeline section={showroomSections[1]} timeline={craftsmanshipTimeline} onPrimaryCta={handlePrimaryCta} />
        <SignatureReveal
          section={showroomSections[2]}
          products={featuredProducts}
          onPrimaryCta={handlePrimaryCta}
          onProductSelect={handleSelectProduct}
        />
        <ProductRail
          products={menuData}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onProductSelect={handleSelectProduct}
          assurances={assuranceNotes}
        />
      </main>

      <FooterShowroom />

      <a
        href="https://wa.me/919354101493"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-copper-soft px-5 py-3 text-sm font-semibold text-white shadow-premium-lg transition hover:bg-copper-glow"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">Order Concierge</span>
      </a>

      <PremiumProductModal product={selectedProduct} onClose={handleCloseModal} />
    </div>
  );
}
