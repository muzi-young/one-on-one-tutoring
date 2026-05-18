// Order of phones rendered on board
const ORDER = [
  'launch', 'home', 'courseDetail', 'buy', 'pay', 'bookTeacher',
  'myOrder', 'classroom', 'courseware', 'answer', 'rate',
  'poster', 'coupon', 'me', 'tchHome', 'createMeet'
];

const board = document.getElementById('board');

function buildPhone(key) {
  const s = SCREENS[key];
  if (!s) return '';
  return `
    <div>
      <div class="phone" data-key="${key}">
        <div class="phone-screen">
          <div class="screen-tag"><span class="tag ${s.badge}" style="font-size:10px;padding:1px 6px">${s.tag}</span></div>
          ${s.html()}
        </div>
      </div>
      <div class="phone-title">${s.tag}</div>
    </div>`;
}

function render() {
  board.innerHTML = ORDER.map(buildPhone).join('');
}
render();

// toast
function toast(msg) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window.__tt);
  window.__tt = setTimeout(() => t.classList.remove('show'), 1800);
}

// click delegation: data-go = scroll to that phone; data-toast = toast msg
document.addEventListener('click', (e) => {
  const goEl = e.target.closest('[data-go]');
  const toastEl = e.target.closest('[data-toast]');
  const backEl = e.target.closest('[data-back]');

  if (toastEl) toast(toastEl.dataset.toast);

  if (goEl) {
    const key = goEl.dataset.go;
    const target = document.querySelector(`.phone[data-key="${key}"]`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      target.style.transition = 'transform .3s';
      target.style.transform = 'scale(1.04)';
      setTimeout(() => target.style.transform = '', 600);
    }
  }

  if (backEl) {
    // simulate back: scroll to previous phone
    const cur = backEl.closest('.phone');
    const all = [...document.querySelectorAll('.phone')];
    const idx = all.indexOf(cur);
    if (idx > 0) all[idx - 1].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  }
});
