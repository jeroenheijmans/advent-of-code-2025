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

function solveFor(data: string[], substringSize = 2) {
    let answer = 0;
    data.forEach(line => {
      let digits = substringSize;
      let joltageText = "";
      let previousPosition = -1;
      do {
        let position = line.length - digits;
        for (let i = position - 1; i > previousPosition; i--) {
          if (line[i]! >= line[position]!) position = i;
        }
        previousPosition = position;
        joltageText += line[position]!;
      } while (--digits > 0);

      answer += parseInt(joltageText);
    })
    return answer;
}

describe(`${day}`, async () => {
  const input = await Bun.file(`src/${day}.txt`).text();

  it("should solve part 1 (example 1)", () => {
    const result = solveFor(parseInput(example1));
    expect(result).toEqual(357);
  });

  it("should solve part 1", () => {
    const result = solveFor(parseInput(input));
    expect(result).toEqual(17311);
  });

  it("should solve part 2 (example 1)", () => {
    const result = solveFor(parseInput(example1), 12);
    expect(result).toEqual(3121910778619);
  });

  it("should solve part 2", () => {
    const result = solveFor(parseInput(input), 12);
    expect(result).toEqual(171419245422055);
  });
}); 
