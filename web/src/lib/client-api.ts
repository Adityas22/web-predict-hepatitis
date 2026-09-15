import type { MetricsData, PredictRequest, PredictResult } from "./types";

function extractError(data: unknown, fallback: string): string {
  if (data && typeof data === "object" && "error" in data) {
    const value = (data as { error?: unknown }).error;
    if (typeof value === "string" && value.length > 0) return value;
  }
  return fallback;
}

export async function fetchMetrics(): Promise<MetricsData> {
  const res = await fetch("/api/models", {
    headers: { Accept: "application/json" },
  });
  const data: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(extractError(data, "Gagal memuat metrik model."));
  }
  if (!data) {
    throw new Error("Gagal memuat metrik model.");
  }
  return data as MetricsData;
}

export async function postPredict(
  body: PredictRequest,
): Promise<PredictResult> {
  const res = await fetch("/api/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(
      extractError(data, "Terjadi kesalahan saat memproses prediksi."),
    );
  }
  if (!data) {
    throw new Error("Terjadi kesalahan saat memproses prediksi.");
  }
  return data as PredictResult;
}
