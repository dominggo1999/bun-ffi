const std = @import("std");

pub export fn add(a: i32, b: i32) i32 {
    return a + b;
}

pub fn main() !void {
    std.debug.print("Test {d}\n", .{add(2, 3)});

    std.debug.print("Test {s}", .{"Test"});
}
