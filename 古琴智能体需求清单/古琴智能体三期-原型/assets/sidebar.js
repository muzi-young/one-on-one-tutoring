// 古琴智能体三期 · 端口隔离导航 v2
// 用法：<script src="../assets/sidebar2.js" data-port="ops" data-active="ops/console.html" data-crumbs="..." data-depth="1"></script>
// 其中 data-port 可选：portal | app | ops | admin

(function(){
  const PORTS = {
    portal: {
      name: '原型门户', sub: '端口选择', color:'#b08949', operator:'琴',
      groups: [
        { title:'端口', items:[
          { href:'index.html', icon:'🏠', label:'门户首页' },
          { href:'app/index.html', icon:'📱', label:'用户端 APP' },
          { href:'ops/index.html', icon:'🛠', label:'运营端' },
          { href:'admin/index.html', icon:'🗂', label:'管理后台' },
        ]}
      ]
    },
    app: {
      name: '用户端 APP', sub: '消费者用户视角', color:'#5b8def', operator:'琴心向道',role:'雅集会员',
      groups: [
        { title:'端口总览', items:[
          { href:'app/index.html', icon:'🗺', label:'用户端总览' },
          { href:'app/login.html', icon:'🔐', label:'登录页' },
        ]},
        { title:'主要页面', items:[
          { href:'app/home.html',     icon:'🏠', label:'APP 首页' },
          { href:'app/live.html',     icon:'🔴', label:'直播间' },
          { href:'app/course.html',   icon:'🎼', label:'课程详情' },
          { href:'app/payment.html',  icon:'💳', label:'支付确认' },
          { href:'app/reserve.html',  icon:'⏰', label:'预约成功' },
          { href:'app/replay.html',   icon:'📺', label:'直播回放' },
          { href:'app/message.html',  icon:'🔔', label:'消息中心' },
          { href:'app/mine.html',     icon:'👤', label:'我的' },
        ]},
        { title:'功能入口', items:[
          { href:'app/humming.html',  icon:'🎙', label:'哼唱识曲' },
          { href:'app/score.html',    icon:'📚', label:'曲谱库' },
          { href:'app/qa.html',       icon:'💬', label:'智能问答' },
        ]}
      ]
    },
    ops: {
      name: '运营端', sub: '运营人员工作台', color:'#23c4a7', operator:'运营·李', role:'内容运营',
      groups: [
        { title:'工作台', items:[
          { href:'ops/index.html', icon:'📊', label:'工作台首页' },
          { href:'ops/login.html', icon:'🔐', label:'登录页' },
        ]},
        { title:'直播管理', items:[
          { href:'ops/live-list.html',   icon:'📋', label:'直播列表' },
          { href:'ops/live-create.html', icon:'➕', label:'创建直播' },
          { href:'ops/script.html',      icon:'📝', label:'脚本编排' },
          { href:'ops/console.html',     icon:'🎛', label:'实时控制台' },
        ]},
        { title:'活动配置', items:[
          { href:'ops/promo.html', icon:'🎁', label:'优惠活动' },
        ]}
      ]
    },
    admin: {
      name: '管理后台', sub: '系统管理员', color:'#a266f4', operator:'管理员·张', role:'超级管理员',
      groups: [
        { title:'数据看板', items:[
          { href:'admin/index.html',  icon:'📊', label:'管理首页' },
          { href:'admin/login.html',  icon:'🔐', label:'登录页' },
          { href:'admin/stats.html',  icon:'📈', label:'直播转化统计' },
        ]},
        { title:'资产管理', items:[
          { href:'admin/avatar.html', icon:'🧑‍🎤', label:'数字人资产' },
        ]},
        { title:'合规与AI', items:[
          { href:'admin/audit.html',     icon:'🛡', label:'弹幕审核规则' },
          { href:'admin/ai-monitor.html',icon:'🤖', label:'AI 能力监控' },
        ]}
      ]
    }
  };

  const script  = document.currentScript;
  const active  = script.getAttribute('data-active') || '';
  // 自动推断端口：app/xxx → app；ops/xxx → ops；admin/xxx → admin；其它 → portal
  let portKey = script.getAttribute('data-port');
  if(!portKey){
    if(active.startsWith('app/')) portKey = 'app';
    else if(active.startsWith('ops/')) portKey = 'ops';
    else if(active.startsWith('admin/')) portKey = 'admin';
    else portKey = 'portal';
  }
  const crumbs  = script.getAttribute('data-crumbs') || '';
  const depth   = parseInt(script.getAttribute('data-depth') || '0', 10);
  const prefix  = depth ? '../' : '';
  const port    = PORTS[portKey];

  // 端口切换器（顶部右侧）
  const switcherItems = [
    {key:'app', icon:'📱', name:'用户端', href:'app/index.html', color:'#5b8def'},
    {key:'ops', icon:'🛠', name:'运营端', href:'ops/index.html', color:'#23c4a7'},
    {key:'admin', icon:'🗂', name:'管理后台', href:'admin/index.html', color:'#a266f4'},
  ];

  const sidebarHTML = `
    <aside class="sidebar" style="--port-color:${port.color};">
      <div class="brand" style="background:linear-gradient(135deg,rgba(255,255,255,.04),rgba(0,0,0,.2)),${port.color}30;">
        <span class="seal" style="background:${port.color};">琴</span>
        <div><h1>${port.name}</h1><p>${port.sub}</p></div>
      </div>
      <div class="nav">
        ${port.groups.map(g=>`
          <div class="nav-group"><span class="dot" style="background:${port.color}"></span>${g.title}</div>
          ${g.items.map(it=>{
            const isActive = active === it.href;
            return `<a href="${prefix}${it.href}" class="${isActive?'active':''}"><span class="ico">${it.icon}</span><span>${it.label}</span></a>`;
          }).join('')}
        `).join('')}
      </div>
      <div class="port-switcher">
        <div class="ps-label">切换端口</div>
        ${switcherItems.filter(p=>p.key!==portKey).map(p=>`
          <a href="${prefix}${p.href}" class="ps-item" style="border-left-color:${p.color};">
            <span>${p.icon}</span><span>${p.name}</span><span class="ps-arrow">›</span>
          </a>
        `).join('')}
        <a href="${prefix}index.html" class="ps-home">↩ 返回门户</a>
      </div>
      <div class="foot">需求评审 · 仅供原型演示</div>
    </aside>
  `;

  const target = document.getElementById('app-shell');
  if(!target) return;

  // 构建外层布局，但用 DOM 节点搬移方式保留 target 内部已有的 DOM（保护事件监听器）
  const wrapper = document.createElement('div');
  wrapper.className = 'app-shell';
  wrapper.dataset.port = portKey;
  wrapper.innerHTML = `
    ${sidebarHTML}
    <div class="main">
      <div class="topbar" style="border-bottom:3px solid ${port.color};">
        <div class="crumbs">${crumbs || port.name}</div>
        <div class="top-right">
          <span style="background:${port.color}20;color:${port.color};padding:4px 10px;border-radius:99px;font-size:12px;font-weight:600;">${port.name}</span>
          <span>📅 ${new Date().toLocaleDateString('zh-CN')}</span>
          <span style="cursor:pointer;">🔔</span>
          <div class="avatar" style="background:linear-gradient(135deg,${port.color},${port.color}aa);">${(port.operator||'琴').slice(0,1)}</div>
          <div style="font-size:13px;">
            <div style="font-weight:600;">${port.operator}</div>
            <div style="font-size:11px;color:#888;">${port.role||''}</div>
          </div>
        </div>
      </div>
      <div class="main-content"></div>
    </div>
  `;
  // 将 target 内部所有子节点搬移到 .main-content（保留事件监听器）
  const mainContent = wrapper.querySelector('.main-content');
  while(target.firstChild){ mainContent.appendChild(target.firstChild); }
  // mainContent 透明容器：display:contents 让子节点直接参与父级 flex 布局
  mainContent.style.cssText = 'display:contents;';
  // 用 wrapper 替换 target
  target.replaceWith(wrapper);

  // 自动注入全局交互层（在 DOM 就绪后）
  if(!document.querySelector('script[data-interact]')){
    const s = document.createElement('script');
    s.src = prefix + 'assets/interact.js';
    s.setAttribute('data-interact','1');
    document.body.appendChild(s);
  }
})();
