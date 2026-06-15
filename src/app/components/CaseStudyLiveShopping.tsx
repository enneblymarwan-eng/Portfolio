import React, { useEffect, useState, useRef } from 'react';
import { LightPullThemeSwitcher } from './ui/light-pull-theme-switcher';
import hseLogo from "../../assets/Logos/Hse.png";
import imgHero from "../../assets/HSE/HSE - Hero.png";
import imgBuildingBlocks from "../../assets/HSE/Building Blocks.png";
import imgHseScreen1 from "../../assets/HSE/Hse screen 1.png";
import imgHseScreen2 from "../../assets/HSE/Hse screen 2.png";
import videoWireframe from "../../assets/HSE/HSE VIDEOS/HSE wireframes.mp4";
import videoHero from "../../assets/HSE/HSE VIDEOS/Hero.mp4";

interface CaseStudyInlineProps {
  onBack: () => void;
}

const SECTIONS = [
  { id: 'the-problem', label: 'Problem' },
  { id: 'the-persona', label: 'Persona' },
  { id: 'approach', label: 'Approach' },
  { id: 'wireframes', label: 'Wireframes' },
  { id: 'component-system', label: 'Component System' },
  { id: 'final-screens', label: 'Final Screens' },
];

function ImagePlaceholder({ label, aspect = '16/9' }: { label: string; aspect?: string }) {
  return (
    <div
      className="w-full bg-neutral-200/50 dark:bg-[#1a1a1a] rounded-[16px] border border-black/5 dark:border-white/5 flex items-center justify-center"
      style={{ aspectRatio: aspect }}
    >
      <span className="text-black/40 dark:text-white/20 text-sm font-light tracking-wide">{label}</span>
    </div>
  );
}

