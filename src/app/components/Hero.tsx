import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import SplitText from './SplitText';
import { useSky } from '../SkyContext';

const GREETINGS: Record<string, string> = {
  dawn: 'Good Early Morning,',
  morning: 'Good Morning',
  midday: 'Good Afternoon',
  golden: 'Good Evening',
  dusk: 'Good Night',
};

const DESCRIPTIONS: Record<string, string> = {
  dawn: "Still dark outside. I'm probably asleep but leave a message and I'll get back to you before the coffee's cold. I'm Marwan, a product designer based in Casablanca with 7 years of experience crafting digital experiences that are intuitive, meaningful, and a delight to use.",
  morning: "Coffee's brewing, Figma's loading. I'm Marwan, a product designer based in Casablanca 7 years of turning messy problems into experiences people actually enjoy using. Good time to reach out. I respond fast in the morning.",
  midday: "Deep in work mode. I'm Marwan, a product designer based in Casablanca. Seven years of shipped products, real users, and design decisions that hold up when you zoom in. If you have a problem worth solving, let's talk.",
  golden: "Winding down, but the ideas don't stop. I'm Marwan, a product designer based in Casablanca. After 7 years in this craft, I still get excited about a blank frame and a hard problem. That probably won't change.",
  dusk: "Either wrapping up a late session or staring at a screen wondering if that spacing is off by 1px. I'm Marwan, a product designer based in Casablanca, 7 years of experience, and still the last one to close Figma."
};

export function Hero({ hidden = false }: { hidden?: boolean }) {
  const { state } = useSky();
  const greeting = GREETINGS[state.id] || 'Hello';
  const description = DESCRIPTIONS[state.id] || DESCRIPTIONS['morning'];
  const sectionRef = useRef<HTMLElement>(null);
  const isFirstMount = useRef(true);

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
    <section ref={sectionRef} className="relative px-4 md:px-8 lg:px-16 pt-[240px] md:pt-[280px] pb-4 md:pb-8 text-left hero-root">
      <div className="max-w-3xl mx-auto w-full">
        <h1
          className="font-['Poppins',sans-serif] font-extralight text-[36px] tracking-tight mb-6 transition-all duration-600 ease-in-out"
          style={{ color: 'var(--sky-text)', transition: 'color 0.6s ease' }}
          key={greeting}
        >
          {greeting}.
        </h1>
        <div style={{ color: 'var(--sky-text)', transition: 'color 0.6s ease' }}>
          <SplitText
            key={`desc-${state.id}`}
            text={description}
            className="font-['Poppins',sans-serif] font-light text-[24px] leading-[32px] tracking-[-0.01em]"
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

        <div
          className="mt-12 pt-8 border-t"
          style={{ borderColor: 'var(--sky-border)', transition: 'border-color 0.6s ease' }}
        >
          <p
            className="text-[11px] uppercase tracking-widest mb-4 font-medium"
            style={{ color: 'var(--sky-text-50)', transition: 'color 0.6s ease' }}
          >
            Worked with
          </p>
          <div className="flex flex-wrap items-center gap-8 md:gap-12 mt-2">
            {/* OCP Logo */}
            <div
              className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity duration-300"
              style={{ color: 'var(--sky-text)', transition: 'color 0.6s ease, opacity 0.3s ease' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3v18M3 12h18M5.63 5.63l12.74 12.74M5.63 18.37l12.74-12.74" />
              </svg>
              <span className="font-['Poppins',sans-serif] font-bold text-base tracking-wider">OCP</span>
            </div>

            {/* LEYTON Logo */}
            <div
              className="font-['Poppins',sans-serif] font-black text-lg tracking-[0.12em] opacity-70 hover:opacity-100 transition-opacity duration-300"
              style={{ color: 'var(--sky-text)', transition: 'color 0.6s ease, opacity 0.3s ease' }}
            >
              LEYTON
            </div>

            {/* idea+ Logo */}
            <div
              className="flex items-start opacity-70 hover:opacity-100 transition-opacity duration-300 font-['Poppins',sans-serif] font-semibold text-base"
              style={{ color: 'var(--sky-text)', transition: 'color 0.6s ease, opacity 0.3s ease' }}
            >
              <span>idea</span>
              <span className="text-xs font-bold text-sky-400 ml-0.5 mt-0.5">+</span>
            </div>

            {/* HSE Logo */}
            <div
              className="font-['Poppins',sans-serif] font-black text-lg tracking-widest opacity-70 hover:opacity-100 transition-opacity duration-300"
              style={{ color: 'var(--sky-text)', transition: 'color 0.6s ease, opacity 0.3s ease' }}
            >
              HSE
            </div>

            {/* Spark Academy Logo */}
            <div
              className="flex flex-col opacity-70 hover:opacity-100 transition-opacity duration-300 font-['Poppins',sans-serif] leading-none"
              style={{ color: 'var(--sky-text)', transition: 'color 0.6s ease, opacity 0.3s ease' }}
            >
              <div className="flex items-center gap-0.5 font-bold text-sm tracking-wide">
                <span>Spark</span>
                <span className="text-[10px] text-sky-400 font-bold">*</span>
              </div>
              <span className="text-[8px] font-light uppercase tracking-widest mt-0.5">Academy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
