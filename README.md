# Proyek Pertama: Hepatitis Predict
Disusun oleh: Aditya Septiawan

## Domain Proyek
Domain yang dipilih untuk proyek machine learning ini adalah sosial, dengan judul "Perbadingan Algortima dalam Memprediksi Penyakit Hepatitis C"

#### Latar Belakang
![kasus](https://github.com/Adityas22/predictive-analytics-hepatitis/raw/main/image/kasus%20hepatitis.png)
<br>
<p align="justify">
Hepatitis C adalah penyakit infeksi yang menyerang hati akibat virus hepatitis C (HCV) dan dapat berkembang menjadi kondisi serius seperti fibrosis, sirosis, serta kanker hati jika tidak dideteksi dan diobati dengan baik. Penyakit ini sering kali tidak menunjukkan gejala pada tahap awal, sehingga banyak penderita tidak menyadari bahwa mereka terinfeksi hingga terjadi kerusakan hati yang signifikan. Berdasarkan laporan global dari Organisasi Kesehatan Dunia (WHO), diperkirakan 58 juta orang di seluruh dunia menderita infeksi hepatitis C kronis, dengan sekitar 1,5 juta infeksi baru setiap tahunnya. Selain itu, terdapat sekitar 3,2 juta remaja dan anak-anak yang juga terinfeksi hepatitis C kronis. Pada tahun 2019, WHO mencatat bahwa sekitar 290.000 orang meninggal akibat komplikasi hepatitis C, terutama karena sirosis dan kanker hati primer (karsinoma hepatoseluler) <a href="https://journal.stmikjayakarta.ac.id/index.php/JMIJayakarta/article/view/1098/732">[1]</a>. Dengan memanfaatkan machine learning seperti K-Nearest Neighbors (KNN), Support Vector Machine (SVM), Random Forest, dan Naive Bayes dapat membangun sistem pendukung keputusan untuk mengklasifikasikan pasien berdasarkan hasil laboratorium. Model ini akan membantu dokter dalam mendeteksi kondisi hati berdasarkan pola yang ada di data laboratorium, memberikan hasil yang lebih akurat dan efisien dalam menentukan status kesehatan pasien.
</p>

## Business Understanding

#### Problem Statements
Berdasarkan latar belakang di atas, berikut ini merupakan rincian masalah yang dapat diselesaikan pada proyek ini:
- Bagaimana mendapatkan model machine learning yang dapat memprediksi atau mendiagnosis virus hepatitis C (HCV) pada pasien berdasarkan data demografi dan hasil laboratorium?
- Algoritma model machine learning mana yang memiliki akurasi paling baik untuk diagnosis tersebut?

#### Goals
Tujuan dari proyek ini adalah:
- Mendapatkan model machine learning yang mampu memprediksi apakah pasien terdiagnosis virus hepatitis C (HCV) atau tidak, berdasarkan data demografi dan hasil laboratorium.
- Menemukan algoritma model machine learning dengan akurasi terbaik untuk memprediksi diagnosis virus hepatitis C (HCV) berdasarkan data demografi dan hasil laboratorium.

#### Solution statements
Untuk mencapai tujuan tersebut, beberapa langkah pemecahan masalah akan dilakukan, di antaranya:
- Mempersiapkan dataset pasien.
- Melakukan eksplorasi data untuk memahami pola dan hubungan antara variabel dalam dataset.
- Membangun beberapa model machine learning (K-Nearest Neighbor, Support Vector Machine, Random Forest, dan Naive Bayes) untuk memprediksi diagnosis hepatitis C.
- Melakukan evaluasi dan perbandingan performa model menggunakan metrik akurasi, presisi, recall, dan F1-score.
- Memilih model terbaik berdasarkan hasil evaluasi untuk digunakan dalam mendukung diagnosis hepatitis C yang lebih akurat.

## Data Understanding
Dataset yang digunakan untuk memprediksi pasien HCV yang diambil dari platform UCI Machine Learning Repository yang Diterbitkan dalam Journal of Laboratory and Precision Medicine. Dataset ini terdiri dari 1 file csv.

1. **Unnamed: 0** : Nomor urut pasien pada file CSV, hanya digunakan untuk keperluan identifikasi internal dalam dataset dan tidak berperan dalam analisis model.<br>
2. **Category** : Kategori diagnosis pasien, yang menunjukkan status kesehatan terkait Hepatitis C:
   - 0 = Blood Donor (Pendonor darah)
   - 0s = Suspect Blood Donor (Pendonor darah yang dicurigai)
   - 1 = Hepatitis
   - 2 = Fibrosis (kerusakan hati yang menyebabkan jaringan parut)
   - 3 = Cirrhosis (kerusakan hati kronis dengan jaringan parut parah)
3. **Age** : Usia pasien dalam tahun.
4. **Sex** : Jenis kelamin pasien, dengan nilai 'f' untuk perempuan dan 'm' untuk laki-laki.
5. **ALB** (Albumin): Protein utama dalam darah yang diproduksi oleh hati, penting untuk menjaga tekanan osmotik darah.
6. **ALP** (Alkaline Phosphatase): Enzim yang ditemukan di hati, tulang, dan jaringan lain, sering digunakan sebagai indikator kesehatan hati dan tulang.
7. **ALT** (Alanine Aminotransferase): Enzim hati yang dilepaskan ke darah saat terjadi kerusakan pada sel hati.
8. **AST** (Aspartate Aminotransferase): Enzim yang terdapat di hati dan organ lain, meningkat saat ada kerusakan pada hati atau jantung.
9. **BIL** (Bilirubin): Produk pemecahan sel darah merah, kadar yang tinggi bisa menunjukkan kerusakan hati atau masalah dengan saluran empedu.
10. **CHE** (Cholinesterase): Enzim yang diproduksi oleh hati, digunakan untuk menilai fungsi hati dan kondisi kesehatan umum.
11. **CHOL** (Cholesterol): Kadar kolesterol total dalam darah, yang dapat dipengaruhi oleh fungsi hati.
12. **CREA** (Creatinine): Produk limbah yang dihasilkan oleh otot, digunakan untuk menilai fungsi ginjal.\
13. **GGT** (Gamma-Glutamyl Transferase): Enzim yang meningkat pada penyakit hati, terutama pada penyalahgunaan alkohol atau kerusakan saluran empedu.
14. **PROT** (Total Protein): Jumlah total protein dalam darah, termasuk albumin dan globulin, yang berfungsi sebagai indikator status nutrisi dan fungsi hati.

<p align="justify"> Dataset yang digunakan dalam proyek ini terdiri dari 615 sampel pasien dengan 14 kolom. Terdapat nilai yang hilang (missing values) pada beberapa kolom, yaitu: ALB (1), ALP (18), ALT (1), CHOL (10), dan PROT (1) kemudian untuk duplikat tidak ada. Untuk mengatasi nilai yang hilang, akan digunakan metode median.</p> 

<table>
    <thead>
        <tr>
            <th>Kolom</th>
            <th>Missing Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Unnamed</td>
            <td>0</td>
        </tr>
        <tr>
            <td>Category</td>
            <td>0</td>
        </tr>
        <tr>
            <td>Age</td>
            <td>0</td>
        </tr>
        <tr>
            <td>Sex</td>
            <td>0</td>
        </tr>
        <tr>
            <td>ALB</td>
            <td>1</td>
        </tr>
        <tr>
            <td>ALP</td>
            <td>18</td>
        </tr>
        <tr>
            <td>ALT</td>
            <td>1</td>
        </tr>
        <tr>
            <td>AST</td>
            <td>0</td>
        </tr>
        <tr>
            <td>BIL</td>
            <td>0</td>
        </tr>
        <tr>
            <td>CHE</td>
            <td>0</td>
        </tr>
        <tr>
            <td>CHOL</td>
            <td>10</td>
        </tr>
        <tr>
            <td>CREA</td>
            <td>0</td>
        </tr>
        <tr>
            <td>GGT</td>
            <td>0</td>
        </tr>
        <tr>
            <td>PROT</td>
            <td>1</td>
        </tr>
    </tbody>
</table>



#### Berikut rangkuman statistik deskriptif dari fitur dalam dataset:
<table>
    <thead>
        <tr>
            <th> </th>
            <th>Unnamed</th>
            <th>Age</th>
            <th>ALB</th>
            <th>ALP</th>
            <th>ALT</th>
            <th>AST</th>
            <th>BIL</th>
            <th>CHE</th>
            <th>CHOL</th>
            <th>CREA</th>
            <th>GGT</th>
            <th>PROT</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>count</td>
            <td>615.000000</td>
            <td>615.000000</td>
            <td>614.000000</td>
            <td>597.000000</td>
            <td>614.000000</td>
            <td>615.000000</td>
            <td>615.000000</td>
            <td>615.000000</td>
            <td>605.000000</td>
            <td>615.000000</td>
            <td>615.000000</td>
            <td>614.000000</td>
        </tr>
        <tr>
            <td>mean</td>
            <td>308.000000</td>
            <td>47.408130</td>
            <td>41.620195</td>
            <td>68.283920</td>
            <td>28.450814</td>
            <td>34.786341</td>
            <td>11.396748</td>
            <td>8.196634</td>
            <td>5.368099</td>
            <td>81.287805</td>
            <td>39.533171</td>
            <td>72.044137</td>
        </tr>
        <tr>
            <td>std</td>
            <td>177.679487</td>
            <td>10.055105</td>
            <td>5.780629</td>
            <td>26.028315</td>
            <td>25.469689</td>
            <td>33.090690</td>
            <td>19.673150</td>
            <td>2.205657</td>
            <td>1.132728</td>
            <td>49.756166</td>
            <td>54.661071</td>
            <td>5.402636</td>
        </tr>
        <tr>
            <td>min</td>
            <td>1.000000</td>
            <td>19.000000</td>
            <td>14.900000</td>
            <td>11.300000</td>
            <td>0.900000</td>
            <td>10.600000</td>
            <td>0.800000</td>
            <td>1.420000</td>
            <td>1.430000</td>
            <td>8.000000</td>
            <td>4.500000</td>
            <td>44.800000</td>
        </tr>
        <tr>
            <td>25%</td>
            <td>154.500000</td>
            <td>39.000000</td>
            <td>38.800000</td>
            <td>52.500000</td>
            <td>16.400000</td>
            <td>21.600000</td>
            <td>5.300000</td>
            <td>6.935000</td>
            <td>4.610000</td>
            <td>67.000000</td>
            <td>15.700000</td>
            <td>69.300000</td>
        </tr>
        <tr>
            <td>50%</td>
            <td>308.000000</td>
            <td>47.000000</td>
            <td>41.950000</td>
            <td>66.200000</td>
            <td>23.000000</td>
            <td>25.900000</td>
            <td>7.300000</td>
            <td>8.260000</td>
            <td>5.300000</td>
            <td>77.000000</td>
            <td>23.300000</td>
            <td>72.200000</td>
        </tr>
        <tr>
            <td>75%</td>
            <td>461.500000</td>
            <td>54.000000</td>
            <td>45.200000</td>
            <td>80.100000</td>
            <td>33.075000</td>
            <td>32.900000</td>
            <td>11.200000</td>
            <td>9.590000</td>
            <td>6.060000</td>
            <td>88.000000</td>
            <td>40.200000</td>
            <td>75.400000</td>
        </tr>
        <tr>
            <td>max</td>
            <td>615.000000</td>
            <td>77.000000</td>
            <td>82.200000</td>
            <td>416.600000</td>
            <td>325.300000</td>
            <td>324.000000</td>
            <td>254.000000</td>
            <td>16.410000</td>
            <td>9.670000</td>
            <td>1079.100000</td>
            <td>650.900000</td>
            <td>90.000000</td>
        </tr>
    </tbody>
</table>

#### Informasi Dataset:

<table>
  <tr>
    <th>Jenis</th>
    <th>Keterangan</th>
  </tr>
  <tr>
    <td>Title</td>
    <td>HCV data</td>
  </tr>
  <tr>
    <td>Source</td>
    <td> <a href="https://archive.ics.uci.edu/dataset/571/hcv+data">UCI Machine Learning Repository</a></td>
  </tr>
  <tr>
    <td>Creators</td>
    <td>Ralf Lichtinghagen, Frank Klawonn, Georg Hoffmann</td>
  </tr>
  <tr>
    <td>License</td>
    <td>Creative Commons Attribution 4.0 International (CC BY 4.0)</td>
  </tr>
  <tr>
    <td>Characteristics</td>
    <td>Multivariate</td>
  </tr>
  <tr>
    <td>Subject Area</td>
    <td>Health and Medicinee</td>
  </tr>
</table>

#### Berikut Visualisasi data dengan Boxplot:<br>
![Boxplot](https://github.com/Adityas22/predictive-analytics-hepatitis/raw/main/image/boxplot.png)
Interpretasi boxplot untuk data hepatitis C:
- Boxplot Age: Terdapat outlier pada usia tertentu, namun individu dengan usia tersebut mungkin ada, sehingga data tidak dihapus.
- Boxplot ALB: Outlier signifikan, tetapi kadar albumin tinggi bisa menunjukkan kesehatan baik, tetap dipertimbangkan.
- Boxplot ALT: Outlier dengan nilai tinggi dapat menunjukkan kerusakan hati, jadi data tetap dipertahankan.
- Boxplot AST: Terdapat outlier yang menunjukkan kondisi medis serius, data tidak dihapus.
- Boxplot BIL: Outlier dapat merefleksikan kondisi medis relevan, sehingga tetap dipertahankan.
- Boxplot CHE: Meskipun ada outlier, kadar cholinesterase tinggi mungkin tidak signifikan, tetap dipertimbangkan.
- Boxplot GGT: Outlier mencolok dapat menunjukkan masalah hati, jadi data tidak dihapus.
- Boxplot PROT: Outlier pada kadar protein total mungkin menunjukkan status gizi baik, tetap dipertimbangkan.

#### Univariate Analysis
Melakukan proses analisis data univariate pada fitur-fitur numerik. Proses analisis ini menggunakan bantuan visualisasi histogram untuk masing-masing fitur numerik
![Univariate](https://github.com/Adityas22/predictive-analytics-hepatitis/raw/main/image/univariate.png)
Dari data histogram di atas diperoleh informasi, yaitu:
- Kategori: Distribusi tidak merata, dengan lebih dari 50% data di kategori 0 (Blood Donor) dan 1 (Hepatitis).
- Usia: Cenderung normal, sebagian besar individu berusia 40-60 tahun, dengan beberapa outlier di usia lebih tua.
- ALB (Albumin): Mayoritas data berada di kisaran 35-45 g/L, simetris dengan beberapa outlier rendah.
- ALP (Alkaline Phosphatase): Lebih dari 50% data di bawah 150 U/L, puncak terbanyak di 50-100 U/L.
- ALT (Alanine Aminotransferase): Kebanyakan nilai di bawah 100 U/L, dengan outlier tinggi menunjukkan kerusakan hati.
- AST (Aspartate Aminotransferase): Distribusi miring ke kanan, banyak nilai rendah dan outlier yang menunjukkan kerusakan hati.
- BIL (Bilirubin): Sebagian besar nilai di bawah 50 μmol/L, menunjukkan status kesehatan baik.
- CHE (Cholinesterase): Kadar kolinesterase mayoritas di kisaran 5-10 U/L, dengan beberapa outlier.
- CHOL (Cholesterol): Mayoritas kadar kolesterol antara 4-6 mmol/L, puncak di 5 mmol/L.
- CREA (Creatinine): Sebagian besar nilai di kisaran 60-100 μmol/L, dengan beberapa outlier.
- GGT (Gamma-Glutamyl Transferase): Mayoritas nilai di bawah 150 U/L, dengan beberapa nilai tinggi.
- PROT (Protein): Kadar protein mayoritas di 60-80 g/L, puncak di sekitar 70 g/L.

#### Multivariate Analysis
Visualisasi dilakukan dengan bantuan library Seaborn menggunakan fungsi pairplot, di mana parameter diag_kind diatur ke kde untuk memperlihatkan perkiraan distribusi probabilitas dari masing-masing fitur numerik serta hubungan antar fitur.
![Multivariate](https://github.com/Adityas22/predictive-analytics-hepatitis/raw/main/image/multivariate.png)
#### Correlation Matrix with Heatmap
Melakukan pengecekan korelasi antar fitur numerik dengan menggunakan visualisasi diagram heatmap correlation matrix.<br>
![korelasi](https://github.com/Adityas22/predictive-analytics-hepatitis/raw/main/image/korelasi.png)

Penjelasan beberapa poin penting dari matriks ini:
- ALB dan PROT memiliki korelasi yang paling kuat (0.55), yang menunjukkan bahwa ada hubungan positif yang signifikan antara level Albumin (ALB) dan Protein (PROT).
- GGT dan AST menunjukkan korelasi positif yang cukup kuat (0.49), mengindikasikan adanya hubungan antara Gamma-Glutamyl Transferase (GGT) dan Aspartate Aminotransferase (AST). Ini bisa relevan secara klinis karena kedua enzim ini sering dikaitkan dengan fungsi hati.
- CHE dan CHOL juga memiliki korelasi yang cukup tinggi (0.42), yang bisa menunjukkan hubungan antara Cholinesterase (CHE) dan kolesterol (CHOL).
- Di sisi lain, beberapa fitur menunjukkan korelasi yang rendah atau negatif, seperti BIL dan CHOL (-0.33), yang menunjukkan hubungan negatif antara Bilirubin (BIL) dan Kolesterol (CHOL).


## Data Preparation
Teknik yang digunakan dalam persiapan data (Data Preparation) yaitu:

1. Melakukan Label Encoding pada Category: Kolom Category berisi nilai-nilai kategori seperti "0=Blood Donor", "0s=suspect Blood Donor", "1=Hepatitis", "2=Fibrosis", dan "3=Cirrhosis". Agar dapat digunakan dalam model machine learning, kategori ini diubah menjadi angka menggunakan Label Encoding, misalnya: "0=Blood Donor" menjadi 0, "0s=suspect Blood Donor" menjadi 1, "1=Hepatitis" menjadi 2, dan seterusnya. Dengan demikian, model dapat mengolah variabel kategori dalam format numerik.
2. Melakukan penghapusan kolom unnamed:0 : pada dataset ini berisi nomor urut baris yang dihasilkan secara otomatis saat dataset dibaca dari file. Kolom ini tidak memberikan informasi yang relevan untuk analisis data atau pembuatan model karena hanya berfungsi sebagai indeks baris
3. Melakukan one-hot encoding pada sex :  Proses ini mengonversi kategori "m" dan "f" menjadi dua kolom baru, misalnya Sex_m dan Sex_f, dengan nilai 1 jika sesuai dengan kategori dan 0 jika tidak. Ini memungkinkan model untuk memproses kategori gender tanpa memberikan bobot numerik yang salah.
4. mengatasi missing value dengan median : Median dipilih karena lebih tahan terhadap outlier dibandingkan rata-rata (mean), sehingga lebih tepat untuk menggantikan nilai yang hilang pada fitur numerik. Proses ini dilakukan dengan menghitung nilai tengah dari setiap kolom yang memiliki missing value, lalu mengganti nilai yang hilang dengan nilai median tersebut.
5. Melakukan Split Data : Pembagian dataset ini bertujuan agar nantinya dapat digunakan untuk melatih dan mengevaluasi kinerja model. Pada proyek ini, 80% dataset digunakan untuk melatih model, dan 20% sisanya digunakan untuk mengevaluasi model. Kemudian diperoleh hasil pembagian data masing-masing, yaitu sebagai berikut,
   ```
    Total # of samples in the whole dataset: 615
    Total # of samples in train dataset: 492
    Total # of samples in test dataset: 123
   ```
   
7.  Melakukan Normalisasi : Pada proyek ini menggunakan MinMaxScaler, yaitu teknik normalisasi yang mentransformasikan nilai fitur atau variabel ke dalam rentang [0,1] yang berarti bahwa nilai minimum dan maksimum dari fitur/variabel masing-masing adalah 0 dan 1

## Modeling
<p align="justify">Pada tahap modeling ini, dibuat beberapa model dengan algoritma yang berbeda-beda. Pada proyek ini, akan dibuat 4 model, di antaranya yaitu menggunakan KNN, SVM, Random Forest, dan Naive Bayes, yang masing-masing akan dilatih menggunakan data yang sama dan dievaluasi berdasarkan akurasi untuk membandingkan kinerja mereka.</p>
   
1. K-Nearest Neighbor (KNN)
   <p align="justify"> K-Nearest Neighbor (KNN) adalah algoritma yang sederhana dan efisien yang digunakan untuk mengklasifikasikan data baru berdasarkan kesamaan dengan data yang sudah ada. Algoritma ini bekerja dengan cara mencari titik data terdekat (tetangga) dalam dataset pelatihan dan mengklasifikasikan data baru berdasarkan mayoritas kelas dari tetangga tersebut <a href="https://www.geeksforgeeks.org/k-nearest-neighbours/">[2]</a>. </p>
   
-  Konfigurasi model KNN:
    - Jumlah tetangga: 3 (nilai default dapat diganti)

-  Berikut adalah tahapan implementasi yang:
    - Algoritma ini bekerja dengan mencari beberapa tetangga terdekat dari data yang ingin diklasifikasikan.
    - Model KNN dilatih menggunakan 3 tetangga terdekat dan kemudian diuji pada data uji.
    - Akurasi dihitung berdasarkan hasil prediksi terhadap data uji.

-  KNN memiliki kelebihan dan kekurangannya adalah sebagai berikut:
    
    - Kelebihan: Algoritma ini mudah digunakan dan dipahami, menjadikannya pilihan yang baik untuk pengguna pemula. Selain itu, KNN juga tidak memerlukan asumsi spesifik tentang distribusi data, sehingga lebih fleksibel dalam menyesuaikan diri dengan variasi data yang ada.
    
    - Kekurangan: Di sisi lain, salah satu kelemahan KNN adalah efisiensi waktu komputasi. Proses pencarian tetangga terdekat dapat menjadi sangat lambat, terutama pada dataset yang besar. Kelemahan lainnya adalah risiko overfitting, yang dapat terjadi jika dataset yang digunakan relatif kecil, sehingga menghasilkan pola yang tidak umum pada data uji.
      
2. Support Vector Machine (SVM)
   <p align="justify"> Algoritma Support Vector Machine (SVM) digunakan untuk menemukan sebuah hyperplane dalam ruang N-dimensi (di mana N merupakan jumlah fitur) yang secara efektif mengklasifikasikan titik-titik data. SVM dapat digunakan untuk menyelesaikan masalah-masalah klasifikasi, regresi, serta deteksi outlier <a href="https://www.geeksforgeeks.org/support-vector-machine-algorithm/">[3]</a>. </p>

-  Konfigurasi model SVM:
    - Kernel: Linear (menggunakan kernel linear untuk klasifikasi)

-  Berikut adalah tahapan implementasi yang:
    
    - Algoritma SVM mencari hyperplane yang memisahkan data ke dalam kelas-kelas berbeda.
    - Model SVM ini dikonfigurasi menggunakan kernel linear dan dilatih pada data pelatihan, kemudian diuji pada data uji.
    - Akurasi diukur setelah prediksi dilakukan.

-  SVM memiliki kelebihan dan kekurangannya adalah sebagai berikut:
    
    - Kelebihan: SVM (Support Vector Machine) dikenal karena akurasi tinggi dalam klasifikasi, bahkan pada dataset yang kompleks dan tidak linier, berkat kemampuannya untuk menemukan hyperplane optimal. Selain itu, strategi Structural Risk Minimization yang diterapkan oleh SVM membantu model dalam generalisasi, sehingga dapat memberikan prediksi yang baik pada data baru yang belum pernah dilihat sebelumnya.
    
    - Kekurangan: SVM juga memiliki kelemahan. Salah satunya adalah waktu pelatihan yang tinggi, terutama ketika dihadapkan pada dataset besar, yang dapat membuatnya tidak efisien dalam beberapa situasi. Selain itu, kompleksitas implementasi SVM dapat menjadi tantangan, karena pemilihan kernel yang tepat dan pengaturan hyperparameter yang sesuai sangat penting untuk mencapai performa optimal.
      
3. Random Forest
   <p align="justify"> Random Forest adalah algoritma pembelajaran mesin yang kuat dan fleksibel, digunakan untuk berbagai tugas seperti klasifikasi dan regresi. Sebagai metode ensemble, Random Forest terdiri dari banyak pohon keputusan kecil, yang dikenal sebagai estimator, di mana masing-masing menghasilkan prediksi independen. Algoritma ini menggabungkan hasil dari semua estimator untuk menghasilkan prediksi yang lebih akurat <a href="https://www.geeksforgeeks.org/random-forest-algorithm-in-machine-learning/">[4]</a>. </p>

-  Konfigurasi model SVM:
    - Jumlah estimators: Default (100 pohon keputusan)

-  Berikut adalah tahapan implementasi yang:
    
    - Algoritma ini membangun beberapa pohon keputusan dan menggabungkan hasilnya untuk meningkatkan akurasi.
    - Model dilatih menggunakan seluruh data pelatihan dan diuji pada data uji, dengan hasil akurasi disimpan untuk evaluasi.

-  Random Forest memiliki kelebihan dan kekurangannya adalah sebagai berikut:
    
    - Kelebihan: Algoritma ini sangat efektif dalam machine learning karena kemampuannya mengatasi overfitting dan stabilitas dalam prediksi. Overfitting sering menjadi masalah pada model yang terlalu kompleks, tetapi Random Forest menggunakan teknik Bootstrap Aggregating (bagging) untuk meningkatkan generalisasi pada data baru. Selain itu, algoritma ini lebih stabil dibandingkan pohon keputusan tunggal, karena menggabungkan beberapa pohon yang independen, sehingga dapat menangani noise dan variasi dalam data dengan lebih baik
    
    - Kekurangan: interpretabilitas yang terbatas dan kebutuhan untuk mengatur beberapa parameter. Interpretabilitas menjadi tantangan karena banyaknya pohon keputusan yang terlibat, membuat sulit untuk memahami kontribusi setiap fitur. Selain itu, pengaturan parameter yang optimal memerlukan eksperimen yang cermat, yang bisa menjadi rumit tanpa pengetahuan awal tentang dataset.
      
4. Naive Bayes
   <p align="justify"> Naive Bayes adalah model pembelajaran mesin yang bersifat probabilistik dan digunakan untuk tugas klasifikasi. Inti dari pengklasifikasi ini didasarkan pada teorema Bayes, yang memungkinkan perhitungan probabilitas untuk mengklasifikasikan data. Naive Bayes mengasumsikan bahwa setiap fitur dalam dataset bersifat independen satu sama lain, yang menyederhanakan proses klasifikasi <a href="https://www.geeksforgeeks.org/naive-bayes-classifiers/">[5]</a>. </p>

-  Konfigurasi model SVM:
    - Jenis: Bernoulli Naive Bayes (digunakan karena dataset berbasis biner)

-  Berikut adalah tahapan implementasi yang:
    
    - Algoritma ini menggunakan teorema Bayes dengan asumsi independensi antar fitur.
    - Model Naive Bayes dilatih dengan data pelatihan dan diuji dengan data uji, dengan akurasi yang dihitung dan disimpan.

-  Naive Bayes memiliki kelebihan dan kekurangannya adalah sebagai berikut:
    
    - Kelebihan: Algoritma ini mudah dipahami dan diimplementasikan, menjadikannya pilihan yang baik untuk pemula. Selain itu, Naive Bayes efektif dalam menangani masalah klasifikasi multi-kategori, terutama jika asumsi independensi fitur terpenuhi
    
    - Kekurangan: Asumsi bahwa fitur-fitur saling mandiri sering kali tidak terpenuhi dalam kondisi nyata, yang dapat mengurangi akurasi model. Kemudian masalah zero probability muncul ketika kata-kata baru yang tidak ada dalam dataset pelatihan dihadapi, meskipun dapat diatasi dengan teknik smoothing.
 
## Evaluation

Dalam proyek ini, beberapa metrik evaluasi yang digunakan adalah sebagai berikut.
1. Akurasi
   Akurasi mengukur persentase prediksi yang benar dari keseluruhan data uji. Ini adalah metrik yang paling umum digunakan untuk evaluasi model, namun bisa kurang memadai pada dataset yang tidak seimbang. Formula akurasi adalah:<br>
   ![akurasi](https://github.com/Adityas22/predictive-analytics-hepatitis/raw/main/image/akurasi.png)
   
2. Precision
   Precision mengukur ketepatan prediksi model, yaitu seberapa banyak prediksi positif yang benar dari keseluruhan prediksi positif yang dihasilkan oleh model. Metrik ini penting ketika kesalahan positif palsu (false positives) lebih kritikal daripada kesalahan negatif palsu. Formula precision adalah:<br>
    ![Precision](https://github.com/Adityas22/predictive-analytics-hepatitis/raw/main/image/precission.png)
   
3. Recall
   Recall (juga dikenal sebagai sensitivitas) mengukur kemampuan model untuk mendeteksi seluruh instance positif yang sebenarnya. Ini penting ketika tujuan utama adalah mengurangi kesalahan negatif palsu (false negatives). Formula recall adalah:<br>
   ![Recall](https://github.com/Adityas22/predictive-analytics-hepatitis/raw/main/image/recall.png)
   
4. F1-Score
   F1-Score adalah rata-rata harmonis dari precision dan recall, yang memberikan gambaran seimbang tentang model, terutama ketika terdapat trade-off antara precision dan recall. F1-Score sangat berguna pada dataset yang tidak seimbang. Formula F1-Score adalah:<br>
   ![F1-Score](https://github.com/Adityas22/predictive-analytics-hepatitis/raw/main/image/f-1%20score.png)
   
#### Visualization
<table border="1">
  <thead>
    <tr>
      <th>Model</th>
      <th>Accuracy</th>
      <th>Precision</th>
      <th>Recall</th>
      <th>F1-Score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>KNN</td>
      <td>0.861789</td>
      <td>0.781866</td>
      <td>0.861789</td>
      <td>0.812318</td>
    </tr>
    <tr>
      <td>SVM</td>
      <td>0.878049</td>
      <td>0.787992</td>
      <td>0.878049</td>
      <td>0.828218</td>
    </tr>
    <tr>
      <td>Random Forest</td>
      <td>0.886179</td>
      <td>0.837234</td>
      <td>0.886179</td>
      <td>0.859011</td>
    </tr>
    <tr>
      <td>Naive Bayes</td>
      <td>0.829268</td>
      <td>0.687686</td>
      <td>0.829268</td>
      <td>0.751870</td>
    </tr>
  </tbody>
</table>

Dari tabel diatas menghasilkan grafik berikut:<br>
![grafik](https://github.com/Adityas22/predictive-analytics-hepatitis/raw/main/image/grafikk.png)

#### Kesimpulan

Berdasarkan evaluasi model yang dilakukan, proyek ini berhasil menerapkan beberapa model klasifikasi yang mampu memprediksi hasil dengan baik, dengan Random Forest menunjukkan akurasi tertinggi (88.62%). Hal ini menunjukkan efektivitas solusi yang diusulkan dalam mengatasi masalah dan mencapai tujuan utama, yaitu menciptakan model klasifikasi yang akurat. Sementara itu, K-Nearest Neighbor (KNN) dan Support Vector Machine (SVM) juga memberikan performa yang baik dengan akurasi masing-masing sebesar 86.18% dan 87.80%. Meskipun Naive Bayes memiliki akurasi lebih rendah (82.93%), model ini tetap dapat menjadi alternatif yang berguna tergantung pada konteks penggunaannya. Dengan menggunakan berbagai model seperti KNN, SVM, Random Forest, dan Naive Bayes, proyek ini menunjukkan hasil positif dalam hal akurasi dan stabilitas.

  
## Referensi

[1] Damayanti. Alfina, Testiana. Gusmelia, "PENERAPAN DATA MINING UNTUK PREDIKSIPENYAKIT HEPATITIS C MENGGUNAKANALGORITMANAÏVE BAYES", 2021, Retrieved from: https://journal.stmikjayakarta.ac.id/index.php/JMIJayakarta/article/view/1098/732

[2] geeksforgeeks.org, "K-Nearest Neighbor(KNN) Algorithm", Retrieved from: https://www.geeksforgeeks.org/k-nearest-neighbours/

[3] geeksforgeeks.org, "Support Vector Machine (SVM) Algorithm", Retrieved from: https://www.geeksforgeeks.org/support-vector-machine-algorithm/

[4] geeksforgeeks.org, "Random Forest Algorithm in Machine Learning", Retrieved from: https://www.geeksforgeeks.org/random-forest-algorithm-in-machine-learning/

[5] geeksforgeeks.org, "Naive Bayes Classifiers", Retrieved from: https://www.geeksforgeeks.org/naive-bayes-classifiers/



