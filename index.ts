import { dlopen, FFIType, suffix } from "bun:ffi";

const FFI = (() => {
  const rustLib = dlopen(`./rust/libhello.${suffix}`, {
    add: {
      args: [FFIType.i32, FFIType.i32],
      returns: FFIType.i32,
    },
  });

  const zigLib = dlopen(`./zig/libadd.${suffix}`, {
    add: {
      args: [FFIType.i32, FFIType.i32],
      returns: FFIType.i32,
    },
  });

  return {
    rust: rustLib.symbols,
    zig: zigLib.symbols,
  };
})();

const rustStart = new Date().getTime();
for (let i = 0; i < 100000000; i++) {
  FFI.rust.add(20000, 20000);
}
const endRust = new Date().getTime() - rustStart;
console.log(endRust);

const zigStart = new Date().getTime();
for (let i = 0; i < 100000000; i++) {
  FFI.zig.add(20000, 20000);
}
const zigEnd = new Date().getTime() - zigStart;
console.log(zigEnd);
