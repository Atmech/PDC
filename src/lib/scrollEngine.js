import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenisInstance = null;
let rafId = null;

const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const raf = (time) => {
  if (!lenisInstance || typeof window === 'undefined') return;
  lenisInstance.raf(time);
  rafId = window.requestAnimationFrame(raf);
};

const resolveScrollTarget = (target) => {
  if (typeof target === 'number') return target;
  if (typeof target === 'string') return document.querySelector(target);
  if (typeof Element !== 'undefined' && target instanceof Element) return target;
  return null;
};

export const initLenis = () => {
  if (typeof window === 'undefined' || prefersReducedMotion()) return null;
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.1,
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 1.15,
    wheelMultiplier: 0.95,
    easing: easeOutQuint,
  });

  lenisInstance.on('scroll', ScrollTrigger.update);

  if (rafId == null) {
    rafId = window.requestAnimationFrame(raf);
  }

  return lenisInstance;
};

export const destroyLenis = () => {
  if (!lenisInstance) return;

  lenisInstance.off('scroll', ScrollTrigger.update);
  lenisInstance.destroy();
  lenisInstance = null;

  if (rafId != null && typeof window !== 'undefined') {
    window.cancelAnimationFrame(rafId);
    rafId = null;
  }
};

export const getLenis = () => lenisInstance;

export const scrollToTarget = (target, offset = 0, options = {}) => {
  if (typeof window === 'undefined') return;

  const resolvedTarget = resolveScrollTarget(target);
  if (resolvedTarget == null) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(resolvedTarget, {
      offset,
      duration: 1.15,
      easing: easeOutQuint,
      ...options,
    });
    return;
  }

  if (typeof resolvedTarget === 'number') {
    window.scrollTo({ top: resolvedTarget + offset, behavior: 'smooth' });
    return;
  }

  const top = resolvedTarget.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: 'smooth' });
};
