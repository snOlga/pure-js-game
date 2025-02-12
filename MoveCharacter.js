const SPEED = 5

document.getElementById('field').addEventListener('click', (e) => resetCharacterPosition(e))

async function resetCharacterPosition(event) {
    const newX = event.clientX
    const oldXCSS = document.getElementById('character').style.left
    const oldX = oldXCSS.replace("px", "")

    if (newX > oldX)
        moveRight(oldX, newX)
    else
        moveLeft(oldX, newX)
}

async function moveRight(oldX, newX) {
    document.getElementById('character').classList.add('character-go-right')
    for (let movement = oldX; movement < newX; movement++) {
        document.getElementById('character').style.left = movement + 'px'
        // moveBackground(oldX, newX)
        await sleep(SPEED)
    }
    document.getElementById('character').classList.remove('character-go-right')
}

async function moveLeft(oldX, newX) {
    document.getElementById('character').classList.add('character-go-left')
    for (let movement = oldX; movement > newX; movement--) {
        document.getElementById('character').style.left = movement + 'px'
        moveBackground(oldX, newX)
        await sleep(SPEED)
    }
    document.getElementById('character').classList.remove('character-go-left')
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}


