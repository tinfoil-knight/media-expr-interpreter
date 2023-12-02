const fs = require("fs");
const ohm = require("ohm-js");
const contents = fs.readFileSync("grammar.ohm", "utf-8");
const grammar = ohm.grammar(contents);
const astActions = require("./ast");

const semantics = grammar.createSemantics();

semantics.addOperation("tree", astActions);

const userInput = "-(1+2)^3";
const m = grammar.match(userInput);
if (m.succeeded()) {
  const adapter = semantics(m);
  const util = require("util");
  console.log(
    util.inspect(adapter.tree(), {
      showHidden: false,
      depth: null,
      colors: true,
    })
  );
  const jsonS = JSON.stringify(adapter.tree(), null, 2);
  const treet = JSON.parse(jsonS);
  console.log("AST", jsonS);
  console.log(evaluateAST(treet.body));
} else {
  console.log("Invalid");
}

function evaluateAST(ast) {
  if ("value" in ast) {
    return ast.value;
  } else if ("op" in ast) {
    const operator = ast.op;
    const isUnary = operator == "-" && !ast.left;

    const leftValue = !isUnary ? evaluateAST(ast.left) : undefined;
    const rightValue = evaluateAST(ast.right);

    // TODO: check if both leftValue & rightValue is a number
    // for arithmetic ops, comparison ops

    if (isUnary) {
      return -1 * rightValue;
    }
    switch (operator) {
      // Logical
      // TODO: right shouldn't be getting evaluated in cases of or, and
      case "or":
        return leftValue || rightValue;
      case "and":
        return leftValue && rightValue;
      // Comparison
      case "==":
        return leftValue == rightValue;
      case "!=":
        return leftValue != rightValue;
      case ">":
        return leftValue > rightValue;
      case ">=":
        return leftValue >= rightValue;
      case "<":
        return leftValue < rightValue;
      case "<=":
        return leftValue < rightValue;
      // Arithmetic
      case "^":
        return Math.pow(leftValue, rightValue);
      case "/":
        return leftValue / rightValue;
      case "*":
        return leftValue * rightValue;
      case "%":
        return leftValue % rightValue;
      case "+":
        return leftValue + rightValue;
      case "-":
        return leftValue - rightValue;

      default:
        throw new Error(`Unknown operator: ${operator}`);
    }
  } else {
    throw new Error("Invalid AST format");
  }
}
