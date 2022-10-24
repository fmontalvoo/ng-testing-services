import { Calculator } from "./calculator";

describe("Test for Calculator class", () => {
  const calculator = new Calculator();

  it("Answere should be 49", () => {
    const ans = calculator.multiply(7, 7);
    expect(ans).toEqual(49);
  });

  it("Answere should be Infinity", () => {
    const ans = calculator.divide(7, 0);
    expect(ans).toEqual(Infinity);
  });

  it("Test matchers", () => {
    let name;
    let nombre = "frank";

    expect(name).toBeUndefined();
    expect(nombre).toBeDefined();

    expect(2 + 4 === 7).toBeFalsy();
    expect(2 + 5 === 7).toBeTruthy();

    expect([1, 2, 3]).toContain(2);
    expect('0123456789').toMatch(/\d/);

  });
});
