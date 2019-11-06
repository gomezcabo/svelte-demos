import jslex from './jslex.js'
import reservedWord from './reservedWord.js'

const tokenDefinitions = {
  '\n': 'ENTER',
  '[ \t]+': 'SPACE',
  '[0-9]+': 'NUMBER',
  '\'.+?\'': 'STRING',
  '".+?"': 'STRING',
  '<.+?[(>)|(/\>)|( )|(\n)]': 'HTMLTAG',
  '/>': 'HTMLTAG',
  '[a-zA-Z_][a-zA-Z0-9_]*': 'ID',
  '//.+': 'COMMENT',
  '<!--.+-->': 'COMMENT',
  '(.)': 'SYMBOL',
}

const newToken = (type, text) => ({	type, text, length: text.length })

Object.entries(tokenDefinitions).forEach(([regex, tokenType]) => {
  tokenDefinitions[regex] = function () {
    return newToken(tokenType, this.text)
  }
})

const lexer = new jslex.jslex({
  'start': tokenDefinitions
})

export const colorForToken = token => {
  switch (reservedWord(token.text)) {
    case 'RESERVED': return 'darkviolet'
    case 'OBJECTS': return 'deepskyblue'
    case 'BROWSER': return 'deepskyblue'
  }

  switch (token.type) {
    case 'ID': return 'gray'
    case 'SYMBOL': return 'darkgray'
    case 'NUMBER': return 'coral'
    case 'STRING': return 'limegreen'
    case 'HTMLTAG': return 'coral'
    case 'COMMENT': return 'lightgray'
    default:
      return null
  }
}

export default lexer
