import {
  DIAGNOSIS_STEPS,
  GLOBAL_STATS,
  PREVENTION,
  RISK_FACTORS,
  SYMPTOMS,
  TRANSMISSION,
} from "@/lib/content";
import { Section } from "@/components/ui/Section";

export function AboutSection() {
  return (
    <Section
      id="tentang"
      eyebrow="01 · Dasar"
      title="Apa itu Hepatitis C?"
      tint
    >
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            Hepatitis C adalah peradangan pada hati yang dipicu oleh infeksi
            virus hepatitis C (HCV). Infeksi ini bisa berlangsung singkat (
            <strong className="font-semibold text-ink">akut</strong>) selama
            beberapa minggu, atau menetap dan berkembang menjadi{" "}
            <strong className="font-semibold text-ink">kronis</strong> — sebuah
            kondisi yang dapat berjalan bertahun-tahun tanpa disadari hingga
            akhirnya merusak hati.
          </p>
          <p>
            HCV adalah virus{" "}
            <strong className="font-semibold text-ink">bloodborne</strong>{" "}
            (menular melalui darah). Berbeda dengan hepatitis A yang menyebar
            lewat makanan, HCV berpindah ketika darah orang yang terinfeksi
            masuk ke aliran darah orang lain.
          </p>
        </div>
        <div className="space-y-4">
          <div className="rounded-lg border border-line bg-paper p-5">
            <span className="eyebrow">Akut</span>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Infeksi awal yang umumnya berlangsung beberapa minggu. Sebagian
              orang mampu membersihkan virusnya sendiri tanpa pengobatan.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-paper p-5">
            <span className="eyebrow text-warn">Kronis</span>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Jika virus menetap lebih dari 6 bulan, infeksi menjadi kronis dan
              berisiko menimbulkan sirosis atau kanker hati bila tidak
              ditangani.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function TransmissionSection() {
  return (
    <Section
      id="penularan"
      eyebrow="02 · Penyebab"
      title="Bagaimana cara menular?"
      lede="HCV hanya menular lewat darah. Lima jalur penularan yang paling umum:"
    >
      <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {TRANSMISSION.map((item) => (
          <li key={item.title} className="bg-surface p-6">
            <h3 className="font-serif text-lg font-semibold text-ink">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {item.body}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
        HCV <em>tidak</em> menular lewat air liur, bersin, pelukan, berbagi
        makanan, atau ciuman biasa.
      </p>
    </Section>
  );
}

export function SymptomsSection() {
  return (
    <Section
      id="gejala"
      eyebrow="03 · Tanda"
      title="Gejala: sering kali tak terasa"
      lede="Inilah bagian yang membuat hepatitis C berbahaya — sebagian besar orang tidak menyadari infeksinya."
      tint
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-lg border border-line bg-paper p-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-accent">A</span>
            <h3 className="font-serif text-lg font-semibold">Fase Akut</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Pada fase awal, sebagian besar orang{" "}
            <strong className="font-semibold text-ink">
              tidak merasakan gejala apa pun
            </strong>
            . Bila muncul, gejalanya bisa ringan dan mirip flu:
          </p>
          <ul className="mt-4 space-y-2">
            {SYMPTOMS.acute.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-ink-soft"
              >
                <span aria-hidden="true" className="text-accent">
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-lg border border-line bg-paper p-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-accent">B</span>
            <h3 className="font-serif text-lg font-semibold">Fase Kronis</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Infeksi kronis bisa{" "}
            <strong className="font-semibold text-ink">
              asimtomatik selama bertahun-tahun
            </strong>
            , lalu muncul tanda berikut saat kerusakan sudah berjalan:
          </p>
          <ul className="mt-4 space-y-2">
            {SYMPTOMS.chronic.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-ink-soft"
              >
                <span aria-hidden="true" className="text-accent">
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </Section>
  );
}

export function RiskSection() {
  return (
    <Section
      id="risiko"
      eyebrow="04 · Siapa yang rentan"
      title="Faktor risiko"
      lede="Anda berisiko lebih tinggi jika termasuk salah satu kelompok berikut:"
    >
      <ul className="grid gap-3 sm:grid-cols-2">
        {RISK_FACTORS.map((item) => (
          <li
            key={item}
            className="flex gap-3 rounded-md border border-line bg-surface p-4 text-sm leading-relaxed text-ink-soft"
          >
            <span aria-hidden="true" className="mt-0.5 text-accent">
              ▪
            </span>
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function DiagnosisSection() {
  return (
    <Section
      id="diagnosis"
      eyebrow="05 · Langkah"
      title="Bagaimana cara mendiagnosis?"
      lede="Diagnosis hepatitis C dilakukan bertahap, melalui dua tes darah yang saling melengkapi:"
      tint
    >
      <ol className="grid gap-6 lg:grid-cols-2">
        {DIAGNOSIS_STEPS.map((item) => (
          <li key={item.step} className="rounded-lg border border-line bg-paper p-6">
            <span className="font-mono text-sm text-accent">{item.step}</span>
            <h3 className="mt-2 font-serif text-lg font-semibold">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {item.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function TreatmentSection() {
  return (
    <Section
      id="pengobatan"
      eyebrow="06 · Solusi"
      title="Pengobatan & pencegahan"
    >
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h3 className="font-serif text-xl font-semibold">
            Kabar baik: hepatitis C dapat disembuhkan
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Hingga saat ini <strong>belum ada vaksin</strong> untuk hepatitis C.
            Namun infeksi ini <em>bisa disembuhkan</em> dengan obat antivirus
            golongan <strong>DAA (direct-acting antivirals)</strong> —
            pengobatan oral selama sekitar 8–12 minggu dengan tingkat kesembuhan
            lebih dari 90% pada sebagian besar pasien.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Makin cepat terdeteksi, makin besar peluang sembuh tanpa komplikasi
            serius. Karena itu, skrining pada kelompok berisiko sangat
            dianjurkan.
          </p>
        </div>
        <div>
          <h3 className="font-serif text-xl font-semibold">Cara mencegah</h3>
          <ul className="mt-4 space-y-2">
            {PREVENTION.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-ink-soft"
              >
                <span aria-hidden="true" className="text-accent">
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export function StatsSection() {
  return (
    <section id="statistik" className="scroll-mt-20 bg-ink py-16 text-white sm:py-20">
      <div className="container-page">
        <p className="eyebrow text-accent-soft/80">07 · Angka di dunia</p>
        <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight sm:text-[2rem]">
          Skala global masalah ini
        </h2>
        <dl className="mt-10 grid gap-8 sm:grid-cols-3">
          {GLOBAL_STATS.map((stat) => (
            <div key={stat.label}>
              <dd className="font-mono text-4xl font-semibold tabular-nums text-white">
                {stat.value % 1 !== 0 ? stat.value.toFixed(1) : stat.value}
                <span className="ml-2 text-base font-normal text-white/60">
                  {stat.unit}
                </span>
              </dd>
              <dt className="mt-2 max-w-xs text-sm leading-relaxed text-white/70">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
        <p className="mt-8 font-mono text-xs text-white/50">
          Sumber: WHO Hepatitis C Fact Sheet, 2024.
        </p>
      </div>
    </section>
  );
}