export function CaseStudyLiveShopping({ onBack }: CaseStudyInlineProps) {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop + 200;
      let current = SECTIONS[0].id;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          if (scrollTop >= el.offsetTop) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    const container = scrollContainerRef.current;
    if (el && container) {
      container.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
    }
  };

  return (
    <div ref={scrollContainerRef} className="w-full h-full overflow-y-auto font-['Poppins',sans-serif]">
      {/* Top Right Controls */}
      <div className="fixed top-10 right-10 md:top-12 md:right-12 z-50 flex items-start gap-4">
        {/* Theme Switcher */}
        <div className="scale-[0.8] origin-top -mt-6">
          <LightPullThemeSwitcher />
        </div>
        
        {/* Close Button */}
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-black/70 dark:text-white/70 hover:bg-black/10 dark:hover:bg-white/15 hover:text-black dark:hover:text-white transition-all backdrop-blur-md cursor-pointer shrink-0"
          aria-label="Close Case Study"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Fixed Side Navigation — desktop only */}
      <nav className="hidden lg:flex fixed left-10 top-1/2 -translate-y-1/2 z-40 flex-col gap-4">
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`group flex items-center gap-3 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
                isActive ? 'translate-x-2' : 'hover:translate-x-1'
              }`}
            >
              <span 
                className={`h-[1px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-black dark:bg-white ${
                  isActive ? 'w-6 opacity-100' : 'w-2 opacity-30 group-hover:w-4 group-hover:opacity-60'
                }`}
              />
              <span 
                className={`text-[13px] tracking-wider transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive ? 'text-black dark:text-white font-medium' : 'text-black/40 dark:text-white/40 font-light group-hover:text-black/70 dark:text-white/70'
                }`}
              >
                {section.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto w-full px-6 md:px-0 pt-[200px] md:pt-24 pb-20">

        {/* Title */}
        <h1
          className="text-[36px] md:text-[48px] font-normal leading-[1.1] mb-4 tracking-tight text-left text-neutral-900 dark:text-white transition-colors duration-500"
        >
          Live Shopping — Reducing Friction at the Moment of Purchase
        </h1>
        <p
          className="text-base md:text-lg font-light mb-16 text-left max-w-lg leading-relaxed text-neutral-600 dark:text-white/70 transition-colors duration-500"
        >
          Redesigning live shopping to reduce drop-off and remove friction at the moment of purchase.
        </p>

        {/* Meta */}
        <div className="flex flex-wrap gap-8 md:gap-12 mb-20">
          <div className="text-left">
            <h4 className="text-[11px] font-normal mb-2 uppercase tracking-wider text-neutral-500 dark:text-white/50 transition-colors duration-500">Client</h4>
            <div className="flex items-center h-[28px]">
              <img src={hseLogo} alt="HSE" className="h-[24px] object-contain" />
            </div>
          </div>
          <div className="text-left">
            <h4 className="text-[11px] font-normal mb-2 uppercase tracking-wider text-neutral-500 dark:text-white/50 transition-colors duration-500">Role</h4>
            <p className="text-[14px] font-light text-neutral-700 dark:text-white/80 transition-colors duration-500">UI/UX Design</p>
          </div>
          <div className="text-left">
            <h4 className="text-[11px] font-normal mb-2 uppercase tracking-wider text-neutral-500 dark:text-white/50 transition-colors duration-500">Year</h4>
            <p className="text-[14px] font-light text-neutral-700 dark:text-white/80 transition-colors duration-500">2026</p>
          </div>
          <div className="text-left">
            <h4 className="text-[11px] font-normal mb-2 uppercase tracking-wider text-neutral-500 dark:text-white/50 transition-colors duration-500">Duration</h4>
            <p className="text-[14px] font-light text-neutral-700 dark:text-white/80 transition-colors duration-500">8 weeks</p>
          </div>
          <div className="text-left">
            <h4 className="text-[11px] font-normal mb-2 uppercase tracking-wider text-neutral-500 dark:text-white/50 transition-colors duration-500">Platform</h4>
            <p className="text-[14px] font-light text-neutral-700 dark:text-white/80 transition-colors duration-500">iOS & Android</p>
          </div>
        </div>

        {/* Hero Video */}
        <div className="mb-16">
          <video
            src={videoHero}
            autoPlay
            muted
            loop
            playsInline
            className="w-full rounded-[16px] border border-black/5 dark:border-white/5 shadow-md"
          />
        </div>

        {/* ─── 1. PROBLEM ─── */}
        <section id="the-problem" className="mb-20">
          <h2 className="text-xl md:text-2xl font-normal mb-5 tracking-tight text-neutral-900 dark:text-white">
            Problem
          </h2>
          <p className="text-[15px] font-light leading-[1.85] text-neutral-600 dark:text-white/70">
            Live shopping overwhelms users the moment they enter a stream. Too much information, too fast, with no clear path forward. The result is early drop-off and low retention — not because users aren't interested, but because the experience works against them.
          </p>
        </section>

        {/* ─── 2. PERSONA ─── */}
        <section id="the-persona" className="mb-20">
          <h2 className="text-xl md:text-2xl font-normal mb-5 tracking-tight text-neutral-900 dark:text-white">
            Persona
          </h2>
          <p className="text-[15px] font-light leading-[1.85] text-neutral-600 dark:text-white/70">
            A mobile user on the couch looking for content that's quick, entertaining, and easy to act on. They don't want to think — they want to tap, discover, and buy when something feels right.
          </p>
        </section>

        {/* ─── 3. APPROACH ─── */}
        <section id="approach" className="mb-20">
          <h2 className="text-xl md:text-2xl font-normal mb-5 tracking-tight text-neutral-900 dark:text-white">
            Approach
          </h2>
          <p className="text-[15px] font-light leading-[1.85] text-neutral-600 dark:text-white/70">
            Rather than adding features, the focus was on adding clarity. Every design decision was guided by one question: how do we get the user to the next meaningful moment with as little friction as possible?
          </p>
        </section>

        {/* ─── 4. WIREFRAMES ─── */}
        <section id="wireframes" className="mb-20">
          <h2 className="text-xl md:text-2xl font-normal mb-5 tracking-tight text-neutral-900 dark:text-white">
            Wireframes
          </h2>
          <div className="mb-6">
            <video
              src={videoWireframe}
              autoPlay
              muted
              loop
              playsInline
              className="w-full rounded-[16px] border border-black/5 dark:border-white/5 shadow-md"
            />
          </div>
          <p className="text-[15px] font-light leading-[1.85] text-neutral-600 dark:text-white/70">
            AI was used to rapidly prototype and validate the complete user journey before investing in visual design. The objective was to test information hierarchy, interaction flow, and cognitive load across the live shopping experience. Multiple iterations were explored to ensure users could move from discovery to purchase without leaving the stream. These wireframes directly informed the building blocks of the final design system — each component emerged from patterns that proved themselves here first.
          </p>
        </section>

        {/* ─── 5. COMPONENT SYSTEM ─── */}
        <section id="component-system" className="mb-20">
          <h2 className="text-xl md:text-2xl font-normal mb-5 tracking-tight text-neutral-900 dark:text-white">
            Component System
          </h2>
          <div className="mb-6">
            <img src={imgBuildingBlocks} alt="Component System Building Blocks" className="w-full rounded-[16px] border border-black/5 dark:border-white/5 shadow-md" />
          </div>
          <p className="text-[15px] font-light leading-[1.85] text-neutral-600 dark:text-white/70">
            Every screen was built from a shared set of reusable components — product cards, live feed cards, action buttons, size selectors, message bar, cart sheet, and navigation. Designing at the component level first ensured visual consistency across the experience and made iteration faster.
          </p>
        </section>

        {/* ─── 6. FINAL SCREENS ─── */}
        <section id="final-screens" className="mb-16">
          <h2 className="text-xl md:text-2xl font-normal mb-5 tracking-tight text-neutral-900 dark:text-white">
            Final Screens
          </h2>
          <div className="mb-6 flex flex-col gap-6">
            <img src={imgHseScreen1} alt="Final Experience Screen 1" className="w-full rounded-[16px] border border-black/5 dark:border-white/5 shadow-md" />
            <img src={imgHseScreen2} alt="Final Experience Screen 2" className="w-full rounded-[16px] border border-black/5 dark:border-white/5 shadow-md" />
          </div>
          <p className="text-[15px] font-light leading-[1.85] text-neutral-600 dark:text-white/70">
            The final screens bring together the full experience — from discovering a live stream on the feed, joining without friction, engaging with the host, exploring products in context, and checking out without ever leaving the stream. Every screen reflects the same principle: reduce the distance between interest and action.
          </p>
        </section>

        {/* Closing */}
        <div className="border-t border-black/10 dark:border-white/10 pt-12 mt-12 text-center">
          <button
            onClick={onBack}
            className="text-[13px] font-medium tracking-wide text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            ← Back to Work
          </button>
        </div>

      </div>
    </div>
  );
}
