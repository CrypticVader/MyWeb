var currentPopup
var overflow = document.getElementById('overflow')
var overlay = document.getElementById('overlay')
var divider = document.getElementById('divider')
var headingAnimated = document.getElementById('headAnimated')
var popupAlert = document.getElementById("PopupAlert")
var bgPlayState = "running"
var popupText = "lorem ipsum"

//----------------------------------------------------------------------------------------------------------------------

function OpenModal(id) {
    currentPopup = document.getElementById(id)
    currentPopup.style.top = '20%'
    currentPopup.style.visibility = 'visible'
    currentPopup.style.scale = '1'
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
    currentPopup.style.scale = '0.4'
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
    overflow.style.scale = '1'
    overflow.style.opacity = '1'
    overflowLayer.style.visibility = 'visible'
    overflowLayer.style.opacity = '1'
    togglePlayState()
}

function CloseOverflow() {
    overflowLayer.style.visibility = 'hidden'
    overflowLayer.style.opacity = '0'
    overflow.style.visibility = 'hidden'
    overflow.style.scale = '0.4'
    overflow.style.opacity = '0'
    overflow.style.top = '10%'
    togglePlayState()
}

//----------------------------------------------------------------------------------------------------------------------

function PopupAlert(text) {
    if (text == undefined) {
        text = popupText
    }
    popupAlert.style.visibility = 'visible'
    popupAlert.style.scale = '1';
    popupAlert.style.opacity = '1';
    document.getElementById("AlertText").innerHTML = text;
    setTimeout(function HideAlert() {
        popupAlert.style.scale = '0.6';
        popupAlert.style.opacity = '0';
        popupAlert.style.visibility = 'hidden';
    }, 1500)
}
//----------------------------------------------------------------------------------------------------------------------

function copyText(text) {
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
    setTimeout(function fade() { copyIcon.style.opacity = '0.2' }, 1700)
    setTimeout(function back2copy() {
        copyIcon.innerHTML = 'copy'
        copyIcon.style.opacity = '1'
    }, 2001)
}

//----------------------------------------------------------------------------------------------------------------------

function togglePlayState() {
    let playStateIcon = document.getElementById("PlayStateIcon")
    if (bgPlayState == "running") {
        bgPlayState = "paused"
        popupText = "Background paused"
        playStateIcon.innerHTML = "play_arrow"
        document.body.style.animationPlayState = 'paused'
        try {
            divider.style.animationPlayState = 'paused'
            headingAnimated.style.animationPlayState = 'paused'
        } catch (error) {
            console.log('Missing elements referenced, error suppressed.')
        }
    } else if (bgPlayState == "paused") {
        bgPlayState = "running"
        popupText = "Background resumed"
        playStateIcon.innerHTML = "pause"
        document.body.style.animationPlayState = 'running'
        try {
            divider.style.animationPlayState = 'running'
            headingAnimated.style.animationPlayState = 'running'
        } catch (error) {
            console.log('Missing elements referenced, error suppressed.')
        }
    }
}
//----------------------------------------------------------------------------------------------------------------------