import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import liveShoppingPreview from '../assets/live-shopping.png';

export default function CaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full relative font-['Poppins',sans-serif] text-white selection:bg-white/30 bg-[#1A1A1A]">
      <div className="relative z-20">
        <Header />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full pb-32 pt-32 md:pt-48 relative z-10 px-4 md:px-8 lg:px-16"
      >
        <div className="w-full max-w-3xl mx-auto">
          
          {/* Header & Meta */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-normal leading-[1.15] text-white mb-6 tracking-tight">
              Guided Live Shopping<br />Experience
            </h1>
            <p className="text-lg md:text-xl text-white/70 font-light mb-16 max-w-xl leading-relaxed">
              Designing a calmer, more actionable live commerce<br />flow
            </p>

            <div className="grid grid-cols-3 gap-8 max-w-2xl">
              <div>
                <h4 className="text-[13px] font-normal text-white mb-3">Client</h4>
                {/* CSS HSE Logo replica */}
                <div className="inline-block bg-[#F03125] text-white font-bold text-xl px-2 py-0.5 tracking-tighter">
                  HSE
                </div>
              </div>
              <div>
                <h4 className="text-[13px] font-normal text-white mb-3">Role</h4>
                <p className="text-[15px] text-white/70 font-light">UI/UX Design</p>
              </div>
              <div>
                <h4 className="text-[13px] font-normal text-white mb-3">Date</h4>
                <p className="text-[15px] text-white/70 font-light">Fev 2026</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full mb-24 overflow-hidden rounded-[24px]">
            <img src={liveShoppingPreview} alt="Live Shopping Experience" className="w-full h-auto object-cover" />
          </div>

          {/* Content Sections */}
          <div className="max-w-3xl space-y-10">
            <section>
              <h2 className="text-2xl md:text-[32px] font-normal text-white mb-6 tracking-tight">The Problem</h2>
              <p className="text-[15px] md:text-[17px] text-white/70 font-light leading-[1.8]">
                Live shopping struggles with retention, engagement, and conversion, but these issues come from the same place. Users enter a stream without understanding its value, feel overwhelmed by interactions, and hesitate when it comes to purchasing. The experience asks too much too quickly, which leads to early drop-off and low action.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-[32px] font-normal text-white mb-6 tracking-tight">The Persona</h2>
              <p className="text-[15px] md:text-[17px] text-white/70 font-light leading-[1.8]">
                A mobile-first user scrolling in the evening, looking for quick inspiration. She observes before engaging, avoids noisy interactions, and prefers clarity over exploration.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-[32px] font-normal text-white mb-6 tracking-tight">Approach</h2>
              <p className="text-[15px] md:text-[17px] text-white/70 font-light leading-[1.8]">
                The focus was to reduce effort at every step. Instead of adding features, the experience guides users from understanding to action with minimal friction.
              </p>
            </section>
          </div>

          {/* CSS Wireframe Placeholder */}
          <div className="w-full mt-24 aspect-[4/3] md:aspect-[16/9] bg-[#222222] rounded-[32px] overflow-hidden flex justify-center items-end border border-white/5 relative">
            {/* The phone wireframe */}
            <div className="w-[280px] md:w-[340px] h-[85%] bg-white rounded-t-[32px] p-4 flex flex-col gap-4 relative shadow-2xl">
              {/* Header */}
              <div className="w-full h-8 flex justify-between items-center border-b border-black/10 pb-2">
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-black/20" />
                  <div className="w-1 h-1 rounded-full bg-black/20" />
                  <div className="w-1 h-1 rounded-full bg-black/20" />
                </div>
                <div className="text-[10px] font-bold tracking-widest text-black/40">HSE</div>
                <div className="w-4 h-4 rounded-full border border-black/20" />
              </div>

              {/* Video Player Box */}
              <div className="w-full aspect-[4/5] bg-black/5 rounded-xl border border-black/10 flex justify-center items-center relative">
                <div className="absolute top-2 left-2 text-[8px] font-bold tracking-widest bg-black text-white px-1.5 py-0.5 rounded">LIVE NOW</div>
                <div className="w-12 h-12 rounded-full border-2 border-black/10 flex justify-center items-center">
                  <div className="w-0 h-0 border-t-4 border-t-transparent border-l-[6px] border-l-black/20 border-b-4 border-b-transparent ml-1" />
                </div>
              </div>

              {/* Bottom Cards */}
              <div className="flex gap-2">
                <div className="w-1/2 aspect-square bg-black/5 border border-black/10 rounded-lg flex flex-col justify-end p-2">
                  <div className="w-full h-4 bg-black p-1 flex justify-center items-center rounded text-[8px] text-white font-bold">BUY NOW</div>
                </div>
                <div className="w-1/2 aspect-square bg-black/5 border border-black/10 rounded-lg" />
              </div>
            </div>
          </div>
          
          {/* Footer Navigation */}
          <div className="mt-24 pt-12 border-t border-white/10 flex justify-between items-center px-4">
            <button className="text-white/50 hover:text-white transition-colors text-sm uppercase tracking-widest flex items-center gap-4">
              <span className="text-xl">←</span> Previous
            </button>
            <button className="text-white hover:text-white transition-colors text-sm uppercase tracking-widest flex items-center gap-4">
              Next <span className="text-xl">→</span>
            </button>
          </div>

        </div>
      </motion.div>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
