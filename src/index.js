
import through from 'through'

import { styleSheet } from 'glamor'

export default function(){

  let insed = {}

  return through(function write(data){
    const html = data.toString()
    let regex = /css\-([a-zA-Z0-9\-_]+)/gm
    let match, ids = {}
    while((match = regex.exec(html)) !== null) {
      if(!insed[match[1] + '']) {
        ids[match[1] + ''] = insed[match[1] + ''] = true
      }
    }
    let rules = styleSheet.rules().filter(x => {
      let regex = /css\-([a-zA-Z0-9\-_]+)/gm
      let match = regex.exec(x.cssText)
      if(match && ids[match[1] + '']) {
        return true
      }
      if(!match) {
        return true
      }
      return false
    })
    let css = rules.map(x => x.cssText).join('')
    css = css.length > 0 ? `<style data-glamor-chunk>${css}</style>` : css
    this.queue(css)
    this.queue(data.toString())
  }, function end(){
    this.queue(null)
  })
}
