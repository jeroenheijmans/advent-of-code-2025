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

  const sides = data.map((p1, i) => {
    const p2 = data[i === data.length - 1 ? 0 : i + 1];
    return {
      x1: Math.min(p1!.x, p2!.x),
      x2: Math.max(p1!.x, p2!.x),
      y1: Math.min(p1!.y, p2!.y),
      y2: Math.max(p1!.y, p2!.y),
      isHorizontal: p1!.y === p2!.y,
      isVertical: p1!.x === p2!.x,
    };
  });

  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      const width = Math.abs(data[i]!.x - data[j]!.x) + 1;
      const height = Math.abs(data[i]!.y - data[j]!.y) + 1;
      const area = width * height;

      const fromx = Math.min(data[i]!.x, data[j]!.x);
      const fromy = Math.min(data[i]!.y, data[j]!.y);
      const tox = Math.max(data[i]!.x, data[j]!.x);
      const toy = Math.max(data[i]!.y, data[j]!.y);

      let isCorrectlyEnclosed = true;
      for (let x = fromx; x <= tox; x++) {
        // Check if the vertical line fits in any box
        const relevantSides = sides.filter(s => s.isHorizontal && x >= s.x1 && x <= s.x2);

        if (relevantSides.some(s => s.y1 < toy && s.y1 > fromy)) {
          if (data[j]!.x === 2 && data[j]!.y === 3)
            console.log(area.toFixed(0).padStart(3, " "), "Disqualifying at", x, "cause", `${data[i]!.x},${data[i]!.y}`, "to", `${data[j]!.x},${data[j]!.y}`, 'because', relevantSides.filter(s => s.y1 < toy && s.y1 > fromy));
          isCorrectlyEnclosed = false;
          break;
        }

        // for (let y = fromy + 1; y <= toy; y++) {
        //   const side = relevantSides.find(s => s.y1 === y);
        //   if (side && y < toy) {
        //     console.log(area, "Disqualifying", `${data[i]!.x},${data[i]!.y}`, "to", `${data[j]!.x},${data[j]!.y}`, 'while at', x, y);
        //     // console.log("Disqualifying", `${data[i]!.x},${data[i]!.y}`, "to", `${data[j]!.x},${data[j]!.y}`, 'while at', x, y, 'based on', side);
        //     isCorrectlyEnclosed = false;
        //     break;
        //   }
        // }
        // if (!isCorrectlyEnclosed) break;
      }
      if (!isCorrectlyEnclosed) continue;
      
      console.log(area.toFixed(0).padStart(3, " "), "Qualified!   ", `${data[i]!.x},${data[i]!.y}`, "to", `${data[j]!.x},${data[j]!.y}`);

      answer = Math.max(answer, area);
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

  // it("should solve part 2", () => {
  //   const result = part2(parseInput(input));
  //   expect(result).toBeGreaterThan(164017360);
  //   expect(result).toEqual(-1);
  // });
});
