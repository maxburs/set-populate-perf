const TIMES = 10_000;
const COUNT = 10_000;

function bench(name: string, callback: () => void) {
  const start = window.performance.now();
  for (let i = 0; i < TIMES; i++) {
    callback();
  }
  window.performance.measure(name, { start });
}

function print() {

  const min = Math.min(...window.performance.getEntries().map(e => e.duration));

  const table: Record<string, unknown> = {};

  const csv: unknown[] = ['name, duration, normal\n'];

  for (const d of window.performance.getEntries()) {
    const normal = d.duration / min;

    table[d.name] = {
      duration: d.duration,
      normal,
    };

    csv.push(d.name, ', ', d.duration, ', ', normal, '\n');
  }

  Deno.writeTextFile('./data.csv', csv.join(''));

  console.table(table);
}

function main() {
  console.log({ TIMES, COUNT });

  const arr = new Array(COUNT);

  for (let i = 0; i <= COUNT; i++) {
    arr[i] = { val: i };
  }

  bench("map", () => {
    new Set(arr.map((o) => o.val));
  });

  bench("generator", () => {
    new Set(
      (function* () {
        for (const item of arr) {
          yield item.val;
        }
      })()
    );
  });

  bench("Set#add", () => {
    const set = new Set();

    for (const item of arr) {
      set.add(item.val);
    }
  });

  bench("iterator", () => {
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

  print();
}

main();
