export const NAV_LINKS = [
  { href: "/#tentang", label: "Apa itu" },
  { href: "/#cara-kerja", label: "Cara kerja" },
  { href: "/#gejala", label: "Gejala" },
  { href: "/#performa", label: "Performa" },
  { href: "/#dataset", label: "Dataset" },
  { href: "/#referensi", label: "Referensi" },
];

export const GITHUB_URL =
  "https://github.com/Adityas22/predictive-analytics-hepatitis";
export const UCI_URL = "https://archive.ics.uci.edu/dataset/571/hcv+data";

export const TRANSMISSION = [
  {
    title: "Berbagi jarum suntik",
    body: "Penyuntik narkoba yang berbagi jarum atau alat suntik berisiko paling tinggi tertular.",
  },
  {
    title: "Prosedur medis tidak steril",
    body: "Perawatan di fasilitas dengan alat medis yang tidak disterilkan dengan baik dapat memindahkan virus.",
  },
  {
    title: "Transfusi yang tidak diskrining",
    body: "Penerima darah atau organ yang belum melalui pemeriksaan ketat berisiko — sekarang sudah sangat jarang karena skrining rutin.",
  },
  {
    title: "Dari ibu ke bayi",
    body: "Ibu yang terinfeksi dapat menularkan HCV kepada bayinya, terutama saat proses kelahiran.",
  },
  {
    title: "Hubungan seksual berisiko",
    body: "Kontak seksual yang melibatkan paparan darah (seperti saat menstruasi atau luka) juga dapat menularkan virus.",
  },
];

export const SYMPTOMS = {
  acute: [
    "Demam dan rasa lelah",
    "Mual, muntah, nafsu makan turun",
    "Nyeri perut (kuadran kanan atas)",
    "Urin berwarna gelap",
    "Kulit dan mata menguning (jaundice)",
  ],
  chronic: [
    "Kelelahan yang berkepanjangan",
    "Rasa tidak nyaman di perut",
    "Berat badan turun tanpa sebab jelas",
    "Gatal-gatal pada kulit",
    "Komplikasi: sirosis dan kanker hati",
  ],
};

export const RISK_FACTORS = [
  "Pengguna narkoba suntik, terutama yang berbagi jarum.",
  "Tenaga medis yang berisiko tertusuk jarum atau terpapar darah pasien.",
  "Penerima transfusi darah atau organ sebelum era skrining ketat.",
  "Pasien hemodialisis dalam jangka panjang.",
  "Bayi yang lahir dari ibu terinfeksi.",
  "Orang yang pernah ditato atau ditindik dengan alat yang tidak steril.",
  "Orang dengan hubungan seksual berisiko yang melibatkan paparan darah.",
  "Orang yang tinggal bersama penderita HCV dan berbagi benda yang bisa terkontaminasi darah.",
];

export const DIAGNOSIS_STEPS = [
  {
    step: "01",
    title: "Tes antibodi anti-HCV",
    body: "Mendeteksi antibodi yang dibuat tubuh sebagai respons terhadap virus. Positif berarti pernah terpapar — namun belum tentu masih terinfeksi, karena antibodi menetap setelah infeksi sembuh.",
  },
  {
    step: "02",
    title: "Tes RNA HCV (konfirmasi)",
    body: "Jika antibodi positif, tes ini mencari materi genetik virus secara langsung. RNA yang terdeteksi berarti infeksi aktif dan kronis, dan pasien layak mendapat pengobatan.",
  },
];

export const PREVENTION = [
  "Jangan berbagi jarum suntik atau alat suntik apa pun.",
  "Pastikan prosedur medis, tato, dan tindik memakai alat steril sekali pakai.",
  "Skrining ketat pada donor darah dan organ.",
  "Gunakan pengaman saat hubungan seksual berisiko.",
  "Jangan berbagi sikat gigi, pisau cukur, atau benda yang bisa terkena darah.",
];

