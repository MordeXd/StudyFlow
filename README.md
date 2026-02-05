# 🚀 StudyFlow – Animated SaaS Landing Page

A **premium, highly animated, production-ready SaaS landing page** built for a  
**Student Project Management & Delivery Platform**.

This project focuses **only on the public landing page** with advanced motion design,
custom animated SVGs, and a modern light/dark theme system — no backend, no auth,
no dashboards.

> ⚠️ This is **NOT a tutorial**  
> This is a **real, high-end SaaS landing page**, portfolio & production ready.

---

## ✨ Highlights

- 🎨 **Premium startup-level UI**
- 🌓 **Light & Dark theme** (system default + persistent)
- 🎞️ **Advanced GSAP animations**
- 🧩 **Custom animated SVG Hero (no raster images)**
- ⚡ **Smooth 60fps performance**
- 📱 **Fully responsive (mobile → desktop)**
- ♿ **Accessible & semantic UI (shadcn/ui)**

---

## 🧱 Tech Stack (Locked)

- **Next.js** (Latest, App Router)
- **React** (Latest)
- **Tailwind CSS**
- **shadcn/ui** (MANDATORY for all UI components)
- **GSAP** (Advanced animations + ScrollTrigger)
- **Inline SVG** (Custom animated hero, not images)

❌ No backend  
❌ No authentication  
❌ No dashboards  
❌ No other UI libraries  

---

## 🎨 Theme System

- Light & Dark mode support
- System preference detection
- Theme toggle (Sun / Moon) in navbar
- Theme persisted using `localStorage`
- Smooth color transitions
- SVG colors adapt automatically to theme

---

## 🧩 Animated SVG Hero (Core Feature)

### Why SVG instead of images?
- Crisp on all screen sizes
- Fully theme-aware
- Infinite animation control
- Lightweight & fast
- Custom, non-template look

### SVG Concept
The hero SVG visually represents:
- Project flow
- Code blocks
- Tasks & checkmarks
- Files & progress lines
- Connected nodes (data flow style)

### SVG Animations (GSAP)
- Path draw animations (`stroke-dasharray`)
- Floating elements (infinite loop)
- Pulsing nodes (scale + opacity)
- Sequential line connections
- Subtle background shape rotation
- Parallax-style movement on scroll
- Different animation speeds for depth

---

## 🎞️ GSAP Animation System

### Hero Section
- Badge scale-in (`back.out`)
- Sequential text reveal (timeline)
- CTA button pop-in
- SVG entrance animation
- Infinite floating & pulse effects
- Animated gradient blobs

### Features Section
- Cards slide up with 3D rotation
- Icons spin + scale
- Staggered reveal animations
- Hover effects:
  - Lift
  - Shadow
  - Border glow

### How It Works
- Step cards slide from left
- Step numbers rotate 360°
- Gradient step indicators
- Hover elevation effects

### Trust Section
- Fade + scale reveal
- Image overlays with gradients
- Background blobs
- Scroll-triggered animations

### CTA Section
- Animated gradient background
- Floating blobs
- Scale-up on scroll
- Button hover glow + scale

---

## 🧱 Landing Page Sections

1. Navbar (Logo, links, theme toggle, CTA)
2. Hero Section (Animated SVG, headline, CTA)
3. Features Section
4. How It Works
5. Trust Section
6. CTA Section
7. Footer

---

## ⚙️ Local Development

```bash
npm install
npm run dev
```

Open: http://localhost:5173

---

## 🧪 Testing Checklist

- Light & Dark mode verified
- SVG animations smooth
- Responsive on all devices
- No animation jank
- GSAP cleanup verified

---

## 🏆 Final Notes

This landing page is designed to:
- Impress users instantly
- Showcase advanced frontend & animation skills
- Feel like a real funded startup website
- Be production-ready

🔥 Built with precision, motion & performance in mind.
