import { useRef, useLayoutEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'Can I invite non-students (advisors/clients)?',
    answer:
      'Absolutely. You can invite anyone to collaborate on your projects. They\'ll get view or comment access depending on the permissions you set.',
  },
  {
    question: 'What file types are supported?',
    answer:
      'We support all common file types including PDFs, Word docs, PowerPoint presentations, images (JPG, PNG, SVG), and code files. Max file size is 100MB on Pro plans.',
  },
  {
    question: 'How do reminders work?',
    answer:
      'Set due dates on any task and we\'ll remind you via email or push notification. You can customize reminder times (1 day before, 1 hour before, etc.) in your settings.',
  },
  {
    question: 'Can I export my project for submission?',
    answer:
      'Yes! Export your entire project as a formatted PDF report, or export individual tasks and files. Perfect for submitting coursework to professors.',
  },
  {
    question: 'What happens when I graduate?',
    answer:
      'Your projects stay with you! You can continue using StudyFlow with our graduate pricing, or export everything before you leave. We also offer alumni discounts.',
  },
];

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const accordion = accordionRef.current;
    if (!section || !header || !accordion) return;

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

      // Accordion animation
      gsap.from(accordion, {
        scrollTrigger: {
          trigger: accordion,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-24 lg:py-32 bg-background z-[60]"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <span className="label-uppercase text-[#B9FF47] mb-4 block">
            FAQ
          </span>
          <h2
            className="text-[clamp(32px,3.6vw,52px)] font-semibold leading-tight"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Questions? <span className="text-[#B9FF47]">Answers.</span>
          </h2>
        </div>

        {/* Accordion */}
        <div ref={accordionRef}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/50 rounded-2xl px-6 data-[state=open]:border-[#B9FF47]/30 transition-colors duration-200"
              >
                <AccordionTrigger className="text-left py-5 hover:no-underline">
                  <span
                    className="text-base lg:text-lg font-medium"
                    style={{ fontFamily: 'Space Grotesk' }}
                  >
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
