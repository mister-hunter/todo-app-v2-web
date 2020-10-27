import React from 'react'
import Props from './interface'

import './style.css'

export default (props: Props) => {
  const h = props.horizontal || props.h
  const v = props.vertical || props.v
  const c = h && v
  const n = !h && !v

  let PCN = '' // Parent ClassName (PCN)
  let CCN = '' // Chile ClassName (CCN)

  if (h) {
    PCN = 'Center-HP' // Horizontal Parent
    CCN = 'Center-HC' // Horizontal Child
  }

  if (v) {
    PCN = 'Center-VP' // Vertical Parent
    CCN = 'Center-VC' // Vertical Child
  }

  if (c) {
    PCN = 'Center-CP' // Center Parent
    CCN = 'Center-CC' // Center Child
  }

  return !n ? (
    <div className={PCN}>
      <div className={CCN}>{props.children}</div>
    </div>
  ) : (
    props.children
  )
}
