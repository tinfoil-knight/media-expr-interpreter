class BinaryExpr {
  constructor(left, op, right) {
    this.left = left;
    this.op = op;
    this.right = right;
  }
  toString() {
    return `(${this.op} ${this.left} ${this.right})`;
  }
}

function binaryExpr(first, ops, rest) {
  const associativity = { "+": "L", "-": "L", "*": "L", "/": "L", "^": "R" };
  if (associativity[ops[0]] === "L") {
    const applyLeft = (x, y) => new BinaryExpr(x, ops.shift(), y);
    return [first, ...rest].reduce(applyLeft);
  } else {
    const applyRight = (x, y) => new BinaryExpr(y, ops.pop(), x);
    return [first, ...rest].reduceRight(applyRight);
  }
}

const astActions = {
  Main(body) {
    class Main {
      constructor(expression) {
        this.body = expression;
      }
      toString() {
        return this.body.toString();
      }
    }
    return new Main(body.tree());
  },
  Expression(expression) {
    return expression.tree();
  },
  LogicOr(first, ops, rest) {
    return binaryExpr(
      first.tree(),
      ops.children.map((c) => c.tree()),
      rest.children.map((c) => c.tree())
    );
  },
  LogicAnd(first, ops, rest) {
    return binaryExpr(
      first.tree(),
      ops.children.map((c) => c.tree()),
      rest.children.map((c) => c.tree())
    );
  },
  Equality(first, ops, rest) {
    return binaryExpr(
      first.tree(),
      ops.children.map((c) => c.tree()),
      rest.children.map((c) => c.tree())
    );
  },
  Comparison(first, ops, rest) {
    return binaryExpr(
      first.tree(),
      ops.children.map((c) => c.tree()),
      rest.children.map((c) => c.tree())
    );
  },
  Term(first, ops, rest) {
    return binaryExpr(
      first.tree(),
      ops.children.map((c) => c.tree()),
      rest.children.map((c) => c.tree())
    );
  },
  Factor(first, ops, rest) {
    return binaryExpr(
      first.tree(),
      ops.children.map((c) => c.tree()),
      rest.children.map((c) => c.tree())
    );
  },
  Exponent(first, ops, rest) {
    return binaryExpr(
      first.tree(),
      ops.children.map((c) => c.tree()),
      rest.children.map((c) => c.tree())
    );
  },
  Unary_unary(op, first) {
    class UnaryExpr {
      constructor(op, right) {
        this.op = op;
        this.right = right;
      }
      toString() {
        return `(${this.op} ${this.right})`;
      }
    }
    return new UnaryExpr(op.sourceString, first.tree());
  },
  Literal_parens(_open, expression, _close) {
    return expression.tree();
  },
  bool(chars) {
    class BoolLiteral {
      constructor(value) {
        this.value = value;
      }
      toString() {
        return `${this.value}`;
      }
    }
    return new BoolLiteral(this.sourceString === "true" ? true : false);
  },
  number(chars) {
    class NumberLiteral {
      constructor(value) {
        this.value = value;
      }
      toString() {
        return `${this.value}`;
      }
    }
    return new NumberLiteral(Number(this.sourceString));
  },
  variable(char, moreChars) {
    const constants = { h: 300, w: 200 };
    if (!constants[this.sourceString]) {
      throw new Error("variable not allowed", constants);
    }
    return new NumberLiteral(constants[this.sourceString]);
  },
  _terminal() {
    return this.sourceString;
  },
};

module.exports = astActions;
