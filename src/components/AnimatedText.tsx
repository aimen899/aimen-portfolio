import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface WordProps {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}

const Word: React.FC<WordProps> = ({ word, range, progress }) => {
  const opacity = useTransform(progress, range, [0.25, 1]);
  return (
    <span className="relative inline-block mr-[0.28em]">
      <span className="opacity-25 text-[#6F6268]">{word}</span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0 text-[#302637]">
        {word}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.25'],
  });

  const wordsWithRanges = useMemo(() => {
    const words = text.split(' ');
    const totalWords = words.length;
    return words.map((word, i) => ({
      word,
      range: [i / totalWords, (i + 1) / totalWords] as [number, number],
    }));
  }, [text]);

  return (
    <p
      ref={containerRef}
      className={`text-[#302637] font-medium text-center leading-relaxed max-w-[560px] ${className}`}
      style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
    >
      {wordsWithRanges.map(({ word, range }, idx) => (
        <Word key={idx} word={word} range={range} progress={scrollYProgress} />
      ))}
    </p>
  );
};
