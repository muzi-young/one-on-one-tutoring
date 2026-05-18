// Each screen returns innerHTML for .phone-screen
// helper
const tabbar = (active) => {
  const items = [
    { k:'home', ic:'🏠', t:'首页' },
    { k:'order', ic:'📋', t:'我的预约' },
    { k:'study', ic:'📖', t:'学习' },
    { k:'me', ic:'👤', t:'我的' }
  ];
  return `<div class="tabbar">${items.map(i=>`
    <div class="ti ${i.k===active?'active':''}" data-go="${i.k==='home'?'home':i.k==='order'?'myOrder':i.k==='study'?'courseware':'me'}">
      <span class="ic">${i.ic}</span>${i.t}
    </div>`).join('')}</div>`;
};
const status = () => `<div class="status"><span>9:41</span><span>📶 📡 🔋</span></div>`;
const nav = (title, back=true, right='') =>
  `<div class="nav">${back?'<span class="back click" data-back>‹</span>':'<span style="width:18px"></span>'}<span class="title">${title}</span><span class="right">${right}</span></div>`;

const SCREENS = {};

// 1. 角色选择 / 启动
SCREENS.launch = {
  tag: '01 启动·角色选择',
  badge: 'tag-stu',
  html: () => `${status()}
  <div class="content role-pick">
    <div class="logo">📚</div>
    <h2>高分一对一</h2>
    <p class="tip">高中全科 · 名师 1v1 · 在线补课</p>
    <div class="role-card click" data-go="home">
      <div class="ic">🎓</div>
      <div><h4>我是学生 / 家长</h4><p>购买课程 · 预约补课 · 上课学习</p></div>
    </div>
    <div class="role-card click" data-go="tchHome">
      <div class="ic">👨‍🏫</div>
      <div><h4>我是老师</h4><p>授课管理 · 创建会议 · 管理学生</p></div>
    </div>
    <p class="muted" style="margin-top:30px">微信一键登录 · 已阅读《用户协议》</p>
  </div>`
};

// 2. 学生端首页
SCREENS.home = {
  tag: '02 学生端·首页',
  badge: 'tag-stu',
  html: () => `${status()}
  <div class="nav"><span class="title">📚 高分一对一</span><span class="right click" data-toast="搜索">🔍</span></div>
  <div class="content">
    <div class="banner">
      <h3>🎯 高考冲刺·1V1 名师定制</h3>
      <p>新人首单立减 ¥100 · 课包最高7折</p>
    </div>
    <div class="chips">
      <span class="chip on">全部</span>
      <span class="chip">高一</span><span class="chip">高二</span><span class="chip">高三</span>
    </div>
    <div class="chips">
      <span class="chip on">全科</span>
      <span class="chip">语文</span><span class="chip">数学</span><span class="chip">英语</span>
      <span class="chip">物理</span><span class="chip">化学</span><span class="chip">生物</span>
    </div>
    <div class="course-row click" data-go="courseDetail">
      <div class="thumb t2">数</div>
      <div class="info">
        <h4>高三数学冲刺·导数专题</h4>
        <p class="desc">王老师 · 北师大硕士 · 教龄8年</p>
        <div class="row-b"><span class="price">¥199<small>/节</small></span><span class="muted">⭐4.9 · 1.2k人学</span></div>
      </div>
    </div>
    <div class="course-row click" data-go="courseDetail">
      <div class="thumb t3">英</div>
      <div class="info">
        <h4>高二英语·语法长难句精讲</h4>
        <p class="desc">李老师 · 北外毕业 · 教龄6年</p>
        <div class="row-b"><span class="price">¥180<small>/节</small></span><span class="muted">⭐4.8 · 856人学</span></div>
      </div>
    </div>
    <div class="course-row click" data-go="courseDetail">
      <div class="thumb t4">物</div>
      <div class="info">
        <h4>高三物理·力学+电磁学</h4>
        <p class="desc">张老师 · 重点中学在职 · 教龄12年</p>
        <div class="row-b"><span class="price">¥220<small>/节</small></span><span class="muted">⭐5.0 · 642人学</span></div>
      </div>
    </div>
    <div class="course-row click" data-go="courseDetail">
      <div class="thumb t5">化</div>
      <div class="info">
        <h4>高一化学·必修一同步辅导</h4>
        <p class="desc">陈老师 · 教龄5年</p>
        <div class="row-b"><span class="price">¥160<small>/节</small></span><span class="muted">⭐4.7 · 421人学</span></div>
      </div>
    </div>
  </div>
  ${tabbar('home')}`
};

