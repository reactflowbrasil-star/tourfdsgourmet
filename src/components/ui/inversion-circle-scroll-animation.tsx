import { useEffect, useRef, useState } from "react";

/**
 * Scroll-driven inversion circle. Adapted to use the page (window) scroll so it
 * sits inline in a landing page instead of owning its own scroll container.
 * Phase 1: circle rises to the centre. Phase 2: circle expands to fill the screen.
 * A clip-path mirrors the circle, showing inverted text inside it.
 */
const BALL_SIZE = 340;
const clamp = (v: number) => Math.min(1, Math.max(0, v));

type Props = {
  title: string;
  subtitle?: string;
  kicker?: string;
};

export default function InversionCircleScrollAnimation({ title, subtitle, kicker }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [view, setView] = useState({ w: 800, h: 600 });

  useEffect(() => {
    const update = () => {
      const el = trackRef.current;
      if (!el) return;
      setView({ w: window.innerWidth, h: window.innerHeight });
      setProgress(Math.max(0, -el.getBoundingClientRect().top));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const { w: viewW, h: viewH } = view;
  const ball = Math.min(BALL_SIZE, viewW * 0.8);
  const p1 = clamp(progress / viewH);
  const p2 = clamp((progress - viewH) / viewH);
  const p1e = p1 < 0.5 ? 8 * p1 ** 4 : 1 - (-2 * p1 + 2) ** 4 / 2;
  const p2e = p2 * p2;
  const yOff = (1 - p1e) * (viewH / 2 + ball / 2);
  const size = ball + p2e * (Math.max(viewW, viewH) * 2.8 - ball);

  const content = (
    <>
      {kicker && <span className="mb-4 text-xs font-bold uppercase tracking-[0.3em] opacity-70">{kicker}</span>}
      <h2 className="font-serif text-5xl font-bold leading-none tracking-tight md:text-8xl">{title}</h2>
      {subtitle && <p className="mt-5 max-w-xl text-base opacity-80 md:text-2xl">{subtitle}</p>}
    </>
  );

  return (
    <div ref={trackRef} className="relative h-[300vh]">
      <section className="sticky top-0 h-screen overflow-hidden bg-[#f8f4ec]" aria-label={title}>
        <div
          className="absolute left-1/2 top-1/2 rounded-full bg-[#008b96] will-change-transform"
          style={{ width: size, height: size, transform: `translate(-50%, calc(-50% + ${yOff}px))` }}
        />
        <div className="pointer-events-none absolute inset-0 z-[2] flex flex-col items-center justify-center px-6 text-center text-[#202326]">
          {content}
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[3] flex flex-col items-center justify-center px-6 text-center text-white"
          style={{ clipPath: `circle(${size / 2}px at ${viewW / 2}px ${viewH / 2 + yOff}px)` }}
        >
          {content}
        </div>
      </section>
    </div>
  );
}
