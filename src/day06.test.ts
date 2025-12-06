import { describe, expect, it } from "bun:test";

const day = "day06";

const example1 = `
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

function parseInput(input: string) {
  const lines = input
    .split(/\r?\n/gi)
    .filter((x) => !!x)
    .map((x) => x.split(/\s+/gi).filter(x => !!x));
  
  const operators = lines.pop()!;
  const cols = [];

  for (let c = 0; c < lines[0]!.length; c++) {
    cols.push({
      op: operators[c]!,
      base: operators[c] === "+" ? 0 : 1,
      nrs: lines.map(l => parseInt(l[c]!))!,
    });
  }

  return cols;
}

type Data = {
  op: string;
  base: number;
  nrs: number[];
}

function part1(data: Data[]) {
  return data
    .map(col => col.nrs.reduce((nr, acc) => col.op === "+" ? nr + acc : nr * acc, col.base))
    .reduce((a, b) => a + b, 0);
}

function part2(data: Data[]) {
  let answer = 0;
  return answer;
}

describe(`${day}`, async () => {
  const input = await Bun.file(`src/${day}.txt`).text();

  it("should solve part 1 (example 1)", () => {
    const result = part1(parseInput(example1));
    expect(result).toEqual(4277556);
  });

  it("should solve part 1", () => {
    const result = part1(parseInput(input));
    expect(result).toEqual(5877594983578);
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
