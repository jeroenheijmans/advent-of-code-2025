import { describe, expect, it } from "bun:test";

const day = "day03";

const example1 = `
987654321111111
811111111111119
234234234234278
818181911112111`;

function parseInput(input: string) {
  return input
    .split(/\r?\n/gi)
    .filter((x) => !!x)
    .map((x) => x);
}

function part1(data: string[]) {
    let answer = 0;
    data.forEach(line => {
      let pos1 = 0;
      for (let i = 1; i < line.length - 1; i++) {
        if (line[i]! > line[pos1]!) pos1 = i;
      }
      let pos2 = line.length - 1;
      for (let i = pos2 - 1; i > pos1; i--) {
        if (line[i]! > line[pos2]!) pos2 = i;
      }
      const combo = line[pos1]! + line[pos2]!;
      const joltage = parseInt(combo);
      answer += joltage;
    })
    return answer;
}

function part2(data: any) {
    let answer = 0;
    return answer;
}

describe(`${day}`, async () => {
  const input = await Bun.file(`src/${day}.txt`).text();

  it("should solve part 1 (example 1)", () => {
    const result = part1(parseInput(example1));
    expect(result).toEqual(357);
  });

  it("should solve part 1", () => {
    const result = part1(parseInput(input));
    expect(result).toEqual(17311);
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
