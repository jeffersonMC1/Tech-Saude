let countdown;
const timerDisplay = document.getElementById('timer');

function startTimer() {
    const timeInSeconds = 600; // 10 minutes
    const endTime = Date.now() + timeInSeconds * 1000;

    clearInterval(countdown);

    function updateTimer() {
        const secondsLeft = Math.round((endTime - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            timerDisplay.textContent = 'Tempo esgotado!';
            return;
        }

        const minutes = Math.floor(secondsLeft / 60);
        const seconds = secondsLeft % 60;

        const display = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timerDisplay.textContent = display;
    }

    updateTimer();
    countdown = setInterval(updateTimer, 1000);
}
