import { describe, expect, it } from "bun:test";

const example1 = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

function parseInput(input: string) {
  return input
    .split(/\r?\n/gi)
    .filter((x) => !!x)
    .map((x) => x.replace("L", "-").replace("R", ""))
    .map((x) => parseInt(x));
}

function part1(data: number[]) {
    let dial = 50;
    let answer = 0;
    data.forEach((nr) => {
      dial += nr;
      dial = dial % 100;
      if (dial === 0) answer++;
    });
    return answer;
}

function part2(data: number[]) {
    let dial = 50;
    let answer = 0;
    data.forEach((nr) => {
      const startDial = dial;
      dial += nr;

      if (startDial === 0 && nr > 0) {
        answer += Math.floor(dial / 100);
      }
      else if (startDial === 0 && nr < 0) {
        answer += Math.floor(Math.abs(dial) / 100);
      }
      else if (startDial !== 0 && nr > 0) {
        answer += Math.floor(dial / 100);
      }
      else if (startDial !== 0 && nr < 0 && dial <= 0) {
        answer += Math.floor(Math.abs(dial) / 100) + 1;
      }

      dial = (dial + 1e6) % 100;
      
    });
    return answer;
}

describe("day01", async () => {
  const input = await Bun.file("src/day01.txt").text();

  it("should solve part 1 (example 1)", () => {
    const result = part1(parseInput(example1));
    expect(result).toEqual(3);
  });

  it("should solve part 1", () => {
    const result = part1(parseInput(input));
    expect(result).toEqual(964);
  });

  it("should solve part 2 (example 1)", () => {
    const result = part2(parseInput(example1));
    expect(result).toEqual(6);
  });

  it("should solve part 2", () => {
    const result = part2(parseInput(input));

    expect(result).not.toEqual(2097); // Guess 1
    expect(result).not.toEqual(5154); // Guess 2
    expect(result).not.toEqual(5944); // Guess 3
    expect(result).not.toEqual(6350); // Guess 4
    expect(result).not.toEqual(5627); // Guess 5
    expect(result).not.toEqual(5925); // Guess 6
    expect(result).not.toEqual(5954); // Guess 7
    
    expect(result).toEqual(5872); // Finally correct
  });
}); 
