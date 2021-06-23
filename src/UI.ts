const ui = document.getElementById("ui");

export const testEvent = new CustomEvent("notice", { detail: {} });

ui.addEventListener("notice", (e) => {
    console.log("Hey there's a notice!");
});