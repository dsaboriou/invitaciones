
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-modal');
    const buttons = document.querySelectorAll('.idea-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', function () {
            const imgSrc = this.getAttribute('data-img');
            modal.style.display = "flex";
            modalImg.src = imgSrc;
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Close on Escape key
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            if (modal.style.display === "flex") modal.style.display = "none";
            if (rsvpModal.style.display === "flex") rsvpModal.style.display = "none";
        }
    });

    // RSVP Modal Logic
    const rsvpBtn = document.getElementById('floating-rsvp');
    const rsvpModal = document.getElementById('rsvpModal');
    const rsvpClose = document.querySelector('.close-modal-rsvp');

    if (rsvpBtn) {
        rsvpBtn.addEventListener('click', () => {
            rsvpModal.style.display = 'flex';
        });
    }

    if (rsvpClose) {
        rsvpClose.addEventListener('click', () => {
            rsvpModal.style.display = 'none';
        });
    }

    if (rsvpModal) {
        rsvpModal.addEventListener('click', (e) => {
            if (e.target === rsvpModal) {
                rsvpModal.style.display = 'none';
            }
        });
    }
});
