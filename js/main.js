
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
