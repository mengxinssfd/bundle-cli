# bundle-cli
compress js使用rollup压缩js，如果入口是typescript文件，那么会自动开启ts打包
# 命令
```shell
-input/-i                      文件入口
-output/-o                     输出文件
-module/-m                     模块类型
-help/-h                       帮助
-terser/-t                     压缩
-babel/-b                      开启babel
-libraryName/-name             打包后的名字,默认是时间戳
-uglify/-u                     开启uglify
-uglifyDropDebugger/-udd       移除debugger,需开启uglify
-uglifyDropConsole/-udc        移除console,需开启uglify
-eval/-e                       eval parker混淆模式
```
## 安装
```shell
npm i -g @mxssfd/bundle-cli
```
## 使用
```shell
bundle-cli inputPath outputPath
```
如果输出文件名不填，则为输入文件名.min.js
或
```shell
bundle-cli -input path -output path
```
## 压缩
```shell
bundle-cli inputPath outputPath -terser
```
## babel
```shell
bundle-cli inputPath outputPath -babel
```
## uglify
```shell
bundle-cli inputPath outputPath -uglify
```
去除debugger
```shell
bundle-cli inputPath outputPath -udd
```
去除console
```shell
bundle-cli inputPath outputPath -udd
```
## eval
eval混淆
```shell
bundle-cli inputPath outputPath -eval
```