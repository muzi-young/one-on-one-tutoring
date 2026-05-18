// 一键生成所有课程封面 SVG + 教师头像 SVG
const fs = require('fs');
const path = require('path');

const covers = {
  math:      { label: '数学', sub: 'MATHEMATICS',  c1: '#6a5af9', c2: '#4f7cff' },
  english:   { label: '英语', sub: 'ENGLISH',      c1: '#43c6ac', c2: '#191654' },
  physics:   { label: '物理', sub: 'PHYSICS',      c1: '#ff5e62', c2: '#ff9966' },
  chemistry: { label: '化学', sub: 'CHEMISTRY',    c1: '#11998e', c2: '#38ef7d' },
  chinese:   { label: '语文', sub: 'CHINESE',      c1: '#ffd966', c2: '#ff7e5f' },
  biology:   { label: '生物', sub: 'BIOLOGY',      c1: '#11998e', c2: '#56ccf2' },
  history:   { label: '历史', sub: 'HISTORY',      c1: '#8e2de2', c2: '#4a00e0' },
  politics:  { label: '政治', sub: 'POLITICS',     c1: '#e96443', c2: '#904e95' }
};

const buildCover = (key, { label, sub, c1, c2 }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
    <pattern id="p" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="1.5" fill="rgba(255,255,255,0.18)"/>
    </pattern>
  </defs>
  <rect width="600" height="300" fill="url(#g)"/>
  <rect width="600" height="300" fill="url(#p)"/>
  <text x="40" y="190" font-family="-apple-system,Helvetica" font-size="160" font-weight="800" fill="rgba(255,255,255,0.95)">${label}</text>
  <text x="44" y="232" font-family="-apple-system,Helvetica" font-size="20" font-weight="500" fill="rgba(255,255,255,0.7)" letter-spacing="4">${sub}</text>
  <text x="44" y="60" font-family="-apple-system,Helvetica" font-size="22" font-weight="700" fill="rgba(255,255,255,0.95)">高分一对一 · 1V1 名师</text>
</svg>`;

const buildAvatar = (initial, c1, c2) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="100" fill="url(#g)"/>
  <text x="100" y="135" text-anchor="middle" font-family="-apple-system,Helvetica" font-size="100" font-weight="700" fill="#fff">${initial}</text>
</svg>`;

const root = path.resolve(__dirname, '..');

// 写课程封面
Object.entries(covers).forEach(([k, v]) => {
  fs.writeFileSync(path.join(root, 'public/covers', `${k}.svg`), buildCover(k, v));
});

// 写教师头像
const avatars = [
  ['王', '#6a5af9', '#4f7cff'],
  ['李', '#43c6ac', '#191654'],
  ['张', '#ff5e62', '#ff9966'],
  ['陈', '#11998e', '#38ef7d'],
  ['赵', '#8e2de2', '#4a00e0'],
  ['刘', '#e96443', '#904e95']
];
avatars.forEach(([ch, c1, c2], i) => {
  fs.writeFileSync(path.join(root, 'public/avatars', `t${i + 1}.svg`), buildAvatar(ch, c1, c2));
});

// 学生头像
fs.writeFileSync(path.join(root, 'public/avatars', 'student.svg'), buildAvatar('明', '#ffd966', '#ff7e5f'));

console.log('✅ 生成完毕：');
console.log('  封面：', Object.keys(covers).length, '张');
console.log('  头像：', avatars.length + 1, '张');
