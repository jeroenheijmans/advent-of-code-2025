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
  let i = 0;

  while (edges.length > 0) {
    // console.log(data);
    if (i++ > 70) break;
    // console.log(data.filter(n => n.to.length === 0).length);

    for (const edge of edges) {
      const origins = data.filter(n => n.to.includes(edge.from));
      // console.log(`Considering ${origins.map(o => o.from).join(",")}`)
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

function part2(data: { from: string, to: string[] }[]) {
  let answer = 0;
  return answer;
}

describe(`${day}`, async () => {
  const input = await Bun.file(`src/${day}.txt`).text();

  it("should solve part 1 (example 1)", () => {
    const result = part1(parseInput(example1));
    expect(result).toEqual(5);
  }); 

  it("should solve part 1", () => {
    const result = part1(parseInput(input));
    expect(result).toEqual(-1);
  });

  // it("should solve part 2 (example 1)", () => {
  //   const result = part2(parseInput(example1));
  //   expect(result).toEqual(-1);
  // });

  // it("should solve part 2", () => {
  //   const result = part2(parseInput(input));
  //   expect(result).toEqual(-1);
  // });
});
