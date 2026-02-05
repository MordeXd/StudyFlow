import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import gsap from 'gsap';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Pricing', href: '#pricing' },
];

export function Navbar() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Entrance animation
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      });

      gsap.from(linksRef.current?.children || [], {
        y: -15,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        delay: 0.1,
        ease: 'power2.out',
      });

      gsap.from(ctaRef.current, {
        y: -15,
        opacity: 0,
        duration: 0.5,
        delay: 0.3,
        ease: 'power2.out',
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div ref={logoRef} className="flex items-center">
              <a
                href="#"
                className="text-xl lg:text-2xl font-semibold tracking-tight"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                StudyFlow
              </a>
            </div>

            {/* Desktop Navigation */}
            <div
              ref={linksRef}
              className="hidden md:flex items-center gap-8"
            >
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right side */}
            <div ref={ctaRef} className="flex items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* CTA Button */}
              <Button
                className="hidden sm:inline-flex btn-primary rounded-full"
                
              >
                <a href="https://wa.me/917041559836?text=Hi!%20I%20would%20like%20to%20estimate%20my%20project%20cost." target="_blank" rel="noopener noreferrer">
                 Get Started
              </a>
              </Button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-muted transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-2xl font-medium text-foreground hover:text-accent transition-colors duration-200"
              style={{
                fontFamily: 'Space Grotesk',
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {link.label}
            </button>
          ))}
          <Button
            className="btn-primary rounded-full mt-4 px-8 py-4 text-lg"
            onClick={() => scrollToSection('#pricing')}
          >
            Get Started
          </Button>
        </div>
      </div>
    </>
  );
}
