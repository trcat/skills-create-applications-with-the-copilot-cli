#!/usr/bin/env node

const { calculate } = require("./calculator");

const SUPPORTED_OPERATIONS = ["add", "subtract", "multiply", "divide"];

function printUsage() {
  console.error("Usage: node src/index.js <operation> <left> <right>");
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
  if (args.length !== 3) {
    printUsage();
    return 1;
  }

  const [operation, leftOperand, rightOperand] = args;

  if (!SUPPORTED_OPERATIONS.includes(operation)) {
    printUsage();
    return 1;
  }

  try {
    const left = parseNumber(leftOperand);
    const right = parseNumber(rightOperand);
    const result = calculate(operation, left, right);

    console.log(result);
    return 0;
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
