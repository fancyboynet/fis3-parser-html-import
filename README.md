# fis3-parser-html-uri

*html*文件增加类似js文件中的*__uri*资源自动定位功能函数

## 安装

```bash
$ npm install fis3-parser-html-import
```

## 基本使用

```js
fis.match('*.html', {
  parser: fis.plugin('html-import')
});
```

### demo.html

```html
<link rel="import" href="./some-widget?__inline" data="{attr:'hello',attr2:'world'}">
```

### some-widget.html

```html
<div>{{ attr }} - {{ attr2 }}</div>
```

### 编译结果

```html
<div>hello - world</div>
```
