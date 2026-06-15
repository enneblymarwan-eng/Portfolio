import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import imgPlaceholder from "../../assets/live-shopping.png"; // Fallback placeholder

interface FeaturedProjectProps {
  title: string;
  description?: string;
  status?: string;
  imageSrc?: string;
  videoSrc?: string;
  logoSrc?: string;
  onExpand?: () => void;
}

export function FeaturedProject({ title, description, status, imageSrc = imgPlaceholder, videoSrc, logoSrc, onExpand }: FeaturedProjectProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  // Smooth parallax effect for the image inside the card
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const handleClick = () => {
    if (onExpand) {
      onExpand();
    }
  };

  return (
    <div 
      ref={cardRef}
      onClick={handleClick}
      className={`w-full h-auto md:h-full min-h-[380px] md:min-h-0 rounded-[20px] overflow-hidden bg-black/40 hover:bg-black/60 border border-white/5 border-dashed outline-none transition-all duration-300 flex flex-col md:flex-row relative shadow-[0_4px_20px_rgba(0,0,0,0.15)] group ${onExpand ? 'cursor-pointer hover:scale-[1.01]' : ''}`}
    >
      {/* Top/Right Image/Video Container */}
      <div className="w-full h-[180px] p-2 md:h-full md:absolute md:right-0 md:top-0 md:p-1 md:w-[45%] shrink-0 block">
        <div className="w-full h-full overflow-hidden rounded-[16px] relative">
          {videoSrc ? (
            <motion.video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              style={{ y: imageY, scale: 1.05 }}
              className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-[1.1]"
            />
          ) : (
            <motion.img 
              src={imageSrc} 
              alt="Project Preview" 
              style={{ y: imageY, scale: 1.05 }}
              className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-[1.1]"
            />
          )}
          {/* Subtle gradient overlay to blend edge */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 md:opacity-100 mix-blend-overlay pointer-events-none" />
        </div>
      </div>

      {/* Bottom/Left Text Content */}
      <div className="w-full md:w-[55%] p-5 md:p-6 pt-2 md:pt-6 flex flex-col justify-between z-10">
        <div>
          {logoSrc && (
            <img 
              src={logoSrc} 
              alt="Client Logo" 
              className="h-[18px] w-auto object-contain object-left mb-3" 
            />
          )}
          <h3 
            className="font-['Poppins',sans-serif] font-medium pr-2 md:pr-6 mb-2"
            style={{ fontSize: '15px', lineHeight: 1.4, color: 'var(--sky-text)', transition: 'color 0.6s ease' }}
          >
            {title}
          </h3>
          {description && (
            <p 
              className="font-['Poppins',sans-serif] font-light text-[11px] md:text-[12px] leading-relaxed pr-4 md:pr-6 line-clamp-2 md:line-clamp-3"
              style={{ color: 'var(--sky-text-70)', transition: 'color 0.6s ease' }}
            >
              {description}
            </p>
          )}
        </div>
        
        {/* Status */}
        <div className="flex items-center gap-3 mt-4 self-start">
          {status && (
            <div 
              className="px-3 py-1 rounded-full border text-[10px] uppercase tracking-wider font-medium transition-colors duration-600"
              style={{
                borderColor: 'var(--sky-border)',
                color: 'var(--sky-text-80)',
                backgroundColor: 'var(--sky-surface)'
              }}
            >
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
