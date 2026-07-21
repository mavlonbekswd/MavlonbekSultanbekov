/**
 * @param {{
 *   image: {
 *     src: string;
 *     srcSet?: string;
 *     fallback?: string;
 *     alt: string;
 *     width: number;
 *     height: number;
 *   };
 *   className?: string;
 *   loading?: 'lazy' | 'eager';
 *   sizes?: string;
 * }} props
 */
const ProjectImage = ({
  image,
  className = '',
  loading = 'lazy',
  sizes = '(max-width: 720px) 100vw, 50vw',
}) => {
  const imageElement = (
    <img
      src={image.fallback || image.src}
      srcSet={image.fallback ? undefined : image.srcSet}
      sizes={image.srcSet ? sizes : undefined}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={loading}
      decoding="async"
      className={className}
    />
  );

  if (!image.fallback || !image.srcSet) {
    return imageElement;
  }

  return (
    <picture>
      <source srcSet={image.srcSet} sizes={sizes} type="image/webp" />
      {imageElement}
    </picture>
  );
};

export default ProjectImage;
