"use client";

import { useState } from "react";
import type { PredictResult } from "@/lib/types";
import { CLASS_SEVERITY, SEVERITY_LABEL } from "@/lib/features";
import { pct } from "@/lib/format";
import { cn } from "@/lib/cn";
import { ConfusionMatrix } from "@/components/predict/ConfusionMatrix";

interface ResultCardProps {
  result: PredictResult;
  classLabels: string[];
}

const SEVERITY_STYLE: Record<string, string> = {
  good: "bg-good-soft text-good",
  warn: "bg-warn-soft text-warn",
  danger: "bg-danger-soft text-danger",
};

export function ResultCard({ result, classLabels }: ResultCardProps) {
  const [showMatrix, setShowMatrix] = useState(false);
  const severity = CLASS_SEVERITY[result.predicted_class] ?? "warn";
  const probabilities = result.probabilities ?? [];
  const flags = result.flags ?? [];
  const metrics = result.model_metrics ?? {};

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Hasil prediksi · {result.model_name}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h2 className="font-serif text-2xl font-semibold text-ink">
            {result.predicted_class}
          </h2>
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-medium",
              SEVERITY_STYLE[severity],
            )}
          >
            {SEVERITY_LABEL[severity]}
          </span>
        </div>
        <p className="mt-2 text-sm text-muted">
          Keyakinan model:{" "}
          <strong className="font-mono text-ink">
            {pct(result.confidence)}
          </strong>{" "}
          · skrining awal
        </p>
      </div>

      <div className="rounded-md border border-line bg-surface-2 p-4">
        <h3 className="font-serif text-base font-semibold text-ink">
          {result.context?.headline}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {result.context?.paragraph}
        </p>
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          Distribusi probabilitas kelas
        </p>
        <ul className="mt-3 space-y-3">
          {probabilities.map((probability, index) => (
            <li key={probability.label}>
              <div className="flex items-baseline justify-between gap-4 text-sm">
                <span
                  className={cn(
                    index === 0 ? "font-medium text-ink" : "text-ink-soft",
                  )}
                >
                  {probability.label}
                </span>
                <span className="font-mono tabular-nums text-muted">
                  {pct(probability.value)}
                </span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-line">
                <div
                  className={cn(
                    "h-full rounded-full",
                    index === 0 ? "bg-accent" : "bg-line-strong",
                  )}
                  style={{ width: `${Math.max(2, probability.value * 100)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          Catatan nilai lab di luar rentang umum
        </p>
        {flags.length ? (
          <>
            <ul className="mt-3 space-y-2">
              {flags.map((flag) => (
                <li
                  key={flag.feature}
                  className="rounded-md border border-line bg-surface p-3 text-sm"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-medium text-ink">{flag.name}</span>
                    <span className="font-mono text-xs tabular-nums text-ink-soft">
                      {flag.value} {flag.unit}
                      <span
                        className={cn(
                          "ml-2",
                          flag.status === "high" ? "text-warn" : "text-info",
                        )}
                      >
                        {flag.status === "high" ? "▲" : "▼"}
                      </span>
                    </span>
                  </div>
                  {flag.note ? (
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {flag.note}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-muted">
              Rentang rujukan adalah nilai umum; tiap laboratorium dapat
              memiliki standar berbeda.
            </p>
          </>
        ) : (
          <p className="mt-3 text-sm text-ink-soft">
            Seluruh nilai lab yang Anda masukkan berada dalam rentang umum.
          </p>
        )}
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          Performa model ini (data uji)
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { label: "Akurasi", value: metrics.accuracy },
            { label: "Precision", value: metrics.precision },
            { label: "Recall", value: metrics.recall },
            { label: "F1", value: metrics.f1 },
          ].map((chip) => (
            <span
              key={chip.label}
              className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted"
            >
              {chip.label}{" "}
              <strong className="font-mono text-ink">
                {pct(chip.value)}
              </strong>
            </span>
          ))}
        </div>

        {metrics.confusion_matrix ? (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowMatrix((value) => !value)}
              aria-expanded={showMatrix}
              className="text-sm font-medium text-accent hover:text-accent-strong"
            >
              {showMatrix
                ? "Sembunyikan confusion matrix"
                : "Lihat confusion matrix"}
            </button>
            {showMatrix ? (
              <div className="mt-4">
                <ConfusionMatrix
                  matrix={metrics.confusion_matrix}
                  labels={classLabels}
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <p className="rounded-md border border-danger/30 bg-danger-soft p-4 text-xs leading-relaxed text-danger">
        <strong className="font-semibold">Peringatan penting:</strong>{" "}
        {result.disclaimer}
      </p>
    </div>
  );
}
