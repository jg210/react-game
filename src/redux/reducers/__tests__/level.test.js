// @flow

import { level } from '../level'
import { levelChange } from '../../actions';

it("goes to specific level", () => {
  const state = level({ current: 1, last: 3}, levelChange(2));
  expect(state).toEqual({ current: 2, last: 3});
});

it("goes to last level", () => {
  const state = level({ current: 2, last: 3}, levelChange());
  expect(state).toEqual({ current: 3, last: 3});
});

it("goes to last level with explicit use of null", () => {
  const state = level({ current: 2, last: 3}, levelChange(null));
  expect(state).toEqual({ current: 3, last: 3});
});

it("throws exception if try to go to next level from last level", () => {
  expect(() => {
    level({ current: 3, last: 3}, levelChange())
  }).toThrow("level out of range: 4");
});

it("throws exception if try to go to next level from last level with explicit use of null", () => {
  expect(() => {
    level({ current: 3, last: 3}, levelChange(null))
  }).toThrow("level out of range: 4");
});

it("throws exception if try to go to level 0", () => {
  expect(() => {
    level({ current: 1, last: 3}, levelChange(0))
  }).toThrow("level out of range: 0");
});

it("throws exception if try to go to too high a level", () => {
  expect(() => {
    level({ current: 1, last: 3}, levelChange(4))
  }).toThrow("level out of range: 4");
});