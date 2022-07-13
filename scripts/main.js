sessionStorage.setItem("logData", "false");

function logData(logState = "false") {
	sessionStorage.setItem("logData", logState);
}

//----------------------------------------------------------------------------------------------------------------------

var currentModal;

function openModal(id) {
	let overlay = document.getElementById("overlay");
	currentModal = document.getElementById(id);
	currentModal.style.marginLeft = `-${currentModal.clientWidth / 2}px`;
	currentModal.style.top = "15%";
	currentModal.style.opacity = "1";
	currentModal.style.transform = "scale(1)";
	currentModal.style.visibility = "visible";
	overlay.style.visibility = "visible";
	overlay.style.opacity = "1";
	document.body.style.overflow = "hidden";
	togglePlayState("pause");
}

function closeModal() {
	let overlay = document.getElementById("overlay");
	overlay.style.visibility = "hidden";
	overlay.style.opacity = "0";
	currentModal.style.visibility = "hidden";
	currentModal.style.transform = "scale(1.1)";
	currentModal.style.opacity = "0";
	currentModal.style.top = "10%";
	document.body.style.overflow = "auto";
	togglePlayState("play");
}

// To center the modal if it is visible during window resize
window.addEventListener("resize", function () {
	if (currentModal && currentModal.style.visibility == "visible") {
		currentModal.style.marginLeft = `-${currentModal.clientWidth / 2}px`;
	}
});

//----------------------------------------------------------------------------------------------------------------------

function butttonIconTransition(elementId, iconText, delay = 50) {
	let element = document.getElementById(elementId);
	element.style.opacity = "0.4";
	element.style.transition = "0.25s";
	setTimeout(function changeIcon() {
		element.style.transform = `rotate(180deg) scale(0.5)`;
		element.innerHTML = iconText;
	}, 70);
	setTimeout(function morphIcon() {
		element.style.transform = `rotate(360deg) scale(1)`;
		element.style.opacity = "1";
	}, 150 + delay);
	setTimeout(function resetIcon() {
		element.style.transform = `rotate(0deg) scale(1)`;
		element.style.transition = "0s";
	}, 400 + delay);
}

//----------------------------------------------------------------------------------------------------------------------

var popupText = "lorem ipsum";

function spawnAlert(text = popupText, timeout = 1900) {
	let popup = document.createElement("div");
	popup.innerHTML = `<span>${text}</span>`;
	popup.className = "alert";
	popup.style.marginLeft = `-${
		getTextWidth(text, "20px Comfortaa") / 2 + 10
	}px`; // Centering the popup horizontally
	document.body.appendChild(popup);
	// console.log(getTextWidth(text, "20px Comfortaa"));
	transition();

	function transition() {
		setTimeout(function morph() {
			popup.style.transform = "scale(1) translate3d(0%, -100%, 0)";
			popup.style.opacity = "1";
		}, 0);
		setTimeout(function remove() {
			popup.style.transform = "scale(0) translate3d(0%, -100%, 0)";
			popup.style.opacity = "0";
		}, timeout);
		setTimeout(function delDiv() {
			popup.remove();
		}, timeout + 300);
	}

	function getTextWidth(text, font) {
		let canvas =
			getTextWidth.canvas ||
			(getTextWidth.canvas = document.createElement("canvas"));
		let context = canvas.getContext("2d");
		context.font = font;
		let metrics = context.measureText(text);
		return metrics.width;
	}
}

//----------------------------------------------------------------------------------------------------------------------

function copyText(text = "undefined") {
	navigator.clipboard.writeText(text);
	// Below code is for the icon morph effect
	toggleIcon();

	function toggleIcon() {
		let copyIcon = document.getElementById("copyId");
		copyIcon.style.transform = "scale(0.5)";
		copyIcon.style.opacity = "0.2";
		setTimeout(function back2one() {
			copyIcon.style.transform = "scale(1.25)";
			copyIcon.style.opacity = "1";
			copyIcon.innerHTML = "done";
		}, 300);
		setTimeout(function fade() {
			copyIcon.style.opacity = "0.2";
		}, 1500);
		setTimeout(function back2copy() {
			copyIcon.innerHTML = "copy";
			copyIcon.style.opacity = "1";
		}, 1800);
	}
}

//----------------------------------------------------------------------------------------------------------------------

