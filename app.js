/* Local business UI review. Display-only states; no analytical calculation. */
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
let manualReduce=false;
const canvas=document.querySelector('.analytical-canvas');
const field=canvas.querySelector('.canvas-field');
const states=[['40,187','captured records'],['SCOPE / SOURCE / TEXT','organise the evidence'],['27,482','English analytical records'],['Selected indicators','not comprehensive topic modelling']];
let active=0,leaveTimer;
function setCanvas(n){
 active=n;canvas.dataset.state=String(n);canvas.querySelector('.canvas-decision').setAttribute('aria-hidden',String(n!==3));
 canvas.querySelectorAll('[data-canvas-state]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.canvasState)===n)));
 document.querySelector('#canvas-value').textContent=states[n][0];document.querySelector('#canvas-caption').textContent=states[n][1];
}
function syncMotion(){const off=manualReduce||reduce.matches;document.documentElement.classList.toggle('reduce-motion',off);const b=document.querySelector('#motion');b.textContent=off?'MOTION · OFF':'MOTION · ON';b.setAttribute('aria-pressed',String(off));if(off)setCanvas(3);}
reduce.addEventListener('change',syncMotion);document.querySelector('#motion').addEventListener('click',()=>{manualReduce=!manualReduce;syncMotion()});syncMotion();
field.addEventListener('pointermove',e=>{if(e.pointerType==='touch'||manualReduce||reduce.matches)return;clearTimeout(leaveTimer);const rect=field.getBoundingClientRect();const n=Math.min(3,Math.max(0,Math.floor((e.clientX-rect.left)/rect.width*4)));if(n!==active)setCanvas(n)});
canvas.addEventListener('pointerleave',()=>{if(manualReduce||reduce.matches)return;leaveTimer=setTimeout(()=>setCanvas(0),160)});
canvas.querySelectorAll('[data-canvas-state]').forEach(b=>{b.addEventListener('click',()=>{clearTimeout(leaveTimer);setCanvas(Number(b.dataset.canvasState))});b.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();const n=e.key==='Home'?0:e.key==='End'?3:(active+(e.key==='ArrowRight'?1:3))%4;setCanvas(n);canvas.querySelector(`[data-canvas-state="${n}"]`).focus()})});
field.addEventListener('click',e=>{if(e.pointerType==='touch')setCanvas((active+1)%4)});
const rules={location:'Location → use context supplied in the source; do not invent a place.',emotion:'Framing → vary expression while keeping supplied facts intact.',practical:'Practical detail → surface information already supplied; do not add unsupported facts.'};
const headline=document.querySelector('.headline-object');
function highlightFragment(key){headline.dataset.highlight=key;headline.querySelectorAll('[data-fragment]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.fragment===key)));}
highlightFragment('location');
function selectRule(button){document.querySelectorAll('[data-rule]').forEach(x=>x.setAttribute('aria-pressed',String(x===button)));document.querySelector('#rule-readout').textContent=rules[button.dataset.rule];highlightFragment(button.dataset.rule);}
document.querySelectorAll('[data-rule]').forEach(button=>['click','focus','pointerenter'].forEach(event=>button.addEventListener(event,()=>selectRule(button))));
document.querySelectorAll('[data-fragment]').forEach(button=>['click','focus','pointerenter'].forEach(event=>button.addEventListener(event,()=>{highlightFragment(button.dataset.fragment);})));
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.classList.add('results-entered');observer.unobserve(entry.target)}),{threshold:.18});document.querySelectorAll('[data-result-reveal]').forEach(el=>observer.observe(el));}

// Territories connect the supplied observation, synthesis and applied rule; no generated data.
document.querySelectorAll('[data-territory]').forEach(territory=>['focus','pointerenter'].forEach(event=>territory.addEventListener(event,()=>{document.querySelectorAll('[data-territory]').forEach(x=>x.classList.toggle('territory-active',x===territory));const button=document.querySelector('[data-rule="'+territory.dataset.territory+'"]');if(button)selectRule(button);})));
