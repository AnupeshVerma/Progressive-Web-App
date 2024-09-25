let deferredPrompt;

if ('serviceWorker' in navigator) {
    console.log("Registering service worker...")
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => {
                console.log('Service Worker registered', reg);
            })
            .catch(err => {
                console.error('Service Worker registration failed', err);
            });
    });
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installButton = document.getElementById('installButton');
    installButton.style.backgroundColor = 'blue';
});


const installApp = document.getElementById('installButton');

installApp.addEventListener('click', async () => {
    if (deferredPrompt !== null) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            deferredPrompt = null;
        }
    }
    else
    console.log("No deferred prompt")
    alert("No deferred prompt")
});