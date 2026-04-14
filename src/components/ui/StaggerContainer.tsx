import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import React, { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  stagger?: number;
  className?: string;
  once?: boolean;
}

export default function StaggerContainer({
  children,
  stagger = 0.1,
  className = '',
  once = true,
}: Props) {
  const { ref, inView } = useInView({ triggerOnce: once, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
  key?: React.Key;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
