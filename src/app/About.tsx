import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SkySlider } from './components/SkySlider';
import { useSky } from './SkyContext';

export default function About() {
  const { state } = useSky();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full relative font-['Poppins',sans-serif] text-white selection:bg-white/30">
      {/* Fixed background gradient */}
      <div 
        className="fixed inset-0 z-0 transition-all duration-[800ms] ease-in-out"
        style={{ background: state.gradient }}
      />
      
      <div className="relative z-20">
        <Header />
      </div>

      <SkySlider />

      <main className="w-full pb-32 pt-40 md:pt-56 relative z-10 px-4 md:px-6 max-w-3xl mx-auto">
        
        {/* Section 1 — Introduction */}
        <section className="mb-24">
          <div className="flex flex-col gap-8">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 shrink-0"></div>
            <div className="text-base md:text-[17px] font-light text-white/80 leading-[1.85] space-y-6">
              <p>
                I'm Marwan, a product designer based in Casablanca with 7 years of experience building digital products that actually ship and reach real people.
              </p>
              <p>
                I care about the craft — the thinking behind a flow, the decision behind a component, the reason a word is placed where it is. But I care more about impact. Design that doesn't reach people doesn't count.
              </p>
              <p>
                When I'm not in Figma, I'm playing guitar in the afternoon when the work is done, sketching something for no reason, or being a father to a 5-year-old who is, objectively, the best person I know. I'm mostly indoors, fairly introverted, and I do my best thinking alone with good music on.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 md:gap-4 mt-12">
            <div className="aspect-[4/3] rounded-xl md:rounded-2xl bg-white/5"></div>
            <div className="aspect-[4/3] rounded-xl md:rounded-2xl bg-white/5"></div>
            <div className="aspect-[4/3] rounded-xl md:rounded-2xl bg-white/5"></div>
          </div>
        </section>

        {/* Section 2 — Timeline */}
        <section className="mb-28">
          <div className="relative border-l border-white/10 pl-6 md:pl-8 py-2 space-y-12">
            
            <div className="relative">
              <div className="absolute w-2 h-2 rounded-full bg-white/20 -left-[29px] md:-left-[37px] top-1.5"></div>
              <div className="flex flex-col md:flex-row md:gap-8 items-start">
                <span className="text-[13px] md:text-sm font-medium text-white/50 w-24 shrink-0 mb-1.5 md:mb-0">2014–2016</span>
                <p className="text-[15px] font-light text-white/70 leading-relaxed">
                  Infodesign Sup. Learning the fundamentals of visual and digital design.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute w-2 h-2 rounded-full bg-white/20 -left-[29px] md:-left-[37px] top-1.5"></div>
              <div className="flex flex-col md:flex-row md:gap-8 items-start">
                <span className="text-[13px] md:text-sm font-medium text-white/50 w-24 shrink-0 mb-1.5 md:mb-0">2016–2021</span>
                <p className="text-[15px] font-light text-white/70 leading-relaxed">
                  Worked with OCP, HSE, Leyton, and Spark Academy across brand, product, and UX.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute w-2 h-2 rounded-full bg-white/20 -left-[29px] md:-left-[37px] top-1.5"></div>
              <div className="flex flex-col md:flex-row md:gap-8 items-start">
                <span className="text-[13px] md:text-sm font-medium text-white/50 w-24 shrink-0 mb-1.5 md:mb-0">2021</span>
                <p className="text-[15px] font-light text-white/70 leading-relaxed">
                  Launched CMatch. First 0→1 product. 1,000+ real users on iOS and Android.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute w-2 h-2 rounded-full bg-white/20 -left-[29px] md:-left-[37px] top-1.5"></div>
              <div className="flex flex-col md:flex-row md:gap-8 items-start">
                <span className="text-[13px] md:text-sm font-medium text-white/50 w-24 shrink-0 mb-1.5 md:mb-0">2022</span>
                <p className="text-[15px] font-light text-white/70 leading-relaxed">
                  Published Tooltipo on Figma Community. 667 designers using it.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute w-2 h-2 rounded-full bg-white/20 -left-[29px] md:-left-[37px] top-1.5"></div>
              <div className="flex flex-col md:flex-row md:gap-8 items-start">
                <span className="text-[13px] md:text-sm font-medium text-white/50 w-24 shrink-0 mb-1.5 md:mb-0">2023–2024</span>
                <p className="text-[15px] font-light text-white/70 leading-relaxed">
                  Designed Adam, a conversational AI assistant embedded in enterprise client websites.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute w-2 h-2 rounded-full bg-white/20 -left-[29px] md:-left-[37px] top-1.5"></div>
              <div className="flex flex-col md:flex-row md:gap-8 items-start">
                <span className="text-[13px] md:text-sm font-medium text-white/50 w-24 shrink-0 mb-1.5 md:mb-0">2025</span>
                <p className="text-[15px] font-light text-white/70 leading-relaxed">
                  Won a UI/UX contract with OCP. Started building Sukoon.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute w-2.5 h-2.5 rounded-full bg-[var(--sky-border)] -left-[29px] md:-left-[38px] top-1.5 shadow-[0_0_12px_var(--sky-border)]"></div>
              <div className="flex flex-col md:flex-row md:gap-8 items-start">
                <span className="text-[13px] md:text-sm font-semibold w-24 shrink-0 mb-1.5 md:mb-0" style={{ color: 'var(--sky-text)' }}>Now</span>
                <p className="text-[15px] font-medium text-white/90 leading-relaxed">
                  Designing products that matter. Available for remote contracts.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Section 3 — Vision */}
        <section className="mb-8">
          <div className="text-[18px] md:text-[21px] font-light text-white/90 leading-[1.65] space-y-6">
            <p>
              The products I'm most drawn to are the ones that solve problems that actually matter. Not another dashboard. Not another productivity tool. But products that reach people who genuinely need them.
            </p>
            <p>
              Sukoon came from that place. Mental health in the Muslim world carries a stigma that stops people from getting help. Therapists are expensive, access is limited, and talking about your struggles is still considered weakness in many communities. I'm building Sukoon to change that — an AI-powered space where Muslims can speak freely, in their language, within their cultural context, without shame.
            </p>
            <p>
              It's early. But it's the most important thing I'm working on.
            </p>
          </div>
        </section>

      </main>

      <div className="relative z-10 pt-20">
        <Footer />
      </div>
    </div>
  );
}
