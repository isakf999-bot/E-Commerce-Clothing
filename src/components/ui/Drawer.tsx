import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Side = 'right' | 'left' | 'bottom';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: Side;
  /** Accessible label for the dialog. */
  label: string;
  children: ReactNode;
  className?: string;
}

const panelBySide: Record<Side, string> = {
  right: 'top-0 right-0 h-full w-full max-w-md',
  left: 'top-0 left-0 h-full w-full max-w-md',
  bottom: 'bottom-0 inset-x-0 max-h-[85vh] rounded-t-[var(--radius-lg)]',
};

const variantsBySide: Record<Side, Variants> = {
  right: { hidden: { x: '100%' }, visible: { x: 0 } },
  left: { hidden: { x: '-100%' }, visible: { x: 0 } },
  bottom: { hidden: { y: '100%' }, visible: { y: 0 } },
};

/**
 * Generic slide-in panel with backdrop, used for the cart, mobile nav and
 * mobile filters. Handles Escape-to-close, body scroll-lock and an accessible
 * dialog role. Motion is spring-eased for a soft, premium feel.
 */
export function Drawer({
  open,
  onClose,
  side = 'right',
  label,
  children,
  className,
}: DrawerProps) {
  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.button
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-ink/25 backdrop-blur-[1px]"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.2 }}
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className={cn(
              'absolute bg-surface shadow-[0_0_60px_-15px_rgba(0,0,0,0.25)] flex flex-col',
              panelBySide[side],
              className,
            )}
            variants={variantsBySide[side]}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
