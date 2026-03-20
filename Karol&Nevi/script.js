document.addEventListener('DOMContentLoaded', () => {
    // --- Countdown Timer ---
    // Set the date we're counting down to
    const countDownDate = new Date("Apr 18, 2026 00:00:00").getTime();

    // Update the count down every 1 second
    const x = setInterval(function () {

        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the elements with corresponding IDs
        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "<div class='time-box' style='width:100%'><span>¡Es hoy!</span></div>";
        }
    }, 1000);


    // --- Fade In Animation ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // --- Music Player Logic ---
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');

    function togglePlay() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        } else {
            audioPlayer.pause();
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
        }
    }

    playPauseBtn.addEventListener('click', togglePlay);



    // Set duration when metadata loads
    audioPlayer.addEventListener('loadedmetadata', () => {
        // Time keeping removed
    });



    // Reset when ended
    audioPlayer.addEventListener('ended', () => {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        audioPlayer.currentTime = 0;
    });
    // --- Modals Logic ---
    const rsvpBtn = document.getElementById('rsvp-float-btn');
    const rsvpModal = document.getElementById('rsvp-modal');
    const rsvpClose = document.querySelector('.rsvp-close');
    const rsvpOverlay = document.querySelector('.rsvp-overlay');

    const colorsBtn = document.getElementById('colors-btn');
    const colorsModal = document.getElementById('colors-modal');
    const colorsClose = document.querySelector('.colors-close');
    const colorsOverlay = document.querySelector('.colors-overlay');

    function openModal(modal) {
        if (!modal) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // RSVP Events
    if (rsvpBtn) rsvpBtn.addEventListener('click', () => openModal(rsvpModal));
    if (rsvpClose) rsvpClose.addEventListener('click', () => closeModal(rsvpModal));
    if (rsvpOverlay) rsvpOverlay.addEventListener('click', () => closeModal(rsvpModal));

    // Colors Events
    if (colorsBtn) colorsBtn.addEventListener('click', () => openModal(colorsModal));
    if (colorsClose) colorsClose.addEventListener('click', () => closeModal(colorsModal));
    if (colorsOverlay) colorsOverlay.addEventListener('click', () => closeModal(colorsModal));

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (rsvpModal && rsvpModal.classList.contains('active')) closeModal(rsvpModal);
            if (colorsModal && colorsModal.classList.contains('active')) closeModal(colorsModal);
        }
    });

    // --- Show RSVP button on scroll (Third Section: #details) ---
    const detailsSection = document.getElementById('details');
    const rsvpBtnObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                rsvpBtn.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    if (detailsSection) {
        rsvpBtnObserver.observe(detailsSection);
    }
    // --- Copy SINPE Number ---
    const copyBtn = document.getElementById('copy-btn');
    const sinpeNumber = document.getElementById('sinpe-number');

    if (copyBtn && sinpeNumber) {
        let timeoutId;
        const btnText = copyBtn.querySelector('.btn-text');
        const btnIcon = copyBtn.querySelector('.btn-icon');
        const originalText = btnText.textContent;
        const originalIcon = btnIcon.innerHTML;

        copyBtn.addEventListener('click', () => {
            const rawNumber = sinpeNumber.textContent.replace(/-/g, '');
            navigator.clipboard.writeText(rawNumber).then(() => {
                // Clear any existing timeout to prevent rapid clicking issues
                if (timeoutId) clearTimeout(timeoutId);

                copyBtn.classList.add('copied');
                btnText.textContent = '¡Copiado!';
                btnIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

                timeoutId = setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    btnText.textContent = originalText;
                    btnIcon.innerHTML = originalIcon;
                }, 2000);
            }).catch(err => {
                console.error('Error al copiar: ', err);
            });
        });
    }

    // --- Stacking Photo Gallery Animation ---
    const galleryItems = document.querySelectorAll('.polaroid-item');
    if (galleryItems.length > 0) {
        // Split items into left (0-4) and right (5-9) piles based on logical position
        // We assume 0-4 are left and 5-9 are right based on CSS nth-child logic used
        const leftPile = Array.from(galleryItems).slice(0, 5);
        const rightPile = Array.from(galleryItems).slice(5);

        let leftIndex = 0;
        let rightIndex = 0;
        let zIndexCounter = 1;
        let isLeftTurn = true; // Flag to alternate turns

        function animateItem(item) {
            // Random rotation between -10 and 10 degrees
            const randomRotation = Math.floor(Math.random() * 21) - 10;
            // Random offset between -10px and 10px
            const randomX = Math.floor(Math.random() * 21) - 10;
            const randomY = Math.floor(Math.random() * 21) - 10;

            // Reset state to initial (hidden and scaled up) without transition
            item.style.transition = 'none';
            item.style.opacity = '0';
            item.style.transform = `translate(calc(-50% + ${randomX}px), calc(-50% + ${randomY}px)) scale(1.5) rotate(${randomRotation}deg)`;
            item.style.zIndex = zIndexCounter++;

            // Force reflow
            void item.offsetWidth;

            // Animate to final state
            const isMobile = window.innerWidth <= 768;
            const transitionTime = isMobile ? '1.5s' : '0.8s';
            item.style.transition = `all ${transitionTime} cubic-bezier(0.25, 0.8, 0.25, 1)`;
            item.style.opacity = '1';
            item.style.transform = `translate(calc(-50% + ${randomX}px), calc(-50% + ${randomY}px)) scale(1) rotate(${randomRotation}deg)`;
            item.classList.add('visible');

            // Store transform for hover effect restoration
            item.dataset.rotation = randomRotation;
            item.dataset.x = randomX;
            item.dataset.y = randomY;
        }

        function animateNextItem() {
            let item;

            if (isLeftTurn && leftPile.length > 0) {
                // Animate left pile
                item = leftPile[leftIndex];
                leftIndex = (leftIndex + 1) % leftPile.length;
            } else if (!isLeftTurn && rightPile.length > 0) {
                // Animate right pile
                item = rightPile[rightIndex];
                rightIndex = (rightIndex + 1) % rightPile.length;
            }

            if (item) {
                animateItem(item);
            }

            // Toggle turn
            isLeftTurn = !isLeftTurn;
        }

        // Add hover effect logic to restore rotation
        galleryItems.forEach(item => {
            item.addEventListener('mouseleave', () => {
                // Restore the random position/rotation when mouse leaves
                if (item.classList.contains('visible') && item.dataset.rotation) {
                    item.style.transform = `translate(calc(-50% + ${item.dataset.x}px), calc(-50% + ${item.dataset.y}px)) scale(1) rotate(${item.dataset.rotation}deg)`;
                }
            });
        });

        // Start loop - slightly faster than 2s to keep it lively since we alternate
        // Make it slower on mobile devices
        const isMobile = window.innerWidth <= 768;
        const intervalTime = isMobile ? 2500 : 1200;
        setInterval(animateNextItem, intervalTime);
        // Trigger first one immediately
        animateNextItem();
    }
});
