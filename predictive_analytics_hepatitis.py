#!/usr/bin/env python
# coding: utf-8

# # Predictive Analytics : Hepatitis

# Disusun : Aditya Septiawan

# ## import library

# In[3]:


import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
get_ipython().run_line_magic('matplotlib', 'inline')
import seaborn as sns


# ## Data Understanding

# #### Data Loading

# In[4]:


df = pd.read_csv('dataset/hcvdat.csv')
df


# ## EDA

# Perform EDA for variable description

# In[5]:


df.info()


# mengubah Category menggunakan Label Encoding

# In[6]:


# Library untuk encoding
from sklearn.preprocessing import LabelEncoder

# Melakukan label encoding pada kolom Category
le = LabelEncoder()
df["Category"] = le.fit_transform(df["Category"])


#  menghapus kolom unnamed (urutan nomor pada baris saja)

# In[7]:


# Menghapus kolom 'Unnamed: 0'
df = df.drop(columns=['Unnamed: 0'])

# Cek apakah kolom sudah dihapus
print(df.head())


# One-Hot Encoding pada sex

# In[8]:


# Lakukan One-Hot Encoding pada kolom 'Sex'
df = pd.get_dummies(df, columns=['Sex'], drop_first=True)

# Cek dataframe setelah One-Hot Encoding
print(df.head())


# Periksa  apakah ada nilai NaN

# In[9]:


print(df.isnull().sum())


# menggunakan median untuk mengatasi missing value

# In[10]:


# Mengisi missing values dengan median dari setiap kolom
columns_with_nan = df.columns[df.isnull().any()]  # Dapatkan kolom yang memiliki NaN

for column in columns_with_nan:
    df[column].fillna(df[column].median(), inplace=True)

# Pastikan kembali apakah NaN sudah hilang
print(df.isnull().sum())


# In[11]:


df.describe()


# #### EDA to handle missing values and outliers

# In[12]:


import numpy as np

# Hitung jumlah kolom numerik
num_cols = len(df.select_dtypes(include=['float64', 'int64']).columns)

# Tentukan jumlah baris dan kolom untuk subplot grid
rows = np.ceil(num_cols / 3).astype(int)  # Menghitung berapa baris yang dibutuhkan

# Membuat plot boxplot untuk setiap kolom numerik
plt.figure(figsize=(12, rows * 3))  # Sesuaikan tinggi berdasarkan jumlah baris

# Iterasi secara langsung melalui kolom numerik dari dataframe
for i, col in enumerate(df.select_dtypes(include=['float64', 'int64']).columns):
    plt.subplot(rows, 3, i+1)  # Gunakan grid sesuai jumlah baris yang diperlukan
    sns.boxplot(x=df[col])
    plt.title(f'Boxplot of {col}')

plt.tight_layout()  # Agar plot tidak tumpang tindih
plt.show()


# menangani outlier

# In[13]:


# Hitung Q1 dan Q3 untuk semua kolom numerik
Q1 = df.select_dtypes(include=['float64', 'int64']).quantile(0.25)
Q3 = df.select_dtypes(include=['float64', 'int64']).quantile(0.75)

# Hitung IQR (Interquartile Range)
IQR = Q3 - Q1

# Hapus outlier dari dataset berdasarkan aturan IQR
df_clean = df[~((df.select_dtypes(include=['float64', 'int64']) < (Q1 - 1.5 * IQR)) | 
                (df.select_dtypes(include=['float64', 'int64']) > (Q3 + 1.5 * IQR))).any(axis=1)]

# Cek ukuran dataset setelah outlier dihapus
print(f"Ukuran dataset setelah outlier dihapus: {df_clean.shape}")


# #### Perform EDA with univariate analysis

# Numerical Features

# In[14]:


df.hist(bins=50, figsize=(20, 15))
plt.show()


# #### Perform EDA with multivariate analysis

# In[15]:


# Mengamati hubungan antar fitur numerik dengan fungsi pairplot
sns.pairplot(df.select_dtypes(include=['float64', 'int64']), diag_kind='kde')

plt.show()


# #### Correlation Matrix untuk fitur numerik

# In[16]:


# Memilih hanya kolom numerik
numerical_df = df.select_dtypes(include=['float64', 'int64'])

# Membuat ukuran figure
plt.figure(figsize=(10, 8))

# Menghitung matriks korelasi untuk kolom numerik
correlation_matrix = numerical_df.corr().round(2)

# Membuat heatmap dengan anotasi korelasi
sns.heatmap(data=correlation_matrix, annot=True, cmap='coolwarm', linewidths=0.5)

# Menambahkan judul pada heatmap
plt.title("Correlation Matrix untuk Fitur Numerik", size=20)

# Menampilkan plot
plt.show()


# ## Data Preparation

# #### Train-Test-Split

# In[17]:


from sklearn.model_selection import train_test_split

# Membagi data
X = df.drop(["Category"], axis=1)  # Drop kolom target
y = df["Category"]  # Kolom target

# Pisahkan data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=123)

# Output jumlah sampel di setiap set
print(f'Total # of samples in the whole dataset: {len(X)}')
print(f'Total # of samples in train dataset: {len(X_train)}')
print(f'Total # of samples in test dataset: {len(X_test)}')


# #### Normalisasi (Min-Max Scaling)

# In[18]:


from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)


# ## Modelling

# Algorithm  : K-Nearest Neighbor, Support Vector Regression, Random Forest, Boosting

# In[19]:


from sklearn.neighbors import KNeighborsClassifier  
from sklearn.ensemble import RandomForestClassifier  
from sklearn.svm import SVC  
from sklearn.naive_bayes import GaussianNB  
from sklearn.metrics import accuracy_score 



