import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export const LIGHTING_STATES = [
  { id: 'dawn', label: 'Dawn', gradient: 'linear-gradient(180deg, #B8A9C9 0%, #E8C5B0 100%)', dominantColor: '#B8A9C9', filter: 'sepia(30%) hue-rotate(-15deg)', y: 40 },
  { id: 'morning', label: 'Morning', gradient: 'linear-gradient(180deg, #87CEEB 0%, #B0D4F1 100%)', dominantColor: '#87CEEB', filter: 'saturate(110%) hue-rotate(10deg)', y: 21.25 },
  { id: 'midday', label: 'Midday', gradient: 'linear-gradient(217.826deg, rgb(91, 148, 212) 18.537%, rgb(2, 73, 148) 65.718%)', dominantColor: '#024994', filter: 'none', y: 15 },
  { id: 'golden', label: 'Evening', gradient: 'linear-gradient(180deg, #425275 0%, #B85F75 50%, #F5A373 100%)', dominantColor: '#B85F75', filter: 'sepia(30%) saturate(140%) hue-rotate(-10deg) brightness(110%)', y: 21.25 },
  { id: 'dusk', label: 'Dusk', gradient: 'linear-gradient(180deg, #0B1021 0%, #1B1E44 50%, #3A235D 100%)', dominantColor: '#1B1E44', filter: 'brightness(50%) contrast(120%) saturate(140%) hue-rotate(40deg)', y: 40 },
];

interface SkyContextType {
  timeIndex: number;
  setTimeIndex: (i: number) => void;
  state: typeof LIGHTING_STATES[0];
}

const SkyContext = createContext<SkyContextType>({
  timeIndex: 2,
  setTimeIndex: () => {},
  state: LIGHTING_STATES[2],
});

function getInitialTimeIndex(): number {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 7) return 0;   // dawn
  if (hour >= 7 && hour < 12) return 1;  // morning
  if (hour >= 12 && hour < 17) return 2; // midday
  if (hour >= 17 && hour < 20) return 3; // golden
  return 4;                               // dusk
}

export function SkyProvider({ children }: { children: ReactNode }) {
  const [timeIndex, setTimeIndex] = useState(getInitialTimeIndex);
  const state = LIGHTING_STATES[timeIndex];

  useEffect(() => {
    document.documentElement.setAttribute('data-sky', state.id);
    document.documentElement.style.setProperty('--sky-gradient', state.gradient);
    document.documentElement.style.setProperty('--sky-dominant', state.dominantColor);
  }, [state.id, state.gradient, state.dominantColor]);

  return (
    <SkyContext.Provider value={{ timeIndex, setTimeIndex, state }}>
      {children}
    </SkyContext.Provider>
  );
}

export function useSky() {
  return useContext(SkyContext);
}
