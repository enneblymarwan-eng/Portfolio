import { useState } from 'react';
import imgImage1 from "../assets/3f0c8130ea39b3cbf88a5ebb7b42796f8b0ff6ee.png";
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WorkSection } from './components/WorkSection';
import { DecorativeElements } from './components/DecorativeElements';
import { Footer } from "./components/Footer";
import { SkySlider } from './components/SkySlider';
import { useSky } from './SkyContext';


export default function App() {
  const { state } = useSky();
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden font-['Poppins',sans-serif]">
      {/* Fixed background gradient — stays locked to viewport */}
      <div 
        className="fixed inset-0 z-0 transition-all duration-[800ms] ease-in-out"
        style={{ background: state.gradient }}
      />
      


      {/* Background Cloud Images — drifts slowly right */}
      <div
        className="fixed -left-52 -top-[420px] w-[1047px] h-[601px] pointer-events-none z-[1] cloud-right"
        style={{ filter: state.filter }}
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover w-full h-full"
          src={imgImage1}
        />
      </div>

      {/* Second Background Cloud — drifts slowly left, locked in bottom right of viewport */}
      <div
        className="fixed w-[1559px] h-[899px] pointer-events-none z-[1] cloud-work -right-[1050px] -bottom-[600px] md:-bottom-[300px]"
        style={{ filter: state.filter }}
      >
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover w-full h-full"
          src={imgImage1}
        />
      </div>

      {/* Decorative Shooting Stars */}
      <DecorativeElements />

      {/* Main Content */}
      <div className="relative z-10">
        {!caseStudyOpen && (
          <Header onHomeClick={() => setCaseStudyOpen(false)} />
        )}
        <SkySlider forceHidden={caseStudyOpen} />

        <main className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Hero hidden={caseStudyOpen} />
          <WorkSection 
            cloudFilter={state.filter} 
            caseStudyOpen={caseStudyOpen}
            onCaseStudyChange={setCaseStudyOpen}
          />
        </main>
        
        <div style={{ display: caseStudyOpen ? 'none' : 'block' }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}