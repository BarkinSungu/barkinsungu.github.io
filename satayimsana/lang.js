// Shows the Turkish or English text: the saved choice, else the browser language.
(function () {
  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  var lang = saved || ((navigator.language || "en").toLowerCase().indexOf("tr") === 0 ? "tr" : "en");
  function apply(l) {
    document.documentElement.lang = l;
    var buttons = document.querySelectorAll(".lang button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.toggle("on", buttons[i].getAttribute("data-set") === l);
    }
    var mark = document.querySelector("img.wordmark");
    if (mark) mark.src = l === "tr" ? "assets/logo_wordmark.png" : "assets/logo_wordmark_en.png";
    document.title = document.documentElement.getAttribute("data-title-" + l) || document.title;
  }
  apply(lang);
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".lang button");
    if (!b) return;
    var l = b.getAttribute("data-set");
    try { localStorage.setItem("lang", l); } catch (err) {}
    apply(l);
  });
})();
