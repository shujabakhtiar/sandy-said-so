"use client";

import React from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { cn } from "@/ui/lib/utils";

interface CardStackProps {
  cards: any[];
  onSwipe: (card: any) => void;
  renderCard: (card: any) => React.ReactNode;
  className?: string;
  isDimmedLights?: boolean;
}

export const CardStack = ({ cards, onSwipe, renderCard, className, isDimmedLights }: CardStackProps) => {
  // We reverse the cards because the first one should be on top in the UI
  // But we want to map them such that index 0 is top.
  // Actually, we'll slice and only show a few for performance and visual effect.
  const stackSize = 3;
  const visibleCards = cards.slice(0, stackSize);

  return (
    <div className={cn(
      "relative flex items-center justify-center",
      isDimmedLights ? "w-[450px] md:w-[550px] aspect-3/2" : "w-72 md:w-80 aspect-2/3",
      className
    )}>
      <AnimatePresence mode="popLayout">
        {visibleCards.map((item, index) => (
          <SwipeableCard
            key={item.index} // Use the stable deck index as key
            card={item}
            index={index}
            onSwipe={() => onSwipe(item)}
          >
            {renderCard(item)}
          </SwipeableCard>
        ))}
      </AnimatePresence>
      
      {cards.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-brand-brown/40 font-serif italic text-lg"
        >
          No more cards in this set.
        </motion.div>
      )}
    </div>
  );
};

interface SwipeableCardProps {
  card: any;
  index: number;
  onSwipe: () => void;
  children: React.ReactNode;
}

const SwipeableCard = ({ index, onSwipe, children }: SwipeableCardProps) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const controls = useAnimation();

  // Only the top card is draggable
  const isTop = index === 0;

  React.useEffect(() => {
    controls.start({ 
      scale: 1 - index * 0.05, 
      opacity: 1, 
      y: index * 12,
      transition: { duration: 0.3 }
    });
  }, [index, controls]);

  const handleDragEnd = async (_: any, info: any) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      await controls.start({ x: 1000, opacity: 0, rotate: 20, transition: { duration: 0.45 } });
      onSwipe();
    } else if (info.offset.x < -threshold) {
      await controls.start({ x: -1000, opacity: 0, rotate: -20, transition: { duration: 0.45 } });
      onSwipe();
    } else {
      controls.start({ x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } });
    }
  };

  const handleTap = async () => {
    if (!isTop) return;
    // Animate to the right with a cinematic curve on tap
    await controls.start({ 
      x: 1000, 
      opacity: 0, 
      rotate: 15, 
      transition: { duration: 0.5, ease: "easeOut" } 
    });
    onSwipe();
  };

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      onTap={handleTap}
      animate={controls}
      style={{
        x,
        rotate,
        opacity,
        zIndex: 50 - index,
      }}
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      exit={{ 
        x: x.get() >= 0 ? 1000 : -1000, 
        opacity: 0, 
        scale: 0.8,
        transition: { duration: 0.4 } 
      }}
      className={cn(
        "absolute inset-0 select-none",
        isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
      )}
    >
      {children}
    </motion.div>
  );
};
