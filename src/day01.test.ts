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
    expect(answer).toEqual(964);
  }); 

  it("should sovle part 2", () => {
    let dial = 50;
    let answer = 0;
    data.forEach((parts) => {
      const nr = parseInt(parts[2] as string) * (parts[1] === "R" ? +1 : -1);
      const startDial = dial;
      dial += nr;

      if (dial === 0) {
        answer++;
      }
      else if (dial >= 100) {
        answer += Math.floor(dial / 100);
        dial %= 100;
      }
      else if (dial < 0) {
        const fullTurns = Math.floor(Math.abs(dial) / 100);
        answer += fullTurns + (startDial === 0 ? 0 : 1);
        dial += fullTurns * 100 + 100;
      } 
 
      console.log(" - The dial is rotated", parts[1], parseInt(parts[2] as string), "to point at", dial, "   - answer = ", answer)
    }); 
    expect(answer).not.toEqual(2097); // Guess 1
    expect(answer).not.toEqual(5154); // Guess 2
    expect(answer).not.toEqual(5944); // Guess 3
    expect(answer).not.toEqual(6350); // Guess 4
    expect(answer).not.toEqual(5627); // Guess 5
    expect(answer).not.toEqual(5925); // Guess 6
    expect(answer).toEqual(-1); 
  });
});
