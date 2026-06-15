import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative px-4 md:px-8 lg:px-16 py-12 md:py-20 mt-10 border-t z-10 pointer-events-auto"
      style={{ borderColor: 'var(--sky-border)' }}>
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
        
        {/* Call to Action */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="font-['Poppins',sans-serif] text-3xl md:text-5xl mb-6 tracking-tight"
          style={{ lineHeight: "1.2", color: 'var(--sky-text)', transition: 'color 0.6s ease' }}
        >
          Let's build something <br className="hidden md:block"/> extraordinary together.
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-['Poppins',sans-serif] font-light max-w-lg mb-10 text-lg"
          style={{ color: 'var(--sky-text-70)', transition: 'color 0.6s ease' }}
        >
          I'm currently available for freelance work or full-time roles. If you have a project that needs some creative juice, I'd love to hear about it.
        </motion.p>
        
        <motion.a
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          href="mailto:enneblymarwan@gmail.com"
          className="flex items-center justify-center gap-2 border backdrop-blur-md px-8 py-4 rounded-full font-medium tracking-wide hover:brightness-110 transition-all font-['Poppins',sans-serif] footer-btn"
          style={{ borderColor: 'var(--sky-border)', color: 'var(--sky-text)', transition: 'color 0.6s ease, border-color 0.6s ease' }}
        >
          Get in touch: enneblymarwan@gmail.com <ArrowRight className="w-5 h-5 ml-1" />
        </motion.a>

        {/* Separator line */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full h-px my-16 origin-center"
          style={{ backgroundColor: 'var(--sky-border)' }}
        />

        {/* Bottom links grid */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-['Poppins',sans-serif]"
          style={{ color: 'var(--sky-text-50)', transition: 'color 0.6s ease' }}
        >
          <p>© {new Date().getFullYear()} Marwan. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://www.linkedin.com/in/marouane-ennebly-503481178/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity" style={{ color: 'var(--sky-text-50)' }}>LinkedIn</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