// 3. 课程详情
SCREENS.courseDetail = {
  tag: '03 课程详情',
  badge: 'tag-stu',
  html: () => `${status()}${nav('课程详情', true, '🔗')}
  <div class="content" style="padding:0">
    <div style="height:160px;background:linear-gradient(135deg,#6a5af9,#4f7cff);color:#fff;display:flex;align-items:center;justify-content:center;font-size:42px">📐 数学</div>
    <div style="padding:14px;background:#fff">
      <h3 style="font-size:17px;margin-bottom:6px">高三数学冲刺·导数专题</h3>
      <div class="row-b">
        <span class="price">¥199<small>/节起</small></span>
        <span class="muted">⭐4.9 · 1.2k人学</span>
      </div>
      <div style="margin-top:8px">
        <span class="tg tg-blue">高三</span><span class="tg tg-orange">数学</span><span class="tg tg-green">名师</span>
      </div>
    </div>
    <div class="card" style="margin:10px">
      <div class="row" style="gap:12px">
        <div class="avatar" style="width:50px;height:50px;font-size:18px">王</div>
        <div style="flex:1">
          <div class="row-b"><b>王雪老师</b><span class="muted">⭐4.9</span></div>
          <p class="muted">北师大数学硕士 · 8年高三教学 · 累计学员2300+</p>
        </div>
      </div>
    </div>
    <div class="card" style="margin:10px">
      <h4 style="margin-bottom:8px">📖 内容简介</h4>
      <p style="font-size:12px;color:#555;line-height:1.6">本课程针对高三学生导数专题，覆盖导数定义、求导法则、单调性、极值最值、不等式证明等高考核心考点，配套真题精讲与个性化作业批改。</p>
    </div>
    <div class="card" style="margin:10px">
      <h4 style="margin-bottom:8px">🎯 课程亮点</h4>
      <p style="font-size:12px;color:#555;line-height:1.8">✅ 1对1 在线直播授课<br>✅ 互动白板 + 屏幕共享<br>✅ 课件录播可回看<br>✅ 专属错题本 + 学习报告<br>✅ 课时灵活：40/60/90 分钟</p>
    </div>
    <div class="card" style="margin:10px">
      <h4 style="margin-bottom:8px">💬 学员评价 (328)</h4>
      <div class="row" style="gap:10px;margin-bottom:6px"><div class="avatar">小</div><b style="font-size:13px">小明同学</b><span class="stars">★★★★★</span></div>
      <p style="font-size:12px;color:#555">老师讲解很细致，每次课都会先复习上节内容，孩子成绩从100分提到了125分！</p>
    </div>
  </div>
  <div style="padding:10px;background:#fff;border-top:1px solid #eee;display:flex;gap:10px">
    <button class="btn btn-out click" data-toast="已加入收藏">⭐ 收藏</button>
    <button class="btn btn-pri btn-block click" data-go="buy">立即购买</button>
  </div>`
};

