import { getuuid } from "../uuid";

describe("getuuid test", () => {
  test("when called it returns a string", () => {
    const uuid = getuuid();
    expect(typeof uuid).toBe("string");
  });
});
