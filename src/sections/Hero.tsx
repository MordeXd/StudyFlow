import { useEffect, useRef, useLayoutEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { AnimatedHeroSVG } from '@/components/AnimatedHeroSVG';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const squareARef = useRef<HTMLDivElement>(null);
  const squareBRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // Load animation (auto-play on mount)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Badge scale-in
      tl.from(badgeRef.current, {
        scale: 0.6,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
      });

      // Headline word reveal
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        tl.from(
          words,
          {
            y: 24,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          '-=0.3'
        );
      }

      // Subheadline
      tl.from(
        subheadlineRef.current,
        {
          y: 16,
          opacity: 0,
          duration: 0.5,
        },
        '-=0.2'
      );

      // CTA buttons
      tl.from(
        ctaRef.current,
        {
          y: 16,
          opacity: 0,
          duration: 0.5,
        },
        '-=0.3'
      );

      // Caption
      tl.from(
        captionRef.current,
        {
          y: 12,
          opacity: 0,
          duration: 0.4,
        },
        '-=0.2'
      );

      // SVG container
      tl.from(
        svgContainerRef.current,
        {
          x: 60,
          opacity: 0,
          duration: 0.9,
        },
        0
      );

      // Square A
      tl.from(
        squareARef.current,
        {
          scale: 0.6,
          rotation: -8,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        },
        0.2
      );

      // Square B
      tl.from(
        squareBRef.current,
        {
          scale: 0.6,
          rotation: 8,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        },
        0.35
      );
    });

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current, captionRef.current], {
              opacity: 1,
              x: 0,
            });
            gsap.set(svgContainerRef.current, {
              opacity: 1,
              x: 0,
              scale: 1,
            });
            gsap.set([squareARef.current, squareBRef.current], {
              opacity: 1,
              y: 0,
              rotation: 0,
            });
          },
        },
      });

      // ENTRANCE (0% - 30%): Hold - elements already visible from load animation
      // SETTLE (30% - 70%): Static

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        subheadlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        ctaRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(
        captionRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.76
      );

      scrollTl.fromTo(
        svgContainerRef.current,
        { x: 0, scale: 1, opacity: 1 },
        { x: '10vw', scale: 0.96, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        squareARef.current,
        { y: 0, rotation: 0, opacity: 1 },
        { y: '-20vh', rotation: -12, opacity: 0.2, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        squareBRef.current,
        { y: 0, rotation: 0, opacity: 1 },
        { y: '18vh', rotation: 12, opacity: 0.2, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToFeatures = () => {
    const element = document.querySelector('#features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-background z-10 flex items-center"
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-30 dark:opacity-20"
          style={{
            background: 'radial-gradient(circle, #B9FF47 0%, transparent 70%)',
            top: '-200px',
            right: '-200px',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-20 dark:opacity-10"
          style={{
            background: 'radial-gradient(circle, #B9FF47 0%, transparent 70%)',
            bottom: '-100px',
            left: '-100px',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Decorative squares */}
      <div
        ref={squareARef}
        className="absolute w-[10vw] h-[10vw] bg-[#B9FF47] rounded-2xl"
        style={{ left: '44vw', top: '14vh' }}
      />
      <div
        ref={squareBRef}
        className="absolute w-[8vw] h-[8vw] bg-[#111111] dark:bg-[#333] rounded-2xl"
        style={{ left: '46vw', top: '74vh' }}
      />

      <div className="relative w-full h-full flex items-center px-8 lg:px-[8vw]">
        {/* Left content */}
        <div className="w-full lg:w-[40vw] pt-20">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B9FF47]/10 border border-[#B9FF47]/30 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#B9FF47] animate-pulse" />
            <span className="label-uppercase text-[#B9FF47]">New: AI Assistant</span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-[clamp(40px,5vw,72px)] font-semibold leading-[0.95] tracking-[-0.02em] mb-6"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            <span className="word inline-block">Manage.</span>{' '}
            <span className="word inline-block">Collaborate.</span>{' '}
            <span className="word inline-block text-[#B9FF47]">Deliver.</span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="text-lg lg:text-xl text-muted-foreground max-w-md mb-8 leading-relaxed"
          >
            The student project platform that keeps your team aligned from first
            idea to final submission.
          </p>

          {/* CTA buttons */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mb-12">
            <Button
              className="btn-primary rounded-full px-8 py-6 text-base font-semibold group"
              onClick={scrollToFeatures}
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <button
              onClick={scrollToFeatures}
              className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors duration-200"
            >
              <span className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:border-[#B9FF47] hover:bg-[#B9FF47]/10 transition-all duration-200">
                <Play className="w-4 h-4 ml-0.5" />
              </span>
              <span className="font-medium">See how it works</span>
            </button>
          </div>

          {/* Caption */}
          <p ref={captionRef} className="label-uppercase text-muted-foreground">
            Built for coursework. Designed for teams.
          </p>
        </div>

        {/* Right content - Animated SVG */}
        <div
          ref={svgContainerRef}
          className="hidden lg:block absolute right-[8vw] top-1/2 -translate-y-1/2 w-[42vw] h-[64vh]"
        >
          <div className="w-full h-full rounded-[28px] bg-card/50 backdrop-blur-sm border border-border/50 p-6 shadow-xl">
            <AnimatedHeroSVG />
          </div>
        </div>
      </div>
    </section>
  );
}
