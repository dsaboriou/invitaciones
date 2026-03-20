document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve if you only want the animation once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const slides = document.querySelectorAll('.text-content');
    slides.forEach(slide => {
        observer.observe(slide);
    });

    // Petals initialization
    createPetals();

    // Cinematic Falling Petals Generator
    function createPetals() {
        const container = document.getElementById('petals-container');
        if (!container) return;
        
        const petalCount = 35; // Elegant, not overwhelming Amount
        
        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            
            // Random petal image (1 to 4)
            const petalType = Math.floor(Math.random() * 4) + 1;
            petal.style.backgroundImage = `url('assets/images/petalo${petalType}.png')`;
            
            // Random starting X position
            petal.style.setProperty('--left', `${Math.random() * 100}vw`);
            
            // Random scaling for depth perspective
            const scale = Math.random() * 0.8 + 0.4; // 0.4 to 1.2
            petal.style.setProperty('--scale', scale);
            
            // Depth of field blur: smaller (further) or very large (very close) get blurred
            if (scale < 0.6) {
                petal.style.filter = 'blur(1.5px)';
            } else if (scale > 1.0) {
                petal.style.filter = 'blur(2px)';
            }
            
            // Fall physics
            petal.style.setProperty('--opacity', Math.random() * 0.4 + 0.5);
            petal.style.setProperty('--fall-duration', `${Math.random() * 8 + 8}s`); // 8s to 16s fall time
            petal.style.setProperty('--fall-delay', `${Math.random() * -16}s`); // Negative delay to start mid-animation
            
            // Cinematic 3D tumble logic
            petal.style.setProperty('--sway', `${(Math.random() * 80) - 40}px`); // Drift left or right
            petal.style.setProperty('--rx', Math.random());
            petal.style.setProperty('--ry', Math.random());
            petal.style.setProperty('--rz', Math.random());
            petal.style.setProperty('--rotation', `${(Math.random() * 1080) + 360}deg`); // Multi-spin
            
            container.appendChild(petal);
        }
    }

    // Initialize petals
    createPetals();
});
