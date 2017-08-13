// todo
import React from 'react'
import {render} from 'react-dom'
import {hydrate} from '../src/browser'
import App from './app'

const count = parseInt(window.location.pathname.substring(1), 10);

hydrate(<App count={(count > 0) && count}/>, window.app)