export const GLOBAL_STATS = [
  {
    value: 47,
    unit: "juta",
    label: "orang hidup dengan infeksi hepatitis C kronis",
  },
  { value: 0.9, unit: "juta", label: "kasus baru per tahun" },
  {
    value: 239,
    unit: "ribu",
    label: "kematian per tahun, terutama akibat sirosis dan kanker hati",
  },
];

export const REFERENCES = [
  {
    tag: "WHO",
    title: "Hepatitis C — Fact Sheet",
    meta: "World Health Organization (diakses 2024)",
    url: "https://www.who.int/news-room/fact-sheets/detail/hepatitis-c",
  },
  {
    tag: "CDC",
    title: "Hepatitis C Basics",
    meta: "U.S. Centers for Disease Control and Prevention (diakses 2024)",
    url: "https://www.cdc.gov/hepatitis-c/about/index.html",
  },
  {
    tag: "HL",
    title: "Hepatitis C: Symptoms, Causes, Risk Factors",
    meta: "Healthline (diakses 2024)",
    url: "https://www.healthline.com/health/hepatitis-c",
  },
  {
    tag: "UCI",
    title: "HCV Data Set — UCI Machine Learning Repository",
    meta: "Dataset yang digunakan untuk melatih model (Lichtinghagen, Klawonn & Hoffmann)",
    url: UCI_URL,
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Input",
    body: "Nilai demografi dan hasil laboratorium dimasukkan lewat formulir: usia, jenis kelamin, dan 10 penanda fungsi hati. Kolom yang dikosongkan diisi median data latih.",
  },
  {
    step: "02",
    title: "Preprocessing",
    body: "Jenis kelamin diubah menjadi kolom biner (Sex_m), urutan fitur disamakan dengan data latih, lalu seluruh nilai diskalakan ke rentang 0–1 memakai MinMaxScaler yang di-fit pada data latih.",
  },
  {
    step: "03",
    title: "ML Model",
    body: "Empat algoritma dilatih pada 492 sampel: KNN (k=3), SVM linear, Random Forest, dan Bernoulli Naive Bayes. Setiap model menghasilkan skor untuk lima kelas.",
  },
  {
    step: "04",
    title: "Prediction",
    body: "Model mengembalikan kelas dengan skor tertinggi beserta distribusi probabilitasnya. Hasil ditampilkan sebagai skrining awal — bukan diagnosis.",
  },
];

export const DATASET_INFO = {
  source: "UCI Machine Learning Repository — HCV Data Set",
  authors: "Ralf Lichtinghagen, Frank Klawonn, Georg Hoffmann",
  journal: "Journal of Laboratory and Precision Medicine",
  rows: 615,
  columns: 14,
  target: "Category (5 kelas)",
  missing: "31 nilai hilang pada ALB (1), ALP (18), ALT (1), CHOL (10), dan PROT (1)",
  imputation: "Imputasi median per kolom",
  encoding:
    "Label encoding untuk target, one-hot encoding untuk Sex (drop_first)",
  scaling: "MinMaxScaler, di-fit hanya pada data latih",
  split: "train_test_split test_size=0.2, random_state=123 (492 latih / 123 uji)",
  leakageNote:
    "Median imputasi dihitung dari seluruh dataset sebelum pembagian data. Ini penyimpangan kecil dari praktik terbaik dan perlu diketahui saat menafsirkan hasil.",
  classCounts: [
    { label: "Blood Donor", count: 533 },
    { label: "Cirrhosis", count: 30 },
    { label: "Hepatitis", count: 24 },
    { label: "Fibrosis", count: 21 },
    { label: "Suspect Blood Donor", count: 7 },
  ],
};

export const DISCLAIMER_TEXT =
  "Prediksi ini hanya untuk tujuan edukasi dan demonstrasi. Hasil ini bukan diagnosis medis dan tidak boleh dipakai untuk mengambil keputusan layanan kesehatan.";
