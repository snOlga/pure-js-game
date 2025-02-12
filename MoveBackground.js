document.getElementById('field').addEventListener('click', (e) => moveBackground(e))

function moveBackground(event) {
    const newX = event.clientX
    const percentageWidth = newX / document.body.clientWidth * 100

    const field = document.getElementById('field')
    const oldX = Number(window.getComputedStyle(field).backgroundPositionX.replace('px', ''))

    if (percentageWidth > 90.0)
        moveBgRight(oldX, newX)
    if (percentageWidth < 10.0)
        moveBgLeft(oldX, newX)
}

async function moveBgRight(oldX, newX) {
    for (let movement = 0; movement > 0 - (document.body.clientWidth / 2); movement--) {
        document.getElementById('field').style.left = movement + 'px'
        await sleep(SPEED)
    }
}

async function moveBgLeft(oldX, newX) {
    if (oldX == 0)
        return

    for (let movement = oldX; movement < 0; movement++) {
        document.getElementById('field').style.left = movement + 'px'
        await sleep(SPEED)
    }
}