const associativity = { "+": "L", "-": "L", "*": "L", "/": "L", "^": "R" };

function binaryExpr(first, ops, rest) {
  if (associativity[ops[0]] === "L") {
    const applyLeft = (x, y) => new BinaryExpr(x, ops.shift(), y);
    return [first, ...rest].reduce(applyLeft);
  } else {
    const applyRight = (x, y) => new BinaryExpr(y, ops.pop(), x);
    return [first, ...rest].reduceRight(applyRight);
  }
}

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

module.exports = {
  Main(body) {
    class Program {
      constructor(expression) {
        this.body = expression;
      }
      toString() {
        return this.body.toString();
      }
    }
    return new Program(body.tree());
  },
  Expression(expression) {
    return expression.tree();
  },
  LogicOr(first, ops, rest) {
    const ret = binaryExpr(
      first.tree(),
      ops.children.map((c) => c.tree()),
      rest.children.map((c) => c.tree())
    );
    return ret;
  },
  LogicAnd(first, ops, rest) {
    const ret = binaryExpr(
      first.tree(),
      ops.children.map((c) => c.tree()),
      rest.children.map((c) => c.tree())
    );
    return ret;
  },
  Equality(first, ops, rest) {
    const ret = binaryExpr(
      first.tree(),
      ops.children.map((c) => c.tree()),
      rest.children.map((c) => c.tree())
    );
    return ret;
  },
  Comparison(first, ops, rest) {
    const ret = binaryExpr(
      first.tree(),
      ops.children.map((c) => c.tree()),
      rest.children.map((c) => c.tree())
    );
    return ret;
  },
  Term(first, ops, rest) {
    const ret = binaryExpr(
      first.tree(),
      ops.children.map((c) => c.tree()),
      rest.children.map((c) => c.tree())
    );
    return ret;
  },
  Factor(first, ops, rest) {
    const ret = binaryExpr(
      first.tree(),
      ops.children.map((c) => c.tree()),
      rest.children.map((c) => c.tree())
    );
    return ret;
  },
  Exponent(first, ops, rest) {
    const ret = binaryExpr(
      first.tree(),
      ops.children.map((c) => c.tree()),
      rest.children.map((c) => c.tree())
    );
    return ret;
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
  Literal_parens(open, expression, close) {
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

  // Note that _terminal is now required. In the previous grammar, we never invoked the
  // semantic operation on an operator because it was not necessary. Because this new
  // grammar uses repetition, Ohm will invoke the operation on each operator behind the
  // scenes.
  _terminal() {
    return this.sourceString;
  },
};
