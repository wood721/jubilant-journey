// ============================================
// 工具
// ============================================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const charMap = {};
characters.forEach(c => charMap[c.id] = c);

// ============================================
// 视图切换
// ============================================
$$('.view-switch button').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.view-switch button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    $$('.view').forEach(v => v.classList.remove('active'));
    $(`#view-${btn.dataset.view}`).classList.add('active');
    if (btn.dataset.view === 'graph' && !cy) initGraph();
  });
});

// ============================================
// 列表视图
// ============================================
function renderList(filter = '') {
  const kw = filter.trim().toLowerCase();
  const list = $('#char-list');
  list.innerHTML = '';

  characters
    .filter(c => {
      if (!kw) return true;
      const haystack = [
        c.name, c.role, c.bio,
        ...(c.tags || []),
        ...(c.personality || [])
      ].join(' ').toLowerCase();
      return haystack.includes(kw);
    })
    .forEach(c => {
      const card = document.createElement('div');
      card.className = 'char-card';
      card.innerHTML = `
        <div class="avatar">${c.avatar ? `<img src="${c.avatar}" alt="">` : c.name[0]}</div>
        <div class="name">${c.name}</div>
        <div class="role">${c.role || ''}</div>
        <div class="tags">${(c.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}</div>
      `;
      card.addEventListener('click', () => openDetail(c.id));
      list.appendChild(card);
    });
}

$('#search').addEventListener('input', e => renderList(e.target.value));

