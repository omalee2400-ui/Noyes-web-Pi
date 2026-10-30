(() => {
 'use strict';
 const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if ('IntersectionObserver' in window && !reduced) document.documentElement.classList.add('js-motion');
 document.addEventListener('DOMContentLoaded', () => {
  if(window.lucide)window.lucide.createIcons();
  const btn=document.getElementById('menuToggle');
  const nav=document.getElementById('siteNav');
  btn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));});
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');btn?.setAttribute('aria-expanded','false');}));
  // Close expanded navigation with Escape, on outside taps, and on desktop resize.
  document.addEventListener('keydown',e=>{if(e.key==='Escape' && nav?.classList.contains('open')) {nav.classList.remove('open');btn?.setAttribute('aria-expanded','false');btn?.focus();}});
  document.addEventListener('pointerdown',e=>{if(nav?.classList.contains('open') && !nav.contains(e.target) && !btn?.contains(e.target)){nav.classList.remove('open');btn?.setAttribute('aria-expanded','false');}});
  window.addEventListener('resize',()=>{if(window.innerWidth>760 && nav?.classList.contains('open')){nav.classList.remove('open');btn?.setAttribute('aria-expanded','false');}},{passive:true});
  // Do not cover the final contact CTA or the footer with the mobile sticky button.
  const mobileBar=document.querySelector('.mobile-action-bar');
  if(mobileBar && 'IntersectionObserver' in window){
    const visible=new Set();
    const toggle=()=>mobileBar.classList.toggle('is-hidden',visible.size>0);
    const barObserver=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting)visible.add(e.target);else visible.delete(e.target);}toggle();},{threshold:.08});
    document.querySelectorAll('#contacto, footer').forEach(el=>barObserver.observe(el));
  }
  const progress=document.getElementById('progress-bar');

  const number=(el,value)=>`${el.dataset.prefix||''}${Number(value).toFixed(Number(el.dataset.decimals||0))}${el.dataset.suffix||''}`;
  const money=(amount)=>'$'+Math.round(amount).toLocaleString('en-US');
  const tween=(el,value,formatter)=>{
    if(el.dataset.counted)return;
    el.dataset.counted='1';
    const original=el.textContent;
    if(reduced || !Number.isFinite(value)){el.textContent=original;return;}
    const start=performance.now(),duration=1300;
    function frame(now){
      const t=Math.min(1,(now-start)/duration);
      const eased=1-Math.pow(1-t,3);
      el.textContent=formatter(value*eased);
      if(t<1)requestAnimationFrame(frame);else el.textContent=original;
    }
    el.textContent=formatter(0);
    requestAnimationFrame(frame);
  };
  const animateInside=el=>{
    el.querySelectorAll('[data-count]').forEach(n=>tween(n,Number(n.dataset.count),v=>number(n,v)));
    if(el.matches('[data-count]'))tween(el,Number(el.dataset.count),v=>number(el,v));
    el.querySelectorAll('[data-money]').forEach(n=>tween(n,Number(n.dataset.money),money));
    if(el.matches('[data-money]'))tween(el,Number(el.dataset.money),money);
  };
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(!e.isIntersecting)return; e.target.classList.add('visible');animateInside(e.target);observer.unobserve(e.target);});
    },{threshold:.12,rootMargin:'0px 0px 30px 0px'});
    document.querySelectorAll('.reveal,.stat,.case-card').forEach(el=>observer.observe(el));
  }else{
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
    document.querySelectorAll('.stat,.case-card').forEach(animateInside);
  }
  const track=document.getElementById('testimonialTrack');
  if(track){
    const prev=document.querySelector('[data-carousel="prev"]'),next=document.querySelector('[data-carousel="next"]'),status=document.querySelector('.carousel-status');
    const cards=Array.from(track.querySelectorAll('.testimonial-card'));
    const perView=()=>window.innerWidth<=760?1:window.innerWidth<=990?2:3;
    const gap=()=>parseFloat(getComputedStyle(track).columnGap)||20;
    const current=()=>Math.max(0,Math.round(track.scrollLeft/(cards[0].getBoundingClientRect().width+gap())));
    const update=()=>{
      const index=current(),per=perView();
      if(prev)prev.disabled=index<=0;
      if(next)next.disabled=index>=cards.length-per;
      if(status)status.textContent=`${index+1}–${Math.min(cards.length,index+per)} / ${cards.length}`;
    };
    const go=dir=>{
      const index=Math.min(Math.max(0,current()+dir),cards.length-perView());
      track.scrollTo({left:cards[index].offsetLeft-cards[0].offsetLeft,behavior:reduced?'instant':'smooth'});
      window.setTimeout(update,400);
    };
    prev?.addEventListener('click',()=>go(-1));next?.addEventListener('click',()=>go(1));
    track.addEventListener('scroll',()=>requestAnimationFrame(update),{passive:true});
    track.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();go(e.key==='ArrowLeft'?-1:1);}});
    window.addEventListener('resize',update,{passive:true});update();
  }
 });
})();
