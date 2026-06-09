import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import imgPlaceholder from "../../assets/live-shopping.png"; // Fallback placeholder

interface FeaturedProjectProps {
  title: string;
  description?: string;
  status?: string;
  imageSrc?: string;
  videoSrc?: string;
  onExpand?: () => void;
}

export function FeaturedProject({ title, description, status, imageSrc = imgPlaceholder, videoSrc, onExpand }: FeaturedProjectProps) {
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
      className="w-full h-full rounded-[20px] overflow-hidden bg-black/40 hover:bg-black/60 border border-white/5 border-dashed cursor-pointer outline-none transition-all duration-300 hover:scale-[1.01] flex flex-row relative shadow-[0_4px_20px_rgba(0,0,0,0.15)] group"
    >
      {/* Left Text Content */}
      <div className="w-[55%] p-5 md:p-6 flex flex-col justify-between z-10">
        <div>
          <h3 
            className="font-['Poppins',sans-serif] font-medium pr-2 mb-2"
            style={{ fontSize: '15px', lineHeight: 1.4, color: 'var(--sky-text)', transition: 'color 0.6s ease' }}
          >
            {title}
          </h3>
          {description && (
            <p 
              className="font-['Poppins',sans-serif] font-light text-[11px] md:text-[12px] leading-relaxed pr-4 line-clamp-2 md:line-clamp-3"
              style={{ color: 'var(--sky-text-70)', transition: 'color 0.6s ease' }}
            >
              {description}
            </p>
          )}
        </div>
        
        {/* Status */}
        {status && (
          <div 
            className="self-start mt-4 px-3 py-1 rounded-full border text-[10px] uppercase tracking-wider font-medium transition-colors duration-600"
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

      {/* Right Image/Video Container */}
      <div className="h-full absolute right-0 top-0 p-1 aspect-video hidden sm:block w-[45%] sm:w-auto">
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
        </div>
      </div>
    </div>
  );
}
