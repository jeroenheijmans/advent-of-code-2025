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
    const result = part1(data);
    let dial = 50;
    let answer = 0;
    data.forEach((parts) => {
      const nr = parseInt(parts[2] as string);
      dial += parts[1] === "R" ? -nr : +nr;
      if (dial < 0 || dial > 100) answer++;
      dial = (dial + 100) % 100;
    });
    expect(answer).toEqual(-1);
  });
});
