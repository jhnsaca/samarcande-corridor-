// script.js — scroll reveal, rail draw animation, small parallax
document.addEventListener('DOMContentLoaded', function(){
  // Intersection reveal
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e => {
      if(e.isIntersecting) e.target.classList.add('is-visible');
    });
  }, {threshold: 0.18});
  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

  // Animate the corridor rail (stroke dash offset)
  const rail = document.querySelector('.rail');
  if(rail){
    const pathLen = rail.getTotalLength ? rail.getTotalLength() : null;
    if(pathLen){
      rail.style.strokeDasharray = pathLen;
      rail.style.strokeDashoffset = pathLen;
      // Draw when hero loads
      setTimeout(()=> {
        rail.style.transition = 'stroke-dashoffset 3.2s ease-out';
        rail.style.strokeDashoffset = '0';
      }, 600);
    }
  }

  // simple parallax on hero mousemove (subtle)
  const hero = document.getElementById('hero');
  if(hero){
    hero.addEventListener('mousemove', (e)=>{
      const rect = hero.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      hero.style.setProperty('--mx', (cx*6).toFixed(2) + 'px');
      hero.style.setProperty('--my', (cy*6).toFixed(2) + 'px');
    });
  }

  // lazy video fallback: if video fails to load, replace with hero image
  const vid = document.getElementById('hero-video');
  vid && vid.addEventListener('error', ()=>{
    const img = document.createElement('img');
    img.src = 'assets/main-site.png';
    img.alt = 'Hero fallback';
    img.style.width='100%';
    img.style.height='100%';
    img.style.objectFit='cover';
    img.style.filter='brightness(0.45) contrast(1.1)';
    vid.parentNode.replaceChild(img, vid);
  });
});
// Mise en valeur douce des citations à l’apparition
document.querySelectorAll('.citation').forEach(el => {
  el.style.opacity = 0;
  el.style.transition = 'opacity 1.4s ease-out';
  setTimeout(() => {
    el.style.opacity = 1;
  }, 800);
});
// --- Apparition animée de la citation du hero ---
document.addEventListener('DOMContentLoaded', () => {
  const citation = document.querySelector('.citation');
  if (citation) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          citation.classList.add('is-visible');
          observer.unobserve(citation);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(citation);
  }
});

