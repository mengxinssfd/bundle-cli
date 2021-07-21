import bundleStart from "./index";

bundleStart({
    input: "./test/tsTest.ts",
    libraryName: "test",
    terser: false,
    babel: false,
    uglify: false,
    dropConsole: false,
    dropDebugger: false,
    eval: false
});