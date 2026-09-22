/* Homepage presentation only; analytical values remain locked. */
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
let manualReduce=false;
function syncMotion(){document.documentElement.classList.toggle('reduce-motion',manualReduce||reduce.matches);document.querySelector('#motion').textContent=(manualReduce||reduce.matches)?'MOTION · OFF':'MOTION · ON';document.querySelector('#motion').setAttribute('aria-pressed',String(manualReduce||reduce.matches));}
syncMotion();reduce.addEventListener('change',syncMotion);document.querySelector('#motion').addEventListener('click',()=>{manualReduce=!manualReduce;syncMotion()});

// Replay once per deliberate interaction; coalesce focus and click from one gesture.
const signal=document.querySelector('.signal-object');
let lastReplay=-Infinity;
function replaySignal(){
 if(manualReduce||reduce.matches||performance.now()-lastReplay<250)return;
 lastReplay=performance.now();
 signal.classList.remove('signal-rest');signal.classList.add('signal-active');
 const marks=signal.querySelectorAll('rect');
 marks.forEach(mark=>mark.style.animation='none');
 void signal.offsetWidth;
 marks.forEach(mark=>mark.style.animation='');
}
signal.addEventListener('pointerenter',event=>{if(event.pointerType!=='touch')replaySignal()});
signal.addEventListener('focus',replaySignal);
signal.addEventListener('click',replaySignal);

// Reveal the result structure once on entry; essential evidence is visible without JS.
if ('IntersectionObserver' in window) {
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  if(!manualReduce&&!reduce.matches)entry.target.classList.add('results-entered');
  observer.unobserve(entry.target);
 }),{threshold:0.18});
 document.querySelectorAll('[data-result-reveal]').forEach(el=>observer.observe(el));
}

// Return to a lightly unstructured resting state; replay on the next entry.
signal.addEventListener('pointerleave',()=>{if(manualReduce||reduce.matches)return;signal.classList.remove('signal-active');signal.classList.add('signal-rest');lastReplay=-Infinity;});
signal.addEventListener('blur',()=>{if(manualReduce||reduce.matches)return;signal.classList.remove('signal-active');signal.classList.add('signal-rest');lastReplay=-Infinity;});
