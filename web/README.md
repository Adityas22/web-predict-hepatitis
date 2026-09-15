# HepaCheck — Web (Next.js)

Frontend demo prediksi hepatitis C. Dibangun dengan Next.js (App Router),
TypeScript, dan Tailwind CSS. UI terpisah dari model ML: semua permintaan
prediksi diteruskan lewat API route ke layanan FastAPI.

## Prasyarat

- Node.js 20.9+
- Layanan ML API berjalan (lihat `../DEPLOYMENT.md`)

## Menjalankan lokal

```bash
# 1. Jalankan ML API dari root repo
uvicorn app.main:app --reload --port 8000

# 2. Siapkan environment web
cp .env.example .env.local

# 3. Jalankan frontend
npm install
npm run dev
```

Buka http://localhost:3000

## Environment variables

| Nama            | Wajib | Deskripsi                                                        |
| --------------- | ----- | ---------------------------------------------------------------- |
| `ML_API_URL`    | Ya    | Base URL layanan ML API, tanpa trailing slash. Hanya server-side. |
| `ML_API_SECRET` | Tidak | Jika diisi, dikirim sebagai header `x-api-key` ke ML API.        |

Nilai ini tidak pernah dikirim ke browser — hanya dipakai di API route.

## Skrip

```bash
npm run dev     # pengembangan
npm run build   # build produksi
npm start       # jalankan hasil build
npm run lint    # ESLint
```

## Struktur singkat

```
src/
  app/
    page.tsx                 # landing + section edukasi
    predict/page.tsx         # halaman prediksi
    api/models/route.ts      # proxy metrik ke ML API
    api/predict/route.ts     # proxy prediksi ke ML API
  components/
    landing/                 # section halaman utama
    predict/                 # form, pemilih model, hasil, confusion matrix
    site/                    # navbar, footer
    ui/                      # tombol, section
  lib/
    features.ts              # metadata fitur + rentang rujukan
    content.ts               # konten edukasi (Indonesian)
    client-api.ts            # pemanggilan /api dari browser
    ml-api.ts                # helper server-side ke ML API
```

Deployment: lihat [`../DEPLOYMENT.md`](../DEPLOYMENT.md).
