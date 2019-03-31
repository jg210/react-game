// @flow
//
// (c) 2018-2019 Jeremy Green

import { isLastLevel } from '..';

type CreateLevelStateArgs = {
  +current: number,
  +last: number
};

function createLevelState(args: CreateLevelStateArgs) {
  const { current, last } = args;
  return {
    level: { current, last },
    debug: { wireframe: true },
    score: { current: 123 },
    screen: { current: "start" }
  }
}

it("is last level of one", () => {
  expect(isLastLevel(createLevelState({ current: 1, last: 1}))).toBe(true);
});

it("is last level of two", () => {
  expect(isLastLevel(createLevelState({ current: 2, last: 2}))).toBe(true);
});

it("is not last level", () => {
  expect(isLastLevel(createLevelState({ current: 7, last: 23}))).toBe(false);
});

// TODO tests that check recomputations field etc.