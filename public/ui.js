(() => {
  // src/UI.ts
  var ui = document.getElementById("ui");
  function updateH1(text) {
    this.ui.querySelector("h1").innerText = text;
  }
  function notice(text) {
    const notice2 = this.ui.querySelector("#notice");
    notice2.innerText = text;
    notice2.classList.replace("hidden", "show");
  }
})();
