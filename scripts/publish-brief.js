#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const briefsDir = path.join(repoRoot, "data", "briefs");
const indexPath = path.join(briefsDir, "index.json");
const latestPath = path.join(briefsDir, "latest.json");

function readStdin() {
  return new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", reject);
  });
}

function readJsonFile(filePath) {
  return fs.readFileSync(path.resolve(process.cwd(), filePath), "utf8");
}

function prettyJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function assertString(value, name) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`brief.${name} must be a non-empty string`);
  }
}

function validateBrief(brief) {
  assertString(brief.date, "date");
  assertString(brief.title, "title");

  if (!/^\d{4}-\d{2}-\d{2}$/.test(brief.date)) {
    throw new Error("brief.date must use YYYY-MM-DD");
  }

  if (!Array.isArray(brief.sections) || !brief.sections.length) {
    throw new Error("brief.sections must be a non-empty array");
  }

  brief.sections.forEach((section, sectionIndex) => {
    assertString(section.title, `sections[${sectionIndex}].title`);
    if (!Array.isArray(section.items) || !section.items.length) {
      throw new Error(`brief.sections[${sectionIndex}].items must be a non-empty array`);
    }

    section.items.forEach((item, itemIndex) => {
      assertString(item.headline || item.title, `sections[${sectionIndex}].items[${itemIndex}].headline`);
    });
  });
}

function normalizeBrief(brief) {
  const normalized = {
    date: brief.date.trim(),
    title: brief.title.trim(),
    summary: typeof brief.summary === "string" ? brief.summary.trim() : "",
    generatedAt: brief.generatedAt || new Date().toISOString(),
    language: brief.language || "zh-CN",
    sections: brief.sections,
  };

  validateBrief(normalized);
  return normalized;
}

function readIndex() {
  if (!fs.existsSync(indexPath)) return [];
  const parsed = JSON.parse(fs.readFileSync(indexPath, "utf8"));
  return Array.isArray(parsed) ? parsed : [];
}

function writeBrief(brief) {
  fs.mkdirSync(briefsDir, { recursive: true });

  const entryPath = `data/briefs/${brief.date}.json`;
  const absoluteEntryPath = path.join(repoRoot, entryPath);
  fs.writeFileSync(absoluteEntryPath, prettyJson(brief), "utf8");
  fs.writeFileSync(latestPath, prettyJson(brief), "utf8");

  const nextEntry = {
    date: brief.date,
    title: brief.title,
    path: entryPath,
  };

  const index = readIndex()
    .filter((entry) => entry && entry.date !== brief.date);
  index.push(nextEntry);
  index.sort((a, b) => String(b.date).localeCompare(String(a.date)));

  fs.writeFileSync(indexPath, prettyJson(index), "utf8");

  return { entryPath, latestPath: "data/briefs/latest.json", indexPath: "data/briefs/index.json" };
}

async function main() {
  const input = process.argv[2] ? readJsonFile(process.argv[2]) : await readStdin();
  if (!input.trim()) {
    throw new Error("Provide brief JSON by file path or stdin");
  }

  const brief = normalizeBrief(JSON.parse(input));
  const written = writeBrief(brief);
  process.stdout.write(`${JSON.stringify({ ok: true, written }, null, 2)}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
});