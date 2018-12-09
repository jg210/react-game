// @flow

export class Util {

  // Clamp value to be within the range [min, max].
  static clamp(value: number, min: number, max: number): number {
    if (value < min) {
      value = min;
    }
    if (value > max) {
      value = max;
    }
    return value;
  }

  // Asserts that a maybe-typed value is not null or undefined.
  static nonNull<T>(value: ?T): T {
    if (value === null) {
      throw new Error("null value.");
    }
    if (value === undefined) {
      throw new Error("undefined value.");
    }
    return value;
  }

}