// 4. 套餐购买
SCREENS.buy = {
  tag: '04 选择套餐',
  badge: 'tag-core',
  html: () => `${status()}${nav('选择课包')}
  <div class="content">
    <div class="card">
      <h4 style="margin-bottom:10px">⏱ 课时时长</h4>
      <div class="chips">
        <span class="chip">40 分钟</span>
        <span class="chip on">60 分钟</span>
        <span class="chip">90 分钟</span>
      </div>
    </div>
    <h4 style="margin:6px 0 10px;font-size:14px">💰 计费方式</h4>
    <div class="pkg-card">
      <div class="row-b"><h4>单节体验</h4><span class="price">¥199</span></div>
      <p class="muted">¥199/节 · 适合首次试听</p>
    </div>
    <div class="pkg-card on">
      <div class="row-b"><h4>10 节课包 <span class="save">省 ¥190</span></h4><span class="price">¥1800</span></div>
      <p class="muted">¥180/节 · 9折优惠 · 90天有效</p>
    </div>
    <div class="pkg-card">
      <div class="row-b"><h4>15 节课包 <span class="save">省 ¥435</span></h4><span class="price">¥2550</span></div>
      <p class="muted">¥170/节 · 8.5折 · 120天有效</p>
    </div>
    <div class="pkg-card">
      <div class="row-b"><h4>20 节课包 <span class="save">省 ¥780</span></h4><span class="price">¥3200</span></div>
      <p class="muted">¥160/节 · 8折 · 180天有效</p>
    </div>
  </div>
  <div style="padding:10px;background:#fff;border-top:1px solid #eee;display:flex;justify-content:space-between;align-items:center">
    <div><span class="muted">合计</span> <span class="price">¥1800</span></div>
    <button class="btn btn-pri click" data-go="pay">去支付</button>
  </div>`
};

// 5. 订单确认 / 支付
SCREENS.pay = {
  tag: '05 订单确认·支付',
  badge: 'tag-core',
  html: () => `${status()}${nav('订单确认')}
  <div class="content">
    <div class="card">
      <div class="row"><div class="thumb t2">数</div>
        <div style="flex:1">
          <h4 style="font-size:14px">高三数学冲刺·导数专题</h4>
          <p class="muted">10 节课包 · 60 分钟/节</p>
          <div class="row-b"><span class="price">¥1800</span><span class="muted">×1</span></div>
        </div>
      </div>
    </div>
    <div class="lg">
      <div class="item"><span><span class="ic">🎟</span>优惠券</span><span style="color:#ff5e62">-¥100 ›</span></div>
      <div class="item"><span><span class="ic">💰</span>佣金抵扣</span><span class="muted">可用 ¥58 ›</span></div>
      <div class="item"><span><span class="ic">📮</span>课时卡</span><span class="muted">无可用</span></div>
    </div>
    <div class="card">
      <div class="row-b"><span>商品金额</span><span>¥1800</span></div>
      <div class="row-b" style="margin-top:6px"><span>优惠券</span><span style="color:#ff5e62">-¥100</span></div>
      <div class="row-b" style="margin-top:6px"><span>佣金抵扣</span><span style="color:#ff5e62">-¥58</span></div>
      <div class="row-b" style="margin-top:8px;border-top:1px dashed #eee;padding-top:8px"><b>实付</b><span class="price">¥1642</span></div>
    </div>
    <div class="card">
      <h4 style="margin-bottom:8px">支付方式</h4>
      <div class="row-b" style="padding:8px 0"><span>💚 微信支付</span><span style="color:#4f7cff">●</span></div>
    </div>
  </div>
  <div style="padding:10px;background:#fff;border-top:1px solid #eee">
    <button class="btn btn-pri btn-block click" data-go="bookTeacher" data-toast="✅ 支付成功！">立即支付 ¥1642</button>
  </div>`
};

