glamor-stream
---

[experimental]

So. You're living on the hype train, all your styles are colocated with your scripts,
and you server render your pages with critical css for that slick experience. Cool.

This module lets you inline critical css into html streams, such as the ones created
by react's [new streaming apis.](https://github.com/facebook/react/blob/master/docs/docs/reference-react-dom-node-stream.md)
Nice.


usage
---

```jsx
// app.js
import {css} from 'glamor'

export default function App(){
  return <div className={css({ color: 'red'})}>
    this text is red
  </div>
}

// server.js

import inline from 'glamor-stream'
import {renderToStream} from 'react-dom/server'
import App from './app.js'

// ...

let html = renderToStream(<App/>).pipe(inline())
// a stream of html inlined with critical css

```

see the [express.js-based example](example/server.js) for more details.

todos
---

- include 'global' rules
- naive implementation, plenty of optimisation work
- todo - inline right before usage per classname for predictable html
- utils for wrapper tags