# Menyiapkan dataframe untuk analisis model
models = pd.DataFrame(index=['accuracy_score'], 
                      columns=['KNN', 'RandomForest', 'SVM', 'Naive Bayes'])


# #### KNN

# In[20]:


# Buat model prediksi dengan KNN
model_knn = KNeighborsClassifier(n_neighbors=3)
model_knn.fit(X_train, y_train)


# In[21]:


# Lakukan prediksi dengan model KNN
knn_pred = model_knn.predict(X_test)

# Hitung metriks akurasi dan simpan hasilnya
models.loc['accuracy_score','KNN'] = accuracy_score(y_test, knn_pred)


# #### SVM

# In[22]:


# Membuat model SVM dengan kernel linear
model_svm = SVC(kernel='linear')  # Anda bisa mengganti 'linear' dengan 'rbf', 'poly', dsb.

# Latih model SVM dengan data pelatihan
model_svm.fit(X_train, y_train)


# In[23]:


# Lakukan prediksi dengan model SVM
svm_pred = model_svm.predict(X_test)

# Hitung metriks akurasi dan simpan hasilnya
models.loc['accuracy_score', 'SVM'] = accuracy_score(y_test, svm_pred)


# #### Random Forest

# In[24]:


# Buat model prediksi dengan Random Forest
model_rf = RandomForestClassifier()
model_rf.fit(X_train, y_train)


# In[25]:


# Lakukan prediksi dengan model Random Forest
rf_pred = model_rf.predict(X_test)

# Hitung metriks akurasi dan simpan hasilnya
models.loc['accuracy_score','RandomForest'] = accuracy_score(y_test, rf_pred)


# #### Naive Bayes

# In[26]:


from sklearn.naive_bayes import BernoulliNB
# Buat model prediksi dengan Bernoulli Naive Bayes
model_nb = BernoulliNB()
model_nb.fit(X_train, y_train)


# In[27]:


# Lakukan prediksi dengan model Naive Bayes
nb_pred = model_nb.predict(X_test)

# Hitung metriks akurasi dan simpan hasilnya
models.loc['accuracy_score','Naive Bayes'] = accuracy_score(y_test, nb_pred)


# ## Evaluasi Model

# Diagram Lingkaran dengan Metrik Evaluasi (akurasi, precision, recall, dan F1-score )

# In[66]:


import pandas as pd
from sklearn.metrics import classification_report

# Hitung metrik untuk setiap model
knn_report = classification_report(y_test, knn_pred, output_dict=True)
svm_report = classification_report(y_test, svm_pred, output_dict=True)
rf_report = classification_report(y_test, rf_pred, output_dict=True) 
nb_report = classification_report(y_test, nb_pred, output_dict=True)    

# Ambil akurasi dan metrik lainnya dari laporan
models_metrics = {
    'KNN': {
        'accuracy': knn_report['accuracy'],
        'precision': knn_report['weighted avg']['precision'],
        'recall': knn_report['weighted avg']['recall'],
        'f1-score': knn_report['weighted avg']['f1-score'],
    },
    'SVM': {
        'accuracy': svm_report['accuracy'],
        'precision': svm_report['weighted avg']['precision'],
        'recall': svm_report['weighted avg']['recall'],
        'f1-score': svm_report['weighted avg']['f1-score'],
    },
    'Random Forest': {
        'accuracy': rf_report['accuracy'],
        'precision': rf_report['weighted avg']['precision'],
        'recall': rf_report['weighted avg']['recall'],
        'f1-score': rf_report['weighted avg']['f1-score'],
    },
    'Naive Bayes': {
        'accuracy': nb_report['accuracy'],
        'precision': nb_report['weighted avg']['precision'],
        'recall': nb_report['weighted avg']['recall'],
        'f1-score': nb_report['weighted avg']['f1-score'],
    }
}

# Mengubah model metrics menjadi DataFrame untuk tampilan yang lebih baik
metrics_df = pd.DataFrame(models_metrics).T



# In[67]:


import matplotlib.pyplot as plt
import numpy as np

# Data diambil dari DataFrame metrics_df
models = metrics_df.index.tolist()  # Nama-nama model
metric_names = ['accuracy', 'precision', 'recall', 'f1-score']  # Nama metrik
values = metrics_df[metric_names].values  # Ambil nilai metrik dari DataFrame

# Buat chart bar
fig, ax = plt.subplots(figsize=(10, 7))
bar_width = 0.2
index = np.arange(len(models))

# Membuat bar untuk setiap metrik
for i in range(len(metric_names)):
    ax.bar(index + i * bar_width, values[:, i], bar_width, label=metric_names[i].capitalize())

# Atur label dan judul
ax.set_xlabel('Models')
ax.set_ylabel('Scores')
ax.set_title('Test Accuracy, Precision, Recall, F1-Score')
ax.set_xticks(index + bar_width * (len(metric_names) / 2 - 0.5))
ax.set_xticklabels(models)
ax.legend()

plt.tight_layout()
plt.show()


# In[68]:


import pandas as pd

# Buat DataFrame dari metrics_df yang telah dibuat sebelumnya
df = pd.DataFrame({
    'Model': metrics_df.index,
    'Accuracy': metrics_df['accuracy'],
    'Precision': metrics_df['precision'],
    'Recall': metrics_df['recall'],
    'F1-Score': metrics_df['f1-score']
}).reset_index(drop=True)  # Reset index agar tampilannya lebih rapi

# Menampilkan DataFrame dalam bentuk tabel
print(df)