function togglePlayState(forceState = "toggle") {
	// Decide what to do based on the current state & forceState
	let bgPlayState = window
		.getComputedStyle(document.body)
		.getPropertyValue("animation-play-state");
	let skipOverride;
	let playStateIconText;
	if (forceState == "toggle") {
		if (bgPlayState == "running") {
			bgPlayState = "paused";
			bgParticleMotion = "pause";
			popupText = "Background paused";
			playStateIconText = "play_arrow";
		} else {
			bgPlayState = "running";
			bgParticleMotion = "run";
			popupText = "Background running";
			playStateIconText = "pause";
		}
		skipOverride = false;
	} else if (forceState == "play") {
		skipOverride = bgPlayState == "running" ? true : false;
		bgPlayState = "running";
		bgParticleMotion = "run";
		popupText = "Background running";
		playStateIconText = "pause";
	} else if (forceState == "pause") {
		skipOverride = bgPlayState == "paused" ? true : false;
		bgPlayState = "paused";
		bgParticleMotion = "pause";
		popupText = "Background paused";
		playStateIconText = "play_arrow";
	}
	// Error handling
	else {
		console.log(
			`Invalid argument "${forceState}" passed to forceState.
			Available options: 'toggle', 'pause', 'play'`
		);
	}
	// Log the current state
	if (sessionStorage.getItem("logData") == "true") {
		console.log(`bgPlayState: ${bgPlayState}`);
		console.log(`popupText: ${popupText}`);
		console.log(`playStateIconText: ${playStateIconText}`);
		console.log(`skipOverride: ${skipOverride}`);
		console.log("");
	}
	if (skipOverride == false) {
		// Change play state
		document.body.style.animationPlayState = bgPlayState;
		try {
			if (bgParticleMotion == "pause") {
				particleAnims.forEach((elem, i, arr) => {
					elem.pause();
				});
			} else if (bgParticleMotion == "run") {
				particleAnims.forEach((elem, i, arr) => {
					elem.play();
				});
			}
			particles.forEach((elem, i, arr) => {
				elem.style.opacity = bgPlayState == "running" ? "0.5" : "0.2";
			});
		} catch (error) {}
		// Icon change & effect
		butttonIconTransition("playStateIcon", playStateIconText, (delay = 50));
	}
}

//----------------------------------------------------------------------------------------------------------------------

// Set initial theme based on system preferences, & setup sessionStorage item
function initializeTheme() {
	if (sessionStorage.getItem("theme") === null) {
		if (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		) {
			sessionStorage.setItem("theme", "dark");
			document.getElementById("themeToggleButtonIcon").innerHTML = "light_mode";
		} else if (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: light)").matches
		) {
			sessionStorage.setItem("theme", "light");
			document.getElementById("themeToggleButtonIcon").innerHTML = "dark_mode";
		} else {
			sessionStorage.setItem("theme", "light");
			document.getElementById("themeToggleButtonIcon").innerHTML = "light_mode";
		}
	}
	document.body.className = sessionStorage.getItem("theme");
}

function toggleTheme(forceTheme = "toggle") {
	// Decide what to do based on the current theme & forceTheme
	let skipOverride;
	let themeIconText;
	if (forceTheme == "toggle") {
		if (sessionStorage.getItem("theme") == "light") {
			sessionStorage.setItem("theme", "dark");
			themeIconText = "light_mode";
		} else if (sessionStorage.getItem("theme") == "dark") {
			sessionStorage.setItem("theme", "light");
			themeIconText = "dark_mode";
		}
		skipOverride = false;
	} else if (forceTheme == "dark") {
		skipOverride = sessionStorage.getItem("theme") == "dark" ? true : false;
		sessionStorage.setItem("theme", "dark");
		themeIconText = "light_mode";
	} else if (forceTheme == "light") {
		skipOverride = sessionStorage.getItem("theme") == "light" ? true : false;
		sessionStorage.setItem("theme", "light");
		themeIconText = "dark_mode";
	}
	// Error handling
	else {
		console.log(`${forceTheme} is not a valid argument.`);
	}
	// Log the current state
	if (sessionStorage.getItem("logData") == "true") {
		console.log(
			`sessionStorage.getItem("theme"): ${sessionStorage.getItem("theme")}`
		);
		console.log(`themeIconText: ${themeIconText}`);
		console.log("");
	}
	// Change theme
	if (skipOverride == false) {
		document.body.className = sessionStorage.getItem("theme");
		butttonIconTransition("themeToggleButtonIcon", themeIconText);
		particles.forEach((elem, i, arr) => {
			let colorSet =
				sessionStorage.getItem("theme") == "light" ? lightColors : darkColors;
			elem.style.background =
				colorSet[Math.floor(Math.random() * colorSet.length)];
		});
	}
}

