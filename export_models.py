"""Melatih ulang keempat model persis mengikuti pipeline notebook,
lalu menyimpan setiap model beserta preprocessing-nya ke models/*.joblib
dan ringkasan metrik evaluasi ke models/metrics.json.

Dua penyimpangan kecil yang disengaja dari notebook:
1. RandomForestClassifier diberi random_state=42 supaya artefak yang diekspor
   bisa direproduksi (notebook tidak menetapkan seed sehingga hasilnya acak).
2. SVC dipasang dengan probability=True supaya bisa menampilkan confidence
   probabilitas di aplikasi web (kelas prediksi tetap sama dengan SVC biasa).
"""
import json
from datetime import datetime

import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import BernoulliNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from sklearn.svm import SVC

DATA_PATH = "dataset/hcvdat.csv"
MODELS_DIR = "models"
TEST_SIZE = 0.2
RANDOM_STATE = 123

CLASS_LABELS = {
    "0=Blood Donor": "Blood Donor",
    "0s=suspect Blood Donor": "Suspect Blood Donor",
    "1=Hepatitis": "Hepatitis",
    "2=Fibrosis": "Fibrosis",
    "3=Cirrhosis": "Cirrhosis",
}

MODEL_DEFS = {
    "knn": ("K-Nearest Neighbors (KNN)", KNeighborsClassifier(n_neighbors=3)),
    "svm": ("Support Vector Machine (SVM)", SVC(kernel="linear", probability=True)),
    "rf": ("Random Forest", RandomForestClassifier(random_state=42)),
    "nb": ("Naive Bayes (Bernoulli)", BernoulliNB()),
}


def build_pipeline():
    df = pd.read_csv(DATA_PATH)
    le = LabelEncoder()
    df["Category"] = le.fit_transform(df["Category"])
    df = df.drop(columns=["Unnamed: 0"])
    df = pd.get_dummies(df, columns=["Sex"], drop_first=True)

    medians = {}
    for column in df.columns:
        if column == "Category":
            continue
        medians[column] = df[column].median()
        df[column] = df[column].fillna(medians[column])

    X = df.drop(columns=["Category"])
    y = df["Category"]
    feature_names = list(X.columns)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=TEST_SIZE, random_state=RANDOM_STATE
    )

    scaler = MinMaxScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    return X_train, X_test, y_train, y_test, scaler, le, medians, feature_names


def main():
    X_train, X_test, y_train, y_test, scaler, le, medians, feature_names = build_pipeline()
    le_classes = list(le.classes_)
    display_classes = [CLASS_LABELS.get(c, c) for c in le_classes]

    metrics = {
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "data": {
            "n_rows": int(X_train.shape[0] + X_test.shape[0]),
            "n_train": int(X_train.shape[0]),
            "n_test": int(X_test.shape[0]),
            "n_features": X_train.shape[1],
        },
        "class_labels": display_classes,
        "models": {},
    }

    for model_id, (model_name, model) in MODEL_DEFS.items():
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)

        report = classification_report(y_test, y_pred, output_dict=True, zero_division=0)
        cm = confusion_matrix(y_test, y_pred)
        metrics["models"][model_id] = {
            "id": model_id,
            "name": model_name,
            "accuracy": round(float(report["accuracy"]), 4),
            "precision": round(float(report["weighted avg"]["precision"]), 4),
            "recall": round(float(report["weighted avg"]["recall"]), 4),
            "f1": round(float(report["weighted avg"]["f1-score"]), 4),
            "confusion_matrix": cm.astype(int).tolist(),
        }

        bundle = {
            "model": model,
            "scaler": scaler,
            "label_encoder": le,
            "medians": medians,
            "feature_names": feature_names,
            "class_labels": display_classes,
        }
        joblib.dump(bundle, f"{MODELS_DIR}/{model_id}.joblib")
        print(f"[{model_id}] accuracy={metrics['models'][model_id]['accuracy']}")

    with open(f"{MODELS_DIR}/metrics.json", "w", encoding="utf-8") as f:
        json.dump(metrics, f, ensure_ascii=False, indent=2)
    print(f"Semua model diekspor ke {MODELS_DIR}/")


if __name__ == "__main__":
    main()
