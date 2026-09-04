import { Star } from "lucide-react";

export function StarRating({
  value,
  onChange,
  readOnly = false,
  label,
}: {
  value: number | null;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1" role="group" aria-label={label}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = (value ?? 0) >= star;
        const content = (
          <Star
            className={`size-6 transition-transform duration-200 ${
              filled ? "fill-gold text-gold" : "text-border"
            } ${readOnly ? "" : "hover:scale-115"}`}
            strokeWidth={1.5}
          />
        );
        if (readOnly) {
          return (
            <span key={star} aria-hidden>
              {content}
            </span>
          );
        }
        return (
          <button
            key={star}
            type="button"
            aria-label={`${label}: ${star} star${star > 1 ? "s" : ""}`}
            aria-pressed={filled}
            onClick={() => onChange?.(star)}
            className="rounded-full p-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
