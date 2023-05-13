const std = @import("std");

pub const Lexer = struct {
    const Self = @This();
    input: []const u8,
    position: i32, // current position in input (points to current char)
    readPosition: i32, // current reading position in input (after current char)
    ch: u8, // current char under examination

    pub fn new(input: []const u8) Lexer {
        var l = Lexer{
            .input = input,
            .position = 0,
            .readPosition = 0,
            .ch = 0,
        };
        l.readChar();
        return l;
    }

    fn readChar(self: *Self) void {
        if (self.readPosition >= std.mem.len(self.input)) {
            self.ch = 0;
        } else {
            self.ch = @intCast(u8, self.input[self.readPosition]);
        }
        self.position = self.readPosition;
        self.readPosition += 1;
    }
};