// 6. 预约老师 / 选时段
SCREENS.bookTeacher = {
  tag: '06 预约老师·选时段',
  badge: 'tag-core',
  html: () => `${status()}${nav('预约课程')}
  <div class="content">
    <div class="card">
      <div class="row" style="gap:12px">
        <div class="avatar" style="width:46px;height:46px;font-size:18px">王</div>
        <div style="flex:1">
          <div class="row-b"><b>王雪老师</b><span class="tg tg-green">在线</span></div>
          <p class="muted">高三数学 · 剩余课时 10 节</p>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="cal-head">
        <span class="click">‹</span>
        <b style="font-size:14px">2026 年 5 月</b>
        <span class="click">›</span>
      </div>
      <div class="cal-grid">
        <div class="d head">日</div><div class="d head">一</div><div class="d head">二</div><div class="d head">三</div><div class="d head">四</div><div class="d head">五</div><div class="d head">六</div>
        <div class="d dim">27</div><div class="d dim">28</div><div class="d dim">29</div><div class="d dim">30</div><div class="d">1</div><div class="d">2</div><div class="d">3</div>
        <div class="d">4</div><div class="d">5</div><div class="d">6</div><div class="d">7</div><div class="d">8</div><div class="d">9</div><div class="d">10</div>
        <div class="d">11</div><div class="d">12</div><div class="d">13</div><div class="d">14</div><div class="d">15</div><div class="d on">16</div><div class="d">17</div>
        <div class="d">18</div><div class="d">19</div><div class="d">20</div><div class="d">21</div><div class="d">22</div><div class="d">23</div><div class="d">24</div>
      </div>
    </div>
    <div class="card">
      <h4 style="margin-bottom:8px">5月16日·周六 可约时段</h4>
      <div class="slots">
        <span class="slot dis">09:00</span>
        <span class="slot">10:00</span>
        <span class="slot on">14:00</span>
        <span class="slot">15:30</span>
        <span class="slot">17:00</span>
        <span class="slot dis">19:00</span>
        <span class="slot">20:00</span>
      </div>
      <p class="muted" style="margin-top:10px">已选：5月16日 14:00-15:00 · 60分钟</p>
    </div>
  </div>
  <div style="padding:10px;background:#fff;border-top:1px solid #eee">
    <button class="btn btn-pri btn-block click" data-go="myOrder" data-toast="✅ 预约成功！将于课前30分钟提醒">确认预约</button>
  </div>`
};

// 7. 我的预约
SCREENS.myOrder = {
  tag: '07 我的预约',
  badge: 'tag-stu',
  html: () => `${status()}
  <div class="nav"><span class="title">我的预约</span></div>
  <div class="content">
    <div class="chips">
      <span class="chip on">待上课 (3)</span>
      <span class="chip">已完成 (12)</span>
      <span class="chip">已取消</span>
    </div>
    <div class="card">
      <div class="row-b"><b>📅 今天 14:00 - 15:00</b><span class="tg tg-orange">即将开始</span></div>
      <p style="font-size:13px;margin:6px 0">高三数学冲刺·导数专题 (第3节)</p>
      <p class="muted">王雪老师 · 60分钟</p>
      <div class="row" style="margin-top:10px;gap:8px">
        <button class="btn btn-out click" data-toast="已申请改约">改约</button>
        <button class="btn btn-pri click" data-go="classroom">进入课堂</button>
      </div>
    </div>
    <div class="card">
      <div class="row-b"><b>📅 5月18日 19:00</b><span class="tg tg-blue">已预约</span></div>
      <p style="font-size:13px;margin:6px 0">高三数学冲刺·导数专题 (第4节)</p>
      <p class="muted">王雪老师 · 60分钟</p>
    </div>
    <div class="card">
      <div class="row-b"><b>📅 5月20日 20:00</b><span class="tg tg-blue">已预约</span></div>
      <p style="font-size:13px;margin:6px 0">高三数学冲刺·导数专题 (第5节)</p>
      <p class="muted">王雪老师 · 60分钟</p>
    </div>
  </div>
  ${tabbar('order')}`
};

