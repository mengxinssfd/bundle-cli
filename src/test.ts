import bundleStart from "./index";

bundleStart({
    input: "./test/index.js",
    libraryName: "test",
    terser: false,
    babel: false,
    uglify: false,
    dropConsole: false,
    dropDebugger: false,
    eval:true
});