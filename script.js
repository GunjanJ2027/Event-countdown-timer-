let countdownInterval;
let isCounting = false;

document.getElementById('start-pause-btn').addEventListener('click', startPauseCountdown);
document.getElementById('reset-btn').addEventListener('click', resetCountdown);
document.getElementById('customize-btn').addEventListener('click', customizeEvent);

function startPauseCountdown() {
    if (!isCounting) {
        startCountdown();
        document.getElementById('start-pause-btn').textContent = 'Pause';
        isCounting = true;
    } else {
        clearInterval(countdownInterval);
        document.getElementById('start-pause-btn').textContent = 'Start';
        isCounting = false;
    }
}

function startCountdown() {
    const eventDate = new Date(document.getElementById('event-date').value);
    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const timeRemaining = eventDate - now;

        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = "<div class='time-section'><span>00</span><span>Event Ended!</span></div>";
            return;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = formatTime(days);
        document.getElementById('hours').textContent = formatTime(hours);
        document.getElementById('minutes').textContent = formatTime(minutes);
        document.getElementById('seconds').textContent = formatTime(seconds);
    }, 1000);
}

function resetCountdown() {
    clearInterval(countdownInterval);
    isCounting = false;
    document.getElementById('start-pause-btn').textContent = 'Start';
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
}

function customizeEvent() {
    const eventName = document.getElementById('event-name').value;
    document.getElementById('event-title').textContent = eventName || 'Event Countdown';
    resetCountdown();
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}
