var overlay = document.getElementById('overlay')
var currentPopup

//----------------------------------------------------------------------------------------------------------------------

function CloseModal() {
    overlay.style.visibility = 'hidden'
    overlay.style.opacity = '0'
    currentPopup.style.visibility = 'hidden'
    currentPopup.style.scale = '0.4'
    currentPopup.style.opacity = '0'
    currentPopup.style.top = '50%'
    document.body.style.animationPlayState = 'running'
    document.body.style.overflow = 'auto'
}

//----------------------------------------------------------------------------------------------------------------------

function OpenModal(id) {
    currentPopup = document.getElementById(id)
    currentPopup.style.top = '20%'
    currentPopup.style.visibility = 'visible'
    currentPopup.style.scale = '1'
    currentPopup.style.opacity = '1'
    overlay.style.visibility = 'visible'
    overlay.style.opacity = '1'
    document.body.style.animationPlayState = 'paused'
    document.body.style.overflow = 'hidden'
}

//----------------------------------------------------------------------------------------------------------------------