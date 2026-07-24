import React from 'react';

interface LiveProjectButtonProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  label = "View Project",
  href = "https://github.com/aimen899",
  onClick,
  className = ""
}) => {
  const content = (
    <span className={`inline-flex items-center justify-center rounded-full border-2 border-[#8D6AAE] text-[#302637] font-medium uppercase tracking-widest transition-all duration-300 hover:bg-[#C9B6E4]/25 hover:scale-105 active:scale-95 px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base ${className}`}>
      {label}
    </span>
  );

  const targetUrl = href || "https://github.com/aimen899";

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="inline-block"
    >
      {content}
    </a>
  );
};
