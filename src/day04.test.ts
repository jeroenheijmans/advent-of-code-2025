import { describe, expect, it } from "bun:test";

const day = "day04";

const example1 = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

type Point = {key: string, x: number, y: number, c: string};

function parseInput(input: string) {
  console.log("Parse input");
  return input
    .split(/\r?\n/gi)
    .filter((x) => !!x)
    .map((line, y) => line.split("").map((c, x) => ({ key: `${x};${y}`, x, y, c})))
    .flat();
}

function getNeighbors(p: Point, data: { [key: string]: Point }) {
  const result = [];
  for (let dy = -1; dy < 2; dy++) {
    for (let dx = -1; dx < 2; dx++) {
      if (dy == 0 && dx == 0) continue;
      const key = `${p.x + dx};${p.y + dy}`;
      if (data[key]) result.push(data[key]);
    }
  }
  return result;
}

function part1(data: Point[]) {
    const map = data.reduce((prev, curr) => {
      prev[curr.key] = curr;
      return prev;
    }, {} as { [key: string]: Point });
    return data
      .filter(p => p.c === "@")
      .map(p => getNeighbors(p, map).filter(n => n.c === "@").length)
      .filter(len => len < 4)
      .length;
}

function part2(data: Point[]) {
    const map = data.reduce((prev, curr) => {
      prev[curr.key] = curr;
      return prev;
    }, {} as { [key: string]: Point });
    let answer = 0;
    let i = 1;
    while (true) {
      let removed = false;

      const candidates = data
        .filter(p => p.c === "@")
        .filter(p => getNeighbors(p, map).filter(n => n.c === "@").length < 4);
      
      if (candidates.length > 0) {
        removed = true;
        candidates.forEach(c => delete map[c.key]);
        data = data.filter(p => !candidates.find(p2 => p2 === p));
        answer += candidates.length;
      }

      if (!removed) break;
    }
    return answer;
}

describe(`${day}`, async () => {
  const input = await Bun.file(`src/${day}.txt`).text();

  it("should solve part 1 (example 1)", () => {
    const result = part1(parseInput(example1));
    expect(result).toEqual(13);
  });

  it("should solve part 1", () => {
    const result = part1(parseInput(input));
    expect(result).toEqual(1384);
  });

  it("should solve part 2 (example 1)", () => {
    const result = part2(parseInput(example1));
    expect(result).toEqual(43);
  });

  it("should solve part 2", () => {
    const result = part2(parseInput(input));
    expect(result).toEqual(8013);
  });
}); 
