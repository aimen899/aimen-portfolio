import React from 'react';
import { FadeIn } from './FadeIn';
import { ContactButton } from './ContactButton';

interface HeroSectionProps {
  onContactClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#F7F1E8]">
      {/* Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-30">
        <nav className="flex items-center justify-between px-4 sm:px-6 md:px-10 pt-6 md:pt-8 w-full gap-2 sm:gap-4">
          <button
            onClick={() => scrollToSection('about')}
            className="text-[#302637] font-medium uppercase tracking-wider text-[10px] sm:text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="text-[#302637] font-medium uppercase tracking-wider text-[10px] sm:text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="text-[#302637] font-medium uppercase tracking-wider text-[10px] sm:text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
          >
            Projects
          </button>
          <a
            href="https://github.com/aimen899"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#302637] font-medium uppercase tracking-wider text-[10px] sm:text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
          >
            GitHub
          </a>
          <button
            onClick={onContactClick || (() => scrollToSection('contact'))}
            className="text-[#302637] font-medium uppercase tracking-wider text-[10px] sm:text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
          >
            Contact
          </button>
        </nav>
      </FadeIn>

      {/* Hero Heading */}
      <div className="w-full overflow-hidden text-center z-0">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5 select-none">
            Hi, i&apos;m Aimen
          </h1>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex items-end justify-between z-20">
        {/* Left Text */}
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#302637] font-normal uppercase tracking-wide leading-snug max-w-[180px] sm:max-w-[240px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            an aspiring ai/ml engineer passionate about building intelligent software and impactful digital experiences
          </p>
        </FadeIn>

        {/* Right Contact Button */}
        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={onContactClick || (() => scrollToSection('contact'))} />
        </FadeIn>
      </div>
    </section>
  );
};
