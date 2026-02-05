import { useRef, useLayoutEffect } from 'react';
import { Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      'StudyFlow turned our chaotic group chat into a real plan. We actually finished our project two days early!',
    name: 'A. Lin',
    role: 'Design Major',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    rating: 5,
  },
  {
    quote:
      'We finished early because everyone knew what to do. No more "I thought you were doing that" moments.',
    name: 'M. Ross',
    role: 'Business Student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    rating: 5,
  },
  {
    quote:
      'The best tool I\'ve used for team projects. Simple enough for anyone to pick up, powerful enough to actually help.',
    name: 'S. Patel',
    role: 'Engineering Student',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80',
    rating: 5,
  },
];

export function Testimonials() {
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
        y: 18,
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
        y: 28,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 lg:py-32 bg-background z-40"
    >
      {/* Background blob */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20 dark:opacity-10"
          style={{
            background: 'radial-gradient(circle, #B9FF47 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="label-uppercase text-[#B9FF47] mb-4 block">
            Testimonials
          </span>
          <h2
            className="text-[clamp(32px,3.6vw,52px)] font-semibold leading-tight"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Loved by <span className="text-[#B9FF47]">students</span>
          </h2>
        </div>

        {/* Testimonial cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
}

function TestimonialCard({
  quote,
  name,
  role,
  avatar,
  rating,
}: TestimonialCardProps) {
  return (
    <div className="group p-6 lg:p-8 rounded-[28px] bg-card border border-border/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#B9FF47]/30">
      {/* Rating */}
      <div className="flex gap-1 mb-5">
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 fill-[#B9FF47] text-[#B9FF47]"
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-lg leading-relaxed mb-6 text-foreground/90">
        "{quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#B9FF47]/30">
          <img
            src={avatar}
            alt={name}
            className="w-full h-full object-cover"
            style={{ filter: 'saturate(0.7)' }}
          />
        </div>
        <div>
          <p className="font-semibold" style={{ fontFamily: 'Space Grotesk' }}>
            {name}
          </p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
}
