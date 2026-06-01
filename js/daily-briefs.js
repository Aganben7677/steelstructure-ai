(function () {
  const latestEl = document.getElementById("latest-brief");
  const archiveEl = document.getElementById("brief-archive-list");
  const countEl = document.getElementById("brief-count");

  if (!latestEl || !archiveEl) return;

  const cacheBust = `v=${Date.now()}`;

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
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  async function getJson(path) {
    const res = await fetch(`${path}?${cacheBust}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Unable to load ${path}`);
    return res.json();
  }

  function renderSources(sources) {
    if (!Array.isArray(sources) || !sources.length) return "";

    return `
      <div class="brief-sources">
        ${sources.map((source) => {
          const name = escapeHtml(source.name || source.url || "Source");
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
        <h3>${escapeHtml(item.headline || item.title || "Untitled update")}</h3>
        ${meta.length ? `<div class="brief-meta">${meta.map(escapeHtml).join(" · ")}</div>` : ""}
        ${item.progress ? `<p><strong>Progress:</strong> ${escapeHtml(item.progress)}</p>` : ""}
        ${item.impact ? `<p><strong>Impact:</strong> ${escapeHtml(item.impact)}</p>` : ""}
        ${item.note ? `<p>${escapeHtml(item.note)}</p>` : ""}
        ${renderSources(item.sources)}
      </article>
    `;
  }

  function renderBrief(brief) {
    const sections = Array.isArray(brief.sections) ? brief.sections : [];

    latestEl.innerHTML = `
      <header class="brief-hero">
        <div class="brief-date">${formatDate(brief.date)}</div>
        <h2>${escapeHtml(brief.title || "Daily EPC Brief")}</h2>
        ${brief.summary ? `<p>${escapeHtml(brief.summary)}</p>` : ""}
        ${brief.generatedAt ? `<span>Updated ${escapeHtml(new Date(brief.generatedAt).toLocaleString())}</span>` : ""}
      </header>
      <div class="brief-sections">
        ${sections.map((section) => `
          <section class="brief-section">
            <h2>${escapeHtml(section.title)}</h2>
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

    archiveEl.innerHTML = list.length
      ? list.map((entry) => `
          <a class="brief-archive-item" href="${escapeHtml(entry.path)}" target="_blank" rel="noopener noreferrer">
            <strong>${escapeHtml(entry.title || "Daily EPC Brief")}</strong>
            <span>${formatDate(entry.date)}</span>
          </a>
        `).join("")
      : `<div class="brief-loading">No archived briefs yet.</div>`;
  }

  Promise.all([
    getJson("data/briefs/latest.json"),
    getJson("data/briefs/index.json").catch(() => []),
  ])
    .then(([latest, index]) => {
      renderBrief(latest);
      renderArchive(index);
    })
    .catch((error) => {
      latestEl.innerHTML = `
        <div class="brief-empty">
          <h2>Daily brief is not available yet</h2>
          <p>${escapeHtml(error.message)}</p>
        </div>
      `;
      archiveEl.innerHTML = `<div class="brief-loading">Archive unavailable.</div>`;
    });
})();