const { add, subtract, multiply, divide, modulo, power, squareRoot } = require('../calculator');

describe('Calculator functions (basic operations and extras)', () => {
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

  test('modulo: 10 % 3 = 1', () => {
    expect(modulo(10, 3)).toBe(1);
  });

  test('modulo: 5 % 2 = 1 (image example)', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('modulo by zero throws MOD_ZERO code', () => {
    expect(() => modulo(5, 0)).toThrow(/Modulo by zero/);
    try {
      modulo(5, 0);
    } catch (err) {
      expect(err.code).toBe('MOD_ZERO');
    }
  });

  test('power: 2 ^ 3 = 8 and 9 ^ 0.5 = 3', () => {
    expect(power(2, 3)).toBe(8);
    expect(power(9, 0.5)).toBeCloseTo(3);
  });

  test('power: 2 ^ 3 (image example)', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('squareRoot: 9 -> 3', () => {
    expect(squareRoot(9)).toBe(3);
  });

  test('squareRoot: 16 -> 4 (image example)', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('squareRoot negative throws NEG_SQRT code', () => {
    expect(() => squareRoot(-4)).toThrow(/Square root of negative number/);
    try {
      squareRoot(-4);
    } catch (err) {
      expect(err.code).toBe('NEG_SQRT');
    }
  });

  test('supports negative numbers and decimals', () => {
    expect(add(-1, 0.5)).toBeCloseTo(-0.5);
    expect(multiply(-2.5, 4)).toBeCloseTo(-10);
  });
});
