#!/usr/bin/env node
// dse.best View Count Manager

const readline = require("readline");

const UPSTASH_URL = "https://light-cricket-40333.upstash.io";
const UPSTASH_TOKEN = "AZ2NAAIncDJkYzM3MmQ0MjIxMjE0MTMxOTZkODkwYzM2MTZkMmNiZXAyNDAzMzM";

const headers = {
  Authorization: `Bearer ${UPSTASH_TOKEN}`,
  "Content-Type": "application/json",
};

async function redisGet(path) {
  const res = await fetch(`${UPSTASH_URL}/${path}`, { headers });
  const json = await res.json();
  return json.result;
}

async function getAllSlugs() {
  const keys = [];
  let cursor = 0;
  do {
    const res = await fetch(
      `${UPSTASH_URL}/scan/${cursor}/match/${encodeURIComponent("viewCount:*")}/count/100`,
      { headers }
    );
    const json = await res.json();
    cursor = json.result[0];
    keys.push(...json.result[1]);
  } while (cursor !== "0");
  return keys;
}

async function setViewCount(slug, count) {
  const key = encodeURIComponent(`viewCount:${slug}`);
  await redisGet(`set/${key}/${count}`);
}

async function getViewCount(slug) {
  const key = encodeURIComponent(`viewCount:${slug}`);
  const val = await redisGet(`get/${key}`);
  return val === null ? 0 : parseInt(val);
}

function prompt(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  console.log("\n  dse.best View Count Manager");
  console.log("  ───────────────────────────\n");
  console.log("  Fetching posts...");

  const keys = await getAllSlugs();

  if (keys.length === 0) {
    console.log("  No viewCount keys found.");
    rl.close();
    return;
  }

  const encodedKeys = keys.map(encodeURIComponent).join("/");
  const mgetRes = await fetch(`${UPSTASH_URL}/mget/${encodedKeys}`, { headers });
  const mgetJson = await mgetRes.json();
  const values = mgetJson.result;

  const posts = keys.map((key, i) => ({
    index: i + 1,
    slug: key.replace(/^viewCount:/, ""),
    views: values[i] === null ? 0 : parseInt(values[i]),
  }));

  console.log();
  console.log(`  ${"#".padEnd(4)} ${"Slug".padEnd(42)} Views`);
  console.log(`  ${"─".padEnd(4)} ${"─".repeat(42)} ${"─".repeat(5)}`);
  for (const p of posts) {
    console.log(`  ${String(p.index).padEnd(4)} ${p.slug.padEnd(42)} ${p.views}`);
  }
  console.log();

  const choice = await prompt(rl, "  Enter post # to edit (q to quit): ");
  if (choice === "q") { rl.close(); return; }

  const idx = parseInt(choice) - 1;
  if (isNaN(idx) || idx < 0 || idx >= posts.length) {
    console.log("  Invalid choice.");
    rl.close();
    return;
  }

  const selected = posts[idx];
  console.log(`\n  Selected : ${selected.slug}`);
  console.log(`  Current  : ${selected.views} views\n`);
  console.log("  [1] Set to exact value");
  console.log("  [2] Add to current count");
  console.log("  [3] Reset to 0");
  console.log("  [q] Cancel\n");

  const action = await prompt(rl, "  Choice: ");
  let newVal = null;

  if (action === "1") {
    newVal = parseInt(await prompt(rl, "  New view count: "));
  } else if (action === "2") {
    const add = parseInt(await prompt(rl, "  Views to add: "));
    newVal = selected.views + add;
  } else if (action === "3") {
    newVal = 0;
  } else if (action === "q") {
    console.log("  Cancelled.");
    rl.close();
    return;
  } else {
    console.log("  Invalid action.");
    rl.close();
    return;
  }

  console.log(`\n  About to set ${selected.slug} → ${newVal} views\n`);
  const confirm = await prompt(rl, "  Confirm? (y/n): ");
  if (confirm !== "y") {
    console.log("  Aborted.");
    rl.close();
    return;
  }

  await setViewCount(selected.slug, newVal);
  const actual = await getViewCount(selected.slug);
  console.log(`\n  Done! Redis confirmed: ${actual} views\n`);

  rl.close();
}

main().catch((err) => { console.error(err); process.exit(1); });
