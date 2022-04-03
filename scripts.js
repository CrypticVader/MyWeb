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
// Deprecated function for handling overFlow menu

var overflowMenu = document.getElementById("OverflowMenu");
// var overflowMenuItems = document.getElementsByClassName('overflowMenuButton')
var navBarItems = [
	"navBarHomeButton",
	"navBarMoreButton",
	"navBarSourceButton",
	"navBarProjectButton",
];

function overflowMenuHandler() {
	var windowWidth = window.innerWidth;
	if (windowWidth < 730) {
		overflowMenu.style.display = "block";
		for (let i = 0; i < navBarItems.length; i++) {
			try {
				document.getElementById(navBarItems[i]).style.display = "none";
			} catch (error) {}
		}
	} else {
		overflowMenu.style.display = "none";
		for (let i = 0; i < navBarItems.length; i++) {
			try {
				document.getElementById(navBarItems[i]).style.display = "flex";
			} catch (error) {}
		}
	}
}

//document.addEventListener("DOMContentLoaded", overflowMenuHandler);
//window.addEventListener("resize", overflowMenuHandler);

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
// WiP function to dynamically handle the overflow menu

//var overflowMenuItemsAll = document.getElementsByClassName("overflowMenuButton");

var overflowMenu = document.getElementById("OverflowMenu");

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

var remainingNavBarWidth = window.innerWidth - navBarItemsAll.length * 185;

function dynamicOverflowHandler() {
	// Check if there's enough space for all navBarItems
	if (remainingNavBarWidth <= 0) {
		// Check if there's any items left to hide from the navBar
		if (navBarItemsVisible.length > 0) {
			for (var i = 0; i < navBarItemsVisible.length; i++) {
				document.getElementById(navBarItemsVisible[i]).style.display = "none";
				remainingNavBarWidth += 185;
				console.log("remainingNavBarWidth: " + remainingNavBarWidth);
				document.getElementById(
					navBar2OverflowId(navBarItemsVisible[i])
				).style.display = "flex";
				overflowMenuItemsVisible.push(navBar2OverflowId(navBarItemsVisible[i]));
				navBarItemsVisible.splice(i, 1);
				console.log("overflowMenuItemsVisible: " + overflowMenuItemsVisible);
				console.log("navBarItemsVisible: " + navBarItemsVisible);
				if (remainingNavBarWidth > 185) {
				}
			}
		}
	}
}

function moveFromOver2Nav() {
	console.log("moveFromOver2Nav");
}

document.addEventListener("DOMContentLoaded", dynamicOverflowHandler);
window.addEventListener("resize", dynamicOverflowHandler);
//----------------------------------------------------------------------------------------------------------------------
