lucide.createIcons({
    color: "#06B6D4"
});

const menuLinks = document.querySelectorAll("[data-screen]");
const screens = document.querySelectorAll(".screen");
const hudLeft = document.getElementById("hud-left");
const hudCenter = document.getElementById("hud-center");
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

const hudTitles = {
    "projects-screen": "PROJETOS",
    "skills-screen": "STACKS & OUTROS",
    "contact-screen": "CONTATO"
};

function showScreen(screenId) {
    screens.forEach(screen => screen.classList.remove("active"));
    document.getElementById(screenId).classList.add("active");

    if (screenId === "menu-screen") {
        hudLeft.textContent = "PERFIL { dev-phellip }";
        updateClock();
        return;
    }

    hudLeft.textContent = "◄ VOLTAR AO MENU";
    hudCenter.textContent = hudTitles[screenId];
}

function updateClock() {
    const activeScreen = document.querySelector(".screen.active");
    if (activeScreen.id !== "menu-screen") return;
    hudCenter.textContent = new Date().toLocaleTimeString("pt-BR");
}

updateClock();
setInterval(updateClock, 1000);

menuLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        showScreen(link.dataset.screen);
    });
});

hudLeft.addEventListener("click", () => {
    const activeScreen = document.querySelector(".screen.active");
    if (activeScreen.id !== "menu-screen") {
        showScreen("menu-screen");
    }
});

form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = new FormData(form);
    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: data,
            headers: { Accept: "application/json" }
        });
        if (response.ok) {
            status.textContent = "✓ Mensagem enviada com sucesso!";
            form.reset();
        } else {
            status.textContent = "✕ Erro ao enviar mensagem.";
        }
    } catch (error) {
        status.textContent = "✕ Falha de conexão.";
    }
});
