import { describe, expect, it } from "bun:test";

const day = "day08";

const example1 = `
162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;

function parseInput(input: string) {
  return input
    .split(/\r?\n/gi)
    .filter((x) => !!x)
    .map((x) => x.split(",").map(n => parseInt(n)))
    .map((coords, y) => ({
      key: `${coords[0]!};${coords[1]!};${coords[2]!}`,
      coords,
      y,
    } as Point));
}

type Point = {
  key: string;
  coords: [number, number, number];
  y: number;
};

const getDistanceBetween = (a: Point, b: Point): number => 
  Math.sqrt(
      Math.pow(a.coords[0] - b.coords[0], 2)
    + Math.pow(a.coords[1] - b.coords[1], 2)
    + Math.pow(a.coords[2] - b.coords[2], 2)
  );

function part1(data: Point[], maxPairs = 1000) {
  const distances = [] as { p1: Point, p2: Point, distance: number }[];
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      distances.push({
        p1: data[i]!,
        p2: data[j]!,
        distance: getDistanceBetween(data[i]!, data[j]!),
      });
    }
  }
  distances.sort((a, b) => a.distance - b.distance);

  const map = data.reduce((acc, next) => {
    acc[next.key] = new Set<string>([next.key]);
    return acc;
  }, { } as Record<string, Set<string>>)

  for (let i = 0; i < maxPairs; i++) {
    if (i > distances.length - 1) break;
    const {p1, p2} = distances[i]!;
    const union = new Set([...map[p1.key]!, ...map[p2.key]!]);
    for (const key of union) {
      map[key] = union;
    }
  }

  const circuits = [...new Set(Object.values(map))].map(x => x.size).toSorted((a, b) => a - b);
  return circuits.slice(-3).reduce((a, b) => a * b, 1 as number);
}

function part2(data: Point[]) {
  const distances = [] as { p1: Point, p2: Point, distance: number }[];
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      distances.push({
        p1: data[i]!,
        p2: data[j]!,
        distance: getDistanceBetween(data[i]!, data[j]!),
      });
    }
  }
  distances.sort((a, b) => a.distance - b.distance);

  const map = data.reduce((acc, next) => {
    acc[next.key] = new Set<string>([next.key]);
    return acc;
  }, { } as Record<string, Set<string>>)

  for (let i = 0; i < distances.length; i++) {
    if (i > distances.length - 1) break;
    const {p1, p2} = distances[i]!;
    const union = new Set([...map[p1.key]!, ...map[p2.key]!]);
    for (const key of union) {
      map[key] = union;
    }
    if (union.size === data.length) {
      return p1.coords[0] * p2.coords[0];
    }
  }

  const circuits = [...new Set(Object.values(map))].map(x => x.size).toSorted((a, b) => a - b);
  return circuits.slice(-3).reduce((a, b) => a * b, 1 as number);
}

describe(`${day}`, async () => {
  const input = await Bun.file(`src/${day}.txt`).text();

  it("should solve part 1 (example 1)", () => {
    const result = part1(parseInput(example1), 10);
    expect(result).toEqual(40);
  });

  it("should solve part 1", () => {
    const result = part1(parseInput(input));
    expect(result).toBeGreaterThan(729); // current solution
    expect(result).toBeGreaterThan(810); // wild guess with 10*9*9
    expect(result).toEqual(122636);
  });

  it("should solve part 2 (example 1)", () => {
    const result = part2(parseInput(example1));
    expect(result).toEqual(25272);
  });

  it("should solve part 2", () => {
    const result = part2(parseInput(input));
    expect(result).toEqual(9271575747);
  });
});
