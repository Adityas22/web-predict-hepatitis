import { DATASET_INFO, UCI_URL } from "@/lib/content";
import { Section } from "@/components/ui/Section";

const ROWS: Array<{ label: string; value: string }> = [
  { label: "Sumber", value: DATASET_INFO.source },
  { label: "Penulis", value: DATASET_INFO.authors },
  { label: "Publikasi", value: DATASET_INFO.journal },
  { label: "Jumlah sampel", value: `${DATASET_INFO.rows} baris` },
  { label: "Jumlah kolom", value: `${DATASET_INFO.columns} kolom` },
  { label: "Target", value: DATASET_INFO.target },
  { label: "Nilai hilang", value: DATASET_INFO.missing },
  { label: "Imputasi", value: DATASET_INFO.imputation },
  { label: "Encoding", value: DATASET_INFO.encoding },
  { label: "Skalasi", value: DATASET_INFO.scaling },
  { label: "Pembagian data", value: DATASET_INFO.split },
];

export function DatasetSection() {
  const maxCount = Math.max(...DATASET_INFO.classCounts.map((c) => c.count));

  return (
    <Section
      id="dataset"
      eyebrow="09 · Data"
      title="Dataset"
      lede="Model dilatih pada HCV Data Set dari UCI Machine Learning Repository."
      tint
    >
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <dl className="overflow-hidden rounded-lg border border-line bg-surface">
          {ROWS.map((row, index) => (
            <div
              key={row.label}
              className={`grid gap-1 px-5 py-3.5 sm:grid-cols-[10rem_1fr] sm:gap-4 ${
                index > 0 ? "border-t border-line" : ""
              }`}
            >
              <dt className="text-xs font-medium uppercase tracking-wide text-muted">
                {row.label}
              </dt>
              <dd className="text-sm leading-relaxed text-ink-soft">
                {row.value}
              </dd>
            </div>
          ))}
          <div className="grid gap-1 border-t border-line px-5 py-3.5 sm:grid-cols-[10rem_1fr] sm:gap-4">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted">
              Tautan
            </dt>
            <dd className="text-sm">
              <a
                href={UCI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent hover:text-accent-strong"
              >
                archive.ics.uci.edu/dataset/571 ↗
              </a>
            </dd>
          </div>
        </dl>

        <div>
          <h3 className="font-serif text-lg font-semibold">
            Distribusi kelas target
          </h3>
          <p className="mt-1 text-sm text-muted">
            Jumlah sampel per kategori pada seluruh dataset.
          </p>
          <ul className="mt-5 space-y-4">
            {DATASET_INFO.classCounts.map((item) => (
              <li key={item.label}>
                <div className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="text-ink-soft">{item.label}</span>
                  <span className="font-mono tabular-nums text-muted">
                    {item.count}
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-md border border-line bg-surface p-4 text-xs leading-relaxed text-muted">
            {DATASET_INFO.leakageNote}
          </p>
        </div>
      </div>
    </Section>
  );
}
