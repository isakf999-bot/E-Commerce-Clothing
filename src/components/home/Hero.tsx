import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSpotlightProducts } from '@/hooks/useSpotlightProducts';
import { Skeleton } from '@/components/ui/Skeleton';
import { ArrowRightIcon } from '@/components/ui/icons';

/**
 * Editorial hero: a bold typographic statement paired with a single tall
 * product image. Copy is visible immediately on load (no reveal gating the
 * headline); the image enhances once data arrives.
 */
export function Hero() {
  const { data, isLoading } = useSpotlightProducts();
  const heroImage = data?.[0]?.images[0];

  return (
    <section className="mx-auto max-w-[1400px] px-4 pt-8 sm:px-6 lg:px-10 lg:pt-14">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Type */}
        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="caps mb-5 text-[11px] font-semibold text-ink-faint"
          >
            New Season · Essentials
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl font-extrabold leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            Modern
            <br />
            essentials.
            <br />
            <span className="text-ink-faint">Nothing extra.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-md text-base leading-relaxed text-ink-soft"
          >
            Considered wardrobe staples in a restrained palette — pieces made to
            be worn on repeat, season after season.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link
              to="/women"
              className="caps inline-flex h-14 items-center gap-2 border border-ink bg-ink px-8 text-xs font-medium text-surface transition-all duration-200 hover:bg-transparent hover:text-ink"
            >
              Shop Women
              <ArrowRightIcon width={16} height={16} />
            </Link>
            <Link
              to="/men"
              className="caps inline-flex h-14 items-center gap-2 border border-line-strong px-8 text-xs font-medium text-ink transition-all duration-200 hover:border-ink"
            >
              Shop Men
            </Link>
          </motion.div>
        </div>

        {/* Image */}
        <div className="order-1 lg:order-2">
          <div className="relative aspect-[4/5] overflow-hidden bg-surface-muted sm:aspect-[3/4] lg:aspect-[4/5]">
            {isLoading || !heroImage ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <motion.img
                src={heroImage}
                alt="Featured piece from the new season edit"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
