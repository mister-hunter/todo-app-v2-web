import React from 'react'
import Props from './interface'

import './style.css'

export default (props: Props) => {
  return (
    <div className='Button'>
      <button onClick={props.onClick && props.onClick}>{props.children}</button>
    </div>
  )
}
