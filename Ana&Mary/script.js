document.addEventListener('DOMContentLoaded', () => {


    // --- Heart Button Logic ---
    const heartBtn = document.getElementById('heart-btn');
    if (heartBtn) {
        heartBtn.addEventListener('click', () => {
            heartBtn.classList.toggle('active');
            const icon = heartBtn.querySelector('i');
            if (heartBtn.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    }

    // --- Music Player Logic ---
    const audio = document.getElementById('bg-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = playPauseBtn.querySelector('i');
    const progressContainer = document.getElementById('progress-container');
    const progressFill = document.getElementById('progress-fill');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');

    let isPlaying = false;

    if (playPauseBtn && audio) {
        // Toggle Play/Pause
        playPauseBtn.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
            } else {
                audio.play().catch(error => {
                    console.log("Audio play failed:", error);
                });
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
            }
            isPlaying = !isPlaying;
        });

        // Update Progress Bar & Time
        audio.addEventListener('timeupdate', () => {
            const { duration, currentTime } = audio;
            const progressPercent = (currentTime / duration) * 100;
            if (progressFill) progressFill.style.width = `${progressPercent}%`;

            // Format Time
            const formatTime = (time) => {
                const minutes = Math.floor(time / 60);
                const seconds = Math.floor(time % 60);
                return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            };

            if (currentTimeEl) currentTimeEl.innerText = formatTime(currentTime);
            if (duration && durationEl) {
                durationEl.innerText = formatTime(duration);
            }
        });

        // Click on progress bar to seek
        if (progressContainer) {
            progressContainer.addEventListener('click', (e) => {
                const width = progressContainer.clientWidth;
                const clickX = e.offsetX;
                const duration = audio.duration;
                audio.currentTime = (clickX / width) * duration;
            });
        }
    }
    // --- RSVP Modal Logic ---
    const rsvpFab = document.getElementById('rsvp-fab');
    const rsvpModal = document.getElementById('rsvp-modal');
    const closeModalBtn = document.querySelector('.close-modal-btn');

    if (rsvpFab && rsvpModal) {
        // Open Modal
        rsvpFab.addEventListener('click', () => {
             rsvpModal.classList.add('active'); 
             rsvpModal.style.display = 'flex';
             
             // Trigger reflow 
             void rsvpModal.offsetWidth;
             rsvpModal.style.opacity = '1';

             // Prevent background scrolling
             document.body.style.overflow = 'hidden';
        });

        // Close Modal Function
        const closeModal = () => {
            rsvpModal.style.opacity = '0';
            
            setTimeout(() => {
                rsvpModal.classList.remove('active');
                rsvpModal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        };

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        rsvpModal.addEventListener('click', (e) => {
            if (e.target === rsvpModal) {
                closeModal();
            }
        });
    }
    // --- Scroll-Based RSVP Button Visibility ---
    const detailsSection = document.querySelector('.details-section');

    if (rsvpFab && detailsSection) {
        const toggleRsvpVisibility = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const triggerPosition = detailsSection.offsetTop + 100; // Trigger slightly after section starts

            if (scrollPosition > triggerPosition) {
                rsvpFab.classList.add('visible');
            } else {
                rsvpFab.classList.remove('visible');
            }
        };

        // Initial check
        toggleRsvpVisibility();

        // Scroll listener
        window.addEventListener('scroll', toggleRsvpVisibility);
    }
});

// Copy to Clipboard Function
function copyToClipboard(elementId, btnElement) {
    const text = document.getElementById(elementId).innerText;
    const originalContent = btnElement.innerHTML;

    navigator.clipboard.writeText(text).then(() => {
        // Change button content to indicate success
        btnElement.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
        btnElement.style.borderColor = 'var(--terracota-claro)';
        btnElement.style.color = 'var(--terracota-claro)';

        // Revert after 2 seconds
        setTimeout(() => {
            btnElement.innerHTML = originalContent;
            btnElement.style.borderColor = '';
            btnElement.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}
