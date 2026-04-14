import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

interface Props {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  duration = 2,
  className = '',
}: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      animate(count, target, { duration, ease: 'easeOut' });
    }
  }, [inView, target, duration, count]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
