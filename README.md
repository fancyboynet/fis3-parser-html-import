# fis3-parser-html-uri

扩展原来的&lt;link rel="import"&gt;,增加data传值

## 安装

```bash
$ npm install fis3-parser-html-import
```

## 基本使用

fis-conf.js

```js
fis.match('page.html', {
  parser: fis.plugin('html-import')
});
```

page.html

```html
<link rel="import" href="./widget.html?__inline" data="{attr:'hello',attr2:'world'}">
```

widget.html

```html
<div>{{ attr }} - {{ attr2 }}</div>
```

### 编译结果

```html
<div>hello - world</div>
```

### 自定义模板符号

fis-conf.js

```js
fis.match('*.html', {
  parser: fis.plugin('html-import', {
      symbolStart : '{{{',
      symbolEnd : '}}}'
  })
});
```
widget.html

```html
<div>{{{ attr }}} - {{{ attr2 }}}</div>
```
