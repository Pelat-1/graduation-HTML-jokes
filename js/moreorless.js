const codice = '';
let level = 1;
let chances = 50;
let checkTrue = 0;
let checkFalse = 0;
const timeout = 2500;
let lastFiveClicks = [];
let cheated = false;

$(() => cycle());

function cycle() {
    if (level > 20) {
        $('#level').text('HAI VINTO: ' + codice);
    } else {
        $('#level').text('LEVEL ' + level);
    }
    const newTimeout = getTimeout();
    $('#table').hide();
    while (checkTrue === checkFalse) {
        for (let i = 1; i < 101; i++) {
            let randomBoolCheck = Math.floor(Math.random() * 100) >= chances;
            const id = '#check' + (i < 100 ? '0' : '') + (i < 10 ? '0' : '') + i;
            if (randomBoolCheck) {
                checkTrue++;
                $(id).prop('checked', true);
            } else {
                checkFalse++;
                $(id).prop('checked', false);
            }
        }
    }
    $('#table').show();
    setTimeout(() => {
        $('#table').hide();
        $('.moreorless').prop('disabled', false);
        setTimeout(() => {
            // location.reload();
            // continueLoop = false;
            recycle();
        }, timeout * 2);
    },
    newTimeout);
}

function getTimeout() {
    let newTimeout = level * -100;
    newTimeout += timeout;
    return newTimeout < 500 ? 500 : newTimeout;
}

function recycle() {
    if (level > 20) {
        // location.replace("https://www.w3schools.com")
    }
    if (cheated) {
        $('#cheat').text('CHEAT INDIVIDUATO!');
        cheated = false;
    } else {
        $('#cheat').text('');
    }
    checkTrue = 0;
    checkFalse = 0;
    cycle();
}

function betMore() {
    $('.moreorless').prop('disabled', true);
    pushClick(true);
    if (checkTrue > checkFalse) {
        level++;
        chances++;
        noCheatVerifier();
    }
}

function betLess() {
    $('.moreorless').prop('disabled', true);
    pushClick(false);
    if (checkFalse > checkTrue) {
        level++;
        chances--;
        noCheatVerifier();
    }
}

function pushClick(isMore) {
    lastFiveClicks.push(isMore);
    if (lastFiveClicks.length > 5) {
        lastFiveClicks = lastFiveClicks.reverse();
        lastFiveClicks.pop();
        lastFiveClicks = lastFiveClicks.reverse();
    }
}

function noCheatVerifier() {
    if (lastFiveClicks.length > 4) {
        let alternativeClick = true;
        for (let i = 1; i < lastFiveClicks.length; i++) {
            if (lastFiveClicks[i - 1] === lastFiveClicks[i]) {
                alternativeClick = false;
                break;
            }
        }
        let alwaysSameAnswer = true;
        for (let i = 1; i < lastFiveClicks.length; i++) {
            if (lastFiveClicks[i - 1] !== lastFiveClicks[i]) {
                alwaysSameAnswer = false;
                break;
            }
        }
        if (alternativeClick || alwaysSameAnswer) {
            level -= 11;
            chances = 50;
            lastFiveClicks = [];
            if (level < 2) {
                level = 1;
            }
            cheated = true;
        }
    }
}