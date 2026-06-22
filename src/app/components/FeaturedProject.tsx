import { useRef } from 'react';
import { motion } from 'motion/react';
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

  const handleClick = () => {
    if (onExpand) {
      onExpand();
    }
  };

  return (
    <div 
      ref={cardRef}
      onClick={handleClick}
      className={`w-full h-full min-h-[380px] md:min-h-[420px] rounded-[20px] overflow-hidden bg-black/40 hover:bg-black/60 border border-white/5 border-dashed outline-none transition-all duration-300 relative shadow-[0_4px_20px_rgba(0,0,0,0.15)] group ${onExpand ? 'cursor-pointer hover:scale-[1.01]' : ''}`}
    >
      {/* Background Image/Video Container */}
      <div className="absolute inset-0 w-full h-full z-0">
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-[1.05]"
          />
        ) : (
          <img 
            src={imageSrc} 
            alt="Project Preview" 
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-[1.05]"
          />
        )}
      </div>

      {/* Gradient overlay from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

      {/* Foreground Text Content */}
      <div className="absolute inset-0 z-10 p-6 md:p-8 flex flex-col justify-end">
        <div>
          {logoSrc && (
            <img 
              src={logoSrc} 
              alt="Client Logo" 
              className="h-[20px] md:h-[24px] w-auto object-contain object-left mb-4 drop-shadow-md" 
            />
          )}
          <h3 
            className="font-['Faculty_Glyphic',sans-serif] font-medium mb-2 text-white drop-shadow-md"
            style={{ fontSize: '18px', lineHeight: 1.4 }}
          >
            {title}
          </h3>
          {description && (
            <p 
              className="font-['Poppins',sans-serif] font-light text-[12px] md:text-[13px] leading-relaxed text-white/80 line-clamp-2 md:line-clamp-3 max-w-2xl drop-shadow-md"
            >
              {description}
            </p>
          )}
        </div>
        
        {/* Status */}
        <div className="flex items-center gap-3 mt-5 self-start">
          {status && (
            <div 
              className="px-3.5 py-1.5 rounded-full border border-white/20 bg-black/30 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-medium shadow-sm transition-colors duration-600"
            >
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
