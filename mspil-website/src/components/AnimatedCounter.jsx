import React, { useEffect, useRef } from 'react';
import { motion, animate, useInView } from 'framer-motion';

const AnimatedCounter = ({ to, duration = 2, suffix = '', prefix = '', className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const countRef = useRef(null);

  useEffect(() => {
    if (isInView && countRef.current) {
      const node = countRef.current;
      const controls = animate(0, to, {
        duration: duration,
        onUpdate(value) {
          node.textContent = prefix + Math.round(value).toLocaleString() + suffix;
        }
      });
      return () => controls.stop();
    }
  }, [to, duration, isInView, prefix, suffix]);

  return (
    <motion.span ref={ref} className={className}>
      <span ref={countRef}>{prefix}0{suffix}</span>
    </motion.span>
  );
};

export default AnimatedCounter;