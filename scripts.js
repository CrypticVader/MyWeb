var overlay = document.getElementById('overlay')
var popup

//----------------------------------------------------------------------------------------------------------------------

function CloseModal() {
    overlay.style.visibility = 'hidden'
    popup.style.visibility = 'hidden'
    overlay.style.opacity = '0'
    popup.style.scale = '0.5'
    popup.style.opacity = '0'
    document.body.style.animationPlayState = 'running'
}
//----------------------------------------------------------------------------------------------------------------------

function OpenMsftModal() {
    popup = document.getElementById('MsftPopup')
    overlay.style.visibility = 'visible'
    popup.style.visibility = 'visible'
    overlay.style.opacity = '1'
    popup.style.scale = '1'
    popup.style.opacity = '1'
    document.body.style.animationPlayState = 'paused'
}
//----------------------------------------------------------------------------------------------------------------------

function OpenFreeCCModal() {
    popup = document.getElementById('FreeCCPopup')
    overlay.style.visibility = 'visible'
    popup.style.visibility = 'visible'
    overlay.style.opacity = '1'
    popup.style.scale = '1'
    popup.style.opacity = '1'
    document.body.style.animationPlayState = 'paused'
}
//----------------------------------------------------------------------------------------------------------------------

function OpenCodCadModal() {
    popup = document.getElementById('CodCadPopup')
    overlay.style.visibility = 'visible'
    popup.style.visibility = 'visible'
    overlay.style.opacity = '1'
    popup.style.scale = '1'
    popup.style.opacity = '1'
    document.body.style.animationPlayState = 'paused'
}
//----------------------------------------------------------------------------------------------------------------------

function OpenW3SModal() {
    popup = document.getElementById('W3SPopup')
    overlay.style.visibility = 'visible'
    popup.style.visibility = 'visible'
    overlay.style.opacity = '1'
    popup.style.scale = '1'
    popup.style.opacity = '1'
    document.body.style.animationPlayState = 'paused'
}
//----------------------------------------------------------------------------------------------------------------------

function OpenGitLearnModal() {
    popup = document.getElementById('GitLearnPopup')
    overlay.style.visibility = 'visible'
    popup.style.visibility = 'visible'
    overlay.style.opacity = '1'
    popup.style.scale = '1'
    popup.style.opacity = '1'
    document.body.style.animationPlayState = 'paused'
}
//----------------------------------------------------------------------------------------------------------------------