// 8. 在线课堂 (核心)
SCREENS.classroom = {
  tag: '08 在线课堂·白板+视频',
  badge: 'tag-core',
  html: () => `<div class="status" style="background:#1a1f2e;color:#fff"><span>🔴 上课中 24:18</span><span>👨‍🏫 王雪老师</span></div>
  <div class="cls-stage">
    <div class="cls-board">📐 白板：求 f(x)=x³-3x 的极值<br><br>f'(x) = 3x² - 3 = 0<br>x = ±1</div>
    <div class="cls-cam">👨‍🏫</div>
    <div class="cls-cam s2">🎓</div>
  </div>
  <div class="cls-tools">
    <div class="tool-btn on"><span class="ic">✏️</span>画笔</div>
    <div class="tool-btn"><span class="ic">📝</span>文字</div>
    <div class="tool-btn"><span class="ic">📐</span>图形</div>
    <div class="tool-btn"><span class="ic">🧹</span>橡皮</div>
    <div class="tool-btn click" data-go="courseware"><span class="ic">📑</span>课件</div>
    <div class="tool-btn click" data-toast="已开启屏幕共享"><span class="ic">📺</span>共享</div>
    <div class="tool-btn click" data-go="answer"><span class="ic">📝</span>答题</div>
  </div>
  <div class="content" style="background:#fff">
    <div class="card" style="background:#f6f7fb">
      <h4 style="font-size:13px;margin-bottom:6px">💬 互动消息</h4>
      <p style="font-size:12px;color:#555">老师：明白了吗？要不要做一道题？</p>
      <p style="font-size:12px;color:#4f7cff;margin-top:4px">我：明白了 ✅</p>
    </div>
    <div class="row" style="gap:8px;justify-content:center">
      <button class="btn btn-out click" data-toast="🎤 已开启麦克风">🎤 麦克风</button>
      <button class="btn btn-out click" data-toast="📷 已开启摄像头">📷 摄像头</button>
      <button class="btn btn-out click" data-toast="✋ 已举手">✋ 举手</button>
    </div>
  </div>
  <div style="padding:10px;background:#fff;border-top:1px solid #eee">
    <button class="btn btn-warn btn-block click" data-go="rate">挂断·结束课堂</button>
  </div>`
};

// 9. 课件查看
SCREENS.courseware = {
  tag: '09 课件查看',
  badge: 'tag-stu',
  html: () => `${status()}${nav('课件 · 导数专题')}
  <div class="content">
    <div class="card">
      <div style="height:200px;background:linear-gradient(135deg,#fff,#f0f4ff);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#4f7cff;border:1px solid #e3e6ef">
        <div style="text-align:center">
          <div style="font-size:40px">📑</div>
          <p style="font-size:13px;margin-top:8px">第 12 / 35 页</p>
        </div>
      </div>
      <div class="row-b" style="margin-top:10px">
        <button class="btn btn-out">‹ 上一页</button>
        <span class="muted">12 / 35</span>
        <button class="btn btn-out">下一页 ›</button>
      </div>
    </div>
    <div class="card">
      <h4 style="margin-bottom:8px">📚 课件目录</h4>
      <div class="lg">
        <div class="item"><span>1. 导数的定义与几何意义</span><span style="color:#38ef7d">✓</span></div>
        <div class="item"><span style="color:#4f7cff">2. 基本初等函数求导 ▶</span><span class="tg tg-blue">学习中</span></div>
        <div class="item"><span>3. 导数的运算法则</span><span class="muted">›</span></div>
        <div class="item"><span>4. 单调性与极值</span><span class="muted">›</span></div>
      </div>
    </div>
    <div class="row" style="gap:10px;justify-content:center;margin-top:10px">
      <button class="btn btn-out click" data-toast="已下载到本地">⬇ 下载</button>
      <button class="btn btn-pri click" data-go="answer">开始答题练习</button>
    </div>
  </div>`
};

// 10. 在线答题
SCREENS.answer = {
  tag: '10 在线答题',
  badge: 'tag-stu',
  html: () => `${status()}${nav('随堂练习', true, '剩余 09:42')}
  <div class="content">
    <div class="muted" style="margin-bottom:10px">第 2 / 5 题 · 单选题 · 5分</div>
    <div class="q-card">
      <p style="font-size:14px;line-height:1.6">已知函数 f(x) = x³ - 3x + 1，则 f(x) 的极大值为：</p>
      <div class="q-opt">A. -1</div>
      <div class="q-opt on">B. 3</div>
      <div class="q-opt">C. 1</div>
      <div class="q-opt">D. -3</div>
    </div>
    <div class="card">
      <h4 style="margin-bottom:8px;font-size:13px">📊 本次进度</h4>
      <div class="row" style="gap:6px">
        <div style="flex:1;height:6px;background:#eee;border-radius:3px;overflow:hidden">
          <div style="width:40%;height:100%;background:linear-gradient(90deg,#4f7cff,#6a5af9)"></div>
        </div>
        <span class="muted">2/5</span>
      </div>
    </div>
  </div>
  <div style="padding:10px;background:#fff;border-top:1px solid #eee;display:flex;gap:10px">
    <button class="btn btn-out">上一题</button>
    <button class="btn btn-pri btn-block click" data-toast="✅ 回答正确！">提交·下一题</button>
  </div>`
};

