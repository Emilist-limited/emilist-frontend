interface IconProps {
  src: string;
  alt: string;
  className?: string;
}

export const Icon = ({ src, alt, className }: IconProps) => (
  <img
    src={src}
    alt={alt}
    className={`object-contain sm:w-6 sm:h-6 w-5 h-5 ml-3 ${className}`}
  />
);
