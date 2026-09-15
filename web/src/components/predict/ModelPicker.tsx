"use client";

import type { MetricsData } from "@/lib/types";
import { pct } from "@/lib/format";
import { cn } from "@/lib/cn";

interface ModelPickerProps {
  metrics: MetricsData | null;
  selected: string | null;
  onSelect: (id: string) => void;
}

export function ModelPicker({ metrics, selected, onSelect }: ModelPickerProps) {
  if (!metrics) {
    return (
      <p className="text-sm text-muted">Memuat metrik model…</p>
    );
  }

  const models = Object.values(metrics.models);

  return (
    <div
      className="grid gap-2"
      role="radiogroup"
      aria-label="Pilih model prediksi"
    >
      {models.map((model) => {
        const isSelected = selected === model.id;
        return (
          <label
            key={model.id}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-md border p-3.5 transition-colors",
              isSelected
                ? "border-accent bg-accent-soft"
                : "border-line bg-surface hover:border-line-strong",
            )}
          >
            <input
              type="radio"
              name="model"
              value={model.id}
              checked={isSelected}
              onChange={() => onSelect(model.id)}
              className="h-4 w-4 accent-[var(--color-accent)]"
            />
            <span className="flex-1">
              <span className="block text-sm font-medium text-ink">
                {model.name}
              </span>
              <span className="mt-0.5 block font-mono text-xs text-muted">
                P {pct(model.precision)} · R {pct(model.recall)} · F1{" "}
                {pct(model.f1)}
              </span>
            </span>
            <span className="shrink-0 text-right">
              <span className="block font-mono text-sm font-semibold tabular-nums text-accent-strong">
                {pct(model.accuracy)}
              </span>
              <span className="block text-[0.65rem] uppercase tracking-wide text-muted">
                akurasi
              </span>
            </span>
          </label>
        );
      })}
    </div>
  );
}
