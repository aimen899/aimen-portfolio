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
      className={`relative inline-flex items-center justify-center rounded-full font-medium uppercase tracking-widest text-[#302637] cursor-pointer gpu-layer ${className}`}
      style={{
        background: 'linear-gradient(135deg, #A889C2 0%, #C9B6E4 50%, #8D6AAE 100%)',
        boxShadow: '0px 4px 14px rgba(141, 106, 174, 0.35), inset 0px 2px 4px rgba(255, 255, 255, 0.4)',
        outline: '2px solid #F7F1E8',
        outlineOffset: '-3px',
        padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(2rem, 4vw, 3rem)',
        fontSize: 'clamp(0.7rem, 1.2vw, 0.95rem)',
        transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.06) translateY(-1px)';
        e.currentTarget.style.boxShadow = '0px 8px 28px rgba(141, 106, 174, 0.45), inset 0px 2px 4px rgba(255, 255, 255, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) translateY(0)';
        e.currentTarget.style.boxShadow = '0px 4px 14px rgba(141, 106, 174, 0.35), inset 0px 2px 4px rgba(255, 255, 255, 0.4)';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.96)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1.06) translateY(-1px)';
      }}
    >
      {label}
    </button>
  );
};
