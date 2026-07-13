(function () {
  const agentModes = {
    review: {
      file: "ENTS_ST_Specification.pdf",
      metric: "96%",
      en: {
        fileState: "PARSED",
        status: "28 critical requirements identified",
        metricLabel: "requirements linked to sources",
        steps: [
          ["01", "File classification and revision check", "COMPLETE"],
          ["02", "Standards, material, and inspection extraction", "COMPLETE"],
          ["03", "Deviation and bid risk identification", "ANALYZING"],
        ],
      },
      zh: {
        fileState: "已解析",
        status: "识别 28 项关键要求",
        metricLabel: "条款已建立来源追溯",
        steps: [
          ["01", "文件分类与版本校验", "完成"],
          ["02", "标准、材料与检验要求抽取", "完成"],
          ["03", "偏差与报价风险定位", "分析中"],
        ],
      },
    },
    estimate: {
      file: "Inquiry_BOQ_Rev.03.xlsx",
      metric: "8",
      en: {
        fileState: "MAPPED",
        status: "146 cost rules mapped",
        metricLabel: "exception groups awaiting human review",
        steps: [
          ["01", "Material and member list normalization", "COMPLETE"],
          ["02", "Process, labor, and waste rule matching", "COMPLETE"],
          ["03", "Traceable estimate workbook generation", "GENERATING"],
        ],
      },
      zh: {
        fileState: "已映射",
        status: "建立 146 条成本映射",
        metricLabel: "类异常项等待人工确认",
        steps: [
          ["01", "材料与构件清单标准化", "完成"],
          ["02", "工序、工时与损耗规则匹配", "完成"],
          ["03", "生成可追溯估算工作簿", "生成中"],
        ],
      },
    },
    fabrication: {
      file: "Connection_Details_IFC.dwg",
      metric: "24",
      en: {
        fileState: "REASONED",
        status: "6 fabrication concerns identified",
        metricLabel: "fabrication rules automatically linked",
        steps: [
          ["01", "Connection and weld type recognition", "COMPLETE"],
          ["02", "Process and inspection route association", "COMPLETE"],
          ["03", "Fabrication risk and RFI summary", "VERIFYING"],
        ],
      },
      zh: {
        fileState: "已推理",
        status: "发现 6 个制造关注点",
        metricLabel: "项制造规则已自动关联",
        steps: [
          ["01", "节点与焊缝类型识别", "完成"],
          ["02", "工艺及检验路径关联", "完成"],
          ["03", "制作风险与澄清问题汇总", "校核中"],
        ],
      },
    },
  };

  const capabilities = {
    review: {
      tag: "DOCUMENT → REQUIREMENT",
      en: {
        copy: "Turn specifications, drawings, BOQs, addenda, and clarifications into searchable, citable, traceable project requirements.",
        points: ["Cross-file requirement extraction", "Revision and conflict detection", "Deviation list generation"],
      },
      zh: {
        copy: "把规格书、图纸、BOQ、补遗与澄清文件转化为可查询、可引用、可追溯的项目要求。",
        points: ["跨文件要求抽取", "版本与冲突识别", "偏差清单自动生成"],
      },
    },
    estimate: {
      tag: "BOQ → COST MODEL",
      en: {
        copy: "Map material, connection, process, coating, packing, and logistics rules into a structured estimate while preserving every calculation basis.",
        points: ["BOQ normalization", "Cost rule matching", "Excel and BI output"],
      },
      zh: {
        copy: "将材料、连接、工序、表面处理、包装与物流规则映射到结构化估算表，保留每一项计算依据。",
        points: ["BOQ 结构化", "成本规则匹配", "Excel / BI 输出"],
      },
    },
    fabrication: {
      tag: "DETAIL → WORKFLOW",
      en: {
        copy: "Understand connection types, welding, and inspection requirements, then use company process knowledge to expose factors affecting labor, quality, and delivery.",
        points: ["Connection semantics", "Process route association", "Exception review"],
      },
      zh: {
        copy: "理解节点形式、焊接与检验要求，结合企业工艺知识识别影响工时、质量和交付的关键因素。",
        points: ["节点语义识别", "工艺路径关联", "异常项人工复核"],
      },
    },
    intelligence: {
      tag: "SIGNAL → OPPORTUNITY",
      en: {
        copy: "Continuously connect project news, EPC activity, and supply-chain relationships so daily information directly supports market judgment and business action.",
        points: ["Daily Brief", "Project opportunity signals", "EPC and supply-chain graph"],
      },
      zh: {
        copy: "持续聚合项目动态、EPC 活动与供应链关系，让每日信息直接服务于市场判断与业务行动。",
        points: ["Daily Brief", "项目机会信号", "EPC / 供应链图谱"],
      },
    },
  };

  const scenarios = {
    tender: {
      stage: "MARKETING & ESTIMATION",
      en: {
        title: "Inquiry to bid decision",
        summary: "Review hundreds of multidisciplinary files and form a requirement matrix, risk register, and estimation inputs.",
        value: "Focus engineering attention on the exceptions that truly require professional judgment.",
        input: "Specifications · Drawings · BOQ · Addenda",
        output: "Review report · Clarifications · Estimate workbook",
      },
      zh: {
        title: "从询价包到可报价决策",
        summary: "面对数百份跨专业文件，快速形成要求矩阵、风险清单与估算输入。",
        value: "把工程师的注意力集中在真正需要判断的异常项。",
        input: "招标规格书 · 图纸 · BOQ · 补遗",
        output: "审阅报告 · 澄清清单 · 估算工作簿",
      },
    },
    handover: {
      stage: "ENGINEERING & FABRICATION",
      en: {
        title: "Requirements to fabrication",
        summary: "Translate contract requirements, connection details, and quality rules into structured information the fabrication team can execute.",
        value: "Reduce information loss between tendering, engineering, and the factory.",
        input: "IFC drawings · Connections · ITP · Coating specification",
        output: "Process concerns · Inspection route · Handover summary",
      },
      zh: {
        title: "从项目要求到制造准备",
        summary: "将合同要求、连接细节和质量规则转化为制造团队可以执行的结构化信息。",
        value: "减少信息在投标、工程与工厂之间传递时的损失。",
        input: "IFC 图纸 · 节点 · ITP · 涂装规范",
        output: "工艺关注点 · 检验路径 · 交底摘要",
      },
    },
    growth: {
      stage: "BUSINESS INTELLIGENCE",
      en: {
        title: "Signals to growth",
        summary: "Turn scattered news, project, and company updates into actionable intelligence related to steel structure business.",
        value: "Build a continuously updated market radar instead of a one-time search result.",
        input: "Public sources · Project movement · EPC activity",
        output: "Daily Brief · Opportunity signals · Relationship graph",
      },
      zh: {
        title: "从行业信息到增长机会",
        summary: "把分散的新闻、项目和公司动态，变成与钢结构业务相关的可行动情报。",
        value: "建立持续更新的市场雷达，而不是一次性的搜索结果。",
        input: "公开信息 · 项目动态 · EPC 活动",
        output: "Daily Brief · 机会信号 · 关系图谱",
      },
    },
  };

  const roadmap = {
    now: {
      phase: "NOW",
      en: {
        status: "IN PROGRESS",
        title: "Intelligence foundation",
        copy: "Build the steel structure knowledge entry, project map, Daily Brief, and reusable industry archives.",
        items: ["Knowledge and standards navigation", "Project and EPC signals", "Indexed Daily Brief archive"],
      },
      zh: {
        status: "正在构建",
        title: "行业智能底座",
        copy: "建立钢结构知识入口、项目地图、Daily Brief 与可沉淀的行业档案。",
        items: ["知识与标准导航", "项目 / EPC 信号", "可索引的每日简报"],
      },
    },
    next: {
      phase: "NEXT",
      en: {
        status: "NEXT PHASE",
        title: "Agent workflows",
        copy: "Turn document review, requirement extraction, exception identification, and estimate preparation into reusable company workflows.",
        items: ["Bid review agent", "Smart estimate workbook", "Company rules and human review"],
      },
      zh: {
        status: "下一阶段",
        title: "智能体工作流",
        copy: "让文件审阅、要求抽取、异常识别与估算编制成为可复用的企业流程。",
        items: ["投标审阅智能体", "智能估算工作簿", "企业规则与人工复核"],
      },
    },
    then: {
      phase: "THEN",
      en: {
        status: "LONG-TERM",
        title: "Industry network",
        copy: "Connect projects, companies, suppliers, and professional knowledge into a trusted global steel structure intelligence network.",
        items: ["Supply-chain capability graph", "Cross-project cost benchmarks", "Controlled collaborative agents"],
      },
      zh: {
        status: "长期方向",
        title: "产业协同网络",
        copy: "连接项目、企业、供应商与专业知识，形成可信的全球钢结构产业智能网络。",
        items: ["供应链能力图谱", "跨项目成本基准", "受控的协同智能体"],
      },
    },
  };

  let activeAgent = "review";
  let activeCapability = "review";
  let activeScenario = "tender";
  let activeRoadmap = "now";
  let latestBrief = null;

  function getLang() {
    return localStorage.getItem("site-lang") === "zh" ? "zh" : "en";
  }

  function applyHubTranslations() {
    const lang = getLang();
    document.querySelectorAll("[data-hub-en]").forEach((element) => {
      const value = element.getAttribute(lang === "zh" ? "data-hub-zh" : "data-hub-en");
      if (value !== null) element.textContent = value;
    });
  }

  function renderAgent() {
    const mode = agentModes[activeAgent];
    const lang = getLang();
    const copy = mode[lang] || mode.en;
    const file = document.getElementById("hub-agent-file");
    const fileState = document.getElementById("hub-agent-file-state");
    const status = document.getElementById("hub-agent-status");
    const metric = document.getElementById("hub-agent-metric");
    const metricLabel = document.getElementById("hub-agent-metric-label");
    const steps = document.getElementById("hub-agent-steps");
    if (!file || !steps) return;

    file.textContent = mode.file;
    fileState.textContent = copy.fileState;
    status.textContent = copy.status;
    metric.textContent = mode.metric;
    metricLabel.textContent = copy.metricLabel;
    steps.replaceChildren();

    copy.steps.forEach((step, index) => {
      const row = document.createElement("div");
      row.className = "hub-agent-step";
      row.style.setProperty("--delay", `${index * 80}ms`);
      const no = document.createElement("span");
      const title = document.createElement("strong");
      const state = document.createElement("small");
      no.textContent = step[0];
      title.textContent = step[1];
      state.textContent = step[2];
      if (index === copy.steps.length - 1) state.className = "working";
      row.append(no, title, state);
      steps.appendChild(row);
    });
  }

  function renderCapability() {
    const item = capabilities[activeCapability];
    const lang = getLang();
    const copy = item[lang] || item.en;
    const tag = document.getElementById("hub-capability-tag");
    const paragraph = document.getElementById("hub-capability-copy");
    const points = document.getElementById("hub-capability-points");
    if (!tag || !paragraph || !points) return;
    tag.textContent = item.tag;
    paragraph.textContent = copy.copy;
    points.replaceChildren();
    copy.points.forEach((point) => {
      const li = document.createElement("li");
      li.textContent = point;
      points.appendChild(li);
    });
  }

  function renderScenario() {
    const item = scenarios[activeScenario];
    const lang = getLang();
    const copy = item[lang] || item.en;
    document.getElementById("hub-scenario-stage").textContent = item.stage;
    document.getElementById("hub-scenario-title").textContent = copy.title;
    document.getElementById("hub-scenario-summary").textContent = copy.summary;
    document.getElementById("hub-scenario-value").textContent = copy.value;
    document.getElementById("hub-scenario-input").textContent = copy.input;
    document.getElementById("hub-scenario-output").textContent = copy.output;
  }

  function renderRoadmap() {
    const item = roadmap[activeRoadmap];
    const lang = getLang();
    const copy = item[lang] || item.en;
    const list = document.getElementById("hub-roadmap-items");
    document.getElementById("hub-roadmap-phase").textContent = item.phase;
    document.getElementById("hub-roadmap-status").textContent = copy.status;
    document.getElementById("hub-roadmap-title").textContent = copy.title;
    document.getElementById("hub-roadmap-copy").textContent = copy.copy;
    list.replaceChildren();
    copy.items.forEach((text, index) => {
      const li = document.createElement("li");
      const no = document.createElement("span");
      no.textContent = `0${index + 1}`;
      li.append(no, document.createTextNode(text));
      list.appendChild(li);
    });
  }

  function localizeBrief(brief) {
    const lang = getLang();
    if (lang !== "zh") return brief;
    const translated = brief.translations && brief.translations.zh ? brief.translations.zh : {};
    return { ...brief, ...translated };
  }

  function localizeBriefItem(item) {
    const lang = getLang();
    if (lang !== "zh") return item;
    const translated = item.translations && item.translations.zh ? item.translations.zh : {};
    return { ...item, ...translated };
  }

  function renderLatestBrief() {
    if (!latestBrief) return;
    const localized = localizeBrief(latestBrief);
    const sections = Array.isArray(latestBrief.sections) ? latestBrief.sections : [];
    const flatItems = sections.flatMap((section) =>
      (section.items || []).map((item) => ({
        item: localizeBriefItem(item),
        sectionTitle:
          getLang() === "zh" && section.translations && section.translations.zh
            ? section.translations.zh.title
            : section.title,
      }))
    );
    const selected = flatItems.slice(0, 3);
    const grid = document.getElementById("hub-brief-grid");
    const title = document.getElementById("hub-brief-title");
    const date = document.getElementById("hub-brief-date");
    if (!grid || !selected.length) return;

    title.textContent = localized.title || "Steel structure opportunity signals";
    date.textContent = latestBrief.date || "LATEST INTELLIGENCE";
    grid.replaceChildren();

    selected.forEach((entry, index) => {
      const card = document.createElement("article");
      card.className = "hub-brief-card";
      const tag = document.createElement("span");
      const heading = document.createElement("h3");
      const paragraph = document.createElement("p");
      const link = document.createElement("a");
      tag.textContent = `0${index + 1} / ${entry.sectionTitle || "SIGNAL"}`;
      heading.textContent = entry.item.headline || entry.item.title || "Steel structure signal";
      paragraph.textContent = entry.item.impact || entry.item.whyItMatters || entry.item.progress || "";
      link.href = "daily.html";
      link.textContent = getLang() === "zh" ? "查看完整信号 ↗" : "VIEW FULL SIGNAL ↗";
      card.append(tag, heading, paragraph, link);
      grid.appendChild(card);
    });
  }

  function refreshLanguage() {
    applyHubTranslations();
    renderAgent();
    renderCapability();
    renderScenario();
    renderRoadmap();
    renderLatestBrief();
  }

  function bindTabs(selector, keyName, activate) {
    document.querySelectorAll(selector).forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll(selector).forEach((candidate) => {
          const isActive = candidate === button;
          candidate.classList.toggle("active", isActive);
          candidate.setAttribute("aria-selected", String(isActive));
          const marker = candidate.querySelector(":scope > i");
          if (marker) marker.textContent = isActive ? "×" : "+";
        });
        activate(button.getAttribute(keyName));
      });
    });
  }

  async function loadLatestBrief() {
    try {
      const response = await fetch(`data/briefs/latest.json?v=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) return;
      latestBrief = await response.json();
      renderLatestBrief();
    } catch (error) {
      console.warn("Homepage Daily Brief preview unavailable", error);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindTabs("[data-agent-mode]", "data-agent-mode", (value) => {
      activeAgent = value;
      renderAgent();
    });
    bindTabs("[data-capability]", "data-capability", (value) => {
      activeCapability = value;
      renderCapability();
    });
    bindTabs("[data-scenario]", "data-scenario", (value) => {
      activeScenario = value;
      renderScenario();
    });
    bindTabs("[data-roadmap]", "data-roadmap", (value) => {
      activeRoadmap = value;
      renderRoadmap();
    });

    const onScroll = () => document.body.classList.toggle("hub-nav-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    refreshLanguage();
    loadLatestBrief();
  });

  window.addEventListener("site-language-change", refreshLanguage);
})();
