import { REFERENCES } from "@/lib/content";
import { Section } from "@/components/ui/Section";

export function References() {
  return (
    <Section
      id="referensi"
      eyebrow="10 · Sumber"
      title="Referensi"
      lede="Konten edukasi di halaman ini ditulis ulang berdasarkan sumber berikut."
      tint
    >
      <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
        {REFERENCES.map((ref) => (
          <li key={ref.url} className="bg-surface">
            <a
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full items-start gap-4 p-5 transition-colors hover:bg-surface-2"
            >
              <span className="mt-0.5 rounded border border-line-strong px-2 py-0.5 font-mono text-[0.7rem] text-muted">
                {ref.tag}
              </span>
              <span className="flex-1">
                <span className="block text-sm font-medium text-ink">
                  {ref.title}
                </span>
                <span className="mt-1 block text-xs text-muted">
                  {ref.meta}
                </span>
              </span>
              <span aria-hidden="true" className="text-muted">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
