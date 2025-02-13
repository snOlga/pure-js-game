const SPEED = 1

document.getElementById('field').addEventListener('click', (e) => resetCharacterX(e))

const MIN_X = 0
const MAX_X = 6400

async function resetCharacterX(event) {
    const newX = event.clientX
    const oldX = getLeftComputedStyle('character')

    if (newX > oldX)
        wrapMoveAnimation('character-go-right', () => moveRight(newX))
    else
        wrapMoveAnimation('character-go-left', () => moveLeft(newX))
}

function wrapMoveAnimation(animation, movingFunc) {
    document.getElementById('character').classList.add(animation)
    movingFunc()
    document.getElementById('character').classList.remove(animation)
}

async function moveRight(newX) {
    const oldX = getCharacterXonLocation()
    const newLocationX = getLeftComputedStyle('location') + newX
    for (let movement = oldX; movement < newLocationX; movement++) {
        let characterPosition = getLeftComputedStyle('character')
        if (!moveLocationRight(characterPosition)) 
            setLeftStyle('character', characterPosition + 1)
        await sleep(SPEED)
    }
}

async function moveLeft(newX) {
    for (let movement = oldX; movement > newX; movement--) {
        setLeftStyle('character', movement)
        await sleep(SPEED)
    }
}

function moveLocationRight(newCharacterX) {
    const rightPosition = getRightComputedStyle('location')
    const isCharacterOnCenter = newCharacterX == (document.body.clientWidth / 2)
    console.log(rightPosition)
    if (rightPosition < 0 && isCharacterOnCenter)
        setRightStyle('location', rightPosition + 1) // TODO: stopped here
    return rightPosition < 0 && isCharacterOnCenter
}

function getCharacterXonLocation() {
    return getLeftComputedStyle('location') + getLeftComputedStyle('character')
}