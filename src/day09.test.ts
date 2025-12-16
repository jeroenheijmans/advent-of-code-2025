import { describe, expect, it } from "bun:test";

const day = "day09";

const example1 = `
7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

function parseInput(input: string) {
  return input
    .split(/\r?\n/gi)
    .filter((x) => !!x)
    .map((line) => line.split(",").map((n) => parseInt(n)))
    .map((parts) => ({ x: parts[0]!, y: parts[1]! }));
}

type Point = { x: number; y: number; };

function part1(data: Point[]) {
  let answer = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      const width = Math.abs(data[i]!.x - data[j]!.x) + 1;
      const height = Math.abs(data[i]!.y - data[j]!.y) + 1;
      const area = width * height;
      answer = Math.max(answer, area);
    }
  }
  return answer;
}

function part2(data: Point[]) {
  let answer = 0;

  const sides = [];

  // it's a wild guess that this will always work
  let outside = "top";
  let previousSide = {
    x1: data[0]!.x - 0.5,
    x2: data[0]!.x - 0.5,
    y1: data[0]!.y - 0.5,
    y2: data[0]!.y - 0.5,
  };

  for (let i = 0; i < data.length; i++) {
    const p1 = data[i]!;
    const p2 = data[(i + 1) % data.length]!;
    const p3 = data[(i + 2) % data.length]!;
    const side = {
      x1: previousSide.x2,
      x2: p2.x,
      y1: previousSide.y2,
      y2: p2.y,
    };

    if (outside === "top") {
      side.y2 -= 0.5;
      if (p3.y < p2.y) {
        side.x2 -= 0.5;
        outside = "left";
      } else {
        side.x2 += 0.5;
        outside = "right"
      }
    }
    else if (outside === "right") {
      side.x2 += 0.5;
      if (p3.x < p2.x) {
        side.y2 += 0.5
        outside = "bottom";
      } else {
        side.y2 -= 0.5;
        outside = "top";
      }
    }
    else if (outside === "bottom") {
      side.y2 += 0.5;
      if (p3.y < p2.y) {
        side.x2 -= 0.5;
        outside = "left";
      } else {
        side.x2 += 0.5;
        outside = "right";
      }
    }
    else if (outside === "left") {
      side.x2 -= 0.5;
      if (p3.x > p2.x) {
        side.y2 -= 0.5;
        outside = "top";
      } else {
        side.y2 += 0.5;
        outside = "bottom";
      }
    }

    sides.push(side);
    previousSide = side;
  }

  const realSides = data.map((p1, i) => ({ x1: p1!.x, y1: p1!.y, x2: data[(i + 1) % data.length]!.x, y2: data[(i + 1) % data.length]!.y }))
  console.log(`<svg width="600" height="600" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">`);
  console.log(`<g stroke="red" stroke-width="0.25" stroke-linecap="straight">`);
  console.log(sides.map(s => `<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" />`).join("\n"))
  console.log("</g>");
  console.log(`<g stroke="black" stroke-width="0.25" stroke-linecap="straight">`);
  console.log(realSides.map(s => `<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" />`).join("\n"))
  console.log("</g>");
  console.log("</svg>");

  return answer;
}

describe(`${day}`, async () => {
  const input = await Bun.file(`src/${day}.txt`).text();

  // it("should solve part 1 (example 1)", () => {
  //   const result = part1(parseInput(example1));
  //   expect(result).toEqual(50);
  // });

  // it("should solve part 1", () => {
  //   const result = part1(parseInput(input));
  //   expect(result).toEqual(4755278336);
  // });

  it("should solve part 2 (example 1)", () => {
    const result = part2(parseInput(example1));
    expect(result).toEqual(24);
  });

  // it("should solve part 2", () => {
  //   const result = part2(parseInput(input));
  //   expect(result).toBeGreaterThan(164017360);
  //   expect(result).toEqual(-1);
  // });
});
