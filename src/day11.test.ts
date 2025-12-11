import { describe, expect, it } from "bun:test";

const day = "day11";

const example1 = `
aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`;

const example2 = `
svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`;

function parseInput(input: string) {
  return input
    .split(/\r?\n/gi)
    .filter((x) => !!x)
    .map((x) => x.split(": "))
    .map(parts => ({
      from: parts[0]!,
      to: parts[1]?.split(" ")!,
      part1: 0,
    }));
}

type Data = { from: string, to: string[], part1: number };

function part1(data: Data[]) {
  let edges = [{ from: "out", to: [] as string[], part1: 1 }];

  while (edges.length > 0) {
    for (const edge of edges) {
      const origins = data.filter(n => n.to.includes(edge.from));
      for (const origin of origins) {
        origin.to = origin.to.filter(key => key !== edge.from)
        origin.part1 += edge.part1;
      }
    }
    edges = data.filter(n => n.to.length === 0);
    if (data.every(n => n.to.length === 0)) break;
  }

  return data.find(n => n.from === "you")?.part1;
}

function findPath(data: Data[], from: string, to: string) {
  let edges = [{ from: to, to: [] as string[], part1: 1 }];
  let i = 0;
  const maxIter = 5000;
  // console.log(from, "=>", to);
  
  while (edges.length > 0) {
    if (i++ > maxIter) break;
    let isBlocking = true;
    for (const edge of edges) {
      const origins = data.filter(n => n.to.includes(edge.from));
      for (const origin of origins) {
        origin.to = origin.to.filter(key => key !== edge.from)
        origin.part1 += edge.part1;
        isBlocking = false;
      }
    }
    edges = data.filter(n => n.to.length === 0);
    if (data.every(n => n.to.length === 0)) break;

    if (isBlocking) {
      // Hack incoming, and I don't even know exactly why it works
      // or if it always works. But We'll just sort and pick the
      // smallest possible edge to prune, hoping the graph then
      // kills off the right branch to get to the right answer.
      const edges = [
        data
          .filter(n => n.part1 > 0)
          .toSorted((a, b) => a.to.length - b.to.length)
          .map(n => n.to)
          .flat()
          [0]
      ];
      while (edges.length > 0) {
        const next = edges.pop();
        data.forEach(n => n.to = n.to.filter(x => x !== next))
        data.find(n => n.from === next)?.to.forEach(x => edges.push(x));
        data = data.filter(n => n.from !== next);
      }
    }
  }

  const result = data.find(n => n.from === from)?.part1;

  // if (from === "fft" && to === "dac") console.log(data)

  return result! || 0;
}

const clone = (data: Data[]) => JSON.parse(JSON.stringify(data)) as Data[];

function part2(data: Data[]) {
  const dac_to_out = findPath(clone(data), "dac", "out");
  const fft_to_out = findPath(clone(data), "fft", "out");
  const fft_to_dac = findPath(clone(data), "fft", "dac");
  const dac_to_fft = findPath(clone(data), "dac", "fft");
  const svr_to_dac = findPath(clone(data), "svr", "dac");
  const svr_to_fft = findPath(clone(data), "svr", "fft");

  const route1 = svr_to_dac * dac_to_fft * fft_to_out;
  const route2 = svr_to_fft * fft_to_dac * dac_to_out;

  // console.log(route1)
  // console.log(route2)

  return route1 + route2;
}

describe(`${day}`, async () => {
  const input = await Bun.file(`src/${day}.txt`).text();

  it("should solve part 1 (example 1)", () => {
    const result = part1(parseInput(example1));
    expect(result).toEqual(5);
  }); 

  it("should solve part 1", () => {
    const result = part1(parseInput(input));
    expect(result).toEqual(764);
  });

  it("should solve part 2 (example 2)", () => {
    const result = part2(parseInput(example2));
    expect(result).toEqual(2);
  });

  it("should solve part 2", () => {
    const result = part2(parseInput(input));
    expect(result).toBeGreaterThan(1788386808600);
    expect(result).toBeGreaterThan(29951400247740);
    expect(result).toEqual(462444153119850);
  });
});
