// Supported operations: addition, subtraction, multiplication, division,
// modulo, exponentiation (power), and square root.
function divide(left, right) {
  if (right === 0) {
    throw new Error("Division by zero is not allowed.");
  }

  return left / right;
}

function modulo(left, right) {
  if (right === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }

  return left % right;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(value) {
  if (value < 0) {
    throw new Error("Square root of a negative number is not allowed.");
  }

  return Math.sqrt(value);
}

const OPERATIONS = {
  add: (left, right) => left + right,
  subtract: (left, right) => left - right,
  multiply: (left, right) => left * right,
  divide,
  modulo,
  power,
  squareRoot,
};

function calculate(operation, left, right) {
  const handler = OPERATIONS[operation];

  if (!handler) {
    throw new Error(`Unsupported operation: ${operation}`);
  }

  return handler(left, right);
}

module.exports = {
  OPERATIONS,
  calculate,
  divide,
  modulo,
  power,
  squareRoot,
};
