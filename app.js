let installButton = document.getElementById("installButton");

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

let deferredPrompt;

// Evento disparado quando o navegador está pronto para mostrar o prompt de instalação
window.addEventListener('beforeinstallprompt', (event) => {
  // Previne o prompt automático
  event.preventDefault();
  // Armazena o evento para uso posterior
  deferredPrompt = event;
  // Exibe o botão de instalação
  document.getElementById('installButton').style.display = 'block';
});

// Adiciona o evento de clique ao botão de instalação
document.getElementById('installButton').addEventListener('click', () => {
  if (deferredPrompt) {
    // Mostra o prompt de instalação
    deferredPrompt.prompt();
    // Espera pela escolha do usuário
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Usuário aceitou a instalação');
      } else {
        console.log('Usuário recusou a instalação');
      }
      // Limpa o evento armazenado
      deferredPrompt = null;
    });
  }
});