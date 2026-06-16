import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import SplitText from './SplitText';
import { useSky } from '../SkyContext';
import { motion, useScroll, useTransform } from 'motion/react';

const GREETINGS: Record<string, string> = {
  dawn: "You're up before the sun. Respect.",
  morning: "Good Morning. Coffee's brewing, ideas are moving.",
  midday: "Good Afternoon. Peak hours. Let's not waste them.",
  golden: "Golden Hour. The best ideas look obvious in hindsight.",
  dusk: "Good Evening. Still here? So am I.",
};

const DESCRIPTIONS: Record<string, { line1: string; line2: string }> = {
  dawn: {
    line1: "",
    line2: "I'm Marwan, a product designer based in Casablanca. Seven years of shipped products, real users, and design decisions that hold up when you zoom in. Since you're already ahead of schedule — let's make something worthwhile."
  },
  morning: {
    line1: "",
    line2: "I'm Marwan, a product designer based in Casablanca. Seven years of shipped products, real users, and design decisions that hold up when you zoom in. If you have a problem worth solving, let's talk."
  },
  midday: {
    line1: "",
    line2: "I'm Marwan, a product designer based in Casablanca. Seven years of shipped products, real users, and design decisions that hold up when you zoom in. If you have a problem worth solving, let's talk."
  },
  golden: {
    line1: "",
    line2: "I'm Marwan, a product designer based in Casablanca. After 7 years in this craft, I still get excited about a blank frame and a hard problem. That probably won't change."
  },
  dusk: {
    line1: "",
    line2: "I'm Marwan, a product designer based in Casablanca. Seven years of shipped products, real users, and design decisions that hold up when you zoom in. If you're building something meaningful, I'd love to hear about it."
  }
};

export function Hero({ hidden = false }: { hidden?: boolean }) {
  const { state } = useSky();
  const greeting = GREETINGS[state.id] || 'Hello';
  const { line1, line2 } = DESCRIPTIONS[state.id] || DESCRIPTIONS['morning'];
  const sectionRef = useRef<HTMLElement>(null);
  const isFirstMount = useRef(true);

  // Parallax Scroll Effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (hidden) {
      // Don't animate on first mount if already hidden
      if (isFirstMount.current) {
        isFirstMount.current = false;
        gsap.set(sectionRef.current, { opacity: 0, pointerEvents: 'none' });
        return;
      }
      // Fade out opacity only. Keep layout height to preserve scroll position perfectly!
      gsap.to(sectionRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power3.out'
      });
    } else {
      // On first mount, just show normally — don't animate
      if (isFirstMount.current) {
        isFirstMount.current = false;
        return;
      }

      // Instantly clear any inline properties to restore natural layout bounds
      gsap.set(sectionRef.current, { clearProps: 'all' });

      // Smoothly fade in and slide up from y: 15 to y: 0
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'all' // This also clears pointerEvents
        }
      );
    }
  }, [hidden]);

  return (
    <section ref={sectionRef} className="relative px-4 md:px-8 lg:px-16 pt-[220px] md:pt-[280px] pb-4 md:pb-8 text-left hero-root">
      <motion.div className="max-w-3xl mx-auto w-full" style={{ y, opacity }}>
        <div style={{ color: 'var(--sky-text)', transition: 'color 0.6s ease' }}>
          <SplitText
            key={`merged-${state.id}`}
            text={line1 ? `${greeting}\n${line1}` : greeting}
            className="font-['Poppins',sans-serif] font-extralight text-[26px] md:text-[32px] leading-[34px] md:leading-[40px] tracking-tight whitespace-pre-line"
            delay={30}
            duration={0.8}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
            to={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            threshold={0.1}
            rootMargin="-50px"
            textAlign="left"
          />
        </div>
        <div className="mt-8" style={{ color: 'var(--sky-text)', transition: 'color 0.6s ease' }}>
          <SplitText
            key={`line2-${state.id}`}
            text={line2}
            className="font-['Poppins',sans-serif] font-light text-[16px] md:text-[20px] leading-[26px] md:leading-[28px] tracking-[-0.01em]"
            delay={30}
            duration={0.8}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
            to={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            threshold={0.1}
            rootMargin="-50px"
            textAlign="left"
          />
        </div>
        <div className="mt-6" style={{ color: 'var(--sky-text)', transition: 'color 0.6s ease' }}>
          <SplitText
            key={`line3-${state.id}`}
            text="Outside client work, I'm building Sukoon an AI-powered mental health app for Muslim communities. A space to speak freely, in your language, within your cultural context, without shame. It's the most meaningful thing I'm working on right now."
            className="font-['Poppins',sans-serif] font-light text-[16px] md:text-[20px] leading-[26px] md:leading-[28px] tracking-[-0.01em]"
            delay={30}
            duration={0.8}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
            to={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            threshold={0.1}
            rootMargin="-50px"
            textAlign="left"
          />
        </div>
      </motion.div>
    </section>
  );
}
