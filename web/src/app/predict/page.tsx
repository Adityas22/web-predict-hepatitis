import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PredictWorkbench } from "@/components/predict/PredictWorkbench";

export const metadata: Metadata = {
  title: "Coba Prediksi",
  description:
    "Masukkan nilai pemeriksaan darah, pilih algoritma machine learning, dan lihat prediksi status hepatitis C beserta tingkat keyakinannya. Untuk tujuan edukasi.",
};

export default function PredictPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <header className="border-b border-line bg-surface">
          <div className="container-page py-12">
            <Link
              href="/"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              ← Kembali ke beranda
            </Link>
            <p className="eyebrow mt-6">Skrining awal · berbasis data lab</p>
            <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Coba Prediksi
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              Isi nilai pemeriksaan darah Anda, pilih algoritma yang ingin
              dipakai, lalu lihat bagaimana model machine learning
              menafsirkannya. Hasil disertai tingkat keyakinan dan penjelasan
              kontekstual.
            </p>
          </div>
        </header>

        <section className="py-12">
          <div className="container-page">
            <div className="mb-8 flex items-start gap-3 rounded-md border border-warn/30 bg-warn-soft p-4 text-sm leading-relaxed text-warn">
              <span aria-hidden="true" className="mt-0.5 font-semibold">
                !
              </span>
              <p>
                Hasil prediksi <strong>bukan diagnosis medis</strong> dan tidak
                boleh dipakai untuk mengambil keputusan layanan kesehatan. Data
                yang Anda masukkan tidak disimpan.
              </p>
            </div>
            <PredictWorkbench />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
