import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import resumePdf from '../../assets/Marouane Ennebly - Resume.pdf';
import marwanLogo from '../../assets/marwan-logo.svg';

interface HeaderProps {
  onHomeClick?: () => void;
}

export function Header({ onHomeClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0, filter: 'blur(10px)' }}
      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 pt-4 md:pt-6 flex justify-center pointer-events-none"
    >
      <nav
        className="pointer-events-auto w-full max-w-3xl backdrop-blur-md rounded-full px-4 md:px-6 py-2.5 md:py-3 flex items-center justify-between shadow-none navbar border-0"
      >
        {/* Logo — always left */}
        <Link
          to="/"
          onClick={handleHomeClick}
          className="shrink-0 flex items-center"
        >
          <img src={marwanLogo} alt="Marwan Logo" className="h-[30px] w-auto transition-opacity hover:opacity-80" />
        </Link>

        {/* Desktop Navigation — always right */}
        <div
          className="hidden md:flex gap-6 lg:gap-8 items-center font-['Poppins',sans-serif] font-light text-base"
          style={{ color: '#ffffff', transition: 'color 0.6s ease' }}
        >

          <a href="https://www.linkedin.com/in/marouane-ennebly-503481178/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity flex items-center gap-1 group">
            LinkedIn
            <ArrowUpRight size={16} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </a>
          <a href={resumePdf} download target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity flex items-center gap-1 group">
            Resume
            <ArrowUpRight size={16} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
          style={{ color: '#ffffff', transition: 'color 0.6s ease' }}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-4 right-4 mt-4 pointer-events-auto backdrop-blur-md rounded-[20px] p-6 flex flex-col gap-4 font-['Poppins',sans-serif] font-light shadow-2xl border"
          style={{ background: 'rgba(0, 0, 0, 0.95)', color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >

          <a href="https://www.linkedin.com/in/marouane-ennebly-503481178/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity py-2 flex items-center gap-1 group" onClick={() => setMobileMenuOpen(false)}>
            LinkedIn
            <ArrowUpRight size={16} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </a>
          <a href={resumePdf} download target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity py-2 flex items-center gap-1 group" onClick={() => setMobileMenuOpen(false)}>
            Resume
            <ArrowUpRight size={16} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </a>
        </div>
      )}
    </motion.header>
  );
}
