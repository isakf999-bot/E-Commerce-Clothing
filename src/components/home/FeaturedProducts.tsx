import { Link } from 'react-router-dom';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductGridSkeleton } from '@/components/product/ProductGrid';
import { Reveal } from '@/components/ui/Reveal';
import { useSpotlightProducts } from '@/hooks/useSpotlightProducts';

/** "New in" rail — a curated selection pulled from the spotlight pool. */
export function FeaturedProducts() {
  const { data, isLoading } = useSpotlightProducts();
  const products = (data ?? []).slice(0, 8);

  return (
    <section className="mx-auto mt-24 max-w-[1400px] px-4 sm:px-6 lg:px-10">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="caps font-display text-2xl font-extrabold text-ink sm:text-3xl">
          New in
        </h2>
        <Link
          to="/women"
          className="caps text-[11px] font-medium text-ink underline-offset-4 hover:underline"
        >
          View all
        </Link>
      </div>

      {isLoading ? (
        <ProductGridSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={(index % 4) * 0.05}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
