import React from 'react';
import { ContactButton } from './ContactButton';

interface FooterProps {
  onContactClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  return (
    <footer id="contact" className="bg-[#F7F1E8] text-[#302637] px-6 md:px-10 py-16 sm:py-24 border-t border-[#8D6AAE]/20 w-full relative z-30">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="hero-heading font-black uppercase text-3xl sm:text-4xl md:text-5xl tracking-tight mb-3">
            Aimen Hafeez
          </h3>
          <p className="text-[#6F6268] uppercase tracking-widest text-xs sm:text-sm font-semibold max-w-md">
            AI/ML Engineer & Software Engineering Specialist building intelligent digital solutions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <a
            href="https://github.com/aimen899"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#8D6AAE] text-[#302637] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#C9B6E4]/25 transition-all duration-300 hover:scale-105"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
            GitHub Profile
          </a>
          <ContactButton onClick={onContactClick} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-[#8D6AAE]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6F6268] font-normal gap-4 text-center sm:text-left">
        <p>© {new Date().getFullYear()} Aimen Hafeez. All rights reserved.</p>
        <p className="uppercase tracking-widest font-semibold">Designed & Developed with React, TypeScript & Framer Motion</p>
      </div>
    </footer>
  );
};
