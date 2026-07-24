import React from 'react';

interface ContactButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  label = "Contact Me",
  onClick,
  className = ""
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full font-medium uppercase tracking-widest text-[#302637] transition-all duration-300 hover:scale-105 active:scale-95 px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base cursor-pointer ${className}`}
      style={{
        background: 'linear-gradient(135deg, #A889C2 0%, #C9B6E4 50%, #8D6AAE 100%)',
        boxShadow: '0px 4px 14px rgba(141, 106, 174, 0.35), inset 0px 2px 4px rgba(255, 255, 255, 0.4)',
        outline: '2px solid #F7F1E8',
        outlineOffset: '-3px',
      }}
    >
      {label}
    </button>
  );
};
