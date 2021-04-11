let level = 1;
let chances = 50;
let checkTrue = 0;
let checkFalse = 0;
const timeout = 2500;
let lastFiveAnswers = [];
let cheated = false;

$(() => cycle());

function cycle() {
    $('#level').text('LEVEL ' + level);
    const newTimeout = timeout - (level * 100);
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
    noCheatVerifier(true);
    if (checkTrue > checkFalse && !cheated) {
        level++;
        chances++;
    }
}

function betLess() {
    $('.moreorless').prop('disabled', true);
    noCheatVerifier(false);
    if (checkFalse > checkTrue & !cheated) {
        level++;
        chances--;
    }
}

function noCheatVerifier(isMore) {
    lastFiveAnswers.push(isMore);
    if (lastFiveAnswers.length > 4) {
        if (lastFiveAnswers.length > 5) {
            lastFiveAnswers = lastFiveAnswers.reverse();
            lastFiveAnswers.pop();
            lastFiveAnswers = lastFiveAnswers.reverse();
        }
        let alternativeClick = true;
        for (let i = 1; i < lastFiveAnswers.length; i++) {
            if (lastFiveAnswers[i - 1] === lastFiveAnswers[i]) {
                alternativeClick = false;
                break;
            }
        }
        let alwaysSameAnswer = true;
        for (let i = 1; i < lastFiveAnswers.length; i++) {
            if (lastFiveAnswers[i - 1] !== lastFiveAnswers[i]) {
                alwaysSameAnswer = false;
                break;
            }
        }
        if (alternativeClick || alwaysSameAnswer) {
            level -= 11;
            chances = 50;
            if (level < 2) {
                level = 1;
                lastFiveAnswers = [];
            }
            cheated = true;
        }
    }
}