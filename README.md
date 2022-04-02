# bundle-cli

主要实现了在非构建环境下，无需配置，只通过命令对 js 或 ts 文件进行打包、babel 转译、压缩、混淆等功能

使用 rollup 打包压缩 js，如果入口是 typescript 文件，那么会自动开启 ts 打包。

# 命令

```
-input/-i                      文件入口
-output/-o                     输出文件
-module/-m                     模块类型(默认umd)
-help/-h                       帮助
-terser/-t                     普通压缩
-babel/-b                      开启babel(es6+转es5)
-libraryName/-name             打包后的名字,默认是文件名(umd模式)
-uglify/-u                     开启uglifyjs(丑化js)
-uglifyDropDebugger/-udd       移除debugger,需开启uglify
-uglifyDropConsole/-udc        移除console,需开启uglify
-eval/-e                       eval parker混淆模式
```

## 安装

```
npm i -g @mxssfd/bundle-cli
```

## 使用

```
bundle-cli inputPath outputPath
```

如果输出文件名不填，则为输入文件名.min.js
或

```
bundle-cli -input path -output path
```

## 普通压缩(不是很推荐，推荐babel+uglify)

```
bundle-cli inputPath outputPath -terser
```

## babel(es6及以上转es5，部分特性需要自己加上polyfill)

```
bundle-cli inputPath outputPath -babel
```

## uglify(丑化js代码)

```
bundle-cli inputPath outputPath -uglify
```

去除 debugger

```
bundle-cli inputPath outputPath -udd
```

去除 console

```
bundle-cli inputPath outputPath -udd
```

## eval

eval 混淆

```
bundle-cli inputPath outputPath -eval
```
