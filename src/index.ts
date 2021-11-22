import fs from "fs";

import { chromium, BrowserType, webkit, firefox } from "playwright";

const FILE = "./data.csv";
const TIMES = 10_000;
const COUNT = 10_000;

function print(browser: string, result: PerformanceEntryList) {
  const min = Math.min(...result.map((e) => e.duration));

  const table: Record<string, unknown> = {};

  const csv: unknown[] = [];

  for (const d of result) {
    const normal = (d.duration / min).toLocaleString(undefined, {
      minimumSignificantDigits: 3,
      maximumSignificantDigits: 3,
    });

    const duration = Math.round(d.duration);

    table[d.name] = { duration, normal };

    csv.push(browser, ", ", d.name, ", ", duration, ", ", normal, "\n");
  }

  fs.appendFileSync(FILE, csv.join(""), {});

  console.log(`\n### ${browser} ###`);
  console.table(table);
}

function bench({ TIMES, COUNT }: { TIMES: number; COUNT: number }) {
  function benchOne(name: string, callback: () => void) {
    const start = window.performance.now();
    for (let i = 0; i < TIMES; i++) {
      callback();
    }
    window.performance.measure(name, { start });
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

  return window.performance.getEntries().map((e) => e.toJSON());
}

async function benchBrowser(browserType: BrowserType) {
  const browser = await browserType.launch();

  const page = await browser.newPage();

  page.on("console", (text) => console.log(text));

  await page.addScriptTag({ content: bench.toString() });

  const result = await page.evaluate(bench, { TIMES, COUNT }) as any;

  console.log(await page.evaluate(() => navigator.userAgent));
  print(browserType.name(), result);

  await browser.close();
}

async function main() {
  console.log({ TIMES, COUNT });
  fs.writeFileSync(FILE, "browser, name, duration, normal\n");

  for (const browserType of [chromium /*, firefox */, webkit]) {
    await benchBrowser(browserType);
  }
}

main();
