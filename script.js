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

    // Dot suit instantanément
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline suit avec un délai (effet magnétique)
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Effet hover sur les liens
document.querySelectorAll('a, .menu-btn, .expertise-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.backgroundColor = 'rgba(255,255,255,0.1)';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.backgroundColor = 'transparent';
    });
});

// 3. LOADER CINÉMATIQUE
const tlLoader = gsap.timeline();

tlLoader
    .to('.loader-progress', {
        width: '100%',
        duration: 2,
        ease: 'power2.inOut',
        onUpdate: function() {
            // Compteur de 0 à 100
            const progress = Math.round(this.progress() * 100);
            document.querySelector('.loader-counter').textContent = progress + '%';
        }
    })
    .to('.loader', {
        y: '-100%',
        duration: 1,
        ease: 'power4.inOut',
        delay: 0.2
    })
    .from('.hero-video', {
        scale: 1.5,
        duration: 1.5,
        ease: 'power2.out'
    }, "-=0.8")
    .to('.anim-title', {
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    }, "-=0.5")
    .to('.anim-text', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    }, "-=0.8");


// 4. ANIMATION HERO PARALLAX
gsap.to('.hero-video', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    y: '30%' // La vidéo descend moins vite que le scroll
});

// 5. TEXT REVEAL (MANIFESTO)
// On sépare le texte en mots/caractères
const text = new SplitType('#manifesto-text', { types: 'words, chars' });

gsap.from(text.chars, {
    scrollTrigger: {
        trigger: '.manifesto',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
    },
    opacity: 0.1,
    stagger: 0.1,
    color: '#333'
});

// 6. HORIZONTAL SCROLL
let sections = gsap.utils.toArray(".panel");

gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
        trigger: ".horizontal-section",
        pin: true, // Épingle la section
        scrub: 1, // Lie l'animation au scroll
        snap: 1 / (sections.length - 1),
        end: () => "+=" + document.querySelector(".horizontal-section").offsetWidth
    }
});

// 7. FOOTER REVEAL
gsap.from('.footer-cta', {
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 70%',
    },
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});