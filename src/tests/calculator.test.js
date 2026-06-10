const { add, subtract, multiply, divide } = require('../calculator');

describe('Calculator functions (basic operations)', () => {
  test('add: 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtract: 10 - 4 = 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('multiply: 45 * 2 = 90', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('divide: 20 / 5 = 4', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('division by zero throws with DIV_ZERO code', () => {
    expect(() => divide(1, 0)).toThrow(/Division by zero/);
    try {
      divide(1, 0);
    } catch (err) {
      expect(err.code).toBe('DIV_ZERO');
    }
  });

  test('supports negative numbers and decimals', () => {
    expect(add(-1, 0.5)).toBeCloseTo(-0.5);
    expect(multiply(-2.5, 4)).toBeCloseTo(-10);
  });
});
