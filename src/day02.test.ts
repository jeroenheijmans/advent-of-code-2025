import { describe, expect, it } from "bun:test";

const example1 = ``;

function parseInput(input: string) {
  return input
    .split(/\r?\n/gi)
    .filter((x) => !!x)
    .map((x) => x);
}

function part1(data: any) {
    let answer = 0;
    return answer;
}

function part2(data: any) {
    let answer = 0;
    return answer;
}

describe("day02", async () => {
  const input = await Bun.file("src/day01.txt").text();

  it("should solve part 1 (example 1)", () => {
    const result = part1(parseInput(example1));
    expect(result).toEqual(-1);
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
