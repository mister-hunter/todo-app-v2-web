import React from 'react'
import Props from './interface'

import './style.css'

export default (props: Props) => {
  const style = {
    width: props.width ? props.width : 'fit-content',
    margin: props.center ? '0 auto' : '0',
  }

  return (
    <div style={style} className='Card'>
      {props.children}
    </div>
  )
}
