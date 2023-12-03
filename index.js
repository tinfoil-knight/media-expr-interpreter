const fs = require("fs");
const ohm = require("ohm-js");
const contents = fs.readFileSync("grammar.ohm", "utf-8");
const grammar = ohm.grammar(contents);
const astActions = require("./site/ast");
const evaluateAST = require("./site/interpret");

const semantics = grammar.createSemantics();

semantics.addOperation("tree", astActions);

const userInput = "-(1+2.2)^3";
// const userInput = "1+true"
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
