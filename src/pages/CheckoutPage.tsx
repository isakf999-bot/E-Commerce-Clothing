import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { StateMessage } from '@/components/feedback/StateMessage';
import { BagIcon, ChevronLeftIcon, ArrowRightIcon } from '@/components/ui/icons';
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { ShippingStep } from '@/components/checkout/steps/ShippingStep';
import { PaymentStep } from '@/components/checkout/steps/PaymentStep';
import { ReviewStep } from '@/components/checkout/steps/ReviewStep';
import { ConfirmationStep } from '@/components/checkout/steps/ConfirmationStep';
import { useCheckoutForm } from '@/checkout/useCheckoutForm';
import { useCartStore } from '@/store/cartStore';

export function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const {
    form,
    step,
    stepIndex,
    isFirstStep,
    isReviewStep,
    goNext,
    goBack,
    goToStep,
    placeOrder,
    order,
    isPlacing,
  } = useCheckoutForm();

  // Terminal state — a completed order takes over the whole page.
  if (order) return <ConfirmationStep order={order} />;

  // Guard: no cart, nothing to check out (unless we just placed an order).
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <StateMessage
          title="Your cart is empty"
          description="Add a few pieces before heading to checkout."
          icon={<BagIcon width={26} height={26} />}
        />
      </div>
    );
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (isReviewStep) void placeOrder();
    else void goNext();
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-8 sm:px-6 lg:px-10">
      <div className="mb-10 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="caps font-display text-2xl font-extrabold text-ink sm:text-3xl">
            Checkout
          </h1>
          <Link
            to="/"
            className="caps text-[11px] font-medium text-ink-faint underline-offset-4 hover:text-ink hover:underline"
          >
            Cancel
          </Link>
        </div>
        <CheckoutStepper current={stepIndex} />
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* Form column */}
        <form onSubmit={handleSubmit} noValidate>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 'shipping' && <ShippingStep form={form} />}
              {step === 'payment' && <PaymentStep form={form} />}
              {step === 'review' && (
                <ReviewStep form={form} onEdit={goToStep} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between gap-4">
            {!isFirstStep ? (
              <button
                type="button"
                onClick={goBack}
                disabled={isPlacing}
                className="caps inline-flex items-center gap-1.5 text-xs font-medium text-ink-soft transition-colors hover:text-ink disabled:opacity-40"
              >
                <ChevronLeftIcon width={16} height={16} />
                Back
              </button>
            ) : (
              <span />
            )}

            <button
              type="submit"
              disabled={isPlacing}
              className="caps inline-flex h-12 min-w-44 items-center justify-center gap-2 border border-ink bg-ink px-8 text-xs font-medium text-surface transition-all duration-200 hover:bg-transparent hover:text-ink disabled:cursor-wait disabled:opacity-70"
            >
              {isReviewStep ? (
                isPlacing ? (
                  'Placing order…'
                ) : (
                  <>
                    Place order
                    <ArrowRightIcon width={16} height={16} />
                  </>
                )
              ) : (
                <>
                  Continue
                  <ArrowRightIcon width={16} height={16} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Summary column */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <OrderSummary items={items} />
        </aside>
      </div>
    </div>
  );
}
