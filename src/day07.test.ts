import { describe, expect, it } from "bun:test";

const day = "day07";

const example1 = `
.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

function parseInput(input: string) {
  return input
    .trim()
    .split(/\r?\n/gi)
    .filter((x) => !!x)
    .map((x) => x.trim().split(""));
}

function part1(data: string[][]) {
  let answer = 0;

  let lines = data
    .map((line, y) => line.map((c, x) => ({ x, y, c })));

  let xs = new Set([data[0]!.indexOf("S")]);
  let y = 0;

  do {
    let newXs = new Set<number>();
    for (const x of xs) {
      if (lines[y] && lines[y]![x]?.c === "^") {
        newXs.add(x - 1);
        newXs.add(x + 1);
        answer++;
      } else { 
        newXs.add(x);
      }
    }
    xs = newXs;
  } while (y++ < lines.length)

  return answer;
}

function part2(data: string[][]) {
  let answer = 0;
  return answer;
}

describe(`${day}`, async () => {
  const input = await Bun.file(`src/${day}.txt`).text();

  it("should solve part 1 (example 1)", () => {
    const result = part1(parseInput(example1));
    expect(result).toEqual(21);
  });

  it("should solve part 1", () => {
    const result = part1(parseInput(input));
    expect(result).toEqual(1490);
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
