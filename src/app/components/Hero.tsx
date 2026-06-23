import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import SplitText from './SplitText';
import { useSky } from '../SkyContext';
import { motion, useScroll, useTransform } from 'motion/react';

const GREETINGS: Record<string, string> = {
  dawn: "You're up before the sun.\nRespect.",
  morning: "Good Morning.\nCoffee's brewing, ideas are moving.",
  midday: "Good Afternoon.\nPeak hours. Let's not waste them.",
  golden: "Golden Hour.\nThe best ideas look obvious in hindsight.",
  dusk: "Good Evening.\nStill here? So am I.",
};

const DESCRIPTIONS: Record<string, { line1: string; line2: string }> = {
  dawn: {
    line1: "",
    line2: "Hi, I'm Marwan. I design AI-powered products, enterprise tools, and mobile apps that turn complex workflows into experiences people understand instantly."
  },
  morning: {
    line1: "",
    line2: "Hi, I'm Marwan. I design AI-powered products, enterprise tools, and mobile apps that turn complex workflows into experiences people understand instantly."
  },
  midday: {
    line1: "",
    line2: "Hi, I'm Marwan. I design AI-powered products, enterprise tools, and mobile apps that turn complex workflows into experiences people understand instantly."
  },
  golden: {
    line1: "",
    line2: "Hi, I'm Marwan. I design AI-powered products, enterprise tools, and mobile apps that turn complex workflows into experiences people understand instantly."
  },
  dusk: {
    line1: "",
    line2: "Hi, I'm Marwan. I design AI-powered products, enterprise tools, and mobile apps that turn complex workflows into experiences people understand instantly."
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
    <section ref={sectionRef} className="relative px-1 md:px-8 lg:px-16 pt-[220px] md:pt-[280px] pb-4 md:pb-8 text-center hero-root">
      <motion.div className="max-w-3xl mx-auto w-full px-0" style={{ opacity }}>

        {/* Greeting (time-adaptive) */}
        <div style={{ color: 'var(--sky-text)', transition: 'color 0.6s ease' }}>
          <SplitText
            key={`merged-${state.id}`}
            text={line1 ? `${greeting}\n${line1}` : greeting}
            className="font-['Faculty_Glyphic',sans-serif] font-extralight text-[28px] md:text-[40px] leading-[36px] md:leading-[50px] tracking-tight whitespace-pre-line"
            delay={30}
            duration={0.8}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
            to={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            threshold={0.1}
            rootMargin="-50px"
            textAlign="center"
          />
        </div>

        {/* Description */}
        <div className="mt-8 max-w-xl mx-auto" style={{ color: 'var(--sky-text)', transition: 'color 0.6s ease' }}>
          <SplitText
            key={`line2-${state.id}`}
            text={line2}
            className="font-['Poppins',sans-serif] font-extralight text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] tracking-[-0.01em]"
            delay={30}
            duration={0.8}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
            to={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            threshold={0.1}
            rootMargin="-50px"
            textAlign="center"
          />
        </div>

        {/* Expertise Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex items-center justify-center gap-4 md:gap-6"
          style={{ color: 'var(--sky-text)', transition: 'color 0.6s ease' }}
        >
          {['7+ Years', 'AI Products', 'Enterprise SaaS', 'End-To-End Design'].map((item, i, arr) => (
            <span key={item} className="flex items-center gap-4 md:gap-6">
              <span className="font-['Poppins',sans-serif] text-[12px] md:text-[14px] font-light tracking-wide opacity-70">
                {item}
              </span>
              {i < arr.length - 1 && (
                <span className="opacity-30 text-[14px] font-extralight">|</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* Availability Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 inline-flex items-center gap-3 px-8 py-3 rounded-full"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            color: '#ffffff',
            transition: 'all 0.6s ease'
          }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-['Poppins',sans-serif] text-[12px] md:text-[13px] font-medium tracking-wide">
            Available For Remote Opportunities · Casablanca · GMT+1
          </span>
        </motion.div>

      </motion.div>
    </section>
  );
}
