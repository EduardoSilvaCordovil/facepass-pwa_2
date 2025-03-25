let installButton = document.getElementById("install");

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
// Detecta o evento de instalação
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    showInstallButton();
});

// Exibe o botão de instalação
function showInstallButton() {
    const installButton = document.getElementById('installButton');
    const installInstructions = document.getElementById('installInstructions');
    if (installButton && installInstructions) {
        installButton.style.display = 'block';
        installInstructions.style.display = 'block';
    }
}

// Oculta os botões após a instalação
function hideInstallButtons() {
    const installButton = document.getElementById('installButton');
    const installInstructions = document.getElementById('installInstructions');
    const downloadButton = document.getElementById('downloadButton');

    if (installButton) installButton.style.display = 'none';
    if (installInstructions) installInstructions.style.display = 'none';
    if (downloadButton) downloadButton.style.display = 'none';
}

// Inicia o processo de instalação ao clicar no botão
document.getElementById('installButton').addEventListener('click', () => {
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

// Detecta quando a PWA foi instalada
window.addEventListener('appinstalled', () => {
    console.log('PWA instalada com sucesso');
    hideInstallButtons();
});

// Detecta o evento de instalação
/*window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    showInstallButton();
});

// Exibe o botão de instalação
function showInstallButton() {
    const installButton = document.getElementById('installButton');
    if (installButton) {
        installButton.style.display = 'block';
    }
}

// Inicia o processo de instalação ao clicar no botão
document.getElementById('installButton').addEventListener('click', () => {
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
    if (installButton) {
        installButton.addEventListener("click", function () {
            installEvent.prompt();
        });
    }
});*/