// i18n v2 - Projects Map Chinese text fix
const i18n = {
  en: {
    // Navigation
    nav_home: "Home",
    nav_epc: "EPC",
    nav_daily: "Daily Brief",
    nav_supply: "Supply Map",
    nav_knowledge: "Knowledge",
    nav_resources: "Resources",
    nav_about: "About",
    nav_projects: "Projects Map",
    nav_contact: "Contact",
    // Footer
    footer_copyright: "© 2026 steelstructure.ai · Steel Structure Industry Platform",
    footer_about: "About",
    footer_contact: "Contact",
    // Search
    search_placeholder: "Search projects, companies, technologies...",
    // Language
    lang_en: "EN",
    lang_cn: "中文",
    // Home page
    home_title: "Steel Structure Industry Platform",
    home_subtitle: "Global EPC Contractor Dynamics · Industry News · Technical Knowledge Base",
    home_cta: "View EPC Updates →",
    home_section_epc: "Latest EPC Updates",
    home_view_all: "View All →",
    home_cat_epc: "EPC Contractors",
    home_cat_epc_desc: "Track major EPC companies globally",
    home_cat_daily: "Daily Brief",
    home_cat_daily_desc: "5-minute must-read industry digest",
    home_cat_knowledge: "Knowledge Base",
    home_cat_knowledge_desc: "Steel structure design, fabrication, installation",
    home_cat_resources: "Resources",
    home_cat_resources_desc: "Standards, calculators, supplier directory",
    // Status badges
    status_building: "Under Construction",
    status_signed: "Just Signed",
    status_design: "In Design",
    status_read: "Read",
    status_today: "Today",
    // EPC page
    epc_title: "EPC Contractors",
    epc_desc: "Global EPC company steel structure project tracking — updated May 2026",
    // Daily page
    daily_title: "Daily Brief",
    daily_desc: "5-minute must-read steel structure industry digest",
    // Knowledge page
    knowledge_title: "Knowledge Base",
    knowledge_desc: "Steel structure design, fabrication, installation technical resources",
    knowledge_cat1: "Design Standards",
    knowledge_cat1_desc: "GB 50017, AISC 360, Eurocode 3 and other major design standards",
    knowledge_cat2: "Connection Design",
    knowledge_cat2_desc: "Bolted, welded, and high-strength friction connections",
    knowledge_cat3: "Fabrication Process",
    knowledge_cat3_desc: "Layout, cutting, straightening, assembly, welding, coating standards",
    knowledge_cat4: "Installation & Construction",
    knowledge_cat4_desc: "Lifting plans, temporary supports, alignment, safety",
    // Resources page
    resources_title: "Resources",
    resources_desc: "Standards, calculators, supplier directory",
    resources_cat1: "Standards Download",
    resources_cat1_desc: "GB, JGJ, ASTM, ISO steel structure standards PDFs",
    resources_cat2: "Calculators",
    resources_cat2_desc: "Section properties, weld strength, bolt capacity calculators",
    resources_cat3: "Supplier Directory",
    resources_cat3_desc: "Global steel structure manufacturers, fabricators, installers",
    resources_cat4: "Industry Reports",
    resources_cat4_desc: "Annual market analysis, regional forecasts, technology whitepapers",
    // About page
    about_title: "About",
    about_desc: "Mission and vision of steelstructure.ai",
    about_heading: "About steelstructure.ai",
    about_text: "steelstructure.ai is a steel structure industry information platform dedicated to aggregating global EPC contractor dynamics, industry news, and technical knowledge.",
    about_mission: "Our mission: making information flow more efficiently in the steel structure industry.",
    // Contact page
    contact_title: "Contact",
    contact_desc: "Partnership, feedback, and contact information",
    contact_heading: "Contact Us",
    contact_text: "For partnership inquiries, data feedback, or feature suggestions, feel free to reach out.",
    contact_email_label: "Email",
    // Supply Map
    map_filter_title: "Filter Resources",
    map_steel_mills: "Steel Mills",
    map_fabricators: "Fabricators",
    map_ports: "Ports & Terminals",
    map_warehouses: "Warehouses",
    map_epc_offices: "EPC Offices",
    map_apply: "Apply Filters",
    map_reset: "Reset All",
    map_showing: "Showing {count} resources",
    map_legend: "Legend",
    // Steel mill filters
    mill_product: "Product Category",
    mill_capacity: "Annual Capacity",
    mill_employees: "Employees",
    // Fabricator filters
    fab_type: "Facility Type",
    fab_specialty: "Specialty",
    // Port filters
    port_throughput: "Throughput",
    port_service: "Service Type",
    // Warehouse filters
    wh_area: "Storage Area",
    wh_service: "Service Scope",
    // EPC filters
    epc_sector: "Specialty Sector",
    epc_revenue: "Annual Revenue",
    // Filter options
    opt_all: "All",
    opt_heavy_plate: "Heavy Plate",
    opt_h_beam: "H-Beam / Section Steel",
    opt_hot_rolled: "Hot Rolled Coil",
    opt_high_strength: "High-Strength Steel",
    opt_pipe: "Steel Pipe",
    opt_wire: "Wire Rod / Rebar",
    opt_10plus: "Over 50M tons",
    opt_20_50: "20M - 50M tons",
    opt_10_20: "10M - 20M tons",
    opt_under10: "Under 10M tons",
    opt_50kplus: "50,000+",
    opt_10k_50k: "10,000 - 50,000",
    opt_5k_10k: "5,000 - 10,000",
    opt_under5k: "Under 5,000",
    opt_offshore: "Offshore Platform",
    opt_building: "Building / Bridge",
    opt_module: "Modular / FPSO",
    opt_wind: "Offshore Wind",
    opt_heavy: "Heavy Industrial",
    opt_jacket: "Jackets / Monopiles",
    opt_topsides: "Topsides / Modules",
    opt_bridge: "Bridges",
    opt_pipeline: "Pipelines",
    opt_30plus: "30M+ TEU",
    opt_10_30: "10M - 30M TEU",
    opt_5_10: "5M - 10M TEU",
    opt_under5: "Under 5M TEU",
    opt_container: "Container",
    opt_bulk: "Bulk / Heavy Cargo",
    opt_energy: "Energy / LNG",
    opt_general: "General Cargo",
    opt_100plus: "100,000+ sqm",
    opt_50_100: "50,000 - 100,000 sqm",
    opt_20_50: "20,000 - 50,000 sqm",
    opt_under20: "Under 20,000 sqm",
    opt_storage: "Storage Only",
    opt_processing: "Storage + Processing",
    opt_distribution: "Distribution Hub",
    opt_project: "Project Staging",
    opt_lng: "LNG / Gas",
    opt_offshore_marine: "Offshore / Marine",
    opt_power: "Power / Renewables",
    opt_infra: "Infrastructure / Buildings",
    opt_chemical: "Chemicals / Refining",
    opt_10bplus: "$10B+",
    opt_5_10b: "$5B - $10B",
    opt_1_5b: "$1B - $5B",
    opt_under1b: "Under $1B",
  },
  zh: {
    // Navigation
    nav_home: "首页",
    nav_epc: "EPC动态",
    nav_daily: "每日简报",
    nav_supply: "供应链地图",
    nav_knowledge: "技术知识",
    nav_resources: "资源中心",
    nav_about: "关于",
    nav_projects: "项目地图",
    nav_contact: "联系",
    // Footer
    footer_copyright: "© 2026 steelstructure.ai · 钢结构行业信息平台",
    footer_about: "关于本站",
    footer_contact: "联系我们",
    // Search
    search_placeholder: "搜索项目、公司、技术...",
    // Language
    lang_en: "EN",
    lang_cn: "中文",
    // Home page
    home_title: "钢结构行业信息平台",
    home_subtitle: "全球EPC总包商动态 · 行业资讯 · 技术知识库",
    home_cta: "查看EPC动态 →",
    home_section_epc: "最新EPC动态",
    home_view_all: "查看全部 →",
    home_cat_epc: "EPC总包商动态",
    home_cat_epc_desc: "全球主要EPC公司项目追踪",
    home_cat_daily: "每日简报",
    home_cat_daily_desc: "行业每日必读的5分钟摘要",
    home_cat_knowledge: "技术知识库",
    home_cat_knowledge_desc: "钢结构设计、制作、安装全流程",
    home_cat_resources: "资源中心",
    home_cat_resources_desc: "标准规范、计算工具、供应商名录",
    // Status badges
    status_building: "施工中",
    status_signed: "刚签约",
    status_design: "设计中",
    status_read: "已读",
    status_today: "今日",
    // EPC page
    epc_title: "EPC总包商动态",
    epc_desc: "全球主要EPC公司钢结构项目追踪 — 2026年5月更新",
    // Daily page
    daily_title: "每日简报",
    daily_desc: "钢结构行业每日必读的5分钟摘要",
    // Knowledge page
    knowledge_title: "技术知识库",
    knowledge_desc: "钢结构设计、制作、安装全流程技术资料",
    knowledge_cat1: "钢结构设计规范",
    knowledge_cat1_desc: "GB 50017、AISC 360、Eurocode 3等国内外主流设计规范",
    knowledge_cat2: "连接节点设计",
    knowledge_cat2_desc: "螺栓连接、焊接连接、高强螺栓摩擦型连接的设计要点",
    knowledge_cat3: "制作工艺",
    knowledge_cat3_desc: "放样、切割、矫正、组装、焊接、涂装全流程工艺标准",
    knowledge_cat4: "安装施工",
    knowledge_cat4_desc: "吊装方案、临时支撑、测量校正、高空作业安全技术",
    // Resources page
    resources_title: "资源中心",
    resources_desc: "标准规范、计算工具、供应商名录",
    resources_cat1: "标准规范下载",
    resources_cat1_desc: "GB、JGJ、ASTM、ISO等钢结构相关标准规范PDF",
    resources_cat2: "计算工具",
    resources_cat2_desc: "截面特性、焊缝强度、螺栓承载力等在线计算",
    resources_cat3: "供应商名录",
    resources_cat3_desc: "全球主要钢结构制造商、加工商、安装商",
    resources_cat4: "行业报告",
    resources_cat4_desc: "年度市场分析、区域需求预测、技术发展白皮书",
    // About page
    about_title: "关于本站",
    about_desc: "steelstructure.ai 的使命与愿景",
    about_heading: "关于 steelstructure.ai",
    about_text: "steelstructure.ai 是一个专注于钢结构行业的信息平台，致力于聚合全球EPC总包商动态、提供行业资讯和技术知识。",
    about_mission: "我们的使命：让钢结构行业的信息流动更高效。",
    // Contact page
    contact_title: "联系我们",
    contact_desc: "合作、反馈与联系方式",
    contact_heading: "联系我们",
    contact_text: "如有合作意向、数据反馈或功能建议，欢迎联系。",
    contact_email_label: "邮箱",
    // Supply Map
    map_filter_title: "筛选资源",
    map_steel_mills: "钢铁制造商",
    map_fabricators: "加工厂",
    map_ports: "港口码头",
    map_warehouses: "仓库",
    map_epc_offices: "EPC办公室",
    map_apply: "应用筛选",
    map_reset: "重置全部",
    map_showing: "显示 {count} 个资源",
    map_legend: "图例",
    // Steel mill filters
    mill_product: "主营产品",
    mill_capacity: "年产能",
    mill_employees: "雇员人数",
    // Fabricator filters
    fab_type: "设施类型",
    fab_specialty: "专长领域",
    // Port filters
    port_throughput: "吞吐量",
    port_service: "服务类型",
    // Warehouse filters
    wh_area: "存储面积",
    wh_service: "服务范围",
    // EPC filters
    epc_sector: "专长领域",
    epc_revenue: "年营业额",
    // Filter options
    opt_all: "全部",
    opt_heavy_plate: "厚板",
    opt_h_beam: "H型钢/型钢",
    opt_hot_rolled: "热轧卷板",
    opt_high_strength: "高强钢",
    opt_pipe: "钢管",
    opt_wire: "线材/螺纹钢",
    opt_10plus: "5000万吨以上",
    opt_20_50: "2000万-5000万吨",
    opt_10_20: "1000万-2000万吨",
    opt_under10: "1000万吨以下",
    opt_50kplus: "5万人以上",
    opt_10k_50k: "1万-5万人",
    opt_5k_10k: "5千-1万人",
    opt_under5k: "5千人以下",
    opt_offshore: "海上平台",
    opt_building: "建筑/桥梁",
    opt_module: "模块/FPSO",
    opt_wind: "海上风电",
    opt_heavy: "重工业",
    opt_jacket: "导管架/单桩",
    opt_topsides: "上部模块",
    opt_bridge: "桥梁",
    opt_pipeline: "管道",
    opt_30plus: "3000万TEU以上",
    opt_10_30: "1000万-3000万TEU",
    opt_5_10: "500万-1000万TEU",
    opt_under5: "500万TEU以下",
    opt_container: "集装箱",
    opt_bulk: "散货/重货",
    opt_energy: "能源/LNG",
    opt_general: "普通货物",
    opt_100plus: "10万平米以上",
    opt_50_100: "5万-10万平米",
    opt_20_50: "2万-5万平米",
    opt_under20: "2万平米以下",
    opt_storage: "纯仓储",
    opt_processing: "仓储+加工",
    opt_distribution: "配送中心",
    opt_project: "项目中转",
    opt_lng: "LNG/天然气",
    opt_offshore_marine: "海上/海洋",
    opt_power: "电力/新能源",
    opt_infra: "基础设施/建筑",
    opt_chemical: "化工/炼油",
    opt_10bplus: "100亿美元以上",
    opt_5_10b: "50亿-100亿美元",
    opt_1_5b: "10亿-50亿美元",
    opt_under1b: "10亿美元以下",
  }
};

