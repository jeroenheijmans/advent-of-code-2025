import { describe, expect, it } from "bun:test";

const day = "day05";

const example1 = `
3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

function parseInput(input: string) {
  const [ranges, ids] = input.split(/\r?\n\r?\n/gi);
  return {
    ranges: ranges!
      .split(/\r?\n/gi)
      .filter((x) => !!x)
      .map((x) => x.split("-").map((n) => parseInt(n))),
    ids: ids!
      .split(/\r?\n/gi)
      .filter((x) => !!x)
      .map((id) => parseInt(id)),
  };
}

type Input = {
  ranges: number[][];
  ids: number[];
};

function isFresh(id: number, ranges: number[][]) {
  return ranges.some((range) => {
    const [from, to] = range;
    if (id >= from! && id <= to!) return true;
  });
}

function part1(data: Input) {
  return data.ids.filter((id) => isFresh(id, data.ranges)).length;
}

function isOverlapping(r1: number[], r2: number[]) {
  const [from1, to1] = r1;
  const [from2, to2] = r2;
  if (from2! >= from1! && from2! <= to1!) return true;
  if (to2! >= from1! && to2! <= to1!) return true;
  return false;
}

function mergeRanges(r1: number[], r2: number[]) {
  const [from1, to1] = r1;
  const [from2, to2] = r2;
  return [
    Math.min(from1!, to1!, from2!, to2!),
    Math.max(from1!, to1!, from2!, to2!),
  ]
}

function part2(data: Input) {
  let { ranges } = data;
  while (true) {
    let hasDoneMerge = false;
    for (let i = 0; i < ranges.length; i++) {
      for (let j = i + 1; j < ranges.length; j++) {
        if (isOverlapping(ranges[i]!, ranges[j]!)) {
          hasDoneMerge = true;
          const merged = mergeRanges(ranges[i]!, ranges[j]!);
          // console.log("Merging!", ranges[i], ranges[j], "becomes", merged);
          ranges = [
            ...ranges.filter(r => r !== ranges[i] && r !== ranges[j]),
            merged
          ]
          break;
        }
      }
      if (hasDoneMerge) break;
    }
    if (!hasDoneMerge) break;
  }
  return ranges.map(([from, to]) => to! - from! + 1).reduce((a, b) => a + b, 0);
}

describe(`${day}`, async () => {
  const input = await Bun.file(`src/${day}.txt`).text();

  it("should solve part 1 (example 1)", () => {
    const result = part1(parseInput(example1));
    expect(result).toEqual(3);
  });

  it("should solve part 1", () => {
    const result = part1(parseInput(input));
    expect(result).toEqual(520);
  });

  it("should solve part 2 (example 1)", () => {
    const result = part2(parseInput(example1));
    expect(result).toEqual(14);
  });

  it("should solve part 2", () => {
    const result = part2(parseInput(input));
    expect(result).toBeLessThan(352347720583355);
    expect(result).toEqual(-1);
  });
});
