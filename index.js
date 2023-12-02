const fs = require("fs");
const ohm = require("ohm-js");
const contents = fs.readFileSync("grammar.ohm", "utf-8");
const grammar = ohm.grammar(contents);
const astActions = require("./ast");

const semantics = grammar.createSemantics();

semantics.addOperation("tree", astActions);

const userInput = "0 or 1+2^3 or 5";
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
    const leftValue = evaluateAST(ast.left);
    const rightValue = evaluateAST(ast.right);
    const operator = ast.op;

    switch (operator) {
      case "+":
        return leftValue + rightValue;
      case "-":
        return leftValue - rightValue;
      case "*":
        return leftValue * rightValue;
      case "/":
        return leftValue / rightValue;
      case "^":
        return Math.pow(leftValue, rightValue);
      // TODO: right shouldn't be getting evaluated in cases of or, and
      case "or":
        return leftValue || rightValue;
      case "and":
        return leftValue && rightValue
      default:
        throw new Error(`Unknown operator: ${operator}`);
    }
  } else {
    throw new Error("Invalid AST format");
  }
}
