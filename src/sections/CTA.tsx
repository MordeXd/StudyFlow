import { useRef, useLayoutEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const squareKRef = useRef<HTMLDivElement>(null);
  const squareLRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const squareK = squareKRef.current;
    const squareL = squareLRef.current;
    if (!section || !content || !squareK || !squareL) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        content,
        { y: '40vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        squareK,
        { x: '-40vw', rotation: -18, opacity: 0 },
        { x: 0, rotation: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        squareL,
        { x: '40vw', rotation: 18, opacity: 0 },
        { x: 0, rotation: 0, opacity: 1, ease: 'none' },
        0
      );

      // SETTLE (30% - 70%): Hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        content,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        squareK,
        { x: 0, opacity: 1 },
        { x: '-20vw', opacity: 0.2, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        squareL,
        { x: 0, opacity: 1 },
        { x: '20vw', opacity: 0.2, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#111111] z-[70] flex items-center justify-center"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, #B9FF47 0%, transparent 60%)',
            top: '-300px',
            left: '-200px',
            filter: 'blur(100px)',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #B9FF47 0%, transparent 60%)',
            bottom: '-200px',
            right: '-100px',
            filter: 'blur(80px)',
            animation: 'float 10s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* Decorative squares */}
      <div
        ref={squareKRef}
        className="absolute w-[12vw] h-[12vw] bg-[#B9FF47] rounded-3xl"
        style={{ left: '10vw', top: '20vh' }}
      />
      <div
        ref={squareLRef}
        className="absolute w-[10vw] h-[10vw] bg-[#333] rounded-3xl"
        style={{ left: '82vw', top: '62vh' }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative text-center px-6 max-w-2xl mx-auto"
      >
        <h2
          className="text-[clamp(36px,4.5vw,64px)] font-semibold leading-tight mb-6 text-white"
          style={{ fontFamily: 'Space Grotesk' }}
        >
          Ready to ship your{' '}
          <span className="text-[#B9FF47]">next project?</span>
        </h2>
        <p className="text-lg lg:text-xl text-white/70 mb-10 leading-relaxed">
          Join thousands of students who plan smarter, stress less, and deliver
          on time.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="btn-primary rounded-full px-8 py-6 text-base font-semibold group w-full sm:w-auto">
              <a href="https://wa.me/917041559836?text=Hi!%20I%20would%20like%20to%20estimate%20my%20project%20cost." target="_blank" rel="noopener noreferrer">
                 Get Started
              </a>
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        <p className="mt-6 text-sm text-white/50">
          No credit card required.
        </p>
      </div>

      {/* Keyframes for floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
      `}</style>
    </section>
  );
}
