// @flow
//
// (c) 2019 Jeremy Green

import { debug } from '../debug'
import { setWireframeMode } from '../../actions';

function testSetWireframeMode(oldValue: boolean, newValue: boolean) {
  const state = debug({ wireframe: oldValue}, setWireframeMode(newValue));
  expect(state.wireframe).toEqual(newValue);

}

it("tests SET_WIREFRAME_MODE", () => {
  testSetWireframeMode(false, false);
  testSetWireframeMode(false, true);
  testSetWireframeMode(true, false);
  testSetWireframeMode(true, true);
});