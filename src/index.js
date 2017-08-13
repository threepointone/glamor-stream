
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
    let css = []
    Object.keys(ids).forEach(id => {
      css.push(styleSheet.inserted[id].join(''))
    })

    if(css){
      this.queue(`<style data-glamor-chunk>${css.join('')}</style>`)
    }

    this.queue(data)
  }, function end(){
    this.queue(null)
  })
}
