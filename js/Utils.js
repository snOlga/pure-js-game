function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function getLeftComputedStyle(elementName) {
    return Number((window.getComputedStyle(document.getElementById(elementName)).left).replace("px", ""))
}

function getRightComputedStyle(elementName) {
    return Number((window.getComputedStyle(document.getElementById(elementName)).right).replace("px", ""))
}

function setLeftStyle(elementName, value) {
    document.getElementById(elementName).style.left = value + 'px'
}

function setRightStyle(elementName, value) {
    document.getElementById(elementName).style.right = value + 'px'
}