import React, { useEffect, useRef, useState } from 'react';

const GIF_IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  const row1Images = [...GIF_IMAGES.slice(0, 11), ...GIF_IMAGES.slice(0, 11), ...GIF_IMAGES.slice(0, 11)];
  const row2Images = [...GIF_IMAGES.slice(11, 21), ...GIF_IMAGES.slice(11, 21), ...GIF_IMAGES.slice(11, 21)];

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setScrollOffset(offset);
    };

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const transformRow1 = scrollOffset - 200;
  const transformRow2 = -(scrollOffset - 200);

  return (
    <section
      ref={sectionRef}
      className="bg-[#F7F1E8] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full"
    >
      <div className="flex flex-col gap-4">
        {/* Row 1 - Moves RIGHT on scroll */}
        <div
          className="flex gap-4 whitespace-nowrap transition-transform duration-75 ease-out"
          style={{
            transform: `translateX(${transformRow1}px)`,
            willChange: 'transform',
          }}
        >
          {row1Images.map((src, idx) => (
            <div
              key={`row1-${idx}`}
              className="w-[300px] sm:w-[380px] md:w-[420px] h-[190px] sm:h-[240px] md:h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#E8DDF2] border border-[#8D6AAE]/25 shadow-md"
            >
              <img
                src={src}
                alt={`Portfolio Showcase ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl transform transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Row 2 - Moves LEFT on scroll */}
        <div
          className="flex gap-4 whitespace-nowrap transition-transform duration-75 ease-out"
          style={{
            transform: `translateX(${transformRow2}px)`,
            willChange: 'transform',
          }}
        >
          {row2Images.map((src, idx) => (
            <div
              key={`row2-${idx}`}
              className="w-[300px] sm:w-[380px] md:w-[420px] h-[190px] sm:h-[240px] md:h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-[#E8DDF2] border border-[#8D6AAE]/25 shadow-md"
            >
              <img
                src={src}
                alt={`Portfolio Showcase ${idx + 12}`}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl transform transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
