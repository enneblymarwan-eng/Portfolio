import { useState, useEffect, useRef } from 'react';
import imgImage1 from "../assets/3f0c8130ea39b3cbf88a5ebb7b42796f8b0ff6ee.png";
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WorkSection } from './components/WorkSection';
import { DecorativeElements } from './components/DecorativeElements';
import { Footer } from "./components/Footer";
import { SkySlider } from './components/SkySlider';
import { useSky } from './SkyContext';
import Galaxy from './components/Galaxy';
import { SmoothCursor } from './components/SmoothCursor';


export default function App() {
  const { state } = useSky();
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const cloud1Ref = useRef<HTMLDivElement>(null);
  const cloud2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position from -0.5 to 0.5
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      
      // Apply subtle transform, multiplying by a smaller pixel factor (e.g. 20px)
      if (cloud1Ref.current) {
        cloud1Ref.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
      }
      // Second cloud moves in the opposite direction for depth
      if (cloud2Ref.current) {
        cloud2Ref.current.style.transform = `translate(${x * -12}px, ${y * -12}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden font-['Poppins',sans-serif]">
      {/* Fixed background gradient — stays locked to viewport */}
      <div 
        className="fixed inset-0 z-0 transition-all duration-[800ms] ease-in-out"
        style={{ background: state.gradient }}
      />

      {/* Galaxy overlay — dusk/night only */}
      {state.id === 'dusk' && (
        <div className="fixed inset-0 z-[1] pointer-events-none" style={{ opacity: 0.55, mixBlendMode: 'screen' }}>
          <Galaxy
            mouseRepulsion={false}
            mouseInteraction={true}
            density={0.8}
            glowIntensity={0.12}
            saturation={0}
            hueShift={0}
            twinkleIntensity={0.2}
            rotationSpeed={0.005}
            starSpeed={0.1}
            speed={0.2}
            transparent={true}
          />
        </div>
      )}
      


      {/* Background Cloud Images — drifts slowly right */}
      <div
        className="fixed -left-52 -top-[420px] w-[1047px] h-[601px] pointer-events-none z-[1] cloud-right"
        style={{ filter: state.filter }}
      >
        <div ref={cloud1Ref} className="absolute inset-0 w-full h-full transition-transform duration-100 ease-out">
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover w-full h-full"
            src={imgImage1}
          />
        </div>
      </div>

      {/* Second Background Cloud — drifts slowly left, locked in bottom right of viewport */}
      <div
        className="fixed w-[1559px] h-[899px] pointer-events-none z-[1] cloud-work -right-[1050px] -bottom-[600px] md:-bottom-[300px]"
        style={{ filter: state.filter }}
      >
        <div ref={cloud2Ref} className="absolute inset-0 w-full h-full transition-transform duration-100 ease-out">
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover w-full h-full"
            src={imgImage1}
          />
        </div>
      </div>

      {/* Decorative Shooting Stars */}
      <DecorativeElements />

      <SmoothCursor />

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