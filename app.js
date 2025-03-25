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

// Variáveis de controle
let deferredPrompt; // Renomeado para clareza [[1]]
const installButton = document.getElementById('installButton');

// Verifica se o usuário já instalou a PWA
if (localStorage.getItem('pwa-installed') === 'true') {
  hideInstallButton(); // Oculta botão se já instalado
}

// Evento de pré-instalação (disparado pelo navegador)
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event; // Armazena evento para uso posterior
  showInstallButton(); // Exibe botão de instalação
});

// Evento de clique no botão de instalação
installButton?.addEventListener('click', () => {
  if (deferredPrompt) {
    deferredPrompt.prompt(); // Mostra prompt nativo
    deferredPrompt.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        localStorage.setItem('pwa-installed', 'true'); // Marca como instalado
        hideInstallButton();
      }
      deferredPrompt = null; // Limpa evento
    });
  }
});

// Função para exibir botão de instalação
function showInstallButton() {
  installButton.style.display = 'block';
}

// Função para ocultar botão de instalação
function hideInstallButton() {
  installButton.style.display = 'none';
}

// Cache dinâmico de recursos (apenas para demonstração)
function cacheResources() {
  caches.open('pwa-cache').then(cache => {
    cache.addAll([
      '/',
      '/index.html',
      '/style.css',
      '/app.js',
      '/icon.png'
    ]);
  });
}
cacheResources(); // Executa cache inicial
