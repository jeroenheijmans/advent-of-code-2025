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

  let lines = data
    .map((line, y) => line.map((c, x) => ({ x, y, c })));

  const worlds = lines.map(line => line.map((entry) => entry.c === "S" ? 1 : 0));
  worlds.push(worlds[0]!.map(() => 0));
  let y = 0;

  do {
    for (let x = 0; x < lines[0]!.length; x++) {
      const paths = worlds[y][x];
      if (paths === 0) continue;

      if (lines[y] && lines[y]![x]?.c === "^") {
        worlds[y + 1][x - 1] += paths;
        worlds[y + 1][x + 1] += paths;
        answer++;
      } else {
        worlds[y + 1][x] += paths;
      }
    }
  } while (++y < lines.length);


  return worlds.pop()?.reduce((a, b) => a + b, 0);
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

  it("should solve part 2 (example 1)", () => {
    const result = part2(parseInput(example1));
    expect(result).toEqual(40);
  });

  it("should solve part 2", () => {
    const result = part2(parseInput(input));
    expect(result).toEqual(3806264447357);
  });
});
