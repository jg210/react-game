// @flow
//
// (c) 2019-2024 Jeremy Green

import { debug } from '../debug'
import { toggleWireframeMode } from '../../actions';

function testSetWireframeMode(oldValue: boolean) {
  const state = debug({ wireframe: oldValue}, toggleWireframeMode()); // eslint-disable-line testing-library/no-debugging-utils
  expect(state.wireframe).toEqual(!oldValue);

}

it("tests TOGGLE_WIREFRAME_MODE", () => {
  testSetWireframeMode(false);
  testSetWireframeMode(true);
});