// ============================================
// 详情弹层
// ============================================
function openDetail(id) {
  const c = charMap[id];
  if (!c) return;

  // 找到所有与该角色相关的关系，并转换成"从该角色视角看"
  const rels = relationships
    .filter(r => r.from === id || r.to === id)
    .map(r => {
      const isForward = r.from === id;
      const otherId = isForward ? r.to : r.from;
      const other = charMap[otherId];
      return {
        otherName: other ? other.name : otherId,
        label: isForward ? r.forwardLabel : r.backwardLabel,
        note: r.note || '',
        type: r.type
      };
    });

  const html = `
    <h2>${c.name}</h2>
    <div class="sub">${c.role || ''}</div>

    <div class="detail-section">
      <h3>简介</h3>
      <p style="font-size:14px;line-height:1.8;color:#4a4a4a;">${c.bio || '暂无'}</p>
    </div>

    ${c.appearance ? `
    <div class="detail-section">
      <h3>外貌</h3>
      <div class="appearance-box">${c.appearance}</div>
    </div>` : ''}

    ${c.personality && c.personality.length ? `
    <div class="detail-section">
      <h3>性格</h3>
      <div class="tags">${c.personality.map(p => `<span class="tag">${p}</span>`).join('')}</div>
    </div>` : ''}

    ${c.tags && c.tags.length ? `
    <div class="detail-section">
      <h3>标签</h3>
      <div class="tags">${c.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    </div>` : ''}

    ${c.timeline && c.timeline.length ? `
    <div class="detail-section">
      <h3>生平</h3>
      <div class="timeline">
        ${c.timeline.map(t => `
          <div class="tl-item">
            <div class="tl-time">${t.time}</div>
            <div class="tl-text">${t.text}</div>
          </div>`).join('')}
      </div>
    </div>` : ''}

    ${rels.length ? `
    <div class="detail-section">
      <h3>关系</h3>
      ${rels.map(r => `
        <div class="rel-item">
          <span class="rel-type">${r.label}</span>
          <span>${r.otherName}</span>
          ${r.note ? `<span class="rel-note">· ${r.note}</span>` : ''}
        </div>`).join('')}
    </div>` : ''}
  `;

  $('#detail-content').innerHTML = html;
  $('#detail-overlay').classList.add('active');
}

$('#close-detail').addEventListener('click', () => {
  $('#detail-overlay').classList.remove('active');
});
$('#detail-overlay').addEventListener('click', e => {
  if (e.target.id === 'detail-overlay') {
    $('#detail-overlay').classList.remove('active');
  }
});

// ============================================
// 关系网（Cytoscape）
// ============================================
let cy = null;
let currentCenter = CENTER_ID;

function buildElements(centerId) {
  // BFS 算距离
  const adj = {};
  relationships.forEach(r => {
    (adj[r.from] = adj[r.from] || []).push(r.to);
    (adj[r.to] = adj[r.to] || []).push(r.from);
  });

  const dist = { [centerId]: 0 };
  const queue = [centerId];
  while (queue.length) {
    const cur = queue.shift();
    (adj[cur] || []).forEach(n => {
      if (dist[n] === undefined) {
        dist[n] = dist[cur] + 1;
        queue.push(n);
      }
    });
  }

  // 节点：只显示距离 <= 2 的（避免太乱）
  const nodes = [];
  const nodeIds = new Set();
  Object.keys(dist).forEach(id => {
    if (dist[id] <= 2 && charMap[id]) {
      nodeIds.add(id);
      nodes.push({
        data: {
          id,
          label: charMap[id].name,
          dist: dist[id],
          image: charMap[id].avatar || ''
        }
      });
    }
  });

  // 边：两端都在节点集里才显示
  const edges = [];
  relationships.forEach((r, i) => {
    if (nodeIds.has(r.from) && nodeIds.has(r.to)) {
      edges.push({
        data: {
          id: 'e' + i,
          source: r.from,
          target: r.to,
          label: r.forwardLabel,
          color: REL_COLORS[r.type] || REL_COLORS['默认'],
          type: r.type
        }
      });
    }
  });

  return [...nodes, ...edges];
}

function initGraph() {
  cy = cytoscape({
    container: $('#cy'),
    elements: buildElements(currentCenter),
    style: [
      {
        selector: 'node',
        style: {
          'label': 'data(label)',
          'text-valign': 'bottom',
          'text-margin-y': 6,
          'font-size': 13,
          'color': '#4a4a4a',
          'width': 56,
          'height': 56,
          'background-color': '#d8cfc4',
          'background-image': 'data(image)',
          'background-fit': 'cover',
          'background-clip': 'node',
          'border-width': 2,
          'border-color': '#fff',
          'text-wrap': 'wrap',
          'text-max-width': 80
        }
      },
      {
        selector: 'node[dist = 0]',
        style: {
          'width': 76,
          'height': 76,
          'background-color': '#6b5b4f',
          'border-width': 3,
          'border-color': '#c9b8a8',
          'font-size': 15,
          'font-weight': 'bold'
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 1.5,
          'line-color': 'data(color)',
          'target-arrow-color': 'data(color)',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier',
          'label': 'data(label)',
          'font-size': 10,
          'color': '#8a7d70',
          'text-background-color': '#fff',
          'text-background-opacity': 0.85,
          'text-background-padding': 2,
          'text-rotation': 'autorotate'
        }
      },
      {
        selector: 'node:selected',
        style: {
          'border-width': 4,
          'border-color': '#e08a8a'
        }
      }
    ],
    layout: {
      name: 'concentric',
      concentric: (node) => {
        // dist 越小权重越大
        return 100 - node.data('dist') * 50;
      },
      levelWidth: () => 1,
      minNodeSpacing: 40,
      padding: 40,
      animate: true,
      animationDuration: 400
    },
    wheelSensitivity: 0.2
  });

  // 点击节点：以它为中心重新展开
  cy.on('tap', 'node', (evt) => {
    const id = evt.target.id();
    if (id === currentCenter) return;
    currentCenter = id;
    $('#center-name').textContent = charMap[id].name;
    cy.elements().remove();
    cy.add(buildElements(currentCenter));
    cy.layout({
      name: 'concentric',
      concentric: (node) => 100 - node.data('dist') * 50,
      levelWidth: () => 1,
      minNodeSpacing: 40,
      padding: 40,
      animate: true,
      animationDuration: 400
    }).run();
  });

  // 双击节点：打开详情
  cy.on('dbltap', 'node', (evt) => {
    openDetail(evt.target.id());
  });
}

$('#reset-center').addEventListener('click', () => {
  if (!cy) return;
  currentCenter = CENTER_ID;
  $('#center-name').textContent = charMap[CENTER_ID].name;
  cy.elements().remove();
  cy.add(buildElements(currentCenter));
  cy.layout({
    name: 'concentric',
    concentric: (node) => 100 - node.data('dist') * 50,
    levelWidth: () => 1,
    minNodeSpacing: 40,
    padding: 40,
    animate: true,
    animationDuration: 400
  }).run();
});

// ============================================
// 启动
// ============================================
renderList();
