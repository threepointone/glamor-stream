
import {hydrate as reactDOMHydrate } from 'react-dom'

export function hydrate(tree, element){
  let chunks = [...document.querySelectorAll('[data-glamor-chunk]')]
  chunks.forEach(node => document.head.appendChild(node))
  reactDOMHydrate(tree, element)
  chunks.forEach(node => document.head.removeChild(node))
  chunks = null

}
