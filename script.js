document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SCROLL REVEAL ANIMATION
    // Utilisation de l'API Intersection Observer pour la performance
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Jouer l'animation une seule fois
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Déclenche quand 15% de l'élément est visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. NAVBAR STICKY EFFECT
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 18, 26, 0.95)';
            navbar.style.padding = '15px 0';
        } else {
            navbar.style.background = 'rgba(0, 18, 26, 0.8)';
            navbar.style.padding = '20px 0';
        }
    });

    // 3. CAROUSEL AUTOMATIQUE (Section 6)
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 4000; // 4 secondes

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, slideInterval);

    // 4. SMOOTH SCROLL POUR LES ANCRES
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });

    // 5. BURGER MENU TOGGLE
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
});
