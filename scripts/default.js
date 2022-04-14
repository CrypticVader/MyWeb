sessionStorage.setItem("logData", "false");

function logData(log = "false") {
	sessionStorage.setItem("logData", log);
}

//----------------------------------------------------------------------------------------------------------------------

var currentPopup;

function openModal(id) {
	let overlay = document.getElementById("overlay");
	currentPopup = document.getElementById(id);
	currentPopup.style.top = "20%";
	currentPopup.style.opacity = "1";
	currentPopup.style.transform = "scale(1)";
	currentPopup.style.visibility = "visible";
	overlay.style.visibility = "visible";
	overlay.style.opacity = "1";
	document.body.style.overflow = "hidden";
	togglePlayState("pause");
}

function closeModal() {
	let overlay = document.getElementById("overlay");
	overlay.style.visibility = "hidden";
	overlay.style.opacity = "0";
	currentPopup.style.visibility = "hidden";
	currentPopup.style.transform = "scale(0.4)";
	currentPopup.style.opacity = "0";
	currentPopup.style.top = "70%";
	document.body.style.overflow = "auto";
	togglePlayState("play");
}

//----------------------------------------------------------------------------------------------------------------------

function butttonIconTransition(elementId, iconText, delay = 50) {
	let element = document.getElementById(elementId);
	element.style.transform = "scale(0.4)";
	element.style.opacity = "0.5";
	setTimeout(function changeIcon() {
		element.innerHTML = iconText;
		element.style.transform = "rotate(-180deg)";
	}, 100);
	setTimeout(function morphIcon() {
		element.style.transform = "rotate(-180deg)";
		element.style.transform = "scale(1)";
		element.style.opacity = "1";
	}, 100 + delay);
}

//----------------------------------------------------------------------------------------------------------------------

var popupText = "lorem&nbspipsum";

function spawnAlert(text = popupText, timeout = 1900) {
	// For 'text' use &nbsp instead of space to avoid line break.
	let popup = document.createElement("div");
	popup.innerHTML = text;
	let margin = text.length * 5.4;
	popup.className = "alert";
	popup.style.marginLeft = -margin + "px";
	document.body.appendChild(popup);
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

var bgPlayState = "running";
function togglePlayState(forceState = "toggle") {
	// Decide what to do based on the current state & forceState
	let skipOverride;
	let playStateIconText;
	if (forceState == "toggle") {
		if (bgPlayState == "running") {
			bgPlayState = "paused";
			bgParticleMotion = "pause";
			popupText = "Background&nbsppaused";
			playStateIconText = "play_arrow";
		} else {
			bgPlayState = "running";
			bgParticleMotion = "run";
			popupText = "Background&nbsprunning";
			playStateIconText = "pause";
		}
		skipOverride = false;
	} else if (forceState == "play") {
		skipOverride = bgPlayState == "running" ? true : false;
		bgPlayState = "running";
		bgParticleMotion = "run";
		popupText = "Background&nbsprunning";
		playStateIconText = "pause";
	} else if (forceState == "pause") {
		skipOverride = bgPlayState == "paused" ? true : false;
		bgPlayState = "paused";
		bgParticleMotion = "pause";
		popupText = "Background&nbsppaused";
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
			elem.style.opacity = bgPlayState == "running" ? "0.4" : "0.2";
		});
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
	let popupText;
	let themeIconText;
	if (forceTheme == "toggle") {
		if (sessionStorage.getItem("theme") == "light") {
			sessionStorage.setItem("theme", "dark");
			popupText = "Dark&nbsptheme&nbspselected";
			themeIconText = "light_mode";
		} else if (sessionStorage.getItem("theme") == "dark") {
			sessionStorage.setItem("theme", "light");
			popupText = "Light&nbsptheme";
			themeIconText = "dark_mode";
		}
		skipOverride = false;
	} else if (forceTheme == "dark") {
		skipOverride = sessionStorage.getItem("theme") == "dark" ? true : false;
		sessionStorage.setItem("theme", "dark");
		popupText = "Dark&nbsptheme";
		themeIconText = "light_mode";
	} else if (forceTheme == "light") {
		skipOverride = sessionStorage.getItem("theme") == "light" ? true : false;
		sessionStorage.setItem("theme", "light");
		popupText = "Light&nbsptheme&nbspselected";
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
		console.log(`popupText: ${popupText}`);
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

var overflowMenuVisibility = "hidden";

function toggleOverflowMenu() {
	let overflowMenu = document.getElementById("overflowMenuId");
	let overlayThin = document.getElementById("overlayThin");
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

overflowHandler(); // Using an eventListener causes a delay in the first call.
window.addEventListener("resize", overflowHandler);

//----------------------------------------------------------------------------------------------------------------------
// Bg particle fx

const lightColors = [
	"rgba(96, 174, 213, 0.902)",
	"rgba(199, 124, 103, 0.902)",
	"rgba(228, 138, 167, 0.814)",
	"rgba(143, 231, 197, 0.753)",
	"rgba(247, 242, 152, 0.902)",
];
const darkColors = [
	"rgba(16, 77, 134, 0.659)",
	"rgba(16, 77, 134, 0.659)",
	"rgba(124, 28, 65, 0.733)",
	"rgba(160, 110, 118, 0.698)",
	"rgba(134, 94, 70, 0.698)",
	"rgba(67, 4, 112, 0.588)",
	"rgba(168, 0, 65, 0.671)",
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
