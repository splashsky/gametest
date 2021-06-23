const ui: HTMLElement = document.getElementById("ui");

export function updateH1(text: string): void
{
    this.ui.querySelector("h1").innerText = text;
}

export function notice(text: string): void {
    const notice = this.ui.querySelector("#notice") as HTMLElement;

    notice.innerText = text;
    notice.classList.replace("hidden", "show");
}