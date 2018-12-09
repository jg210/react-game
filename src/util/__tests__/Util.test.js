import { Util } from '../Util'

describe("clamp", () => {

  it("doesn't change in-range value", () => {
    expect(Util.clamp(2, 1, 3)).toBe(2);
  });

  it("doesn't change min value", () => {
    expect(Util.clamp(1, 1, 3)).toBe(1);
  });

  it("doesn't change max value", () => {
    expect(Util.clamp(3, 1, 3)).toBe(3);
  });

  it("clamps to min value", () => {
    expect(Util.clamp(0, 1, 3)).toBe(1);
  });

  it("clamps to max value", () => {
    expect(Util.clamp(4, 1, 3)).toBe(3);
  });

  it("handles NaN", () => {
    expect(Util.clamp(Number.NaN, 1, 3)).toBe(Number.NaN);
  });
  it("handles Infinity value", () => {
    expect(Util.clamp(Infinity, 1, 3)).toBe(3);
  });

  it("handles -Infinity value", () => {
    expect(Util.clamp(-Infinity, 1, 3)).toBe(1);
  });

  it("handles Infinity value with Infinity max", () => {
    expect(Util.clamp(Infinity, 1, Infinity)).toBe(Infinity);
  });

  it("handles -Infinity value with -Infinity min", () => {
    expect(Util.clamp(-Infinity, -Infinity, 3)).toBe(-Infinity);
  });

});