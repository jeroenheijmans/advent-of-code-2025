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
    .map((x) => x);

  it("should sovle part 1", () => {
    const result = part1(data);
    expect(result).toEqual(-1);
  });

  // it("should sovle part 2", () => {
  //   const result = part1(data);
  //   expect(result).toEqual(-1);
  // });
});
