import os
from pathlib import Path
from typing import Dict

import joblib
import pandas as pd
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

ROOT = Path(__file__).resolve().parent.parent
MODELS_DIR = ROOT / "models"
STATIC_DIR = ROOT / "static"

API_SECRET = os.getenv("ML_API_SECRET", "").strip()
CORS_ORIGINS = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "*").split(",")
    if origin.strip()
]

app = FastAPI(title="HepaCheck", docs_url="/api/docs")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS or ["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.middleware("http")
async def require_api_key(request: Request, call_next):
    if (
        API_SECRET
        and request.method != "OPTIONS"
        and request.url.path.startswith("/api/")
    ):
        if request.headers.get("x-api-key") != API_SECRET:
            return JSONResponse(
                status_code=401, content={"error": "API key tidak valid"}
            )
    return await call_next(request)

MODEL_BUNDLES: Dict[str, dict] = {}
METRICS: dict = {}

REFERENCE_RANGES = {
    "ALB": {"min": 35.0, "max": 50.0, "unit": "g/L", "name": "Albumin",
            "high": "kadar albumin di atas rentang umum", "low": "kadar albumin di bawah rentang umum dapat menandakan penurunan fungsi hati atau gizi"},
    "ALP": {"min": 44.0, "max": 147.0, "unit": "U/L", "name": "Alkaline Phosphatase",
            "high": "kadar ALP yang tinggi bisa menandakan gangguan hati atau saluran empedu", "low": None},
    "ALT": {"min": 7.0, "max": 56.0, "unit": "U/L", "name": "ALT (enzim hati)",
            "high": "kadar ALT yang tinggi sering menjadi penanda kerusakan sel hati", "low": None},
    "AST": {"min": 10.0, "max": 40.0, "unit": "U/L", "name": "AST (enzim hati)",
            "high": "kadar AST yang tinggi bisa menandakan kerusakan hati, jantung, atau otot", "low": None},
    "BIL": {"min": 3.4, "max": 20.5, "unit": "μmol/L", "name": "Bilirubin",
            "high": "bilirubin tinggi bisa menandakan gangguan hati/empedu dan dapat menyebabkan kulit menguning", "low": None},
    "CHE": {"min": 5.4, "max": 13.2, "unit": "U/L", "name": "Cholinesterase",
            "high": None, "low": "kadar CHE rendah dapat menandakan penurunan kemampuan hati membuat protein"},
    "CHOL": {"min": 3.6, "max": 5.2, "unit": "mmol/L", "name": "Kolesterol",
             "high": "kolesterol tinggi merupakan faktor risiko kesehatan pembuluh darah", "low": "kolesterol rendah bisa terkait gangguan fungsi hati"},
    "CREA": {"min": 60.0, "max": 110.0, "unit": "μmol/L", "name": "Creatinin",
             "high": "creatinin tinggi umumnya terkait gangguan ginjal", "low": None},
    "GGT": {"min": 9.0, "max": 48.0, "unit": "U/L", "name": "GGT (enzim hati)",
            "high": "kadar GGT yang tinggi bisa menandakan kerusakan hati atau saluran empedu", "low": None},
    "PROT": {"min": 60.0, "max": 80.0, "unit": "g/L", "name": "Total Protein",
             "high": "protein total di atas rentang umum bisa terkait dehidrasi atau peradangan", "low": "protein total rendah bisa menandakan gangguan gizi atau fungsi hati"},
}

CLASS_CONTEXT = {
    "Blood Donor": {
        "headline": "Profil Anda tampak sehat",
        "paragraph": (
            "Model menilai pola hasil laboratorium Anda berada dalam kategori pendonor darah sehat — "
            "secara umum tidak ditemukan pola yang menonjol mengarah ke peradangan atau kerusakan hati. "
            "Ini adalah kabar yang meyakinkan, namun ingat bahwa hasil ini hanya sebuah skrining awal."
        ),
    },
    "Suspect Blood Donor": {
        "headline": "Perlu pengamatan lebih lanjut",
        "paragraph": (
            "Model menilai profil Anda memiliki kemiripan dengan kategori pendonor yang 'dicurigai' — "
            "artinya ada pola hasil lab yang perlu diperhatikan, meskipun bukan berarti Anda sudah terinfeksi. "
            "Langkah yang tepat adalah melakukan tes konfirmasi (antibodi anti-HCV lalu tes RNA HCV) "
            "sesuai anjuran WHO dan CDC."
        ),
    },
    "Hepatitis": {
        "headline": "Pola mengarah ke peradangan hati",
        "paragraph": (
            "Model menilai pola hasil lab Anda memiliki kemiripan dengan kasus hepatitis, yaitu peradangan pada hati. "
            "Penting untuk dipahami: ini belum tentu berarti Anda positif hepatitis C — bisa juga hepatitis jenis lain "
            "atau kondisi yang menyerupai. Tes darah konfirmasi dan evaluasi dokter sangat disarankan, terutama bila "
            "ada gejala seperti lelah berkepanjangan, mual, atau kulit menguning."
        ),
    },
    "Fibrosis": {
        "headline": "Pola mengarah ke jaringan parut pada hati",
        "paragraph": (
            "Model menilai pola hasil lab Anda memiliki kemiripan dengan kasus fibrosis hati, yaitu mulai terbentuknya "
            "jaringan parut pada hati yang biasanya berkembang setelah peradangan kronis berlangsung lama. "
            "Kondisi ini masih dapat dihentikan perkembangannya bila ditangani lebih awal. Evaluasi oleh dokter "
            "sangat penting untuk menentukan langkah berikutnya."
        ),
    },
    "Cirrhosis": {
        "headline": "Pola mengarah ke sirosis — segera konsultasi",
        "paragraph": (
            "Model menilai pola hasil lab Anda memiliki kemiripan dengan kasus sirosis hati, yaitu jaringan parut yang "
            "sudah meluas dan mengganggu fungsi hati. Sirosis adalah kondisi serius yang berpotensi berkembang menjadi "
            "kanker hati bila tidak ditangani. Hasil ini bukan diagnosis, tetapi ini adalah sinyal kuat untuk segera "
            "berkonsultasi dengan tenaga medis."
        ),
    },
}


class PredictRequest(BaseModel):
    model: str
    features: Dict[str, float | str | None]


def load_assets():
    global MODEL_BUNDLES, METRICS
    import json

    for model_id in ("knn", "svm", "rf", "nb"):
        MODEL_BUNDLES[model_id] = joblib.load(MODELS_DIR / f"{model_id}.joblib")
    with open(MODELS_DIR / "metrics.json", encoding="utf-8") as f:
        METRICS = json.load(f)


load_assets()


def prepare_input(features: Dict[str, float | str | None]) -> pd.DataFrame:
    bundle = MODEL_BUNDLES["knn"]
    feature_names = bundle["feature_names"]
    medians = bundle["medians"]

    sex_m = 1.0 if str(features.get("Sex", "f")).strip().lower() == "m" else 0.0
    row = {col: medians.get(col) for col in feature_names}
    row["Sex_m"] = sex_m

    numeric_cols = [c for c in feature_names if c != "Sex_m"]
    for col in numeric_cols:
        value = features.get(col)
        if value is not None and value != "":
            row[col] = float(value)

    df = pd.DataFrame([row]).reindex(columns=feature_names)
    return df


@app.get("/")
def landing():
    return FileResponse(STATIC_DIR / "index.html")


@app.get("/predict")
def predict_page():
    return FileResponse(STATIC_DIR / "predict.html")


@app.get("/health")
def api_health():
    return {"status": "ok", "models": sorted(MODEL_BUNDLES.keys())}


@app.get("/api/models")
def api_models():
    return METRICS


@app.post("/api/predict")
def api_predict(req: PredictRequest):
    if req.model not in MODEL_BUNDLES:
        return JSONResponse(
            status_code=400,
            content={"error": f"Model '{req.model}' tidak dikenal"},
        )

    bundle = MODEL_BUNDLES[req.model]
    scaler = bundle["scaler"]
    model = bundle["model"]
    class_labels = bundle["class_labels"]

    df = prepare_input(req.features)
    X_scaled = scaler.transform(df)

    pred_index = int(model.predict(X_scaled)[0])
    probabilities = model.predict_proba(X_scaled)[0]

    proba_list = [
        {"label": class_labels[i], "value": round(float(p), 4)}
        for i, p in enumerate(probabilities)
    ]
    proba_list.sort(key=lambda x: x["value"], reverse=True)

    flags = []
    for feature in df.columns:
        if feature == "Sex_m":
            continue
        raw = float(df[feature].iloc[0])
        meta = REFERENCE_RANGES.get(str(feature))
        if meta is None:
            continue
        status = "normal"
        note = None
        if raw < meta["min"]:
            status = "low"
            note = meta["low"]
        elif raw > meta["max"]:
            status = "high"
            note = meta["high"]
        if status != "normal":
            flags.append({
                "feature": feature,
                "name": meta["name"],
                "unit": meta["unit"],
                "value": raw,
                "status": status,
                "note": note,
            })

    predicted_label = class_labels[pred_index]
    context = CLASS_CONTEXT.get(
        predicted_label,
        {"headline": "Hasil prediksi", "paragraph": "Gambaran umum kondisi berdasarkan pola data."},
    )

    metrics = METRICS["models"].get(req.model, {})
    return {
        "model": req.model,
        "model_name": metrics.get("name", req.model),
        "predicted_class": predicted_label,
        "probabilities": proba_list,
        "confidence": proba_list[0]["value"],
        "flags": flags,
        "context": context,
        "model_metrics": metrics,
        "disclaimer": (
            "Hasil ini merupakan prediksi dari model machine learning untuk tujuan edukasi dan skrining awal. "
            "Bukan diagnosis medis resmi. Konsultasikan hasil Anda dengan dokter atau tenaga medis untuk kepastian."
        ),
    }


app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", "8000")))
