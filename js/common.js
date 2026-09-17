/* ============================================
   林燕心语网站 - 公共 JavaScript 模块
   所有页面共用的头部渲染、页脚渲染、搜索建议、清除按钮、返回顶部等功能
   修改此文件，所有页面自动更新
   ============================================ */

// ---------- 全局配置 ----------
const SITE_CONFIG = {
  siteName: '🌸 林燕心语',
  siteUrl: 'index.html',
  searchPlaceholder: '搜索文章、关键词...',
  footer: {
    title: '🌸 林燕心语 · 青春期心理与家庭教育',
    subtitle: '杭州一线初中教师林燕的育儿心得分享',
    contact: '公众号：林燕心语 | 商务合作：linyanxinyu@163.com',
    copyright: '© 2026 林燕心语 版权所有'
  },
  hotKeywords: [
    '青春期', '厌学', '亲子沟通', '手机沉迷', '学习动力',
    '情绪管理', '叛逆', '考试焦虑', '自卑', '早恋',
    '家庭教育', '父母关系', '校园欺凌', '抑郁', '高情商', '自我成长'
  ],
  categoryNames: {
    communication: '亲子沟通',
    adolescence: '青春期',
    learning: '学习动力',
    emotion: '情绪管理',
    digital: '手机沉迷',
    family: '家庭教育',
    special: '特殊问题',
    growth: '心理成长'
  }
};

// ---------- 渲染头部导航栏 ----------
function renderHeader() {
  const headerHtml = `
    <header class="topbar">
      <a href="${SITE_CONFIG.siteUrl}" class="topbar-logo">${SITE_CONFIG.siteName}</a>
      <div class="search-wrapper">
        <div class="search-box" style="flex:1;">
          <span class="search-icon">🔍</span>
          <input type="text" id="searchInput" placeholder="${SITE_CONFIG.searchPlaceholder}" autocomplete="off" />
          <span class="search-clear" id="searchClear" style="display:none;">×</span>
        </div>
        <div class="search-suggestions" id="searchSuggestions"></div>
      </div>
    </header>
  `;

  // 插入到 body 的最前面
  const body = document.body;
  const firstChild = body.firstChild;
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = headerHtml.trim();
  const headerElement = tempDiv.firstChild;

  if (firstChild) {
    body.insertBefore(headerElement, firstChild);
  } else {
    body.appendChild(headerElement);
  }

  // 初始化搜索功能
  initSearch();
}

// ---------- 渲染页脚 ----------
function renderFooter(extraLinks = '') {
  const defaultLinks = `
    <a href="articles.html">文章合集</a> ·
    <a href="index.html">🏠 返回首页</a>
  `;

  const footerHtml = `
    <footer>
      <p>${SITE_CONFIG.footer.title}</p>
      <p>${SITE_CONFIG.footer.subtitle}</p>
      <p>${SITE_CONFIG.footer.contact}</p>
      <p style="margin-top:8px;">
        ${extraLinks || defaultLinks}
      </p>
      <p style="margin-top:12px;color:var(--text-muted);">${SITE_CONFIG.footer.copyright}</p>
    </footer>
  `;

  // 插入到 body 的最后面（在 script 标签之前）
  const body = document.body;
  const scripts = body.querySelectorAll('script');
  const lastScript = scripts[scripts.length - 1];

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = footerHtml.trim();
  const footerElement = tempDiv.firstChild;

  if (lastScript) {
    body.insertBefore(footerElement, lastScript);
  } else {
    body.appendChild(footerElement);
  }
}

// ---------- 搜索功能初始化 ----------
let commonActiveIndex = -1;

function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchClear = document.getElementById('searchClear');
  const searchSuggestions = document.getElementById('searchSuggestions');

  if (!searchInput) return;

  // 搜索输入事件
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    showSearchSuggestions(query);
    // 显示/隐藏清除按钮
    if (searchClear) {
      searchClear.style.display = query ? 'flex' : 'none';
    }
    // 触发自定义事件，让页面自己处理搜索过滤
    window.dispatchEvent(new CustomEvent('search-input', { detail: { query } }));
  });

  // 清除按钮点击事件
  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      hideSearchSuggestions();
      searchClear.style.display = 'none';
      searchInput.focus();
      window.dispatchEvent(new CustomEvent('search-clear'));
    });
  }

  // 键盘导航
  searchInput.addEventListener('keydown', (e) => {
    const items = searchSuggestions.querySelectorAll('.search-suggestion-item');

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (items.length > 0) {
        commonActiveIndex = (commonActiveIndex + 1) % items.length;
        updateActiveSuggestion(items);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (items.length > 0) {
        commonActiveIndex = commonActiveIndex <= 0 ? items.length - 1 : commonActiveIndex - 1;
        updateActiveSuggestion(items);
      }
    } else if (e.key === 'Enter') {
      if (commonActiveIndex >= 0 && items[commonActiveIndex]) {
        e.preventDefault();
        items[commonActiveIndex].click();
      }
    } else if (e.key === 'Escape') {
      hideSearchSuggestions();
    }
  });

  // 点击页面其他地方关闭搜索建议
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrapper')) {
      hideSearchSuggestions();
    }
  });
}

