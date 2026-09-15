import Link from "next/link";
import { GITHUB_URL, NAV_LINKS } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr]">
        <div className="max-w-xl">
          <p className="font-serif text-lg font-semibold tracking-tight">
            Hepa<span className="text-accent">Check</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Demo edukasi yang membandingkan empat algoritma machine learning
            untuk mengklasifikasikan status hepatitis C dari data laboratorium.
            Seluruh konten bersifat edukasi dan bukan pengganti diagnosis,
            pemeriksaan, atau konsultasi medis profesional.
          </p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-strong"
          >
            Repositori GitHub
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <nav aria-label="Navigasi footer" className="md:justify-self-end">
          <p className="eyebrow mb-4">Navigasi</p>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 md:grid-cols-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/predict"
                className="text-sm text-muted hover:text-ink"
              >
                Coba Prediksi
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono">
            HepaCheck · Proyek ML prediksi hepatitis C · Aditya Septiawan
          </p>
          <p>Dibuat untuk tujuan edukasi. Bukan alat diagnosis medis.</p>
        </div>
      </div>
    </footer>
  );
}
