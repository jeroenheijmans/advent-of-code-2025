import { describe, expect, it } from "bun:test";

const day = "day10";

const example1 = `
[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;

function parseInput(input: string) {
  return input
    .split(/\r?\n/gi)
    .filter((x) => !!x)
    .map((x) => x
      .replace(/[\[}]/gi, "")
      .split(/[\]{]/gi)
    ).map(([lights, wirings, joltages]) => ({
      lights: lights!.trim().replaceAll(".", "0").replaceAll("#", "1"),
      wirings: wirings!.trim().replaceAll("(", "").replaceAll(")", "").split(" "),
      joltages: joltages!.trim().split(",").map(n => parseInt(n)),
    }));
}

function part1(data: {lights: string, wirings: string[]}[]) {
  let answer = 0;

  data.forEach(line => {
    const target = parseInt(line!.lights.split("").toReversed().join(""), 2);
    const buttons = line!.wirings.map(w => w
      .split(",")
      .reduce((acc, pos) => acc | (1 << Number(pos)), 0)
    );

    function findFewestPresses() {
      let states = new Set([0]);
      let i = 0;
      while (i++ < 1e6) {
        let newStates = new Set<number>();
        for (const state of states) {
          for (const button of buttons) {
            let newState = state ^ button;
            if (newState === target) return i;
            newStates.add(newState);
          }
        }
        states = newStates;
      }
      throw Error("No solution found!?");
    }

    answer += findFewestPresses();
  });

  return answer;
}

// Example
//
//     A (0,0,0,1) -- (3)
//     B (0,1,0,1) -- (1,3)
//     C (0,0,1,0) -- (2)
//     D (0,0,1,1) -- (2,3)
//     E (1,0,1,0) -- (0,2)
//     F (1,1,0,0) -- (0,1)
//    
//       {3,5,4,7}
//    
//     3 = E + F
//     5 = B + F
//     4 = C + D + E
//     7 = A + B + D

function part2(data: {wirings: string[], joltages: number[]}[]) {
  let answer = 0;

  data.forEach(line => {
    const joltages = line!.joltages;
    const buttons = line!.wirings.map(w => w.split(",").map(n => parseInt(n)));

    const maximumPressesPerButtonIndex = [];
    for (const button of buttons) {
      let maxNrOfPresses = Number.MAX_SAFE_INTEGER;
      for (let idx = 0; idx < joltages.length; idx++) {
        if (button.includes(idx)) maxNrOfPresses = Math.min(maxNrOfPresses, joltages[idx]!);
      }
      maximumPressesPerButtonIndex.push(maxNrOfPresses);
    }

    console.log(maximumPressesPerButtonIndex)
  });

  return answer;
}

describe(`${day}`, async () => {
  const input = await Bun.file(`src/${day}.txt`).text();

  it("should solve part 1 (example 1)", () => {
    const result = part1(parseInput(example1));
    expect(result).toEqual(7);
  });

  it("should solve part 1", () => {
    const result = part1(parseInput(input));
    expect(result).toEqual(481);
  });

  it("should solve part 2 (example 1)", () => {
    const result = part2(parseInput(example1));
    expect(result).toEqual(33);
  });

  // it("should solve part 2", () => {
  //   const result = part2(parseInput(input));
  //   expect(result).toEqual(-1);
  // });
});
