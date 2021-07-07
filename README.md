# bundle-cli
compress js使用rollup压缩js
## 安装
```shell
npm i -g @mxssfd/bundle-cli
```
## 使用
```shell
bundle-cli inputPath outputPath
```
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