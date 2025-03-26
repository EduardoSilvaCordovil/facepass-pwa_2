let deferredPrompt;

// Detecta o evento de instalação
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  showInstallButton();
});

// Exibe o botão de instalação
function showInstallButton() {
  const installButton = document.getElementById('install');
  if (installButton) {
    installButton.style.display = 'block';
  }
}

// Inicia o processo de instalação ao clicar no botão
document.getElementById('install').addEventListener('click', () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Usuário aceitou a instalação');
      } else {
        console.log('Usuário rejeitou a instalação');
      }
      deferredPrompt = null;
    });
  }
});