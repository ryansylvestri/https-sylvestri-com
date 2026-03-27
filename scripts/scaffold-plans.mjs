#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const templates = new Map([
  ["1.md", "# Docs + Resources Platform v1\n\nThis file documents the staged content-engine and auth rollout.\n"],
  ["2.md", "# Unified Docs/Resources/Articles + Media Library v1\n\nThis file documents the extended media and asset pipeline plan.\n"],
  ["3.md", "# Cross-Repo Duplication Runbook (HRR)\n\nThis file documents the HRR duplication and rollback runbook.\n"],
]);

for (const [fileName, contents] of templates) {
  const target = path.join(root, fileName);
  if (!fs.existsSync(target)) {
    fs.writeFileSync(target, contents, "utf8");
    console.log(`created ${fileName}`);
  }
}
