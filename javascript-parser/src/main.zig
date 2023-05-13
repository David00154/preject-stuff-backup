const std = @import("std");
const debug = std.debug;
const Lexer = @import("lexer/lexer.zig").Lexer;
pub fn main() !void {
    var l = Lexer.new("1+2");
    debug.print("Lop {d}", .{l.readPosition});
}

test "simple test" {
    // var list = std.ArrayList(i32).init(std.testing.allocator);
    // defer list.deinit(); // try commenting this out and see if zig detects the memory leak!
    // try list.append(42);
    // try std.testing.expectEqual(@as(i32, 42), list.pop());
}
