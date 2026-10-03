'use client';

import { useReducedMotion } from 'framer-motion';
import HeroUI from './HeroUI';
import WaterCanvas from './WaterCanvas';

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="water-hero"
      className="relative isolate min-h-[720px] overflow-hidden bg-[#031824]"
      aria-labelledby="water-hero-title"
    >
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <WaterCanvas reducedMotion={Boolean(prefersReducedMotion)} className="!h-full !w-full" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_20%_20%,rgba(125,233,237,0.15),transparent_34%),linear-gradient(180deg,rgba(3,24,36,0.05)_0%,rgba(3,24,36,0.18)_45%,rgba(3,24,36,0.72)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-[#031824] to-transparent" />

      <div className="relative z-10">
        <HeroUI />
      </div>
    </section>
  );
}
