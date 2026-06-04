// Brand refresh: load the AI agent platform visual layer on every page.
(() => {
  const href = 'css/brand-refresh.css?v=1';
  if (!document.querySelector(`link[href="${href}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  if (typeof i18n !== 'undefined') {
    Object.assign(i18n.en, {
      footer_copyright: '© 2026 steelstructure.ai · Global Steel Structure AI Agent Platform',
      search_placeholder: 'Search agents, projects, suppliers, standards...',
      home_title: 'AI agents for the global steel structure supply chain',
      home_eyebrow: 'Steelstructure.AI · Industry agent platform',
      home_subtitle: 'Connect project signals, EPC activity, suppliers, standards, technical knowledge, and fabrication decisions in one AI-native workspace for steel structure teams worldwide.',
      home_cta: 'Explore AI workspace →',
      home_cta_secondary: 'View global project map',
      home_proof_1: 'For fabricators',
      home_proof_2: 'For EPC & sourcing teams',
      home_proof_3: 'For engineers and market teams',
      home_stat_epc: 'industry agent modules planned',
      home_stat_regions: 'global supply-chain layers',
      home_stat_supply: 'resource categories connected',
      home_stat_update: 'AI-native platform direction',
      home_opportunity_kicker: 'From information to execution intelligence',
      home_opportunity_title: 'Turn steel structure data into agent-driven decisions',
      home_opportunity_1: 'Read project signals',
      home_opportunity_1_desc: 'Track EPC awards, FEED progress, hot projects, and market news before procurement packages become obvious.',
      home_opportunity_2: 'Connect the supply chain',
      home_opportunity_2_desc: 'Map mills, fabricators, ports, warehouses, EPC offices, standards, and technical resources as structured industry knowledge.',
      home_opportunity_3: 'Activate AI agents',
      home_opportunity_3_desc: 'Prepare RFQ reviews, project qualification, material checks, standard comparisons, outreach notes, and technical answers faster.',
      home_section_epc: 'Project Intelligence Feed',
      home_section_workspace: 'AI Agent Workspace',
      home_daily_kicker: 'Signal agent',
      home_daily_title: 'Daily steel intelligence',
      home_daily_desc: 'A compact industry signal layer for LNG, offshore wind, industrial, infrastructure, and modular steel opportunities.',
      home_daily_link: 'Open daily intelligence →',
      home_cat_supply: 'Supply Chain Graph',
      home_cat_supply_desc: 'Explore mills, fabricators, ports, warehouses, and EPC offices as connected supply-chain nodes.',
      home_cat_projects: 'Project Opportunity Map',
      home_cat_projects_desc: 'Scan global projects by sector, status, investment scale, geography, and steel structure relevance.',
      home_knowledge_kicker: 'Knowledge agent',
      home_cat_knowledge: 'Technical Knowledge Base',
      home_cat_knowledge_desc: 'Design, fabrication, installation, bolting, welding, coating, standards, and project lessons.',
      home_resources_kicker: 'Tooling layer',
      home_cat_resources: 'Engineering Resources',
      home_cat_resources_desc: 'Standards, calculators, supplier directory, reports, and future agent tools.',
      about_title: 'About Steelstructure.AI',
      about_desc: 'A global AI agent platform for the steel structure industry chain',
      about_heading: 'Built for steel structure decisions, not generic AI chat',
      about_text: 'steelstructure.ai is being built as an AI-native workspace for the global steel structure industry chain, connecting project intelligence, EPC activity, supplier resources, technical standards, and practical engineering knowledge.',
      about_mission: 'Our mission: help steel structure teams turn scattered industry information into faster, clearer, and more reliable decisions.',
      about_focus_1: 'Project intelligence',
      about_focus_1_desc: 'EPC awards, hot projects, market signals, and steel package opportunities.',
      about_focus_2: 'Supply-chain intelligence',
      about_focus_2_desc: 'Mills, fabricators, ports, warehouses, logistics resources, and project offices.',
      about_focus_3: 'AI engineering knowledge',
      about_focus_3_desc: 'Standards, fabrication knowledge, installation practices, QA/QC logic, and decision support.'
    });

    Object.assign(i18n.zh, {
      footer_copyright: '© 2026 steelstructure.ai · 全球钢结构产业链 AI 智能体平台',
      search_placeholder: '搜索智能体、项目、供应商、标准规范...',
      home_title: '面向全球钢结构产业链的 AI 智能体平台',
      home_eyebrow: 'Steelstructure.AI · 行业智能体平台',
      home_subtitle: '把项目信号、EPC动态、供应链资源、标准规范、技术知识和加工制造决策连接到一个 AI 原生工作台，服务全球钢结构团队。',
      home_cta: '进入 AI 工作台 →',
      home_cta_secondary: '查看全球项目地图',
      home_proof_1: '适合钢结构加工企业',
      home_proof_2: '适合EPC与采购团队',
      home_proof_3: '适合工程师与市场团队',
      home_stat_epc: '个行业智能体模块规划',
      home_stat_regions: '层全球供应链数据',
      home_stat_supply: '类资源节点连接',
      home_stat_update: 'AI原生平台方向',
      home_opportunity_kicker: '从信息聚合到执行智能',
      home_opportunity_title: '把钢结构产业链数据转化为智能体决策',
      home_opportunity_1: '读取项目信号',
      home_opportunity_1_desc: '跟踪EPC授标、FEED进展、热门项目和市场新闻，在采购包显性化之前识别机会。',
      home_opportunity_2: '连接供应链资源',
      home_opportunity_2_desc: '把钢厂、加工厂、港口、仓库、EPC办公室、规范标准和技术资料组织成结构化行业知识。',
      home_opportunity_3: '激活 AI 智能体',
      home_opportunity_3_desc: '更快完成RFQ审查、项目筛选、材料核查、标准对比、客户触达和技术答疑。',
      home_section_epc: '项目智能情报流',
      home_section_workspace: 'AI 智能体工作台',
      home_daily_kicker: '信号智能体',
      home_daily_title: '每日钢结构情报',
      home_daily_desc: '围绕LNG、海上风电、工业、基础设施和模块化钢结构机会形成紧凑的行业信号层。',
      home_daily_link: '打开每日情报 →',
      home_cat_supply: '供应链图谱',
      home_cat_supply_desc: '把钢厂、加工厂、港口、仓库和EPC办公室作为相互连接的供应链节点来查看。',
      home_cat_projects: '项目机会地图',
      home_cat_projects_desc: '按行业、状态、投资规模、地理位置和钢结构相关度扫描全球项目。',
      home_knowledge_kicker: '知识智能体',
      home_cat_knowledge: '技术知识库',
      home_cat_knowledge_desc: '设计、制作、安装、螺栓、焊接、涂装、标准规范和项目经验。',
      home_resources_kicker: '工具层',
      home_cat_resources: '工程资源',
      home_cat_resources_desc: '标准规范、计算工具、供应商名录、行业报告和未来智能体工具。',
      about_title: '关于 Steelstructure.AI',
      about_desc: '面向全球钢结构产业链的 AI 智能体平台',
      about_heading: '为钢结构决策而生，而不是通用 AI 聊天工具',
      about_text: 'steelstructure.ai 正在建设成为一个面向全球钢结构产业链的 AI 原生工作台，连接项目情报、EPC动态、供应链资源、技术标准和工程实践知识。',
      about_mission: '我们的使命：帮助钢结构团队把分散的行业信息转化为更快、更清晰、更可靠的决策。',
      about_focus_1: '项目智能',
      about_focus_1_desc: 'EPC授标、热门项目、市场信号和钢结构包机会。',
      about_focus_2: '供应链智能',
      about_focus_2_desc: '钢厂、加工厂、港口、仓库、物流资源和项目办公室。',
      about_focus_3: 'AI工程知识',
      about_focus_3_desc: '规范标准、制作知识、安装实践、QA/QC逻辑和决策支持。'
    });
  }
})();

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
    { title: 'AI Agent Workspace', href: 'index.html', desc: 'Global steel structure supply chain AI agent platform', keywords: 'ai agent steel structure supply chain intelligence platform' },
    { title: 'EPC Contractors', href: 'epc.html', desc: 'Global EPC project awards, LNG, offshore wind, and modular steel opportunities', keywords: 'epc contractor lng offshore wind steel project technip mcdermott fluor worley' },
    { title: 'Daily Brief', href: 'daily.html', desc: 'Daily steel structure intelligence and project signals', keywords: 'daily brief news steel demand price market intelligence' },
    { title: 'Supply Map', href: 'supply-map.html', desc: 'Steel mills, fabricators, ports, warehouses, and EPC offices', keywords: 'supplier mill fabricator port warehouse map resource supply chain' },
    { title: 'Projects Map', href: 'hot-projects-map.html', desc: 'Global hot projects by sector, status, and steel relevance', keywords: 'project map investment status region energy infrastructure' },
    { title: 'Knowledge Base', href: 'knowledge.html', desc: 'Design standards, connections, fabrication, and installation references', keywords: 'knowledge design standard aisc eurocode gb fabrication connection installation' },
    { title: 'Resources', href: 'resources.html', desc: 'Standards, calculators, supplier directory, and future AI tools', keywords: 'resource standard calculator supplier report weld bolt section ai tool' },
    { title: 'About', href: 'about.html', desc: 'Mission and positioning for steelstructure.ai', keywords: 'about mission platform steelstructure ai agent' },
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
        : searchPages.slice(0, 6);

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
