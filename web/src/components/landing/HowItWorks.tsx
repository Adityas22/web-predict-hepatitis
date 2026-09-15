import { HOW_IT_WORKS } from "@/lib/content";
import { Section } from "@/components/ui/Section";

export function HowItWorks() {
  return (
    <Section
      id="cara-kerja"
      eyebrow="Alur model"
      title="Bagaimana prediksi bekerja"
      lede="Empat tahap yang sama persis dengan pipeline pada notebook pelatihan model."
      tint
    >
      <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-4">
        {HOW_IT_WORKS.map((step) => (
          <li key={step.step} className="bg-surface p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/30 bg-accent-soft font-mono text-xs font-semibold text-accent-strong">
                {step.step}
              </span>
              <h3 className="font-serif text-lg font-semibold text-ink">
                {step.title}
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
