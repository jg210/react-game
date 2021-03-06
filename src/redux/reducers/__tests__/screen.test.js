// @flow
//
// (c) 2019 Jeremy Green

import { screen } from '../screen'
import { screenChange } from '../../actions';

it("tests screen reducer", () => {
  const state = screen({ current: "game"}, screenChange("gameComplete"));
  expect(state).toEqual({ current: "gameComplete"});
});