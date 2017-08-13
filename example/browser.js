// todo
import React from 'react'
import {render} from 'react-dom'
import App from './app'
const count = parseInt(window.location.pathname.substring(1), 10)

render(<App count={(count > 0) && count}/>, window.app)
