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

  // const realSides = data.map((p1, i) => ({ x1: p1!.x, y1: p1!.y, x2: data[(i + 1) % data.length]!.x, y2: data[(i + 1) % data.length]!.y }))
  // console.log(`<svg width="600" height="600" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">`);
  // console.log(`<g stroke="red" stroke-width="0.25" stroke-linecap="straight">`);
  // console.log(sides.map(s => `<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" />`).join("\n"))
  // console.log("</g>");
  // console.log(`<g stroke="black" stroke-width="0.25" stroke-linecap="straight">`);
  // console.log(realSides.map(s => `<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" />`).join("\n"))
  // console.log("</g>");
  // console.log("</svg>");

  const horizontals = sides.filter(s => s.y1 === s.y2);
  const verticals = sides.filter(s => s.x1 === s.x2);

  function crosses(horizontal, vertical) {
    return vertical.x1 >= Math.min(horizontal.x1, horizontal.x2) && vertical.x1 <= Math.max(horizontal.x1, horizontal.x2)
     && horizontal.y1 >= Math.min(vertical.y1, vertical.y2) && horizontal.y1 <= Math.max(vertical.y1, vertical.y2);
  }

  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      const p1 = data[i]!;
      const p2 = data[j]!;
      const area = (Math.abs(p1.x - p2.x) + 1) * (Math.abs(p1.y - p2.y) + 1);

      if (area < answer) continue;
      
      const minx = Math.min(p1.x, p2.x);
      const miny = Math.min(p1.y, p2.y);
      const maxx = Math.max(p1.x, p2.x);
      const maxy = Math.max(p1.y, p2.y);
      
      const left = {x1: minx, y1: miny, x2: minx, y2: maxy};
      const right = {x1: maxx, y1: miny, x2: maxx, y2: maxy};
      const top = {x1: minx, y1: miny, x2: maxx, y2: miny};
      const bot = {x1: minx, y1: maxy, x2: maxx, y2: maxy};

      const hors = horizontals.filter(h => crosses(h, left) || crosses(h, right));
      const vers = verticals.filter(v => crosses(v, top) || crosses(v, bot));

      if (hors.length > 0 || vers.length > 0) {
        // console.log(`Disqualifying ${p1.x},${p1.y} to ${p2.x},${p2.y} (area ${area})`);
        if (p1.x === 9 && p1.y === 5 && p2.x === 2 && p2.y === 3) {
          console.log(minx, miny)
          console.log(maxx, maxy)
        }
        continue;
      } 

      // console.log(`CHOOSING  ${p1.x},${p1.y} to ${p2.x},${p2.y} (area ${area})`);

      answer = area;
    }
  }

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

  it("should solve part 2", () => {
    const result = part2(parseInput(input));
    expect(result).toBeGreaterThan(164017360);
    expect(result).toBeLessThan(3013225560)
    expect(result).toEqual(-1);
  });
});
