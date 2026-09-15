import { AGE, LAB_FEATURES } from "@/lib/features";
import { isMlApiConfigured, mlFetch } from "@/lib/ml-api";

export const maxDuration = 60;

const ALLOWED_NUMERIC = new Set<string>([
  AGE.key,
  ...LAB_FEATURES.map((feature) => feature.key),
]);

function sanitizeFeatures(input: unknown): Record<string, number | string> | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return null;
  }

  const output: Record<string, number | string> = {};

  for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
    if (key === "Sex") {
      if (value === "m" || value === "f") output.Sex = value;
      continue;
    }
    if (!ALLOWED_NUMERIC.has(key)) continue;

    const numeric =
      typeof value === "number"
        ? value
        : typeof value === "string" && value.trim() !== ""
          ? Number(value)
          : Number.NaN;

    if (Number.isFinite(numeric)) output[key] = numeric;
  }

  return output;
}

export async function POST(request: Request) {
  if (!isMlApiConfigured()) {
    return Response.json(
      { error: "ML_API_URL belum dikonfigurasi di server." },
      { status: 503 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { error: "Body permintaan bukan JSON yang valid." },
      { status: 400 },
    );
  }

  const body = payload as { model?: unknown; features?: unknown };
  if (!body || typeof body.model !== "string" || body.model.length === 0) {
    return Response.json(
      { error: "Field 'model' wajib diisi." },
      { status: 400 },
    );
  }

  const features = sanitizeFeatures(body.features);
  if (!features || Object.keys(features).length === 0) {
    return Response.json(
      { error: "Tidak ada fitur valid yang dikirim." },
      { status: 400 },
    );
  }

  try {
    const res = await mlFetch("/api/predict", {
      method: "POST",
      body: JSON.stringify({ model: body.model, features }),
    });
    const data = (await res.json().catch(() => null)) as
      | { error?: string }
      | null;

    if (!res.ok) {
      const message =
        data?.error ?? "Layanan model mengembalikan kesalahan.";
      return Response.json(
        { error: message },
        { status: res.status === 400 ? 400 : 502 },
      );
    }

    return Response.json(data);
  } catch {
    return Response.json(
      { error: "Tidak dapat menghubungi layanan model." },
      { status: 502 },
    );
  }
}
