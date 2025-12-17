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

function part1(data: {lights: string, wirings: string[], joltages: number[]}[]) {
  let answer = 0;

  data.forEach(line => {
    const target = parseInt(line!.lights.split("").toReversed().join(""), 2);
    const buttons = line!.wirings.map(w => w
      .split(",")
      .reduce((acc, pos) => acc | (1 << Number(pos)), 0)
    );

    // console.log("Searching", target)

    function findFewestPresses() {
      let states = new Set([0]);
      let i = 0;
      while (i++ < 10) {
        // console.log(i, states.size);
        let newStates = new Set<number>();
        for (const state of states) {
          for (const button of buttons) {
            let newState = state ^ button;
            // if (newState === target) console.log("Found it!", i);
            if (newState === target) return i;
            newStates.add(newState);
          }
        }
        states = newStates;
        // console.log([...states])
      }
      return -1e12;
    }

    answer += findFewestPresses();
  });

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
    expect(result).toEqual(7);
  });

  it("should solve part 1", () => {
    const result = part1(parseInput(input));
    expect(result).toEqual(481);
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
