import { useRef, useLayoutEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'Perfect for trying out StudyFlow',
    features: [
      '3 projects',
      'Core task management',
      '7-day history',
      'Basic file storage',
      'Email notifications',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$8',
    period: '/month',
    description: 'For students who mean business',
    features: [
      'Unlimited projects',
      'Full history',
      'Advanced exports',
      'Smart reminders',
      'Priority support',
      'Team collaboration',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Team',
    price: '$14',
    period: '/seat',
    description: 'For study groups and clubs',
    features: [
      'Everything in Pro',
      'Shared workspaces',
      'Admin controls',
      'Analytics dashboard',
      'SSO integration',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export function Pricing() {
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
        y: 36,
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
      id="pricing"
      className="relative py-24 lg:py-32 bg-background z-50"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="label-uppercase text-[#B9FF47] mb-4 block">
            Pricing
          </span>
          <h2
            className="text-[clamp(32px,3.6vw,52px)] font-semibold leading-tight mb-4"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Simple <span className="text-[#B9FF47]">pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Start free, upgrade when you need more power.
          </p>
        </div>

        {/* Pricing cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start"
        >
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
}

function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  highlighted,
  badge,
}: PricingCardProps) {
  return (
    <div
      className={`relative p-6 lg:p-8 rounded-[28px] transition-all duration-300 hover:-translate-y-1.5 ${
        highlighted
          ? 'bg-card border-2 border-[#B9FF47] shadow-xl shadow-[#B9FF47]/10 scale-105'
          : 'bg-card border border-border/50 hover:shadow-xl hover:border-[#B9FF47]/30'
      }`}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#B9FF47] text-[#111111] text-sm font-semibold">
            {badge}
          </span>
        </div>
      )}

      {/* Plan name */}
      <h3
        className="text-xl font-semibold mb-2"
        style={{ fontFamily: 'Space Grotesk' }}
      >
        {name}
      </h3>

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-4xl lg:text-5xl font-bold" style={{ fontFamily: 'Space Grotesk' }}>
          {price}
        </span>
        <span className="text-muted-foreground">{period}</span>
      </div>

      {/* Description */}
      <p className="text-muted-foreground mb-6">{description}</p>

      {/* CTA */}
      <Button
        className={`w-full mb-6 rounded-full py-5 font-semibold transition-all duration-200 ${
          highlighted
            ? 'btn-primary'
            : 'bg-muted hover:bg-muted/80 text-foreground'
        }`}
      >
        {cta}
      </Button>

      {/* Features */}
      <ul className="space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#B9FF47]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-[#B9FF47]" />
            </div>
            <span className="text-sm text-foreground/80">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
