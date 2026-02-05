import { useRef, useLayoutEffect } from 'react';
import { Twitter, Instagram, Linkedin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  Product: ['Features', 'Pricing', 'Testimonials', 'FAQ'],
  Resources: ['Blog', 'Guides', 'Templates', 'Help Center'],
  Legal: ['Privacy', 'Terms', 'Cookies', 'Security'],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;
    if (!footer || !content) return;

    const ctx = gsap.context(() => {
      gsap.from(content.children, {
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        y: 12,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative py-16 lg:py-20 bg-background z-[80]"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <a
              href="#"
              className="text-2xl font-semibold tracking-tight mb-4 block"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              StudyFlow
            </a>
            <p
              className="text-muted-foreground text-sm leading-relaxed"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              Manage. Collaborate. Deliver.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="label-uppercase text-foreground mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} StudyFlow. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-[#B9FF47]/10 hover:border-[#B9FF47]/30 border border-transparent transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
