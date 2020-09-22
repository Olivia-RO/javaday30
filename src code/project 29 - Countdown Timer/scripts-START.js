let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');



function timer(seconds) {
    clearInterval(countdown);
    
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        
        displayTimeLeft(secondsLeft);
    }, 1000);
    
}

function displayTimeLeft(seconds) {
    const mins = Math.floor(seconds / 60);
    const remaniderSecs = seconds % 60;
    const display = `${mins}:${remaniderSecs < 10 ? '0' : ''}${remaniderSecs}`;
    
    document.title = display;
    timerDisplay.textContent = display;
    
}

function displayEndTime(timeStamp) {
    const end = new Date(timeStamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    
    endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    const secs = parseInt(this.dataset.time);
    timer(secs);
}


buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
   e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});