import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { OrderSummary } from '../OrderSummary';
import { CheckIcon } from '@/components/ui/icons';
import type { PlacedOrder } from '@/types/checkout';

/** Step 4 — terminal confirmation screen with a fake order number. */
export function ConfirmationStep({ order }: { order: PlacedOrder }) {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-ink text-surface"
        >
          <CheckIcon width={30} height={30} />
        </motion.span>
        <h1 className="caps font-display text-3xl font-extrabold text-ink">
          Order confirmed
        </h1>
        <p className="mt-3 text-sm text-ink-soft">
          Thank you, {order.shippingAddress.firstName}. A confirmation has been
          sent to{' '}
          <span className="text-ink">{order.email}</span>.
        </p>
        <p className="caps mt-6 inline-block border border-line px-4 py-2 text-xs">
          Order number ·{' '}
          <span className="font-semibold tabular-nums">{order.orderNumber}</span>
        </p>
      </motion.div>

      <div className="mt-10">
        <OrderSummary items={order.items} title="What's on its way" />
      </div>

      <div className="mt-6 rounded-[var(--radius-md)] border border-line p-5">
        <h3 className="caps mb-2 text-[11px] font-semibold text-ink-faint">
          Shipping to
        </h3>
        <p className="text-sm text-ink">
          {order.shippingAddress.firstName} {order.shippingAddress.lastName}
        </p>
        <p className="text-sm text-ink-soft">
          {order.shippingAddress.address}
          {order.shippingAddress.apartment
            ? `, ${order.shippingAddress.apartment}`
            : ''}
          , {order.shippingAddress.city}, {order.shippingAddress.postalCode},{' '}
          {order.shippingAddress.country}
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <Link to="/">
          <Button size="lg">Continue shopping</Button>
        </Link>
      </div>
    </div>
  );
}
