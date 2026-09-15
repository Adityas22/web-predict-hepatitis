import { cn } from "@/lib/cn";
import { shortClassLabel } from "@/lib/format";

interface ConfusionMatrixProps {
  matrix: number[][];
  labels: string[];
}

export function ConfusionMatrix({ matrix, labels }: ConfusionMatrixProps) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-sm">
          <caption className="sr-only">
            Confusion matrix: baris kelas sebenarnya, kolom kelas prediksi
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="border border-line bg-surface-2 px-3 py-2 text-left text-xs font-medium text-muted"
              >
                Nyata \ Prediksi
              </th>
              {labels.map((label) => (
                <th
                  key={label}
                  scope="col"
                  className="border border-line bg-surface-2 px-3 py-2 text-center text-xs font-medium text-muted"
                >
                  {shortClassLabel(label)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, rowIndex) => (
              <tr key={labels[rowIndex] ?? rowIndex}>
                <th
                  scope="row"
                  className="border border-line bg-surface-2 px-3 py-2 text-left text-xs font-medium text-muted"
                >
                  {shortClassLabel(labels[rowIndex] ?? `Kelas ${rowIndex}`)}
                </th>
                {row.map((cell, colIndex) => {
                  const isDiagonal = rowIndex === colIndex;
                  return (
                    <td
                      key={colIndex}
                      className={cn(
                        "border border-line px-3 py-2 text-center font-mono tabular-nums",
                        isDiagonal
                          ? "bg-accent-soft font-semibold text-accent-strong"
                          : "text-ink-soft",
                      )}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-muted">
        Baris = kelas sebenarnya, kolom = kelas yang diprediksi, diagonal =
        prediksi benar.
      </p>
    </div>
  );
}
