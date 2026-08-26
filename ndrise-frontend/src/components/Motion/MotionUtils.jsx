import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';

/**
 * Animated number counter component
 */
export function AnimatedNumber({ value, prefix = '', suffix = '', duration = 1.5, decimals = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();
  const numericValue = typeof value === 'number' ? value : parseFloat(value) || 0;
  const [displayValue, setDisplayValue] = useState(shouldReduceMotion ? numericValue : 0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(numericValue);
      return;
    }

    if (!isInView) return;

    let startTime = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Cubic ease-out
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = easeProgress * numericValue;
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(numericValue);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, numericValue, duration, shouldReduceMotion]);

  const formatted = decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue).toLocaleString();

  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}

/**
 * Page transition wrapper for smooth view switches
 */
export function PageTransition({ keyId, children, className = '' }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div key={keyId} className={className}>{children}</div>;
  }

  return (
    <motion.div
      key={keyId}
      initial={{ opacity: 0, y: 12, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.99 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Directional fade-in effect with optional scale
 */
export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.45,
  distance = 20,
  scale = 1,
  once = true,
  className = '',
  style = {},
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className} style={style} {...props}>{children}</div>;
  }

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
      case 'none': default: return {};
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale, ...getInitialPosition() }}
      whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      viewport={{ once }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger parent container for list items
 */
export function StaggerContainer({
  children,
  staggerChildren = 0.08,
  delayChildren = 0,
  once = true,
  className = '',
  style = {},
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className} style={style} {...props}>{children}</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger child item wrapper with smooth opacity, translateY, and scale
 */
export function StaggerItem({
  children,
  className = '',
  style = {},
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className} style={style} {...props}>{children}</div>;
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Accordion content expander for smooth FAQ answer reveals
 */
export function AccordionContent({ isOpen, children, className = '' }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return isOpen ? <div className={className}>{children}</div> : null;
  }

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: 'hidden' }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
