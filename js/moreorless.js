let level = 1;
let chances = 50;
let checkTrue = 0;
let checkFalse = 0;
const timeout = 2500;

$(() => cycle());

function cycle() {
    $('#level').text('LEVEL ' + level);
    $('#table').hide();
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
    $('#table').show();
}