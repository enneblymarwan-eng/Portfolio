"use client";

import React, { useEffect } from "react";
import { cn } from "./utils";
import { motion, useSpring, useMotionValue } from "motion/react";

export const LightRays = ({
  className,
}: {
  className?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      
      mouseX.set(x * 60);
      mouseY.set(y * 30);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      className={cn(
        "absolute -inset-20 md:-inset-32 pointer-events-none rounded-[inherit] overflow-hidden mix-blend-screen",
        className
      )}
      style={{
        maskImage: "linear-gradient(to bottom, black 10%, transparent 90%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 10%, transparent 90%)",
        opacity: 0.6 // master opacity control for subtlety
      }}
    >
      <motion.div
        className="absolute inset-x-0 top-0 w-full h-full origin-top"
        style={{
          x: springX,
          y: springY,
        }}
      >
        {/* Core circular glow */}
        <div className="absolute left-1/2 top-[-10%] w-[400px] h-[400px] -translate-x-1/2 bg-white/10 rounded-full" style={{ filter: "blur(60px)" }} />
        <div className="absolute left-1/2 top-[-5%] w-[200px] h-[200px] -translate-x-1/2 bg-white/20 rounded-full" style={{ filter: "blur(40px)" }} />

        {/* Wide spread */}
        <div 
          className="absolute left-1/2 top-[-5%] h-[120%] bg-gradient-to-b from-white/5 to-transparent origin-top"
          style={{ width: '800px', transform: 'translateX(-50%) rotate(0deg)', clipPath: 'polygon(50% 0, 0% 100%, 100% 100%)', filter: "blur(50px)" }}
        />

        {/* Broad angled beams */}
        <div 
          className="absolute left-1/2 top-[-5%] h-[120%] bg-gradient-to-b from-white/10 to-transparent origin-top"
          style={{ width: '400px', transform: 'translateX(-50%) rotate(-30deg)', clipPath: 'polygon(50% 0, 10% 100%, 90% 100%)', filter: "blur(40px)" }}
        />
        <div 
          className="absolute left-1/2 top-[-5%] h-[120%] bg-gradient-to-b from-white/10 to-transparent origin-top"
          style={{ width: '400px', transform: 'translateX(-50%) rotate(30deg)', clipPath: 'polygon(50% 0, 10% 100%, 90% 100%)', filter: "blur(40px)" }}
        />

        {/* Mid-sized structural beams */}
        <div 
          className="absolute left-1/2 top-[-5%] h-[110%] bg-gradient-to-b from-white/15 to-transparent origin-top"
          style={{ width: '300px', transform: 'translateX(-50%) rotate(-15deg)', clipPath: 'polygon(50% 0, 20% 100%, 80% 100%)', filter: "blur(30px)" }}
        />
        <div 
          className="absolute left-1/2 top-[-5%] h-[110%] bg-gradient-to-b from-white/15 to-transparent origin-top"
          style={{ width: '300px', transform: 'translateX(-50%) rotate(15deg)', clipPath: 'polygon(50% 0, 20% 100%, 80% 100%)', filter: "blur(30px)" }}
        />

        {/* Sharper central pillars */}
        <div 
          className="absolute left-1/2 top-[-5%] h-[100%] bg-gradient-to-b from-white/20 to-transparent origin-top"
          style={{ width: '200px', transform: 'translateX(-50%) rotate(0deg)', clipPath: 'polygon(50% 0, 30% 100%, 70% 100%)', filter: "blur(20px)" }}
        />
        <div 
          className="absolute left-1/2 top-[-5%] h-[100%] bg-gradient-to-b from-white/25 to-transparent origin-top"
          style={{ width: '150px', transform: 'translateX(-50%) rotate(-8deg)', clipPath: 'polygon(50% 0, 35% 100%, 65% 100%)', filter: "blur(15px)" }}
        />
        <div 
          className="absolute left-1/2 top-[-5%] h-[100%] bg-gradient-to-b from-white/25 to-transparent origin-top"
          style={{ width: '150px', transform: 'translateX(-50%) rotate(8deg)', clipPath: 'polygon(50% 0, 35% 100%, 65% 100%)', filter: "blur(15px)" }}
        />

        {/* Tightly focused bright inner rays */}
        <div 
          className="absolute left-1/2 top-[-5%] h-[90%] bg-gradient-to-b from-white/30 to-transparent origin-top"
          style={{ width: '80px', transform: 'translateX(-50%) rotate(3deg)', clipPath: 'polygon(50% 0, 40% 100%, 60% 100%)', filter: "blur(10px)" }}
        />
        <div 
          className="absolute left-1/2 top-[-5%] h-[90%] bg-gradient-to-b from-white/30 to-transparent origin-top"
          style={{ width: '80px', transform: 'translateX(-50%) rotate(-3deg)', clipPath: 'polygon(50% 0, 40% 100%, 60% 100%)', filter: "blur(10px)" }}
        />
      </motion.div>
    </div>
  );
};
