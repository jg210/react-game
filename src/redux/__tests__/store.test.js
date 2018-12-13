import  { storeFactory } from '../store';

it("has expected initial state", () => {
  const store = storeFactory();
  const state = store.getState();
  expect(state).toEqual({ 
    level: {
      current: 1,
      last: 5
    },
    score: {
      current: 0
    },
    screen: {
      current: "start"
    }
  });
});