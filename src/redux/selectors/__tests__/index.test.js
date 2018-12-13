import { isLastLevel } from '..';

it("is last level of one", () => {
  expect(isLastLevel({ level : { current: 1, last: 1}})).toBe(true);
});

it("is last level of two", () => {
  expect(isLastLevel({ level : { current: 2, last: 2}})).toBe(true);
});

it("is not last level", () => {
  expect(isLastLevel({ level : { current: 7, last: 23}})).toBe(false);
});