document.addEventListener('DOMContentLoaded', () => {

    // Reveal On Scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach(el => revealObserver.observe(el));

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Countdown Timer
    const weddingDate = new Date('2026-04-18T15:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = "¡Es hoy!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = hours;
        document.getElementById('minutes').innerText = minutes;
        document.getElementById('seconds').innerText = seconds;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // Music Control
    // Music Control
    const audio = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicBtn.classList.remove('playing');
        } else {
            audio.play();
            musicBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });

    // Optional: Try to auto-play (browsers might block it)
    /*
    audio.play().then(() => {
        isPlaying = true;
        musicIcon.classList.remove('fa-play');
        musicIcon.classList.add('fa-pause');
        musicBtn.classList.add('playing');
    }).catch(error => {
        console.log("Auto-play prevented");
    });
    */
});

// Falling Petals Animation
function createPetals() {
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        // Skip dark sections - only add petals to light/clear sections
        if (section.classList.contains('timeline-section') || 
            section.classList.contains('dress-code-section') ||
            section.classList.contains('confirmation-box')) {
            return; // Skip this section
        }

        const petalCount = 15;
        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement('div');
            petal.classList.add('petal');

            // Random size
            const size = Math.random() * 20 + 10; // 10px to 30px
            petal.style.width = `${size}px`;
            petal.style.height = `${size}px`;

            // Random position
            petal.style.left = Math.random() * 100 + '%';

            // Random animation properties
            const duration = Math.random() * 5 + 10; // 10s to 15s
            const delay = Math.random() * 5;

            petal.style.animationName = 'falling';
            petal.style.animationDuration = `${duration}s`;
            petal.style.animationDelay = `${delay}s`;
            petal.style.animationTimingFunction = 'linear';
            petal.style.animationIterationCount = 'infinite';

            section.appendChild(petal);
        }
    });
}

createPetals();

// Dynamic Version Check
function checkVersion() {
    const urlParams = new URLSearchParams(window.location.search);
    const version = urlParams.get('v');

    if (version === '2') {
        const confirmDate = document.getElementById('confirm-date');

        if (confirmDate) {
            confirmDate.innerText = "Por favor confirmar antes del 7 de marzo";
        }
    }
}

checkVersion();
