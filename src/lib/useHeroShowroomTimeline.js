import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroMotionSpec } from '../data/showroomData';

gsap.registerPlugin(ScrollTrigger);

const pickBeat = (beats, key, fallback) => {
  if (!beats || !beats[key]) return fallback;
  return beats[key];
};

export const useHeroShowroomTimeline = ({ rootRef, reducedMotion, headerOffset = 88, spec = heroMotionSpec }) => {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion || typeof window === 'undefined') return undefined;

    const effectiveHeaderOffset = Math.max(Number(headerOffset) || 88, 72);
    const breakpoint = spec?.breakpoint ?? 1024;
    const pinDistance = spec?.pinDistanceVh ?? 140;
    const beats = spec?.beats ?? {};
    const revealBeat = pickBeat(beats, 'reveal', { start: 0, end: 0.28 });
    const cinematicBeat = pickBeat(beats, 'cinematic', { start: 0.28, end: 0.72 });
    const settleBeat = pickBeat(beats, 'settle', { start: 0.72, end: 1 });

    const matchMedia = gsap.matchMedia();
    const context = gsap.context(() => {
      matchMedia.add(
        {
          desktop: `(min-width: ${breakpoint}px)`,
          compact: `(max-width: ${breakpoint - 0.02}px)`,
        },
        (conditions) => {
          const isDesktop = Boolean(conditions.conditions?.desktop);
          const select = gsap.utils.selector(root);

          const logo = select('[data-hero-logo]');
          const heading = select('[data-hero-heading]');
          const body = select('[data-hero-body]');
          const actions = select('[data-hero-actions]');
          const panel = select('[data-hero-panel]');
          const ribbon = select('[data-hero-ribbon]');
          const spotlight = select('[data-hero-spotlight]');
          const stats = select('[data-hero-stat]');
          const frame = select('[data-hero-frame]');

          gsap.set(panel, { transformOrigin: '50% 14%' });
          gsap.set(ribbon, { yPercent: -22, autoAlpha: 0.94 });
          gsap.set(spotlight, { xPercent: -28, autoAlpha: 0.22 });

          const timeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: root,
              start: () => `top top+=${effectiveHeaderOffset + 10}`,
              end: isDesktop ? `+=${pinDistance}vh` : '+=85%',
              scrub: true,
              pin: isDesktop,
              pinSpacing: true,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });

          timeline
            .fromTo(
              logo,
              { y: 18, autoAlpha: 0, scale: 0.96 },
              {
                y: 0,
                autoAlpha: 1,
                scale: 1,
                ease: 'power3.out',
                duration: revealBeat.end - revealBeat.start,
              },
              revealBeat.start
            )
            .fromTo(
              heading,
              { y: 28, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                ease: 'power3.out',
                duration: revealBeat.end - revealBeat.start,
              },
              revealBeat.start + 0.02
            )
            .fromTo(
              body,
              { y: 24, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                ease: 'power2.out',
                duration: revealBeat.end - revealBeat.start,
              },
              revealBeat.start + 0.05
            )
            .fromTo(
              actions,
              { y: 20, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                ease: 'power2.out',
                duration: revealBeat.end - revealBeat.start,
              },
              revealBeat.start + 0.07
            )
            .fromTo(
              panel,
              { rotateX: -4.8, rotateZ: -0.9, y: 28, autoAlpha: 0.82 },
              {
                rotateX: spec?.tilt?.peakX ?? 4.2,
                rotateZ: spec?.tilt?.peakZ ?? 0.8,
                y: 0,
                autoAlpha: 1,
                ease: 'power2.out',
                duration: (cinematicBeat.end - cinematicBeat.start) * 0.58,
              },
              cinematicBeat.start
            )
            .to(
              panel,
              {
                rotateX: 1.4,
                rotateZ: 0,
                ease: 'sine.out',
                duration: (cinematicBeat.end - cinematicBeat.start) * 0.42,
              },
              cinematicBeat.start + (cinematicBeat.end - cinematicBeat.start) * 0.58
            )
            .to(
              ribbon,
              {
                yPercent: spec?.ribbon?.travelYPercent ?? 8,
                autoAlpha: 0.72,
                ease: 'none',
                duration: cinematicBeat.end - cinematicBeat.start,
              },
              cinematicBeat.start
            )
            .to(
              spotlight,
              {
                xPercent: spec?.spotlightTravel ?? 58,
                autoAlpha: 0.5,
                ease: 'none',
                duration: (cinematicBeat.end - cinematicBeat.start) * 0.75,
              },
              cinematicBeat.start
            )
            .to(
              spotlight,
              {
                autoAlpha: 0.24,
                duration: (cinematicBeat.end - cinematicBeat.start) * 0.25,
              },
              cinematicBeat.start + (cinematicBeat.end - cinematicBeat.start) * 0.75
            )
            .to(
              frame,
              {
                rotate: 4,
                yPercent: 1.8,
                duration: cinematicBeat.end - cinematicBeat.start,
              },
              cinematicBeat.start
            )
            .to(
              panel,
              {
                rotateX: 0,
                rotateZ: 0,
                y: 0,
                duration: settleBeat.end - settleBeat.start,
                ease: 'sine.out',
              },
              settleBeat.start
            )
            .fromTo(
              stats,
              { y: 14, scale: 0.96, autoAlpha: 0.76 },
              {
                y: 0,
                scale: 1,
                autoAlpha: 1,
                stagger: 0.05,
                ease: 'power2.out',
                duration: (settleBeat.end - settleBeat.start) * 0.72,
              },
              settleBeat.start + 0.03
            );

          return () => {
            timeline.kill();
          };
        }
      );
    }, root);

    ScrollTrigger.refresh();

    return () => {
      matchMedia.revert();
      context.revert();
    };
  }, [rootRef, reducedMotion, headerOffset, spec]);
};
