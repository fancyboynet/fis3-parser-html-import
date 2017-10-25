'use strict'
let plugin = require('../index')
fis.match('*', {
  release: false
})

fis.match('page.html', {
  release: true,
  parser: function (content, file, opt) {
    return plugin(content, file, {
      symbolStart: '{{{',
      symbolEnd: '}}}'
    })
  }
})
