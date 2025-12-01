import { describe, expect, it } from "bun:test";

function part1(data: any) {
  return 0;
}

function part2(data: any) {
  return 0;
}

describe("day01", async () => {
  const input = await Bun.file("src/day01.txt").text();

  const data = input
    .split(/\r?\n/gi)
    .filter((x) => !!x)
    .map((x) => x.split(/(\w)(\d+)/gi));

  it("should sovle part 1", () => {
    const result = part1(data);
    let dial = 50;
    let answer = 0;
    data.forEach((parts) => {
      const nr = parseInt(parts[2] as string);
      dial += parts[1] === "R" ? -nr : +nr;
      dial = (dial + 100) % 100;
      if (dial === 0) answer++;
    });
    expect(answer).toEqual(-1);
  }); 

  it("should sovle part 2", () => {
    let dial = 50;
    let answer = 0;
    data.forEach((parts) => {
      const nr = parseInt(parts[2] as string);
      const startDial = dial;
      dial += parts[1] === "L" ? -nr : +nr;
      let x = "-";
      if (startDial !== 0 && dial > 100) {
        answer += Math.floor(dial / 100);
        x = "a";
      }
      else if (startDial !== 0 && dial < 0) {
        answer += Math.floor((Math.abs(dial - 100)) / 100);
        x = "b";
      }
      else if (startDial === 0) {
        answer++;
        x = "c";
      }
      dial = (dial + 100) % 100;
      console.log(answer, x, startDial, "=>", dial, parts[1], parts[2]);
    }); 
    expect(answer).toEqual(-1);
    expect(answer).not.toEqual(2097); // Guess 1
    expect(answer).not.toEqual(5154); // Guess 2
  });
});