Object.assign(i18n.en, {
  "library_search": "Find a topic",
  "library_search_placeholder": "Material, welding, delivery...",
  "library_empty": "No matching notes. Try a different term.",
  "library_index": "Topics",
  "library_intro": "Tender-review notes for scope, materials, fabrication and delivery. Each topic includes review points, working documents and a clarification example.",
  "library_notice": "Editorial review prompts, not design calculations or acceptance criteria. Confirm requirements against the contract, applicable standards and the responsible engineer's approved documents.",
  "library_updated": "Content edition: 2026-09-07",
  "resources_intro": "Working templates, official standards references and project research links for steel structure tender teams.",
  "resource_templates": "Tender & project templates",
  "resource_templates_desc": "Blank working registers with English and Chinese field labels. Project-specific requirements and review decisions remain to be completed.",
  "resource_bid": "Tender review checklist",
  "resource_bid_desc": "Eight review areas, with space for document references, requirements, commercial impact, responsible person and closure evidence.",
  "resource_clarification": "Technical clarification register",
  "resource_clarification_desc": "Track questions, proposed assumptions, client replies, due dates and final disposition.",
  "resource_project": "Project opportunity register",
  "resource_project_desc": "Record owner, EPC, project stage, source date, steel relevance, confidence and next action.",
  "resource_download": "Download CSV",
  "resource_standards": "Official standards references",
  "resource_standards_desc": "Check the edition specified by the project. Catalog access does not imply that the full standard is free.",
  "resource_aisc": "Structural steel publications and standards.",
  "resource_aws": "Welding codes, standards and publication notices.",
  "resource_astm": "Materials and testing standards catalog.",
  "resource_iso": "International standards catalog and search.",
  "resource_research": "Project research & follow-up",
  "resource_map": "Project map",
  "resource_map_desc": "Locate tracked projects and review their sector and stage.",
  "resource_epc": "EPC intelligence",
  "resource_epc_desc": "Identify contractors and follow public company announcements.",
  "resource_supply": "Supply chain map",
  "resource_supply_desc": "Explore mills, fabricators and logistics nodes.",
  "resource_briefs": "Brief archive",
  "resource_briefs_desc": "Read dated signals and return to their original sources.",
  "resource_future": "Engineering calculators and automated document review are planned; they are not available in this edition.",
  "workflow_track": "Track an opportunity",
  "workflow_track_desc": "Projects, EPCs and dated public signals.",
  "workflow_review": "Review an inquiry",
  "workflow_review_desc": "Scope, material, fabrication and delivery questions.",
  "workflow_prepare": "Prepare the working registers",
  "workflow_prepare_desc": "Tender checklists and clarification templates.",
  "home_archive_date": "Archive preview",
  "home_latest_date": "Latest sourced brief",
  "brief_reader_notice": "Dated public-source briefs. Check the issue date before using project status information.",
  "brief_editions": "Previous sourced issues",
  "brief_legacy": "Other historical summaries",
  "home_stale_note": "Historical issue; project status may have changed.",
  "home_source": "Original source",
  "home_title": "Steelstructure.ai",
  "home_subtitle": "Project intelligence and tender-review knowledge for steel structure teams.",
  "home_section_epc": "EPC project references",
  "home_cat_resources_desc": "Review templates and official reference links",
  "home_brief_heading": "Published industry brief",
  "home_brief_link": "Read brief & archive",
  "home_brief_fallback": "Read the dated brief and its original sources in the archive.",
  "home_epc_notice": "Historical project snapshots; check the EPC page and original announcements for subsequent developments."
});
Object.assign(i18n.zh, {
  "library_search": "查找主题",
  "library_search_placeholder": "材料、焊接、交付…",
  "library_empty": "没有匹配的笔记，请尝试其他关键词。",
  "library_index": "主题目录",
  "library_intro": "围绕范围、材料、制作与交付的投标审查笔记，每篇包含核对要点、整理成果和澄清示例。",
  "library_notice": "以下为编辑整理的审查提示，不是设计计算或验收准则。具体要求应依据合同、适用标准及责任工程师批准的文件确认。",
  "library_updated": "内容版本：2026-09-07",
  "resources_intro": "面向钢结构投标团队的工作模板、官方标准入口与项目研究资源。",
  "resource_templates": "投标与项目模板",
  "resource_templates_desc": "空白工作台账提供中英文字段。具体项目要求和审查结论需按实际情况填写。",
  "resource_bid": "投标审查清单",
  "resource_bid_desc": "八类审查主题，记录文件依据、具体要求、商务影响、责任人及关闭证据。",
  "resource_clarification": "技术澄清台账",
  "resource_clarification_desc": "跟踪澄清问题、拟定假设、客户回复、截止日期及最终处理结果。",
  "resource_project": "项目机会跟踪表",
  "resource_project_desc": "记录业主、EPC、项目阶段、来源日期、钢结构相关性、可信度及下一步行动。",
  "resource_download": "下载 CSV",
  "resource_standards": "官方标准入口",
  "resource_standards_desc": "核对项目指定的标准版本。可访问目录并不代表标准全文免费。",
  "resource_aisc": "钢结构出版物与标准。",
  "resource_aws": "焊接规范、标准与出版信息。",
  "resource_astm": "材料与试验标准目录。",
  "resource_iso": "国际标准目录与检索。",
  "resource_research": "项目研究与跟进",
  "resource_map": "项目地图",
  "resource_map_desc": "查看已收录项目的位置、行业与阶段。",
  "resource_epc": "EPC 情报",
  "resource_epc_desc": "查找承包商并跟进公开企业动态。",
  "resource_supply": "供应链地图",
  "resource_supply_desc": "查看钢厂、制造商与物流节点。",
  "resource_briefs": "简报档案",
  "resource_briefs_desc": "阅读带日期的项目线索并追溯原始来源。",
  "resource_future": "工程计算器与自动化文件审查仍在规划中，本版尚未提供。",
  "workflow_track": "跟踪项目机会",
  "workflow_track_desc": "串联项目、EPC 与带日期的公开线索。",
  "workflow_review": "审查询价文件",
  "workflow_review_desc": "核对范围、材料、制作与交付问题。",
  "workflow_prepare": "准备工作台账",
  "workflow_prepare_desc": "获取投标审查与技术澄清模板。",
  "home_archive_date": "历史简报预览",
  "home_latest_date": "最近收录的有来源简报",
  "brief_reader_notice": "以下简报整理自公开来源，引用项目状态前请核对期次日期。",
  "brief_editions": "往期有来源简报",
  "brief_legacy": "其他历史摘要",
  "home_stale_note": "历史期次，项目状态可能已变化。",
  "home_source": "原始来源",
  "home_title": "Steelstructure.ai",
  "home_subtitle": "面向钢结构团队的项目情报与投标审查知识。",
  "home_section_epc": "EPC 项目参考",
  "home_cat_resources_desc": "审查模板与官方参考入口",
  "home_brief_heading": "已发布的行业简报",
  "home_brief_link": "阅读简报与档案",
  "home_brief_fallback": "前往档案阅读带日期的简报及原始来源。",
  "home_epc_notice": "历史项目快照；后续进展请查阅 EPC 页面与原始公告。"
});

let currentLang = localStorage.getItem('site-lang') || 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('site-lang', lang);
  applyTranslations();
  updateLangButton();
  window.dispatchEvent(new CustomEvent('site-language-change', { detail: { lang } }));
}

function t(key) {
  return i18n[currentLang][key] || i18n['en'][key] || key;
}

function applyTranslations() {
  // Navigation links
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (el.tagName === 'INPUT') {
      el.placeholder = val;
    } else if (el.tagName === 'A' || el.tagName === 'BUTTON') {
      // For links, update text content but preserve child elements if any
      const hasChildren = el.querySelector('*');
      if (!hasChildren) {
        el.textContent = val;
      }
    } else {
      el.textContent = val;
    }
  });

  // Update html lang attribute
  document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
}

function updateLangButton() {
  const btn = document.getElementById('lang-toggle');
  if (btn) {
    btn.textContent = currentLang === 'en' ? '中文' : 'EN';
    btn.title = currentLang === 'en' ? '切换到中文' : 'Switch to English';
  }
}

function toggleLanguage() {
  setLanguage(currentLang === 'en' ? 'zh' : 'en');
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  updateLangButton();
});
