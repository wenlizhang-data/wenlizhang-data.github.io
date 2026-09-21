/* C5 presentation only. All analytical values come from locked C4 aggregates. */
const D=window.P01,S=D.summary;
const fmt=n=>Number(n).toLocaleString('en-GB'),pct=n=>(Number(n)*100).toFixed(2)+'%';
const tones={Negative:'#17191e',Neutral:'#69717c',Positive:'#1647d9'};
const overall=D.sentiment_by_media.filter(r=>r.media==='ALL');
const weights=D.weighting_comparison.filter(r=>r.media==='ALL');
const media=[['AL',3265],['BBC',8020],['CGTN',860],['CNN',13168],['DW',2934],['NBC',3549],['NYT',2055]];
const track=(v,tone,ghost)=>`<div class="track" aria-hidden="true">${ghost===undefined?'':`<u style="--share:${ghost}"></u>`}<i style="--share:${v};--tone:${tone}"></i></div>`;
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
let manualReduce=false;
function syncMotion(){document.documentElement.classList.toggle('reduce-motion',manualReduce||reduce.matches);document.querySelector('#motion').textContent=(manualReduce||reduce.matches)?'MOTION · OFF':'MOTION · ON';document.querySelector('#motion').setAttribute('aria-pressed',String(manualReduce||reduce.matches));}
syncMotion();reduce.addEventListener('change',syncMotion);document.querySelector('#motion').addEventListener('click',()=>{manualReduce=!manualReduce;syncMotion()});
const stages=[['CAPTURED RECORDS',S.raw_rows,'Original collection archive; before cleaning.'],['CANONICAL RECORDS',S.canonical_rows,'Clean text; review repeated captures and metadata.'],['SCOPED RECORDS',S.window_rows,'Video publications: 7 Oct–2 Dec 2023. Not comment dates.'],['ENGLISH ANALYTICAL RECORDS',S.analytical_rows,'English eligibility for text analysis; scoped EDA uses 33,851 records.']];
document.querySelectorAll('[data-pop]').forEach(b=>b.addEventListener('click',()=>{const [label,n,note]=stages[Number(b.dataset.pop)];document.querySelectorAll('[data-pop]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));document.querySelector('#pop-count').textContent=fmt(n);document.querySelector('#pop-label').textContent=label;document.querySelector('#pop-note').textContent=note;document.querySelector('#pop-mask').style.transform=`scaleX(${n/S.raw_rows})`;}));
document.querySelector('#source-composition').innerHTML=media.map(([m,n])=>`<i class="${['BBC','CNN'].includes(m)?'focus':''}" style="width:${n/S.window_rows*100}%" aria-label="${m}: ${fmt(n)} records, ${pct(n/S.window_rows)}"></i>`).join('');
document.querySelector('#composition-key').innerHTML=media.map(([m,n])=>`<span><b>${m}</b> ${pct(n/S.window_rows)}</span>`).join('');
document.querySelector('#weight-chart').innerHTML=weights.map(r=>`<div class="weight-row"><span>${r.sentiment}</span>${track(r.record_weighted_share,tones[r.sentiment])}<strong>${pct(r.record_weighted_share)}</strong><small class="weight-delta"></small></div>`).join('');
document.querySelectorAll('[data-weight]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-weight]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));weights.forEach((r,i)=>{const v=b.dataset.weight==='equal'?r.video_equal_weight_share:r.record_weighted_share;const row=document.querySelectorAll('.weight-row')[i];row.querySelector('i').style.setProperty('--share',v);row.querySelector('strong').textContent=pct(v);row.querySelector('.weight-delta').textContent=b.dataset.weight==='equal'?(Number(r.difference_pp)>0?'+':'−')+Math.abs(Number(r.difference_pp)).toFixed(2)+' pp':'';});}));
function bars(rows,ghost=false){return `<div class="sentiment-bars">${['Negative','Neutral','Positive'].map(s=>{const r=rows.find(r=>r.sentiment===s),g=overall.find(r=>r.sentiment===s);return `<div><header><span>${s}</span><strong>${pct(r.share)}</strong></header>${track(r.share,tones[s],ghost?g.share:undefined)}<div class="scale"><span>0</span><span>100%</span></div></div>`}).join('')}</div>`;}
function showSource(m){const rows=D.sentiment_by_media.filter(r=>r.media===m);document.querySelectorAll('[data-source]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.source===m)));document.querySelector('#source-chart').innerHTML=`<div class="source-caption"><b>${m} · n = ${fmt(rows[0].denominator)}</b><span>Outline = overall reference</span></div>`+bars(rows,true);}
function sentiment(view){const p=document.querySelector('#sentiment-panel');p.setAttribute('aria-labelledby',view==='overall'?'overall-tab':'source-tab');p.innerHTML=view==='overall'?bars(overall):`<div class="source-controls" role="group" aria-label="Media source">${media.map(([m],i)=>`<button data-source="${m}" aria-pressed="${i===0}">${m}</button>`).join('')}</div><div id="source-chart" aria-live="polite"></div>`;if(view!=='overall'){document.querySelectorAll('[data-source]').forEach(b=>b.addEventListener('click',()=>showSource(b.dataset.source)));showSource('AL');}}
const phrases=[['Conflict / geography',798],['Humanitarian references',566],['Historical / age references',150],['Blessings / support phrases',611]];
document.querySelector('#phrases').innerHTML=phrases.map(([l,n])=>`<div class="phrase-row"><span>${l}</span><b>${pct(n/S.analytical_rows)}</b></div>`).join('');
document.querySelector('#coverage-toggle').addEventListener('click',e=>{const b=e.currentTarget,on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',String(on));b.textContent=on?'Reset coverage view ↺':'Apply selected phrase rules ↗';document.querySelector('.coverage-display').classList.toggle('applied',on);document.querySelector('#coverage-value').textContent=on?'7.27%':'27,482';document.querySelector('#coverage-label').textContent=on?'MATCHED AT LEAST ONE RULE':'ENGLISH ANALYTICAL RECORDS';});
const panes={
measure:`<div class="workspace-lead"><span>ENGAGEMENT SIGNALS</span><h3>Identify examples<br>worth examining.</h3><p>Higher-like and higher-save examples informed reference selection.</p></div><div class="signal-scene"><div class="signals"><b>LIKES</b><i>·</i><b>SAVES</b><i>·</i><b>COMMENTS</b></div><p>Comments retained as context.</p><div class="next-logic">Captured counts <i>→</i> Higher-engagement examples</div><p class="small">No exposure denominator, engagement rate or causal claim.</p></div>`,
translate:`<div class="workspace-lead"><span>OBSERVATION → HYPOTHESIS</span><h3>Turn examples<br>into constraints.</h3><p>Observed characteristics are candidate cues, not proven drivers.</p></div><div class="prompt-design"><div><b>Observe</b><span>Location · emotional wording · practical cues</span></div><div><b>Hypothesise</b><span>Candidate cues worth testing</span></div><div><b>Constrain</b><span>Reference pairs · relevance · brevity · factuality</span></div><p class="small">Pattern prevalence and performance were not quantified.</p></div>`,
build:`<div class="workspace-lead"><span>PROMPT LOGIC → PROTOTYPE</span><h3>Make the analysis<br>usable.</h3><p>Content-input form → headline generation → human review.</p></div><div class="generation"><div class="variant-output"><strong>5</strong><div><b>DRAFT VARIANTS CONFIGURED</b><div class="draft-slots"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div><p class="small">Structural slots; no invented headlines.</p></div></div><p class="small">Historical Flask prototype. Online A/B comparison remained proposed; no measured uplift.</p></div>`};
function workspace(stage){const p=document.querySelector('#workspace-panel');p.setAttribute('aria-labelledby',stage+'-tab');p.innerHTML=panes[stage];}
function tabs(selector,key,render){const buttons=[...document.querySelectorAll(selector)];function select(b,focus=false){buttons.forEach(x=>{const on=x===b;x.setAttribute('aria-selected',String(on));x.tabIndex=on?0:-1});render(b.dataset[key]);if(focus)b.focus()}buttons.forEach((b,i)=>{b.addEventListener('click',()=>select(b));b.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%buttons.length;if(e.key==='ArrowLeft')n=(i+buttons.length-1)%buttons.length;if(e.key==='Home')n=0;if(e.key==='End')n=buttons.length-1;if(n!==undefined){e.preventDefault();select(buttons[n],true)}})});}
tabs('[data-view]','view',sentiment);tabs('[data-work]','work',workspace);sentiment('overall');workspace('measure');

// Replay once per deliberate interaction; coalesce focus and click from one gesture.
const signal=document.querySelector('.signal-object');
let lastReplay=-Infinity;
function replaySignal(){
 if(manualReduce||reduce.matches||performance.now()-lastReplay<250)return;
 lastReplay=performance.now();
 const marks=signal.querySelectorAll('rect');
 marks.forEach(mark=>mark.style.animation='none');
 void signal.offsetWidth;
 marks.forEach(mark=>mark.style.animation='');
}
signal.addEventListener('pointerenter',event=>{if(event.pointerType!=='touch')replaySignal()});
signal.addEventListener('focus',replaySignal);
signal.addEventListener('click',replaySignal);
