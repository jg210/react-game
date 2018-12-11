// @flow
import { Log } from "../Log";

describe("logging", () => {

  const FAKE_DATE = new Date("2018-12-11T12:34:00z");
  const T = FAKE_DATE.toISOString();
  global.Date = jest.fn(() => FAKE_DATE);

  it("logs string at info level", () => {
    jest.spyOn(console, "log");
    Log.info("foo");
    expect(console.log).toBeCalledWith(`${T}  INFO foo`);
  });

  it("logs function at info level", () => {
    jest.spyOn(console, "log");
    Log.info(() => "foo");
    expect(console.log).toBeCalledWith(`${T}  INFO foo`);
  });

  it("logs string at debug level", () => {
    jest.spyOn(console, "log");
    Log.debug("bar");
    expect(console.log).toBeCalledWith(`${T} DEBUG bar`);
  });

  it("logs function at debug level", () => {
    jest.spyOn(console, "log");
    Log.debug(() => "bar");
    expect(console.log).toBeCalledWith(`${T} DEBUG bar`);
  });

});
