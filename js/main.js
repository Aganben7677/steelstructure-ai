
// Page search uses the same local destinations as navigation.
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('search-input');
  const trigger = document.getElementById('search-btn');
  if (!input || !trigger) return;
  const results = document.createElement('div');
  results.className = 'site-search-results';
  results.id = 'search-results';
  results.setAttribute('aria-live', 'polite');
  input.insertAdjacentElement('afterend', results);
  const pages = [
    ['nav_projects', 'hot-projects-map.html', 'project map 项目 地图'],
    ['nav_daily', 'daily.html', 'daily brief 简报 新闻'],
    ['nav_epc', 'epc.html', 'epc contractor 承包商'],
    ['nav_supply', 'supply-map.html', 'supply mill port 供应链 钢厂 港口'],
    ['knowledge_title', 'knowledge.html', 'knowledge tender review material weld coating 投标 审查 材料 焊接 防腐 知识'],
    ['resource_templates', 'resources.html#templates', 'resource template csv download checklist clarification 资源 模板 下载 清单 澄清'],
    ['nav_about', 'about.html', 'about 关于'],
    ['footer_contact', 'contact.html', 'contact 联系']
  ];
  function render() {
    const query = input.value.trim().toLowerCase();
    results.replaceChildren();
    pages.filter(([key, , words]) => `${t(key)} ${words}`.toLowerCase().includes(query)).forEach(([key, href]) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = t(key);
      results.append(link);
    });
    if (!results.children.length) results.textContent = currentLang === 'zh' ? '没有匹配的页面' : 'No matching pages';
  }
  input.addEventListener('input', render);
  trigger.addEventListener('click', render);
  window.addEventListener('site-language-change', render);
  render();
});

// Dark mode
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Check saved preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  // Search overlay
  const searchBtn = document.getElementById('search-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const searchInput = document.getElementById('search-input');

  if (searchBtn && searchOverlay) {
    searchBtn.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      if (searchInput) searchInput.focus();
    });

    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove('active');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchOverlay.classList.remove('active');
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchOverlay.classList.add('active');
        if (searchInput) searchInput.focus();
      }
    });
  }
});

// Language toggle
document.addEventListener('DOMContentLoaded', () => {
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      toggleLanguage();
    });
  }
});

// Mobile hamburger menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    navLinks.id = 'primary-navigation';
    hamburger.setAttribute('aria-controls', navLinks.id);
    hamburger.setAttribute('aria-expanded', 'false');
    navLinks.querySelector('a.active')?.setAttribute('aria-current', 'page');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', String(navLinks.classList.contains('active')));
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
      }
    });
  }
});

// Clerk authentication
window.addEventListener('load', async function() {
  if (typeof Clerk === 'undefined') return;

  try {
    await Clerk.load();

    const userButton = document.getElementById('clerk-user-button');
    if (!userButton) return;

    userButton.innerHTML = '';

    if (Clerk.user) {
      // User is signed in - mount Clerk user button (avatar + dropdown)
      Clerk.mountUserButton(userButton, {
        appearance: {
          elements: {
            userButtonAvatarBox: { width: '32px', height: '32px' },
            userButtonTrigger: { 
              padding: '0',
              border: 'none',
              background: 'transparent',
              color: 'var(--text-secondary)'
            }
          }
        }
      });
    } else {
      // User is not signed in - show sign-in icon
      const signInBtn = document.createElement('button');
      signInBtn.className = 'btn-icon';
      signInBtn.innerHTML = '👤';
      signInBtn.title = 'Sign In';
      signInBtn.style.fontSize = '1rem';
      signInBtn.addEventListener('click', function() {
        Clerk.openSignIn({
          appearance: {
            variables: {
              colorPrimary: '#2563eb',
              colorBackground: 'var(--card-bg)',
              colorText: 'var(--text-primary)',
              colorInputBackground: 'var(--bg-secondary)',
              colorInputText: 'var(--text-primary)',
              borderRadius: '8px'
            }
          }
        });
      });
      userButton.appendChild(signInBtn);
    }
  } catch (e) {
    console.error('Clerk init error:', e);
  }
});
