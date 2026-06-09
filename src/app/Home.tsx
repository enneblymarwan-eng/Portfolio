import { Hero } from './components/Hero';
import { WorkSection } from './components/WorkSection';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <motion.main 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Hero />
      <WorkSection />
    </motion.main>
  );
}
