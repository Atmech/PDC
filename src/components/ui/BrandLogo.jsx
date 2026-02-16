import logoDark from '../../assets/pune-dessert-logo-dark.png';
import logoCream from '../../assets/pune-dessert-logo-cream.png';

export const BrandLogo = ({ variant = 'dark', className = '', alt = 'Pune Dessert Company logo' }) => {
  const source = variant === 'light' ? logoCream : logoDark;

  return (
    <img
      src={source}
      alt={alt}
      className={`h-auto w-auto max-w-full object-contain ${className}`}
      draggable="false"
      decoding="async"
    />
  );
};
