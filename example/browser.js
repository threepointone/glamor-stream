// todo
import React from 'react'

import {hydrate} from '../src/browser' // use hydrate from glamor-stream instead of react-dom
import App from './app'

const count = parseInt(window.location.pathname.substring(1), 10);

hydrate(<App count={(count > 0) && count}/>, window.app)
