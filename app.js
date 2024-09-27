// Registering ServiceWorker
if ("serviceWorker" in navigator) {
	navigator.serviceWorker
	.register("static/sw.js")
	.then(function (registration) {
		console.log("ServiceWorker registration successful with scope: ",registration.scope);
	})
	.catch(function (err) {
		console.log("ServiceWorker registration failed: ", err);
	});
}

// Display install button if beforeinstallprompt event triggerred
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
	const installAppButtonContainer = document.getElementById("install_app_btn_container");
	if (installAppButtonContainer) {
		console.log("Install button displayed.")
		installAppButtonContainer.style.display = "flex";
	} else {
		console.error('InstallAppButtonContainer element not found.');
	}

	// Open insall button by default
	deferredPrompt = e;
	e.userChoice.then(function (choiceResult) {
		if (choiceResult.outcome === "accepted") {
			deferredPrompt = null;
		}
	});
});

// Open install prompt on clicking install button
const installApp = document.getElementById("install_app_btn");
installApp.addEventListener("click", async () => {
	if (deferredPrompt !== null) {
		deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;
		if (outcome === "accepted") {
			deferredPrompt = null;
		}
	} else {
		alert(" App already installed");
	}
});

// Events occurred after loading DOM contents
document.addEventListener("DOMContentLoaded", function () {
	// Disable zooming by adding meta tag dynamically
	const meta = document.createElement("meta");
	meta.name = "viewport";
	meta.content =
	"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
	document.getElementsByTagName("head")[0].appendChild(meta);

	// Disable text selection
	document.body.style.userSelect = "none";

});
