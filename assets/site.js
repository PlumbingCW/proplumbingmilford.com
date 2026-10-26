(function () {
  "use strict";
  var root = document.documentElement;
  var drawer = document.getElementById("mob-drawer");
  var overlay = document.getElementById("mob-overlay");
  var hamburger = document.getElementById("hamburger");
  var closeBtn = document.getElementById("mob-close");
  function openMenu() {
    if (!drawer) return;
    drawer.classList.add("open");
    overlay.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    root.style.overflow = "hidden";
  }
  function closeMenu() {
    if (!drawer) return;
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    root.style.overflow = "";
  }
  if (hamburger) hamburger.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (overlay) overlay.addEventListener("click", closeMenu);
  if (drawer) {
    drawer.addEventListener("click", function (e) {
      var t = e.target;
      while (t && t !== drawer) {
        if (t.tagName === "A") { closeMenu(); return; }
        t = t.parentNode;
      }
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) closeMenu();
  });

  var qs = document.querySelectorAll(".faq-q");
  Array.prototype.forEach.call(qs, function (q) {
    q.addEventListener("click", function () {
      var a = document.getElementById(q.getAttribute("aria-controls"));
      var open = q.getAttribute("aria-expanded") === "true";
      q.setAttribute("aria-expanded", open ? "false" : "true");
      a.style.maxHeight = open ? "0px" : a.scrollHeight + "px";
    });
  });
  window.addEventListener("resize", function () {
    Array.prototype.forEach.call(document.querySelectorAll(".faq-q[aria-expanded='true']"), function (q) {
      var a = document.getElementById(q.getAttribute("aria-controls"));
      a.style.maxHeight = a.scrollHeight + "px";
    });
  });
})();
