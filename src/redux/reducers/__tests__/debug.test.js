// @flow
//
// (c) 2019 Jeremy Green

import { debug } from '../debug'
import { toggleWireframeMode } from '../../actions';

function testSetWireframeMode(oldValue: boolean) {
  const state = debug({ wireframe: oldValue}, toggleWireframeMode());
  expect(state.wireframe).toEqual(!oldValue);

}

it("tests TOGGLE_WIREFRAME_MODE", () => {
  testSetWireframeMode(false);
  testSetWireframeMode(true);
});