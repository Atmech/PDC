const easePremiumEnter = [0.16, 1, 0.3, 1];
const easePremiumFloat = [0.22, 1, 0.36, 1];

export const motionTokens = {
  easePremiumEnter,
  easePremiumFloat,
  durationFast: 0.35,
  durationMedium: 0.65,
  durationSlow: 1,
};

export const getRevealVariants = (reducedMotion, yOffset = 28) => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : yOffset,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.durationMedium,
      ease: motionTokens.easePremiumEnter,
    },
  },
});

export const getCardVariants = (reducedMotion, delayIndex = 0) => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 22,
    scale: reducedMotion ? 1 : 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: motionTokens.durationMedium,
      delay: reducedMotion ? 0 : delayIndex * 0.08,
      ease: motionTokens.easePremiumEnter,
    },
  },
});

export const getParallaxRange = (reducedMotion, from, to) => {
  if (reducedMotion) return [0, 0];
  return [from, to];
};