window.addEventListener("DOMContentLoaded", initializeTheme);

//----------------------------------------------------------------------------------------------------------------------

function toggleOverflowMenu() {
	let overflowMenu = document.getElementById("overflowMenuId");
	let overlayThin = document.getElementById("overlayThin");
	let overflowMenuVisibility = window
		.getComputedStyle(overflowMenu)
		.getPropertyValue("visibility");
	if (overflowMenuVisibility == "hidden") {
		togglePlayState((forceState = "pause"));
		overlayThin.style.visibility = "visible";
		overlayThin.style.opacity = "1";
		overflowMenu.style.visibility = "visible";
		overflowMenu.style.opacity = "1";
		overflowMenu.style.transform = "translateX(0%)";
		overflowMenuVisibility = "visible";
		butttonIconTransition(
			(elementId = "overflowMenuToggleButtonText"),
			(iconText = "close"),
			(delay = 40)
		);
	} else {
		togglePlayState((forceState = "play"));
		overlayThin.style.visibility = "hidden";
		overlayThin.style.opacity = "0";
		overflowMenu.style.transform = "translateX(100%)";
		overflowMenu.style.opacity = "0.5";
		overflowMenu.style.visibility = "hidden";
		butttonIconTransition(
			(elementId = "overflowMenuToggleButtonText"),
			(iconText = "menu"),
			(delay = 40)
		);
		setTimeout(function hideMenu() {
			overflowMenuVisibility = "hidden";
		}, 250);
	}
}

//----------------------------------------------------------------------------------------------------------------------

var overflowMenuItemsVisible = [];
var navBarItemsVisible = [
	"navBarHomeButton",
	"navBarMoreButton",
	"navBarProjectButton",
	"navBarSourceButton",
];

function navBar2OverflowId(navBarId) {
	switch (navBarId) {
		case "navBarHomeButton":
			return "overflowMenuHomeButton";
		case "navBarMoreButton":
			return "overflowMenuMoreButton";
		case "navBarSourceButton":
			return "overflowMenuSourceButton";
		case "navBarProjectButton":
			return "overflowMenuProjectButton";
		default:
			return "undefined";
	}
}

function overflow2NavBarId(overflowId) {
	switch (overflowId) {
		case "overflowMenuHomeButton":
			return "navBarHomeButton";
		case "overflowMenuMoreButton":
			return "navBarMoreButton";
		case "overflowMenuSourceButton":
			return "navBarSourceButton";
		case "overflowMenuProjectButton":
			return "navBarProjectButton";
		default:
			return "undefined";
	}
}

// Currently displays overflow menu if innerWidth <= 1024px

function overflowHandler() {
	let remainingNavBarWidth =
		window.innerWidth - 255 - navBarItemsVisible.length * 185;
	// Initial log
	if ((sessionStorage.getItem("logData") == "true") == true) {
		console.log(
			" 'initial call'\nremainingNavBarWidth: " + remainingNavBarWidth
		);
	}
	// * Check if there's enough space for all navBarItems.
	// * Check if there's any items left to hide from the navBar.
	// * Displacing elements from navBar to overflowMenu.
	if (remainingNavBarWidth <= 30 && navBarItemsVisible.length > 0) {
		document.getElementById(navBarItemsVisible[0]).style.display = "none";
		document.getElementById(
			navBar2OverflowId(navBarItemsVisible[0])
		).style.display = "flex";
		overflowMenuItemsVisible.push(navBar2OverflowId(navBarItemsVisible[0]));
		navBarItemsVisible.splice(0, 1);
		remainingNavBarWidth =
			window.innerWidth - 255 - navBarItemsVisible.length * 185;
		// Log data
		if ((sessionStorage.getItem("logData") == "true") == true) {
			console.log("remainingNavBarWidth: " + remainingNavBarWidth);
			console.log("overflowMenuItemsVisible: " + overflowMenuItemsVisible);
			console.log("navBarItemsVisible: " + navBarItemsVisible);
		}
		// Display overflow toggle button if it's hidden and there's any
		// button in overflowMenuItemsVisible & vice versa.
		overflowMenuToggleButtonHandler();
		// To handle the case where multiple elements will have
		// to be hidden from navBar on page load.
		if (remainingNavBarWidth <= 30 && navBarItemsVisible.length > 0) {
			overflowHandler();
		}
	}
	// Displacing elements from overflowMenu to navBar &,
	// check if there's any items left to show in the navBar.
	else if (remainingNavBarWidth > 215 && overflowMenuItemsVisible.length > 0) {
		document.getElementById(
			overflowMenuItemsVisible[overflowMenuItemsVisible.length - 1]
		).style.display = "none";
		document.getElementById(
			overflow2NavBarId(
				overflowMenuItemsVisible[overflowMenuItemsVisible.length - 1]
			)
		).style.display = "flex";
		navBarItemsVisible.push(
			overflow2NavBarId(
				overflowMenuItemsVisible[overflowMenuItemsVisible.length - 1]
			)
		);
		overflowMenuItemsVisible.splice(overflowMenuItemsVisible.length - 1, 1);
		remainingNavBarWidth =
			window.innerWidth - 255 - navBarItemsVisible.length * 185;
		// Log data
		if ((sessionStorage.getItem("logData") == "true") == true) {
			console.log("remainingNavBarWidth: " + remainingNavBarWidth);
			console.log("overflowMenuItemsVisible: " + overflowMenuItemsVisible);
			console.log("navBarItemsVisible: " + navBarItemsVisible);
		}
		// Display overflow toggle button if it's hidden and there's any
		// button in overflowMenuItemsVisible & vice versa.
		overflowMenuToggleButtonHandler();
		// To handle the case where multiple elements will have
		// to be shown on navBar on window maximize.
		if (remainingNavBarWidth > 215 && overflowMenuItemsVisible.length > 0) {
			overflowHandler();
		}
	}
}

