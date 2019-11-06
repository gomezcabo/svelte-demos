const reserved = [
  'abstract', 'arguments', 'await', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue',
  'debugger', 'default', 'delete', 'do', 'double', 'else', 'enum', 'eval', 'export', 'extends', 'false', 'final',
  'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'import', 'from', 'in', 'instanceof', 'int',
  'interface', 'let', 'long', 'native', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'short',
  'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var',
  'void', 'volatile', 'while', 'with', 'yield', 'abstract', 'boolean', 'byte', 'char', 'double', 'final', 'float',
  'goto', 'int', 'long', 'native', 'short', 'synchronized', 'throws', 'transient', 'volatile'
]
const objects = [
  'Array', 'Date', 'eval', 'function', 'hasOwnProperty', 'Infinity', 'isFinite', 'isNaN', 'isPrototypeOf', 'length',
  'Math', 'NaN', 'name', 'Number', 'Object', 'prototype', 'String', 'toString', 'undefined', 'valueOf', 'map', 'find',
  'filter', 'findIndex', 'indexOf', 'reduce'
]
const browser = ['alert', 'all', 'anchor', 'anchors', 'area', 'assign', 'blur', 'button', 'checkbox', 'clearInterval',
  'clearTimeout', 'clientInformation', 'close', 'closed', 'confirm', 'constructor', 'crypto', 'decodeURI',
  'decodeURIComponent', 'defaultStatus', 'document', 'element', 'elements', 'embed', 'embeds', 'encodeURI',
  'encodeURIComponent', 'escape', 'event', 'fileUpload', 'focus', 'form', 'forms', 'frame', 'innerHeight', 'innerWidth',
  'layer', 'layers', 'link', 'location', 'mimeTypes', 'navigate', 'navigator', 'frames', 'frameRate', 'hidden',
  'history', 'image', 'images', 'offscreenBuffering', 'open', 'opener', 'option', 'outerHeight', 'outerWidth',
  'packages', 'pageXOffset', 'pageYOffset', 'parent', 'parseFloat', 'parseInt', 'password', 'pkcs11', 'plugin',
  'prompt', 'propertyIsEnum', 'radio', 'reset', 'screenX', 'screenY', 'scroll', 'secure', 'select', 'self',
  'setInterval', 'setTimeout', 'status', 'submit', 'taint', 'text', 'textarea', 'top', 'unescape', 'untaint', 'window'
]

const reservedWord = word => {
  if (reserved.includes(word)) {
    return 'RESERVED'
  } else if (objects.includes(word)) {
    return 'OBJECTS'
  } else if (browser.includes(word)) {
    return 'BROWSER'
  }
  return false
}

export default reservedWord
