import { describe, expect, it } from "bun:test";

const example1 = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`;

function parseInput(input: string) {
  return input
    .split(",")
    .filter((x) => !!x)
    .map((x) => x.split("-").map(y => parseInt(y))) as [number, number][];
}

function* getFactors(n: number): IterableIterator<number> {
  const half = Math.floor(n / 2);
  for (let i = 1; i <= half; i++) {
    if (n % i === 0) yield i;
  }
}

const lenToFactors = [...Array(33)].map((_, i) => [...getFactors(i)]);

function isInvalid(nr: number, part = 1) {
  const str = nr.toString();
  const len = str.length;
  for (const factor of lenToFactors[len]!) {
    const multiplier = len / factor;
    if (part === 1 && multiplier !== 2) continue;
    const snippet = str.substring(0, factor);
    const expected = snippet.repeat(multiplier);
    if (str === expected) return true;
  }
  return false;
}

function part1(data: [number, number][]) {
  let answer = 0;
  data.forEach(([from, to]) => {
    for (let i = from; i <= to; i++) {
      if (isInvalid(i)) {
        answer += i;
      }
    }
  });
  return answer;
}

function part2(data: [number, number][]) {
  let answer = 0;
  data.forEach(([from, to]) => {
    for (let i = from; i <= to; i++) {
      if (isInvalid(i, 2)) {
        answer += i;
      }
    }
  });
  return answer;
}

describe("day02", async () => {
  const input = await Bun.file("src/day02.txt").text();

  it("should solve part 1 (example 1)", () => {
    const result = part1(parseInput(example1));
    expect(result).toEqual(1227775554);
  });

  it("should solve part 1", () => {
    const result = part1(parseInput(input));
    expect(result).toEqual(24747430309);
  });

  it("should solve part 2 (example 1)", () => {
    const result = part2(parseInput(example1));
    expect(result).toEqual(4174379265);
  });

  it("should solve part 2", () => {
    const result = part2(parseInput(input));
    expect(result).toEqual(30962646823);
  });
}); 
