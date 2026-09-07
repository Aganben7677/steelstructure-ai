(function () {
  const grid = document.getElementById('home-brief-preview');
  const date = document.getElementById('home-brief-date');
  if (!grid || !date) return;
  let brief;
  function render() {
    if (!brief) return;
    const items = brief.sections.flatMap(section => section.items || []).slice(0, 3);
    const fragment = document.createDocumentFragment();
    items.forEach((item, index) => {
      const localized = { ...item, ...(item.translations?.[currentLang] || {}) };
      const card = document.createElement('article');
      card.className = 'home-daily-card' + (index === 0 ? ' featured' : '');
      const tag = document.createElement('span');
      tag.className = 'home-tag';
      tag.textContent = localized.sector || localized.company || 'Project';
      const heading = document.createElement('h3');
      const link = document.createElement('a');
      link.href = 'daily.html';
      link.textContent = localized.headline;
      heading.append(link);
      const desc = document.createElement('p');
      desc.textContent = localized.impact || localized.progress || '';
      card.append(tag, heading, desc);
      const source = item.sources?.find(source => /^https?:\/\//i.test(source.url));
      if (source) {
        const sourceLink = document.createElement('a');
        sourceLink.className = 'brief-source';
        sourceLink.href = source.url;
        sourceLink.target = '_blank';
        sourceLink.rel = 'noopener noreferrer';
        sourceLink.textContent = `${t('home_source')}: ${source.name}`;
        card.append(sourceLink);
      }
      fragment.append(card);
    });
    grid.replaceChildren(fragment);
    const label = document.createElement('span');
    label.textContent = t('home_latest_date') + ': ';
    const time = document.createElement('time');
    time.dateTime = brief.date;
    time.textContent = brief.date;
    date.replaceChildren(label, time);
    if (Date.now() - Date.parse(brief.date + 'T00:00:00Z') > 7 * 86400000) {
      date.append(document.createTextNode(' · ' + t('home_stale_note')));
    }
  }
  window.addEventListener('site-language-change', render);
  fetch('data/briefs/latest.json', { cache: 'no-cache' })
    .then(response => { if (!response.ok) throw new Error('Brief unavailable'); return response.json(); })
    .then(data => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || !Number.isFinite(Date.parse(data.date)) ||
          !Array.isArray(data.sections) || !data.sections.some(section => Array.isArray(section.items) && section.items.length)) return;
      brief = data;
      render();
    })
    .catch(() => { /* Keep the explicitly dated archive preview when offline. */ });
})();
