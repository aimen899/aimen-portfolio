import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'Machine Learning',
    description: 'Building predictive models, recommendation systems, and intelligent applications using modern ML techniques.',
  },
  {
    number: '02',
    title: 'AI Development',
    description: 'Designing AI-powered software solutions that automate tasks and deliver data-driven insights.',
  },
  {
    number: '03',
    title: 'Software Development',
    description: 'Developing scalable web and desktop applications using modern programming languages and frameworks.',
  },
  {
    number: '04',
    title: 'Full Stack Web Development',
    description: 'Building end-to-end web applications with modern front-end and back-end technologies, focusing on performance, scalability, and seamless user experiences.',
  },
  {
    number: '05',
    title: 'Cloud & MLOps',
    description: 'Deploying applications and automating infrastructure using cloud technologies and modern DevOps practices.',
  },
];

const ServiceRow: React.FC<{ service: ServiceItem; index: number; total: number }> = ({ service, index, total }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -30]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, willChange: 'transform, opacity' }}
    >
      <div
        className={`py-8 sm:py-10 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12 ${index !== total - 1 ? 'border-b border-[#8D6AAE]/25' : ''
          }`}
      >
        {/* Number */}
        <div
          className="font-black text-[#8D6AAE] leading-none select-none min-w-[100px] sm:min-w-[140px] md:min-w-[180px]"
          style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
        >
          {service.number}
        </div>

        {/* Content Right */}
        <div className="flex-1 flex flex-col gap-2 md:gap-3">
          <h3
            className="font-bold uppercase text-[#302637] tracking-tight"
            style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
          >
            {service.title}
          </h3>
          <p
            className="font-normal text-[#6F6268] leading-relaxed max-w-2xl"
            style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
          >
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const ServicesSection: React.FC = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: headingProgress } = useScroll({
    target: headingRef,
    offset: ['start end', 'end start'],
  });
  const headingOpacity = useTransform(headingProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const headingY = useTransform(headingProgress, [0, 0.25, 0.75, 1], [60, 0, 0, -20]);

  return (
    <section
      id="services"
      className="bg-[#E8DDF2] text-[#302637] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 w-full relative z-10 shadow-lg"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.h2
          ref={headingRef}
          style={{ opacity: headingOpacity, y: headingY, fontSize: 'clamp(3rem, 12vw, 160px)', willChange: 'transform, opacity' }}
          className="font-black uppercase text-center text-[#302637] leading-none mb-16 sm:mb-20 md:mb-28 select-none"
        >
          Services
        </motion.h2>

        {/* Services List */}
        <div className="flex flex-col">
          {SERVICES.map((service, index) => (
            <ServiceRow
              key={service.number}
              service={service}
              index={index}
              total={SERVICES.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
