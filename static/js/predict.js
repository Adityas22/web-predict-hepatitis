(function () {
  "use strict";

  /* ---------- Metadata fitur (deskripsi UI, bukan angka model) ---------- */
  var FEATURE_META = [
    { key: "ALB",  name: "Albumin",                       unit: "g/L",    min: 14.9, max: 82.2,   step: "any", desc: "Protein utama yang diproduksi hati." },
    { key: "ALP",  name: "Alkaline Phosphatase",          unit: "U/L",    min: 11.3, max: 416.6,  step: "any", desc: "Enzim terkait kesehatan hati dan tulang." },
    { key: "ALT",  name: "Alanine Aminotransferase",      unit: "U/L",    min: 0.9,  max: 325.3,  step: "any", desc: "Enzim hati — naik saat sel hati mengalami kerusakan." },
    { key: "AST",  name: "Aspartate Aminotransferase",    unit: "U/L",    min: 10.6, max: 324.0,  step: "any", desc: "Enzim hati — naik saat sel hati, jantung, atau otot rusak." },
    { key: "BIL",  name: "Bilirubin",                     unit: "µmol/L", min: 0.8,  max: 254.0,  step: "any", desc: "Zat kuning dari sel darah merah; tinggi dapat menyebabkan kulit menguning." },
    { key: "CHE",  name: "Cholinesterase",                unit: "U/L",    min: 1.42, max: 16.41,  step: "any", desc: "Enzim yang diproduksi oleh hati." },
    { key: "CHOL", name: "Cholesterol",                   unit: "mmol/L", min: 1.43, max: 9.67,   step: "any", desc: "Kolesterol total dalam darah." },
    { key: "CREA", name: "Creatinin",                     unit: "µmol/L", min: 8.0,  max: 1079.1, step: "any", desc: "Produk sisa otot — penanda fungsi ginjal." },
    { key: "GGT",  name: "Gamma-Glutamyl Transferase",    unit: "U/L",    min: 4.5,  max: 650.9,  step: "any", desc: "Enzim hati; naik pada gangguan hati atau saluran empedu." },
    { key: "PROT", name: "Total Protein",                 unit: "g/L",    min: 44.8, max: 90.0,   step: "any", desc: "Kadar protein total dalam darah." },
  ];

  var SEVERITY = {
    "Blood Donor": "good",
    "Suspect Blood Donor": "warn",
    "Hepatitis": "warn",
    "Fibrosis": "danger",
    "Cirrhosis": "danger",
  };
  var PILL_LABEL = { good: "Profil sehat", warn: "Perlu perhatian", danger: "Segera konsultasi" };

  var form = document.getElementById("predictForm");
  var labFields = document.getElementById("labFields");
  var modelPick = document.getElementById("modelPick");
  var resultEmpty = document.getElementById("resultEmpty");
  var resultBody = document.getElementById("resultBody");
  var submitBtn = document.getElementById("submitBtn");
  var metricsData = null;
  var selectedModel = null;

  /* ---------- Build lab fields ---------- */
  FEATURE_META.forEach(function (meta) {
    var field = document.createElement("div");
    field.className = "field";
    field.innerHTML =
      '<label for="f-' + meta.key + '">' +
        '<span class="fcode">' + meta.key + '</span> ' + meta.name +
        ' <span class="funit">' + meta.unit + "</span>" +
      "</label>" +
      '<p class="fdesc">' + meta.desc + "</p>" +
      '<input type="number" id="f-' + meta.key + '" name="' + meta.key + '" ' +
        'min="' + meta.min + '" max="' + meta.max + '" step="any" inputmode="decimal" ' +
        'placeholder="kosong jika tidak tahu">';
    labFields.appendChild(field);
  });

  /* ---------- Load model list ---------- */
  fetch("/api/models")
    .then(function (r) { return r.json(); })
    .then(function (data) {
      metricsData = data;
      renderModelPick(data);
    })
    .catch(function () {
      modelPick.innerHTML =
        '<p class="errbox" role="alert">Gagal memuat data model. Pastikan server berjalan dan coba muat ulang.</p>';
    });

  function pct(v) { return (v * 100).toFixed(1) + "%"; }

  function renderModelPick(data) {
    var ids = Object.keys(data.models);
    var best = ids.reduce(function (a, b) {
      return data.models[a].accuracy >= data.models[b].accuracy ? a : b;
    });
    modelPick.innerHTML = "";
    ids.forEach(function (id) {
      var m = data.models[id];
      var label = document.createElement("label");
      label.className = "mcard";
      label.innerHTML =
        '<input type="radio" name="model" value="' + id + '"' + (id === best ? " checked" : "") + ">" +
        '<span class="mcard__inner">' +
          '<span>' +
            '<span class="mcard__name">' + m.name + "</span>" +
            '<span class="mcard__metarow">' +
              "<span>P " + pct(m.precision) + "</span>" +
              "<span>R " + pct(m.recall) + "</span>" +
              "<span>F1 " + pct(m.f1) + "</span>" +
            "</span>" +
          "</span>" +
          '<span class="mcard__badge">' + pct(m.accuracy) + " <em>akurasi</em></span>" +
        "</span>";
      modelPick.appendChild(label);
    });
    selectedModel = best;
    modelPick.addEventListener("change", function (e) {
      if (e.target.name === "model") selectedModel = e.target.value;
    });
  }

  /* ---------- Submit ---------- */
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!selectedModel || !metricsData) return;

    var ageInput = document.getElementById("f-age");
    var age = parseFloat(ageInput.value);
    if (isNaN(age) || age <= 0 || age > 120) {
      ageInput.classList.add("is-invalid");
      showError("Usia wajib diisi dengan angka antara 1–120 tahun.");
      return;
    }
    ageInput.classList.remove("is-invalid");

    var sex = document.querySelector('input[name="Sex"]:checked');
    var features = { Age: age, Sex: sex ? sex.value : "f" };
    FEATURE_META.forEach(function (meta) {
      var el = document.getElementById("f-" + meta.key);
      var v = parseFloat(el.value);
      if (!isNaN(v)) features[meta.key] = v;
    });

    submitBtn.disabled = true;
    submitBtn.textContent = "Memproses…";
    hideError();

    fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: selectedModel, features: features }),
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (!res.ok || res.d.error) throw new Error(res.d.error || "Terjadi kesalahan.");
        renderResult(res.d);
      })
      .catch(function (err) {
        showError(err.message || "Terjadi kesalahan saat memproses prediksi.");
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Prediksi Sekarang";
      });
  });

  /* ---------- Render result ---------- */
  function renderResult(res) {
    resultEmpty.hidden = true;
    resultBody.hidden = false;

    var sev = SEVERITY[res.predicted_class] || "warn";
    var prob = res.probabilities || [];
    var flags = res.flags || [];
    var ctx = res.context || {};

    var html = "";
    html += '<div class="result__verdict">';
    html += '<span class="result__verdict-label">Hasil prediksi · ' + esc(res.model_name) + "</span>";
    html += '<div class="result__class">' + esc(res.predicted_class) +
            ' <span class="result__pill pill--' + sev + '">' + PILL_LABEL[sev] + "</span></div>";
    html += '<span class="result__conf">Keyakinan model: <strong>' + pct(res.confidence) + "</strong> · skrining awal</span>";
    html += "</div>";

    html += '<h3 class="result__headline">' + esc(ctx.headline || "Ringkasan") + "</h3>";
    html += '<p class="result__text">' + esc(ctx.paragraph || "") + "</p>";

    html += '<div class="result__block">';
    html += '<p class="result__block-title">Distribusi probabilitas kelas</p>';
    prob.forEach(function (p, i) {
      var lead = i === 0;
      html += '<div class="probrow">' +
        '<div class="probrow__top"><strong>' + esc(p.label) + "</strong>" +
        '<span class="probrow__pct">' + pct(p.value) + "</span></div>" +
        '<div class="probrow__bar"><div class="probrow__fill' + (lead ? " probrow__fill--lead" : "") +
        '" data-w="' + Math.max(2, p.value * 100) + '"></div></div>' +
        "</div>";
    });
    html += "</div>";

    if (flags.length) {
      html += '<div class="result__block">';
      html += '<p class="result__block-title">Catatan nilai lab di luar rentang umum</p>';
      html += '<ul class="flaglist">';
      flags.forEach(function (f) {
        var mark = f.status === "high" ? "▲" : "▼";
        var cls = f.status === "high" ? "flag--high" : "flag--low";
        var note = f.note || (f.status === "high" ? "di atas rentang umum" : "di bawah rentang umum");
        html += '<li class="' + cls + '">' +
          '<span class="flag__mark">' + mark + "</span>" +
          "<span>" + esc(f.name) + "</span>" +
          '<span class="flag__val">' + f.value + " " + esc(f.unit) + "</span>" +
          '<span class="flag__note">' + esc(note) + "</span>" +
          "</li>";
      });
      html += "</ul>";
      html += '<p class="cmcap">Rentang rujukan adalah nilai umum; tiap laboratorium dapat memiliki standar berbeda.</p>';
      html += "</div>";
    } else {
      html += '<div class="result__block"><p class="result__text" style="margin:0">Seluruh nilai lab yang Anda masukkan berada dalam rentang umum.</p></div>';
    }

    var mm = res.model_metrics || {};
    html += '<div class="result__block">';
    html += '<p class="result__block-title">Performa model ini (data uji)</p>';
    html += '<div class="metrow">' +
      '<span class="chip">Akurasi <strong>' + pct(mm.accuracy) + "</strong></span>" +
      '<span class="chip">Precision <strong>' + pct(mm.precision) + "</strong></span>" +
      '<span class="chip">Recall <strong>' + pct(mm.recall) + "</strong></span>" +
      '<span class="chip">F1 <strong>' + pct(mm.f1) + "</strong></span>" +
      "</div>";
    if (mm.confusion_matrix) {
      html += '<p style="margin:14px 0 0"><button type="button" class="cm-toggle" data-cmbtn aria-expanded="false">Lihat confusion matrix</button></p>';
      html += '<div class="cmwrap" data-cm hidden>' + buildCM(mm.confusion_matrix) + "</div>";
    }
    html += "</div>";

    html += '<div class="disclaimer"><strong>Peringatan penting:</strong> ' + esc(res.disclaimer) + "</div>";

    resultBody.innerHTML = html;

    requestAnimationFrame(function () {
      var bars = resultBody.querySelectorAll(".probrow__fill");
      bars.forEach(function (b) {
        requestAnimationFrame(function () { b.style.width = b.getAttribute("data-w") + "%"; });
      });
    });

    var cmBtn = resultBody.querySelector("[data-cmbtn]");
    if (cmBtn) {
      cmBtn.addEventListener("click", function () {
        var box = resultBody.querySelector("[data-cm]");
        var open = box.hidden;
        box.hidden = !open;
        cmBtn.setAttribute("aria-expanded", open ? "true" : "false");
        cmBtn.textContent = open ? "Sembunyikan confusion matrix" : "Lihat confusion matrix";
      });
    }

    resultBody.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function buildCM(cm) {
    var labels = (metricsData && metricsData.class_labels) || [];
    var rows = cm.length;
    var h = '<table class="cmtable">';
    h += "<tr><th>Nyata \\ Prediksi</th>";
    labels.forEach(function (l) { h += "<th>" + esc(l) + "</th>"; });
    h += "</tr>";
    for (var i = 0; i < rows; i++) {
      h += "<tr><th>" + esc(labels[i] || "Kelas " + i) + "</th>";
      for (var j = 0; j < cm[i].length; j++) {
        var diag = i === j ? ' class="cm-diag"' : "";
        h += "<td" + diag + ">" + cm[i][j] + "</td>";
      }
      h += "</tr>";
    }
    h += "</table>";
    h += '<p class="cmcap">Baris = kelas sebenarnya, kolom = kelas yang diprediksi, diagonal = prediksi benar.</p>';
    return h;
  }

  /* ---------- Helpers ---------- */
  function esc(s) {
    if (s == null) return "";
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function showError(msg) {
    var e = document.querySelector(".errbox");
    if (!e) {
      e = document.createElement("div");
      e.className = "errbox";
      e.setAttribute("role", "alert");
      form.querySelector(".form__actions").insertAdjacentElement("beforebegin", e);
    }
    e.textContent = msg;
  }
  function hideError() {
    var e = document.querySelector(".errbox");
    if (e) e.remove();
  }

  document.getElementById("resetBtn").addEventListener("click", function () {
    hideError();
    resultEmpty.hidden = false;
    resultBody.hidden = true;
    resultBody.innerHTML = "";
  });
})();
