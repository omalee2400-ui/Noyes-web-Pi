/* Noyes PI V3 — bilingual intake, server-validated, no false success.
 * Classification A/B/C is ALWAYS performed by the Supabase Edge Function.
 */
(()=>{
'use strict';
const en=document.documentElement.lang.toLowerCase().startsWith('en');
const config=window.NOYES_PI_CONFIG||{};
const questionsES=[
 {id:'accidentType',title:'¿Qué tipo de accidente sufriste?',options:['Accidente de auto','Accidente de camión o motocicleta','Caída o resbalón','Accidente laboral','Otro']},
 {id:'state',title:'¿Dónde ocurrió el accidente?',options:['En Connecticut','En otro estado']},
 {id:'when',title:'¿Cuándo ocurrió?',options:['Hace menos de 30 días','Entre 1 y 6 meses','Entre 6 meses y 2 años','Hace más de 2 años']},
 {id:'injury',title:'¿Sufriste alguna lesión?',options:['Sí, recibí atención médica','Sí, pero todavía no he recibido atención','No estoy seguro','No tuve lesiones']}
];
const questionsEN=[
 {id:'accidentType',title:'What type of accident were you involved in?',options:['Car accident','Truck or motorcycle accident','Slip or fall','Workplace accident','Other']},
 {id:'state',title:'Where did the accident happen?',options:['In Connecticut','In another state']},
 {id:'when',title:'When did it happen?',options:['Less than 30 days ago','1 to 6 months ago','6 months to 2 years ago','More than 2 years ago']},
 {id:'injury',title:'Were you injured?',options:['Yes, I received medical care','Yes, but I have not received care yet','I am not sure','I was not injured']}
];
const STATES={AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',DE:'Delaware',DC:'Washington, DC',FL:'Florida',GA:'Georgia',HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',MS:'Mississippi',MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',NM:'New Mexico',NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',SC:'South Carolina',SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',VA:'Virginia',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming'};
const questions=en?questionsEN:questionsES;
const mount=document.getElementById('question-mount');if(!mount)return;
const stage=document.getElementById('question-stage'),details=document.getElementById('details-stage'),schedule=document.getElementById('schedule-stage');
const back=document.getElementById('back'),form=document.getElementById('lead-form');
const error=document.getElementById('form-error'),submit=document.getElementById('submit-lead');
const status=document.getElementById('dev-status');
const isOther=()=>['En otro estado','In another state'].includes(answers.state);
const answers={};let step=0, busy=false, saved=false, bookingToken='', submissionId='', captchaId=null, captchaToken='', widgetPromise=null;
const say=(es,english)=>en?english:es;
function setError(text){error.hidden=!text;error.textContent=text||'';}
function progress(p,label){document.getElementById('step-label').textContent=label;document.getElementById('percent').textContent=p+'%';const bar=document.getElementById('progress-bar');bar.style.width=Math.max(8,p)+'%';bar.setAttribute('aria-valuenow',String(p));}
function render(){
 const complete=step===questions.length;
 stage.hidden=complete; details.hidden=!complete; schedule.hidden=true;
 progress(Math.round(step/5*100),complete?say('Paso 2 de 3 · Datos de contacto','Step 2 of 3 · Contact information'):say(`Paso 1 de 3 · Pregunta ${step+1} de 4`,`Step 1 of 3 · Question ${step+1} of 4`));
 back.hidden=step===0;
 if(complete){if(config.enabled&&config.endpoint){status.hidden=true;loadTurnstile();}else{status.hidden=false;}return;}
 const q=questions[step];mount.replaceChildren();
 const eyebrow=document.createElement('span');eyebrow.className='eyebrow';eyebrow.textContent=say(`PREGUNTA ${step+1} DE ${questions.length}`,`QUESTION ${step+1} OF ${questions.length}`);mount.append(eyebrow);
 const h=document.createElement('h2');h.textContent=q.title;mount.append(h);
 q.options.forEach(opt=>{
  const b=document.createElement('button');b.type='button';b.className='option';b.textContent=opt;
  if(answers[q.id]===opt)b.classList.add('selected');
  b.addEventListener('click',()=>{
   answers[q.id]=opt;
   if(q.id==='state' && (opt==='En otro estado'||opt==='In another state')) {render();return;}
   if(q.id==='state')delete answers.otherState;
   step++;render();
  });mount.append(b);
 });
 if(q.id==='state'&&isOther()){
  const label=document.createElement('label');label.htmlFor='other-state';label.className='extra-state-label';label.textContent=say('¿En qué estado ocurrió el accidente? *','Which state did the accident happen in? *');mount.append(label);
  const select=document.createElement('select');select.id='other-state';select.required=true;
  const empty=document.createElement('option');empty.value='';empty.textContent=say('Selecciona un estado','Select a state');select.append(empty);
  for(const [code,name] of Object.entries(STATES)){const o=document.createElement('option');o.value=code;o.textContent=name;select.append(o);}
  select.value=answers.otherState||'';select.addEventListener('change',()=>{answers.otherState=select.value;});mount.append(select);
  const continueBtn=document.createElement('button');continueBtn.type='button';continueBtn.className='btn';continueBtn.textContent=say('Continuar →','Continue →');continueBtn.addEventListener('click',()=>{if(!select.value){select.reportValidity();return;}answers.otherState=select.value;step++;render();});mount.append(continueBtn);
 }
}
back.addEventListener('click',()=>{if(busy||saved)return;step=Math.max(0,step-1);render();});
document.getElementById('details-back').addEventListener('click',()=>{if(busy||saved)return;step=questions.length-1;render();});
function loadScript(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.async=true;s.onload=resolve;s.onerror=()=>reject(Error('script_failed'));document.head.append(s);});}
function loadTurnstile(){
 if(widgetPromise)return widgetPromise;
 widgetPromise=(async()=>{
  await loadScript('https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit');
  if(!window.turnstile)throw Error('turnstile_missing');
  captchaId=window.turnstile.render('#turnstile-box',{sitekey:config.turnstileSiteKey,callback:token=>captchaToken=token,'expired-callback':()=>captchaToken='','error-callback':()=>captchaToken='' });
 })().catch(()=>{setError(say('No pudimos cargar la verificación de seguridad. Recarga la página para intentar de nuevo.','Security verification could not load. Refresh the page to try again.'));widgetPromise=null;});
 return widgetPromise;
}
function resetCaptcha(){captchaToken='';if(captchaId!==null&&window.turnstile)window.turnstile.reset(captchaId);}
async function showSchedule(name,email){
 stage.hidden=true;details.hidden=true;schedule.hidden=false;
 progress(100,say('Paso 3 de 3 · Agenda tu llamada','Step 3 of 3 · Schedule your call'));
 document.getElementById('schedule-name').textContent=name;
 const loading=document.getElementById('calendar-loading');loading.hidden=false;
 const fallback=document.getElementById('calendar-fallback');fallback.href=config.calendlyUrl;
 try{
  await loadScript('https://assets.calendly.com/assets/external/widget.js');
  if(!window.Calendly?.initInlineWidget)throw Error('calendly_missing');
  window.Calendly.initInlineWidget({url:config.calendlyUrl,parentElement:document.getElementById('calendly-embed'),prefill:{name,email},utm:{utmSource:'noyes_pi_landing',utmMedium:'website',utmContent:bookingToken}});
  loading.hidden=true;
 }catch{loading.textContent=say('No se pudo cargar el calendario. Puedes abrir Calendly desde el botón inferior.','Could not load the calendar. You can open Calendly using the button below.');}
}
form.addEventListener('submit',async event=>{
 event.preventDefault();if(busy||saved)return;
 setError('');
 if(!form.checkValidity()) {form.reportValidity();return;}
 if(!config.enabled||!config.endpoint){setError(say('El formulario está en pruebas y todavía no recibe solicitudes. Por favor, llama a la firma.','This testing form does not accept submissions yet. Please call the firm.'));return;}
 if(!captchaToken){setError(say('Completa la verificación de seguridad antes de continuar.','Complete the security verification to continue.'));return;}
 if(!submissionId)submissionId=crypto.randomUUID();
 const name=document.getElementById("fullName").value.trim(), email=document.getElementById("email").value.trim(),phone=document.getElementById("phone").value.trim();
 busy=true;submit.disabled=true;submit.textContent=say('Guardando de forma segura…','Saving securely…');
 try{
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),15000);
  let result;
  try {result=await fetch(config.endpoint,{method:'POST',mode:'cors',credentials:'omit',headers:{'Content-Type':'application/json'},body:JSON.stringify({submissionId,fullName:name,phone,email,preferredLanguage:document.getElementById("language").value,consent:document.getElementById("consent").checked,accidentType:answers.accidentType,state:answers.state,otherState:answers.otherState||null,when:answers.when,injury:answers.injury,turnstileToken:captchaToken,source:'pi_landing'}),signal:controller.signal});}finally{clearTimeout(timeout);}
  let payload;try{payload=await result.json();}catch{throw Error('invalid_server_response');}
  if(!result.ok||!payload.success||payload.nextStep!=='schedule_appointment'||typeof payload.bookingToken!=='string')throw Error(payload.error||'save_failed');
  saved=true;bookingToken=payload.bookingToken;
  await showSchedule(name,email);
 }catch(ex){
  const code=ex instanceof Error?ex.message:'';
  const msg=code==='rate_limited'?say('Demasiados intentos. Intenta de nuevo más tarde.','Too many attempts. Please try later.'):say('No pudimos confirmar que tu solicitud se haya guardado. Comprueba tu conexión e inténtalo de nuevo. No se ha abierto el calendario.','We could not confirm that your request was saved. Check your connection and retry. The calendar has not opened.');
  setError(msg);resetCaptcha();
 }finally{busy=false;submit.disabled=saved;submit.textContent=say('Continuar para agendar →','Continue to scheduling →');}
});
// The Calendly browser event is NOT authoritative verification of an appointment.
// Confirmation and reconciliation require a trusted provider-side check before DB/Slack changes.
window.addEventListener('message',event=>{
 if(event.origin!=='https://calendly.com'||event.data?.event!=='calendly.event_scheduled'||!saved)return;
 const info=document.getElementById('calendly-client-message');
 info.hidden=false;info.textContent=say('Calendly te enviará los detalles de tu reserva. La confirmación interna se verificará por separado.','Calendly will email your booking details. Internal booking verification takes place separately.');
});
document.getElementById("language").value=en?"en":"es";
render();
})();