// ---------- 显示搜索建议 ----------
function showSearchSuggestions(query) {
  const suggestionsEl = document.getElementById('searchSuggestions');
  if (!suggestionsEl) return;

  if (!query) {
    suggestionsEl.classList.remove('active');
    suggestionsEl.innerHTML = '';
    commonActiveIndex = -1;
    return;
  }

  const queryLower = query.toLowerCase();
  const suggestions = [];

  // 匹配热门关键词
  SITE_CONFIG.hotKeywords.forEach(kw => {
    if (kw.toLowerCase().includes(queryLower)) {
      suggestions.push({ type: '关键词', text: kw, icon: '🔥' });
    }
  });

  // 匹配文章标题（如果页面有文章卡片）
  const articleCards = document.querySelectorAll('.article-card');
  articleCards.forEach(card => {
    const title = card.querySelector('.title')?.textContent || '';
    const cat = card.dataset.cat || '';
    if (title && title.toLowerCase().includes(queryLower)) {
      suggestions.push({
        type: SITE_CONFIG.categoryNames[cat] || '文章',
        text: title,
        icon: '📄'
      });
    }
  });

  // 去重并限制数量
  const uniqueSuggestions = [];
  const seen = new Set();
  suggestions.forEach(s => {
    if (!seen.has(s.text)) {
      seen.add(s.text);
      uniqueSuggestions.push(s);
    }
  });

  if (uniqueSuggestions.length === 0) {
    suggestionsEl.innerHTML = '<div class="empty">没有找到相关内容</div>';
  } else {
    suggestionsEl.innerHTML = uniqueSuggestions.slice(0, 8).map((s, i) => `
      <div class="search-suggestion-item ${i === commonActiveIndex ? 'active' : ''}" data-index="${i}" data-text="${s.text}">
        <span class="icon">${s.icon}</span>
        <span class="text">${highlightMatch(s.text, query)}</span>
        <span class="type">${s.type}</span>
      </div>
    `).join('');

    // 绑定点击事件
    suggestionsEl.querySelectorAll('.search-suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        const text = item.dataset.text;
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
          searchInput.value = text;
          searchInput.dispatchEvent(new Event('input'));
        }
        hideSearchSuggestions();
        const clearBtn = document.getElementById('searchClear');
        if (clearBtn) clearBtn.style.display = 'flex';
      });
    });
  }

  suggestionsEl.classList.add('active');
}

// ---------- 隐藏搜索建议 ----------
function hideSearchSuggestions() {
  const suggestionsEl = document.getElementById('searchSuggestions');
  if (suggestionsEl) {
    suggestionsEl.classList.remove('active');
  }
  commonActiveIndex = -1;
}

// ---------- 高亮匹配文字 ----------
function highlightMatch(text, query) {
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}

// ---------- 更新激活的建议项 ----------
function updateActiveSuggestion(items) {
  items.forEach((item, i) => {
    item.classList.toggle('active', i === commonActiveIndex);
  });
}

// ---------- 初始化返回顶部按钮 ----------
function initBackToTop() {
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.id = 'backToTop';
  backToTopBtn.innerHTML = '↑';
  backToTopBtn.title = '返回顶部';
  backToTopBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
}

// ---------- 立即渲染头部（在脚本加载时执行，确保后续代码能找到 searchInput） ----------
(function() {
  // 如果页面没有手动渲染头部，则立即渲染
  if (!document.querySelector('.topbar') && document.body) {
    renderHeader();
  }
})();

// ---------- 页面加载完成后自动初始化 ----------
document.addEventListener('DOMContentLoaded', function() {
  // 如果页面没有手动渲染头部，则自动渲染（兜底）
  if (!document.querySelector('.topbar')) {
    renderHeader();
  }
  // 如果页面没有手动渲染页脚，则自动渲染
  if (!document.querySelector('footer')) {
    // 检查是否有自定义页脚链接
    const customLinks = window.footerCustomLinks || '';
    renderFooter(customLinks);
  }
  // 初始化返回顶部按钮
  if (!document.getElementById('backToTop')) {
    initBackToTop();
  }
});
