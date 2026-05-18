// 古琴智能体三期 · 全局交互层
// 由 sidebar.js 自动注入；为所有按钮 / Tab / 输入框 / 表格行 / checkbox 添加真实交互反馈

(function(){
  // ===== Toast 提示 =====
  if(!document.getElementById('__toast_style')){
    const st = document.createElement('style');
    st.id = '__toast_style';
    st.textContent = `
      .toast-host{position:fixed;top:80px;left:50%;transform:translateX(-50%);z-index:9999;display:flex;flex-direction:column;gap:8px;pointer-events:none;}
      .toast{background:rgba(31,35,48,.92);color:#fff;padding:10px 18px;border-radius:8px;font-size:13px;box-shadow:0 8px 24px rgba(0,0,0,.25);animation:toastIn .2s ease;backdrop-filter:blur(8px);min-width:160px;text-align:center;}
      .toast.success{background:#23a06b;}.toast.warn{background:#d99a2b;}.toast.danger{background:#d14343;}
      @keyframes toastIn{from{transform:translateY(-10px);opacity:0;}to{transform:translateY(0);opacity:1;}}
      .ripple{position:relative;overflow:hidden;}
      .ripple::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at var(--x,50%) var(--y,50%), rgba(255,255,255,.5) 0, transparent 50%);opacity:0;transition:opacity .4s;}
      .ripple.go::after{opacity:1;}
      .row-selected{background:#fff5e1 !important;box-shadow:inset 3px 0 0 var(--gold);}
      .tag-filter.on{background:var(--gold) !important;color:#fff !important;}
      .modal-mask{position:fixed;inset:0;background:rgba(31,35,48,.4);z-index:9000;display:flex;align-items:center;justify-content:center;animation:fadeIn .2s;backdrop-filter:blur(4px);}
      .modal{background:#fff;border-radius:12px;padding:24px;width:90%;max-width:480px;box-shadow:0 24px 80px rgba(0,0,0,.3);animation:popIn .2s;}
      .modal h3{margin:0 0 14px;font-size:16px;}
      .modal .actions{display:flex;justify-content:flex-end;gap:8px;margin-top:18px;}
      @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
      @keyframes popIn{from{transform:scale(.95);opacity:0;}to{transform:scale(1);opacity:1;}}
    `;
    document.head.appendChild(st);
  }
  let toastHost = document.querySelector('.toast-host');
  if(!toastHost){ toastHost = document.createElement('div'); toastHost.className='toast-host'; document.body.appendChild(toastHost); }
  window.toast = function(msg, type){
    const el = document.createElement('div');
    el.className = 'toast ' + (type||'');
    el.textContent = msg;
    toastHost.appendChild(el);
    setTimeout(()=>{ el.style.opacity='0'; el.style.transition='opacity .3s'; setTimeout(()=>el.remove(),300); }, 1800);
  };
  window.modal = function(title, body, onOk){
    const mask = document.createElement('div');
    mask.className = 'modal-mask';
    mask.innerHTML = `<div class="modal"><h3>${title}</h3><div>${body}</div><div class="actions"><button class="btn" data-close>取消</button><button class="btn primary" data-ok>确定</button></div></div>`;
    document.body.appendChild(mask);
    mask.addEventListener('click', e=>{
      if(e.target===mask || e.target.dataset.close!==undefined) mask.remove();
      if(e.target.dataset.ok!==undefined){ mask.remove(); onOk && onOk(); }
    });
  };

  // ===== 通用：按钮点击涟漪 + 默认提示 =====
  document.addEventListener('click', function(e){
    const btn = e.target.closest('.btn');
    if(btn){
      const rect = btn.getBoundingClientRect();
      btn.style.setProperty('--x', (e.clientX-rect.left)+'px');
      btn.style.setProperty('--y', (e.clientY-rect.top)+'px');
      btn.classList.add('ripple','go');
      setTimeout(()=>btn.classList.remove('go'), 400);

      // 链接按钮不做拦截
      if(btn.tagName==='A' && btn.getAttribute('href')) return;
      // 已绑定特殊事件的不提示
      if(btn.dataset.silent !== undefined) return;
      // 表单按钮根据 文字内容 给反馈
      const txt = btn.textContent.trim();
      if(/取消|关闭/.test(txt)){ return; }
      else if(/保存|提交|确定|续约|发送/.test(txt)){ window.toast('已保存 ✓','success'); }
      else if(/删除|下架|终止|禁言/.test(txt)){ window.toast('操作已执行','warn'); }
      else if(/恢复|解除/.test(txt)){ window.toast('已恢复','success'); }
      else if(/^导出|^导入/.test(txt)){ window.toast(txt+' 任务已提交','success'); }
      else if(/编辑|详情|查看|复盘|回放/.test(txt)){ /* 通常会有页面跳转，不提示 */ }
      else if(/继续|进入/.test(txt)){ /* 跳转类 */ }
      else if(/数字人回答/.test(txt)){
        // 控制台：点击后将该行标记为已回答
        const row = btn.closest('.danmu-item');
        if(row){
          const tag = row.querySelector('.tag');
          if(tag){ tag.className='tag tag-orange'; tag.textContent='已回答'; }
          btn.outerHTML = '<span style="color:#23a06b;font-size:11px;">✓ 已分发</span>';
          window.toast('已让数字人回答','success');
        }
      }
      else if(/人工接管/.test(txt)){
        const row = btn.closest('.danmu-item');
        if(row){ row.style.background='#1a3d36'; row.querySelector('.tag').className='tag tag-green'; row.querySelector('.tag').textContent='人工已接管'; btn.outerHTML='<span style="color:#5dd9a8;font-size:11px;">✓ 您已接管</span>'; window.toast('已接管，请稍后回复','warn'); }
      }
      else if(/忽略/.test(txt)){
        const row = btn.closest('.danmu-item');
        if(row){ row.style.opacity='.4'; btn.outerHTML='<span style="color:#888;font-size:11px;">已忽略</span>'; }
      }
      else if(/^预约$/.test(txt)){
        btn.textContent = '✓ 已预约';
        btn.classList.add('primary');
        window.toast('预约成功，开播前 10 分钟提醒您','success');
      }
      else if(/^取消预约$/.test(txt)){
        window.toast('已取消预约','warn');
      }
      else if(/续约/.test(txt)){
        window.modal('续约数字人授权', '<p>选择续约年限：</p><label class="field"><select><option>1 年（¥ 12,000）</option><option>2 年（¥ 22,000）</option><option>3 年（¥ 30,000）</option></select></label>', ()=>window.toast('续约申请已提交','success'));
      }
      else if(/立即支付/.test(txt) || /立即报名/.test(txt)){
        // 支付/报名走 onclick / href 跳转
      }
    }
  });

  // ===== Tab 组：同一容器内 .btn 互斥选中 =====
  // 自动识别：父元素内有 ≥2 个 .btn.sm 且其中至少 1 个含 'primary' 类 → 视为 tab 组
  document.querySelectorAll('div, h3').forEach(container=>{
    const btns = Array.from(container.children).filter(c=>c.classList && c.classList.contains('btn'));
    if(btns.length >= 2 && btns.some(b=>b.classList.contains('primary'))){
      btns.forEach(b=>{
        if(b.tagName==='A' && b.getAttribute('href')) return;
        b.addEventListener('click', e=>{
          btns.forEach(x=>x.classList.remove('primary'));
          b.classList.add('primary');
          e.stopPropagation();
        });
      });
    }
  });

  // ===== 表格行选中 =====
  document.querySelectorAll('table.tbl tbody').forEach(tb=>{
    tb.addEventListener('click', e=>{
      const tr = e.target.closest('tr');
      if(!tr) return;
      // 点击在按钮/链接上不切换选中
      if(e.target.closest('a,button,input,select')) return;
      tb.querySelectorAll('tr').forEach(t=>t.classList.remove('row-selected'));
      tr.classList.add('row-selected');
    });
  });

  // ===== Checkbox / Radio：点击勾选反馈 =====
  document.querySelectorAll('input[type=checkbox],input[type=radio]').forEach(cb=>{
    cb.addEventListener('change', ()=>{
      if(cb.dataset.silent !== undefined) return;
      const label = cb.closest('label')?.innerText?.trim().slice(0,30) || '选项';
      window.toast((cb.checked?'已勾选：':'已取消：')+label);
    });
  });

  // ===== 开关样式（.toggle） =====
  document.querySelectorAll('[data-toggle]').forEach(sw=>{
    sw.addEventListener('click', ()=>{
      const on = sw.dataset.toggle === 'on';
      sw.dataset.toggle = on ? 'off' : 'on';
      sw.style.background = on ? '#ddd' : '#23a06b';
      const dot = sw.querySelector('span');
      if(dot){ dot.style.left = on ? '2px' : 'auto'; dot.style.right = on ? 'auto' : '2px'; }
      window.toast(on ? '已关闭' : '已开启', on ? 'warn' : 'success');
    });
  });

  // 已存在的视觉开关（reserve.html 等）自动绑定
  document.querySelectorAll('span[style*="background:#23a06b"][style*="border-radius:99px"], span[style*="background:#ddd"][style*="border-radius:99px"]').forEach(sw=>{
    sw.style.cursor = 'pointer';
    sw.addEventListener('click', ()=>{
      const isOn = sw.style.background.includes('#23a06b') || sw.style.background.includes('rgb(35, 160, 107)');
      sw.style.background = isOn ? '#ddd' : '#23a06b';
      const dot = sw.querySelector('span');
      if(dot){
        if(isOn){ dot.style.right = 'auto'; dot.style.left = '2px'; }
        else { dot.style.left = 'auto'; dot.style.right = '2px'; }
      }
      window.toast(isOn ? '提醒已关闭' : '提醒已开启', isOn ? 'warn' : 'success');
    });
  });

  // ===== 标签筛选（.tag 系列 标签 hover/click） =====
  document.querySelectorAll('.tag').forEach(t=>{
    if(t.textContent.includes('✕')){
      t.style.cursor='pointer';
      t.addEventListener('click', ()=>{
        if(confirm('确认删除「'+t.textContent.replace('✕','').trim()+'」？')){
          t.style.transition='all .2s';
          t.style.transform='scale(0)';
          setTimeout(()=>t.remove(),200);
          window.toast('已删除','warn');
        }
      });
    }
  });

  // ===== 输入框：回车提交触发 toast =====
  document.querySelectorAll('input[type=text], input:not([type])').forEach(input=>{
    if(input.placeholder && /搜索|输入/.test(input.placeholder)){
      input.addEventListener('keydown', e=>{
        if(e.key==='Enter' && input.value.trim()){
          window.toast('搜索：'+input.value);
        }
      });
    }
  });

})();
