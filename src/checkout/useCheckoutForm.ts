import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  checkoutSchema,
  checkoutDefaults,
  digitsOnly,
  type CheckoutFormValues,
} from './schema';
import { totalsFor } from '@/lib/pricing';
import { useCartStore, selectCartSubtotal } from '@/store/cartStore';
import type { PlacedOrder } from '@/types/checkout';

/** Ordered, validated steps (confirmation is a separate terminal screen). */
export const CHECKOUT_STEPS = ['shipping', 'payment', 'review'] as const;
export type CheckoutStep = (typeof CHECKOUT_STEPS)[number];

function generateOrderNumber(): string {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `STD-${random}`;
}

/**
 * Owns everything stateful about checkout: the RHF form, which step is active,
 * per-step validation gating, and turning a valid form into a PlacedOrder.
 * Presentation components stay dumb and just render what this returns.
 */
export function useCheckoutForm() {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: checkoutDefaults,
    mode: 'onTouched',
  });

  const [stepIndex, setStepIndex] = useState(0);
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const [isPlacing, setIsPlacing] = useState(false);

  const subtotal = useCartStore(selectCartSubtotal);
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clear);

  const step: CheckoutStep = CHECKOUT_STEPS[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isReviewStep = step === 'review';

  /** Validate the current step's fields, then advance if they pass. */
  async function goNext() {
    if (step === 'shipping') {
      const ok = await form.trigger('shipping');
      if (!ok) return;
    } else if (step === 'payment') {
      const ok = await form.trigger('payment');
      if (!ok) return;
    }
    setStepIndex((index) => Math.min(index + 1, CHECKOUT_STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goBack() {
    setStepIndex((index) => Math.max(index - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /** Jump directly to a step (used by "Edit" links on the review step). */
  function goToStep(target: CheckoutStep) {
    setStepIndex(CHECKOUT_STEPS.indexOf(target));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Final submit — validates the entire schema via handleSubmit, simulates
   * processing, snapshots the cart into an order, then clears the cart.
   */
  const placeOrder = form.handleSubmit(async (values) => {
    setIsPlacing(true);
    // Simulate a payment round-trip so the button shows a real pending state.
    await new Promise((resolve) => setTimeout(resolve, 900));

    const { shipping, total } = totalsFor(subtotal);
    const placed: PlacedOrder = {
      orderNumber: generateOrderNumber(),
      placedAt: new Date().toISOString(),
      email: values.shipping.email,
      items,
      shippingAddress: values.shipping,
      cardLast4: digitsOnly(values.payment.cardNumber).slice(-4),
      subtotal,
      shipping,
      total,
    };

    setOrder(placed);
    clearCart();
    setIsPlacing(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  return {
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
  };
}
