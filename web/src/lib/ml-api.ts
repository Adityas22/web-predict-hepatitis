const ML_API_URL = process.env.ML_API_URL;
const ML_API_SECRET = process.env.ML_API_SECRET;

export function isMlApiConfigured(): boolean {
  return typeof ML_API_URL === "string" && ML_API_URL.length > 0;
}

export async function mlFetch(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  if (!ML_API_URL) {
    throw new Error("ML_API_URL belum dikonfigurasi");
  }

  const base = ML_API_URL.replace(/\/+$/, "");
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");
  if (ML_API_SECRET) {
    headers.set("x-api-key", ML_API_SECRET);
  }

  const controller = new AbortController();
  // Long enough to survive a cold start on free hosting tiers.
  const timeout = setTimeout(() => controller.abort(), 55000);

  try {
    return await fetch(`${base}${path}`, {
      ...init,
      headers,
      signal: controller.signal,
      cache: "no-store",
    });
  } finally {
    clearTimeout(timeout);
  }
}
