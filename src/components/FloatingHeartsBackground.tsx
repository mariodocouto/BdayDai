import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface FloatingHeartItem {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const FloatingHeartsBackground: React.FC = () => {
  const hearts = useMemo<FloatingHeartItem[]>(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 96 + 2, // 2% to 98% horizontal
      size: Math.floor(Math.random() * 22) + 14, // 14px to 36px
      duration: Math.random() * 8 + 9, // 9s to 17s
      delay: Math.random() * 6,
      opacity: Math.random() * 0.25 + 0.12,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-rose-300"
          style={{
            left: `${h.x}%`,
            bottom: '-40px',
            opacity: h.opacity,
          }}
          animate={{
            y: [0, -1100],
            x: [0, Math.sin(h.id) * 45, 0],
            rotate: [0, h.id % 2 === 0 ? 30 : -30, 0],
            opacity: [0, h.opacity, h.opacity, 0],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: 'linear',
          }}
        >
          <Heart size={h.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};
