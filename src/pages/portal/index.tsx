import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../components/Button'
import Card from '../../components/Card'
require('dotenv').config()

export default () => {
  const history = useHistory()

  return (
    <Card>
      <Card width={500}>
        <Button onClick={() => history.push('/-/admins')}>Admins</Button>
      </Card>
      <Card width={500}>
        <Button onClick={() => history.push('/-/users')}>Users</Button>
      </Card>
      <Card width={500}>
        <Button onClick={() => history.push('/-/products')}>Products</Button>
      </Card>
    </Card>
  )
}
