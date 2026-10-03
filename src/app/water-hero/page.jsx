import HeroSection from '../../components/WaterHero/HeroSection';

export const metadata = {
  title: 'Immersive Water Hero',
  description: 'A procedural WebGL water experience built with React Three Fiber.',
  alternates: {
    canonical: 'https://channelincome.com/water-hero',
  },
};

export default function WaterHeroPage() {
  return (
    <div className="bg-[#031824] text-white">
      <HeroSection />

      <section
        id="water-hero-explore"
        className="mx-auto max-w-6xl px-6 py-24 text-center sm:px-10 lg:px-16"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/70">
          Built for the ChannelIncome experience
        </p>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
          A calmer way to explore creator data.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-cyan-50/65">
          This section is intentionally separate from the existing homepage so the visual experiment can be reviewed without changing the current product flow.
        </p>
      </section>

      <section
        id="water-hero-story"
        className="border-t border-white/10 bg-[#061f2d] px-6 py-24 sm:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-6xl">
          <p className="max-w-2xl text-lg leading-8 text-cyan-50/70">
            The scene uses custom shader code, procedural noise, damped pointer uniforms, and responsive motion rather than heavy 3D assets or downloaded water textures.
          </p>
        </div>
      </section>
    </div>
  );
}
