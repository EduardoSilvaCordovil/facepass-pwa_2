if ('serviceWorker' in navigator) {
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

// app.js
let deferredPrompt;

// Detecta quando o navegador está pronto para instalar a PWA
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  showInstallButton();
});

// Exibe o botão de instalação
function showInstallButton() {
  const installButton = document.getElementById('installButton');
  if (installButton) installButton.style.display = 'block';
}

// Oculta o botão após a instalação
function hideInstallButton() {
  const installButton = document.getElementById('installButton');
  if (installButton) installButton.style.display = 'none';
}

// Trata o clique no botão de instalação
document.getElementById('installButton').addEventListener('click', () => {
  if (deferredPrompt) {
    deferredPrompt.prompt(); // Mostra o prompt nativo
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Usuário instalou a PWA');
      }
      deferredPrompt = null;
    });
  }
});

// Detecta quando a PWA foi instalada
window.addEventListener('appinstalled', () => {
  console.log('PWA instalada com sucesso');
  hideInstallButton();
});

// PWA Installation Script
/*let deferredPrompt;
const installButton = document.getElementById('installButton');

// Show install button when PWA is installable
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installButton.style.display = 'block';
});

// Handle installation when button is clicked
installButton.addEventListener('click', async () => {
  if (deferredPrompt) {
    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('Usuário aceitou a instalação');
      } else {
        console.log('Usuário rejeitou a instalação');
      }

      deferredPrompt = null;
      installButton.style.display = 'none';
    } catch (error) {
      console.error('Erro durante a instalação:', error);
    }
  }
});

// Hide install button after successful installation
window.addEventListener('appinstalled', () => {
  console.log('PWA instalada com sucesso');
  installButton.style.display = 'none';
});*/