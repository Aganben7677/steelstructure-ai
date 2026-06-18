// Site module enhancements
function enhanceItineraryModule() {
  const navLinks = document.querySelector('.nav-links');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const currentLang = localStorage.getItem('site-lang') || document.documentElement.lang || 'en';
  const isZh = currentLang.toLowerCase().startsWith('zh');

  if (navLinks && !navLinks.querySelector('a[href="itinerary.html"]')) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = 'itinerary.html';
    link.textContent = isZh ? '行程档案' : 'Itinerary';

    if (currentPath === 'itinerary.html') {
      navLinks.querySelectorAll('a.active').forEach((activeLink) => activeLink.classList.remove('active'));
      link.classList.add('active');
    }

    item.appendChild(link);

    const projectsLink = navLinks.querySelector('a[href="hot-projects-map.html"]');
    const projectsItem = projectsLink ? projectsLink.closest('li') : null;
    const aboutLink = navLinks.querySelector('a[href="about.html"]');
    const aboutItem = aboutLink ? aboutLink.closest('li') : null;

    if (projectsItem && projectsItem.nextSibling) {
      navLinks.insertBefore(item, projectsItem.nextSibling);
    } else if (aboutItem) {
      navLinks.insertBefore(item, aboutItem);
    } else {
      navLinks.appendChild(item);
    }
  }

  const workspaceGrid = document.querySelector('.workspace-grid');
  if (workspaceGrid && !workspaceGrid.querySelector('a[href="itinerary.html"]')) {
    const panel = document.createElement('a');
    panel.href = 'itinerary.html';
    panel.className = 'feature-panel';
    panel.innerHTML = isZh
      ? `
        <div class="feature-kicker">工作流档案</div>
        <h3>行程档案</h3>
        <p>记录每日行程、人员、事由、交通工具、地图轨迹、本地痕迹和可导出的行程文件。</p>
      `
      : `
        <div class="feature-kicker">Workflow archive</div>
        <h3>Itinerary Log</h3>
        <p>Record daily trips, people, reasons, transport tools, map routes, local archive traces, and exportable travel files.</p>
      `;
    workspaceGrid.appendChild(panel);
  }

  const statsGrid = document.querySelector('.stats-grid');
  const firstStat = statsGrid ? statsGrid.querySelector('.stat-item strong') : null;
  if (firstStat && firstStat.textContent.trim() === '8') {
    firstStat.textContent = '9';
  }
}

// Dark mode
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme');

  enhanceItineraryModule();

  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  const searchBtn = document.getElementById('search-btn');
  const searchOverlay = document.getElementById('search-overlay');
  const searchInput = document.getElementById('search-input');
  const searchPages = [
    { title: 'Industry Information Hub', href: 'index.html', desc: 'Steel structure project updates, resources, standards, and market notes', keywords: 'steel structure information project updates supply chain resources standards market notes' },
    { title: 'EPC Contractors', href: 'epc.html', desc: 'Global EPC project awards, LNG, offshore wind, and modular steel opportunities', keywords: 'epc contractor lng offshore wind steel project technip mcdermott fluor worley' },
    { title: 'Daily Brief', href: 'daily.html', desc: 'Daily steel structure intelligence and project signals', keywords: 'daily brief news steel demand price market intelligence' },
    { title: 'Supply Map', href: 'supply-map.html', desc: 'Steel mills, fabricators, ports, warehouses, and EPC offices', keywords: 'supplier mill fabricator port warehouse map resource supply chain' },
    { title: 'Projects Map', href: 'hot-projects-map.html', desc: 'Global hot projects by sector, status, and steel relevance', keywords: 'project map investment status region energy infrastructure' },
    { title: 'Itinerary Log', href: 'itinerary.html', desc: 'Daily travel log with route map, people, purpose, transport, archive traces, and export files', keywords: 'itinerary route travel log trip archive map daily schedule trace csv json 行程 轨迹 地图 档案' },
    { title: 'Knowledge Base', href: 'knowledge.html', desc: 'Design standards, connections, fabrication, and installation references', keywords: 'knowledge design standard aisc eurocode gb fabrication connection installation' },
    { title: 'Resources', href: 'resources.html', desc: 'Standards, calculators, supplier directory, and industry references', keywords: 'resource standard calculator supplier report weld bolt section reference' },
    { title: 'About', href: 'about.html', desc: 'Mission and positioning for steelstructure.ai', keywords: 'about mission steelstructure information platform' },
    { title: 'Contact', href: 'contact.html', desc: 'Partnership, feedback, and data correction contact', keywords: 'contact email partnership feedback data' }
  ];

  if (searchBtn && searchOverlay && searchInput) {
    let searchResults = document.getElementById('search-results');
    if (!searchResults) {
      searchResults = document.createElement('div');
      searchResults.id = 'search-results';
      searchResults.className = 'search-results';
      searchInput.insertAdjacentElement('afterend', searchResults);
    }

    const renderSearchResults = () => {
      const query = (searchInput.value || '').trim().toLowerCase();
      const matches = query
        ? searchPages.filter((page) => `${page.title} ${page.desc} ${page.keywords}`.toLowerCase().includes(query))
        : searchPages.slice(0, 7);

      searchResults.replaceChildren();

      if (!matches.length) {
        const empty = document.createElement('div');
        empty.className = 'search-empty';
        empty.textContent = 'No matching pages found';
        searchResults.appendChild(empty);
        return;
      }

      matches.forEach((page) => {
        const link = document.createElement('a');
        link.className = 'search-result';
        link.href = page.href;

        const title = document.createElement('strong');
        title.textContent = page.title;

        const desc = document.createElement('span');
        desc.textContent = page.desc;

        link.append(title, desc);
        searchResults.appendChild(link);
      });
    };

    searchBtn.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      searchInput.focus();
      renderSearchResults();
    });

    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) searchOverlay.classList.remove('active');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') searchOverlay.classList.remove('active');
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchOverlay.classList.add('active');
        searchInput.focus();
        renderSearchResults();
      }
    });

    searchInput.addEventListener('input', renderSearchResults);
  }
});

// Language toggle
document.addEventListener('DOMContentLoaded', () => {
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle && typeof toggleLanguage === 'function') {
    langToggle.addEventListener('click', () => toggleLanguage());
  }
});

// Mobile hamburger menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
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
      const signInBtn = document.createElement('button');
      signInBtn.className = 'btn-icon';
      signInBtn.type = 'button';
      signInBtn.textContent = '👤';
      signInBtn.title = 'Sign In';
      signInBtn.setAttribute('aria-label', 'Sign in');
      signInBtn.style.fontSize = '1rem';
      signInBtn.addEventListener('click', function() {
        Clerk.openSignIn({
          appearance: {
            variables: {
              colorPrimary: '#16a34a',
              colorBackground: 'var(--card-bg)',
              colorText: 'var(--text-primary)',
              colorInputBackground: 'var(--bg-secondary)',
              colorInputText: 'var(--text-primary)',
              borderRadius: '12px'
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