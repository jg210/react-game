// @flow

import { mapStateToProps } from '..';

it("has mapStateToProps function", () => {
  const props = mapStateToProps({screen: { current: "game"}});
  expect(props).toEqual({screen: "game"});
});