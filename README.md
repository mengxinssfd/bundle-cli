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

## 普通压缩(不是很推荐，推荐 babel+uglify)

```
bundle-cli inputPath outputPath -terser
```

## babel(es6 及以上转 es5，部分特性需要自己加上 polyfill)

```
bundle-cli inputPath outputPath -babel
```

`注意!!!!!` es7 的 async await 转成 es5 需要一个 polyfill，否则会报错

在前面加上`regenerator-runtime`polyfill 库即可

```html
<script src="https://cdn.jsdelivr.net/npm/regenerator-runtime@0.13.9/runtime.min.js"></script>
```

## uglify(丑化 js 代码)

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

## 模块类型

默认使用的是`umd`模块打包，可以选择`es`,`amd`,`commonjs`等模块类型打包。

`umd`模式下会生成`libraryName`暴露出模块名，如`vue`会在`window`下暴露出`Vue`这个库名,然后可以使用类似`Vue.createApp`等方法

如果`umd`模式下原文件未`export`暴露出函数，那么不会生成`libraryName`

`注意!!!!!` 部分库会和`umd`冲突，如`monaco-editor`,此时使用`es`打包即可，不过`es`打包会污染`window`, 不影响的情况下还是推荐`umd`

## 通过编辑器快捷键使用命令一键打包

### webstorm

`设置`>`外部工具`>`添加外部工具`
并依次填入

```
名称：bundle-cli(随意)
程序：npm全局安装下的bundle-cli.cmd
实参：$FilePath$ -b -u -udc -udd -e
工作目录：$FileDir$
```

`$FilePath$`为`webstorm`当前打开的文件或目录下鼠标选中的文件  
然后打开要打包的文件，右键选择`外部工具`|`external tools`找到`bundle-cli`鼠标点击就能打包了

添加快捷键：打开`设置`>`键盘映射`找到`外部工具`>`external tools`>`bundle-cli`，添加快捷键，然后就可以通过设置的快捷键一键打包

### vscode

快捷键`ctrl`+`shift`+`b`打开任务弹窗，新建一个任务并填写以下

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "shell",
      "group": "build",
      "problemMatcher": [],
      "label": "bundle-cli",
      "command": "bundle-cli ${file} -b -u -udc -udd -e"
    }
  ]
}
```

`${file}`为`vscode`当前打开的文件

打开要打包的文件，然后使用`ctrl`+`shift`+`b`快捷键选中`bundle-cli`，就完成了，免除了繁琐的命令输入
