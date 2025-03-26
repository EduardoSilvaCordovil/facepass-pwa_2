if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('✅ Service Worker registrado com sucesso:', registration);
      })
      .catch((error) => {
        console.error('❌ Falha ao registrar o Service Worker:', error);
      });
  });
}

let installEvent = null;
let installButton = document.getElementById("install");
let enableButton = document.getElementById("enable");

if (enableButton) {
  enableButton.addEventListener("click", function () {
    this.disabled = true;
    startPwa(true);
  });
}

if (localStorage.getItem("pwa-enabled")) {
  startPwa();
}

function startPwa(firstStart) {
  localStorage.setItem("pwa-enabled", "true");

  if (firstStart) {
    location.reload();
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    console.log("ℹ️ PWA pronto para instalação...");
    installEvent = e;
    if (installButton) {
      installButton.style.display = "block";
      installButton.addEventListener("click", () => {
        installEvent.prompt();
      });
    }
  });

  // Cacheia apenas links internos
  setTimeout(() => {
    caches.open("pwa").then((cache) => {
      let linksFound = [];
      document.querySelectorAll("a").forEach((a) => {
        if (a.href.startsWith(location.origin)) {
          linksFound.push(a.href);
        }
      });
      cache.addAll(linksFound).catch((err) => console.error("Erro ao adicionar ao cache:", err));
    });
  }, 500);
}