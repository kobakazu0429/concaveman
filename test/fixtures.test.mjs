import { describe, test, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { concaveman } from "../index.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const points = JSON.parse(
  fs.readFileSync(
    path.resolve(path.join(__dirname, "fixtures", "points-1k.json"))
  )
);
const hull = JSON.parse(
  fs.readFileSync(
    path.resolve(path.join(__dirname, "fixtures", "points-1k-hull.json"))
  )
);
const hull2 = JSON.parse(
  fs.readFileSync(
    path.resolve(path.join(__dirname, "fixtures", "points-1k-hull2.json"))
  )
);

describe("fixtures", () => {
  test("default concave hull", () => {
    const result = concaveman(points);
    expect(result).toStrictEqual(hull);
  });

  test("tuned concave hull", () => {
    const result = concaveman(points, 3, 0.01);
    expect(result).toStrictEqual(hull2);
  });
});
