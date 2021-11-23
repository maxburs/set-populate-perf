import fs from "fs";

import { chromium, BrowserType, webkit, firefox } from "playwright";
import { bench } from "./bench.js";

const FILE = "./data.csv";
const CYCLES = 10_000;
const COUNT = 1_000;

function print(results: (readonly [string, Record<string, number>])[]) {
  const min = Math.min(
    ...results.flatMap(([, result]) => Object.values(result))
  );

  const table: Record<string, unknown> = {};

  const csv: unknown[] = ["browser, name, duration, normal\n"];

  for (const [browser, result] of results) {
    for (let [name, duration] of Object.entries(result)) {
      const normal = (duration / min).toLocaleString(undefined, {
        minimumSignificantDigits: 3,
        maximumSignificantDigits: 3,
      });
      duration = Math.round(duration);

      table[name] = { duration, normal };

      csv.push(browser, ", ", name, ", ", duration, ", ", normal, "\n");
    }

    console.log(`\n### ${browser} ###`);
    console.table(table);
  }

  fs.writeFileSync(FILE, csv.join(""), {});
}

async function benchBrowser(browserType: BrowserType) {
  const browser = await browserType.launch();

  const page = await browser.newPage();

  page.on("console", (text) => console.log(text));

  await page.addScriptTag({ content: bench.toString() });

  const result = await page.evaluate(bench, { CYCLES: CYCLES, COUNT });

  console.log(await page.evaluate(() => navigator.userAgent));

  await browser.close();

  return [browserType.name(), result] as const;
}

async function main() {
  console.log({ CYCLES: CYCLES, COUNT });

  const results = [
    await benchBrowser(chromium),
    await benchBrowser(firefox),
    await benchBrowser(webkit),
  ];

  print(results);
}

main();
