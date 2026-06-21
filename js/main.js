// Site navigation and interface enhancements
function normalizeNavigation() {
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const items = [
    { href: 'index.html', key: 'nav_home', label: 'Home', active: ['index.html', ''].includes(currentPath) },
    { href: 'daily.html', key: 'nav_daily', label: 'Daily Brief', active: currentPath === 'daily.html' },
    { href: 'hot-projects-map.html', key: 'nav_projects', label: 'Projects', active: currentPath === 'hot-projects-map.html' },
    { href: 'epc.html', key: 'nav_epc', label: 'EPC', active: currentPath === 'epc.html' },
    { href: 'supply-map.html', key: 'nav_supply', label: 'Supply Chain', active: currentPath === 'supply-map.html' },
    { href: 'knowledge.html', key: 'nav_knowledge', label: 'Knowledge', active: currentPath === 'knowledge.html' },
    { href: 'resources.html', key: 'nav_resources', label: 'Resources', active: currentPath === 'resources.html' },
    { href: 'field-notes.html', key: 'nav_field_notes', label: 'Field Notes', active: currentPath === 'field-notes.html' || currentPath === 'itinerary.html' },
    { href: 'about.html', key: 'nav_about', label: 'About', active: currentPath === 'about.html' },
  ];

  navLinks.replaceChildren();

  items.forEach((item) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.href;
    a.setAttribute('data-i18n', item.key);
    a.textContent = item.label;
    if (item.active) a.classList.add('active');
    li.appendChild(a);
    navLinks.appendChild(li);
  });

  if (typeof applyTranslations === 'function') applyTranslations();
}

function applySiteLogoLockup() {
  const logos = document.querySelectorAll('nav .logo');
  if (!logos.length) return;

  logos.forEach((logo) => {
    if (logo.dataset.logoReplaced === 'true') return;
    logo.dataset.logoReplaced = 'true';
    logo.classList.add('site-logo-lockup');
    logo.setAttribute('aria-label', 'Steelstructure.ai home');
    logo.innerHTML = '<img class="site-logo-lockup-img" src="assets/brand/steelstructure-ai-logo-lockup.svg?v=6" alt="Steelstructure.ai" loading="eager" />';
  });
}

// Dark mode, navigation, and search
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme');

  normalizeNavigation();
  applySiteLogoLockup();

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
    { title: 'Daily Steel Structure Brief', href: 'daily.html', desc: 'Daily project, EPC, procurement, and steel structure opportunity signals', keywords: 'daily brief news steel structure opportunity epc procurement project signal lng mining energy industrial' },
    { title: 'Project Opportunity Map', href: 'hot-projects-map.html', desc: 'Global projects by sector, status, and steel relevance', keywords: 'project map investment status region energy infrastructure lng mining industrial steel package' },
    { title: 'EPC Contractors', href: 'epc.html', desc: 'Global EPC project awards, LNG, offshore wind, and modular steel opportunities', keywords: 'epc contractor lng offshore wind steel project technip mcdermott fluor worley bechtel' },
    { title: 'Supply Chain Map', href: 'supply-map.html', desc: 'Steel mills, fabricators, ports, warehouses, logistics nodes, and EPC offices', keywords: 'supplier mill fabricator port warehouse map resource supply chain logistics' },
    { title: 'Technical Knowledge Base', href: 'knowledge.html', desc: 'Materials, bolting, welding, coating, fireproofing, fabrication, inspection, erection, and logistics', keywords: 'knowledge design standard aisc eurocode gb fabrication connection installation welding bolting coating fireproofing qa qc' },
    { title: 'Resources', href: 'resources.html', desc: 'Standards references, calculators, templates, supplier directories, reports, and practical links', keywords: 'resource standard calculator supplier report template weld bolt section reference checklist' },
    { title: 'Field Notes', href: 'field-notes.html', desc: 'Project visits, itinerary archives, market observations, and practical field notes', keywords: 'field notes itinerary route travel project visit archive observation map 行程 现场 笔记' },
    { title: 'Itinerary Archive', href: 'itinerary.html', desc: 'Mapped travel log with route, people, purpose, transport, archive traces, and export files', keywords: 'itinerary route travel log trip archive map daily schedule trace csv json 行程 轨迹 地图 档案' },
    { title: 'About', href: 'about.html', desc: 'Mission and positioning for steelstructure.ai', keywords: 'about mission steelstructure information intelligence platform' },
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
        : searchPages.slice(0, 8);

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

    searchInput.addEventListener('input', renderSearchResults);
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) searchOverlay.classList.remove('active');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') searchOverlay.classList.remove('active');
    });
  }

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }
});
