// Footer year
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Blog list + single post (Markdown via marked)
async function loadPosts(){
  try{
    const res = await fetch('posts/posts.json', {cache:'no-store'});
    const posts = await res.json();
    posts.sort((a,b)=> new Date(b.date) - new Date(a.date));

    const recent = document.getElementById('recentPosts');
    if (recent) posts.slice(0,3).forEach(p => recent.appendChild(postListItem(p)));

    const all = document.getElementById('allPosts');
    if (all) posts.forEach(p => all.appendChild(postListItem(p)));
  }catch(e){ console.error(e); }
}
function postListItem(p){
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = `post.html?slug=${encodeURIComponent(p.slug)}`;
  a.innerHTML = `<span class="post-title">${escapeHtml(p.title)}</span>
                 <span class="post-meta">${formatDate(p.date)} ${p.read?('• '+p.read):''}</span>`;
  li.appendChild(a); return li;
}
function escapeHtml(s){ return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])); }
function formatDate(s){ const d = new Date(s); return Number.isNaN(d)?s:d.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'2-digit'}); }

async function loadSinglePost(){
  const title = document.getElementById('postTitle');
  const meta  = document.getElementById('postMeta');
  const body  = document.getElementById('postBody');
  if (!body) return;

  const slug = new URLSearchParams(location.search).get('slug');
  if (!slug){ if(title) title.textContent='Post not found'; return; }

  try{
    const posts = await fetch('posts/posts.json', {cache:'no-store'}).then(r=>r.json());
    const p = posts.find(x=>x.slug===slug);
    if (!p){ title.textContent='Post not found'; return; }
    title.textContent = p.title;
    meta.textContent = `${formatDate(p.date)} ${p.read?('• '+p.read):''}`;
    const md = await fetch(`posts/${slug}.md`, {cache:'no-store'}).then(r=>r.text());
    if (window.marked) body.innerHTML = marked.parse(md); else body.textContent = md;
  }catch(e){ title.textContent='Error loading post'; console.error(e); }
}
loadPosts();
loadSinglePost();
// --- About page: days old counter ---
(function () {
  const el = document.getElementById('daysOld');
  if (!el) return;

  const dob = new Date('2006-08-10T00:00:00Z'); // your birthday
  const msPerDay = 24 * 60 * 60 * 1000;
  const today = new Date();
  const days = Math.floor((today - dob) / msPerDay);

  el.textContent = days.toLocaleString();
})();

