import { useRef, useLayoutEffect } from 'react';
import {
  Layout,
  Calendar,
  FolderOpen,
  MessageSquare,
  Flag,
  Download,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Layout,
    title: 'Task Boards',
    description:
      'Organize work with drag-and-drop boards and clear priorities. Visualize your workflow from start to finish.',
  },
  {
    icon: Calendar,
    title: 'Deadlines & Reminders',
    description:
      'Never miss a due date with smart notifications. Get reminded at the right time, every time.',
  },
  {
    icon: FolderOpen,
    title: 'File Hub',
    description:
      'Keep assets in one place, versioned and searchable. Find what you need in seconds.',
  },
  {
    icon: MessageSquare,
    title: 'Team Chat',
    description:
      'Discuss tasks without losing context. Every conversation is linked to the work.',
  },
  {
    icon: Flag,
    title: 'Milestones',
    description:
      'Break big projects into achievable phases. Track progress and celebrate wins.',
  },
  {
    icon: Download,
    title: 'Exports',
    description:
      'Submit PDFs, slides, or docs in one click. Professional formatting, every time.',
  },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current?.children;
    if (!section || !header || !cards) return;

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

      // Cards staggered animation
      gsap.from(cards, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-24 lg:py-32 bg-background z-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <h2
            className="text-[clamp(32px,3.6vw,52px)] font-semibold leading-tight mb-4"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Everything you need to{' '}
            <span className="text-[#B9FF47]">ship great work</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Tasks, files, deadlines, and communication—organized in one place.
          </p>
        </div>

        {/* Feature cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="group relative p-6 lg:p-8 rounded-[28px] bg-card border border-border/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#B9FF47]/30"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-[#B9FF47]/10 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
        <Icon className="w-6 h-6 text-[#B9FF47]" />
      </div>

      {/* Content */}
      <h3
        className="text-xl font-semibold mb-3"
        style={{ fontFamily: 'Space Grotesk' }}
      >
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-[#B9FF47]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
