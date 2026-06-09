import React, { useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { Puzzle, ArrowUpRight, Users } from 'lucide-react';
import { FeaturedProject } from './FeaturedProject';
import { CaseStudyLiveShopping } from './CaseStudyLiveShopping';
import { CaseStudyAdam } from './CaseStudyAdam';
import liveShoppingPreview from "../../assets/live-shopping.png";
import adamB2BPreview from "../../assets/adam-b2b.png";
import videoHeroHSE from "../../assets/HSE/HSE VIDEOS/Hero.mp4";
import videoHeroAdam from "../../assets/Adam AI/Adam videos/Adam Hero.mp4";
import tolotipoLogo from "../../assets/Logos/tolotipo.png";

const projects = [
  {
    title: "Adam — B2B AI Agent",
    description: "Designing a conversational AI assistant for enterprise clients navigating the full reality of product design research, exploration, stakeholder conflict and delivery under constraints.",
    status: "Live V2 in progress",
    imageSrc: adamB2BPreview,
    videoSrc: videoHeroAdam
  },
  {
    title: "Guided Live Shopping Experience",
    description: "Designing a more intentional live shopping experience to reduce uncertainty, ease participation, and remove purchase friction.",
    status: "Completed",
    imageSrc: liveShoppingPreview,
    videoSrc: videoHeroHSE
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
      className="w-full relative text-left z-10 pb-24 md:pb-32 work-section-container scroll-mt-24 pt-4 md:pt-8"
    >
      {/* Main Content Wrapper */}
      <div
        ref={containerRef}
        className={`w-full flex flex-col gap-12 ${
          isInitial ? 'opacity-0 translate-y-16 pointer-events-none' : ''
        }`}
      >
        {/* 1. Card List Container */}
        <div
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
              <div key={index} className="h-[179px] w-full">
                <FeaturedProject
                  title={project.title}
                  description={project.description}
                  status={project.status}
                  imageSrc={project.imageSrc}
                  videoSrc={project.videoSrc}
                  onExpand={() => handleExpand(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 2. Tools & Experiments Container */}
        <div className="max-w-3xl mx-auto w-full backdrop-blur-md border border-white/5 border-dashed rounded-[24px] p-2 shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex flex-col bg-black/40">
          <p
            className="font-['Poppins',sans-serif] font-normal mb-3 px-4 pt-2"
            style={{ fontSize: '24px', color: 'var(--sky-text-80)', transition: 'color 0.6s ease' }}
          >
            Tools & Experiments
          </p>

          <div className="flex flex-col gap-2 w-full">
            <a
              href="https://www.figma.com/community/plugin/1443304083956683667/tooltipo?q_id=02e11280-1cfb-469c-9aad-5ada9df55c05"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-[88px] w-full rounded-[20px] border border-white/5 bg-black/20 hover:bg-black/40 transition-all duration-300 flex items-center px-4 md:px-5 gap-4 overflow-hidden"
            >
              {/* Plugin Icon */}
              <div className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 shadow-inner overflow-hidden border border-white/10 bg-white/5">
                <img src={tolotipoLogo} alt="Tooltipo Logo" className="w-full h-full object-cover" />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow min-w-0">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h3 className="text-white font-['Poppins',sans-serif] font-medium text-[17px] truncate">Tooltipo</h3>
                  <span className="px-2 py-0.5 rounded-md bg-white/10 border border-white/5 text-white/70 text-[10px] font-medium uppercase tracking-widest shrink-0">Figma Plugin</span>
                  <div className="flex items-center gap-1.5 text-white/40 text-[11px] font-['Poppins',sans-serif] shrink-0">
                    <Users size={12} />
                    <span>667 users</span>
                  </div>
                </div>
                <p className="text-white/50 font-['Poppins',sans-serif] font-light text-[13px] truncate leading-tight">
                  A Figma plugin for crafting and managing tooltips, published on Figma Community
                </p>
              </div>

              {/* Arrow */}
              <div className="shrink-0 text-white/30 group-hover:text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                <ArrowUpRight size={20} />
              </div>
            </a>
          </div>
        </div>
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
