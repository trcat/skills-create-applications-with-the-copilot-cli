const test = require("node:test");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const path = require("node:path");

const { calculate } = require("../calculator");

const cliPath = path.join(__dirname, "..", "index.js");

test("adds positive integers from the image example", () => {
  assert.equal(calculate("add", 2, 3), 5);
});

test("adds negative and positive numbers", () => {
  assert.equal(calculate("add", -2, 5), 3);
});

test("subtracts positive integers from the image example", () => {
  assert.equal(calculate("subtract", 10, 4), 6);
});

test("subtracts to a negative result", () => {
  assert.equal(calculate("subtract", 4, 10), -6);
});

test("multiplies positive integers from the image example", () => {
  assert.equal(calculate("multiply", 45, 2), 90);
});

test("multiplies by zero", () => {
  assert.equal(calculate("multiply", 45, 0), 0);
});

test("divides positive integers from the image example", () => {
  assert.equal(calculate("divide", 20, 5), 4);
});

test("divides decimal values", () => {
  assert.equal(calculate("divide", 7.5, 2.5), 3);
});

test("rejects division by zero", () => {
  assert.throws(() => calculate("divide", 20, 0), {
    message: "Division by zero is not allowed.",
  });
});

test("rejects unsupported operations", () => {
  assert.throws(() => calculate("cube", 2, 3), {
    message: "Unsupported operation: cube",
  });
});

test("computes modulo for positive integers", () => {
  assert.equal(calculate("modulo", 10, 3), 1);
});

test("computes modulo from the extended-operations image example", () => {
  assert.equal(calculate("modulo", 5, 2), 1);
});

test("rejects modulo by zero", () => {
  assert.throws(() => calculate("modulo", 10, 0), {
    message: "Modulo by zero is not allowed.",
  });
});

test("computes powers for integer operands", () => {
  assert.equal(calculate("power", 2, 4), 16);
});

test("computes powers from the extended-operations image example", () => {
  assert.equal(calculate("power", 2, 3), 8);
});

test("computes square roots with one operand", () => {
  assert.equal(calculate("squareRoot", 9), 3);
});

test("computes square roots from the extended-operations image example", () => {
  assert.equal(calculate("squareRoot", 16), 4);
});

test("rejects square root of a negative number", () => {
  assert.throws(() => calculate("squareRoot", -9), {
    message: "Square root of a negative number is not allowed.",
  });
});

test("prints result for valid cli input", () => {
  const result = spawnSync("node", [cliPath, "multiply", "45", "2"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 0);
  assert.equal(result.stdout.trim(), "90");
  assert.equal(result.stderr.trim(), "");
});

test("prints usage for invalid operation", () => {
  const result = spawnSync("node", [cliPath, "cube", "2", "3"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Supported operations: add, subtract, multiply, divide/);
});

test("prints usage for non-numeric operands", () => {
  const result = spawnSync("node", [cliPath, "add", "two", "3"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Both operands must be valid numbers\./);
});

test("prints error for division by zero in cli", () => {
  const result = spawnSync("node", [cliPath, "divide", "20", "0"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Division by zero is not allowed\./);
});

test("prints result for modulo cli input", () => {
  const result = spawnSync("node", [cliPath, "modulo", "10", "3"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 0);
  assert.equal(result.stdout.trim(), "1");
});

test("prints result for modulo image example in cli", () => {
  const result = spawnSync("node", [cliPath, "modulo", "5", "2"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 0);
  assert.equal(result.stdout.trim(), "1");
});

test("prints result for power cli input", () => {
  const result = spawnSync("node", [cliPath, "power", "2", "4"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 0);
  assert.equal(result.stdout.trim(), "16");
});

test("prints result for power image example in cli", () => {
  const result = spawnSync("node", [cliPath, "power", "2", "3"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 0);
  assert.equal(result.stdout.trim(), "8");
});

test("prints result for squareRoot cli input", () => {
  const result = spawnSync("node", [cliPath, "squareRoot", "9"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 0);
  assert.equal(result.stdout.trim(), "3");
});

test("prints result for squareRoot image example in cli", () => {
  const result = spawnSync("node", [cliPath, "squareRoot", "16"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 0);
  assert.equal(result.stdout.trim(), "4");
});

test("prints error for negative squareRoot cli input", () => {
  const result = spawnSync("node", [cliPath, "squareRoot", "-9"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Square root of a negative number is not allowed\./);
});

test("prints error for modulo by zero in cli", () => {
  const result = spawnSync("node", [cliPath, "modulo", "5", "0"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Modulo by zero is not allowed\./);
});

test("prints usage when operands are missing", () => {
  const result = spawnSync("node", [cliPath, "add", "2"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Usage: node src\/index\.js <operation> <left> <right>/);
});

test("prints usage for uppercase operations", () => {
  const result = spawnSync("node", [cliPath, "ADD", "2", "3"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Supported operations: add, subtract, multiply, divide/);
});

test("rejects infinity as an operand", () => {
  const result = spawnSync("node", [cliPath, "add", "Infinity", "3"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.match(result.stderr, /Both operands must be valid numbers\./);
});
