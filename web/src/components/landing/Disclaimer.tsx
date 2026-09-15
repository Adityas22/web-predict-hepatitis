export function DisclaimerSection() {
  return (
    <section id="disclaimer" className="scroll-mt-20 border-t border-line py-16 sm:py-20">
      <div className="container-page">
        <div className="rounded-lg border border-danger/30 bg-danger-soft p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <svg
              viewBox="0 0 24 24"
              className="mt-0.5 h-6 w-6 shrink-0 text-danger"
              aria-hidden="true"
              fill="none"
            >
              <path
                d="M12 3 2.5 20h19L12 3Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="M12 10v4.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
              <circle cx="12" cy="17.2" r="0.9" fill="currentColor" />
            </svg>
            <div>
              <p className="eyebrow text-danger">Disclaimer</p>
              <h2 className="mt-2 text-xl font-semibold text-danger sm:text-2xl">
                Bukan alat diagnosis medis
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-danger/90">
                Prediksi ini hanya untuk tujuan edukasi dan demonstrasi. Hasil
                ini bukan diagnosis medis dan tidak boleh dipakai untuk
                mengambil keputusan layanan kesehatan.
              </p>
              <p className="mt-3 max-w-3xl border-l-2 border-danger/40 pl-4 font-mono text-xs leading-relaxed text-danger/80">
                This prediction is for educational and demonstration purposes
                only. It is not a medical diagnosis and should not be used for
                healthcare decisions.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-danger/90">
                Jika Anda mencurigai hepatitis C atau termasuk kelompok
                berisiko, segera temui dokter atau fasilitas kesehatan
                terdekat. Data yang Anda masukkan pada formulir prediksi tidak
                disimpan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
