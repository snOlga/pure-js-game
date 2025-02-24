const SPEED = 0.001
const MIN_X = 0
const MAX_X = 3200
const RIGHT_DIRECTION = true
const LEFT_DIRECTION = false
const CHARACTER_ID = 'character'
const LOCATION_ID = 'location'
const CAMERA_ID = 'field'

document.getElementById('field').addEventListener('click', (e) => resetCharacterX(e))

var isMoving = false

async function resetCharacterX(event) {
    isMoving = !isMoving
    if (!isMoving)
        return

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

    preventDeadZoneLocation()

    for (let movement = oldX;
        isRightDirection && movement <= newLocationX ||
        !isRightDirection && movement > newLocationX;
        movement = movement + (isRightDirection ? 1 : - 1)
    ) {
        if (!isMoving)
            break

        let characterPosition = getLeftComputedStyle(CHARACTER_ID)
        let leftLocationPosition = getLeftComputedStyle(LOCATION_ID)
        var willMoveLocation = shouldMoveLocation(characterPosition, isRightDirection)

        if (!willMoveLocation)
            setLeftStyle(CHARACTER_ID, characterPosition + (isRightDirection ? 1 : -1))
        else
            setLeftStyle(LOCATION_ID, leftLocationPosition + (isRightDirection ? -1 : 1))

        await sleep(SPEED)
    }
    if (willMoveLocation)
        await onStop()
    isMoving = !isMoving
}

function shouldMoveLocation(newCharacterX, isRightDirection) {
    const leftPosition = getLeftComputedStyle(LOCATION_ID)
    const rightPosition = getRightComputedStyle(LOCATION_ID)
    const isCharacterOnCenter = (newCharacterX == (document.body.clientWidth / 2) && isRightDirection) ||
        (newCharacterX == (document.body.clientWidth / 2 - document.getElementById(CHARACTER_ID).offsetWidth) && !isRightDirection)
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

async function onStop() {
    const characterLeftPosition = getLeftComputedStyle(CHARACTER_ID)
    const characterRightPosition = getRightComputedStyle(CHARACTER_ID)
    const isRightDirection = characterLeftPosition > characterRightPosition
    let characterCenter = characterLeftPosition + document.getElementById(CHARACTER_ID).offsetWidth / 2
    const documentCenter = document.body.clientWidth / 2

    while (characterCenter != documentCenter && getLeftComputedStyle(LOCATION_ID) < 0 && getRightComputedStyle(LOCATION_ID) < 0) {
        let characterPosition = getLeftComputedStyle(CHARACTER_ID)
        let leftLocationPosition = getLeftComputedStyle(LOCATION_ID)

        setLeftStyle(CHARACTER_ID, characterPosition + (isRightDirection ? -1 : 1))
        setLeftStyle(LOCATION_ID, leftLocationPosition + (isRightDirection ? -1 : 1))

        await sleep(SPEED)

        characterCenter += (isRightDirection ? -1 : 1)
    }
}