import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharacterProps {
  char: string;
  range: [number, number];
  progress: MotionValue<number>;
}

const Character: React.FC<CharacterProps> = ({ char, range, progress }) => {
  const opacity = useTransform(progress, range, [0.25, 1]);
  return (
    <span className="relative inline-block">
      <span className="opacity-25 text-[#6F6268]">{char}</span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0 text-[#302637]">
        {char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = "" }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  let charCount = 0;
  const totalChars = text.length;

  return (
    <p
      ref={containerRef}
      className={`text-[#302637] font-medium text-center leading-relaxed max-w-[560px] ${className}`}
      style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
    >
      {words.map((word, wordIdx) => {
        const chars = word.split('');
        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.28em]">
            {chars.map((char, charIdx) => {
              const start = charCount / totalChars;
              charCount++;
              const end = charCount / totalChars;
              return (
                <Character
                  key={charIdx}
                  char={char}
                  range={[start, end]}
                  progress={scrollYProgress}
                />
              );
            })}
          </span>
        );
      })}
    </p>
  );
};
