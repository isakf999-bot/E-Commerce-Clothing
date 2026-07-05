import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/cn';

/**
 * Product image gallery: a large primary image with a thumbnail rail.
 * Selecting a thumbnail cross-fades the main image.
 *
 * Extension point: a zoom / lightbox would hook into the main image here.
 */
export function ImageGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const safeActive = Math.min(active, images.length - 1);

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 md:flex-col">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View image ${index + 1}`}
              className={cn(
                'h-16 w-14 flex-shrink-0 overflow-hidden bg-surface-muted transition-all md:h-20 md:w-16',
                index === safeActive
                  ? 'ring-1 ring-ink'
                  : 'opacity-60 hover:opacity-100',
              )}
            >
              <img
                src={image}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="relative aspect-[3/4] flex-1 overflow-hidden bg-surface-muted">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[safeActive]}
            src={images[safeActive]}
            alt={title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
