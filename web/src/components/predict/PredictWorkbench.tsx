"use client";

import { useEffect, useState } from "react";
import { AGE, LAB_FEATURES, SEX_OPTIONS } from "@/lib/features";
import { fetchMetrics, postPredict } from "@/lib/client-api";
import type { MetricsData, PredictRequest, PredictResult } from "@/lib/types";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { ModelPicker } from "@/components/predict/ModelPicker";
import { ResultCard } from "@/components/predict/ResultCard";

function inputClass(hasError: boolean): string {
  return cn(
    "mt-2 h-11 w-full rounded-md border bg-surface px-3 font-mono text-sm tabular-nums text-ink transition-colors placeholder:font-sans placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-accent/20",
    hasError
      ? "border-danger focus:border-danger"
      : "border-line-strong focus:border-accent",
  );
}

export function PredictWorkbench() {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [metricsError, setMetricsError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const [age, setAge] = useState("");
  const [sex, setSex] = useState<"f" | "m">("f");
  const [labs, setLabs] = useState<Record<string, string>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<PredictResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        setSelectedModel(best);
      })
      .catch((err: Error) => {
        if (active) setMetricsError(err.message);
      });
    return () => {
      active = false;
    };
  }, []);

  function resetForm() {
    setAge("");
    setSex("f");
    setLabs({});
    setFieldErrors({});
    setResult(null);
    setError(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors: Record<string, string> = {};
    const ageNumber = Number(age);
    if (age.trim() === "") {
      errors.Age = "Usia wajib diisi.";
    } else if (
      !Number.isFinite(ageNumber) ||
      ageNumber < 1 ||
      ageNumber > 120
    ) {
      errors.Age = "Usia harus berupa angka antara 1–120 tahun.";
    }

    for (const feature of LAB_FEATURES) {
      const raw = labs[feature.key];
      if (raw == null || raw.trim() === "") continue;
      const numeric = Number(raw);
      if (!Number.isFinite(numeric) || numeric < 0) {
        errors[feature.key] = "Masukkan angka yang valid.";
      }
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    if (!selectedModel) {
      setError("Pilih model terlebih dahulu.");
      return;
    }

    const features: Record<string, number | string> = {
      Age: ageNumber,
      Sex: sex,
    };
    for (const feature of LAB_FEATURES) {
      const raw = labs[feature.key];
      if (raw == null || raw.trim() === "") continue;
      features[feature.key] = Number(raw);
    }

    const payload: PredictRequest = { model: selectedModel, features };

    setSubmitting(true);
    setError(null);
    try {
      const data = await postPredict(payload);
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat memproses prediksi.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      <form onSubmit={handleSubmit} noValidate className="rounded-lg border border-line bg-surface p-6 sm:p-8">
        <h2 className="font-serif text-xl font-semibold">
          Data Pasien &amp; Hasil Lab
        </h2>
        <p className="mt-1 text-sm text-muted">
          Gunakan nilai laboratorium terakhir Anda. Satuan mengikuti standar
          pemeriksaan umum.
        </p>

        <fieldset className="mt-8">
          <legend className="font-mono text-xs uppercase tracking-wider text-muted">
            Identitas
          </legend>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="age"
                className="flex items-baseline justify-between gap-2 text-sm font-medium text-ink"
              >
                <span>{AGE.label}</span>
                <span className="text-xs font-normal text-muted">
                  {AGE.unit}
                </span>
              </label>
              <p className="mt-1 text-xs text-muted">
                Rentang data latih: {AGE.trainMin}–{AGE.trainMax} tahun.
              </p>
              <input
                id="age"
                name="Age"
                type="number"
                inputMode="numeric"
                min={AGE.min}
                max={AGE.max}
                step={1}
                value={age}
                onChange={(event) => setAge(event.target.value)}
                aria-invalid={Boolean(fieldErrors.Age)}
                aria-describedby={fieldErrors.Age ? "age-error" : undefined}
                className={inputClass(Boolean(fieldErrors.Age))}
              />
              {fieldErrors.Age ? (
                <p id="age-error" className="mt-1 text-xs text-danger">
                  {fieldErrors.Age}
                </p>
              ) : null}
            </div>

            <div>
              <span className="text-sm font-medium text-ink">
                Jenis Kelamin
              </span>
              <div
                role="radiogroup"
                aria-label="Jenis kelamin"
                className="mt-2 inline-flex rounded-md border border-line-strong bg-surface p-1"
              >
                {SEX_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className={cn(
                      "cursor-pointer rounded px-4 py-2 text-sm transition-colors",
                      sex === option.value
                        ? "bg-accent text-white"
                        : "text-ink-soft hover:text-ink",
                    )}
                  >
                    <input
                      type="radio"
                      name="Sex"
                      value={option.value}
                      checked={sex === option.value}
                      onChange={() => setSex(option.value)}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="mt-10">
          <legend className="font-mono text-xs uppercase tracking-wider text-muted">
            Panel Fungsi Hati
          </legend>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {LAB_FEATURES.map((feature) => {
              const hasError = Boolean(fieldErrors[feature.key]);
              return (
                <div key={feature.key}>
                  <label
                    htmlFor={`lab-${feature.key}`}
                    className="flex items-baseline justify-between gap-2 text-sm font-medium text-ink"
                  >
                    <span>
                      <span className="font-mono text-xs text-accent">
                        {feature.key}
                      </span>{" "}
                      {feature.name}
                    </span>
                    <span className="text-xs font-normal text-muted">
                      {feature.unit}
                    </span>
                  </label>
                  <p className="mt-1 text-xs text-muted">
                    {feature.description}
                  </p>
                  <input
                    id={`lab-${feature.key}`}
                    name={feature.key}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min={0}
                    value={labs[feature.key] ?? ""}
                    onChange={(event) =>
                      setLabs((current) => ({
                        ...current,
                        [feature.key]: event.target.value,
                      }))
                    }
                    placeholder="kosongkan jika tidak tahu"
                    aria-invalid={hasError}
                    aria-describedby={
                      hasError ? `lab-${feature.key}-error` : undefined
                    }
                    className={inputClass(hasError)}
                  />
                  {hasError ? (
                    <p
                      id={`lab-${feature.key}-error`}
                      className="mt-1 text-xs text-danger"
                    >
                      {fieldErrors[feature.key]}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            Kosongkan kolom yang tidak Anda ketahui — nilai tersebut akan diisi
            dengan median dari data latih model. Semakin lengkap, semakin
            representatif hasilnya.
          </p>
        </fieldset>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button type="submit" size="lg" disabled={submitting || !metrics}>
            {submitting ? "Memproses…" : "Prediksi Sekarang"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={resetForm}
          >
            Reset
          </Button>
        </div>

        {metricsError ? (
          <p
            role="alert"
            className="mt-4 rounded-md border border-danger/30 bg-danger-soft p-3 text-sm text-danger"
          >
            {metricsError} Prediksi tidak dapat dijalankan sampai layanan model
            tersedia.
          </p>
        ) : null}
      </form>

      <aside className="space-y-6 lg:sticky lg:top-24">
        <div className="rounded-lg border border-line bg-surface p-6">
          <h2 className="font-serif text-xl font-semibold">Pilih Model</h2>
          <p className="mt-1 text-sm text-muted">
            Setiap algoritma menafsirkan data secara berbeda. Akurasi diambil
            dari evaluasi pada data uji.
          </p>
          <div className="mt-4">
            <ModelPicker
              metrics={metrics}
              selected={selectedModel}
              onSelect={setSelectedModel}
            />
          </div>
        </div>

        <div className="rounded-lg border border-line bg-surface p-6" aria-live="polite">
          {submitting ? (
            <div className="space-y-3">
              <div className="h-4 w-32 animate-pulse rounded bg-line" />
              <div className="h-8 w-48 animate-pulse rounded bg-surface-2" />
              <div className="h-24 w-full animate-pulse rounded bg-surface-2" />
              <p className="text-sm text-muted">Memproses prediksi…</p>
            </div>
          ) : error ? (
            <div
              role="alert"
              className="rounded-md border border-danger/30 bg-danger-soft p-4 text-sm text-danger"
            >
              {error}
            </div>
          ) : result ? (
            <ResultCard
              result={result}
              classLabels={metrics?.class_labels ?? []}
            />
          ) : (
            <div className="text-center">
              <svg
                viewBox="0 0 24 24"
                className="mx-auto h-10 w-10 text-line-strong"
                aria-hidden="true"
                fill="none"
              >
                <path
                  d="M12 2.5S5 10.5 5 15.5a7 7 0 0 0 14 0c0-5-7-13-7-13Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M9.5 12.5h5M12 10v5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Hasil prediksi akan muncul di sini setelah Anda mengisi formulir
                dan menekan <strong>Prediksi Sekarang</strong>.
              </p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
