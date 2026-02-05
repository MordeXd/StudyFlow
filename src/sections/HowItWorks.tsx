import { useRef, useLayoutEffect } from 'react';
import { Users, GitBranch, BarChart3 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: Users,
    title: 'Work together without the mess.',
    description:
      'Assign owners, comment on tasks, and resolve feedback fast—so everyone knows what\'s next.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  },
  {
    number: '02',
    icon: GitBranch,
    title: 'Built for how students actually work.',
    description:
      'From research to final review, keep every step organized—without endless threads or lost files.',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
  },
  {
    number: '03',
    icon: BarChart3,
    title: 'See progress at a glance.',
    description:
      'Track completion, spot blockers early, and present results with built-in analytics.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const stepElements = stepsRef.current?.querySelectorAll('.step-item');
    if (!section || !header || !stepElements) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      });

      // Steps animation
      stepElements.forEach((step, index) => {
        const isEven = index % 2 === 0;
        const image = step.querySelector('.step-image');
        const content = step.querySelector('.step-content');
        const number = step.querySelector('.step-number');
        const square = step.querySelector('.decorative-square');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });

        // Image slides in
        tl.from(
          image,
          {
            x: isEven ? -60 : 60,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          0
        );

        // Content slides in
        tl.from(
          content,
          {
            x: isEven ? 40 : -40,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          0.1
        );

        // Number rotates in
        tl.from(
          number,
          {
            rotation: 360,
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(1.7)',
          },
          0.2
        );

        // Decorative square
        tl.from(
          square,
          {
            scale: 0.6,
            rotation: isEven ? -10 : 10,
            opacity: 0,
            duration: 0.5,
            ease: 'back.out(1.7)',
          },
          0.3
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-24 lg:py-32 bg-background z-30"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span className="label-uppercase text-[#B9FF47] mb-4 block">
            How It Works
          </span>
          <h2
            className="text-[clamp(32px,3.6vw,52px)] font-semibold leading-tight"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Three steps to{' '}
            <span className="text-[#B9FF47]">better projects</span>
          </h2>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="space-y-24 lg:space-y-32">
          {steps.map((step, index) => (
            <StepItem
              key={index}
              {...step}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface StepItemProps {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  image: string;
  isReversed: boolean;
}

function StepItem({
  number,
  icon: Icon,
  title,
  description,
  image,
  isReversed,
}: StepItemProps) {
  return (
    <div
      className={`step-item grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        isReversed ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Image */}
      <div
        className={`step-image relative ${isReversed ? 'lg:order-2' : ''}`}
      >
        <div className="relative aspect-[4/3] rounded-[28px] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            style={{
              filter: 'saturate(0.7) contrast(1.05)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        </div>

        {/* Decorative square */}
        <div
          className={`decorative-square absolute w-20 h-20 lg:w-28 lg:h-28 rounded-2xl ${
            isReversed
              ? 'left-[-20px] bottom-[-20px]'
              : 'right-[-20px] bottom-[-20px]'
          } ${number === '01' ? 'bg-[#B9FF47]' : number === '02' ? 'bg-[#111111] dark:bg-[#333]' : 'bg-[#B9FF47]/50'}`}
        />
      </div>

      {/* Content */}
      <div
        className={`step-content ${isReversed ? 'lg:order-1 lg:text-right' : ''}`}
      >
        {/* Step number */}
        <div
          className={`step-number inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#B9FF47]/10 border border-[#B9FF47]/30 mb-6 ${
            isReversed ? 'lg:ml-auto' : ''
          }`}
        >
          <Icon className="w-7 h-7 text-[#B9FF47]" />
        </div>

        <h3
          className="text-2xl lg:text-3xl font-semibold mb-4"
          style={{ fontFamily: 'Space Grotesk' }}
        >
          {title}
        </h3>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
          {description}
        </p>
      </div>
    </div>
  );
}
