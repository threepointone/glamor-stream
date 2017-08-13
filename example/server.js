
import React from 'react'
import {renderToStream} from 'react-dom/server'
import { css } from 'glamor'
import inline from '../src'
import express from 'express'
import through from 'through'

const app = express()
import App from './app'

app.use(express.static('example'))

// a utility to wrap the html with boyd tags and so on
// it flushes the initial tags imemdiately, and pipes the rest
// finishing with ending tags
function wrap(res, content){
  // open tags -> content -> inline -> close tags

  //open tags
  res.write(`<!doctype html>
    <html>
      <head>
        <title>streaming css example</title>
      </head>
      <body>
        <div id='app'>`)
  // content -> inline
  return content.pipe(inline()).pipe(through(function write(data){
    this.queue(data)
  }, function end(){
    // close tags
    this.queue(`</div>
      </body>
      <script src='/bundle.js'></script>
    </html>
    `)
    this.queue(null)
  })).pipe(res)
}

app.get('/', (req, res, next) => {
  wrap(res, renderToStream(<App/>))
})

app.get('/:id', (req, res, next) => {
  wrap(res, renderToStream(<App count={req.params.id}/>))
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
