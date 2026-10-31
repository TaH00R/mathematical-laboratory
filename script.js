const grid = document.getElementById('experimentGrid');
document.getElementById('experimentCount').textContent = catalogue.length;
let category = 'all';
function render() {
 const query = document.getElementById('search').value.trim().toLowerCase();
 const visible = catalogue.filter(e => (category === 'all' || e.category === category) && e.title.toLowerCase().includes(query));
 grid.innerHTML = visible.map(e => `<a class="card" href="${e.path}"><span class="card-number">${String(e.id).padStart(2,'0')}</span><span class="card-category">${e.category.replace('-',' ')}</span><h3>${e.title}</h3><span class="card-open">Explore ↗</span></a>`).join('');
 document.getElementById('results').textContent = `${visible.length} experiments`;
}
document.getElementById('filters').addEventListener('click', event => {
 const button = event.target.closest('button'); if (!button) return;
 category = button.dataset.category;
 document.querySelectorAll('.filter').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); }); render();
});
document.getElementById('search').addEventListener('input',render); render();
