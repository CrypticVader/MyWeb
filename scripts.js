var logData = false;

var divider = document.getElementById("divider");
var headingAnimated = document.getElementById("headAnimated");

//----------------------------------------------------------------------------------------------------------------------

var currentPopup;
var overlay = document.getElementById("overlay");
var topPercent;

function openModal(id, topHold = "70%") {
	topPercent = topHold;
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
	overlay.style.visibility = "hidden";
	overlay.style.opacity = "0";
	currentPopup.style.visibility = "hidden";
	currentPopup.style.transform = "scale(0.4)";
	currentPopup.style.opacity = "0";
	currentPopup.style.top = topPercent;
	document.body.style.overflow = "auto";
	togglePlayState("play");
}

//----------------------------------------------------------------------------------------------------------------------

function butttonIconTransition(elementId, iconText, delay = 50) {
	let element = document.getElementById(elementId);
	element.style.transform = "scale(0.6)";
	element.style.opacity = "0.7";
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
	var popup = document.createElement("div");
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
var playStateIconText;
var skipOverride = false;
var playStateIcon = document.getElementById("playStateIcon");

function togglePlayState(forceState = "toggle") {
	let playStateIcon = document.getElementById("playStateIcon");
	// Decide what to do based on the current state & forceState
	if (forceState == "toggle") {
		if (bgPlayState == "running") {
			bgPlayState = "paused";
			popupText = "Background&nbsppaused";
			playStateIconText = "play_arrow";
		} else {
			bgPlayState = "running";
			popupText = "Background&nbsprunning";
			playStateIconText = "pause";
		}
		skipOverride = false;
	} else if (forceState == "play") {
		skipOverride = bgPlayState == "running" ? true : false;
		bgPlayState = "running";
		popupText = "Background&nbsprunning";
		playStateIconText = "pause";
	} else if (forceState == "pause") {
		skipOverride = bgPlayState == "paused" ? true : false;
		bgPlayState = "paused";
		popupText = "Background&nbsppaused";
		playStateIconText = "play_arrow";
	}
	// Error handling
	else {
		console.log(
			"Invalid forceState argument.\n Available options: 'toggle', 'pause', 'play'"
		);
	}
	// Log the current state
	if (logData) {
		console.log("bgPlayState: " + bgPlayState);
		console.log("popupText: " + popupText);
		console.log("playStateIconText: " + playStateIconText);
		console.log("skipOverride: " + skipOverride);
		console.log("\n");
	}
	if (skipOverride == false) {
		// Change play state
		document.body.style.animationPlayState = bgPlayState;
		try {
			divider.style.animationPlayState = bgPlayState;
			headingAnimated.style.animationPlayState = bgPlayState;
		} catch (error) {
			console.log("Missing elements referenced, error suppressed.");
		}
		// Icon change & effect
		butttonIconTransition("playStateIcon", playStateIconText, (delay = 50));
	}
}

//----------------------------------------------------------------------------------------------------------------------

// Code for adding overflow and navBar to all pages

navBarTemplate = `<img src="/assets/vader-grey.png" height="40px" width="40px" alt="logo"/>
<span style="font-size: 25px; vertical-align: 10px; padding-left: 10px">
Hello
</span>

<button
id="overflowMenuToggleButton"
style="float: right; padding: 8px"
onclick="toggleOverflowMenu()"
>
<span
	style="transition: 0.2s; margin-top: 0em"
	id="overflowMenuToggleButtonText"
	class="material-icons-round md-24"
>
	menu
</span>
</button>

<a
id="navBarHomeButton"
class="link-button"
style="float: right; padding: 8px; margin-right: 7px"
href="/"
>
<span class="material-icons-round md-24" style="padding-right: 0.2em">
	home
</span>
Home
</a>

<a
id="navBarMoreButton"
class="link-button"
style="float: right; padding: 8px; margin-right: 7px"
href="/pages/learn2code.html"
>
<span
	class="material-icons-round md-24"
	style="margin-top: 0em; padding-right: 0.4em"
>
	dashboard
</span>
See More
</a>

<a
id="navBarProjectButton"
class="link-button disabled"
style="float: right; padding: 8px; margin-right: 7px"
href="https://github.com/CrypticVader/MyWeb"
>
<span
	class="material-icons-round md-24"
	style="margin-top: 0em; padding-right: 0.4em"
>
	build
</span>
My projects
</a>

<a
id="navBarSourceButton"
class="link-button"
style="float: right; padding: 8px; margin-right: 7px"
href="https://github.com/CrypticVader/MyWeb"
target="_blank"
rel="noopener noreferrer"
>
<span
	class="material-icons-round md-24"
	style="margin-top: 0em; padding-right: 0.4em"
>
	source
</span>
View Source
</a>

<button
id="playStateButton"
style="
	transition: 0.2s;
	float: right;
	vertical-align: middle;
	padding: 8px;
	margin-right: 7px;
"
onclick="togglePlayState(); spawnAlert();"
>
<span
	id="playStateIcon"
	style="transition: 0.2s"
	class="material-icons-round md-24"
>
	pause
</span>
</button>`;

overflowMenutemplate = `<a id="overflowMenuHomeButton" class="overflowMenuButton" href="/">
<span
	class="material-icons-round md-18"
	style="transform: scale(1.1); font-size: 20px; padding-right: 0.4em"
>
	home
</span>
Home
</a>

<a
id="overflowMenuMoreButton"
class="overflowMenuButton"
href="/pages/learn2code.html"
>
<span
	class="material-icons-round md-18"
	style="transform: scale(1.1); font-size: 20px; padding-right: 0.4em"
>
	dashboard
</span>
See More
</a>

<a
id="overflowMenuSourceButton"
class="overflowMenuButton"
href="https://github.com/CrypticVader/MyWeb"
target="_blank"
rel="noopener noreferrer"
>
<span
	class="material-icons-round md-18"
	style="transform: scale(1.1); font-size: 20px; padding-right: 0.4em"
>
	source
</span>
View source
</a>

<a
id="overflowMenuProjectButton"
class="overflowMenuButton disabled"
href="/pages/projects"
>
<span
	class="material-icons-round md-18"
	style="transform: scale(1.1); font-size: 20px; padding-right: 0.4em"
>
	build
</span>
My projects
</a>`;

document.getElementById("overflowMenuId").innerHTML = overflowMenutemplate;
document.getElementById("navBar").innerHTML = navBarTemplate;

//----------------------------------------------------------------------------------------------------------------------

var overflowMenuVisibility = "hidden";
var overflowMenuToggleButtonIcon = document.getElementById(
	"overflowMenuToggleButtonText"
);
var overlayThin = document.getElementById("overlayThin");

function toggleOverflowMenu() {
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

var overflowMenu = document.getElementById("overflowMenuId");

var overflowMenuItemsVisible = [];

const navBarItemsAll = [
	"navBarHomeButton",
	"navBarMoreButton",
	"navBarSourceButton",
	"navBarProjectButton",
];

var navBarItemsVisible = [
	"navBarHomeButton",
	"navBarMoreButton",
	"navBarSourceButton",
	"navBarProjectButton",
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

// Currently display overflow if innerWidth <= 970px
var remainingNavBarWidth =
	window.innerWidth - 200 - navBarItemsAll.length * 185;

function overflowHandler() {
	remainingNavBarWidth =
		window.innerWidth - 200 - navBarItemsVisible.length * 185;
	// Initial log
	if (logData == true) {
		console.log(
			" 'initial call'\nremainingNavBarWidth: " + remainingNavBarWidth
		);
	}
	// * Check if there's enough space for all navBarItems.
	// * Check if there's any items left to hide from the navBar
	// * Displacing elements from navBar to overflowMenu.
	if (remainingNavBarWidth <= 30 && navBarItemsVisible.length > 0) {
		document.getElementById(navBarItemsVisible[0]).style.display = "none";
		document.getElementById(
			navBar2OverflowId(navBarItemsVisible[0])
		).style.display = "flex";
		overflowMenuItemsVisible.push(navBar2OverflowId(navBarItemsVisible[0]));
		navBarItemsVisible.splice(0, 1);
		remainingNavBarWidth =
			window.innerWidth - 200 - navBarItemsVisible.length * 185;
		// Log data
		if (logData == true) {
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
			window.innerWidth - 200 - navBarItemsVisible.length * 185;
		// Log data
		if (logData == true) {
			console.log("remainingNavBarWidth: " + remainingNavBarWidth);
			console.log("overflowMenuItemsVisible: " + overflowMenuItemsVisible);
			console.log("navBarItemsVisible: " + navBarItemsVisible);
		}
		// Display overflow toggle button if it's hidden and there's any
		// button in overflowMenuItemsVisible & vice versa.
		overflowMenuToggleButtonHandler();
	}
}

function overflowMenuToggleButtonHandler() {
	if (
		window
			.getComputedStyle(overflowMenuToggleButton)
			.getPropertyValue("display") == "none" &&
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

overflowHandler();
window.addEventListener("resize", overflowHandler);
//----------------------------------------------------------------------------------------------------------------------
