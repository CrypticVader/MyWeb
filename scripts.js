var logData = false

var divider = document.getElementById('divider')
var headingAnimated = document.getElementById('headAnimated')

//----------------------------------------------------------------------------------------------------------------------

var currentPopup
var overlay = document.getElementById('overlay')
var topPercent

function openModal(id, topHold = '70%') {
    topPercent = topHold
    currentPopup = document.getElementById(id)
    currentPopup.style.top = '20%'
    currentPopup.style.opacity = '1'
    currentPopup.style.transform = 'scale(1)'
    currentPopup.style.visibility = 'visible'
    overlay.style.visibility = 'visible'
    overlay.style.opacity = '1'
    document.body.style.overflow = 'hidden'
    togglePlayState('pause')
}

function closeModal() {
    overlay.style.visibility = 'hidden'
    overlay.style.opacity = '0'
    currentPopup.style.visibility = 'hidden'
    currentPopup.style.transform = 'scale(0.4)'
    currentPopup.style.opacity = '0'
    currentPopup.style.top = topPercent
    document.body.style.overflow = 'auto'
    togglePlayState('play')
}

//----------------------------------------------------------------------------------------------------------------------

var popupText = 'lorem&nbspipsum'

function spawnAlert(text = popupText, timeout = 1900) {
    // For 'text' use &nbsp instead of space to avoid line break.
    var popup = document.createElement('div');
    popup.innerHTML = text;
    let margin = text.length * 5.4
    popup.className = 'alert'
    popup.style.marginLeft = -margin + 'px'
    document.body.appendChild(popup);
    setTimeout(function morph() {
        popup.style.transform = 'scale(1) translate3d(0%, -100%, 0)';
        popup.style.opacity = '1'
    }, 100)
    setTimeout(function remove() {
        popup.style.transform = 'scale(0) translate3d(0%, -100%, 0)';
        popup.style.opacity = '0'
    }, timeout)
    setTimeout(function delDiv() { popup.remove() }, timeout + 300)
}

//----------------------------------------------------------------------------------------------------------------------

function copyText(text = 'undefined') {
    navigator.clipboard.writeText(text);
    // Below code is for the icon morph effect
    let copyIcon = document.getElementById('copyId')
    copyIcon.style.transform = 'scale(0.5)'
    copyIcon.style.opacity = '0.2'
    setTimeout(function back2one() {
        copyIcon.style.transform = 'scale(1)';
        copyIcon.style.opacity = '1'
        copyIcon.innerHTML = 'done'
    }, 300)
    setTimeout(function fade() { copyIcon.style.opacity = '0.2' }, 1500)
    setTimeout(function back2copy() {
        copyIcon.innerHTML = 'copy'
        copyIcon.style.opacity = '1'
    }, 1800)
}

//----------------------------------------------------------------------------------------------------------------------

var bgPlayState = 'running'
var playStateIconText
var skipOverride = false
var playStateIcon = document.getElementById('playStateIcon')

function togglePlayState(forceState = 'toggle') {
    let playStateIcon = document.getElementById('playStateIcon')
        // Decide what to do based on the current state & forceState
    if (forceState == 'toggle') {
        if (bgPlayState == 'running') {
            bgPlayState = 'paused'
            popupText = 'Background&nbsppaused'
            playStateIconText = 'play_arrow'
        } else {
            bgPlayState = 'running'
            popupText = 'Background&nbsprunning'
            playStateIconText = 'pause'
        }
        skipOverride = false
    } else if (forceState == 'play') {
        skipOverride = (bgPlayState == 'running') ? true : false
        bgPlayState = 'running'
        popupText = 'Background&nbsprunning'
        playStateIconText = 'pause'
    } else if (forceState == 'pause') {
        skipOverride = (bgPlayState == 'paused') ? true : false
        bgPlayState = 'paused'
        popupText = 'Background&nbsppaused'
        playStateIconText = 'play_arrow'
    }
    // Error handling
    else {
        console.log("Invalid forceState argument.\n Available options: 'toggle', 'pause', 'play'")
    }
    // Log the current state
    if (logData) {
        console.log('bgPlayState: ' + bgPlayState)
        console.log('popupText: ' + popupText)
        console.log('playStateIconText: ' + playStateIconText)
        console.log('skipOverride: ' + skipOverride)
        console.log('\n')
    }
    if (skipOverride == false) {
        // Change play state
        document.body.style.animationPlayState = bgPlayState
        try {
            divider.style.animationPlayState = bgPlayState
            headingAnimated.style.animationPlayState = bgPlayState
        } catch (error) {
            console.log('Missing elements referenced, error suppressed.')
        }
        // Icon change & effect
        butttonIconTransition('playStateIcon', playStateIconText, delay = 50)
    }
}

//----------------------------------------------------------------------------------------------------------------------

var overflowMenu = document.getElementById('wipOverflowMenu');
// var overflowMenuItems = document.getElementsByClassName('overflowMenuButton')
var navBarItems = ['navBarSourceButton', 'navBarHomeButton', 'navBarMoreButton']

function overflowMenuHandler() {
    var windowWidth = window.innerWidth
    if (windowWidth < 600) {
        overflowMenu.style.display = 'block'
        for (let i = 0; i < navBarItems.length; i++) {
            try {
                document.getElementById(navBarItems[i]).style.display = 'none';
            } catch (error) {}
        }
    } else {
        overflowMenu.style.display = 'none'
        for (let i = 0; i < navBarItems.length; i++) {
            try {
                document.getElementById(navBarItems[i]).style.display = 'flex';
            } catch (error) {}
        }
    }
}

var overflowMenuVisibility = 'hidden'
var overflowMenuToggleButtonIcon = document.getElementById('overflowMenuToggleButtonText')

function toggleOverflowMenu() {
    if (overflowMenuVisibility == 'hidden') {
        overflowMenu.style.visibility = 'visible'
        overflowMenu.style.transform = 'translateX(0%)'
        overflowMenuVisibility = 'visible'
        butttonIconTransition(elementId = 'overflowMenuToggleButtonText', iconText = 'close', delay = 40)
    } else {
        overflowMenu.style.transform = 'translateX(100%)'
        overflowMenu.style.visibility = 'hidden'
        butttonIconTransition(elementId = 'overflowMenuToggleButtonText', iconText = 'menu', delay = 40)
        setTimeout(function hideMenu() { overflowMenuVisibility = 'hidden' }, 250)
    }
}

document.addEventListener("DOMContentLoaded", overflowMenuHandler)
window.addEventListener('resize', overflowMenuHandler)

//----------------------------------------------------------------------------------------------------------------------

function butttonIconTransition(elementId, iconText, delay = 50) {
    let element = document.getElementById(elementId)
    element.style.transform = 'scale(0.6)'
    element.style.opacity = '0.7'
    setTimeout(function changeIcon() {
        element.innerHTML = iconText;
        element.style.transform = 'rotate(-180deg)'
    }, 100)
    setTimeout(function morphIcon() {
        element.style.transform = 'rotate(-180deg)'
        element.style.transform = 'scale(1)'
        element.style.opacity = '1'
    }, 100 + delay)
}

//----------------------------------------------------------------------------------------------------------------------