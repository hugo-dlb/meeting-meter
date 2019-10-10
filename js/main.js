formatSeconds = function (iSeconds) {
    var interval = Math.floor(iSeconds / 31536000);

    if (interval > 1) {
        return interval + ' years';
    }

    interval = Math.floor(iSeconds / 2592000);
    if (interval > 1) {
        return interval + ' months';
    }

    interval = Math.floor(iSeconds / 86400);
    if (interval > 1) {
        return interval + ' days';
    }

    interval = Math.floor(iSeconds / 3600);
    if (interval > 1) {
        return interval + ' hours';
    }

    interval = Math.floor(iSeconds / 60);
    if (interval > 1) {
        return interval + ' minutes';
    }

    return Math.floor(iSeconds) + ' seconds';
}

const getCost = function (iSeconds) {
    const iParticipants = parseInt(document.getElementById('participant-number-input').value, 10);
    const iAverageIncome = parseInt(document.getElementById('average-income-input').value, 10);

    const iCost = Math.round(iParticipants * ((iAverageIncome / (365 - 20)) / 7 / 60 / 60) * iSeconds);
    return iCost;
}

const calculateFixed = function(oEvent) {
    oEvent.preventDefault();
    const oCostContainer = document.getElementById('cost');
    const iDuration = parseInt(document.getElementById('duration-input').value, 10);
    const iCost = getCost(iDuration * 60);
    oCostContainer.textContent = iCost + '$';
}

let iSecondsElapsed = 0;
let fnInterval = null;

const startTimer = function (oEvent) {
    oEvent.preventDefault();
    const oCostContainer = document.getElementById('cost');
    const oTimeElapsedContainer = document.getElementById('time-elapsed');

    if (fnInterval) {
        clearInterval(fnInterval);
    }

    fnInterval = setInterval(() => {
        iSecondsElapsed++;
        const iCost = getCost(iSecondsElapsed);
        oCostContainer.textContent = iCost + '$';
        oTimeElapsedContainer.textContent = formatSeconds(iSecondsElapsed);
    }, 1000);
}

const stopTimer = function () {
    clearInterval(fnInterval);
}

const resetTimer = function () {
    const oCostContainer = document.getElementById('cost');
    const oTimeElapsedContainer = document.getElementById('time-elapsed');
    iSecondsElapsed = 0;
    oCostContainer.textContent = 0 + '$';
    oTimeElapsedContainer.textContent = formatSeconds(0);
}