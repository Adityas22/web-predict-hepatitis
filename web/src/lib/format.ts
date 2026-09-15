export function pct(value: number | null | undefined, digits = 1): string {
  if (value == null || Number.isNaN(value)) return "—";
  return `${(value * 100).toFixed(digits)}%`;
}

export function decimal(value: number, digits = 4): string {
  return value.toFixed(digits);
}

const SHORT_CLASS: Record<string, string> = {
  "Blood Donor": "Donor",
  "Suspect Blood Donor": "Suspect",
  Hepatitis: "Hepatitis",
  Fibrosis: "Fibrosis",
  Cirrhosis: "Cirrhosis",
};

export function shortClassLabel(label: string): string {
  return SHORT_CLASS[label] ?? label;
}
