'use strict'

var stringWidth = require('string-width')

function ansiAlign (text, opts) {
  if (!text) return text

  opts = opts || {}
  var split = opts.split || '\n'
  var pad = opts.pad || ' '
  var align = opts.align || 'center'
  var widthDiffFn = align !== 'center' ? fullDiff : halfDiff

  var returnString = false
  if (!Array.isArray(text)) {
    returnString = true
    text = String(text).split(split)
  }

  var width
  var maxWidth = 0
  text = text.map(function (str) {
    str = String(str)
    width = stringWidth(str)
    maxWidth = Math.max(width, maxWidth)
    return {
      str: str,
      width: width
    }
  }).map(function (obj) {
    return new Array(widthDiffFn(maxWidth, obj.width) + 1).join(pad) + obj.str
  })

  return returnString ? text.join(split) : text
}

ansiAlign.center = function center (text) {
  return ansiAlign(text, { align: 'center' })
}

ansiAlign.right = function right (text) {
  return ansiAlign(text, { align: 'right' })
}

module.exports = ansiAlign

function halfDiff (maxWidth, curWidth) {
  return Math.floor((maxWidth - curWidth) / 2)
}

function fullDiff (maxWidth, curWidth) {
  return maxWidth - curWidth
}
