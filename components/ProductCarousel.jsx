import { useState } from 'react';

export default function ProductCarousel({
  images = [],
  productName,
  badge,
  imageClassName = 'aspect-[4/5]',
  onImageClick,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentImage = images[activeIndex] || images[0];

  if (!currentImage) return null;

  function showPrevious(event) {
    event.stopPropagation();
    setActiveIndex((index) => (index - 1 + images.length) % images.length);
  }

  function showNext(event) {
    event.stopPropagation();
    setActiveIndex((index) => (index + 1) % images.length);
  }

  return (
    <div className={`group/carousel relative overflow-hidden bg-[#f0ede6] ${imageClassName}`}>
      {onImageClick ? (
        <button
          type="button"
          onClick={onImageClick}
          className="absolute inset-0 h-full w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#78716c]"
          aria-label={`Ver detalles de ${productName}`}
        >
          <img
            key={currentImage.src}
            src={currentImage.src}
            alt={currentImage.alt || productName}
            loading="lazy"
            className="h-full w-full object-cover transition-opacity duration-300"
          />
        </button>
      ) : (
        <img
          key={currentImage.src}
          src={currentImage.src}
          alt={currentImage.alt || productName}
          className="h-full w-full object-cover"
        />
      )}

      {badge && (
        <span className="pointer-events-none absolute left-4 top-4 bg-[#fcfbf9]/90 px-3 py-2 text-[10px] uppercase tracking-widest text-[#57534e]">
          {badge}
        </span>
      )}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={showPrevious}
            aria-label={`Foto anterior de ${productName}`}
            className="absolute left-3 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center bg-[#fcfbf9]/90 text-lg text-[#1a1a1a] opacity-100 transition-opacity sm:opacity-0 sm:group-hover/carousel:opacity-100"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label={`Siguiente foto de ${productName}`}
            className="absolute right-3 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center bg-[#fcfbf9]/90 text-lg text-[#1a1a1a] opacity-100 transition-opacity sm:opacity-0 sm:group-hover/carousel:opacity-100"
          >
            ›
          </button>
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2" aria-label="Seleccionar foto">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveIndex(index);
                }}
                aria-label={`Mostrar foto ${index + 1} de ${productName}`}
                aria-current={activeIndex === index ? 'true' : undefined}
                className={`size-2.5 rounded-full border border-white shadow-sm ${
                  activeIndex === index ? 'bg-white' : 'bg-black/35'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
