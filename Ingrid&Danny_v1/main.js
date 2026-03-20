// Countdown logic
const countdownDate = new Date("May 23, 2026 17:00:00").getTime();

const updateCountdown = setInterval(function() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  // Time calculations
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update elements
  document.getElementById("days").innerText = days < 10 ? "0" + days : days;
  document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

  if (distance < 0) {
    clearInterval(updateCountdown);
    document.querySelector(".countdown-container").innerHTML = "<h3>¡Estamos de celebración!</h3>";
  }
}, 1000);

// Reveal sections on scroll
const revealSections = () => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, {
        threshold: 0.1 // Reveal when 10% of the element is visible
    });

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
};

// Cinematic Falling Petals Animation
class CinematicPetal {
    constructor(container) {
        this.container = container;
        this.element = document.createElement('div');
        this.element.className = 'cinematic-petal';
        
        this.inner = document.createElement('div');
        this.inner.className = 'cinematic-petal-inner';
        this.element.appendChild(this.inner);
        
        this.container.appendChild(this.element);
        
        this.reset(true);
    }
    
    reset(prewarm = false) {
        this.containerHeight = this.container.clientHeight || window.innerHeight;
        this.containerWidth = this.container.clientWidth || window.innerWidth;

        // Depth: 0.3 to 2.5 for strong depth of field effect
        this.z = Math.random() * 2.2 + 0.3; 
        
        const distFromFocus = Math.abs(this.z - 1.2);
        // Elements further from focus are blurrier
        const blurAmount = Math.max(0, (distFromFocus - 0.3) * 3);
        // Elements further from focus have slightly less opacity
        const opacity = Math.max(0.3, 1 - (distFromFocus * 0.25));
        
        // Base size is around 18px
        this.size = 18 * this.z;
        
        this.element.style.width = `${this.size}px`;
        this.element.style.height = `${this.size}px`;
        this.element.style.filter = `blur(${blurAmount}px)`;
        this.element.style.opacity = opacity;
        
        this.x = Math.random() * this.containerWidth;
        this.baseY = prewarm ? Math.random() * this.containerHeight : -this.size - (Math.random() * 100);
        this.y = this.baseY;
        
        // Base downward velocity based on depth
        this.vy = (Math.random() * 0.4 + 0.15) * this.z; 
        this.vx = (Math.random() - 0.5) * 0.3;
        
        // Sway parameters
        this.swaySpeed = Math.random() * 0.01 + 0.005;
        this.swayAmount = (Math.random() * 30 + 10) * this.z;
        this.time = Math.random() * Math.PI * 2;
        
        // 3D Rotations
        this.rotX = Math.random() * 360;
        this.rotY = Math.random() * 360;
        this.rotZ = Math.random() * 360;
        
        // Rotation speeds
        this.rotSpeedX = (Math.random() - 0.5) * 1.5;
        this.rotSpeedY = (Math.random() - 0.5) * 1.5;
        this.rotSpeedZ = (Math.random() - 0.5) * 0.8;
        
        this.updateTransform();
    }
    
    update(dtScale) {
        this.time += this.swaySpeed * dtScale;
        this.y += this.vy * dtScale;
        this.x += this.vx * dtScale;
        
        this.rotX += this.rotSpeedX * dtScale;
        this.rotY += this.rotSpeedY * dtScale;
        this.rotZ += this.rotSpeedZ * dtScale;
        
        if (this.y > this.containerHeight + this.size + 20) {
            this.reset();
        }
        
        this.updateTransform();
    }
    
    updateTransform() {
        const currentX = this.x + Math.sin(this.time) * this.swayAmount;
        this.element.style.transform = `translate3d(${currentX}px, ${this.y}px, 0)`;
        this.inner.style.transform = `rotateX(${this.rotX}deg) rotateY(${this.rotY}deg) rotateZ(${this.rotZ}deg)`;
    }
}

const startPetalRain = () => {
    const container = document.getElementById('petals-container');
    if (!container) return;

    const petals = [];
    const numPetals = 45; // Cinematic density
    
    for (let i = 0; i < numPetals; i++) {
        petals.push(new CinematicPetal(container));
    }
    
    let lastTime = performance.now();
    
    const animate = (time) => {
        const deltaTime = time - lastTime;
        lastTime = time;
        
        // Cap dtScale to prevent huge jumps if tab is inactive
        const dtScale = Math.min(deltaTime / 16.66, 3);
        
        petals.forEach(petal => petal.update(dtScale));
        
        requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
};

const handleMusic = () => {
    const musicBtn = document.getElementById('music-btn');
    const audio = document.getElementById('bg-music');
    
    if (!musicBtn || !audio) return;
    
    musicBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            musicBtn.classList.add('playing');
        } else {
            audio.pause();
            musicBtn.classList.remove('playing');
        }
    });
};

const handleRSVP = () => {
    const form = document.getElementById('formulario-rsvp');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = document.getElementById('btn-enviar');
        const msg = document.getElementById('mensaje-exito');
        if (!btn || !msg) return;

        btn.disabled = true;
        const originalBtnText = btn.innerHTML;
        btn.innerHTML = '<span>Enviando...</span>';
        
        // 1. Usa URLSearchParams para compatibilidad con Google Apps Script
        const formData = new URLSearchParams();
        const orden = [];

        Array.from(this.elements).forEach(el => {
            if (!el.name || el.disabled) return;

            // Verificar si el campo es visible (no oculto por condicionales)
            const wrap = el.closest('.campo-formulario');
            if (!wrap || wrap.style.display !== 'none') {
                formData.append(el.name, el.value);
                
                // 2. Lee el atributo name para el orden (excluyendo sheetId)
                if (el.name !== 'sheetId') {
                    orden.push(el.name);
                }
            }
        });

        // Guardar el orden de las preguntas
        formData.append('ordenPreguntas', orden.join(','));

        // 3. Quita el no-cors para permitir captura de errores
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
            msg.style.display = 'flex';
            msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .catch(err => {
            console.error('Error RSVP:', err);
            alert('Error al enviar. Intenta de nuevo.');
            btn.disabled = false;
            btn.innerHTML = originalBtnText;
        });
    });
};


window.addEventListener("DOMContentLoaded", () => {
    revealSections();
    startPetalRain();
    handleMusic();
    handleRSVP();
});
