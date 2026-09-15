(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Nav toggle (mobile) ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- Hero scan animation ---------- */
  var heroPanel = document.querySelector(".hero__panel");
  if (heroPanel && !prefersReduced) {
    window.addEventListener("load", function () {
      setTimeout(function () {
        heroPanel.classList.add("is-scanning");
      }, 400);
    });
  }

  /* ---------- Count-up ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    if (isNaN(target) || prefersReduced) {
      el.textContent = target;
      return;
    }
    var dur = 1100;
    var start = performance.now();
    function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = target % 1 !== 0 ? val.toFixed(1) : String(Math.round(val));
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target % 1 !== 0 ? target.toFixed(1) : String(target);
    }
    requestAnimationFrame(tick);
  }

  var counters = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));
  var io;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { io.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute("data-count"); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealTargets = Array.prototype.slice.call(
    document.querySelectorAll(".section__title, .section__lede, .split, .routegrid, .gejalagrid, .riskgrid, .diagflow, .statgrid, .reflist, .cta__inner, .hero__copy")
  );
  if (!prefersReduced && "IntersectionObserver" in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-reveal", "1");
          entry.target.classList.add("is-in");
          ro.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) {
      el.setAttribute("data-reveal", "1");
      ro.observe(el);
    });
  }
})();
