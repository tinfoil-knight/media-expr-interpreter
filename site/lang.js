const source = String.raw`
MediaExpr {
    // Syntax Grammar
    Main        = Expression
    
    Expression  = LogicOr
    LogicOr     = LogicAnd ("or" LogicAnd)*
    LogicAnd    = Equality ("and" Equality)*
    Equality    = Comparison (("!=" | "==") Comparison)*
    Comparison  = Term ((">" | ">=" | "<" | "<=") Term)*
    
    Term        = Factor (("-" | "+") Factor)*
    Factor      = Exponent (("/" | "*" | "%") Exponent)*
    Exponent    = Unary ("^" Unary)*
    Unary       = ("!" | "-") Unary --unary
                    | Literal
    
    Literal     = "(" Expression ")" --parens
                    | bool
                    | number
                    | variable
  
    // Lexical Grammar
    bool       = "true" | "false"
    number     = decimal | whole
    decimal    = digit* "." digit+
    whole      = digit+
    
    variable   = letter alnum*
  
    /*
    alnum (an alpha-numeric character) = letter
        | digit
    digit (a digit) = "0".."9"
    letter (a letter) = lower
        | upper
        | unicodeLtmo
    */
}
`;

const g = ohm.grammar(source);

const s = g.createSemantics();

s.addOperation("tree", astActions);

// -------------------------------------------------------------------------------------------------

const elt = makeElement;

// s.addOperation("toTree", {
//   Exp(e) {
//     return elt("exp", e.toTree());
//   },
//   AddExp(e) {
//     return elt("addExp", e.toTree());
//   },
//   AddExp_plus(x, op, y) {
//     return elt("plus", x.toTree(), op.toTree(), y.toTree());
//   },
//   AddExp_minus(x, op, y) {
//     return elt("minus", x.toTree(), op.toTree(), y.toTree());
//   },
//   MulExp(e) {
//     return elt("mulExp", e.toTree());
//   },
//   MulExp_times(x, op, y) {
//     return elt("times", x.toTree(), op.toTree(), y.toTree());
//   },
//   MulExp_divide(x, op, y) {
//     return elt("divide", x.toTree(), op.toTree(), y.toTree());
//   },
//   ExpExp(e) {
//     return elt("expExp", e.toTree());
//   },
//   ExpExp_power(x, op, y) {
//     return elt("power", x.toTree(), op.toTree(), y.toTree());
//   },
//   PriExp(e) {
//     return elt("priExp", e.toTree());
//   },
//   PriExp_paren(op, e, cp) {
//     return elt("paren", op.toTree(), e.toTree(), cp.toTree());
//   },
//   PriExp_pos(sign, e) {
//     return elt("pos", sign.toTree(), e.toTree());
//   },
//   PriExp_neg(sign, e) {
//     return elt("neg", sign.toTree(), e.toTree());
//   },
//   ident(_l, _ns) {
//     return elt("ident", this.sourceString);
//   },
//   number(_) {
//     return elt("number", this.sourceString);
//   },

//   // The _terminal semantic action specifies what your operation or attribute should do with
//   // (you guessed it) terminals. Here, we return the terminal's `sourceString` attribute, which
//   // is just the substring of the input that was consumed by that node.
//   _terminal() {
//     return this.sourceString;
//   },
// });
