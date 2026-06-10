#!/usr/bin/env node
"use strict";

/**
 * Node.js CLI Calculator
 * Supports: addition, subtraction, multiplication, division
 * Operations:
 *  - add a b    => a + b
 *  - sub a b    => a - b
 *  - mul a b    => a * b
 *  - div a b    => a / b (errors on division by zero)
 *
 * Usage examples:
 *   node src/calculator.js add 2 3   # => 5
 *   node src/calculator.js sub 10 4  # => 6
 *   node src/calculator.js mul 6 7   # => 42
 *   node src/calculator.js div 8 2   # => 4
 */

function parseNumber(value) {
  const n = Number(value);
  if (Number.isNaN(n)) {
    throw new Error(`Invalid number: ${value}`);
  }
  return n;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    const err = new Error('Division by zero');
    err.code = 'DIV_ZERO';
    throw err;
  }
  return a / b;
}

function modulo(a, b) {
  if (b === 0) {
    const err = new Error('Modulo by zero');
    err.code = 'MOD_ZERO';
    throw err;
  }
  return a % b;
}

function power(a, b) {
  return Math.pow(a, b);
}

function squareRoot(n) {
  if (n < 0) {
    const err = new Error('Square root of negative number');
    err.code = 'NEG_SQRT';
    throw err;
  }
  return Math.sqrt(n);
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };

function usage(code = 0) {
  console.error('Usage: node src/calculator.js <op> <num1> [num2]');
  console.error('  <op>  : add | sub | mul | div | mod | pow | sqrt');
  console.error('  sqrt uses a single operand: node src/calculator.js sqrt 9');
  console.error('Examples:');
  console.error('  node src/calculator.js add 2 3');
  console.error('  node src/calculator.js sqrt 9');
  process.exit(code);
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2 || args.length > 3) {
    usage(1);
  }

  const [op, aRaw, bRaw] = args;
  let a, b;

  try {
    a = parseNumber(aRaw);
    if (op === 'sqrt' || op === 'sqrt') {
      // sqrt expects only one operand
      b = undefined;
    } else {
      if (typeof bRaw === 'undefined') {
        usage(1);
      }
      b = parseNumber(bRaw);
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }

  try {
    let result;
    switch (op) {
      case 'add':
        result = add(a, b);
        break;
      case 'sub':
      case 'subtract':
        result = subtract(a, b);
        break;
      case 'mul':
      case 'multiply':
        result = multiply(a, b);
        break;
      case 'div':
      case 'divide':
        result = divide(a, b);
        break;
      case 'mod':
      case 'modulo':
        result = modulo(a, b);
        break;
      case 'pow':
      case 'exp':
      case 'power':
        result = power(a, b);
        break;
      case 'sqrt':
      case 'squareroot':
      case 'squareroot':
        result = squareRoot(a);
        break;
      default:
        console.error(`Unknown operation: ${op}`);
        usage(1);
    }

    // Print result to stdout
    console.log(result);
    process.exit(0);
  } catch (err) {
    if (err && err.code === 'DIV_ZERO') {
      console.error('Error: Division by zero is not allowed.');
      process.exit(2);
    }
    if (err && err.code === 'MOD_ZERO') {
      console.error('Error: Modulo by zero is not allowed.');
      process.exit(3);
    }
    if (err && err.code === 'NEG_SQRT') {
      console.error('Error: Square root of negative number is not allowed.');
      process.exit(4);
    }
    console.error(`Error: ${err.message || String(err)}`);
    process.exit(1);
  }
}
