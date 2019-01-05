// @flow
//
// (c) 2019 Jeremy Green

import { score } from '../score'
import { scoreUpdate } from '../../actions';

it("tests score reducer", () => {
  const state = score({ current: 3}, scoreUpdate(2));
  expect(state).toEqual({ current: 5});
});