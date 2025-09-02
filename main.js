document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile card focus ---
    const isMobile = () => window.innerWidth <= 768;

    if (isMobile()) {
        const cards = document.querySelectorAll('.card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    cards.forEach(card => card.classList.remove('is-focused'));
                    entry.target.classList.add('is-focused');
                }
            });
        }, { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 });
        cards.forEach(card => observer.observe(card));
    }

    // --- Reusable Modal Logic ---
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('.modal-overlay .close-btn');
    const overlays = document.querySelectorAll('.modal-overlay');

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        });
    });

    overlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay);
            }
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal-overlay');
            closeModal(modal);
        });
    });

    function openModal(modal) {
        if (modal == null) return;
        modal.classList.add('is-visible');
    }

    function closeModal(modal) {
        if (modal == null) return;
        modal.classList.remove('is-visible');
    }

    // --- Clock logic ---
    const clockElement = document.getElementById('clock');
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    setInterval(updateClock, 1000);
    updateClock();
});
