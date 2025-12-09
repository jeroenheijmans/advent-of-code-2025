import { describe, expect, it } from "bun:test";

const day = "day09";

const example1 = `
7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

function parseInput(input: string) {
  return input
    .split(/\r?\n/gi)
    .filter((x) => !!x)
    .map((line) => line.split(",").map((n) => parseInt(n)))
    .map((parts) => ({ x: parts[0]!, y: parts[1]! }));
}

type Point = { x: number; y: number; };

function part1(data: Point[]) {
  let answer = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      const width = Math.abs(data[i]!.x - data[j]!.x) + 1;
      const height = Math.abs(data[i]!.y - data[j]!.y) + 1;
      const area = width * height;
      answer = Math.max(answer, area);
    }
  }
  return answer;
}

function part2(data: Point[]) {
  let answer = 0;
  return answer;
}

describe(`${day}`, async () => {
  const input = await Bun.file(`src/${day}.txt`).text();

  it("should solve part 1 (example 1)", () => {
    const result = part1(parseInput(example1));
    expect(result).toEqual(50);
  });

  it("should solve part 1", () => {
    const result = part1(parseInput(input));
    expect(result).toEqual(4755278336);
  });

  // it("should solve part 2 (example 1)", () => {
  //   const result = part2(parseInput(example1));
  //   expect(result).toEqual(-1);
  // });

  // it("should solve part 2", () => {
  //   const result = part2(parseInput(input));
  //   expect(result).toEqual(-1);
  // });
});
