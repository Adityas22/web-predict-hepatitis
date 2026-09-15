import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/landing/Hero";
import {
  AboutSection,
  DiagnosisSection,
  RiskSection,
  StatsSection,
  SymptomsSection,
  TransmissionSection,
  TreatmentSection,
} from "@/components/landing/Hepatitis";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Performance } from "@/components/landing/Performance";
import { DatasetSection } from "@/components/landing/DatasetSection";
import { DisclaimerSection } from "@/components/landing/Disclaimer";
import { References } from "@/components/landing/References";
import { ButtonLink } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <TransmissionSection />
        <SymptomsSection />
        <RiskSection />
        <DiagnosisSection />
        <TreatmentSection />
        <HowItWorks />

        <section className="border-t border-line py-16 sm:py-20">
          <div className="container-page">
            <div className="flex flex-col gap-6 rounded-lg border border-line bg-surface p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div>
                <h2 className="font-serif text-2xl font-semibold tracking-tight">
                  Punya hasil lab? Coba prediksi sekarang.
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                  Masukkan nilai pemeriksaan darah, pilih algoritma, dan lihat
                  bagaimana model machine learning menafsirkannya — lengkap
                  dengan tingkat keyakinan dan penjelasan kontekstualnya.
                </p>
              </div>
              <ButtonLink href="/predict" size="lg" className="shrink-0">
                Menuju Halaman Prediksi
              </ButtonLink>
            </div>
          </div>
        </section>

        <Performance />
        <DatasetSection />
        <StatsSection />
        <DisclaimerSection />
        <References />
      </main>
      <Footer />
    </>
  );
}
