import React from 'react';
import { FadeIn } from './FadeIn';

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
    title: 'UI/UX Design',
    description: 'Creating intuitive, responsive, and visually appealing user experiences with a focus on usability.',
  },
  {
    number: '05',
    title: 'Cloud & MLOps',
    description: 'Deploying applications and automating infrastructure using cloud technologies and modern DevOps practices.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-[#E8DDF2] text-[#302637] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 w-full relative z-10 shadow-lg"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="font-black uppercase text-center text-[#302637] leading-none mb-16 sm:mb-20 md:mb-28 select-none"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Services
          </h2>
        </FadeIn>

        {/* Services List */}
        <div className="flex flex-col">
          {SERVICES.map((service, index) => (
            <FadeIn key={service.number} delay={index * 0.1} y={30}>
              <div
                className={`py-8 sm:py-10 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12 ${
                  index !== SERVICES.length - 1 ? 'border-b border-[#8D6AAE]/25' : ''
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
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
