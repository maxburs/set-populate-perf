export function bench({ CYCLES, COUNT }: { CYCLES: number; COUNT: number }) {
  const measurements: Record<string, number> = {};

  function benchOne(name: string, callback: () => void) {
    const start = window.performance.now();
    for (let i = 0; i < CYCLES; i++) {
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

  benchOne("generator for..of", () => {
    new Set(
      (function* () {
        for (const item of arr) {
          yield item.val;
        }
      })()
    );
  });

  benchOne("generator for", () => {
    new Set(
      (function* () {
        for (let i = 0; i < arr.length; i++) {
          yield arr[i].val;
        }
      })()
    );
  });

  benchOne("Set#add for..of", () => {
    const set = new Set();

    for (const item of arr) {
      set.add(item.val);
    }
  });

  benchOne("Set#add for", () => {
    const set = new Set();

    for (let i = 0; i < arr.length; i++) {
      set.add(arr[i].val);
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
