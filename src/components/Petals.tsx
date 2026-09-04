import { useMemo } from "react";

const COLORS = [
  "oklch(0.9 0.06 10 / 0.75)",
  "oklch(0.9 0.05 300 / 0.7)",
  "oklch(0.92 0.06 55 / 0.7)",
  "oklch(0.95 0.03 90 / 0.75)",
];

export function Petals({ count = 18 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 97) % 100}%`,
        size: 8 + ((i * 7) % 10),
        duration: 14 + ((i * 5) % 12),
        delay: -((i * 3) % 18),
        drift: `${((i % 5) - 2) * 45}px`,
        color: COLORS[i % COLORS.length],
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 1.4,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ["--drift" as string]: p.drift,
          }}
        />
      ))}
    </div>
  );
}