function overflowMenuToggleButtonHandler() {
	if (
		window
			.getComputedStyle(overflowMenuToggleButton)
			.getPropertyValue("display") === "none" &&
		overflowMenuItemsVisible.length > 0
	) {
		overflowMenuToggleButton.style.display = "flex";
	} else if (
		window
			.getComputedStyle(overflowMenuToggleButton)
			.getPropertyValue("display") == "flex" &&
		overflowMenuItemsVisible.length == 0
	) {
		overflowMenuToggleButton.style.display = "none";
	}
}

// window.DOMContentLoaded(overflowHandler());
overflowHandler(); // Using an eventListener causes a delay in the first call.
window.addEventListener("resize", overflowHandler);

//----------------------------------------------------------------------------------------------------------------------
// Bg particle fx

const lightColors = [
	"rgba(106, 178, 214, 0.902)",
	"rgba(224, 158, 140, 0.902)",
	"rgba(222, 141, 167, 0.814)",
	"rgba(154, 233, 203, 0.753)",
	"rgba(228, 224, 151, 0.902)",
];
const darkColors = [
	"rgb(7, 40, 74)",
	"rgb(81, 32, 40)",
	"rgb(69, 49, 26)",
	"rgb(39, 2, 66)",
	"rgb(15, 66, 44)",
];

const numParticles = 40; // Number of particles
const particles = []; // Array to store particles

// Creating & styling particles
function generateParticles() {
	let containerDiv = document.getElementById("particleContainer"); // Particles container
	let colorSet =
		sessionStorage.getItem("theme") == "light" ? lightColors : darkColors;
	for (let i = 0; i < numParticles; i++) {
		let particle = document.createElement("div");
		particle.classList.add("particle");
		particle.style.background =
			colorSet[Math.floor(Math.random() * colorSet.length)]; // Random color
		particle.style.left = `${Math.floor(Math.random() * 100)}vw`;
		particle.style.top = `${Math.floor(Math.random() * 100)}vh`;
		particle.style.width = `${Math.random()}em`;
		particle.style.height = particle.style.width;
		particle.style.transform = `scale(${Math.random()})`;
		particles.push(particle);
		containerDiv.appendChild(particle);
	}
}

window.addEventListener("DOMContentLoaded", generateParticles());

// Keyframes for the particle animation
const particleAnims = [];
particles.forEach((elem, i, arr) => {
	let to = {
		x: Math.random() * (i % 2 === 0 ? -16 : 16),
		y: Math.random() * 17,
	};
	let anim = elem.animate(
		[
			{ transform: "translate(0, 0)" }, // start position
			{ transform: `translate(${to.x}rem, ${to.y}rem)` }, // end position
		],
		{
			duration: (Math.random() + 1) * 3500, // random duration
			direction: "alternate-reverse",
			fill: "both",
			iterations: Infinity,
			easing: "ease-in-out",
		}
	);
	particleAnims.push(anim);
});

//----------------------------------------------------------------------------------------------------------------------
