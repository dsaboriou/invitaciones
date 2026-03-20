document.addEventListener('DOMContentLoaded', () => {
    // Reveal Observer for general elements
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('v-visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.v-main-card, .v-info-item, .v-rsvp-card-night, .v-narrative, .v-contact-grid').forEach(el => {
        if (!el.classList.contains('v-narrative')) el.classList.add('v-reveal');
        revealObserver.observe(el);
    });

    // Glitter/Sparkle generation for the number 50
    function generateSparkles() {
        const wrap = document.querySelector('.v-sparkles');
        if (!wrap) return;
        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'v-sparkle-item';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.animationDelay = `${Math.random() * 3}s`;
            wrap.appendChild(sparkle);
        }
    }
    generateSparkles();

    // Night Stars Generation
    function generateStars() {
        const container = document.querySelector('.v-stars-container');
        if (!container) return;
        // Reduced count for better legibility (120 stars)
        for (let i = 0; i < 110; i++) {
            const star = document.createElement('div');
            star.classList.add('v-star');
            
            // Further reduced frequency of shapes for a cleaner look
            const isShape = Math.random() > 0.92; // ~8% are shapes
            
            if (isShape) {
                star.classList.add('v-star-shape');
                const size = Math.random() * 10 + 8; // Hero-style star size: 8px to 18px
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
            } else {
                const size = Math.random() * 2 + 1; // Subtle point size: 1px to 3px
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
            }

            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.setProperty('--v-duration', `${Math.random() * 4 + 2}s`);
            star.style.animationDelay = `${Math.random() * 5}s`;
            container.appendChild(star);
        }
    }

    function createShootingStar() {
        const container = document.querySelector('.v-stars-container');
        if (!container || container.style.opacity < 0.5) return;
        const star = document.createElement('div');
        star.classList.add('v-shooting-star');
        star.style.left = `${Math.random() * 100 + 20}%`;
        star.style.top = `${Math.random() * 50}%`;
        star.style.animation = `v-shoot ${Math.random() * 2 + 1}s linear forwards`;
        container.appendChild(star);
        setTimeout(() => star.remove(), 3000);
    }

    generateStars();
    setInterval(createShootingStar, 4000);

    // Unified Scroll Effect (Sunset to Night)
    const experience = document.querySelector('.v-unified-experience');
    const sun = document.querySelector('.v-sun');
    const stars = document.querySelector('.v-stars-container');

    function scrollEffect() {
        if (!experience) return;
        const rect = experience.getBoundingClientRect();
        const winH = window.innerHeight;
        
        // Progress within the unified section (0 to 1)
        let progress = (winH - rect.top) / (rect.height + winH);
        progress = Math.max(0, Math.min(1, progress));

        // 1. Background Gradient Shift (Smoother transition)
        // Reaches full night around progress = 0.6
        experience.style.backgroundPosition = `0% ${Math.min(100, progress * 165)}%`;

        // 2. Sun Movement (Smoother descent)
        if (sun) {
            const sunMove = progress * 1400;
            sun.style.transform = `translateY(${sunMove}px)`;
            sun.style.opacity = Math.max(0, 1 - (progress * 1.8));
        }

        // 3. Stars Visibility (Smoother appearance, complete by progress = 0.6)
        if (stars) {
            const starStart = 0.25; // Reverts to a later start
            const starEnd = 0.6;    // Reverts to a later completion
            let starOpacity = (progress - starStart) / (starEnd - starStart);
            stars.style.opacity = Math.max(0, Math.min(1, starOpacity));
        }
    }

    window.addEventListener('scroll', scrollEffect);
    scrollEffect(); // Initial call

    // MUSIC PLAYER LOGIC
    const musicBtn = document.getElementById('v-music-toggle');
    const audio = document.getElementById('v-audio-bg');

    if (musicBtn && audio) {
        musicBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play()
                    .then(() => {
                        musicBtn.classList.add('playing');
                        musicBtn.querySelector('i').className = 'fa-solid fa-pause';
                    })
                    .catch(err => {
                        console.error("Audio block:", err);
                        alert("Por favor, interactúa con la página para reproducir música.");
                    });
            } else {
                audio.pause();
                musicBtn.classList.remove('playing');
                musicBtn.querySelector('i').className = 'fa-solid fa-music';
            }
        });
    }

    // Dynamic Guest Spaces Logic
    function updateGuestSpaces() {
        const urlParams = new URLSearchParams(window.location.search);
        const count = urlParams.get('i'); // Parameter 'i' for spaces
        const countEl = document.getElementById('v-guest-count');
        const textEl = document.getElementById('v-guest-text');

        if (count && countEl && textEl) {
            const num = parseInt(count);
            if (!isNaN(num) && num > 0) {
                countEl.innerText = num;
                textEl.innerText = num === 1 ? 'espacio' : 'espacios';
            }
        }
    }
    updateGuestSpaces();

    // RSVP Conditional Logic & Validation
    const asistenciaSelect = document.getElementById('asistencia');
    const wrapCantidad = document.getElementById('wrap-cantidad');
    const cantidadInput = document.getElementById('cantidad');
    
    if (asistenciaSelect && wrapCantidad && cantidadInput) {
        const urlParams = new URLSearchParams(window.location.search);
        const maxGuests = parseInt(urlParams.get('i')) || 1;

        asistenciaSelect.addEventListener('change', (e) => {
            // Only show 'How many' if they are coming AND they have more than 1 space
            if (e.target.value === 'Si' && maxGuests > 1) {
                wrapCantidad.style.display = 'block';
                cantidadInput.required = true;
                cantidadInput.max = maxGuests;
            } else {
                wrapCantidad.style.display = 'none';
                cantidadInput.required = false;
                cantidadInput.value = '';
            }
        });

        // Validation for max guests
        cantidadInput.addEventListener('change', () => {
            if (parseInt(cantidadInput.value) > maxGuests) {
                alert(`El límite de invitados para tu invitación es de ${maxGuests} personas.`);
                cantidadInput.value = maxGuests;
            }
        });
    }
});
