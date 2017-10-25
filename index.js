module.exports = function (content, file, opt) {
  'use strict'
  // 只对 html 类文件进行处理
  if (!file.isHtmlLike) {
    return content
  }
  let path = require('path')
  let regLink = /<link.+rel="import".*?>/ig
  let regInline = /href="(.+?)\?__inline"/i
  let regData = /data="({.+?})"/i
  let regByRoot = /^\//
  let symbolStart = opt.symbolStart || '{{'
  let symbolEnd = opt.symbolEnd || '}}'
  let regTpl = new RegExp(symbolStart + '\\s*(\\S*?)\\s*' + symbolEnd, 'ig')

  return content.replace(regLink, function (match) {
    let inline = match.match(regInline)
    if (!inline) {
      return match
    }
    let data = match.match(regData)
    if (!data) {
      return match
    }
    data = eval('(' + data[1] + ')')
    let filePath
    if (regByRoot.test(inline[1])) { // 相对项目根目录
      filePath = path.resolve(fis.project.getProjectPath(), inline[1].slice(1))
    } else { // 相对当前文件
      filePath = path.resolve(file.dirname, inline[1])
    }
    let embedFile = fis.file.wrap(filePath)
    let embedFileContent = embedFile.getContent()
    return embedFileContent.replace(regTpl, function (all, attr) {
      return data[attr]
    })
  })
}
