import { Link } from 'react-router-dom';
import { Price } from '@/components/ui/Price';
import { formatDiscount } from '@/lib/format';
import type { Product } from '@/types/catalog';

/**
 * Image-forward product card. On hover the primary image cross-fades to the
 * second shot (when available) and lifts subtly — the only motion on the card,
 * keeping the grid calm. A single sale badge is the lone splash of accent.
 *
 * Extension point: a wishlist toggle would sit top-right of the media.
 */
export function ProductCard({ product }: { product: Product }) {
  const secondImage = product.images[1];

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block"
      aria-label={product.title}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-muted">
        {/* Primary image */}
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03] group-hover:opacity-0"
        />
        {/* Secondary image revealed on hover (falls back to a gentle zoom) */}
        {secondImage && (
          <img
            src={secondImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-[1.03] object-cover opacity-0 transition-opacity duration-700 ease-[var(--ease-out-soft)] group-hover:opacity-100"
          />
        )}

        {product.onSale && (
          <span className="caps absolute left-3 top-3 bg-surface px-2 py-1 text-[10px] font-semibold text-sale">
            {formatDiscount(product.discountPercentage)}
          </span>
        )}
      </div>

      <div className="pt-3">
        <p className="caps text-[10px] text-ink-faint">{product.brand}</p>
        <h3 className="mt-1 line-clamp-1 text-sm text-ink transition-colors group-hover:text-ink-soft">
          {product.title}
        </h3>
        <Price
          className="mt-1.5"
          price={product.price}
          compareAtPrice={product.compareAtPrice}
        />
      </div>
    </Link>
  );
}
