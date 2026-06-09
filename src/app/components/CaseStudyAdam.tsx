import React, { useEffect, useState, useRef } from 'react';
import { LightPullThemeSwitcher } from './ui/light-pull-theme-switcher';
import videoHero from "../../assets/Adam AI/Adam videos/Adam Hero.mp4";
import imgNNFramework from "../../assets/Adam AI/NNframework.png";
import imgGoals from "../../assets/Adam AI/Goals and mesures.png";
import imgUncanny from "../../assets/Adam AI/Uncanny Valley.png";
import imgExplored1 from "../../assets/Adam AI/What explored1.png";
import imgExplored2 from "../../assets/Adam AI/What explored 2.png";

interface CaseStudyInlineProps {
  onBack: () => void;
}

const SECTIONS = [
  { id: 'the-problem', label: 'The Problem' },
  { id: 'measuring-success', label: 'Measuring Success' },
  { id: 'four-principles', label: 'Four Principles' },
  { id: 'the-collision', label: 'The Collision' },
  { id: 'what-i-explored', label: 'What I Explored Anyway' },
  { id: 'how-i-adapted', label: 'How I Adapted' },
  { id: 'the-flows', label: 'The Flows' },
  { id: 'what-shipped', label: 'What Shipped vs. What I Designed' },
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

export function CaseStudyAdam({ onBack }: CaseStudyInlineProps) {
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
              className={`group flex items-center gap-3 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${isActive ? 'translate-x-2' : 'hover:translate-x-1'
                }`}
            >
              <span
                className={`h-[1px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-black dark:bg-white ${isActive ? 'w-6 opacity-100' : 'w-2 opacity-30 group-hover:w-4 group-hover:opacity-60'
                  }`}
              />
              <span
                className={`text-[13px] tracking-wider transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'text-black dark:text-white font-medium' : 'text-black/40 dark:text-white/40 font-light group-hover:text-black/70 dark:text-white/70'
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
          Adam - B2B AI Agent
        </h1>
        <p
          className="text-base md:text-lg font-light mb-16 text-left max-w-lg leading-relaxed text-neutral-600 dark:text-white/70 transition-colors duration-500"
        >
          Designing a conversational AI assistant for enterprise clients navigating the full reality of product design research, exploration, stakeholder conflict and delivery under constraints.
        </p>

        {/* Meta */}
        <div className="flex flex-wrap gap-8 md:gap-12 mb-20">
          <div className="text-left">
            <h4 className="text-[11px] font-normal mb-2 uppercase tracking-wider text-neutral-500 dark:text-white/50 transition-colors duration-500">Client</h4>
            <div className="inline-block bg-[#F03125] text-white font-bold text-lg px-2.5 py-0.5 tracking-tighter">LEYTON</div>
          </div>
          <div className="text-left">
            <h4 className="text-[11px] font-normal mb-2 uppercase tracking-wider text-neutral-500 dark:text-white/50 transition-colors duration-500">Role</h4>
            <p className="text-[14px] font-light text-neutral-700 dark:text-white/80 transition-colors duration-500">Senior Product Designer</p>
          </div>
          <div className="text-left">
            <h4 className="text-[11px] font-normal mb-2 uppercase tracking-wider text-neutral-500 dark:text-white/50 transition-colors duration-500">Scope</h4>
            <p className="text-[14px] font-light text-neutral-700 dark:text-white/80 transition-colors duration-500">UX Strategy, Flows V1 & V2</p>
          </div>
          <div className="text-left">
            <h4 className="text-[11px] font-normal mb-2 uppercase tracking-wider text-neutral-500 dark:text-white/50 transition-colors duration-500">Status</h4>
            <p className="text-[14px] font-light text-neutral-700 dark:text-white/80 transition-colors duration-500">Live V2 in progress</p>
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

        {/* ─── THE PROBLEM ─── */}
        <section id="the-problem" className="mb-20">
          <h2 className="text-xl md:text-2xl font-normal mb-5 tracking-tight text-neutral-900 dark:text-white">
            The Problem
          </h2>
          <p className="text-[15px] font-light leading-[1.85] text-neutral-600 dark:text-white/70">
            Leyton Cognitive, the AI advisory arm of Leyton, serves enterprise clients in 17 countries. Their commercial teams were spending significant time handling repetitive inquiries, scheduling meetings, and managing inbound calls—tasks that were scalable with AI, but only if users trusted the experience enough to rely on it.
          </p>
          <p className="text-[15px] font-light leading-[1.85] mt-4 text-neutral-600 dark:text-white/70">
            I was the sole designer responsible for everything: UX strategy, conversational flows, interaction design, avatar direction, and internal configuration tooling.
          </p>
        </section>

        {/* ─── MEASURING SUCCESS ─── */}
        <section id="measuring-success" className="mb-20">
          <h2 className="text-xl md:text-2xl font-normal mb-5 tracking-tight text-neutral-900 dark:text-white">
            Measuring Success with the NN/g Framework
          </h2>
          <div className="mb-6">
            <img src={imgNNFramework} alt="UX Strategy Pyramid - NN/g Framework" className="w-full rounded-[16px] border border-black/5 dark:border-white/5 shadow-md" />
          </div>
          <p className="text-[15px] font-light leading-[1.85] text-neutral-600 dark:text-white/70">
            I used the Nielsen Norman Group UX strategy framework to define measurable goals tied to business outcomes . Each metric justified with research benchmarks, not gut feeling.
          </p>
        </section>

        {/* ─── FOUR PRINCIPLES ─── */}
        <section id="four-principles" className="mb-20">
          <h2 className="text-xl md:text-2xl font-normal mb-5 tracking-tight text-neutral-900 dark:text-white">
            Four Principles, Every Decision
          </h2>
          <p className="text-[15px] font-light leading-[1.85] mb-4 text-neutral-600 dark:text-white/70">
            These four principles define what success looks like for Adam from an experience perspective. They are the foundation behind every design and product decision:
          </p>
          <ol className="list-decimal list-inside text-[15px] font-light leading-[1.85] space-y-2 text-neutral-600 dark:text-white/70">
            <li>Trust & Clarity</li>
            <li>Instant Value</li>
            <li>Goals & Measures</li>
            <li>[Principle 4]</li>
          </ol>
          <div className="mt-8 mb-6">
            <img src={imgGoals} alt="Goals and Measures" className="w-full rounded-[16px] border border-black/5 dark:border-white/5 shadow-md" />
          </div>
        </section>

        <div className="w-full h-px bg-black/5 dark:bg-white/5 my-8" />

        {/* ─── THE COLLISION ─── */}
        <section id="the-collision" className="mb-20">
          <h2 className="text-xl md:text-2xl font-normal mb-5 tracking-tight text-neutral-900 dark:text-white">
            The Collision
          </h2>
          <p className="text-[15px] font-light leading-[1.85] mb-4 text-neutral-600 dark:text-white/70">
            Before I joined, the commercial team had already promised the client a branded human avatar wearing a suit with the company logo. The deal was signed around it.
          </p>
          <p className="text-[15px] font-light leading-[1.85] mb-6 text-neutral-600 dark:text-white/70">
            I pushed back using the <strong>Uncanny Valley</strong> effect: as a humanoid figure becomes more realistic, user comfort doesn't increase linearly—it drops sharply before recovering only at full human realism. A photorealistic AI avatar sits right in that danger zone. My manager agreed with the argument, but the commercial commitment didn't move.
          </p>
          <div className="mb-6">
            <img src={imgUncanny} alt="Uncanny Valley Graph" className="w-full rounded-[16px] border border-black/5 dark:border-white/5 shadow-md" />
          </div>
        </section>

        {/* ─── WHAT I EXPLORED ANYWAY ─── */}
        <section id="what-i-explored" className="mb-20">
          <h2 className="text-xl md:text-2xl font-normal mb-5 tracking-tight text-neutral-900 dark:text-white">
            What I Explored Anyway
          </h2>
          <p className="text-[15px] font-light leading-[1.85] mb-4 text-neutral-600 dark:text-white/70">
            Even within the constraint, I ran a proper exploration. If we were going to use a humanoid presence, I wanted to find the direction least likely to trigger discomfort. I explored three directions:
          </p>
          <ol className="list-decimal list-inside text-[15px] font-light leading-[1.85] space-y-2 mb-6 text-neutral-600 dark:text-white/70">
            <li>An abstract orb (my recommendation).</li>
            <li>A robot avatar that preserved human presence without the uncanny valley risk.</li>
            <li>The photorealistic human avatar the stakeholders wanted.</li>
          </ol>
          <div className="mb-6 flex flex-col gap-4">
            <img src={imgExplored1} alt="Avatar Direction Exploration 1" className="w-full rounded-[16px] border border-black/5 dark:border-white/5 shadow-md" />
            <img src={imgExplored2} alt="Avatar Direction Exploration 2" className="w-full rounded-[16px] border border-black/5 dark:border-white/5 shadow-md" />
          </div>
          <p className="text-[15px] font-light leading-[1.85] text-neutral-600 dark:text-white/70">
            The robot was my preferred fallback; it is humanoid enough to feel personal but abstract enough to avoid the discomfort that comes with an "almost real" face. It didn't win either.
          </p>
        </section>

        {/* ─── HOW I ADAPTED ─── */}
        <section id="how-i-adapted" className="mb-20">
          <h2 className="text-xl md:text-2xl font-normal mb-5 tracking-tight text-neutral-900 dark:text-white">
            How I Adapted
          </h2>
          <p className="text-[15px] font-light leading-[1.85] text-neutral-600 dark:text-white/70">
            Once the decision was final, I made a choice: disengage or put on a different hat and make it as good as it could be within the brief. I chose the second. I shifted into a mode using AI-generation tools to create and evaluate avatar options, selecting the most credible and least uncanny result, then handling the lip-sync animation myself. This is the Adam that shipped.
          </p>
        </section>

        {/* ─── THE FLOWS ─── */}
        <section id="the-flows" className="mb-20">
          <h2 className="text-xl md:text-2xl font-normal mb-5 tracking-tight text-neutral-900 dark:text-white">
            The Flows: Where the UX Lives
          </h2>
          <p className="text-[15px] font-light leading-[1.85] mb-6 text-neutral-600 dark:text-white/70">
            Regardless of what avatar sits on top, the interaction design is the part of this project I'm most proud of. This is where the strategy actually shows up.
          </p>
          <div className="mb-6">
            <ImagePlaceholder label="Conversational Flow Maps" aspect="16/9" />
          </div>
          <p className="text-[15px] font-light leading-[1.85] text-neutral-600 dark:text-white/70">
            The chat/booking flow maps every step, error state, and fallback path. One key decision: users can choose how they complete a booking. Adam guides them conversationally, or they can switch to a form. Both paths reach the same success state. This reduced drop-off risk for users uncomfortable with a fully conversational experience.
          </p>
        </section>

        {/* ─── WHAT SHIPPED VS WHAT I DESIGNED ─── */}
        <section id="what-shipped" className="mb-16">
          <h2 className="text-xl md:text-2xl font-normal mb-5 tracking-tight text-neutral-900 dark:text-white">
            What Shipped vs. What I Designed
          </h2>
          <p className="text-[15px] font-light leading-[1.85] mb-4 text-neutral-600 dark:text-white/70">
            The live product is real and running across enterprise clients in 17 countries. The conversational logic, booking flows, error handling, and voice interaction patterns reflect the original work.
          </p>
          <p className="text-[15px] font-light leading-[1.85] mb-4 text-neutral-600 dark:text-white/70">
            The avatar and the landing page don't. The landing page was built by developers independently. The avatar is the one the stakeholders chose.
          </p>
          <p className="text-[15px] font-light leading-[1.85] text-neutral-600 dark:text-white/70">
            I'm noting this directly because product design in practice means delivering quality inside constraints you didn't choose and being clear about where those constraints were.
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
