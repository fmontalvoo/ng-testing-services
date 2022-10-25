import { Calculator } from "./calculator";

describe("Test for Calculator class", () => {
  const calculator = new Calculator();

  describe("Multiplication", () => {
    it("Answere should be 49", () => {
      const ans = calculator.multiply(7, 7);
      expect(ans).toEqual(49);
    });
    it("Answere should be 0", () => {
      const ans = calculator.multiply(7, 0);
      expect(ans).toEqual(0);
    });
  });

  describe("Division", () => {
    it("Answere should be Infinity", () => {
      const ans = calculator.divide(7, 0);
      expect(ans).toEqual(Infinity);
    });
    it("Answere should be 2", () => {
      const ans = calculator.divide(48, 24);
      expect(ans).toEqual(2);
    });
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
