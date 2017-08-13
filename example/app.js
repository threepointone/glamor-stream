import React from 'react'
import { css } from 'glamor'

// a sample react app. nothing fancy, just generating enough html to guarantee chunks
export default function App({ count }){

  return <div className={css({color: 'red'})}>
    woah there
    <span>
      hello world
    </span>
    {Array.from({ length: count }).map((_, i) =>
      <span className={css({ opacity: (i%16)/16 })}>
        what what
      </span>)}
  </div>
}
