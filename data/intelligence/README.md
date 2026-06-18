# Steelstructure.ai Intelligence Data Layer

This folder stores structured intelligence extracted from Daily Steel Structure Briefs.

The purpose is to make each Daily Brief more than a published article. Every update should also become a reusable data source for future project tracking, EPC profiling, owner tracking, supply-chain mapping, search, and AI-assisted tender intelligence.

## Files

- `daily-signal-log.json` — master log of all extracted Daily Brief signals.
- `projects-index.json` — structured project records referenced by Daily Brief signals.
- `epc-index.json` — EPC / contractor records referenced by project signals.
- `owners-index.json` — owner / client records referenced by project signals.

## Update rule

Whenever a new Daily Brief is published, update these files together:

1. `data/briefs/latest.json`
2. `data/briefs/YYYY-MM-DD.json`
3. `data/briefs/index.json`
4. `data/intelligence/daily-signal-log.json`
5. `data/intelligence/projects-index.json`
6. `data/intelligence/epc-index.json`
7. `data/intelligence/owners-index.json`

Each Daily Brief item must have a stable `signalId`, for example:

```json
"signalId": "2026-06-18-micron-bechtel-ny-semiconductor"
```

Indexes should reference these IDs so that future project pages, EPC pages, maps, search features, and AI workflows can trace every record back to its originating brief.
