const SPEED = 2
const MIN_X = 0
const MAX_X = 3200
const RIGHT_DIRECTION = true
const LEFT_DIRECTION = false
const CHARACTER_ID = 'character'
const LOCATION_ID = 'location'

document.getElementById('field').addEventListener('click', (e) => resetCharacterX(e))

async function resetCharacterX(event) {
    const newX = event.clientX
    const oldX = getLeftComputedStyle(CHARACTER_ID)

    if (newX > oldX)
        wrapMoveAnimation('character-go-right', () => move(newX, RIGHT_DIRECTION))
    else
        wrapMoveAnimation('character-go-left', () => move(newX, LEFT_DIRECTION))
}

function wrapMoveAnimation(animation, movingFunc) {
    document.getElementById(CHARACTER_ID).classList.add(animation)
    movingFunc()
    document.getElementById(CHARACTER_ID).classList.remove(animation)
}

async function move(newX, isRightDirection) {
    const oldX = getLeftComputedStyle(LOCATION_ID) + getLeftComputedStyle(CHARACTER_ID)
    const newLocationX = getLeftComputedStyle(LOCATION_ID) + newX

    for (let movement = oldX;
        isRightDirection && movement <= newLocationX ||
        !isRightDirection && movement > newLocationX;
        movement = movement + 1 * (isRightDirection ? 1 : - 1)
    ) {
        let characterPosition = getLeftComputedStyle(CHARACTER_ID)
        let leftLocationPosition = getLeftComputedStyle(LOCATION_ID)

        if (!shouldMoveLocation(characterPosition))
            setLeftStyle(CHARACTER_ID, characterPosition + 1 * (isRightDirection ? 1 : -1))
        else
            setLeftStyle(LOCATION_ID, leftLocationPosition - 1 * (isRightDirection ? 1 : -1))

        preventDeadZoneLocation()
        await sleep(SPEED)
    }
}

function shouldMoveLocation(newCharacterX) {
    const leftPosition = getLeftComputedStyle(LOCATION_ID)
    const rightPosition = getRightComputedStyle(LOCATION_ID)
    const isCharacterOnCenter = newCharacterX == (document.body.clientWidth / 2)
    return leftPosition < 0 && rightPosition < 0 && isCharacterOnCenter
}

function preventDeadZoneLocation() {
    const leftPosition = getLeftComputedStyle(LOCATION_ID)
    const rightPosition = getRightComputedStyle(LOCATION_ID)
    let leftLocationPosition = getLeftComputedStyle(LOCATION_ID)
    if (rightPosition == 0)
        setLeftStyle(LOCATION_ID, leftLocationPosition + 1)
    if (leftPosition == 0)
        setLeftStyle(LOCATION_ID, leftLocationPosition - 1)
}