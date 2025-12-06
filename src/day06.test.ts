import { describe, expect, it } from "bun:test";

const day = "day06";

const example1 = `
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

function parseInput(input: string) {
  return input
    .split(/\r?\n/gi)
    .filter((x) => !!x);
}

function part1(data: string[]) {
  const lines = data.map((x) => x.split(/\s+/gi).filter(x => !!x));
  const operators = lines.pop()!;
  const cols = [];

  for (let c = 0; c < lines[0]!.length; c++) {
    const op = operators[c]!;
    cols.push({
      base: operators[c] === "+" ? 0 : 1,
      reducer: (a: number, b: number) => op === "+" ? a + b : a * b,
      nrs: lines.map(l => parseInt(l[c]!))!,
    });
  }

  return cols
    .map(col => col.nrs.reduce(col.reducer, col.base))
    .reduce((a, b) => a + b, 0);
}

function part2(lines: string[]) {
  const operatorLine = lines.pop()!;
  let answer = 0;
  let extra = 0;
  let op = "";

  for (let c = 0; c < lines[0]!.length; c++) {
    if (operatorLine[c] !== " ") {
      answer += extra;
      op = operatorLine[c]!;
      extra = op === "+" ? 0 : 1;
    }

    let next = lines.map(l => l[c]).join("").replaceAll(" ", "");
    if (next === "") continue;
    if (op === "+") extra += parseInt(next);
    if (op === "*") extra *= parseInt(next);
  }
  
  return answer + extra;
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

  it("should solve part 2 (example 1)", () => {
    const result = part2(parseInput(example1));
    expect(result).toEqual(3263827);
  });

  it("should solve part 2", () => {
    const result = part2(parseInput(input));
    expect(result).toEqual(11159825706149);
  });
});
