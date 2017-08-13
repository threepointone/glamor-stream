
import through from 'through'
import tokenize from 'html-tokenize'
import pipe from 'multipipe'
import { styleSheet } from 'glamor'

const GlobalTypes = ['raw', 'keyframes', 'font-face']

export default function inline(){

  let insed = {}
  const tokenStream = tokenize()
  let globalInserted = false

  const inlineStream = through(function write([type, data]){
    if(type==='open'){
      let css = []
      if(!globalInserted){
        Object.keys(styleSheet.inserted).filter(id =>
          GlobalTypes.indexOf(styleSheet.registered[id].type) >= 0
        ).forEach(id =>
          css.push(styleSheet.inserted[id].join('')))
        globalInserted = true
      }                  

      let ids = {}, match
      let fragment = data.toString()
      let regex = /css\-([a-zA-Z0-9\-_]+)/gm
      while((match = regex.exec(fragment)) !== null) {
        if(!insed[match[1] + '']) {
          ids[match[1] + ''] = insed[match[1] + ''] = true
        }
      }

      Object.keys(ids).forEach(id => {
        css.push(styleSheet.inserted[id].join(''))
      })

      if(css){
        this.queue(`<style data-glamor-chunk>${css.join('')}</style>`)
      }
    }
    this.queue(data)

  }, function end(){
    this.queue(null)
  })

  return pipe(tokenStream, inlineStream)
}
