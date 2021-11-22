import fs from "fs";

import { chromium, BrowserType, webkit, firefox } from "playwright";

const FILE = "./data.csv";
const TIMES = 10_000;
const COUNT = 10_000;

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

function bench({ TIMES, COUNT }: { TIMES: number; COUNT: number }) {
  const measurements: Record<string, number> = {};

  function benchOne(name: string, callback: () => void) {
    const start = window.performance.now();
    for (let i = 0; i < TIMES; i++) {
      callback();
    }
    measurements[name] = window.performance.now() - start;
  }

  const arr = new Array(COUNT);

  for (let i = 0; i <= COUNT; i++) {
    arr[i] = { val: i };
  }

  benchOne("map", () => {
    new Set(arr.map((o) => o.val));
  });

  benchOne("generator", () => {
    new Set(
      (function* () {
        for (const item of arr) {
          yield item.val;
        }
      })()
    );
  });

  benchOne("Set#add", () => {
    const set = new Set();

    for (const item of arr) {
      set.add(item.val);
    }
  });

  benchOne("iterator", () => {
    const iterator = () => ({
      i: 0,
      next() {
        const value = {
          value: arr[this.i],
          done: this.i === arr.length - 1,
        };
        this.i++;
        return value;
      },
    });

    new Set({ [Symbol.iterator]: iterator });
  });

  return measurements;
}

async function benchBrowser(browserType: BrowserType) {
  const browser = await browserType.launch();

  const page = await browser.newPage();

  page.on("console", (text) => console.log(text));

  await page.addScriptTag({ content: bench.toString() });

  const result = await page.evaluate(bench, { TIMES, COUNT });

  console.log(await page.evaluate(() => navigator.userAgent));

  await browser.close();

  return [browserType.name(), result] as const;
}

async function main() {
  console.log({ TIMES, COUNT });

  const results = [
    await benchBrowser(chromium),
    await benchBrowser(firefox),
    await benchBrowser(webkit),
  ];

  print(results);
}

main();
