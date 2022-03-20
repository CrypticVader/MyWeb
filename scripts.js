let overlay = document.getElementById('overlay')

//----------------------------------------------------------------------------------------------------------------------

function OpenMsftModal() {
    let element = document.getElementById('MsftPopup')
    overlay.style.display = 'block'
    element.style.display = 'block'
    document.body.style.animationPlayState = 'paused'
}

function CloseMsftModal() {
    let element = document.getElementById('MsftPopup')
    overlay.style.display = 'none'
    element.style.display = 'none'
    document.body.style.animationPlayState = 'running'
}
//----------------------------------------------------------------------------------------------------------------------

function OpenFreeCcModal() {
    let element = document.getElementById('FreeCcPopup')
    element.style.display = 'block'
    overlay.style.display = 'block'
    document.body.style.animationPlayState = 'paused'

}

function CloseFreeCcModal() {
    let element = document.getElementById('FreeCcPopup')
    element.style.display = 'none'
    overlay.style.display = 'none'
    document.body.style.animationPlayState = 'running'
}
//----------------------------------------------------------------------------------------------------------------------

function OpenCodCadModal() {
    let element = document.getElementById('CodCadPopup')
    element.style.display = 'block'
    overlay.style.display = 'block'
    document.body.style.animationPlayState = 'paused'
}

function CloseCodCadModal() {
    let element = document.getElementById('CodCadPopup')
    element.style.display = 'none'
    overlay.style.display = 'none'
    document.body.style.animationPlayState = 'running'
}
//----------------------------------------------------------------------------------------------------------------------

function OpenW3SModal() {
    let element = document.getElementById('W3SPopup')
    element.style.display = 'block'
    overlay.style.display = 'block'
    document.body.style.animationPlayState = 'paused'
}

function CloseW3SModal() {
    let element = document.getElementById('W3SPopup')
    element.style.display = 'none'
    overlay.style.display = 'none'
    document.body.style.animationPlayState = 'running'
}
//----------------------------------------------------------------------------------------------------------------------

function OpenGitLearnModal() {
    let element = document.getElementById('GitLearnPopup')
    element.style.display = 'block'
    overlay.style.display = 'block'
    document.body.style.animationPlayState = 'paused'
}

function CloseGitLearnModal() {
    let element = document.getElementById('GitLearnPopup')
    element.style.display = 'none'
    overlay.style.display = 'none'
    document.body.style.animationPlayState = 'running'
}
//----------------------------------------------------------------------------------------------------------------------