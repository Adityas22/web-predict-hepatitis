import { isMlApiConfigured, mlFetch } from "@/lib/ml-api";

export const revalidate = 300;

export async function GET() {
  if (!isMlApiConfigured()) {
    return Response.json(
      { error: "ML_API_URL belum dikonfigurasi di server." },
      { status: 503 },
    );
  }

  try {
    const res = await mlFetch("/api/models");
    const data = (await res.json().catch(() => null)) as unknown;

    if (!res.ok || !data) {
      return Response.json(
        { error: "Layanan model tidak mengembalikan data metrik." },
        { status: 502 },
      );
    }

    return Response.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch {
    return Response.json(
      { error: "Tidak dapat menghubungi layanan model." },
      { status: 502 },
    );
  }
}