// 11. 评价
SCREENS.rate = {
  tag: '11 课程评价',
  badge: 'tag-stu',
  html: () => `${status()}${nav('评价老师')}
  <div class="content">
    <div class="card" style="text-align:center;padding:20px">
      <div class="avatar" style="width:60px;height:60px;font-size:24px;margin:0 auto 10px">王</div>
      <b>王雪老师</b>
      <p class="muted">高三数学冲刺·导数专题</p>
    </div>
    <div class="card" style="text-align:center">
      <p style="margin-bottom:10px">本节课你的整体感受？</p>
      <div class="stars" style="font-size:30px;letter-spacing:6px">★★★★★</div>
      <p style="color:#4f7cff;margin-top:6px">非常满意</p>
    </div>
    <div class="card">
      <h4 style="margin-bottom:10px;font-size:13px">具体表现</h4>
      <div class="chips">
        <span class="chip on">讲解清晰</span>
        <span class="chip on">耐心细致</span>
        <span class="chip">条理性强</span>
        <span class="chip on">课堂有趣</span>
        <span class="chip">答疑及时</span>
        <span class="chip">作业精准</span>
      </div>
    </div>
    <div class="card">
      <textarea placeholder="老师讲得真好，孩子学得很认真..." style="width:100%;border:1px solid #e3e6ef;border-radius:8px;padding:10px;height:80px;font-size:13px"></textarea>
    </div>
  </div>
  <div style="padding:10px;background:#fff;border-top:1px solid #eee">
    <button class="btn btn-pri btn-block click" data-go="poster" data-toast="✅ 评价提交成功，赠送优惠券一张">提交评价</button>
  </div>`
};

// 12. 海报分享
SCREENS.poster = {
  tag: '12 海报分享·裂变',
  badge: 'tag-core',
  html: () => `${status()}${nav('生成专属海报')}
  <div class="content">
    <div class="poster">
      <div style="font-size:12px;opacity:.85">🎁 邀请你一起学</div>
      <h3 style="margin:8px 0;font-size:18px">高三数学冲刺·导数专题</h3>
      <p style="font-size:12px;opacity:.9">王雪老师 · 北师大硕士</p>
      <p style="font-size:24px;margin-top:10px">¥199<span style="font-size:12px;opacity:.85">起/节</span></p>
      <div class="qr">📱</div>
      <p style="font-size:11px;opacity:.85">扫码注册立得 ¥100 优惠券</p>
      <p style="font-size:10px;opacity:.7;margin-top:6px">推荐人：小明 · 高分一对一</p>
    </div>
    <div class="card">
      <h4 style="margin-bottom:10px;font-size:13px">🎁 分享激励</h4>
      <p style="font-size:12px;color:#555;line-height:1.8">
        ✅ 好友通过你的海报注册：双方各得 ¥20 优惠券<br>
        ✅ 好友首次购课成功：你获得 10% 佣金返现<br>
        ✅ 累计邀请 5 人：奖励免费试听课 1 节
      </p>
    </div>
    <div class="row" style="gap:10px;justify-content:space-around">
      <button class="btn btn-out click" data-toast="海报已保存到相册">⬇ 保存海报</button>
      <button class="btn btn-pri click" data-toast="已发送给微信好友">💚 微信分享</button>
    </div>
  </div>`
};

