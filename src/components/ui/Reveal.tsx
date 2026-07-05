import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Stagger index for sequenced reveals. */
  delay?: number;
  className?: string;
}

/**
 * Subtle fade-and-rise on scroll into view. Uses `whileInView` with a small
 * offset so content is only briefly translated — critical content remains
 * visible immediately even if animation is skipped, and honours reduced-motion
 * via Framer Motion's built-in handling.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
