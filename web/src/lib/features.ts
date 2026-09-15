export interface LabFeature {
  key: string;
  name: string;
  unit: string;
  description: string;
  /** Rentang nilai pada data latih (bukan rentang rujukan klinis). */
  trainMin: number;
  trainMax: number;
  /** Rentang rujukan umum untuk penandaan nilai di luar rentang. */
  refMin: number;
  refMax: number;
  refHigh: string | null;
  refLow: string | null;
}

export const AGE = {
  key: "Age",
  label: "Usia",
  unit: "tahun",
  trainMin: 19,
  trainMax: 77,
  min: 1,
  max: 120,
} as const;

export const SEX_OPTIONS = [
  { value: "f", label: "Perempuan" },
  { value: "m", label: "Laki-laki" },
] as const;

/** Urutan kolom persis seperti `feature_names` pada artefak model. */
export const MODEL_FEATURE_ORDER = [
  "Age",
  "ALB",
  "ALP",
  "ALT",
  "AST",
  "BIL",
  "CHE",
  "CHOL",
  "CREA",
  "GGT",
  "PROT",
  "Sex_m",
] as const;

export const LAB_FEATURES: LabFeature[] = [
  {
    key: "ALB",
    name: "Albumin",
    unit: "g/L",
    description: "Protein utama yang diproduksi hati.",
    trainMin: 14.9,
    trainMax: 82.2,
    refMin: 35,
    refMax: 50,
    refHigh: "kadar albumin di atas rentang umum",
    refLow:
      "kadar albumin di bawah rentang umum dapat menandakan penurunan fungsi hati atau gizi",
  },
  {
    key: "ALP",
    name: "Alkaline Phosphatase",
    unit: "U/L",
    description: "Enzim terkait kesehatan hati dan tulang.",
    trainMin: 11.3,
    trainMax: 416.6,
    refMin: 44,
    refMax: 147,
    refHigh:
      "kadar ALP yang tinggi bisa menandakan gangguan hati atau saluran empedu",
    refLow: null,
  },
  {
    key: "ALT",
    name: "Alanine Aminotransferase",
    unit: "U/L",
    description: "Enzim hati — naik saat sel hati mengalami kerusakan.",
    trainMin: 0.9,
    trainMax: 325.3,
    refMin: 7,
    refMax: 56,
    refHigh: "kadar ALT yang tinggi sering menjadi penanda kerusakan sel hati",
    refLow: null,
  },
  {
    key: "AST",
    name: "Aspartate Aminotransferase",
    unit: "U/L",
    description: "Enzim hati — naik saat sel hati, jantung, atau otot rusak.",
    trainMin: 10.6,
    trainMax: 324,
    refMin: 10,
    refMax: 40,
    refHigh:
      "kadar AST yang tinggi bisa menandakan kerusakan hati, jantung, atau otot",
    refLow: null,
  },
  {
    key: "BIL",
    name: "Bilirubin",
    unit: "µmol/L",
    description:
      "Zat kuning dari sel darah merah; tinggi dapat menyebabkan kulit menguning.",
    trainMin: 0.8,
    trainMax: 254,
    refMin: 3.4,
    refMax: 20.5,
    refHigh:
      "bilirubin tinggi bisa menandakan gangguan hati/empedu dan dapat menyebabkan kulit menguning",
    refLow: null,
  },
  {
    key: "CHE",
    name: "Cholinesterase",
    unit: "U/L",
    description: "Enzim yang diproduksi oleh hati.",
    trainMin: 1.42,
    trainMax: 16.41,
    refMin: 5.4,
    refMax: 13.2,
    refHigh: null,
    refLow:
      "kadar CHE rendah dapat menandakan penurunan kemampuan hati membuat protein",
  },
  {
    key: "CHOL",
    name: "Cholesterol",
    unit: "mmol/L",
    description: "Kolesterol total dalam darah.",
    trainMin: 1.43,
    trainMax: 9.67,
    refMin: 3.6,
    refMax: 5.2,
    refHigh:
      "kolesterol tinggi merupakan faktor risiko kesehatan pembuluh darah",
    refLow: "kolesterol rendah bisa terkait gangguan fungsi hati",
  },
  {
    key: "CREA",
    name: "Creatinin",
    unit: "µmol/L",
    description: "Produk sisa otot — penanda fungsi ginjal.",
    trainMin: 8,
    trainMax: 1079.1,
    refMin: 60,
    refMax: 110,
    refHigh: "creatinin tinggi umumnya terkait gangguan ginjal",
    refLow: null,
  },
  {
    key: "GGT",
    name: "Gamma-Glutamyl Transferase",
    unit: "U/L",
    description: "Enzim hati; naik pada gangguan hati atau saluran empedu.",
    trainMin: 4.5,
    trainMax: 650.9,
    refMin: 9,
    refMax: 48,
    refHigh:
      "kadar GGT yang tinggi bisa menandakan kerusakan hati atau saluran empedu",
    refLow: null,
  },
  {
    key: "PROT",
    name: "Total Protein",
    unit: "g/L",
    description: "Kadar protein total dalam darah.",
    trainMin: 44.8,
    trainMax: 90,
    refMin: 60,
    refMax: 80,
    refHigh:
      "protein total di atas rentang umum bisa terkait dehidrasi atau peradangan",
    refLow:
      "protein total rendah bisa menandakan gangguan gizi atau fungsi hati",
  },
];

/** Nilai median data latih, dipakai untuk mengisi kolom yang dikosongkan. */
export const TRAIN_MEDIANS: Record<string, number> = {
  Age: 47,
  ALB: 41.95,
  ALP: 66.2,
  ALT: 23,
  AST: 25.9,
  BIL: 7.3,
  CHE: 8.26,
  CHOL: 5.3,
  CREA: 77,
  GGT: 23.3,
  PROT: 72.2,
  Sex_m: 1,
};

export const CLASS_SEVERITY: Record<
  string,
  "good" | "warn" | "danger"
> = {
  "Blood Donor": "good",
  "Suspect Blood Donor": "warn",
  Hepatitis: "warn",
  Fibrosis: "danger",
  Cirrhosis: "danger",
};

export const SEVERITY_LABEL: Record<string, string> = {
  good: "Profil sehat",
  warn: "Perlu perhatian",
  danger: "Segera konsultasi",
};
