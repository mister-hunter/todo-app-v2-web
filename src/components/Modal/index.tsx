import React, { useState } from 'react'
import Card from '../Card'
import Center from '../Center'
import Props from './interface'

import './style.css'

export default (props: Props) => {
  const delay = (props.delay && `${props.delay}ms`) || '500ms'
  const active = props.active === props.name
  const name = `Modal-${props.name}`
  const close = (props.close || props.c) && props.onClose

  const initPos = '-100%'
  const [pos, setPos] = useState(initPos)

  const [backdrop, setBackdrop] = useState(false)

  const style = {
    top: pos,
    transition: `top ${delay}`,
  }

  if (active) {
    if (pos !== '50%') {
      setPos('50%')
      setBackdrop(true)
    }
  } else {
    if (pos !== initPos) {
      setPos(initPos)
      setBackdrop(false)
    }
  }

  return (
    <section id={name} style={style} className='Modal'>
      {backdrop && (
        <div onClick={props.onClose} className='Modal-Backdrop' />
      )}

      <Center h v>
        <Card width={500}>
          {close && (
            <div className='Modal-Close'>
              <span onClick={props.onClose} className='Modal-X'>
                ×
              </span>
            </div>
          )}
          {props.children}
        </Card>
      </Center>
    </section>
  )
}
