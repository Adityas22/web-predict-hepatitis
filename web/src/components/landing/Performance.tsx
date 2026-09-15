"use client";

import { useEffect, useState } from "react";
import { fetchMetrics } from "@/lib/client-api";
import type { MetricsData } from "@/lib/types";
import { pct } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/Section";
import { ConfusionMatrix } from "@/components/predict/ConfusionMatrix";

const METRIC_COLUMNS = [
  { key: "accuracy", label: "Akurasi" },
  { key: "precision", label: "Precision" },
  { key: "recall", label: "Recall" },
  { key: "f1", label: "F1" },
] as const;

export function Performance() {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchMetrics()
      .then((data) => {
        if (!active) return;
        setMetrics(data);
        const ids = Object.keys(data.models);
        const best = ids.reduce((a, b) =>
          data.models[a].accuracy >= data.models[b].accuracy ? a : b,
        );
        setSelected(best);
      })
      .catch((err: Error) => {
        if (active) setError(err.message);
      });
    return () => {
      active = false;
    };
  }, []);

  const orderedModels = metrics
    ? Object.values(metrics.models).sort((a, b) => b.accuracy - a.accuracy)
    : [];
  const selectedModel =
    metrics && selected ? metrics.models[selected] : undefined;

  return (
    <Section
      id="performa"
      eyebrow="08 · Evaluasi"
      title="Performa model"
      lede="Empat algoritma dievaluasi pada data uji yang sama. Angka di bawah diambil langsung dari artefak model yang dipakai aplikasi ini."
    >
      {error ? (
        <div
          role="alert"
          className="rounded-lg border border-danger/30 bg-danger-soft p-5 text-sm text-danger"
        >
          <p className="font-medium">Metrik model tidak dapat dimuat.</p>
          <p className="mt-1 text-danger/90">{error}</p>
          <p className="mt-2 text-xs text-danger/80">
            Pastikan layanan ML API berjalan dan variabel <code>ML_API_URL</code>{" "}
            sudah dikonfigurasi.
          </p>
        </div>
      ) : null}

      {!metrics && !error ? (
        <div className="rounded-lg border border-line bg-surface p-6">
          <div className="h-4 w-40 animate-pulse rounded bg-line" />
          <div className="mt-4 space-y-3">
            {[0, 1, 2, 3].map((row) => (
              <div
                key={row}
                className="h-10 w-full animate-pulse rounded bg-surface-2"
              />
            ))}
          </div>
        </div>
      ) : null}

      {metrics ? (
        <div className="space-y-10">
          <div className="overflow-x-auto rounded-lg border border-line bg-surface">
            <table className="w-full min-w-[36rem] border-collapse text-sm">
              <caption className="sr-only">
                Perbandingan metrik empat model pada data uji
              </caption>
              <thead>
                <tr className="bg-surface-2">
                  <th
                    scope="col"
                    className="px-4 py-3 text-left font-medium text-muted"
                  >
                    Model
                  </th>
                  {METRIC_COLUMNS.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className="px-4 py-3 text-right font-medium text-muted"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orderedModels.map((model, index) => {
                  const isBest = index === 0;
                  return (
                    <tr
                      key={model.id}
                      className={cn(
                        "border-t border-line",
                        isBest && "bg-accent-soft",
                      )}
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 text-left font-medium text-ink"
                      >
                        <span className="flex items-center gap-2">
                          {model.name}
                          {isBest ? (
                            <span className="rounded-full bg-accent px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-white">
                              Terbaik
                            </span>
                          ) : null}
                        </span>
                      </th>
                      {METRIC_COLUMNS.map((column) => (
                        <td
                          key={column.key}
                          className={cn(
                            "px-4 py-3 text-right font-mono tabular-nums",
                            isBest ? "text-accent-strong" : "text-ink-soft",
                          )}
                        >
                          {pct(model[column.key])}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="text-xs leading-relaxed text-muted">
            Metrik precision, recall, dan F1 memakai rata-rata weighted,
            sehingga sangat dipengaruhi kelas mayoritas. ROC-AUC tidak dihitung
            pada proyek ini, jadi tidak ditampilkan. Diukur pada{" "}
            {metrics.data.n_test} sampel uji dari {metrics.data.n_rows} sampel.
          </p>

          {selectedModel ? (
            <div className="rounded-lg border border-line bg-surface p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif text-lg font-semibold">
                    Confusion matrix
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {selectedModel.name}
                  </p>
                </div>
                <div
                  className="flex flex-wrap gap-2"
                  role="tablist"
                  aria-label="Pilih model untuk confusion matrix"
                >
                  {orderedModels.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      role="tab"
                      aria-selected={selected === model.id}
                      onClick={() => setSelected(model.id)}
                      className={cn(
                        "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                        selected === model.id
                          ? "border-accent bg-accent text-white"
                          : "border-line-strong bg-surface text-ink-soft hover:border-accent hover:text-accent",
                      )}
                    >
                      {model.id.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-5">
                <ConfusionMatrix
                  matrix={selectedModel.confusion_matrix}
                  labels={metrics.class_labels}
                />
              </div>
            </div>
          ) : null}

          <div className="rounded-lg border border-warn/30 bg-warn-soft p-5 text-sm leading-relaxed text-warn">
            <p className="font-medium">Catatan penting tentang keimbangan data</p>
            <p className="mt-1 text-warn/90">
              Dataset sangat tidak seimbang: 533 dari 615 sampel adalah Blood
              Donor. Karena itu akurasi tinggi tidak berarti model mampu
              mengenali hepatitis. Confusion matrix menunjukkan kelas Hepatitis,
              Fibrosis, dan Suspect Blood Donor sangat jarang diprediksi dengan
              benar — perhatikan kolomnya yang hampir kosong.
            </p>
          </div>
        </div>
      ) : null}
    </Section>
  );
}
