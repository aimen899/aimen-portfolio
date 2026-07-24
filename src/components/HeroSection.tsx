import React from 'react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import avatarStylizedGirl from '../assets/aimen_3d_stylized_girl_avatar.png';

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
        <nav className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 w-full">
          <button
            onClick={() => scrollToSection('about')}
            className="text-[#302637] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="text-[#302637] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
          >
            Price
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="text-[#302637] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
          >
            Projects
          </button>
          <a
            href="https://github.com/aimen899"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#302637] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
          >
            GitHub
          </a>
          <button
            onClick={onContactClick || (() => scrollToSection('contact'))}
            className="text-[#302637] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
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

      {/* Stylized 3D Girl Avatar Head Bust (Floating Transparent Cutout) */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 top-[45%] -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
        <FadeIn delay={0.6} y={30}>
          <Magnet>
            <img
              src={avatarStylizedGirl}
              alt="Aimen Hafeez Stylized 3D Girl Avatar"
              className="w-[360px] sm:w-[480px] md:w-[580px] lg:w-[680px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(141,106,174,0.35)] select-none pointer-events-none"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex items-end justify-between z-20">
        {/* Left Text */}
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#302637] font-normal uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
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
