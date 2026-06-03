(function () {
  const latestEl = document.getElementById("latest-brief");
  const archiveEl = document.getElementById("brief-archive-list");
  const countEl = document.getElementById("brief-count");
  const archiveTitleEl = document.querySelector("[data-brief-archive-title]");
  const latestJsonLink = document.querySelector("[data-brief-json-link]");

  if (!latestEl || !archiveEl) return;

  const cacheBust = `v=${Date.now()}`;
  const briefCache = new Map();
  let archiveEntries = [];
  let activePath = "data/briefs/latest.json";
  let activeBrief = null;

  const ui = {
    en: {
      archive: "Archive",
      latestJson: "Latest JSON",
      loadingLatest: "Loading latest brief...",
      loadingArchive: "Loading archive...",
      noArchive: "No archived briefs yet.",
      unavailableTitle: "Daily brief is not available yet",
      archiveUnavailable: "Archive unavailable.",
      untitled: "Untitled update",
      defaultTitle: "Daily EPC Brief",
      source: "Source",
      progress: "Progress",
      impact: "Impact",
      updated: "Updated",
      selected: "Selected",
      dataFile: "Data file",
    },
    zh: {
      archive: "历史简报",
      latestJson: "最新 JSON",
      loadingLatest: "正在加载最新简报...",
      loadingArchive: "正在加载历史简报...",
      noArchive: "还没有历史简报。",
      unavailableTitle: "每日简报暂时不可用",
      archiveUnavailable: "历史简报暂时不可用。",
      untitled: "未命名动态",
      defaultTitle: "每日 EPC 简报",
      source: "来源",
      progress: "进展",
      impact: "影响",
      updated: "更新于",
      selected: "已选择",
      dataFile: "数据文件",
    },
  };

  function getLang() {
    return localStorage.getItem("site-lang") === "zh" ? "zh" : "en";
  }

  function label(key) {
    const lang = getLang();
    return (ui[lang] && ui[lang][key]) || ui.en[key] || key;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatDate(value) {
    if (!value) return "";
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return escapeHtml(value);
    return date.toLocaleDateString(getLang() === "zh" ? "zh-CN" : "en", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  async function getJson(path) {
    if (briefCache.has(path)) return briefCache.get(path);
    const res = await fetch(`${path}?${cacheBust}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Unable to load ${path}`);
    const json = await res.json();
    briefCache.set(path, json);
    return json;
  }

  function mergeLocalized(base, localized) {
    return { ...(base || {}), ...(localized || {}) };
  }

  function localizeBrief(brief) {
    const lang = getLang();
    const localizedBrief = mergeLocalized(brief, brief.translations && brief.translations[lang]);
    const sections = Array.isArray(brief.sections) ? brief.sections : [];
    const localizedSections =
      localizedBrief.sections && localizedBrief.sections !== brief.sections
        ? localizedBrief.sections
        : sections.map((section) => {
            const sectionCopy = mergeLocalized(section, section.translations && section.translations[lang]);
            const items = Array.isArray(section.items) ? section.items : [];
            const localizedItems =
              sectionCopy.items && sectionCopy.items !== section.items
                ? sectionCopy.items
                : items.map((item) => mergeLocalized(item, item.translations && item.translations[lang]));
            return { ...sectionCopy, items: localizedItems };
          });

    return { ...localizedBrief, sections: localizedSections };
  }

  function localizeEntry(entry) {
    const lang = getLang();
    return mergeLocalized(entry, entry.translations && entry.translations[lang]);
  }

  function renderSources(sources) {
    if (!Array.isArray(sources) || !sources.length) return "";

    return `
      <div class="brief-sources">
        ${sources.map((source) => {
          const name = escapeHtml(source.name || source.url || label("source"));
          const url = source.url ? escapeHtml(source.url) : "";
          return url
            ? `<a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a>`
            : `<span>${name}</span>`;
        }).join("")}
      </div>
    `;
  }

  function renderItem(item) {
    const meta = [
      item.company,
      item.project,
      item.region,
      item.country,
      item.sector,
      item.value,
    ].filter(Boolean);

    return `
      <article class="brief-item">
        <h3>${escapeHtml(item.headline || item.title || label("untitled"))}</h3>
        ${meta.length ? `<div class="brief-meta">${meta.map(escapeHtml).join(" / ")}</div>` : ""}
        ${item.progress ? `<p><strong>${label("progress")}:</strong> ${escapeHtml(item.progress)}</p>` : ""}
        ${item.impact ? `<p><strong>${label("impact")}:</strong> ${escapeHtml(item.impact)}</p>` : ""}
        ${item.note ? `<p>${escapeHtml(item.note)}</p>` : ""}
        ${renderSources(item.sources)}
      </article>
    `;
  }

  function renderBrief(brief) {
    activeBrief = brief;
    const localized = localizeBrief(brief);
    const sections = Array.isArray(localized.sections) ? localized.sections : [];

    latestEl.innerHTML = `
      <header class="brief-hero">
        <div class="brief-date">${formatDate(localized.date)}</div>
        <h2>${escapeHtml(localized.title || label("defaultTitle"))}</h2>
        ${localized.summary ? `<p>${escapeHtml(localized.summary)}</p>` : ""}
        ${localized.generatedAt ? `<span>${label("updated")} ${escapeHtml(new Date(localized.generatedAt).toLocaleString(getLang() === "zh" ? "zh-CN" : "en"))}</span>` : ""}
      </header>
      <div class="brief-sections">
        ${sections.map((section) => `
          <section class="brief-section">
            <h2>${escapeHtml(section.title || "")}</h2>
            <div class="brief-items">
              ${(section.items || []).map(renderItem).join("")}
            </div>
          </section>
        `).join("")}
      </div>
    `;
  }

  function renderArchive(entries) {
    const list = Array.isArray(entries) ? entries : [];
    if (countEl) countEl.textContent = String(list.length);
    if (archiveTitleEl) archiveTitleEl.textContent = label("archive");
    if (latestJsonLink) latestJsonLink.textContent = label("latestJson");

    archiveEl.innerHTML = list.length
      ? list.map((entry) => {
          const localized = localizeEntry(entry);
          const path = escapeHtml(entry.path || "");
          const isActive = entry.path === activePath || (!entry.path && activePath === "data/briefs/latest.json");
          return `
            <button class="brief-archive-item${isActive ? " active" : ""}" type="button" data-brief-path="${path}">
              <strong>${escapeHtml(localized.title || label("defaultTitle"))}</strong>
              <span>${formatDate(entry.date)}</span>
            </button>
          `;
        }).join("")
      : `<div class="brief-loading">${label("noArchive")}</div>`;
  }

  async function loadBrief(path) {
    activePath = path;
    latestEl.innerHTML = `<div class="brief-loading">${label("loadingLatest")}</div>`;
    try {
      const brief = await getJson(path);
      renderBrief(brief);
      renderArchive(archiveEntries);
    } catch (error) {
      latestEl.innerHTML = `
        <div class="brief-empty">
          <h2>${label("unavailableTitle")}</h2>
          <p>${escapeHtml(error.message)}</p>
        </div>
      `;
    }
  }

  archiveEl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-brief-path]");
    if (!button) return;
    const path = button.getAttribute("data-brief-path");
    if (!path || path === activePath) return;
    loadBrief(path);
  });

  window.addEventListener("site-language-change", () => {
    if (activeBrief) renderBrief(activeBrief);
    renderArchive(archiveEntries);
  });

  latestEl.innerHTML = `<div class="brief-loading">${label("loadingLatest")}</div>`;
  archiveEl.innerHTML = `<div class="brief-loading">${label("loadingArchive")}</div>`;

  Promise.all([
    getJson("data/briefs/latest.json"),
    getJson("data/briefs/index.json").catch(() => []),
  ])
    .then(([latest, index]) => {
      activePath = "data/briefs/latest.json";
      archiveEntries = Array.isArray(index) ? index : [];
      renderBrief(latest);
      renderArchive(archiveEntries);
    })
    .catch((error) => {
      latestEl.innerHTML = `
        <div class="brief-empty">
          <h2>${label("unavailableTitle")}</h2>
          <p>${escapeHtml(error.message)}</p>
        </div>
      `;
      archiveEl.innerHTML = `<div class="brief-loading">${label("archiveUnavailable")}</div>`;
    });
})();