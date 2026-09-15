export interface ModelMetric {
  id: string;
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  confusion_matrix: number[][];
}

export interface MetricsData {
  generated_at: string;
  data: {
    n_rows: number;
    n_train: number;
    n_test: number;
    n_features: number;
  };
  class_labels: string[];
  models: Record<string, ModelMetric>;
}

export interface LabFlag {
  feature: string;
  name: string;
  unit: string;
  value: number;
  status: "low" | "high";
  note: string | null;
}

export interface ClassContext {
  headline: string;
  paragraph: string;
}

export interface Probability {
  label: string;
  value: number;
}

export interface PredictResult {
  model: string;
  model_name: string;
  predicted_class: string;
  probabilities: Probability[];
  confidence: number;
  flags: LabFlag[];
  context: ClassContext;
  model_metrics: Partial<ModelMetric>;
  disclaimer: string;
}

export interface PredictRequest {
  model: string;
  features: Record<string, number | string>;
}

export interface ApiError {
  error: string;
}
