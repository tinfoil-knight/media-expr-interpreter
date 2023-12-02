const fs = require("fs");
const ohm = require("ohm-js");
const toAST = require("ohm-js/extras").toAST;
const contents = fs.readFileSync("grammar.ohm", "utf-8");
const grammar = ohm.grammar(contents);
const semantics = grammar.createSemantics();
semantics.addOperation("interpret", {
  Term(a, op, b) {
    switch (op) {
      case "+":
        return a.interpret() + b.interpret();
      case "-":
        return a.interpret() - b.interpret();
    }
    throw Error("something in Term", a, op, b);
  },
  Factor(a, op, b) {
    switch (op) {
      case "/":
        return a.interpret() / b.interpret();
      case "*":
        return a.interpret() * b.interpret();
      case "%":
        return a.interpret() % b.interpret();
    }
    throw Error("something in Factor", a, op, b);
  },
  Exponent(a, _, b) {
    return Math.pow(a.interpret(), b.interpret());
  },
  //   Unary_unary(op, a){
  //     switch(op){
  //         case "!": return 0
  //         case "-": return -1 * a.interpret()
  //     }
  //   }
  Literal_expr(a) {
    return a.interpret();
  },
  Literal(a) {
    return a.interpret();
  },
  number(digits) {
    return Number(digits.sourceString);
  },
});

const userInput = "1+2";
const m = grammar.match(userInput);
if (m.succeeded()) {
  console.log(m);
  console.log(grammar);
  const adapter = semantics(m);
  //   console.log(adapter.interpret());
  //   const ast = toAST(m);
  //   console.log(JSON.stringify(ast, null, 2));
} else {
  console.log("Invalid");
}
