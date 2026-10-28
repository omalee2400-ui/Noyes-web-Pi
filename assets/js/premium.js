document.addEventListener('DOMContentLoaded',()=>{
 if(window.lucide)lucide.createIcons();
 const btn=document.getElementById('menuToggle'),nav=document.getElementById('siteNav');
 btn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));});
 nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');btn?.setAttribute('aria-expanded','false')}));
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const format=(el,val)=>`${el.dataset.prefix||''}${Number(val).toFixed(Number(el.dataset.decimals||0))}${el.dataset.suffix||''}`;
 const animateCount=el=>{if(el.dataset.done)return;el.dataset.done='1';const end=Number(el.dataset.count);if(reduced){el.textContent=format(el,end);return}const start=performance.now(),duration=1800;function tick(now){let p=Math.min((now-start)/duration,1);p=1-Math.pow(1-p,3);el.textContent=format(el,end*p);if(p<1)requestAnimationFrame(tick)}el.textContent=format(el,0);requestAnimationFrame(tick)};
 if(!('IntersectionObserver' in window)){document.querySelectorAll('.reveal').forEach(x=>x.classList.add('visible'));document.querySelectorAll('[data-count]').forEach(animateCount);return}
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');if(e.target.matches('[data-count]'))animateCount(e.target);e.target.querySelectorAll?.('[data-count]').forEach(animateCount);observer.unobserve(e.target)}}),{threshold:.14});
 document.querySelectorAll('.reveal,.stat').forEach(el=>observer.observe(el));
});
