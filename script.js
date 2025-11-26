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

// 2. NAVBAR SCROLL EFFECT (Glassmorphism)
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 3. LOADER CINÉMATIQUE
const tlLoader = gsap.timeline();
tlLoader
    .to('.loader-progress', {
        width: '100%', duration: 1.5, ease: 'power2.inOut',
        onUpdate: function() {
            const progress = Math.round(this.progress() * 100);
            const counter = document.querySelector('.loader-counter');
            if(counter) counter.textContent = progress + '%';
        }
    })
    .to('.loader', { y: '-100%', duration: 1, ease: 'power4.inOut', delay: 0.2 })
    .from('.hero-video', { scale: 1.3, duration: 1.5, ease: 'power2.out' }, "-=0.8")
    .to('.anim-title, .hero-label .anim-text', { y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }, "-=0.5")
    .to('.hero-desc.anim-text', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, "-=0.8");

// 4. TEXT REVEAL (VOCATION)
const text = new SplitType('#manifesto-text', { types: 'words, chars' });
gsap.from(text.chars, {
    scrollTrigger: { trigger: '.manifesto', start: 'top 85%', end: 'center center', scrub: true },
    opacity: 0.1, stagger: 0.1, color: '#001F2B'
});

// 5. HORIZONTAL SCROLL (Ajusté pour 70vw)
let sections = gsap.utils.toArray(".panel");
let scrollContainer = document.querySelector(".horizontal-wrapper");

gsap.to(sections, {
    xPercent: -100 * (sections.length - 1), // On déplace toujours les éléments
    ease: "none",
    scrollTrigger: {
        trigger: ".horizontal-section",
        pin: true,
        scrub: 1.5,
        // Calcul dynamique : Largeur totale du contenu - Largeur de la fenêtre
        end: () => "+=" + (scrollContainer.scrollWidth - window.innerWidth),
        invalidateOnRefresh: true,
        anticipatePin: 1
    }
});

// 6. ARCHITECTURE PARALLAX
gsap.to('.parallax-img img', {
    y: '-20%',
    scrollTrigger: { trigger: '.architecture', start: 'top bottom', end: 'bottom top', scrub: true }
});

// 7. GENERAL REVEAL UP
gsap.utils.toArray('.reveal-up').forEach(elem => {
    gsap.to(elem, {
        scrollTrigger: { trigger: elem, start: 'top 85%' },
        opacity: 1, y: 0, duration: 1, ease: 'power3.out'
    });
});

// 8. MENU SIDEBAR LOGIC
const menuBtn = document.getElementById('toggle-btn');
const navSidebar = document.querySelector('.nav-sidebar');
const menuBackdrop = document.querySelector('.menu-backdrop');
const navItems = document.querySelectorAll('.nav-item');
let isMenuOpen = false;

function toggleMenu() {
    if (!isMenuOpen) {
        gsap.to(navSidebar, { x: '0%', duration: 0.8, ease: 'power4.inOut' });
        gsap.to(menuBackdrop, { opacity: 1, pointerEvents: 'all', duration: 0.5 });
        gsap.fromTo(navItems, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3, ease: 'power2.out' });
        document.querySelector('.menu-text').textContent = currentLang === 'fr' ? "FERMER" : "CLOSE";
    } else {
        gsap.to(navSidebar, { x: '100%', duration: 0.8, ease: 'power4.inOut' });
        gsap.to(menuBackdrop, { opacity: 0, pointerEvents: 'none', duration: 0.5 });
        document.querySelector('.menu-text').textContent = "MENU";
    }
    isMenuOpen = !isMenuOpen;
}
menuBtn.addEventListener('click', toggleMenu);
menuBackdrop.addEventListener('click', toggleMenu);
navItems.forEach(item => { item.addEventListener('click', () => { if(isMenuOpen) toggleMenu(); }); });

