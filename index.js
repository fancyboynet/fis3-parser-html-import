module.exports = function (content, file, opt) {
  'use strict';
  // 只对 html 类文件进行处理
  if (!file.isHtmlLike){
    return content;
  }
  var path = require('path');
  var regLink = /<link.+rel="import".*?>/ig;
  var regInline = /href="(.+?)\?__inline"/i;
  var regData = /data="({.+?})"/i;
  var regByRoot = /^\//;
  var symbolStart = opt.symbolStart || '{{'
  var symbolEnd = opt.symbolEnd || '}}'
  var regTpl = new RegExp(symbolStart + '\\s*(\\S+?)\\s*?' + symbolEnd, 'ig');

  return content.replace(regLink, function(match) {
    var inline = match.match(regInline);
    if(!inline){
      return match;
    }
    var data = match.match(regData);
    if(!data){
      return match;
    }
    data = eval("(" + data[1] + ")");
    var filePath;
    if(regByRoot.test(inline[1])){ //相对项目根目录
      filePath = path.resolve(fis.project.getProjectPath(), inline[1].slice(1));
    }
    else{ //相对当前文件
      filePath = path.resolve(file.dirname, inline[1]);
    }
    var embedFile = fis.file.wrap(filePath);
    var embedFileContent = embedFile.getContent();
    return embedFileContent.replace(regTpl, function (all, attr) {
      return data[attr];
    })
  });
};
