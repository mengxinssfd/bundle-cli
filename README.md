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