// 9. GESTION DES LANGUES (FR/EN)
const translations = {
    fr: {
        "menu": "MENU",
        "hero-loc": "MARSEILLE • LYON • PARIS",
        "explore": "EXPLORER",
        "hero-desc": "Relier les territoires.<br>Valoriser Marseille Méditerranée.",
        "vocation-label": "NOTRE VOCATION",
        "vocation-text": "Le Samarcande Corridor s’est donné comme ambition de relier <span class='highlight'>Marseille, Lyon et Paris</span>. Une vision nationale de la commercialité et de la circularité, tournée vers l'Europe et l'International.",
        "vocation-quote": "\"Au service de l’intelligence collective, du dialogue et de l’action avec les territoires.\"",
        "panel1": "Porte d'entrée des flux mondiaux. L'interface stratégique entre la mer et le continent.",
        "panel2": "Le poumon industriel. Un hub de transformation et de redistribution au cœur de l'axe rhodanien.",
        "panel3": "Le centre de consommation connecté. Le point d'ancrage vers les marchés du Nord et l'international.",
        "arch-label": "DESIGN & MATIÈRE",
        "arch-title": "L'EAU ET LA LUMIÈRE",
        "arch-text": "Des architectures dont le design est inspiré par la Méditerranée. Nous concevons des bâtiments en béton durables, qui s'intègrent harmonieusement dans leur environnement.",
        "enr-title": "UNE LOGISTIQUE AU SERVICE<br>DU CLIMAT",
        "enr-text": "Décarbonation massive, production photovoltaïque et multimodalité.",
        "enr-stat1": "Énergies Renouvelables",
        "enr-stat2": "Neutralité Carbone",
        "founders": "FONDATEURS",
        "role1": "Investissement & Stratégie",
        "role2": "Foncier & Énergie",
        "partners": "PARTENAIRES TERRITORIAUX",
        "cci-desc": "Un accompagnement stratégique et engagé pour le développement économique du territoire.",
        "contact-title": "NOUS<br>CONTACTER"
    },
    en: {
        "menu": "MENU",
        "hero-loc": "MARSEILLE • LYON • PARIS",
        "explore": "EXPLORE",
        "hero-desc": "Connecting territories.<br>Enhancing Marseille Mediterranean.",
        "vocation-label": "OUR VOCATION",
        "vocation-text": "Samarcande Corridor aims to connect <span class='highlight'>Marseille, Lyon and Paris</span>. A national vision of commerciality and circularity, facing Europe and the World.",
        "vocation-quote": "\"Serving collective intelligence, dialogue, and action with territories.\"",
        "panel1": "Gateway to global flows. The strategic interface between the sea and the continent.",
        "panel2": "The industrial lung. A hub of transformation and redistribution at the heart of the Rhone axis.",
        "panel3": "The connected consumption center. The anchor point to Northern markets and international trade.",
        "arch-label": "DESIGN & MATTER",
        "arch-title": "WATER AND LIGHT",
        "arch-text": "Architectures inspired by the Mediterranean. We design sustainable concrete buildings that blend harmoniously into their environment.",
        "enr-title": "LOGISTICS SERVING<br>THE CLIMATE",
        "enr-text": "Massive decarbonization, photovoltaic production, and multimodality.",
        "enr-stat1": "Renewable Energies",
        "enr-stat2": "Carbon Neutrality",
        "founders": "FOUNDERS",
        "role1": "Investment & Strategy",
        "role2": "Land & Energy",
        "partners": "TERRITORIAL PARTNERS",
        "cci-desc": "Strategic and committed support for the economic development of the territory.",
        "contact-title": "CONTACT<br>US"
    }
};

let currentLang = 'fr';
const btnFr = document.getElementById('btn-fr');
const btnEn = document.getElementById('btn-en');

function setLanguage(lang) {
    currentLang = lang;
    
    // Update buttons
    if(lang === 'fr') {
        btnFr.classList.add('active');
        btnEn.classList.remove('active');
    } else {
        btnEn.classList.add('active');
        btnFr.classList.remove('active');
    }

    // Update Text Content
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if(translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Re-run SplitType for animations if needed (optional optimization)
}

btnFr.addEventListener('click', () => setLanguage('fr'));
btnEn.addEventListener('click', () => setLanguage('en'));

// --- FORCER LA LECTURE VIDÉO ---
window.addEventListener('load', () => {
    const video = document.getElementById('heroVideo');
    if (video) {
        video.muted = true; 
        video.play().catch(error => { console.log("Autoplay blocked"); });
    }
});
