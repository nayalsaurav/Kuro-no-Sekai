let newYear = '1 Jan 2025';
let days = document.getElementById('days');
let hours = document.getElementById('hours');
let mins = document.getElementById('minutes');
let sec = document.getElementById('seconds');

function countdown() {
    const newYearDate = new Date(newYear);
    const currDate = new Date();
    let diff = (newYearDate-currDate);

    let noOfSeconds = Math.floor(diff/1000);
    let noOfDays =  Math.floor(noOfSeconds/3600/24);
    let noOfHours =  Math.floor(noOfSeconds/3600)%24;
    let noOfMinutes =  Math.floor(noOfSeconds/60)%60;
    noOfSeconds = noOfSeconds%60;

    days.innerHTML = noOfDays;
    hours.innerHTML = formatDate(noOfHours);
    mins.innerHTML = formatDate(noOfMinutes);
    sec.innerHTML = formatDate(noOfSeconds);
}

function formatDate(time) {
    return time<10?`0${time}`:time;
}

setInterval(countdown,1000);

