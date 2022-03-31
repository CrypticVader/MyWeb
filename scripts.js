var currentPopup
var overflow = document.getElementById('overflow')
var overlay = document.getElementById('overlay')
var divider = document.getElementById('divider')
var headingAnimated = document.getElementById('headAnimated')
var bgPlayState = "running"
var popupText = "lorem&nbspipsum"

//----------------------------------------------------------------------------------------------------------------------

function OpenModal(id) {
    currentPopup = document.getElementById(id)
    currentPopup.style.top = '20%'
    currentPopup.style.visibility = 'visible'
    currentPopup.style.transform = 'scale(1)'
    currentPopup.style.opacity = '1'
    overlay.style.visibility = 'visible'
    overlay.style.opacity = '1'
    document.body.style.overflow = 'hidden'
    togglePlayState()
}

function CloseModal() {
    overlay.style.visibility = 'hidden'
    overlay.style.opacity = '0'
    currentPopup.style.visibility = 'hidden'
    currentPopup.style.transform = 'scale(0.4)'
    currentPopup.style.opacity = '0'
    currentPopup.style.top = '50%'
    document.body.style.overflow = 'auto'
    togglePlayState()
}

//----------------------------------------------------------------------------------------------------------------------

function OpenOverflow(id) {
    overflow = document.getElementById(id)
    overflow.style.top = '15%'
    overflow.style.visibility = 'visible'
    overflow.style.transform = 'scale(1)'
    overflow.style.opacity = '1'
    overflowLayer.style.visibility = 'visible'
    overflowLayer.style.opacity = '1'
    togglePlayState()
}

function CloseOverflow() {
    overflowLayer.style.visibility = 'hidden'
    overflowLayer.style.opacity = '0'
    overflow.style.visibility = 'hidden'
    overflow.style.transform = 'scale(0.4)'
    overflow.style.opacity = '0'
    overflow.style.top = '10%'
    togglePlayState()
}

//----------------------------------------------------------------------------------------------------------------------

function spawnAlert(text = popupText, timeout = 1200) {
    // For "text" use &nbsp instead of space to avoid line break.
    var popup = document.createElement('div');
    popup.innerHTML = text;
    popup.className = 'alert'
    document.body.appendChild(popup);
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
    }, 1801)
}

//----------------------------------------------------------------------------------------------------------------------

function togglePlayState() {
    let playStateIcon = document.getElementById("PlayStateIcon")
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
        playStateIcon.style.transform = 'scale(0.65)'
        playStateIcon.style.opacity = '0.2'
        setTimeout(function changeIcon() { playStateIcon.innerHTML = "play_arrow" }, 150)
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
        playStateIcon.style.transform = 'scale(0.65)'
        playStateIcon.style.opacity = '0.2'
        setTimeout(function changeIcon() { playStateIcon.innerHTML = "pause" }, 150)
        setTimeout(function morphIcon() {
            playStateIcon.style.transform = 'scale(1)'
            playStateIcon.style.opacity = '1'
        }, 200)
    }
}

//----------------------------------------------------------------------------------------------------------------------