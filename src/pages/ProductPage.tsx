import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ImageGallery } from '@/components/product/ImageGallery';
import { SizeSelector } from '@/components/product/SizeSelector';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Price } from '@/components/ui/Price';
import { Skeleton } from '@/components/ui/Skeleton';
import { StateMessage } from '@/components/feedback/StateMessage';
import { CheckIcon, ChevronRightIcon, TruckIcon, ReturnIcon } from '@/components/ui/icons';
import { useProduct } from '@/hooks/useProduct';
import { useCartStore } from '@/store/cartStore';
import type { Size } from '@/types/catalog';

/** /product/:id — full product detail with add-to-cart. */
export function ProductPage() {
  const { id } = useParams();
  const productId = id ? Number(id) : undefined;

  const [size, setSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showSizeError, setShowSizeError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const { data: product, isLoading, isError, refetch } = useProduct(productId);
  const addItem = useCartStore((state) => state.addItem);

  if (id && Number.isNaN(Number(id))) return <Navigate to="/" replace />;

  if (isLoading) return <ProductSkeleton />;

  if (isError || !product) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <StateMessage
          title="Product unavailable"
          description="We couldn't load this product. It may have been removed."
          action={{ label: 'Retry', onClick: () => refetch() }}
        />
      </div>
    );
  }

  function handleAddToCart() {
    if (!size) {
      setShowSizeError(true);
      return;
    }
    addItem(product!, size, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-6 sm:px-6 lg:px-10">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="caps mb-6 flex items-center gap-1.5 text-[10px] text-ink-faint"
      >
        <Link to="/" className="hover:text-ink">
          Home
        </Link>
        <ChevronRightIcon width={12} height={12} />
        <span className="line-clamp-1 text-ink">{product.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <ImageGallery images={product.images} title={product.title} />

        {/* Details */}
        <div className="lg:sticky lg:top-28 lg:self-start lg:pt-2">
          <p className="caps text-[11px] text-ink-faint">{product.brand}</p>
          <h1 className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
            {product.title}
          </h1>
          <Price
            className="mt-4"
            size="lg"
            price={product.price}
            compareAtPrice={product.compareAtPrice}
          />

          <p className="mt-6 max-w-prose text-sm leading-relaxed text-ink-soft">
            {product.description}
          </p>

          <div className="mt-8">
            <SizeSelector
              sizes={product.sizes}
              value={size}
              onChange={(next) => {
                setSize(next);
                setShowSizeError(false);
              }}
              error={showSizeError}
            />
          </div>

          {/* Quantity + add to cart */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-stretch">
            <QuantityStepper quantity={quantity} onChange={setQuantity} />
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="caps relative h-11 flex-1 overflow-hidden border border-ink bg-ink text-xs font-medium text-surface transition-all duration-200 hover:bg-transparent hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-ink disabled:hover:text-surface"
            >
              <AnimatePresence mode="wait" initial={false}>
                {justAdded ? (
                  <motion.span
                    key="added"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center gap-2"
                  >
                    <CheckIcon width={16} height={16} /> Added to cart
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {product.inStock ? 'Add to cart' : 'Out of stock'}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Reassurance */}
          <ul className="mt-8 space-y-3 border-t border-line pt-6 text-sm text-ink-soft">
            <li className="flex items-center gap-3">
              <TruckIcon width={18} height={18} className="text-ink" />
              Free shipping over $75 · dispatched in 1–2 days
            </li>
            <li className="flex items-center gap-3">
              <ReturnIcon width={18} height={18} className="text-ink" />
              Free 30-day returns on unworn items
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-6 sm:px-6 lg:px-10">
      <Skeleton className="mb-6 h-3 w-40" />
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Skeleton className="aspect-[3/4] w-full" />
        <div className="space-y-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="mt-4 h-20 w-full" />
          <Skeleton className="mt-4 h-11 w-48" />
          <Skeleton className="h-11 w-full" />
        </div>
      </div>
    </div>
  );
}
