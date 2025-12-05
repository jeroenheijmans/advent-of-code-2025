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
    ranges: ranges!.split(/\r?\n/gi).filter((x) => !!x).map((x) => x.split("-").map(n => parseInt(n))),
    ids: ids!.split(/\r?\n/gi).filter((x) => !!x).map(id => parseInt(id)),
  };
}

type Input = {
  ranges: number[][];
  ids: number[]
} 

function isFresh(id: number, ranges: number[][]) {
  return ranges.some(range => {
    const [from, to] = range;
    if (id >= from! && id <= to!) return true;
  });
}

function part1(data: Input) {
    return data.ids
      .filter(id => isFresh(id, data.ranges))
      .length;
}

function part2(data: Input) {
    let answer = 0;
    return answer;
}

describe(`${day}`, async () => {
  const input = await Bun.file(`src/${day}.txt`).text();

  it("should solve part 1 (example 1)", () => {
    const result = part1(parseInput(example1));
    expect(result).toEqual(3);
  });

  it("should solve part 1", () => {
    const result = part1(parseInput(input));
    expect(result).toEqual(-1);
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
