// Menu mobile
function initMobileMenu() {
    const nav = document.createElement('nav');
    nav.innerHTML = `
        <ul>
            <li><a href="#accueil">Accueil</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    `;
    nav.style.display = 'none';
    document.body.prepend(nav);

    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    document.body.prepend(menuToggle);

    menuToggle.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    });
}

// Modal d'urgence
function initUrgenceModal() {
    const modal = document.createElement('div');
    modal.id = 'urgenceModal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h3>Numéros d'urgence</h3>
            <ul>
                <li>Police : 17</li>
                <li>Pompiers : 18</li>
                <li>SAMU : 15</li>
                <li>Urgences Mairie : (+221) 33 XXX XX XX</li>
            </ul>
        </div>
    `;
    document.body.appendChild(modal);

    document.querySelector('.urgence-btn').addEventListener('click', () => {
        modal.style.display = 'block';
    });

    modal.querySelector('.close').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Carrousel automatique
function initCarousel() {
    let currentSlide = 0;
    const images = [
        'images/ville1.jpg',
        'images/ville2.jpg',
        'images/ville3.jpg'
    ];

    const heroImage = document.querySelector('.hero-image');
    
    setInterval(() => {
        currentSlide = (currentSlide + 1) % images.length;
        heroImage.style.opacity = 0;
        setTimeout(() => {
            heroImage.src = images[currentSlide];
            heroImage.style.opacity = 1;
        }, 500);
    }, 5000);
}

// Animations au scroll
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s ease-out';
        observer.observe(card);
    });
}

// Gestion du formulaire
function initContactForm() {
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Simulation d'envoi
        console.log('Message envoyé:', data);
        alert('Message reçu! Nous vous répondrons sous 48h.');
        e.target.reset();
    });
}

// Mise à jour des horaires
function updateHoraires() {
    const date = new Date();
    const heures = date.getHours();
    const jour = date.getDay();
    const horaireElement = document.querySelector('.horaires');
    
    const isOpen = (jour >= 1 && jour <= 5) && (heures >= 8 && heures < 16);
    
    if (horaireElement) {
        horaireElement.innerHTML = isOpen 
            ? '🟢 Ouvert maintenant' 
            : '🔴 Fermé - Réouverture demain 8h';
    }
}

// Initialisation globale
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initUrgenceModal();
    initCarousel();
    initScrollAnimations();
    initContactForm();
    
    // Mise à jour initiale et toutes les secondes
    updateHoraires();
    setInterval(updateHoraires, 1000);
});