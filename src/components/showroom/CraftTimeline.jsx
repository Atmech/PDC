import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ShowroomSection } from './ShowroomSection';

export const CraftTimeline = ({ section, timeline, onPrimaryCta }) => {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  // We can use a simple sticky stack approach where each card acts as a sticky header.
  // This creates a natural "deck of cards" effect as you scroll down.

  return (
    <ShowroomSection section={section} onPrimaryCta={onPrimaryCta} className="py-32 md:py-48">
      <div ref={containerRef} className="relative mt-24 flex flex-col items-center gap-24 md:gap-32">
        {timeline.map((item, index) => (
          <StickyCard key={item.step} item={item} index={index} total={timeline.length} reducedMotion={reducedMotion} />
        ))}
      </div>
    </ShowroomSection>
  );
};

const StickyCard = ({ item, index, total, reducedMotion }) => {
  // Calculate a staggered top position so they stack nicely with a bit of the previous one visible
  const topOffset = 140 + index * 10;

  return (
    <motion.div
      className="sticky w-full max-w-4xl"
      style={{
        top: topOffset,
        marginBottom: index === total - 1 ? 0 : '20vh' // Spacing to allow scroll time between cards
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative overflow-hidden rounded-[2.5rem] border border-copper-soft/20 bg-cream-ice shadow-2xl">
        {/* Card Shine/Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-copper-soft/5 pointer-events-none" />

        <div className="relative grid gap-8 p-10 md:grid-cols-[0.3fr_1fr] md:p-14 md:gap-16 items-start">
          <div className="flex flex-col gap-2">
            <span className="inline-block rounded-full border border-copper-soft/30 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-copper-soft w-fit">
              Step {item.step}
            </span>
            {/* Decorative line */}
            <div className="h-px w-12 bg-copper-soft/30 mt-4 md:w-full" />
          </div>

          <div>
            <h3 className="font-display text-4xl leading-[1.1] text-ink md:text-5xl lg:text-6xl">
              {item.title}
            </h3>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted md:text-xl lg:max-w-xl">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
