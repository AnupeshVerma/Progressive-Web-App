// Registering ServiceWorker
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('service-worker.js').then(function (registration) {
		console.log('ServiceWorker registration successful with scope: ', registration.scope);
	}).catch(function (err) {
		console.log('ServiceWorker registration failed: ', err);
	});
}


let deferredPrompt


window.addEventListener('beforeinstallprompt', (e) => {
    deferredPrompt = e;
    console.log("Beforeinstallprompt triggered")
})


const installApp = document.getElementById('installButton');

installApp.addEventListener('click', async () => {
	installSource = 'customInstallationButton';

	if (deferredPrompt !== null) {
		deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;
		if (outcome === 'accepted') {
			deferredPrompt = null;
		}

		ga('send', {
			hitType: 'event',
			eventCategory: 'pwa-install',
			eventAction: 'custom-installation-button-clicked',
			eventLabel: installSource,
			eventValue: outcome === 'accepted' ? 1 : 0
		});
	} else {
		alert('Notepad is already installed.')
	}
});