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
}

let installEvent = null;
let installButton = document.getElementById("install");

function startPwa(firstStart) {
  localStorage["pwa-enabled"] = true;

  if (firstStart) {
    location.reload();
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js")
      .then(registration => {
        console.log("Service Worker is registered", registration);
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
} */

// Configuração de Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js')
          .then(registration => {
              console.log('Service Worker registrado com sucesso:', registration);
          })
          .catch(error => {
              console.error('Falha ao registrar o Service Worker:', error);
          });
  });
}

// Instalação da PWA
let deferredInstallPrompt = null;
const installContainer = document.getElementById('install');
const install = document.getElementById('install');

// Evento disparado quando o app está pronto para ser instalado
window.addEventListener('beforeinstallprompt', (e) => {
  // Previne que o navegador mostre o banner de instalação padrão
  e.preventDefault();
  
  // Guarda o evento para usar depois
  deferredInstallPrompt = e;
  
  // Mostra o botão de instalação
  installContainer.classList.remove('hidden');
});

// Evento de clique no botão de instalação
install.addEventListener('click', async () => {
  if (deferredInstallPrompt) {
      // Mostra o prompt de instalação
      deferredInstallPrompt.prompt();
      
      // Espera a escolha do usuário
      const choiceResult = await deferredInstallPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
          console.log('Usuário aceitou a instalação');
      } else {
          console.log('Usuário recusou a instalação');
      }
      
      // Limpa o prompt
      deferredInstallPrompt = null;
      
      // Esconde o botão
      installContainer.classList.add('hidden');
  }
});

// Evento disparado após a instalação
window.addEventListener('appinstalled', (e) => {
  console.log('App foi instalado com sucesso');
});
