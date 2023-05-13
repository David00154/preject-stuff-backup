pub const Token = enum([]const u8) {
    ILLEGAL = "ILLEGAL",
    EOF = "EOF",

    IDENT = "IDENT", // add, x, foo, bar
    INT = "INT", // 123456789

    // Operators
    PLUS = "+",
    MINUS = "-",
    EQUALS = "=",

    // Delimiters
    COMMA = ",",
    SEMICOLON = ";",
    LPAREN = "(",
    RPAREN = ")",
    LBRACE = "{",
    RBRACE = "}",
    // Keywords
    FUNCTION = "FUNCTION",
    LET = "LET",
};
