// Enregistrement des plugins GSAP
gsap.registerPlugin(ScrollTrigger);

// 1. INITIALISATION DE LENIS (SMOOTH SCROLL)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. CUSTOM CURSOR
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
});

// Hover effects
document.querySelectorAll('a, .menu-btn, .founder-card, .partner-logo, .partner-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.backgroundColor = 'rgba(196, 176, 133, 0.1)';
        cursorOutline.style.borderColor = 'transparent';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorOutline.style.borderColor = 'rgba(255,255,255,0.3)';
    });
});

// 3. LOADER CINÉMATIQUE
const tlLoader = gsap.timeline();
tlLoader
    .to('.loader-progress', { width: '100%', duration: 1.5, ease: 'power2.inOut' })
    .to('.loader', { y: '-100%', duration: 1, ease: 'power4.inOut', delay: 0.2 })
    .from('.hero-video', { scale: 1.3, duration: 1.5, ease: 'power2.out' }, "-=0.8")
    .to('.anim-title', { y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }, "-=0.5")
    .to('.anim-text', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, "-=0.8");

// 4. TEXT REVEAL (VOCATION) - CORRIGÉ (Plus rapide)
const text = new SplitType('#manifesto-text', { types: 'words, chars' });
gsap.from(text.chars, {
    scrollTrigger: {
        trigger: '.manifesto',
        start: 'top 80%',
        end: 'bottom 60%', // Fin de l'animation plus tôt pour éviter le retard
        scrub: true,
    },
    opacity: 0.1,
    stagger: 0.1,
    color: '#001F2B'
});

// 5. HORIZONTAL SCROLL
let sections = gsap.utils.toArray(".panel");
gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
        trigger: ".horizontal-section",
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + document.querySelector(".horizontal-section").offsetWidth
    }
});

// 6. ARCHITECTURE PARALLAX
gsap.to('.parallax-img img', {
    y: '-20%',
    scrollTrigger: {
        trigger: '.architecture',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    }
});

// 7. GENERAL REVEAL UP
gsap.utils.toArray('.reveal-up').forEach(elem => {
    gsap.to(elem, {
        scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// 8. MENU BURGER LOGIC
const menuBtn = document.getElementById('toggle-btn');
const navOverlay = document.querySelector('.nav-overlay');
const navLinks = document.querySelector('.nav-menu-links');
const navItems = document.querySelectorAll('.nav-item');
let isMenuOpen = false;

menuBtn.addEventListener('click', () => {
    if (!isMenuOpen) {
        // Open Menu
        gsap.to(navOverlay, { width: '100%', duration: 0.8, ease: 'power4.inOut' });
        gsap.to(navLinks, { opacity: 1, duration: 0.5, delay: 0.5 });
        gsap.from(navItems, { 
            x: 50, 
            opacity: 0, 
            duration: 0.5, 
            stagger: 0.1, 
            delay: 0.4, 
            ease: 'power2.out' 
        });
        document.querySelector('.menu-text').textContent = "FERMER";
    } else {
        // Close Menu
        gsap.to(navOverlay, { width: '0%', duration: 0.8, ease: 'power4.inOut', delay: 0.2 });
        gsap.to(navLinks, { opacity: 0, duration: 0.3 });
        document.querySelector('.menu-text').textContent = "MENU";
    }
    isMenuOpen = !isMenuOpen;
});

// Fermer le menu quand on clique sur un lien
navItems.forEach(item => {
    item.addEventListener('click', () => {
        gsap.to(navOverlay, { width: '0%', duration: 0.8, ease: 'power4.inOut', delay: 0.2 });
        gsap.to(navLinks, { opacity: 0, duration: 0.3 });
        document.querySelector('.menu-text').textContent = "MENU";
        isMenuOpen = false;
    });
});
