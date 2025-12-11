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

function part1(data: { from: string, to: string[], part1: number }[]) {
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

function part2(data: { from: string, to: string[], part1: number }[]) {
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

  return data.find(n => n.from === "svr")?.part1;
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

  // it("should solve part 2", () => {
  //   const result = part2(parseInput(input));
  //   expect(result).toEqual(-1);
  // });
});
