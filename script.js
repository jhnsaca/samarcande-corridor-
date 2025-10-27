// script.js - interactions and reduced-motion support
document.addEventListener('DOMContentLoaded', function(){
  const progress = document.getElementById('timeline-progress');
  const stageLabels = document.querySelectorAll('.stages div');
  if(stageLabels && progress){
    const stages = [0,25,60,100];
    stageLabels.forEach((el,i)=>{ el.style.cursor='pointer'; el.addEventListener('click', ()=>{ progress.style.width = stages[i] + '%'; }); });
  }
  // Netlify form submission handled by Netlify: do not block default submit
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelectorAll('animate').forEach(a=>a.remove());
  }
});
