// Registering Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').then(function (registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function (err) {
        console.log('ServiceWorker registration failed: ', err);
    });
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    deferredPrompt = e;
    console.log("Beforeinstallprompt triggered");
});


const installApp = document.getElementById('installButton');
installApp.addEventListener('click', async () => {

    if (deferredPrompt !== null) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            deferredPrompt = null;
            // Log to console or perform another action when accepted
            console.log('User accepted the installation.');
        } else {
            // Log to console or perform another action when dismissed
            console.log('User dismissed the installation.');
        }
    } else {
        alert('Notepad is already installed.');
    }
});
