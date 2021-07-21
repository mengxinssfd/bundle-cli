"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
index_1.default({
    input: "./test/tsTest.ts",
    libraryName: "test",
    terser: false,
    babel: false,
    uglify: false,
    dropConsole: false,
    dropDebugger: false,
    eval: false
});
