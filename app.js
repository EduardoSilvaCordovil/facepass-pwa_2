/*if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch((error) => {
        console.error('Falha ao registrar o Service Worker:', error);
      });
  });
}*/

let installEvent = null;
let installButton = document.getElementById("install");

if (localStorage["pwa-enabled"]) {
  startPwa();
}

function startPwa(firstStart) {
  localStorage["pwa-enabled"] = true;

  if (firstStart) {
    location.reload();
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js")
      .then(registration => {
        console.log("Service Worker is registered", registration);
        enableButton.parentNode.remove();
      })
      .catch(err => {
        console.error("Registration failed:", err);
      });
  });

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    console.log("Ready to install...");
    installEvent = e;
    document.getElementById("install").style.display = "initial";
  });

  setTimeout(cacheLinks, 500);

  function cacheLinks() {
    caches.open("pwa").then(function (cache) {
      let linksFound = [];
      document.querySelectorAll("a").forEach(function (a) {
        linksFound.push(a.href);
      });

      cache.addAll(linksFound);
    });
  }

  if (installButton) {
    installButton.addEventListener("click", function () {
      installEvent.prompt();
    });
  }
}
