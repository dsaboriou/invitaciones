document.addEventListener('DOMContentLoaded', () => {
    // Audio Player Logic
    const audio = document.getElementById('wedding-audio');
    const audioBtn = document.getElementById('audio-btn');
    const audioIcon = document.getElementById('audio-icon');

    if (audio && audioBtn) {
        audioBtn.addEventListener('click', () => {
            const equalizerIcon = document.getElementById('equalizer-icon');
            if (audio.paused) {
                audio.play();
                audioIcon.style.display = 'none';
                if (equalizerIcon) equalizerIcon.style.display = 'inline-block';
            } else {
                audio.pause();
                audioIcon.style.display = '';
                if (equalizerIcon) equalizerIcon.style.display = 'none';
            }
        });
    }

    // Countdown Logic (Existing logic refactored if needed, or keeping simple)
    // Assuming countdown logic is already handled or needs to be added here.
    // The user previously had a countdown element in HTML, so I'll add the logic back if it was missing or ensure it works.

    const weddingDate = new Date("August 9, 2026 10:30:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            document.getElementById("countdown").innerHTML = "¡Es hoy!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const countdownElement = document.getElementById("countdown");
        if (countdownElement) {
            countdownElement.innerHTML = `
                <div class="time-unit">
                    <span class="time-number">${days}</span>
                    <span class="time-label">DÍAS</span>
                </div>
                <div class="separator">:</div>
                <div class="time-unit">
                    <span class="time-number">${hours}</span>
                    <span class="time-label">HRS</span>
                </div>
                <div class="separator">:</div>
                <div class="time-unit">
                    <span class="time-number">${minutes}</span>
                    <span class="time-label">MIN</span>
                </div>
                <div class="separator">:</div>
                <div class="time-unit">
                    <span class="time-number">${seconds}</span>
                    <span class="time-label">SEG</span>
                </div>
            `;
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});
