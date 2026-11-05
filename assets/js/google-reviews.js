/* Google reviews: accessible scroll carousel, no external scripts or tracking. */
(()=>{
  'use strict';
  document.querySelectorAll('[data-google-review-slider]').forEach(slider=>{
    const track=slider.querySelector('.noyes-review-track');
    const cards=Array.from(track.querySelectorAll('.noyes-review-card'));
    const prev=slider.querySelector('[data-review-prev]');
    const next=slider.querySelector('[data-review-next]');
    if(!cards.length)return;
    const visibleCount=()=>window.matchMedia('(max-width:620px)').matches?1:window.matchMedia('(max-width:990px)').matches?2:3;
    const nearestIndex=()=>{
      const target=track.scrollLeft;
      let best=0,bestDiff=Infinity;
      cards.forEach((card,i)=>{
        const diff=Math.abs(card.offsetLeft-cards[0].offsetLeft-target);
        if(diff<bestDiff){best=i;bestDiff=diff;}
      });
      return Math.min(best,Math.max(0,cards.length-visibleCount()));
    };
    const update=()=>{
      const start=nearestIndex();
      const show=visibleCount();
      prev.disabled=start===0;
      next.disabled=start>=cards.length-show;
    };
    const move=(dir)=>{
      const start=Math.min(Math.max(0,nearestIndex()+dir),Math.max(0,cards.length-visibleCount()));
      const target=cards[start].offsetLeft-cards[0].offsetLeft;
      track.scrollTo({left:target,behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
    };
    prev.addEventListener('click',()=>move(-1));
    next.addEventListener('click',()=>move(1));
    let frame=0;
    track.addEventListener('scroll',()=>{
      if(frame)cancelAnimationFrame(frame);
      frame=requestAnimationFrame(()=>{frame=0;update();});
    },{passive:true});
    window.addEventListener('resize',update,{passive:true});
    update();
  });
})();
