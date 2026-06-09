import { useEffect, useState, useRef } from 'react';
import { useSky, LIGHTING_STATES } from '../SkyContext';

interface SkySliderProps {
  forceVisible?: boolean;
  forceHidden?: boolean;
}

export function SkySlider({ forceVisible = false, forceHidden = false }: SkySliderProps) {
  const { timeIndex, setTimeIndex, state } = useSky();
  const [hidden, setHidden] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    if (forceHidden) {
      setHidden(true);
      return;
    }
    if (forceVisible) {
      setHidden(false);
      return;
    }

    const updateHidden = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 80) {
        setHidden(false);
      } else {
        setHidden(true);
      }
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(updateHidden);
      }
    };

    // Initialize state on mount or when forceVisible changes
    updateHidden();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [forceVisible, forceHidden]);

  return (
    <div 
      className={`fixed left-1/2 -translate-x-1/2 z-40 w-full max-w-3xl px-6 md:px-10 pointer-events-auto flex justify-center opacity-90 hover:opacity-100 sky-slider-container ${
        hidden || forceHidden ? 'hidden-slider pointer-events-none opacity-0' : ''
      }`}
    >
      <div className="relative w-full h-[60px]">
        {/* Invisible Range Input for Interaction */}
        <input 
          type="range" 
          min="0" max="4" 
          value={timeIndex} 
          onChange={(e) => setTimeIndex(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50 m-0 p-0"
          style={{ touchAction: 'none' }}
        />

        {/* Curved Track SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 60">
          <defs>
            <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="5%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="95%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path 
            d="M 0 40 Q 500 -10 1000 40" 
            fill="none" 
            stroke="url(#trackGradient)" 
            strokeWidth="1.5" 
          />
        </svg>

        {/* Ticks and Labels Layer */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {LIGHTING_STATES.map((s, i) => {
            const isActive = i === timeIndex;
            return (
              <div 
                key={i}
                className="absolute flex flex-col items-center justify-center transition-all duration-[600ms]"
                style={{ 
                  left: `${(i / 4) * 100}%`, 
                  top: `${s.y}px`,
                  transform: `translate(-50%, -50%)`
                }}
              >
                {/* Vertical Tick Mark intercepting the curve */}
                <div 
                  className={`w-[1px] h-[16px] bg-white/40 transition-all duration-300 ${isActive ? 'opacity-0 scale-y-50' : 'opacity-100 scale-y-100'}`} 
                />
                
                {/* Label positioned dynamically beneath */}
                <span 
                  className={`absolute top-full mt-[12px] font-['Poppins',sans-serif] whitespace-nowrap transition-all duration-[600ms] ${isActive ? 'text-[15px] md:text-[16px] font-normal' : 'text-[12px] md:text-[13px] font-light'}`}
                  style={{ color: isActive ? 'var(--sky-text)' : 'var(--sky-text-50)', transition: 'color 0.6s ease' }}
                >
                  {s.label}
                </span>
              </div>
            );
          })}

          {/* Smooth Gliding Visual Thumb */}
          <div 
            className="absolute w-[20px] h-[20px] bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-[400ms] ease-out pointer-events-none"
            style={{
              left: `${(timeIndex / 4) * 100}%`,
              top: `${state.y}px`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>
      </div>
    </div>
  );
}
