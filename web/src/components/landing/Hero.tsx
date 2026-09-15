import { ButtonLink } from "@/components/ui/Button";

const SAMPLE_ROWS = [
  { code: "ALT", value: "23.0", unit: "U/L", status: "normal" },
  { code: "AST", value: "25.9", unit: "U/L", status: "normal" },
  { code: "GGT", value: "23.3", unit: "U/L", status: "normal" },
  { code: "BIL", value: "7.3", unit: "µmol/L", status: "normal" },
  { code: "ALB", value: "42.0", unit: "g/L", status: "normal" },
  { code: "ALT", value: "180.4", unit: "U/L", status: "alert" },
] as const;

function LabPanel() {
  return (
    <div className="lg:pl-6">
      <div className="rounded-lg border border-line bg-paper p-5 shadow-[0_1px_0_rgba(20,24,29,0.04)]">
        <div className="flex items-start justify-between gap-4 border-b border-line pb-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">
              Permintaan Pemeriksaan
            </p>
            <p className="mt-1 font-mono text-sm text-ink-soft">SMPL-0007</p>
          </div>
          <span className="rounded-full border border-line-strong px-3 py-1 text-xs text-muted">
            Liver Panel
          </span>
        </div>

        <dl className="mt-2 divide-y divide-line">
          {SAMPLE_ROWS.map((row, index) => (
            <div
              key={`${row.code}-${index}`}
              className="flex items-center gap-3 py-3"
            >
              <dt className="w-12 font-mono text-sm font-medium text-ink-soft">
                {row.code}
              </dt>
              <dd className="ml-auto flex items-baseline gap-2">
                <span className="font-mono text-sm tabular-nums text-ink">
                  {row.value}
                </span>
                <span className="w-14 text-xs text-muted">{row.unit}</span>
              </dd>
              <span
                aria-hidden="true"
                className={`h-2 w-2 shrink-0 rounded-full ${
                  row.status === "alert" ? "bg-warn" : "bg-good"
                }`}
              />
              <span className="sr-only">
                {row.status === "alert"
                  ? "Di luar rentang umum"
                  : "Dalam rentang umum"}
              </span>
            </div>
          ))}
        </dl>

        <p className="border-t border-line pt-3 font-mono text-[0.7rem] text-muted">
          HepaCheck · Liver Panel v1
        </p>
      </div>
      <p className="mt-3 text-xs text-muted">
        Nilai contoh dari data latih model — bandingkan dengan hasil lab Anda.
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <header className="border-b border-line bg-surface">
      <div className="container-page grid gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <div>
          <p className="eyebrow">
            Skrining hepatitis C · berbasis machine learning
          </p>
          <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
            Hepatitis C bisa <em className="text-accent">diam-diam</em>{" "}
            berkembang. Mulai dari memahaminya.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            Kami merangkum apa yang perlu Anda ketahui tentang infeksi virus
            hepatitis C — dari cara menular, gejala, hingga pengobatannya — lalu
            mengubahnya menjadi alat prediksi berbasis data laboratorium.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/predict" size="lg">
              Coba Prediksi
            </ButtonLink>
            <ButtonLink href="#tentang" variant="ghost" size="lg">
              Pelajari faktanya
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-muted">
            Konten edukasi. Bukan pengganti diagnosis medis.
          </p>
        </div>

        <LabPanel />
      </div>
    </header>
  );
}
