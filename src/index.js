#!/usr/bin/env node

const { calculate } = require("./calculator");

const BINARY_OPERATIONS = ["add", "subtract", "multiply", "divide", "modulo", "power"];
const UNARY_OPERATIONS = ["squareRoot"];
const SUPPORTED_OPERATIONS = [...BINARY_OPERATIONS, ...UNARY_OPERATIONS];

function printUsage() {
  console.error("Usage: node src/index.js <operation> <left> <right>");
  console.error("Usage: node src/index.js squareRoot <value>");
  console.error(`Supported operations: ${SUPPORTED_OPERATIONS.join(", ")}`);
}

function parseNumber(value) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new Error("Both operands must be valid numbers.");
  }

  return parsed;
}

function main(args) {
  const [operation, ...operands] = args;

  if (!SUPPORTED_OPERATIONS.includes(operation)) {
    printUsage();
    return 1;
  }

  try {
    if (BINARY_OPERATIONS.includes(operation)) {
      if (operands.length !== 2) {
        printUsage();
        return 1;
      }

      const left = parseNumber(operands[0]);
      const right = parseNumber(operands[1]);
      const result = calculate(operation, left, right);

      console.log(result);
      return 0;
    }

    if (UNARY_OPERATIONS.includes(operation)) {
      if (operands.length !== 1) {
        printUsage();
        return 1;
      }

      const value = parseNumber(operands[0]);
      const result = calculate(operation, value);

      console.log(result);
      return 0;
    }

    printUsage();
    return 1;
  } catch (error) {
    console.error(error.message);

    if (error.message === "Both operands must be valid numbers.") {
      printUsage();
    }

    return 1;
  }
}

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}

module.exports = {
  main,
};
