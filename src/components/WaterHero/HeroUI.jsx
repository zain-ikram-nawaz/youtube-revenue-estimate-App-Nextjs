'use client';

import { motion, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useCallback, useState } from 'react';

export default function HeroUI() {
  const prefersReducedMotion = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const springX = useSpring(0, { stiffness: 90, damping: 18, mass: 0.5 });
  const springY = useSpring(0, { stiffness: 90, damping: 18, mass: 0.5 });

  const handlePointerMove = useCallback(
    (event) => {
      if (prefersReducedMotion) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      setPointer({ x, y });
      springX.set(x * -14);
      springY.set(y * -10);
    },
    [prefersReducedMotion, springX, springY],
  );

  const resetPointer = useCallback(() => {
    setPointer({ x: 0, y: 0 });
    springX.set(0);
    springY.set(0);
  }, [springX, springY]);

  return (
    <div className="pointer-events-none relative flex min-h-[720px] items-center px-6 py-24 sm:px-10 lg:px-16">
      <motion.div
        className="pointer-events-auto w-full max-w-3xl"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
        style={prefersReducedMotion ? undefined : { x: springX, y: springY, perspective: 1000 }}
      >
        <motion.div
          className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950/25 p-7 text-white shadow-2xl shadow-cyan-950/30 backdrop-blur-xl sm:p-10 lg:p-14"
          animate={prefersReducedMotion ? undefined : { rotateX: pointer.y * -1.5, rotateY: pointer.x * 2 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 0.6 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-cyan-300/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-blue-500/15 blur-3xl" />

          <div className="relative z-10">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-100/20 bg-cyan-100/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-cyan-100/80">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_12px_3px_rgba(125,233,237,0.7)]" />
              ChannelIncome visual lab
            </p>

            <h1 id="water-hero-title" className="max-w-2xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-8xl">
              Immerse into the Future
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-cyan-50/70 sm:text-lg">
              A fluid interface for creators who want clearer insights, richer tools, and a more engaging way to explore their channel growth.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#water-hero-explore"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-cyan-100 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_30px_rgba(125,233,237,0.2)] transition hover:bg-white hover:shadow-[0_0_42px_rgba(125,233,237,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Explore the experience
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href="#water-hero-story"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:border-cyan-100/50 hover:bg-cyan-100/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-100 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <Play className="h-4 w-4 fill-current opacity-80" aria-hidden="true" />
                Watch the story
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
