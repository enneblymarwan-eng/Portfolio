import { Hero } from './components/Hero';
import { WorkSection } from './components/WorkSection';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Hero />
      <WorkSection />
    </motion.main>
  );
}
