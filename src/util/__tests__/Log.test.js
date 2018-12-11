// @flow
import { Log } from "../Log";

describe("logging", () => {

  it("logs string at info level", () => {
    jest.spyOn(console, "log");
    Log.info("foo");
    expect(console.log).toBeCalled();
  });

  it("logs function at info level", () => {
    jest.spyOn(console, "log");
    Log.info(() => "foo");
    expect(console.log).toBeCalled();
  });

  it("logs string at debug level", () => {
    jest.spyOn(console, "log");
    Log.debug("bar");
    expect(console.log).toBeCalled();
  });

  it("logs function at debug level", () => {
    jest.spyOn(console, "log");
    Log.debug(() => "bar");
    expect(console.log).toBeCalled();
  });

});