// 13. 优惠券 / 佣金
SCREENS.coupon = {
  tag: '13 卡券·佣金账户',
  badge: 'tag-stu',
  html: () => `${status()}${nav('我的卡券')}
  <div class="content">
    <div class="card" style="background:linear-gradient(135deg,#4f7cff,#6a5af9);color:#fff">
      <p style="font-size:12px;opacity:.85">💰 佣金账户余额</p>
      <h2 style="font-size:28px;margin:6px 0">¥ 158.00</h2>
      <div class="row" style="gap:10px;margin-top:10px">
        <button class="btn" style="background:rgba(255,255,255,.2);color:#fff" >提现</button>
        <button class="btn" style="background:rgba(255,255,255,.2);color:#fff">明细</button>
      </div>
    </div>
    <div class="chips">
      <span class="chip on">优惠券 (3)</span>
      <span class="chip">课时卡 (10)</span>
      <span class="chip">已使用</span>
    </div>
    <div class="coupon">
      <div class="left"><b>¥100</b><small>满199可用</small></div>
      <div class="right">
        <h5>新人专享券</h5>
        <p>有效期至 2026.06.30</p>
        <button class="btn btn-pri" style="padding:4px 12px;font-size:11px;margin-top:4px">立即使用</button>
      </div>
    </div>
    <div class="coupon">
      <div class="left"><b>8.5折</b><small>课包专用</small></div>
      <div class="right">
        <h5>课包折扣券</h5>
        <p>限购 10 节及以上课包</p>
        <button class="btn btn-pri" style="padding:4px 12px;font-size:11px;margin-top:4px">立即使用</button>
      </div>
    </div>
    <div class="coupon">
      <div class="left" style="background:linear-gradient(135deg,#43c6ac,#191654)"><b>¥20</b><small>无门槛</small></div>
      <div class="right">
        <h5>邀请好友奖励券</h5>
        <p>邀请小红获得 · 有效期 30 天</p>
      </div>
    </div>
  </div>`
};

// 14. 个人中心
SCREENS.me = {
  tag: '14 个人中心',
  badge: 'tag-stu',
  html: () => `${status()}
  <div class="profile-head">
    <div class="row">
      <div class="avatar">小</div>
      <div style="flex:1">
        <b style="font-size:16px">小明同学</b>
        <p style="font-size:12px;opacity:.85">高三 · 已学 12 节</p>
      </div>
      <span style="font-size:18px">⚙️</span>
    </div>
    <div class="stats">
      <div><b>10</b><small>剩余课时</small></div>
      <div><b>3</b><small>优惠券</small></div>
      <div><b>¥158</b><small>佣金</small></div>
      <div><b>5</b><small>已邀请</small></div>
    </div>
  </div>
  <div class="content">
    <div class="lg">
      <div class="item click" data-go="myOrder"><span><span class="ic">📋</span>我的预约</span><span class="muted">›</span></div>
      <div class="item"><span><span class="ic">📦</span>我的订单</span><span class="muted">›</span></div>
      <div class="item click" data-go="courseware"><span><span class="ic">📑</span>我的课件</span><span class="muted">›</span></div>
      <div class="item"><span><span class="ic">📝</span>错题本</span><span class="muted">12 道 ›</span></div>
      <div class="item"><span><span class="ic">📊</span>学习报告</span><span class="muted">›</span></div>
    </div>
    <div class="lg">
      <div class="item click" data-go="coupon"><span><span class="ic">🎟</span>卡券中心</span><span class="muted">3 张可用 ›</span></div>
      <div class="item click" data-go="poster"><span><span class="ic">🎁</span>邀请好友赚佣金</span><span class="muted">›</span></div>
      <div class="item"><span><span class="ic">⭐</span>我的评价</span><span class="muted">›</span></div>
    </div>
    <div class="lg">
      <div class="item"><span><span class="ic">💬</span>在线客服</span><span class="muted">›</span></div>
      <div class="item"><span><span class="ic">ℹ️</span>关于我们</span><span class="muted">›</span></div>
    </div>
  </div>
  ${tabbar('me')}`
};

