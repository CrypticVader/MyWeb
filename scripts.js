var overlay = document.getElementById('overlay')
var currentPopup

//----------------------------------------------------------------------------------------------------------------------

function CloseModal() {
    overlay.style.visibility = 'hidden'
    currentPopup.style.visibility = 'hidden'
    overlay.style.opacity = '0'
    currentPopup.style.scale = '0.5'
    currentPopup.style.opacity = '0'
    currentPopup.style.top = '50%'
    document.body.style.animationPlayState = 'running'
}
//----------------------------------------------------------------------------------------------------------------------

function OpenMsftModal() {
    currentPopup = document.getElementById('MsftPopup')
    currentPopup.style.top = '20%'
    overlay.style.visibility = 'visible'
    currentPopup.style.visibility = 'visible'
    overlay.style.opacity = '1'
    currentPopup.style.scale = '1'
    currentPopup.style.opacity = '1'
    document.body.style.animationPlayState = 'paused'
}
//----------------------------------------------------------------------------------------------------------------------

function OpenFreeCCModal() {
    currentPopup = document.getElementById('FreeCCPopup')
    currentPopup.style.top = '20%'
    overlay.style.visibility = 'visible'
    currentPopup.style.visibility = 'visible'
    overlay.style.opacity = '1'
    currentPopup.style.scale = '1'
    currentPopup.style.opacity = '1'
    document.body.style.animationPlayState = 'paused'
}
//----------------------------------------------------------------------------------------------------------------------

function OpenCodCadModal() {
    currentPopup = document.getElementById('CodCadPopup')
    currentPopup.style.top = '20%'
    overlay.style.visibility = 'visible'
    currentPopup.style.visibility = 'visible'
    overlay.style.opacity = '1'
    currentPopup.style.scale = '1'
    currentPopup.style.opacity = '1'
    document.body.style.animationPlayState = 'paused'
}
//----------------------------------------------------------------------------------------------------------------------

function OpenW3SModal() {
    currentPopup = document.getElementById('W3SPopup')
    currentPopup.style.top = '20%'
    overlay.style.visibility = 'visible'
    currentPopup.style.visibility = 'visible'
    overlay.style.opacity = '1'
    currentPopup.style.scale = '1'
    currentPopup.style.opacity = '1'
    document.body.style.animationPlayState = 'paused'
}
//----------------------------------------------------------------------------------------------------------------------

function OpenGitLearnModal() {
    currentPopup = document.getElementById('GitLearnPopup')
    currentPopup.style.top = '20%'
    overlay.style.visibility = 'visible'
    currentPopup.style.visibility = 'visible'
    overlay.style.opacity = '1'
    currentPopup.style.scale = '1'
    currentPopup.style.opacity = '1'
    document.body.style.animationPlayState = 'paused'
}
//----------------------------------------------------------------------------------------------------------------------