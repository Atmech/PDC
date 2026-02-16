import { Instagram, MessageCircle } from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';

export const FooterShowroom = () => {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-copper-soft/25 bg-brand-ink py-16 text-cream-ice">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(225,117,68,0.24),transparent_36%),radial-gradient(circle_at_82%_88%,rgba(212,175,55,0.18),transparent_42%)]" />
      <div className="relative mx-auto w-full max-w-6xl px-5">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <BrandLogo variant="light" className="h-14 sm:h-16" />
            <p className="mt-3 text-xs uppercase tracking-[0.22em] text-brand-gold/85">Crafted Indulgence, Elevated Tradition</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight md:text-5xl">
              Premium bakes delivered with atelier-level attention.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-brand-mocha md:text-base">
              Orders open daily. Reach out on WhatsApp for current drop availability, custom gifting quantities, and
              same-day delivery slots.
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="https://wa.me/919354101493"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-copper-soft via-copper-glow to-brand-gold px-6 py-4 text-sm font-semibold text-white shadow-premium-sm transition hover:brightness-105"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Concierge: +91 93541 01493
            </a>
            <a
              href="https://instagram.com/punedessertcompany"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-brand-gold/40 bg-transparent px-6 py-4 text-sm font-semibold text-cream-ice transition hover:border-copper-soft hover:text-copper-glow"
            >
              <Instagram className="h-5 w-5" />
              Follow on Instagram
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-mocha/35 pt-6 text-xs uppercase tracking-[0.18em] text-brand-mocha">
          © {year} Pune Dessert Company • Crafted in Pune
        </div>
      </div>
    </footer>
  );
};
