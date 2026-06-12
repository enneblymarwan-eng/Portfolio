import React, { useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { motion, useScroll, useTransform } from 'motion/react';
import { Puzzle, ArrowUpRight, Users } from 'lucide-react';
import { FeaturedProject } from './FeaturedProject';
import { CaseStudyLiveShopping } from './CaseStudyLiveShopping';
import { CaseStudyAdam } from './CaseStudyAdam';
import liveShoppingPreview from "../../assets/live-shopping.png";
import adamB2BPreview from "../../assets/adam-b2b.png";
import videoHeroHSE from "../../assets/HSE/HSE VIDEOS/Hero.mp4";
import videoHeroAdam from "../../assets/Adam AI/Adam videos/Adam Hero.mp4";
import tolotipoLogo from "../../assets/Logos/tolotipo.png";
import cognitexLogo from "../../assets/Logos/Cognitex logo.svg";
import hseLogo from "../../assets/Logos/Hse.png";
import figmaIcon from "../../assets/Logos/figma.svg";

const projects = [
  {
    title: "Adam — Conversational AI Agent for Enterprise",
    description: "Conversational AI agent live across 17 countries — designed through stakeholder conflict and real constraints.",
    status: "Live",
    imageSrc: adamB2BPreview,
    videoSrc: videoHeroAdam,
    logoSrc: cognitexLogo
  },
  {
    title: "Live Shopping — Reducing Friction at the Moment of Purchase",
    description: "Redesigning live shopping to reduce drop-off and remove friction at the moment of purchase.",
    status: "Case Study",
    imageSrc: liveShoppingPreview,
    videoSrc: videoHeroHSE,
    logoSrc: hseLogo
  }
];

interface WorkSectionProps {
  cloudFilter?: string;
  caseStudyOpen: boolean;
  onCaseStudyChange?: (open: boolean) => void;
}

export function WorkSection({ cloudFilter = 'none', caseStudyOpen, onCaseStudyChange }: WorkSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const hasOpenedCaseStudy = useRef(false);

  // Parallax for inner sections
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const ySide = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const yTools = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // Lock body scroll when case study is active
  useEffect(() => {
    if (showCaseStudy) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showCaseStudy]);

  // Page load entrance: slide up from bottom
  useEffect(() => {
    if (containerRef.current) {
      setIsInitial(false);
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 60 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.0, 
          ease: 'power4.out', 
          delay: 0.1
        }
      );
    }
  }, []);

  const handleExpand = useCallback((index: number) => {
    setExpandedProject(index);
    hasOpenedCaseStudy.current = true;
    onCaseStudyChange?.(true);

    // Mount the case study overlay immediately
    setShowCaseStudy(true);

    // GSAP: smoothly fade and scale down the cards list container
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 0.94,
        y: -30,
        filter: 'blur(12px)',
        duration: 0.7,
        ease: 'power4.inOut'
      });
    }
  }, [onCaseStudyChange]);

  const handleBack = useCallback(() => {
    if (overlayRef.current) {
      // Smoothly animate the case study overlay out
      gsap.to(overlayRef.current, {
        opacity: 0,
        y: 80,
        scale: 0.95,
        filter: 'blur(12px)',
        duration: 0.6,
        ease: 'power4.inOut',
        onComplete: () => {
          setShowCaseStudy(false);
          setExpandedProject(null);
          onCaseStudyChange?.(false);
        }
      });

      // Simultaneously fade the list back in
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 1, 
          scale: 1,
          y: 0, 
          filter: 'blur(0px)',
          duration: 0.8, 
          ease: 'power4.out',
          delay: 0.15
        });
      }
    } else {
      setShowCaseStudy(false);
      setExpandedProject(null);
      onCaseStudyChange?.(false);
    }
  }, [onCaseStudyChange]);

  // Listen for caseStudyOpen prop changes to trigger handleBack if closed from header navigation
  useEffect(() => {
    if (!caseStudyOpen && showCaseStudy) {
      handleBack();
    }
  }, [caseStudyOpen, showCaseStudy, handleBack]);

  // Animate case study overlay when it mounts
  useEffect(() => {
    if (showCaseStudy && overlayRef.current) {
      gsap.killTweensOf(overlayRef.current);
      // Reset scroll position of the overlay itself
      overlayRef.current.scrollTop = 0;
      
      gsap.fromTo(overlayRef.current,
        { opacity: 0, y: 120, scale: 0.94, filter: 'blur(12px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power4.out' }
      );
    }
  }, [showCaseStudy]);

  return (
    <section
      ref={sectionRef}
      className="w-full relative text-left z-10 pb-24 md:pb-32 work-section-container scroll-mt-24 pt-12 md:pt-16"
    >
      <div
        ref={containerRef}
        className={`w-full flex flex-col gap-6 ${
          isInitial ? 'opacity-0 translate-y-16 pointer-events-none' : ''
        }`}
      >
        {/* 1. Card List Container */}
        <motion.div
          className="max-w-3xl mx-auto w-full backdrop-blur-2xl border border-[var(--sky-border)] rounded-[28px] p-2 shadow-[0_12px_40px_rgba(0,0,0,0.3)] flex flex-col work-main-card bg-black/65"
        >
          <p
            className="font-['Poppins',sans-serif] font-normal mb-4 px-4 pt-3 work-title"
            style={{ fontSize: '30px', color: 'var(--sky-text)', transition: 'color 0.6s ease' }}
          >
            Work
          </p>

          <div className="flex flex-col gap-2 w-full">
            {projects.map((project, index) => (
              <div key={index} className="h-[220px] w-full">
                <FeaturedProject
                  title={project.title}
                  description={project.description}
                  status={project.status}
                  imageSrc={project.imageSrc}
                  videoSrc={project.videoSrc}
                  logoSrc={(project as any).logoSrc}
                  onExpand={() => handleExpand(index)}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* 2. Side Projects Container */}
        <motion.div style={{ y: ySide }} className="max-w-3xl mx-auto w-full backdrop-blur-2xl border border-[var(--sky-border)] rounded-[28px] p-2 shadow-[0_12px_40px_rgba(0,0,0,0.3)] flex flex-col work-main-card bg-black/65 transform-gpu isolate">
          <p
            className="font-['Poppins',sans-serif] font-normal mb-3 px-4 pt-3 work-title"
            style={{ fontSize: '24px', color: 'var(--sky-text-80)', transition: 'color 0.6s ease' }}
          >
            Side Projects
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
            {/* Card 1 */}
            <div className="group relative w-full rounded-[22px] border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-500 overflow-hidden flex flex-col p-4 gap-4">
               {/* Image */}
               <div className="w-full h-[140px] rounded-[14px] overflow-hidden border border-white/5 relative">
                 <img src={liveShoppingPreview} alt="Side Project 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               </div>
               
               {/* Content */}
               <div className="flex flex-col flex-grow">
                 <h3 className="text-white font-['Poppins',sans-serif] font-medium text-[18px] tracking-tight mb-1">Sukoon — Mental Health for the Muslim World</h3>
                 <p className="text-white/60 font-['Poppins',sans-serif] font-light text-[13px] leading-relaxed mb-4">
                   Breaking the stigma around mental health in Muslim communities through an AI-powered space to speak freely, in your language, within your cultural context.
                 </p>
                 <div className="flex items-center gap-2 mt-auto self-start">
                   <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 text-[10px] font-medium uppercase tracking-widest shadow-sm backdrop-blur-md">
                     Coming Soon
                   </span>
                   <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-medium uppercase tracking-widest shadow-sm backdrop-blur-md">
                     Design & Dev
                   </span>
                 </div>
               </div>
            </div>

            {/* Card 2 */}
            <div className="group relative w-full rounded-[22px] border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-500 overflow-hidden flex flex-col p-4 gap-4">
               {/* Image */}
               <div className="w-full h-[140px] rounded-[14px] overflow-hidden border border-white/5 relative">
                 <img src={adamB2BPreview} alt="Side Project 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               </div>
               
               {/* Content */}
               <div className="flex flex-col flex-grow">
                 <h3 className="text-white font-['Poppins',sans-serif] font-medium text-[18px] tracking-tight mb-1">CrewPave — Asphalt Calculator for Construction Teams</h3>
                 <p className="text-white/60 font-['Poppins',sans-serif] font-light text-[13px] leading-relaxed mb-4">
                   Helping foremen and contractors calculate asphalt needs accurately using satellite imagery — removing guesswork from the job site.
                 </p>
                 <div className="flex items-center gap-2 mt-auto self-start">
                   <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 text-[10px] font-medium uppercase tracking-widest shadow-sm backdrop-blur-md">
                     Coming Soon
                   </span>
                   <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-medium uppercase tracking-widest shadow-sm backdrop-blur-md">
                     Design & Dev
                   </span>
                 </div>
               </div>
            </div>
          </div>
        </motion.div>

        {/* 3. Tools & Experiments Container */}
        <motion.div style={{ y: yTools }} className="max-w-3xl mx-auto w-full backdrop-blur-2xl border border-[var(--sky-border)] rounded-[28px] p-2 shadow-[0_12px_40px_rgba(0,0,0,0.3)] flex flex-col work-main-card bg-black/65 transform-gpu isolate">
          <p
            className="font-['Poppins',sans-serif] font-normal mb-3 px-4 pt-3 work-title"
            style={{ fontSize: '24px', color: 'var(--sky-text-80)', transition: 'color 0.6s ease' }}
          >
            Tools & Experiments
          </p>

          <div className="flex flex-col gap-3 w-full">
            <a
              href="https://www.figma.com/community/plugin/1443304083956683667/tooltipo?q_id=02e11280-1cfb-469c-9aad-5ada9df55c05"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full rounded-[22px] border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:from-white/10 hover:to-white/5 transition-colors duration-500 flex flex-col md:flex-row items-start md:items-start p-5 gap-5 overflow-hidden"
            >
              {/* Plugin Icon */}
              <div className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 shadow-lg overflow-hidden border border-white/10 bg-white/5 group-hover:scale-105 transition-transform duration-500">
                <img src={tolotipoLogo} alt="Tooltipo Logo" className="w-full h-full object-cover" />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow min-w-0 pr-8 md:pr-0">
                <h3 className="text-white font-['Poppins',sans-serif] font-medium text-[20px] tracking-tight mb-1">Tooltipo</h3>
                <p className="text-white/60 font-['Poppins',sans-serif] font-light text-[14px] leading-relaxed mb-3">
                  A Figma plugin for crafting and managing tooltips seamlessly within your design workflow.
                </p>
                
                {/* Meta details at the bottom */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/10 border border-white/5 text-white/70 text-[10px] font-medium uppercase tracking-widest shrink-0">
                    <img src={figmaIcon} alt="Figma" className="w-3 h-3 opacity-90" />
                    Figma Plugin
                  </span>
                  <div className="flex items-center gap-1.5 text-white/40 text-[11px] font-['Poppins',sans-serif] shrink-0">
                    <Users size={12} />
                    <span>667 users</span>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="absolute top-5 right-5 shrink-0 text-white/30 group-hover:text-white/90 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                <ArrowUpRight size={22} />
              </div>
            </a>
          </div>
        </motion.div>
      </div>

      {/* 2. Case Study Overlay */}
      {showCaseStudy && expandedProject !== null && (
        <div
          ref={overlayRef}
          key="case-study-overlay"
          className="fixed inset-4 bg-white/70 dark:bg-black/65 backdrop-blur-2xl z-30 rounded-[28px] border border-black/10 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto"
          style={{ opacity: 0, transform: 'translateY(100px)' }}
        >
          {expandedProject === 0 ? (
            <CaseStudyAdam onBack={handleBack} />
          ) : (
            <CaseStudyLiveShopping onBack={handleBack} />
          )}
        </div>
      )}
    </section>
  );
}
