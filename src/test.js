"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
index_1.default({
    input: "./test/index.js",
    libraryName: "test",
    terser: false,
    babel: true,
    uglify: true,
    dropConsole: false,
    dropDebugger: false,
    eval: true
});
