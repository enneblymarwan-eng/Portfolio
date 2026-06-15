import React, { useEffect, useState, useRef } from 'react';
import { LightPullThemeSwitcher } from './ui/light-pull-theme-switcher';
import hseLogo from "../../assets/Logos/Hse.png";
import imgHero from "../../assets/HSE/HSE - Hero.png";
import imgBuildingBlocks from "../../assets/HSE/Building Blocks.png";
import imgHseScreen1 from "../../assets/HSE/Hse screen 1.png";
import imgHseScreen2 from "../../assets/HSE/Hse screen 2.png";
import videoWireframe from "../../assets/HSE/HSE VIDEOS/HSE wireframes.mp4";
import videoHero from "../../assets/HSE/HSE VIDEOS/Hero.mp4";
import imgHardestScreen from "../../assets/HSE/The Hardest Screen to Get Right.png";

interface CaseStudyInlineProps {
  onBack: () => void;
}

const SECTIONS = [
  { id: 'the-moment-it-breaks', label: 'The Moment It Breaks' },
  { id: 'how-i-came-in', label: 'How I Came In' },
  { id: 'testing-before-committing', label: 'Testing Before Committing' },
  { id: 'the-hardest-screen-to-get-right', label: 'The Hardest Screen to Get Right' },
  { id: 'building-the-blocks', label: 'Building the Blocks' },
  { id: 'when-it-all-came-together', label: 'When It All Came Together' },
  { id: 'what-i-left-behind', label: 'What I Left Behind' },
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
        <div className="scale-[0.8] origin-top -mt-6 hidden md:block">
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
      <div className="max-w-3xl mx-auto w-full px-6 md:px-0 pt-[120px] md:pt-24 pb-20">

        {/* Title */}
        <h1
          className="text-[36px] md:text-[48px] font-normal leading-[1.1] mb-4 tracking-tight text-left text-neutral-900 dark:text-white transition-colors duration-500"
        >
          Live Shopping — Designing for the Moment
        </h1>
        <p
          className="text-base md:text-lg font-light mb-16 text-left max-w-lg leading-relaxed text-neutral-600 dark:text-white/70 transition-colors duration-500"
        >
          Layering interaction into a live stream without losing the viewer.
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
          <div className="text-left">
            <h4 className="text-[11px] font-normal mb-2 uppercase tracking-wider text-neutral-500 dark:text-white/50 transition-colors duration-500">Status</h4>
            <p className="text-[14px] font-light text-neutral-700 dark:text-white/80 transition-colors duration-500">Paused</p>
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

        {/* ─── 1. THE MOMENT IT BREAKS ─── */}
        <section id="the-moment-it-breaks" className="mb-20">
          <h2 className="text-xl md:text-2xl font-normal mb-5 tracking-tight text-neutral-900 dark:text-white">
            The Moment It Breaks
          </h2>
          <p className="text-[15px] font-light leading-[1.85] text-neutral-600 dark:text-white/70">
            Live shopping loses people the moment it overwhelms them. Too much information, too many actions, too fast — and the viewer checks out. Not because they weren't interested, but because the experience made it too hard to stay. The challenge wasn't adding more to the stream. It was deciding what deserved to be there at all.
          </p>
        </section>

        {/* ─── 2. HOW I CAME IN ─── */}
        <section id="how-i-came-in" className="mb-20">
          <h2 className="text-xl md:text-2xl font-normal mb-5 tracking-tight text-neutral-900 dark:text-white">
            How I Came In
          </h2>
          <p className="text-[15px] font-light leading-[1.85] mb-4 text-neutral-600 dark:text-white/70">
            I joined this project mid-process. The research was already done. My job was to take that foundation and build the experience — enhance the interactions, design the building blocks, and prototype the full journey. Every decision I made was informed by one question: does this element earn its place on screen?
          </p>
          <p className="text-[15px] font-light leading-[1.85] text-neutral-600 dark:text-white/70">
            The research gave me one clear picture of the user: a mobile viewer on the couch, looking for content that's quick, entertaining, and easy to act on. They don't want to think. They want to tap, discover, and buy when something feels right. Everything I designed started from that.
          </p>
        </section>

        {/* ─── 3. TESTING BEFORE COMMITTING ─── */}
        <section id="testing-before-committing" className="mb-20">
          <h2 className="text-xl md:text-2xl font-normal mb-5 tracking-tight text-neutral-900 dark:text-white">
            Testing Before Committing
          </h2>
          <p className="text-[15px] font-light leading-[1.85] mb-6 text-neutral-600 dark:text-white/70">
            Before any visual design, AI was used to rapidly prototype and validate the full user journey. The goal was to test information hierarchy, interaction flow, and how much could live on screen at once without losing the viewer. Multiple iterations were explored until the hierarchy felt natural. These wireframes became the blueprint for every component that followed.
          </p>
          <div className="mb-8">
            <video
              src={videoWireframe}
              autoPlay
              muted
              loop
              playsInline
              className="w-full rounded-[16px] border border-black/5 dark:border-white/5 shadow-md"
            />
          </div>
        </section>

        {/* ─── 4. THE HARDEST SCREEN TO GET RIGHT ─── */}
        <section id="the-hardest-screen-to-get-right" className="mb-20">
          <h2 className="text-xl md:text-2xl font-normal mb-5 tracking-tight text-neutral-900 dark:text-white">
            The Hardest Screen to Get Right
          </h2>
          <div className="mb-6">
            <img src={imgHardestScreen} alt="The Hardest Screen to Get Right" className="w-full rounded-[16px] border border-black/5 dark:border-white/5 shadow-md" />
          </div>
          <p className="text-[15px] font-light leading-[1.85] mb-4 text-neutral-600 dark:text-white/70">
            The hardest screen to get right was the live stream itself. A viewer is watching a host, following a conversation, and potentially making a purchase decision all at the same time. Every element added to that screen had to justify its existence.
          </p>
          <p className="text-[15px] font-light leading-[1.85] mb-4 text-neutral-600 dark:text-white/70">
            Product cards surface what the host is showing without pulling the viewer out of the stream. Suggestion pills replace the need to type — one tap keeps the conversation moving. Polls turn passive viewers into participants. Badges and reactions give the stream energy without adding cognitive load. Each one of these exists because removing it made the experience feel dead. Each one was placed where it was because moving it made the experience feel cluttered.
          </p>
          <p className="text-[15px] font-light leading-[1.85] text-neutral-600 dark:text-white/70">
            That balance, alive but not overwhelming, was the entire design problem.
          </p>
        </section>

        {/* ─── 5. BUILDING THE BLOCKS ─── */}
        <section id="building-the-blocks" className="mb-20">
          <h2 className="text-xl md:text-2xl font-normal mb-5 tracking-tight text-neutral-900 dark:text-white">
            Building the Blocks
          </h2>
          <div className="mb-6">
            <img src={imgBuildingBlocks} alt="Component System Building Blocks" className="w-full rounded-[16px] border border-black/5 dark:border-white/5 shadow-md" />
          </div>
          <p className="text-[15px] font-light leading-[1.85] text-neutral-600 dark:text-white/70">
            Every screen was built from a shared set of reusable components. Designing at the component level first meant every decision made in the wireframe phase translated directly into the final experience. Nothing was reinvented, everything was refined.
          </p>
        </section>

        {/* ─── 6. WHEN IT ALL CAME TOGETHER ─── */}
        <section id="when-it-all-came-together" className="mb-20">
          <h2 className="text-xl md:text-2xl font-normal mb-5 tracking-tight text-neutral-900 dark:text-white">
            When It All Came Together
          </h2>
          <div className="mb-6 flex flex-col gap-6">
            <img src={imgHseScreen1} alt="Final Experience Screen 1" className="w-full rounded-[16px] border border-black/5 dark:border-white/5 shadow-md" />
            <img src={imgHseScreen2} alt="Final Experience Screen 2" className="w-full rounded-[16px] border border-black/5 dark:border-white/5 shadow-md" />
          </div>
          <p className="text-[15px] font-light leading-[1.85] text-neutral-600 dark:text-white/70">
            The final screens bring the full experience together — from discovering a stream on the feed, joining without friction, engaging with the host, exploring products in context, and checking out without ever leaving the stream. Every screen reflects the same principle: reduce the distance between interest and action.
          </p>
        </section>

        {/* ─── 7. WHAT I LEFT BEHIND ─── */}
        <section id="what-i-left-behind" className="mb-16">
          <h2 className="text-xl md:text-2xl font-normal mb-5 tracking-tight text-neutral-900 dark:text-white">
            What I Left Behind
          </h2>
          <p className="text-[15px] font-light leading-[1.85] text-neutral-600 dark:text-white/70">
            A fully prototyped experience, a complete component system, and a live stream interface designed to keep viewers in the moment. The project was paused before launch for reasons outside the design scope. The work stands on its own.
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
