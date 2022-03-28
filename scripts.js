var currentPopup
var overflow = document.getElementById('overflow')
var overlay = document.getElementById('overlay')
var divider = document.getElementById('divider')
var headAnimated = document.getElementById('headAnimated')
var resumeButton = document.getElementById('ResumeButton')
var pauseButton = document.getElementById('PauseButton')

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
    PauseAnimation()
}

function CloseModal() {
    overlay.style.visibility = 'hidden'
    overlay.style.opacity = '0'
    currentPopup.style.visibility = 'hidden'
    currentPopup.style.scale = '0.4'
    currentPopup.style.opacity = '0'
    currentPopup.style.top = '50%'
    document.body.style.overflow = 'auto'
    ResumeAnimation()
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
    PauseAnimation()
}

function CloseOverflow() {
    overflowLayer.style.visibility = 'hidden'
    overflowLayer.style.opacity = '0'
    overflow.style.visibility = 'hidden'
    overflow.style.scale = '0.4'
    overflow.style.opacity = '0'
    overflow.style.top = '10%'
    ResumeAnimation()
}
//----------------------------------------------------------------------------------------------------------------------

function PauseAnimation() {
    pauseButton.style.display = 'none'
    resumeButton.style.display = 'flex'
    document.body.style.animationPlayState = 'paused'
    divider.style.animationPlayState = 'paused'
    headAnimated.style.animationPlayState = 'paused'
}

// This functions results in an error when called in learn2code.html cuz missing elements, but it works(ik its not proper :P )
function ResumeAnimation() {
    resumeButton.style.display = 'none'
    pauseButton.style.display = 'flex'
    document.body.style.animationPlayState = 'running'
    divider.style.animationPlayState = 'running'
    headAnimated.style.animationPlayState = 'running'
}
//----------------------------------------------------------------------------------------------------------------------