(() => {
  // src/UI.ts
  var ui = document.getElementById("ui");
  var testEvent = new CustomEvent("notice", { detail: {} });
  ui.addEventListener("notice", (e) => {
    console.log("Hey there's a notice!");
  });
})();
