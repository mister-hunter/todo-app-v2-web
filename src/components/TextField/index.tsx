import React from 'react'
import Props from './interface'

import './style.css'

export default (props: Props) => {
  const onChange = (e: any) => {
    const newValue = e.target.value

    if (props.onChange) {
      props.onChange(props.name, newValue)
    }
  }

  return (
    <div className='Textfield'>
      <input
        type={props.type}
        placeholder={props.placeholder || '[placeholder goes here]'}
        name={props.name}
        value={props.value}
        onChange={onChange}
      />
    </div>
  )
}
