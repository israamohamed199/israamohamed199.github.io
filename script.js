// Load config and gallery then render
async function loadSite(){
  const cfg = window.SITE_CONFIG || {};
  const socialWrap = document.getElementById('socials');
  if(cfg.social && socialWrap){
    socialWrap.innerHTML = cfg.social.map(s=>`<a href="${s.url}" target="_blank" rel="noopener" title="${s.name}">${s.name}</a>`).join(' • ');
  }
  const emailEl = document.getElementById('contact-email');
  if(emailEl) emailEl.href = `mailto:${cfg.email}`;

  try{
    const res = await fetch('gallery.json');
    const json = await res.json();
    renderGallery(json);
  }catch(e){
    console.error('gallery load failed',e);
  }
  const hidden = document.querySelectorAll('.hidden');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(en=>{ if(en.isIntersecting) en.target.classList.add('show'); });
  },{threshold:0.2});
  hidden.forEach(h=>obs.observe(h));
}
function renderGallery(data){
  const wrap = document.getElementById('gallery');
  if(!wrap) return;
  wrap.innerHTML='';
  const mode = (data.mode||'grid');
  if(mode==='before-after'){
    const container = document.createElement('div'); container.className='ba';
    (data.pairs||[]).forEach(p=>{
      const pair = document.createElement('div'); pair.className='pair card';
      const img1 = document.createElement('img'); img1.src=p.before; img1.alt='before';
      const img2 = document.createElement('img'); img2.src=p.after; img2.alt='after';
      pair.append(img1,img2); container.append(pair);
    });
    wrap.append(container);
  }else{
    const grid = document.createElement('div'); grid.className='grid';
    (data.images||[]).forEach(src=>{
      const card = document.createElement('div'); card.className='card';
      const img = document.createElement('img'); img.src=src; img.alt='Project';
      const meta = document.createElement('div'); meta.className='meta'; meta.innerHTML = '<div>Project</div>';
      card.append(img,meta); grid.append(card);
    });
    wrap.append(grid);
  }
}
document.addEventListener('DOMContentLoaded', loadSite);