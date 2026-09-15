# AGENTS.md

Single-project ML coursework (Indonesian, by Aditya Septiawan): compare KNN, SVM, Random Forest, and Naive Bayes classifiers on the UCI HCV dataset (`dataset/hcvdat.csv`, 615 rows). Text/output in the repo is in Indonesian — keep it that way.

## Running

- The source of truth is the Jupyter notebook `predictive_analytics_hepatitis.ipynb`; `predictive_analytics_hepatitis.py` is a notebook export that calls `get_ipython()` and will NOT run standalone. Edit/re-run the notebook, or edit both only if explicitly asked.
- No requirements.txt, no venv, no tests/lint/CI. Dependencies: `numpy`, `pandas`, `matplotlib`, `seaborn`, `scikit-learn`.
- CSV is read with the relative path `dataset/hcvdat.csv` — run from the repo root.

## Pipeline (order matters, defined in the notebook)

1. Label-encode `Category` via `LabelEncoder`.
2. Drop `Unnamed: 0`.
3. One-hot encode `Sex` with `drop_first=True`.
4. Impute missing values with per-column median.
5. IQR outlier removal produces `df_clean`, but it is **never used** — modeling runs on `df` with outliers intact.
6. Split: `train_test_split(test_size=0.2, random_state=123)` (492 train / 123 test).
7. `MinMaxScaler` fit on train only, transform test.

## Model configs

- KNN: `n_neighbors=3`
- SVM: `SVC(kernel='linear')`
- Random Forest: `RandomForestClassifier()` defaults (no `random_state` seed — results vary between runs; README's 88.6% won't reproduce exactly)
- Naive Bayes: `BernoulliNB()` (despite importing `GaussianNB` earlier in the file, it is never used)

Evaluation uses `classification_report` with `weighted avg` for precision/recall/f1.
