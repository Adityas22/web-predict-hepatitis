# Deployment — HepaCheck

Arsitektur: **UI di Vercel**, **model ML di layanan Python terpisah**. Model
scikit-learn (`.joblib`) tidak dijalankan di Vercel; Next.js hanya mem-proxy
permintaan ke ML API sehingga UI dan model tetap terpisah.

```
Browser
  └─ Next.js (Vercel)
       ├─ GET  /api/models   → ML_API_URL/api/models
       └─ POST /api/predict  → ML_API_URL/api/predict  (+ x-api-key)
                                   └─ FastAPI (app/main.py) → models/*.joblib
```

## 1. ML API (FastAPI)

Deploy dari root repo. File yang dibutuhkan: `app/`, `models/`, `dataset/`,
`requirements.txt`, `Procfile`.

### Render (contoh)

Repo sudah menyertakan `render.yaml`. Buat Blueprint dari repo, atau set manual:

- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Health check: `/api/health`

### Environment variables ML API

| Nama            | Wajib | Deskripsi                                                              |
| --------------- | ----- | ---------------------------------------------------------------------- |
| `ML_API_SECRET` | Tidak | Jika diisi, semua `/api/*` wajib menyertakan header `x-api-key`.        |
| `CORS_ORIGINS`  | Tidak | Daftar origin dipisah koma. Default `*`. Isi domain Vercel saat produksi. |

> Catatan: karena browser hanya memanggil proxy Next.js, CORS sebenarnya tidak
> wajib. Tetap disarankan membatasi `CORS_ORIGINS` ke domain produksi.

Verifikasi:

```bash
curl https://<ml-api-host>/api/health
curl https://<ml-api-host>/api/models
```

## 2. Frontend (Vercel)

- Import repo GitHub ke Vercel.
- **Root Directory: `web`** (penting — repo root berisi model Python).
- Framework preset: Next.js. Build command dan output default sudah benar.

### Environment variables Vercel

| Nama            | Environment | Nilai                                        |
| --------------- | ----------- | -------------------------------------------- |
| `ML_API_URL`    | Production, Preview | URL ML API, mis. `https://hepacheck-ml-api.onrender.com` |
| `ML_API_SECRET` | Production, Preview | Samakan dengan `ML_API_SECRET` ML API (opsional) |

`ML_API_URL` **tidak** memakai prefix `NEXT_PUBLIC_`, sehingga tidak terekspos
ke browser.

## 3. Uji produksi

1. Buka halaman prediksi.
2. Isi usia dan beberapa nilai lab, tekan **Prediksi Sekarang**.
3. Pastikan muncul kelas, probabilitas, dan confusion matrix.
4. Cek tabel performa di landing terisi dari `/api/models`.
5. Uji input tidak valid (usia kosong, nilai lab negatif) — harus muncul pesan
   kesalahan, bukan crash.

## 4. Pengembangan lokal

```bash
# Terminal 1 — ML API
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Terminal 2 — frontend
cd web
cp .env.example .env.local
npm install
npm run dev
```

## Catatan versi

Artefak `models/*.joblib` dibuat dengan Python 3.10 dan scikit-learn 1.7.2.
Versi pada `requirements.txt` sudah dipin agar `joblib.load` kompatibel. Jika
melatih ulang model (`python export_models.py`), perbarui pin bila versi
library berubah.
