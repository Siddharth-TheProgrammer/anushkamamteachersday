import { useMemo } from "react";

const COLORS = [
  "oklch(0.88 0.06 12 / 0.55)",
  "oklch(0.87 0.055 300 / 0.5)",
  "oklch(0.9 0.06 55 / 0.5)",
  "oklch(0.86 0.05 150 / 0.45)",
];

export function Petals({ count = 22 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 97) % 100}%`,
        size: 5 + ((i * 3) % 6),
        duration: 22 + ((i * 5) % 16),
        delay: -((i * 3) % 24),
        drift: `${((i % 5) - 2) * 30}px`,
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
            height: p.size,
            borderRadius: "9999px",
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
