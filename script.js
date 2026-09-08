
const KEY='bio_reviews_v2';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
let rating=0;
function reviews(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}}
function draw(){const box=document.querySelector('#reviews');if(!box)return;const a=reviews();box.innerHTML=a.length?a.map(x=>`<div class="review"><div class="reviewTop"><b>${esc(x.name)}</b><span class="rating">${'★'.repeat(x.rating)}${'☆'.repeat(5-x.rating)}</span></div><small class="muted">${esc(x.date)}</small><div style="margin-top:8px">${esc(x.text)}</div></div>`).join(''):'<div class="empty">Пока отзывов нет. Оставьте первый.</div>'}
document.addEventListener('DOMContentLoaded',()=>{
document.querySelectorAll('.star').forEach(b=>b.onclick=()=>{rating=+b.dataset.r;document.querySelectorAll('.star').forEach(x=>x.classList.toggle('on',+x.dataset.r<=rating))});
const f=document.querySelector('#form');if(f)f.onsubmit=e=>{e.preventDefault();const s=document.querySelector('#status'),n=document.querySelector('#name').value.trim(),t=document.querySelector('#text').value.trim();if(n.length<2||n.length>40)return s.className='status bad',s.textContent='Имя: от 2 до 40 символов.';if(t.length<5||t.length>500)return s.className='status bad',s.textContent='Текст: от 5 до 500 символов.';if(!rating)return s.className='status bad',s.textContent='Выберите оценку.';let a=reviews();a.unshift({name:n,text:t,rating,date:new Date().toLocaleDateString('ru-RU')});localStorage.setItem(KEY,JSON.stringify(a.slice(0,50)));f.reset();rating=0;document.querySelectorAll('.star').forEach(x=>x.classList.remove('on'));s.className='status ok';s.textContent='Отзыв опубликован на этом устройстве.';draw()};draw();
});
