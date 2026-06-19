import { useState, useEffect, useRef } from 'react';

export function useCountUp(endValue: number, durationMs: number = 1500, trigger: boolean = true) {
  const [value, setValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) {
      setValue(0);
      startTimeRef.current = null;
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      
      const percent = Math.min(progress / durationMs, 1);
      // easeOutExpo
      const easeOut = percent === 1 ? 1 : 1 - Math.pow(2, -10 * percent);
      
      setValue(Math.floor(endValue * easeOut));
      
      if (progress < durationMs) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setValue(endValue);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [endValue, durationMs, trigger]);

  return value;
}
