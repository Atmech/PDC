import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { ShowroomSection } from './ShowroomSection';

export const CraftTimeline = ({ section, timeline, onPrimaryCta }) => {
  const reducedMotion = useReducedMotion();
  const desktopTimelineRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: desktopTimelineRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (reducedMotion) return;
    const currentIndex = Math.min(timeline.length - 1, Math.max(0, Math.floor(progress * timeline.length)));
    setActiveStep(currentIndex);
  });

  const timelineHeight = useMemo(() => `${Math.max(timeline.length, 3) * 62}vh`, [timeline.length]);

  return (
    <ShowroomSection section={section} onPrimaryCta={onPrimaryCta} className="py-24">
      <div ref={desktopTimelineRef} className="relative mt-12 hidden md:block" style={{ height: timelineHeight }}>
        <div className="sticky top-24 grid grid-cols-[0.8fr_1.2fr] gap-8">
          <ol className="space-y-4 pr-3">
            {timeline.map((item, index) => {
              const isActive = index === activeStep;
              return (
                <li key={item.step} className="relative rounded-2xl border border-copper-soft/20 bg-white/45 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-copper-soft/70">Step {item.step}</p>
                  <p className={`mt-2 font-display text-2xl transition-colors ${isActive ? 'text-ink' : 'text-ink-muted'}`}>
                    {item.title}
                  </p>
                </li>
              );
            })}
          </ol>

          <div className="showroom-panel relative min-h-[340px] overflow-hidden rounded-[2rem] border border-copper-soft/20 p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={timeline[activeStep].step}
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
                transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 p-8"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-copper-soft/75">{timeline[activeStep].step}</p>
                <h3 className="mt-4 font-display text-4xl leading-tight text-ink">{timeline[activeStep].title}</h3>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted">{timeline[activeStep].description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-4 md:hidden">
        {timeline.map((item, index) => (
          <motion.article
            key={item.step}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : index * 0.08 }}
            className="showroom-panel relative overflow-hidden rounded-3xl border border-copper-soft/20 p-6"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-copper-soft/75">Step {item.step}</p>
            <h3 className="mt-3 font-display text-3xl text-ink">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.description}</p>
          </motion.article>
        ))}
      </div>
    </ShowroomSection>
  );
};