// 15. 教师工作台
SCREENS.tchHome = {
  tag: '15 教师工作台',
  badge: 'tag-tch',
  html: () => `${status()}
  <div class="profile-head" style="background:linear-gradient(135deg,#43c6ac,#191654)">
    <div class="row">
      <div class="avatar" style="background:#fff;color:#43c6ac">王</div>
      <div style="flex:1">
        <b style="font-size:16px">王雪老师 👨‍🏫</b>
        <p style="font-size:12px;opacity:.85">高三数学 · 已认证</p>
      </div>
      <span style="font-size:18px">🔔</span>
    </div>
    <div class="stats">
      <div><b>23</b><small>本月课时</small></div>
      <div><b>8</b><small>今日待上</small></div>
      <div><b>4.9</b><small>评分</small></div>
      <div><b>¥6.8k</b><small>本月收益</small></div>
    </div>
  </div>
  <div class="content">
    <div class="tch-summary" style="margin-bottom:14px">
      <div class="b click" data-go="createMeet"><b>📹</b><small>创建会议</small></div>
      <div class="b click" data-toast="档期管理"><b>📅</b><small>档期管理</small></div>
      <div class="b click" data-toast="课件库"><b>📑</b><small>课件库</small></div>
      <div class="b click" data-toast="题库管理"><b>📝</b><small>题库管理</small></div>
    </div>
    <h4 style="margin:6px 0 10px;font-size:14px">📅 今日课程</h4>
    <div class="card">
      <div class="row-b"><b>14:00 - 15:00</b><span class="tg tg-orange">即将开始</span></div>
      <p style="font-size:13px;margin:6px 0">小明同学 · 导数专题(3)</p>
      <div class="row" style="gap:8px;margin-top:8px">
        <button class="btn btn-out click" data-toast="已发送提醒">📨 提醒</button>
        <button class="btn btn-pri click" data-go="classroom">进入课堂</button>
      </div>
    </div>
    <div class="card">
      <div class="row-b"><b>16:00 - 17:00</b><span class="tg tg-blue">已预约</span></div>
      <p style="font-size:13px;margin:6px 0">小红同学 · 函数综合(2)</p>
    </div>
    <div class="card">
      <div class="row-b"><b>19:00 - 20:00</b><span class="tg tg-blue">已预约</span></div>
      <p style="font-size:13px;margin:6px 0">小华同学 · 三角函数(1)</p>
    </div>
  </div>
  <div class="tabbar">
    <div class="ti active"><span class="ic">🏠</span>工作台</div>
    <div class="ti"><span class="ic">👥</span>学生</div>
    <div class="ti"><span class="ic">💰</span>收益</div>
    <div class="ti"><span class="ic">👤</span>我的</div>
  </div>`
};

// 16. 创建腾讯会议
SCREENS.createMeet = {
  tag: '16 教师·创建腾讯会议',
  badge: 'tag-tch',
  html: () => `${status()}${nav('创建腾讯会议')}
  <div class="content">
    <div class="card">
      <div class="form-item">
        <label>关联预约</label>
        <select><option>小明 · 5月16日 14:00 · 导数(3)</option></select>
      </div>
      <div class="form-item">
        <label>会议主题</label>
        <input value="导数专题第3讲 - 小明同学" />
      </div>
      <div class="form-item">
        <label>开始时间</label>
        <input value="2026-05-16 14:00" />
      </div>
      <div class="form-item">
        <label>课时时长</label>
        <select><option>40 分钟</option><option selected>60 分钟</option><option>90 分钟</option></select>
      </div>
      <div class="form-item">
        <label>会议密码（可选）</label>
        <input placeholder="留空则自动生成" />
      </div>
    </div>
    <div class="card">
      <h4 style="margin-bottom:8px;font-size:13px">⚙️ 课堂功能</h4>
      <div class="lg">
        <div class="item"><span>📹 自动开启摄像头</span><span style="color:#4f7cff">●</span></div>
        <div class="item"><span>📐 互动白板</span><span style="color:#4f7cff">●</span></div>
        <div class="item"><span>📺 屏幕共享</span><span style="color:#4f7cff">●</span></div>
        <div class="item"><span>📑 课件投屏</span><span style="color:#4f7cff">●</span></div>
        <div class="item"><span>🔴 课堂录制</span><span class="muted">●</span></div>
      </div>
    </div>
    <p class="muted" style="text-align:center;font-size:11px">会议创建后将自动同步至小程序，学生可在「我的预约」页面进入</p>
  </div>
  <div style="padding:10px;background:#fff;border-top:1px solid #eee">
    <button class="btn btn-pri btn-block click" data-go="tchHome" data-toast="✅ 会议创建成功！会议号 612-345-678">创建会议并发送通知</button>
  </div>`
};

// 给 study tab 兜底
SCREENS.study = SCREENS.courseware;
