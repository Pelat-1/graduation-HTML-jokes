let level = 1;
let chances = 50;
let checkTrue = 0;
let checkFalse = 0;
const timeout = 2500;

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
    checkTrue = 0;
    checkFalse = 0;
    cycle();
}

function betMore() {
    $('.moreorless').prop('disabled', true);
    if (checkTrue > checkFalse) {
        level++;
        chances++;
    }
}

function betLess() {
    $('.moreorless').prop('disabled', true);
    if (checkFalse > checkTrue) {
        level++;
        chances--;
    }
}