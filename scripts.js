var currentPopup
var overlay = document.getElementById('overlay')
var topPercent

var divider = document.getElementById('divider')
var headingAnimated = document.getElementById('headAnimated')

var bgPlayState = "running"

var popupText = "lorem&nbspipsum"

//----------------------------------------------------------------------------------------------------------------------

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
    togglePlayState()
}

function closeModal() {
    overlay.style.visibility = 'hidden'
    overlay.style.opacity = '0'
    currentPopup.style.visibility = 'hidden'
    currentPopup.style.transform = 'scale(0.4)'
    currentPopup.style.opacity = '0'
    currentPopup.style.top = topPercent
    document.body.style.overflow = 'auto'
    togglePlayState()
}

//----------------------------------------------------------------------------------------------------------------------

function spawnAlert(text = popupText, timeout = 2000) {
    // For "text" use &nbsp instead of space to avoid line break.
    var popup = document.createElement('div');
    popup.innerHTML = text;
    popup.className = 'alert'
    document.body.appendChild(popup);
    setTimeout(function morph() { popup.style.opacity = '1' }, 0)
    setTimeout(function remove() { popup.style.opacity = '0' }, timeout - 300)
    setTimeout(function delDiv() { popup.remove() }, timeout)
}

//----------------------------------------------------------------------------------------------------------------------

function copyText(text = "undefined") {
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

function togglePlayState() {
    let playStateIcon = document.getElementById("playStateIcon")
    if (bgPlayState == "running") {
        bgPlayState = "paused"
        popupText = "Background&nbsppaused"
        document.body.style.animationPlayState = 'paused'
        try {
            divider.style.animationPlayState = 'paused'
            headingAnimated.style.animationPlayState = 'paused'
        } catch (error) {
            console.log('Missing elements referenced, error suppressed.')
        }
        playStateIcon.style.transform = 'scale(0.6)'
        playStateIcon.style.opacity = '0.7'
        setTimeout(function changeIcon() {
            playStateIcon.innerHTML = "play_arrow";
            playStateIcon.style.transform = 'rotate(180deg)';
        }, 150)
        setTimeout(function morphIcon() {
            playStateIcon.style.transform = 'scale(1)'
            playStateIcon.style.opacity = '1'
        }, 200)
    } else if (bgPlayState == "paused") {
        bgPlayState = "running"
        popupText = "Background&nbspresumed"
        document.body.style.animationPlayState = 'running'
        try {
            divider.style.animationPlayState = 'running'
            headingAnimated.style.animationPlayState = 'running'
        } catch (error) {
            console.log('Missing elements referenced, error suppressed.')
        }
        playStateIcon.style.transform = 'scale(0.6)'
        playStateIcon.style.opacity = '0.7'
        setTimeout(function changeIcon() {
            playStateIcon.innerHTML = "pause";
            playStateIcon.style.transform = 'rotate(180deg)'
        }, 150)
        setTimeout(function morphIcon() {
            playStateIcon.style.transform = 'scale(1)'
            playStateIcon.style.opacity = '1'
        }, 200)
    }
}

//----------------------------------------------------------------------------------------------------------------------