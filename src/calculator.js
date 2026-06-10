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

module.exports = { add, subtract, multiply, divide };

function usage(code = 0) {
  console.error('Usage: node src/calculator.js <op> <num1> <num2>');
  console.error('  <op>  : add | sub | mul | div');
  console.error('Examples:');
  console.error('  node src/calculator.js add 2 3');
  process.exit(code);
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length !== 3) {
    usage(1);
  }

  const [op, aRaw, bRaw] = args;
  let a, b;

  try {
    a = parseNumber(aRaw);
    b = parseNumber(bRaw);
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
    console.error(`Error: ${err.message || String(err)}`);
    process.exit(1);
  }
}
