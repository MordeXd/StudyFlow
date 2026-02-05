import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '@/hooks/useTheme';

export function AnimatedHeroSVG() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const paths = svg.querySelectorAll('.draw-path');
    const floatingElements = svg.querySelectorAll('.floating');
    const pulseElements = svg.querySelectorAll('.pulse');
    const nodes = svg.querySelectorAll('.node');

    // Path draw animation
    paths.forEach((path, i) => {
      const length = (path as SVGPathElement).getTotalLength?.() || 100;
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
        delay: 0.3 + i * 0.2,
        ease: 'power2.out',
      });
    });

    // Floating animation for elements
    floatingElements.forEach((el, i) => {
      gsap.to(el, {
        y: '-=15',
        duration: 2 + i * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2,
      });
    });

    // Pulsing animation
    pulseElements.forEach((el, i) => {
      gsap.to(el, {
        scale: 1.15,
        opacity: 0.7,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3,
      });
    });

    // Node entrance animation
    nodes.forEach((node, i) => {
      gsap.from(node, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        delay: 0.8 + i * 0.15,
        ease: 'back.out(1.7)',
      });
    });

    // Background shapes rotation
    const bgShapes = svg.querySelectorAll('.bg-shape');
    bgShapes.forEach((shape, i) => {
      gsap.to(shape, {
        rotation: 360,
        duration: 30 + i * 10,
        repeat: -1,
        ease: 'none',
      });
    });

    return () => {
      gsap.killTweensOf([...paths, ...floatingElements, ...pulseElements, ...nodes, ...bgShapes]);
    };
  }, []);

  const strokeColor = isDark ? '#B9FF47' : '#111111';
  const fillColor = isDark ? '#1a1a1a' : '#ffffff';
  const accentColor = '#B9FF47';
  const textColor = isDark ? '#F6F6F2' : '#111111';
  const secondaryColor = isDark ? '#6D6D6D' : '#6D6D6D';

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 500"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.3" />
          <stop offset="50%" stopColor={accentColor} stopOpacity="1" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.3" />
        </linearGradient>
        
        <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? '#2a2a2a' : '#ffffff'} />
          <stop offset="100%" stopColor={isDark ? '#1a1a1a' : '#f5f5f5'} />
        </linearGradient>
        
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background shapes */}
      <g transform="translate(490, 90)">
        <rect
          className="bg-shape"
          x="-40"
          y="-40"
          width="80"
          height="80"
          rx="16"
          fill={accentColor}
          opacity="0.15"
        />
      </g>
      <g transform="translate(110, 410)">
        <rect
          className="bg-shape"
          x="-30"
          y="-30"
          width="60"
          height="60"
          rx="12"
          fill={isDark ? '#333' : '#e0e0e0'}
          opacity="0.5"
        />
      </g>

      {/* Connection lines */}
      <path
        className="draw-path"
        d="M 120 180 L 200 180 L 200 140 L 280 140"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        className="draw-path"
        d="M 120 220 L 200 220 L 200 260 L 280 260"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        className="draw-path"
        d="M 400 160 L 480 160 L 480 200 L 520 200"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        className="draw-path"
        d="M 400 240 L 480 240 L 480 300 L 520 300"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Left side - Task cards */}
      <g className="floating" style={{ animationDelay: '0s' }}>
        {/* Task card 1 */}
        <rect
          x="40"
          y="140"
          width="80"
          height="50"
          rx="10"
          fill="url(#cardGradient)"
          stroke={strokeColor}
          strokeWidth="1.5"
        />
        <rect x="55" y="155" width="50" height="6" rx="3" fill={secondaryColor} opacity="0.5" />
        <rect x="55" y="168" width="30" height="4" rx="2" fill={secondaryColor} opacity="0.3" />
        {/* Checkmark */}
        <circle cx="50" cy="158" r="6" fill={accentColor} className="pulse" />
        <path d="M 47 158 L 49 160 L 53 156" stroke={isDark ? '#111' : '#fff'} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>

      <g className="floating" style={{ animationDelay: '0.3s' }}>
        {/* Task card 2 */}
        <rect
          x="40"
          y="210"
          width="80"
          height="50"
          rx="10"
          fill="url(#cardGradient)"
          stroke={strokeColor}
          strokeWidth="1.5"
        />
        <rect x="55" y="225" width="50" height="6" rx="3" fill={secondaryColor} opacity="0.5" />
        <rect x="55" y="238" width="40" height="4" rx="2" fill={secondaryColor} opacity="0.3" />
        {/* Checkmark */}
        <circle cx="50" cy="228" r="6" fill={accentColor} className="pulse" />
        <path d="M 47 228 L 49 230 L 53 226" stroke={isDark ? '#111' : '#fff'} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>

      {/* Center - Code block */}
      <g className="floating" style={{ animationDelay: '0.15s' }}>
        <rect
          x="280"
          y="120"
          width="120"
          height="160"
          rx="14"
          fill="url(#cardGradient)"
          stroke={strokeColor}
          strokeWidth="1.5"
        />
        {/* Code lines */}
        <rect x="295" y="140" width="60" height="5" rx="2.5" fill={accentColor} opacity="0.6" />
        <rect x="295" y="155" width="90" height="4" rx="2" fill={secondaryColor} opacity="0.4" />
        <rect x="295" y="168" width="75" height="4" rx="2" fill={secondaryColor} opacity="0.4" />
        <rect x="295" y="181" width="85" height="4" rx="2" fill={secondaryColor} opacity="0.4" />
        <rect x="295" y="200" width="50" height="5" rx="2.5" fill={accentColor} opacity="0.6" />
        <rect x="295" y="215" width="80" height="4" rx="2" fill={secondaryColor} opacity="0.4" />
        <rect x="295" y="228" width="65" height="4" rx="2" fill={secondaryColor} opacity="0.4" />
        <rect x="295" y="241" width="90" height="4" rx="2" fill={secondaryColor} opacity="0.4" />
        <rect x="295" y="254" width="55" height="4" rx="2" fill={secondaryColor} opacity="0.4" />
        
        {/* Status indicator */}
        <circle cx="385" cy="135" r="5" fill={accentColor} className="pulse" filter="url(#glow)" />
      </g>

      {/* Right side - File and progress */}
      <g className="floating" style={{ animationDelay: '0.45s' }}>
        {/* File card */}
        <rect
          x="520"
          y="160"
          width="70"
          height="90"
          rx="10"
          fill="url(#cardGradient)"
          stroke={strokeColor}
          strokeWidth="1.5"
        />
        {/* File icon */}
        <rect x="545" y="175" width="20" height="25" rx="3" fill={accentColor} opacity="0.3" />
        <path d="M 548 182 L 562 182 M 548 188 L 558 188 M 548 194 L 560 194" stroke={textColor} strokeWidth="1.5" strokeLinecap="round" />
        {/* File name */}
        <rect x="535" y="210" width="40" height="4" rx="2" fill={secondaryColor} opacity="0.5" />
        <rect x="540" y="218" width="30" height="3" rx="1.5" fill={secondaryColor} opacity="0.3" />
        {/* Download icon */}
        <circle cx="555" cy="235" r="10" fill={accentColor} className="node" />
        <path d="M 555 230 L 555 238 M 555 238 L 551 234 M 555 238 L 559 234" stroke={isDark ? '#111' : '#fff'} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>

      {/* Progress bar */}
      <g className="floating" style={{ animationDelay: '0.6s' }}>
        <rect
          x="520"
          y="280"
          width="70"
          height="40"
          rx="10"
          fill="url(#cardGradient)"
          stroke={strokeColor}
          strokeWidth="1.5"
        />
        <rect x="530" y="295" width="50" height="4" rx="2" fill={secondaryColor} opacity="0.3" />
        {/* Progress track */}
        <rect x="530" y="305" width="50" height="6" rx="3" fill={isDark ? '#333' : '#e0e0e0'} />
        {/* Progress fill */}
        <rect x="530" y="305" width="38" height="6" rx="3" fill={accentColor} className="pulse" />
        {/* Percentage */}
        <text x="555" y="299" textAnchor="middle" fontSize="8" fill={textColor} fontFamily="Space Grotesk" fontWeight="600">
          76%
        </text>
      </g>

      {/* Nodes */}
      <circle cx="200" cy="180" r="8" fill={fillColor} stroke={accentColor} strokeWidth="2" className="node" />
      <circle cx="200" cy="220" r="8" fill={fillColor} stroke={accentColor} strokeWidth="2" className="node" />
      <circle cx="280" cy="140" r="8" fill={fillColor} stroke={accentColor} strokeWidth="2" className="node" />
      <circle cx="280" cy="260" r="8" fill={fillColor} stroke={accentColor} strokeWidth="2" className="node" />
      <circle cx="400" cy="160" r="8" fill={fillColor} stroke={accentColor} strokeWidth="2" className="node" />
      <circle cx="400" cy="240" r="8" fill={fillColor} stroke={accentColor} strokeWidth="2" className="node" />
      <circle cx="480" cy="200" r="8" fill={fillColor} stroke={accentColor} strokeWidth="2" className="node" />
      <circle cx="480" cy="300" r="8" fill={fillColor} stroke={accentColor} strokeWidth="2" className="node" />

      {/* Bottom stats */}
      <g transform="translate(180, 360)">
        <rect width="240" height="60" rx="14" fill="url(#cardGradient)" stroke={strokeColor} strokeWidth="1.5" />
        {/* Stat 1 */}
        <text x="40" y="30" textAnchor="middle" fontSize="16" fill={textColor} fontFamily="Space Grotesk" fontWeight="700">
          24
        </text>
        <text x="40" y="45" textAnchor="middle" fontSize="7" fill={secondaryColor} fontFamily="Inter">
          TASKS
        </text>
        {/* Divider */}
        <line x1="80" y1="15" x2="80" y2="45" stroke={strokeColor} strokeWidth="1" opacity="0.2" />
        {/* Stat 2 */}
        <text x="120" y="30" textAnchor="middle" fontSize="16" fill={accentColor} fontFamily="Space Grotesk" fontWeight="700">
          18
        </text>
        <text x="120" y="45" textAnchor="middle" fontSize="7" fill={secondaryColor} fontFamily="Inter">
          DONE
        </text>
        {/* Divider */}
        <line x1="160" y1="15" x2="160" y2="45" stroke={strokeColor} strokeWidth="1" opacity="0.2" />
        {/* Stat 3 */}
        <text x="200" y="30" textAnchor="middle" fontSize="16" fill={textColor} fontFamily="Space Grotesk" fontWeight="700">
          6
        </text>
        <text x="200" y="45" textAnchor="middle" fontSize="7" fill={secondaryColor} fontFamily="Inter">
          LEFT
        </text>
      </g>
    </svg>
  );
}
