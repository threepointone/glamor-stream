import React from 'react'
import { css } from 'glamor'

const maxColors = Math.pow(16, 6)

css.global('html, body', {
  padding: 0,
  margin: 0
})

// a sample react app. nothing fancy, just generating enough html to guarantee chunks
export default function App({ count }){

  return <div className={css({color: 'red'})}>
    woah there
    <span>
      hello world
    </span>
    {Array.from({ length: count }, (_, i) =>
      <span key={i} className={css({ color: '#' + Math.round((i/count)*maxColors).toString(16).padStart(6, '0') })}>
        what what
      </span>)}
  </div>
}
