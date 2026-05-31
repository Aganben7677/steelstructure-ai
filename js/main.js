
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
  const searchPages = [
    { title: 'EPC Contractors', href: 'epc.html', desc: 'Global EPC project awards, LNG, offshore wind, and modular steel opportunities', keywords: 'epc contractor lng offshore wind steel project technip mcdermott fluor worley' },
    { title: 'Daily Brief', href: 'daily.html', desc: '5-minute steel structure market digest and industry signals', keywords: 'daily brief news steel demand price market' },
    { title: 'Supply Map', href: 'supply-map.html', desc: 'Steel mills, fabricators, ports, warehouses, and EPC offices', keywords: 'supplier mill fabricator port warehouse map resource supply chain' },
    { title: 'Projects Map', href: 'hot-projects-map.html', desc: 'Global hot projects by sector, status, and steel relevance', keywords: 'project map investment status region energy infrastructure' },
    { title: 'Knowledge Base', href: 'knowledge.html', desc: 'Design standards, connections, fabrication, and installation references', keywords: 'knowledge design standard aisc eurocode gb fabrication connection installation' },
    { title: 'Resources', href: 'resources.html', desc: 'Standards, calculators, supplier directory, and industry reports', keywords: 'resource standard calculator supplier report weld bolt section' },
    { title: 'About', href: 'about.html', desc: 'Mission and positioning for steelstructure.ai', keywords: 'about mission platform steelstructure' },
    { title: 'Contact', href: 'contact.html', desc: 'Partnership, feedback, and data correction contact', keywords: 'contact email partnership feedback data' }
  ];

  if (searchBtn && searchOverlay) {
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
        : searchPages.slice(0, 5);

      searchResults.innerHTML = matches.map((page) => (
        `<a class="search-result" href="${page.href}">
          <strong>${page.title}</strong>
          <span>${page.desc}</span>
        </a>`
      )).join('') || '<div class="search-empty">No matching pages found</div>';
    };

    searchBtn.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      if (searchInput) searchInput.focus();
      renderSearchResults();
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
        renderSearchResults();
      }
    });

    searchInput.addEventListener('input', renderSearchResults);
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
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
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

