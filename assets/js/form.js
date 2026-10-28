/* Static preview only: there is intentionally NO network request or storage of personal data.
   Connect a verified, secure endpoint only after privacy/legal review and explicit approval. */
(()=>{
'use strict';
const en=document.documentElement.lang.toLowerCase().startsWith('en');
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
const questions=en?questionsEN:questionsES;
const mount=document.getElementById('question-mount');if(!mount)return;
const stage=document.getElementById('question-stage'),details=document.getElementById('details-stage'),back=document.getElementById('back');
const answers={};let step=0;
const render=()=>{
 const complete=step===questions.length;
 stage.hidden=complete;details.hidden=!complete;
 document.getElementById('step-label').textContent=complete?(en?'Step 2 of 2 · Contact details':'Paso 2 de 2 · Datos de contacto'):(en?`Step 1 of 2 · Question ${step+1} of 4`:`Paso 1 de 2 · Pregunta ${step+1} de 4`);
 const percent=Math.round(step/5*100);
 document.getElementById('percent').textContent=percent+'%';document.getElementById('progress-bar').style.width=Math.max(8,percent)+'%';
 back.hidden=step===0;
 if(complete)return;
 const q=questions[step];mount.replaceChildren();
 const eyebrow=document.createElement('span');eyebrow.className='eyebrow';eyebrow.textContent=en?`QUESTION ${step+1} OF ${questions.length}`:`PREGUNTA ${step+1} DE ${questions.length}`;mount.append(eyebrow);
 const h=document.createElement('h2');h.textContent=q.title;mount.append(h);
 q.options.forEach(opt=>{
  const b=document.createElement('button');b.type='button';b.className='option';b.textContent=opt;
  b.addEventListener('click',()=>{answers[q.id]=opt;step++;render();});mount.append(b);
 });
};
back.addEventListener('click',()=>{step=Math.max(0,step-1);render();});
document.getElementById('details-back').addEventListener('click',()=>{step=questions.length-1;render();});
document.getElementById('lead-form').addEventListener('submit',event=>{
 event.preventDefault();const form=event.currentTarget;const error=document.getElementById('form-error');error.hidden=false;
 if(!form.checkValidity()){
  error.textContent=en?'Please provide your name, phone number, consent, and a valid email address if included.':'Completa tu nombre, teléfono, consentimiento y revisa el formato del correo electrónico si lo incluiste.';
  form.reportValidity();return;
 }
 error.textContent=en?'The form is not yet accepting submissions. We are preparing a secure way to receive inquiries. Please call the firm directly.':'El envío de formularios aún no está habilitado. Estamos preparando la conexión segura para recibir solicitudes. Por favor, llama al teléfono de la firma.';
});
render();
})();
