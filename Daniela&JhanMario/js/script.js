function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("visible");
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// Falling Petals Animation
function createPetals() {
    const containers = document.querySelectorAll('.petals-container');
    
    containers.forEach(container => {
        const isSmall = container.classList.contains('small');
        const petalCount = isSmall ? 8 : 25;
        
        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            
            // Random properties (Slower for elegance)
            const size = Math.random() * 20 + 20 + 'px';
            const left = Math.random() * 100 + '%';
            const delay = Math.random() * 15 + 's';
            const duration = Math.random() * 10 + 15 + 's'; // 15s to 25s for falling
            const swayDuration = Math.random() * 4 + 6 + 's'; // 6s to 10s for swaying
            const opacity = Math.random() * 0.5 + 0.3;

            petal.style.width = size;
            petal.style.height = size;
            petal.style.left = left;
            petal.style.animationDelay = delay;
            petal.style.animationDuration = duration + ', ' + swayDuration;
            petal.style.opacity = opacity;

            container.appendChild(petal);
        }
    });
}

// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('July 18, 2026 15:00:00').getTime();
    
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (document.getElementById("days")) {
            document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
            document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;
        }
        
        if (distance < 0) {
            clearInterval(timer);
            const container = document.getElementById("countdown");
            if (container) container.innerHTML = "<p class='wedding-day-msg'>¡Hoy es el gran día!</p>";
        }
    }, 1000);
}

// Initial checks
reveal();
createPetals();
updateCountdown();
checkRsvpDeadline();

// Copy to clipboard with UI feedback
function copyValue(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const originalContent = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Copiado</span>';
        
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = originalContent;
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

// Intersection Observer for scroll persistence and reveals
const observerOptions = {
    threshold: 0.5
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id) {
            localStorage.setItem('lastViewedSection', entry.target.id);
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
});

// Restore scroll position on load
window.addEventListener('load', () => {
    const lastSection = localStorage.getItem('lastViewedSection');
    if (lastSection) {
        const element = document.getElementById(lastSection);
        if (element) {
            element.scrollIntoView({ behavior: 'instant' });
        }
    }
});

// Music Player Logic
const music = document.getElementById('bg-music');
const playPauseBtn = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');

if (playPauseBtn && music) {
    const prevBtn = document.querySelector('.player-btn.prev');
    const nextBtn = document.querySelector('.player-btn.next');

    playPauseBtn.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            playPauseBtn.title = 'Pausar';
        } else {
            music.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            playPauseBtn.title = 'Reproducir';
        }
    });

    if (prevBtn) prevBtn.addEventListener('click', () => music.currentTime = 0);
    if (nextBtn) nextBtn.addEventListener('click', () => music.currentTime = 0);
}

// RSVP Form Logic
const rsvpForm = document.getElementById('formulario-rsvp');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = document.getElementById('btn-enviar');
        const msg = document.getElementById('mensaje-exito');
        const originalBtnText = btn.innerText;
        
        btn.disabled = true;
        btn.innerText = 'Enviando...';
        
        const formData = new URLSearchParams();
        const orden = [];

        Array.from(this.elements).forEach(el => {
            if (!el.name || el.disabled) return;
            const wrap = el.closest('.campo-formulario');
            if (!wrap || wrap.style.display !== 'none') {
                formData.append(el.name, el.value);
                if (el.name !== 'sheetId') {
                    orden.push(el.name);
                }
            }
        });

        formData.append('ordenPreguntas', orden.join(','));

        fetch('https://script.google.com/macros/s/AKfycbx0hTDSsoFhO85qmotKrMJwinD-DpU93UfVqD1SlQhw5_saPLXFkSeAINnd7iuYzB8U/exec', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(res => {
            if (!res.ok) throw new Error('Error en el servidor');
            this.style.display = 'none';
            msg.style.display = 'block';
            msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .catch(err => {
            console.error('Error RSVP:', err);
            alert('Error al enviar. Intenta de nuevo.');
            btn.disabled = false;
            btn.innerText = originalBtnText;
        });
    });
}
// Check RSVP Deadline
function checkRsvpDeadline() {
    const urlParams = new URLSearchParams(window.location.search);
    const version = urlParams.get('v');
    
    let deadlineDateStr = 'May 1, 2026 23:59:59';
    let deadlineDisplayStr = '1 de Mayo';
    
    // Si el parámetro v=2 está en la URL, cambiamos la fecha de confirmación
    if (version === '2') {
        deadlineDateStr = 'June 1, 2026 23:59:59';
        deadlineDisplayStr = '1 de Junio';
    }
    
    // Actualizar el texto en la interfaz si el elemento existe
    const deadlineElement = document.getElementById('fecha-limite');
    if (deadlineElement) {
        deadlineElement.textContent = deadlineDisplayStr;
    }
    
    const deadline = new Date(deadlineDateStr).getTime();
    const now = new Date().getTime();
    const rsvpForm = document.getElementById('formulario-rsvp');
    const expiredMsg = document.getElementById('mensaje-plazo-finalizado');
    
    if (now > deadline) {
        if (rsvpForm) rsvpForm.style.display = 'none';
        if (expiredMsg) expiredMsg.style.display = 'block';
    }
}
