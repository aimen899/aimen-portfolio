import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';

interface Project {
  number: string;
  name: string;
  category: string;
  description: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
  link: string;
}

const PROJECTS: Project[] = [
  {
    number: '01',
    name: 'AI Loan Approval Predictor',
    category: 'AI / Machine Learning',
    description:
      'Developed a machine learning model using Random Forest to predict loan approval decisions from applicant data. Performed data preprocessing, feature engineering, model training, hyperparameter tuning, and evaluation using Scikit-learn to deliver accurate and reliable predictions.',
    col1Image1: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    col1Image2: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    col2Image: '/images/loan-dashboard.png',
    link: 'https://github.com/aimen899/ai-loan-approval',
  },
  {
    number: '02',
    name: 'AI Product Recommendation System',
    category: 'AI Application',
    description:
      'Built an AI-powered recommendation system achieving 89% accuracy using machine learning techniques to analyze user preferences and generate personalized product recommendations through intelligent filtering and ranking algorithms.',
    col1Image1: '/images/recommender-home.png',
    col1Image2: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80',
    col2Image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    link: 'https://github.com/aimen899/PriceMind-AI',
  },
  {
    number: '03',
    name: 'Pharmacy Management System',
    category: 'Software Engineering',
    description:
      'Developed a web-based pharmacy management system using Node.js, HTML, CSS, JavaScript, and SQL Server. Features include medicine inventory, supplier management, billing, shopping cart, sales tracking, purchases, search functionality, and low-stock alerts.',
    col1Image1: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    col1Image2: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    col2Image: '/images/pharmacy-dashboard.png',
    link: 'https://github.com/aimen899/Pharmacy-Database-Management-System',
  },
];

interface CardProps {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const Card: React.FC<CardProps> = ({ project, index, progress, range, targetScale }) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="h-[85vh] sm:h-[90vh] flex items-center justify-center sticky top-20 md:top-28 w-full">
      <motion.div
        style={{
          scale,
          top: `calc(${index * 24}px)`,
        }}
        className="w-full relative rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border-2 border-[#8D6AAE]/35 bg-[#F9F5EE] p-4 sm:p-6 md:p-8 flex flex-col justify-between origin-top shadow-[0_12px_36px_rgba(141,106,174,0.18)] overflow-hidden"
      >
        {/* Top Row: Number, Category, Project Name, View Project Button */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 sm:mb-8 border-b border-[#8D6AAE]/20 pb-6">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <span
              className="font-black text-[#8D6AAE] leading-none select-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 80px)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-[#6F6268] uppercase tracking-widest text-xs sm:text-sm font-semibold">
                {project.category}
              </span>
              <h3
                className="font-bold text-[#302637] uppercase tracking-tight"
                style={{ fontSize: 'clamp(1.2rem, 3vw, 2.2rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center justify-between lg:justify-end gap-4">
            <p className="hidden xl:block text-[#6F6268] text-xs md:text-sm max-w-md line-clamp-2 leading-relaxed font-normal">
              {project.description}
            </p>
            <LiveProjectButton
              label="View Project"
              href={project.link}
            />
          </div>
        </div>

        {/* Project Description (Mobile/Tablet visible) */}
        <p className="block xl:hidden text-[#6F6268] text-xs sm:text-sm mb-4 leading-relaxed max-w-3xl">
          {project.description}
        </p>

        {/* Bottom Row: Two-Column Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 w-full items-stretch">
          {/* Left Column (40% width -> md:col-span-5) - 2 Stacked Images */}
          <div className="md:col-span-5 flex flex-col gap-4 sm:gap-6 justify-between">
            <div className="w-full overflow-hidden rounded-[24px] sm:rounded-[36px] md:rounded-[40px] border border-[#8D6AAE]/25 bg-[#E8DDF2]">
              <img
                src={project.col1Image1}
                alt={`${project.name} Screenshot 1`}
                className="w-full object-cover rounded-[24px] sm:rounded-[36px] md:rounded-[40px] hover:scale-105 transition-transform duration-500"
                style={{ height: 'clamp(130px, 16vw, 230px)' }}
              />
            </div>
            <div className="w-full overflow-hidden rounded-[24px] sm:rounded-[36px] md:rounded-[40px] border border-[#8D6AAE]/25 bg-[#E8DDF2]">
              <img
                src={project.col1Image2}
                alt={`${project.name} Screenshot 2`}
                className="w-full object-cover rounded-[24px] sm:rounded-[36px] md:rounded-[40px] hover:scale-105 transition-transform duration-500"
                style={{ height: 'clamp(160px, 22vw, 340px)' }}
              />
            </div>
          </div>

          {/* Right Column (60% width -> md:col-span-7) - 1 Tall Image */}
          <div className="md:col-span-7 w-full overflow-hidden rounded-[24px] sm:rounded-[36px] md:rounded-[40px] border border-[#8D6AAE]/25 bg-[#E8DDF2] h-full min-h-[250px] sm:min-h-[320px]">
            <img
              src={project.col2Image}
              alt={`${project.name} Dashboard`}
              className="w-full h-full object-cover rounded-[24px] sm:rounded-[36px] md:rounded-[40px] hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="bg-[#F7F1E8] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] relative z-20 px-5 sm:px-8 md:px-10 pt-20 pb-32 w-full"
    >
      {/* Heading */}
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center leading-none mb-24 sm:mb-32 select-none"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      {/* Sticky Cards Stacking Stack */}
      <div className="relative max-w-6xl mx-auto flex flex-col items-center mt-16">
        {PROJECTS.map((project, index) => {
          const targetScale = 1 - (PROJECTS.length - 1 - index) * 0.03;
          const range: [number, number] = [index * (1 / PROJECTS.length), 1];

          return (
            <Card
              key={project.number}
              project={project}
              index={index}
              progress={scrollYProgress}
              range={range}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
};
