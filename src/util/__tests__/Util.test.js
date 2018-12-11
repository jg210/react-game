// @flow
import { Util } from '../Util';

describe("clamp()", () => {

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

  it("handles value == min == max", () => {
    [-Infinity, -1, 0, 1, Infinity].forEach((value: number) => {
      expect(Util.clamp(value, value, value)).toBe(value);
    });
  });

  it("has max < min", () => {
    expect(() => Util.clamp(1, 3, 2)).toThrow("max of 2 is less than min 3 (with value of 1)");
  });

});

describe("nonNull()", () => {

  it("accepts all non-null values", () => {
    // eslint-disable-next-line flowtype/no-weak-types
    [0, 1, "", "foo", [], {}, Infinity, -Infinity, Number.NaN].forEach((value: any) => {
      expect(Util.nonNull(value)).toBe(value);
    });
  });

  it("rejects null", () => {
    expect(() => Util.nonNull(null)).toThrow('null value.');
  });

  it("rejects null", () => {
    expect(() => Util.nonNull(undefined)).toThrow('undefined value.');
  });

});
