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
      switch (operator) {
        case "-":
          return -1 * rightValue;
        case "!":
          return !rightValue;
      }
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

function astToPrefix(ast) {
  if ("op" in ast) {
    if ("left" in ast) {
      const opString = ast.op === "^" ? "pow" : ast.op;
      return `(${opString} ${astToPrefix(ast.left)} ${astToPrefix(ast.right)})`;
    } else {
      const opToStr = {
        "-": "neg",
        "!": "not",
      };
      const opString = opToStr[ast.op] || ast.op;
      return `(${opString} ${astToPrefix(ast.right)})`;
    }
  } else if ("value" in ast) {
    return ast.value.toString();
  } else {
    throw new Error("Invalid AST node");
  }
}

module.exports = { evaluateAST, astToPrefix };
