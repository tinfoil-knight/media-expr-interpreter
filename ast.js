const associativity = { "+": "L", "-": "L", "*": "L", "/": "L", "^": "R" };

function binaryExpression(first, ops, rest) {
  if (associativity[ops[0]] === "L") {
    const applyLeft = (x, y) => new BinaryExpression(x, ops.shift(), y);
    return [first, ...rest].reduce(applyLeft);
  } else {
    const applyRight = (x, y) => new BinaryExpression(y, ops.pop(), x);
    return [first, ...rest].reduceRight(applyRight);
  }
}

class Program {
  constructor(expression) {
    this.body = expression;
  }
  toString() {
    return this.body.toString();
  }
}

class BinaryExpression {
  constructor(left, op, right) {
    this.left = left;
    this.op = op;
    this.right = right;
  }
  toString() {
    return `(${this.op} ${this.left} ${this.right})`;
  }
}

class IntegerLiteral {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return `${this.value}`;
  }
}

class Identifier {
  constructor(name) {
    this.name = name;
  }
  toString() {
    return this.name;
  }
}

module.exports = {
  Program(body) {
    return new Program(body.tree());
  },
  Exp(expression) {
    return expression.tree();
  },
  LogicOr(first, ops, rest) {
    const ret = binaryExpression(
      first.tree(),
      ops.children.map((c) => c.tree()),
      rest.children.map((c) => c.tree())
    );
    return ret;
  },
  LogicAnd(first, ops, rest) {
    const ret = binaryExpression(
      first.tree(),
      ops.children.map((c) => c.tree()),
      rest.children.map((c) => c.tree())
    );
    return ret;
  },
  Equality(first, ops, rest) {
    const ret = binaryExpression(
      first.tree(),
      ops.children.map((c) => c.tree()),
      rest.children.map((c) => c.tree())
    );
    return ret;
  },
  Comparison(first, ops, rest) {
    const ret = binaryExpression(
      first.tree(),
      ops.children.map((c) => c.tree()),
      rest.children.map((c) => c.tree())
    );
    return ret;
  },
  Term(first, ops, rest) {
    const ret = binaryExpression(
      first.tree(),
      ops.children.map((c) => c.tree()),
      rest.children.map((c) => c.tree())
    );
    return ret;
  },
  Factor(first, ops, rest) {
    const ret = binaryExpression(
      first.tree(),
      ops.children.map((c) => c.tree()),
      rest.children.map((c) => c.tree())
    );
    return ret;
  },
  Exponent(first, ops, rest) {
    const ret = binaryExpression(
      first.tree(),
      ops.children.map((c) => c.tree()),
      rest.children.map((c) => c.tree())
    );
    return ret;
  },
  Unary(expression) {
    return expression.tree();
  },
  Literal_parens(open, expression, close) {
    return expression.tree();
  },
  number(chars) {
    return new IntegerLiteral(+this.sourceString);
  },
  id(char, moreChars) {
    return new Identifier(this.sourceString);
  },
  // Note that _terminal is now required. In the previous grammar, we never invoked the
  // semantic operation on an operator because it was not necessary. Because this new
  // grammar uses repetition, Ohm will invoke the operation on each operator behind the
  // scenes.
  _terminal() {
    return this.sourceString;
  },
};
