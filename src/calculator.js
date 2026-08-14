// Supported operations: addition, subtraction, multiplication, division.
const OPERATIONS = {
  add: (left, right) => left + right,
  subtract: (left, right) => left - right,
  multiply: (left, right) => left * right,
  divide: (left, right) => {
    if (right === 0) {
      throw new Error("Division by zero is not allowed.");
    }

    return left / right;
  },
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
};
